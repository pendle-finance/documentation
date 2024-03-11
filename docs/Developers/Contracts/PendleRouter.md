---
hide_table_of_contents: true
---

# PendleRouter

## Quick Start

* To see examples on how to call various functions, check our [Example repo here!](https://github.com/pendle-finance/pendle-examples)
* To generate calldata for any functions, it's highly recommended to use [Pendle's Hosted SDK](https://api-v2.pendle.finance/sdk/). More about it under Helpers folder.

## Overview

PendleRouter is a contract that aggregates callers' actions with various different SYs, PTs, YTs, and Markets. It is not owned, immutable, and does not have any special permissions or whitelists on any contracts it interacts with. For this reason, any third-party protocols can freely embed the router's logic into their code for better gas efficiency.

Please note that new versions of PendleRouter are released a couple of times per year. While older versions will continue to operate correctly, they will not receive new features. The current version of PendleRouter is V3.

To interact easily with the PendleRouter, please refer to: https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/interfaces/IPAllActionV3.sol

The Router is also a **static** Diamond-Proxy (ERC2535) contract without any upgrade functions as described in this [tweet](https://twitter.com/mudgen/status/1630229952523272195/). A summary for ERC2535 is that there can be multiple implementation contracts for a single proxy, with each function (or set of functions) delegatecall to its own implementation.

## Common Functions

### Add/Remove Liquidity

`addLiquiditySingleToken`: Add liquidity to a market with any ERC20 tokens.

`removeLiquiditySingleToken`: Remove liquidity from a market with ERC20 tokens.

### Buy/Sell PT, YT ###

`swapExactTokenForPt`: Swap an exact amount of a supported ERC20 token for PT.

`swapExactPtForToken`: Swap an exact amount of PT for a supported ERC20 token.

`swapExactTokenForYt`: Swap an exact amount of a supported ERC20 token for TT.

`swapExactYtForToken`: Swap an exact amount of YT for a supported ERC20 token.

### Redeeming PT post-expiry for the underlying ###

`RedeemPyToToken`: PY stands for PT and YT. However, you no longer need YT post-expiry to redeem.

### Redeeming LP, YT yield ###

`redeemDueInterestAndRewards`: Redeem the accrued interest and rewards from both the LP position and YT.

We highly recommend using Pendle's SDK to generate calldata to take full advantage of the swap aggregator, limit order system & off-chain data preparation, which will provide not only better price impacts for users but also a lower gas cost (~ 200k).

However, if you prefer to do things fully onchain, the below sections should be relevant. Our [Example repo](https://github.com/pendle-finance/pendle-examples) contains useful helpers function & examples for this purpose.

## Off-chain helpers

PendleRouter heavily relies on off-chain data to address three main issues:

- Currently, Pendle's AMM only supports the built-in `swapExactPtForSy` and `swapSyForExactPt`. To execute a `swapExactTokenForPt` (which is essentially the same as `swapExactSyForPt`), the router will conduct a binary search to determine the amount of PT to swap. This number will then be used to perform a `swapSyForExactPt` instead. While the binary search can be done entirely on-chain, limiting the search range off-chain will result in significantly less gas consumption for this function.
- Liquidity is currently fragmented across a large number of pools across various DEXes, leading to fragmentation of DEXes. Integrating only Uniswap or Balancer has proven to be insufficient. As a result, PendleRouter has natively integrated [KyberSwap](https://kyberswap.com/) to swap from any ERC20 token to another. For Kyberswap to work, the routing algorithm must be called off-chain then pass the routing results to the Router to execute.
- The limit order system of Pendle exists solely off-chain. Including these limit orders in on-chain swaps can significantly improve the price impact for users, particularly during large size swaps.

## Important Structs in PendleRouter

While most function arguments should be straightforward, using structs can be less intuitive. PendleRouter is a sophisticated contract that supports various powerful features and relies on off-chain pre-computed data to help save gas. Below are the important structs and instructions on how to fill them:

### ApproxParams

```solidity
struct ApproxParams {
    uint256 guessMin;
    uint256 guessMax;
    uint256 guessOffchain;
    uint256 maxIteration;
    uint256 eps;
}
```

In this structure, the following parameters are defined:

- `guessMin` and `guessMax`: The minimum and maximum values for binary search.
- `maxIteration`: The maximum number of times binary search will be performed.
- `eps`: The precision of binary search - the **maximum** proportion of the input that can be unused. `eps` is 1e18-based, so an `eps` of 1e14 implies that no more than 0.01% of the input might be unused.
- `guessOffchain`: This is the first answer to be checked before performing any binary search. If the answer already satisfies, we skip the search and save significant gas.

In case off-chain data cannot be provided, the parameters can be passed as:

```jsx
guessMin: 0, // adjust as desired
guessMax: type(uint256).max, // adjust as desired
guessOffchain: 0, // strictly 0
maxIteration: 256, // adjust as desired
eps: 1e14 // max 0.01% unused, adjust as desired
```

Please note that in this situation, the parameters can be fine-tuned to narrow the search range for optimal gas usage or to reduce the number of unused inputs.


## TokenInput & TokenOutput
```solidity
struct TokenInput {
	// TOKEN DATA
	address tokenIn;
	uint256 netTokenIn;
	address tokenMintSy;
	// AGGREGATOR DATA
	address pendleSwap;
	SwapData swapData;
}

struct TokenOutput {
	// TOKEN DATA
	address tokenOut;
	uint256 minTokenOut;
	address tokenRedeemSy;
	// AGGREGATOR DATA
	address pendleSwap;
	SwapData swapData;
}
```

### Overview
* Pendle system doesn't interact with the underlying token. Swaps happen between SY <-> PT, SY <-> YT ... . Hence, `TokenInput` & `TokenOutput` are data about the conversion between the underlying token and the corresponding SY.
* For `TokenInput`, users start with `netTokenIn` of `tokenIn`, using a swap aggregator to convert those tokens to `tokenMintSy`, and those `tokenMintSy` is used to mint SY.
* For TokenOutput, users receive SY & redeem the SY to `tokenRedeeemSy`. These tokens are swapped through an aggregator to `tokenOut`

### TokenInput
* `tokenIn` & `netTokenIn`: Token & amount that the user starts with
* `tokenMintSy`: The token used to mint SY. Must be in `SY.getTokensIn()`. If `tokenMintSy != tokenIn`, aggregator data must be populated
* `pendleSwap`: Address of swap helper, do not hardcode
* `swapData`: Data for swap, generated by Pendle's SDK
* Aggregator data can be generated by Pendle's SDK. If no aggregator is used, `tokenIn = tokenMintSy`, `pendleSwap = address(0)` & `swapData` is empty
### TokenOutput
* `tokenOut` & `minTokenOut`: Token & minimal amount that the user finally receives
* `tokenRedeemSy`: The token used to redeem SY. Must be in `SY.getTokensOut()`. If `tokenRedeemSy != tokenOut`, aggregator data must be populated
* `pendleSwap`: Address of swap helper, do not hardcode
* `swapData`: Data for swap, generated by Pendle's SDK
* If no aggregator is used, `tokenOut = tokenRedeemSy`, `pendleSwap = address(0)` & `swapData` is empty

## LimitOrderData

```
struct LimitOrderData {
	address limitRouter;
	uint256 epsSkipMarket;
	FillOrderParams[] normalFills;
	FillOrderParams[] flashFills;
	bytes optData;
}
```

* LimitOrderData is generated using Pendle's SDK. If not using limit order, all fields can be set to address(0) or empty