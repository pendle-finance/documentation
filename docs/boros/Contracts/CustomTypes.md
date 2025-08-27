# Custom Types

Boros heavily uses Solidity user-defined value types for gas optimization and type safety. These types use bit-packing to minimize storage costs and provide efficient operations on the EVM.

## Core Trading Types

### Trade

**Definition**: `type Trade is uint256`

**Bit Packing**: `signedSize(128) | signedCost(128)`

```solidity
// Creating trades
Trade memory trade = TradeLib.from(signedSize, signedCost);

Side side = trade.side();
int128 size = trade.signedSize();
int128 cost = trade.signedCost();
```

## Account Types

### Account

**Definition**: `type Account is bytes21`

**Bit Packing**: `address(160) | accountId(8)`

```solidity
// Creating accounts
Account mainAcc = AccountLib.from(userAddress, 0);  // Main account
Account subAcc = AccountLib.from(userAddress, 1);   // Sub-account 1
Account ammAcc = userAddress.toAMM();               // AMM account 255

// Parsing accounts
address root = account.root();         // Extract root address
uint8 accountId = account.accountId(); // Extract account ID

// Special account types
bool isMain = account.isMain();       // accountId == 0
bool isAMM = account.isAMM();         // accountId == 255
```

### MarketAcc

**Definition**: `type MarketAcc is bytes26`

**Bit Packing**: `address(160) | accountId(8) | tokenId(16) | marketId(24)`

```solidity
// Creating market accounts
MarketAcc crossAcc = account.toCross(tokenId);                 // Cross-margin
MarketAcc isolatedAcc = account.toIsolated(tokenId, marketId); // Isolated

// Parsing market accounts
address root = crossAcc.root();
Account account = crossAcc.account();
TokenId tokenId = crossAcc.tokenId();
MarketId marketId = crossAcc.marketId();

// Cross vs isolated margin
bool isCross = isolatedAcc.isCross();
MarketAcc crossAcc = isolatedAcc.toCross();
```

## Order Book Types

### OrderId

**Definition**: `type OrderId is uint64`

**Bit Packing**: `initialized(1) | reserved(6) | side(1) | encodedTick(16) | orderIndex(40)`

```solidity
// Creating order IDs (done internally by order book)
OrderId orderId = OrderIdLib.from(Side.LONG, tickIndex, orderIndex);

// Parsing order IDs
Side side = orderId.side();
int16 tick = orderId.tickIndex();
uint40 index = orderId.orderIndex();

// Priority comparison (lower unwrapped value = higher priority)
bool higherPriority = orderId1 < orderId2;
```

### Side

**Definition**: `enum Side { LONG, SHORT }`

```solidity
Side opposite = side.opposite();          // LONG ↔ SHORT
bool topDown = side.sweepTickTopDown();   // LONG: true, SHORT: false
int16 endTick = side.endTick();          // Boundary tick values

```

### TimeInForce

**Definition**: `enum TimeInForce { GTC, IOC, FOK, ALO, SOFT_ALO }`

- **GTC (Good Till Cancel)**: Standard limit order that remains on the order book until fully filled or manually canceled
- **IOC (Immediate or Cancel)**: Executes against available liquidity immediately, cancels any unfilled portion
- **FOK (Fill or Kill)**: Must fill entire order size immediately or the transaction reverts
- **ALO (Add Liquidity Only)**: Post-only order that adds liquidity to the book, transaction reverts if it would match existing orders
- **SOFT_ALO**: Post-only order similar to ALO, but skips matching without reverting the transaction

### OrderStatus

**Definition**: `enum OrderStatus { NOT_EXIST, OPEN, PENDING_SETTLE, PURGED }`

- **NOT_EXIST**: Order has never been placed or has been cancelled
- **OPEN**: Active order in the order book, available for matching against incoming orders
- **PENDING_SETTLE**: Order has been filled
- **PURGED**: Order was purged because rate is [out of bound](../Mechanics/OrderBook.md#restrictions)

## Market Types

### TokenId

**Definition**: `type TokenId is uint16`

Unique identifier for collateral tokens supported by the protocol.

### MarketId

**Definition**: `type MarketId is uint24`

**Special Value**: The value `type(uint24).max` (16,777,215) is reserved as `MarketIdLib.CROSS` to indicate cross-margin mode, where collateral is shared across all markets within the same collateral zone.

```solidity
// Cross-margin constant
MarketId crossMargin = MarketIdLib.CROSS;  // type(uint24).max

// Regular market IDs for isolated margin
MarketId market1 = MarketId.wrap(1);       // Isolated margin for market 1
MarketId market2 = MarketId.wrap(2);       // Isolated margin for market 2

// Checking margin mode
bool isCross = marketId.isCross();         // true if marketId == CROSS
```

### AMMId

**Definition**: `type AMMId is uint24`

## Advanced Types

### FIndex

**Definition**: `type FIndex is bytes26`

**Bit Packing**: `fTime(32) | floatingIndex(112) | feeIndex(64)`

```solidity
FIndex fIndex = FIndexLib.from(fTime, floatingIndex, feeIndex);

// Parsing components
uint32 fTime = fIndex.fTime();                  // Funding time
int112 floatingIndex = fIndex.floatingIndex();  // Floating rate index
uint64 feeIndex = fIndex.feeIndex();            // Fee accumulator

// Comparison and checks
bool isZero = fIndex.isZero();
bool same = fIndex1 == fIndex2;
```

### VMResult

**Definition**: `type VMResult is uint256`

**Bit Packing**: `value(128) | margin(128)`

```solidity
VMResult result = VMResultLib.from(positionValue, marginRequired);

(int128 value, uint128 margin) = result.unpack();
```
