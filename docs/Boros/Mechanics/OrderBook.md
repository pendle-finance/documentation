# Central Limit Order Book

Boros implements a gas-optimized central limit order book (CLOB) specifically designed for the EVM. The order book architecture minimizes gas costs through [lazy settlement](./Settlement.md) and efficient data structures while maintaining the functionality expected from professional trading platforms.

## Order Book Structure

The order book consists of two independent sides:

- **Long Side (Bids)**: Orders to buy/go long on interest rates
- **Short Side (Asks)**: Orders to sell/go short on interest rates

Each side contains **65,536 discrete rate levels** (ticks) ranging from -32768 to 32767.

The tick system uses an exponential function to map discrete tick indices to interest rates. This design provides:

- **Compactness**: Entire rate range expressed with just 16 bits
- **Expressiveness**: Finer granularity near zero, coarser at extremes
- **Symmetry**: Equal precision for positive and negative rates

The tick spacing is configurable per market via the `tickStep` parameter. A larger `tickStep` creates wider rate intervals between ticks, suitable for more volatile markets.

## Tick to Rate Conversion

The conversion between tick indices and interest rates follows an exponential formula:

$$
\text{rate}(\text{tick}) = \begin{cases}
1.00005^{\text{tick} \times \text{tickStep}} - 1 & \text{if tick} \geq 0 \\
-(1.00005^{-\text{tick} \times \text{tickStep}} - 1) & \text{if tick} < 0
\end{cases}
$$

The TickMath library provides conversion between tick indices and interest rates:

```solidity
// Convert tick to interest rate
int128 rate = TickMath.getRateAtTick(tick, tickStep);

// Formula: rate = 1.00005^(tick * tickStep) - 1 for tick >= 0
//          rate = -(1.00005^(-tick * tickStep) - 1) for tick < 0
```

### Examples

```
// tickStep = 2
tick = 0    -> rate = 0% (neutral)
tick = 100  -> rate =   1.00005^200 - 1  ≈  1.005%
tick = -100 -> rate = -(1.00005^200 - 1) ≈ -1.005%
```

## Matching Priority

Boros order book follows the standard **rate-time priority** matching:

- Orders offering better rates are matched first
  - For long orders: Higher rates (willing to pay more) have priority
  - For short orders: Lower rates (willing to receive less) have priority
- Within the same rate level (tick), orders are matched in the order they were placed (FIFO)
  - The `orderIndex` within each tick determines the exact queue position

## Order Id

Each order in Boros has a unique order Id, which a 64-bit packed value containing order metadata:

```solidity
OrderId structure (64 bits):
┌─────────┬──────────┬─────────────┬──────────────┐
│ Init(1) │ Side(1)  │ Tick(16)    │ Index(40)    │
└─────────┴──────────┴─────────────┴──────────────┘

Bit 63: Initialization marker (always 1 for valid orders)
Bit 56: Side (0 = LONG, 1 = SHORT)
Bits 40-55: Encoded tick index
Bits 0-39: Order index within tick
```

This encoding has a nice ordering property: orders with **lower OrderId values** have **higher priority** in the order book.

### Parsing OrderId

```solidity
// Parsing an OrderId
(Side side, int16 tickIndex, uint40 orderIndex) = OrderIdLib.unpack(orderId);

// Quick access methods
Side side = orderId.side();
int16 tick = orderId.tickIndex();
uint40 index = orderId.orderIndex();
```

## Placing orders

### Time In Force

Time In Force (TIF) parameters control how orders behave during matching and placement. Boros supports five TIF types to accommodate different trading strategies:

```solidity
enum TimeInForce {
    GTC,       // Good Till Cancel - Standard limit order, remains on book until filled/cancelled
    IOC,       // Immediate or Cancel - Executes against available liquidity, cancels unfilled portion
    FOK,       // Fill or Kill - Must fill entire size or transaction reverts
    ALO,       // Add Liquidity Only - Post-only order, transaction reverts if would match
    SOFT_ALO   // Soft ALO - If order would match, it gets skipped (not placed on orderbook) and transaction doesn't revert
}
```

### Self-trade Prevention

Boros prevents self-trading by checking if an incoming order would match against the same account's existing orders. If self-matching is detected, the transaction will revert to protect traders from unintentionally trading with themselves.

### Restrictions

**Order Size**:

- No minimum order size requirement
- No lot size restrictions - any decimal amount supported
- Orders must have non-zero size

**Order Limits**:

- Maximum **100 open orders** per account across all sides
- Exceeding this limit will cause the transaction to revert

**Rate Bounds**:

- Orders with rates significantly deviating from the mark rate will be rejected:
  - **Buy/Long orders**: Rejected if rate is too far above the mark rate
  - **Sell/Short orders**: Rejected if rate is too far below the mark rate
- The acceptable deviation threshold is market-specific and configured to prevent market manipulation

**Bad Debt Prevention**:

- The system continuously monitors all open orders against account health
- Orders that could potentially put makers into bad debt if filled are force-cancelled

## TWAP Oracle

Boros maintains a Time-Weighted Average Price (TWAP) oracle to calculate the **mark rate** - the reference rate used for margining and liquidations. Each time an order is matched against the order book. The rate of the last matched tick is incorporated into the TWAP calculation based on time elapsed.

The oracle uses a fixed-window observation approach:

```
markRate = (lastTradedRate × timeElapsed + prevOracleRate × (window - timeElapsed)) / window
```
