# Market View Functions

The Market contract provides comprehensive view functions for querying market state, user positions, order book data, and risk parameters.

## Market Information

### `descriptor()`

```solidity
(
    bool isIsolatedOnly,     // True if market only supports isolated margin
    TokenId tokenId,         // Underlying collateral token ID
    MarketId marketId,       // Unique market identifier
    uint32 maturity,         // Maturity timestamp
    uint8 tickStep,          // Tick step for calculating tick rate
    uint16 iTickThresh,      // Tick threshold for margin calculation
    uint32 latestFTime       // Latest fTime
) = market.descriptor();
```

The rate threshold for margin calculations can be derived from `tickStep` and `iTickThresh`:

```solidity
int256 rateThreshold = TickMath.getRateAtTick(iTickThresh, tickStep);
```

### `name()` and `symbol()`

```solidity
string memory marketName = market.name();     // e.g., "Binance ETHUSDT 26 Sep 2025"
string memory marketSymbol = market.symbol(); // e.g., "BINANCE-ETHUSDT-26SEP2025"
```

### `getOI()`

Returns the total open interest across both long and short positions. Note that this represents the sum of absolute position sizes from both sides, which differs from conventional open interest calculations that typically report only one side.

```solidity
uint256 openInterest = market.getOI();
console.log("Total open interest: %s", openInterest);
```

### `getMarketConfig()`

Returns the complete market configuration parameters:

```solidity
struct MarketConfigStruct {
    uint16 maxOpenOrders;                    // Maximum orders per account
    address markRateOracle;                  // Oracle for mark rate calculation
    address fIndexOracle;                    // Oracle for floating index updates
    uint128 hardOICap;                       // Hard open interest cap
    uint64 takerFee;                         // Taker fee rate
    uint64 otcFee;                           // OTC swap fee rate
    LiqSettings liqSettings;                 // Liquidation incentive parameters
    uint64 kIM;                              // Initial margin factor
    uint64 kMM;                              // Maintenance margin factor
    uint32 tThresh;                          // Time threshold for margin calculations
    uint16 maxRateDeviationFactorBase1e4;    // Max rate deviation from mark rate
    uint16 closingOrderBoundBase1e4;         // Rate bounds for closing orders
    int16 loUpperConstBase1e4;               // Limit order upper constant
    int16 loUpperSlopeBase1e4;               // Limit order upper slope
    int16 loLowerConstBase1e4;               // Limit order lower constant
    int16 loLowerSlopeBase1e4;               // Limit order lower slope
    MarketStatus status;                     // Market status (PAUSED/CLO/GOOD)
    bool useImpliedAsMarkRate;               // Whether to use implied rate as mark rate
}

MarketConfigStruct memory config = market.getMarketConfig();
console.log("Max open orders: %s", config.maxOpenOrders);
console.log("Taker fee: %s bps", config.takerFee);
```

## Order Book

### `getNextNTicks()`

```solidity
// Get best 10 LONG ticks
(int16[] memory ticks, uint256[] memory sizes) = market.getNextNTicks(
    Side.LONG,
    Side.LONG.tickToGetFirstAvail(),
    10
);

// Get liquidity after specific tick
int16 bestAskTick = 125;
(int16[] memory nextTicks, uint256[] memory nextSizes) = market.getNextNTicks(
    Side.SHORT,
    bestAskTick,   // Start after this tick
    5
);
```

### `getAllOpenOrders()`

Returns all open orders for a user account. Each order contains:

```solidity
struct Order {
    OrderStatus status;  // NOT_EXIST, OPEN, PENDING_SETTLE, PURGED
    OrderId id;          // Unique 64-bit identifier encoding side, tick, and index
    MarketAcc maker;     // Account that placed the order
    uint256 size;        // Order size (18 decimals)
    int256 rate;         // Order rate derived from tick index
}
```

```solidity
MarketAcc userAccount = AccountLib.toMainCross(userAddress, tokenId);
Order[] memory orders = market.getAllOpenOrders(userAccount);

for (uint i = 0; i < orders.length; i++) {
    Order memory order = orders[i];
    console.log("Order ID: %s", OrderId.unwrap(order.id));
    console.log("Size: %s", order.size);
    console.log("Rate: %s", order.rate);
    console.log("Status: %s", uint(order.status));
}
```

### `getOrder()`

```solidity
OrderId orderId = OrderIdLib.from(Side.LONG, 125, 1000);
Order memory order = market.getOrder(orderId);
```

**Caveats:**

- For order that is **not fully filled**, `size` returns the **remaining unfilled size**, not the original order size.
- If an order is partially filled (possible multiple times) before being fully filled, `size` returns the remaining order size right before the order gets fully filled, excluding previous partial fills.
- Cancelled orders show `status = NOT_EXIST` and `size = 0`.

## Position and Risk

Functions ending with `NoSettle` return potentially outdated data without triggering settlement. Due to Boros's lazy settlement system, on-chain state may not reflect the latest position values until the next user interaction.

**Important:** For accurate, up-to-date position data, first trigger [settlement](../Mechanics/Settlement.md):

```solidity
IMarketHub(marketHub).settleAllAndGet(userAccount, GetRequest.ZERO, MarketId.ZERO);
```

### `getSignedSizeNoSettle()`

```solidity
MarketAcc userAccount = AccountLib.toCross(mainAccount, tokenId);
int256 position = market.getSignedSizeNoSettle(userAccount);
```

### `calcPositionValueNoSettle()`

```solidity
int256 positionValue = market.calcPositionValueNoSettle(userAccount);
```

### `calcMarginNoSettle()`

```solidity
// Calculate initial margin requirement
uint256 initialMargin = market.calcMarginNoSettle(userAccount, MarginType.IM);

// Calculate maintenance margin requirement
uint256 maintenanceMargin = market.calcMarginNoSettle(userAccount, MarginType.MM);
```

### `getMarginFactor()`

```solidity
(uint64 kIM, uint64 kMM) = market.getMarginFactor(userAccount);
```

### `getPendingSizes()`

```solidity
(uint256 pendingLong, uint256 pendingShort) = market.getPendingSizes(userAccount);
console.log("Pending long orders: %s", pendingLong);
console.log("Pending short orders: %s", pendingShort);
```

## Funding and Settlement Tracking

### `getLatestFIndex()`

```solidity
FIndex latestIndex = market.getLatestFIndex();

uint32 fTime = latestIndex.fTime();
int112 floatingIndex = latestIndex.floatingIndex();
uint64 feeIndex = latestIndex.feeIndex();
```

## Rate Information

### `getImpliedRate()`

```solidity
(
    int128 lastTradedRate,      // Last trade execution rate
    int128 oracleRate,          // TWAP rate
    uint32 lastTradedTime,      // Timestamp of last trade
    uint32 observationWindow    // Rate observation window
) = market.getImpliedRate();
```

### `getMarkRateView()`

Returns the current mark rate used for margin calculations and position valuation. This is the oracle-based TWAP rate from the order book's rate observations.

```solidity
int256 markRate = market.getMarkRateView();
```

## Fees

### `getBestFeeRates()`

```solidity
MarketAcc user = AccountLib.toMainCross(userAddress, tokenId);
MarketAcc counterparty = AccountLib.toMainCross(counterpartyAddress, tokenId);

(uint64 takerFee, uint64 otcFee) = market.getBestFeeRates(user, counterparty);
```
