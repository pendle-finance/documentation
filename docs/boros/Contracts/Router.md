# Router Integration Guide

The Router contract serves as the main entry point for all user interactions with Boros.

Router follows a modular architecture:

- **AuthModule**: agent authentication and delegated trading (irrelevant for external parties)
- **AMMModule**: AMM-specific operations (add/remove liquidity, swaps)
- **TradeModule**: core trading operations (enter/exit markets, place/cancel orders, cash transfer)
- **MiscModule**: utility functions

## Account Authorization

Currently, you can only operate on the **main account (subaccount 0)**. Support for other subaccounts may be added in future versions.

Most Router functions require two key parameters:

- **`bool cross`**: Specifies margin mode (true = cross-margin, false = isolated-margin)
- **`MarketId marketId`**: The market identifier

These parameters construct the `MarketAcc` (Market Account) identifier:

```solidity
// Cross-margin account (can trade multiple markets)
bool cross = true;
MarketId marketId = MarketIdLib.CROSS;  // Special cross-margin value

// Isolated-margin account (single market)
bool cross = false;
MarketId marketId = MarketId.wrap(12345);   // Specific market ID
```

## Vault Operations

Vault operations manage the underlying collateral tokens.

### Deposit cash

```solidity
router.vaultDeposit(
    0,          // accountId (0 = main account)
    tokenId,    // TokenId of collateral token
    marketId,   // marketId (2^24-1 for cross account)
    1 ether     // Raw token amount
);
```

### Withdraw cash

Withdrawals follow a two-step process: request → cooldown period → finalize.

**Checking Withdrawal Status**: You can monitor your withdrawal request status and cooldown period through MarketHub's [getUserWithdrawalStatus](./MarketHub.md#getuserwithdrawalstatus) function. This returns detailed information including the pending amount and exact timestamp when withdrawal becomes available.

```solidity
// Step 1: Request withdrawal
router.requestVaultWithdrawal(tokenId, 1 ether);

// Step 2: After cooldown period, finalize withdrawal on MarketHub
IMarketHub(marketHub).finalizeVaultWithdrawal(
    address(this),  // root address
    tokenId         // TokenId of collateral token
);

// Can cancel pending withdrawal
router.cancelVaultWithdrawal(tokenId);
```

### Cash Transfer

Transfer cash between cross-margin and isolated-margin accounts using the same collateral token.

```solidity
// Transfer from cross-margin to isolated-margin account
CashTransferReq memory req = CashTransferReq({
    marketId: marketId,        // Target isolated market
    signedAmount: 1000e18      // Positive = from cross to isolated
});
router.cashTransfer(req);

// Transfer from isolated-margin back to cross-margin account
req.signedAmount = -500e18;    // Negative = from isolated to cross
router.cashTransfer(req);
```

## Market Entry and Exit

### Enter Markets

Users must enter markets before trading.

```solidity
MarketId[] memory marketIds = new MarketId[](2);
marketIds[0] = marketId0;
marketIds[1] = marketId1;

// Enter multiple markets
EnterExitMarketsReq memory req = EnterExitMarketsReq({
    cross: true,
    isEnter: true,
    marketIds: marketIds
});
router.enterExitMarkets(req);
```

**Market Entry Limits**: Each account can enter a maximum of **10 markets** simultaneously. Exceeding this limit will cause transactions to revert.

**Market Entrance Fees**: A one-time entrance fee is charged when you first interact with any market:

- **BTC markets**: 0.000008 BTC (≈$1 USD)
- **ETH markets**: 0.00027 ETH (≈$1 USD)

