---
hide_table_of_contents: true
---

# PendleRouter

## Overview

PendleRouter is a contract that aggregates callers' actions with various different SYs, PTs, YTs, and Markets. It is not owned, immutable, and does not have any special permissions or whitelists on any contracts it interacts with. For this reason, any third-party protocols can freely embed the router's logic into their code for better gas efficiency.

The Router is also a **static** Diamond-Proxy (ERC2535) contract without any upgrade functions as described in this [tweet](https://twitter.com/mudgen/status/1630229952523272195/). A summary for ERC2535 is that there can be multiple implementation contracts for a single proxy, with each function (or set of functions) delegatecall to its own implementation.

To interact easily with the PendleRouter, please refer to: https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/interfaces/IPAllAction.sol

For a list of all the functions that can be called on the Router, users can use the `IPAllAction ABI` and call it on the Router address, which will resolve the call accordingly.

## Off-chain helpers

PendleRouter heavily relies on off-chain data to address two main issues:

- Currently, Pendle's AMM only supports the built-in `swapExactPtForSy` and `swapSyForExactPt`. To execute a `swapExactTokenForPt` (which is essentially the same as `swapExactSyForPt`), the router will conduct a binary search to determine the amount of PT to swap. This number will then be used to perform a `swapSyForExactPt` instead. While the binary search can be done entirely on-chain, limiting the search range off-chain will result in significantly less gas consumption for this function.
- Liquidity is currently fragmented across a large number of pools across various DEXes, leading to fragmentation of DEXes. Integrating only Uniswap or Balancer has proven to be insufficient. As a result, PendleRouter has natively integrated [KyberSwap](https://kyberswap.com/) to swap from any ERC20 token to another. For Kyberswap to work, the routing algorithm must be called off-chain then pass the routing results to the Router to execute.

## Common Functions

Please see [IPAllAction](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/interfaces/IPAllAction.sol) for a complete list of features.

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

:::tip
We highly recommend using Pendle's SDK to generate calldata. The guide to use Pendle’s SDK can be found [here](../SDK/GettingStarted).
:::

However, if you prefer to generate the data without using the Pendle SDK, the below sections should be relevant.

## Important Structures in PendleRouter

While most function arguments should be straightforward, using structs can be less intuitive. PendleRouter is a sophisticated contract that supports various powerful features and relies on off-chain pre-computed data to help save gas. Below are the important structs and instructions on how to fill them:

### ApproxParams

:::info
The easiest way to generate this struct is to use Pendle's SDK. If you want to understand more, keep reading!
:::

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
eps: 1e15 // max 0.1% unused, adjust as desired
```

Please note that in this situation, the parameters can be fine-tuned to narrow the search range for optimal gas usage or to reduce the number of unused inputs.

## TokenInput

```solidity
struct TokenInput {
    // token/Sy data
    address tokenIn;
    uint256 netTokenIn;
    address tokenMintSy;
    address bulk;
    // aggregator data
    address pendleSwap;
    SwapData swapData;
}

struct SwapData {
    SwapType swapType;
    address extRouter;
    bytes extCalldata;
    bool needScale;
}

enum SwapType {
    NONE,
    KYBERSWAP,
    ONE_INCH,
    // ETH_WETH not used in Aggregator
    ETH_WETH
}
```

`tokenIn` and `netTokenIn` refer to the token used for swapping or adding liquidity.

`tokenMintSy` is the token that `tokenIn` will be swapped to in order to mint SY. For example, if `tokenIn` is `USDC` but users are adding liquidity to the stETH market, then `tokenMintSy` must be ETH, and `pendleSwap` and `swapData` must be populated.

`bulk` should be passed as `address(0)`.

For `pendleSwap` and `swapData`, by default, all values will be zero unless `tokenIn` and `tokenMintSy` are different from each other. In this case, the following should be passed:

- `pendleSwap`: Address of the `pendleSwap` deployment on that chain. This was not hardcoded to allow for easy upgrade of `pendleSwap`.
- `swapData`:
    - `swapType`: Usually `KYBERSWAP`, unless it's a simple ETH wrap-unwrap, in which case `ETH_WETH` should be used.
    - `extRouter`: If `KYBERSWAP` is chosen, this will be passed as their router address.
    - `extCalldata`: If `KYBERSWAP` is chosen, this will be passed as the calldata returned by their routing API.
    - `needScale`: If `KYBERSWAP` is chosen, we will pass false if the `amountIn` used to generate calldata and `netTokenIn` are the same. Otherwise, pass true.

Please note that all of KyberSwap's related API can be obtained from [Kyberswap's own API](https://docs.kyberswap.com/).

### TokenOutput

Same as TokenOutput.
