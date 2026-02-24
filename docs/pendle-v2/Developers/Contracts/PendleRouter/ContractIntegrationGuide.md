---
hide_table_of_contents: true
---

# Pendle Router Contract Integration Guide

## Overview

This guide shows how to interact with the Pendle Router for common on-chain actions—buying/selling PT or YT, adding/removing liquidity, minting/redeeming PT and YT, and claiming rewards. It’s intended for developers who want to integrate Pendle fully on-chain without using the Pendle SDK.

For most use cases, we recommend the Pendle SDK for a better developer and end-user experience. The SDK supports zap-in/zap-out from any token, limit-order filling, and off-chain quoting, among other features. See the [Pendle SDK documentation](../../Backend/HostedSdk.mdx) for details.

The full tutorial source code is available in [RouterSample.sol](https://github.com/pendle-finance/pendle-examples-public/blob/main/test/RouterSample.sol). The examples target the wstETH market, but you can adapt them to other markets by changing the market and underlying asset addresses.


## Quick Navigation

### Helper functions
- [Helper Functions](#helper-functions)

### Trading Operations
- [PT Trading](#pt-trading)
- [YT Trading](#yt-trading)

### Liquidity Operations  
- [Add Liquidity (Zap In) & Remove Liquidity (Zap Out)](#liquidity-management)
- [Add Liquidity (Keep YT)](#add-liquidity-keep-yt)

### Other Operations
- [Mint/Burn SY](#mint-sy-from-token)
- [Mint/Redeem PT & YT](#mint-pt--yt-from-token)

---

## Helper Functions

Since Pendle Router supports various aggregators and off-chain approximation, the function parameters can be quite complex. To simplify the usage, we provide some helper functions to create the required structs with default values. Please find the full implementation in [StructGen.sol](https://github.com/pendle-finance/pendle-examples-public/blob/main/src/StructGen.sol).

```solidity
import "@pendle/core-v2/contracts/interfaces/IPAllActionV3.sol";
import "@pendle/core-v2/contracts/interfaces/IPMarket.sol";

IPAllActionV3 router = IPAllActionV3(0x888888888889758F76e7103c6CbF23ABbF58F946);

// EmptySwap means no swap aggregator is involved
SwapData public emptySwap;

// EmptyLimit means no limit order is involved
LimitOrderData public emptyLimit;

// DefaultApprox means no off-chain preparation is involved, more gas consuming (~ 180k gas)
ApproxParams public defaultApprox = ApproxParams(0, type(uint256).max, 0, 256, 1e14);

/// @notice create a simple TokenInput struct without using any aggregators. For more info please refer to
/// IPAllActionTypeV3.sol
function createTokenInputStruct(address tokenIn, uint256 netTokenIn) internal view returns (TokenInput memory);

/// @notice create a simple TokenOutput struct without using any aggregators. For more info please refer to
/// IPAllActionTypeV3.sol
function createTokenOutputStruct(
    address tokenOut,
    uint256 minTokenOut
) internal view returns (TokenOutput memory);
```

## PT Trading

### Buy PT with Token
Buying PT with underlying token. This example uses wstETH to buy PT-wstETH.
```solidity
address market = 0xD0354D4e7bCf345fB117cabe41aCaDb724eccCa2;
address wstETH = 0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0;
address ptReceiver = address(this);

IERC20(wstETH).approve(address(router), tokenAmount);
(uint256 netPtOut, , ) = router.swapExactTokenForPt(
    ptReceiver,                 // receiver
    address(market),            // market address
    0,                          // minPtOut
    defaultApprox,              // approximation params
    createTokenInputStruct(wstETH, tokenAmount),  // token input
    emptyLimit                  // limit order data
);
```

### Sell PT for Token
Selling PT for underlying token. This example uses PT-wstETH to sell for wstETH.
```solidity
address market = 0xD0354D4e7bCf345fB117cabe41aCaDb724eccCa2;
address wstETH = 0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0;
(, address PT, ) = IPMarket(market).readTokens();
address tokenReceiver = address(this);

IERC20(PT).approve(address(router), ptAmount);
(uint256 netTokenOut, , ) = router.swapExactPtForToken(
    tokenReceiver,              // receiver
    address(market),            // market address  
    ptAmount,                   // exact PT amount to sell
    createTokenOutputStruct(wstETH, 0),  // token output (0 = no minimum)
    emptyLimit                  // limit order data
);
```

---

## YT Trading

### Buy YT with Token
Buying YT with underlying token. This example uses wstETH to buy YT-wstETH.

```solidity
address market = 0xD0354D4e7bCf345fB117cabe41aCaDb724eccCa2;
address wstETH = 0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0;
address ytReceiver = address(this);

IERC20(wstETH).approve(address(router), tokenAmount);
(uint256 netYtOut, , ) = router.swapExactTokenForYt(
    ytReceiver,                 // receiver
    address(market),            // market address
    0,                          // minYtOut
    defaultApprox,              // approximation params
    createTokenInputStruct(wstETH, tokenAmount),  // token input
    emptyLimit                  // limit order data
);
```

### Sell YT for Token
Selling YT for underlying token. This example uses YT-wstETH to sell for wstETH.

```solidity
address market = 0xD0354D4e7bCf345fB117cabe41aCaDb724eccCa2;
address wstETH = 0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0;
(,, address YT) = IPMarket(market).readTokens();
address tokenReceiver = address(this);

IERC20(YT).approve(address(router), ytAmount);
(uint256 netTokenOut, , ) = router.swapExactYtForToken(
    tokenReceiver,              // receiver
    address(market),            // market address
    ytAmount,                   // exact YT amount to sell
    createTokenOutputStruct(wstETH, 0),  // token output (0 = no minimum)
    emptyLimit                  // limit order data
);
```

---

## Liquidity Management

### Add Liquidity (Zap In)
Add liquidity to a market using a single underlying token. This example uses wstETH to add liquidity to wstETH market.

```solidity
address market = 0xD0354D4e7bCf345fB117cabe41aCaDb724eccCa2;
address wstETH = 0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0;
address lpReceiver = address(this);

IERC20(wstETH).approve(address(router), tokenAmount);
(uint256 netLpOut, , ) = router.addLiquiditySingleToken(
    lpReceiver,                 // receiver
    address(market),            // market address
    0,                          // minLpOut
    defaultApprox,              // approximation params
    createTokenInputStruct(wstETH, tokenAmount),  // token input
    emptyLimit                  // limit order data
);
```

### Remove Liquidity (Zap Out)
Remove liquidity from a market to a single underlying token. This example uses wstETH market to remove liquidity to wstETH.

```solidity
address market = 0xD0354D4e7bCf345fB117cabe41aCaDb724eccCa2;
address wstETH = 0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0;
address tokenReceiver = address(this);

IERC20(market).approve(address(router), lpAmount);
(uint256 netTokenOut, , ) = router.removeLiquiditySingleToken(
    address(this),              // receiver
    address(market),            // market address
    lpAmount,                   // exact LP amount to remove
    createTokenOutputStruct(wstETH, 0),  // token output (0 = no minimum)
    emptyLimit                  // limit order data
);
```

### Add Liquidity (Keep YT)
Add liquidity to a market using a single underlying token while keeping the YT. This example uses wstETH to add liquidity to wstETH market while keeping the YT. More information about this function can be found in the [documentation](./ApiReference/LiquidityFunctions#addliquiditysingletokenkeepyt).

```solidity
address market = 0xD0354D4e7bCf345fB117cabe41aCaDb724eccCa2;
address wstETH = 0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0;
address lpReceiver = address(this);

IERC20(wstETH).approve(address(router), tokenAmount);
(uint256 netLpOut, uint256 netYtOut, , ) = router.addLiquiditySingleTokenKeepYt(
    lpReceiver,                 // receiver
    address(market),            // market address
    0,                          // minLpOut
    0,                          // minYtOut
    createTokenInputStruct(wstETH, tokenAmount)   // token input
);
```

## Other Operations

### Mint SY from Token

Mint SY using underlying token. This example uses wstETH to mint SY-wstETH.

```solidity
address market = 0xD0354D4e7bCf345fB117cabe41aCaDb724eccCa2;
(address SY,,) = IPMarket(market).readTokens();
address wstETH = 0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0;
address syReceiver = address(this);

IERC20(wstETH).approve(address(router), tokenAmount);
uint256 netSyOut = router.mintSyFromToken(
    syReceiver,                 // receiver
    address(SY),                // SY token address
    0,                          // minSyOut
    createTokenInputStruct(wstETH, tokenAmount)   // token input
);
```

### Redeem SY to Token

Redeem SY to underlying token. This example uses SY-wstETH to redeem to wstETH.

```solidity
address market = 0xD0354D4e7bCf345fB117cabe41aCaDb724eccCa2;
(address SY,,) = IPMarket(market).readTokens();
address wstETH = 0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0;
address tokenReceiver = address(this);

IERC20(SY).approve(address(router), syAmount);
uint256 netTokenOut = router.redeemSyToToken(
    tokenReceiver,              // receiver
    address(SY),                // SY token address
    syAmount,                   // exact SY amount to redeem
    createTokenOutputStruct(wstETH, 0)    // token output (0 = no minimum)
);
```

### Mint PT & YT from Token

Mint both PT and YT using underlying token. This example uses wstETH to mint PT-wstETH and YT-wstETH.

```solidity
address market = 0xD0354D4e7bCf345fB117cabe41aCaDb724eccCa2;
(,, address YT) = IPMarket(market).readTokens();
address wstETH = 0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0;
address pyReceiver = address(this);

IERC20(wstETH).approve(address(router), tokenAmount);
(uint256 netPyOut, ) = router.mintPyFromToken(
    pyReceiver,                 // receiver
    address(YT),                // YT token address (used to identify market)
    0,                          // minPyOut
    createTokenInputStruct(wstETH, tokenAmount)   // token input
);
// netPyOut represents both PT and YT amounts (they're equal)
```

### Redeem PT & YT to Token

Redeem both PT and YT to underlying token. This example uses PT-wstETH and YT-wstETH to redeem to wstETH.

```solidity
address market = 0xD0354D4e7bCf345fB117cabe41aCaDb724eccCa2;
(, address PT, address YT) = IPMarket(market).readTokens();
address wstETH = 0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0;
address tokenReceiver = address(this);

IERC20(PT).approve(address(router), pyAmount);
IERC20(YT).approve(address(router), pyAmount);

(uint256 netTokenOut, ) = router.redeemPyToToken(
    tokenReceiver,              // receiver
    address(YT),                // YT token address (used to identify market)
    pyAmount,                   // exact PT+YT amount to redeem
    createTokenOutputStruct(wstETH, 0)    // token output (0 = no minimum)
);
```