**Minimum Cash Requirements**: You must maintain minimum cash balances in your account to participate in markets. Check the [specific requirements](./MarketHub.md#getcashfeedata) for cross vs isolated margin modes.

### Exit Markets

**Exit Requirements**: To exit a market, you must:

- Close all positions (zero position size)
- Cancel all open orders
- Have no pending settlements

**Market Maturity**: When markets reach maturity, you should exit them to free up market slots.

```solidity
MarketId[] memory marketIds = new MarketId[](2);
marketIds[0] = marketId0;
marketIds[1] = marketId1;

// Exit multiple markets
EnterExitMarketsReq memory req = EnterExitMarketsReq({
    cross: true,
    isEnter: false,
    marketIds: marketIds
});
router.enterExitMarkets(req);
```

## Order Book Trading

### Place Single Order

**Compound Function**: `placeSingleOrder` is a compound function that can:

- Automatically enter markets if `enterMarket` is true
- Cancel existing orders via `idToStrictCancel`
- Place the new order
- Transfer cash for isolated margin positions
- Automatically exit markets if `exitMarket` is true

This reduces the number of transactions needed for complex operations.

```solidity
// Basic limit order
SingleOrderReq memory req = SingleOrderReq({
    order: OrderReq({
        cross: true,                    // Cross-margin
        marketId: marketId,
        ammId: AMMIdLib.ZERO,           // Order book only (not AMM)
        side: Side.LONG,                // Buy interest rate swap
        tif: TimeInForce.GTC,           // Good till cancelled
        size: 1000e18,                  // Position size
        tick: 125                       // Price tick (≈5% rate)
    }),
    enterMarket: false,                 // Don't auto-enter market
    idToStrictCancel: OrderIdLib.ZERO,  // No order to cancel
    exitMarket: false,                  // Don't auto-exit
    isolated_cashIn: 0,                 // For isolated margin only
    isolated_cashTransferAll: false,
    desiredMatchRate: 0                 // Accept any match rate
});

router.placeSingleOrder(req);
```

### Bulk Orders

**Optimal for Market Makers**: `bulkOrders` is designed for professional market makers and offers:

- Place multiple orders in a single transaction
- Operate across multiple markets simultaneously
- Cancel existing orders before placing new ones
- Significant gas savings compared to individual order transactions

**Cancel Parameters**:

- `isAll: true` - Cancel all existing orders in the market before placing new orders
- `isAll: false` - Cancel only the specific order IDs listed in the `ids` array
- `isStrict: true` - Transaction reverts if any specified order ID doesn't exist
- `isStrict: false` - Silently skip non-existent order IDs without reverting

```solidity
// Place multiple orders across different markets
BulkOrder[] memory bulks = new BulkOrder[](2);

uint256[] memory sizes0 = new uint256[](2);
sizes0[0] = 500e18;
sizes0[1] = 300e18;
int16[] memory limitTicks0 = new int16[](2);
limitTicks0[0] = 120;
limitTicks0[1] = 125;

bulks[0] = BulkOrder({
    marketId: marketId1,
    orders: LongShort({
        tif: TimeInForce.GTC,
        side: Side.LONG,
        sizes: sizes0,
        limitTicks: limitTicks0
    }),
    cancelData: CancelData({
        ids: new OrderId[](0),
        isAll: false,
        isStrict: false
    })
});

uint256[] memory sizes1 = new uint256[](1);
sizes1[0] = 1900e18;
int16[] memory limitTicks1 = new int16[](1);
limitTicks1[0] = 140;

bulks[1] = BulkOrder({
    marketId: marketId2,
    orders: LongShort({
        tif: TimeInForce.GTC,
        side: Side.SHORT,
        sizes: [1000e18],
        limitTicks: [140]
    }),
    cancelData: CancelData({
        ids: new OrderId[](0),
        isAll: false,
        isStrict: false
    })
});

int128[] memory desiredMatchRates = new int128[](2);
desiredMatchRates[0] = 0;
desiredMatchRates[1] = 0;

BulkOrdersReq memory req = BulkOrdersReq({
    cross: true,
    bulks: bulks,
    desiredMatchRates: desiredMatchRates
});

BulkOrderResult[] memory results = router.bulkOrders(req);
```

### Cancel Orders

```solidity
OrderId[] memory orderIds = new OrderId[](2);
orderIds[0] = orderId1;
orderIds[1] = orderId2;

// Cancel specific orders
BulkCancels memory cancels = BulkCancels({
    cross: true,
    marketId: marketId,
    cancelAll: false,
    orderIds: orderIds
});
router.bulkCancels(cancels);

// Cancel all orders in a market
cancels.cancelAll = true;
cancels.orderIds = new OrderId[](0);
router.bulkCancels(cancels);
```

## AMM

### Add Liquidity Dual

Adding liquidity requires providing both cash and position sizes in proportion to the AMM's current state. The AMM automatically calculates the required ratio based on its current cash-to-position balance.

```solidity
AddLiquidityDualToAmmReq memory req = AddLiquidityDualToAmmReq({
    cross: true,
    ammId: ammId,
    maxCashIn: 10000e18,
    exactSizeIn: 1000e18,
    minLpOut: 950e18
});

(uint256 lpOut, int256 cashIn, uint256 fee) = router.addLiquidityDualToAmm(req);
```

### Add Liquidity Single Cash

This function simplifies liquidity provision by:

1. Using part of your cash to trade for the required position size
2. Adding the remaining cash + acquired position as dual liquidity

```solidity
AddLiquiditySingleCashToAmmReq memory req = AddLiquiditySingleCashToAmmReq({
    cross: true,
    ammId: ammId,
    enterMarket: true,
    netCashIn: 5000e18,
    minLpOut: 450e18
});

(uint256 lpOut, int256 cashUsed, uint256 fee, int256 swapSize) =
    router.addLiquiditySingleCashToAmm(req);
```

### Remove Liquidity Dual

Removes liquidity and receives both cash and position sizes proportionally. You specify the LP tokens to burn and receive the underlying assets based on the AMM's current composition.

```solidity
// Remove liquidity and receive both cash and size
RemoveLiquidityDualFromAmmReq memory req = RemoveLiquidityDualFromAmmReq({
    cross: true,
    ammId: ammId,
    lpToRemove: 1000e18,
    minCashOut: 4500e18,
    minSizeOut: -1200e18,
    maxSizeOut: -800e18
});

(int256 cashOut, int256 sizeOut, uint256 fee) = router.removeLiquidityDualFromAmm(req);
```

### Remove Liquidity Single Cash

Removes liquidity and converts everything to cash by:

1. Withdrawing proportional cash and position sizes
2. Trading the position sizes back to cash
3. Returning the total cash amount to you

```solidity
RemoveLiquiditySingleCashFromAmmReq memory req = RemoveLiquiditySingleCashFromAmmReq({
    cross: true,
    ammId: ammId,
    lpToRemove: 500e18,
    minCashOut: 4800e18
});

(int256 cashOut, uint256 fee, int256 swapSize) =
    router.removeLiquiditySingleCashFromAmm(req);
```

## Simulation

The MiscModule provides simulation capabilities.

```solidity
// Simulate multiple operations
SimulateData[] memory simulations = new SimulateData[](2);

simulations[0] = SimulateData({
    account: mainAccount,
    target: address(router),
    data: abi.encodeCall(ITradeModule.placeSingleOrder, orderRequest)
});

simulations[1] = SimulateData({
    account: mainAccount,
    target: address(router),
    data: abi.encodeCall(IAMMModule.swapWithAmm, swapRequest)
});

// Get simulation results without changing state
(bytes[] memory results, uint256[] memory gasUsed) = router.batchSimulate(simulations);
```
