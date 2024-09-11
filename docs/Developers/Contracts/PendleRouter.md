---

hide_table_of_contents: true

---

# PendleRouter

## Quick Start

- To see examples of how to call various functions, check our [Example repository](https://github.com/pendle-finance/pendle-examples).
- To generate calldata for any functions, it's highly recommended to use [Pendle's Hosted SDK](https://api-v2.pendle.finance/core/docs#/SDK). Using the SDK provides significant advantages in terms of gas efficiency, accurate price impacts, and ease of integration.

## Overview

PendleRouter is a contract that aggregates callers' actions with various different SYs, PTs, YTs, and Markets. It does not have any special permissions or whitelists on any contracts it interacts with. Therefore, any third-party protocols can freely embed the router's logic into their code for better gas efficiency.

Please note that new versions of PendleRouter are released a couple of times per year. While older versions will continue to operate correctly, they will not receive new features. Up until now, the Router has had four versions:
- **RouterV1**, deployed on 23/11/2022 at `0x41FAD93F225b5C1C95f2445A5d7fcB85bA46713f`
- **RouterV2**, deployed on 21/02/2023 at `0x0000000001e4ef00d069e71d6ba041b0a16f7ea0`, 15% to 20% more gas-optimized
- **RouterV3**, deployed on 18/12/2023 at `0x00000000005BBB0EF59571E58418F9a4357b68A0`, supporting limit orders
- **RouterV4**, deployed on 29/04/2024 at `0x888888888889758F76e7103c6CbF23ABbF58F946`, upgradable router to support new features and optimize the algorithm more easily without requiring partners to migrate. This is likely the last version of the Router with features being added gradually.

Since PendleRouter is a proxy to multiple implementations, the caller can call the desired functions, and the Router will resolve to the correct implementation. Please refer to the [list of callable functions](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/interfaces/IPAllActionV3.sol).

For a comprehensive understanding of the Pendle ecosystem, including key concepts and terminology, please refer to the [Overview document](../Overview.md).

## Common Functions

### Add/Remove Liquidity

- **`addLiquiditySingleToken`**: Add liquidity to a market with any ERC20 tokens.
- **`removeLiquiditySingleToken`**: Remove liquidity from a market with ERC20 tokens.

### Buy/Sell PT, YT

- **`swapExactTokenForPt`**: Swap an exact amount of a supported ERC20 token for PT.
- **`swapExactPtForToken`**: Swap an exact amount of PT for a supported ERC20 token.
- **`swapExactTokenForYt`**: Swap an exact amount of a supported ERC20 token for YT.
- **`swapExactYtForToken`**: Swap an exact amount of YT for a supported ERC20 token.

### Redeeming PT post-expiry for the underlying

- **`RedeemPyToToken`**: PY stands for PT and YT. Post-expiry, you no longer need YT to redeem.

### Redeeming LP, YT yield

- **`redeemDueInterestAndRewards`**: Redeem the accrued interest and rewards from both the LP position and YT.

## Importance of Using Pendle's SDK

We highly recommend using Pendle's SDK to generate calldata for several reasons:
1. **Gas Efficiency**: The SDK leverages off-chain data to optimize gas usage, potentially reducing gas costs significantly.
2. **Accurate Price Impacts**: The SDK provides precise calculations for swaps, ensuring better price impacts for users.
3. **Ease of Integration**: By using the SDK, developers can seamlessly integrate Pendle's functionality into their applications, leveraging the full power of the swap aggregator, limit order system, and off-chain data preparation.

For on-chain operations, our [Example repository](https://github.com/pendle-finance/pendle-examples) contains useful helper functions and examples to assist you.

## Off-chain Helpers

PendleRouter heavily relies on off-chain data to address three main issues:

1. **Swap Execution**: Currently, Pendle's AMM only supports the built-in `swapExactPtForSy` and `swapSyForExactPt`. To execute a `swapExactTokenForPt` (which is essentially the same as `swapExactSyForPt`), the router will conduct a binary search to determine the amount of PT to swap. While the binary search can be done entirely on-chain, limiting the search range off-chain will result in significantly less gas consumption for this function.
2. **Liquidity Fragmentation**: Liquidity is currently fragmented across a large number of pools across various DEXes. Integrating only Uniswap or Balancer has proven to be insufficient. As a result, PendleRouter has natively integrated [KyberSwap](https://kyberswap.com/) to swap from any ERC20 token to another. For KyberSwap to work, the routing algorithm must be called off-chain and then pass the routing results to the Router to execute.
3. **Limit Order System**: The limit order system of Pendle exists solely off-chain. Including these limit orders in on-chain swaps can significantly improve the price impact for users, particularly during large-size swaps.

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

- `guessMin` and `guessMax`: The minimum and maximum values for binary search.
- `maxIteration`: The maximum number of times binary search will be performed.
- `eps`: The precision of binary search - the maximum proportion of the input that can be unused. `eps` is 1e18-based, so an `eps` of 1e14 implies that no more than 0.01% of the input might be unused.
- `guessOffchain`: This is the first answer to be checked before performing any binary search. If the answer already satisfies the conditions, we skip the search and save significant gas.

In case off-chain data cannot be provided, the parameters can be passed as:

```solidity
guessMin: 0, // adjust as desired
guessMax: type(uint256).max, // adjust as desired
guessOffchain: 0, // strictly 0
maxIteration: 256, // adjust as desired
eps: 1e14 // max 0.01% unused, adjust as desired
```

Please note that in this situation, the parameters can be fine-tuned to narrow the search range for optimal gas usage or to reduce the number of unused inputs.

### TokenInput & TokenOutput

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

#### Overview

Pendle system doesn't interact with the underlying token. Swaps happen between SY <-> PT, SY <-> YT, etc. Hence, `TokenInput` & `TokenOutput` are data about the conversion between the underlying token and the corresponding SY.

- **TokenInput**: Users start with `netTokenIn` of `tokenIn`, using a swap aggregator to convert those tokens to `tokenMintSy`, and those `tokenMintSy` is used to mint SY.
- **TokenOutput**: Users receive SY & redeem the SY to `tokenRedeemSy`. These tokens are swapped through an aggregator to `tokenOut`.

#### TokenInput

- `tokenIn` & `netTokenIn`: Token & amount that the user starts with.
- `tokenMintSy`: The token used to mint SY. Must be in `SY.getTokensIn()`. If `tokenMintSy != tokenIn`, aggregator data must be populated.
- `pendleSwap`: Address of swap helper, do not hardcode.
- `swapData`: Data for swap, generated by Pendle's SDK.

Aggregator data can be generated by Pendle's SDK. If no aggregator is used, `tokenIn = tokenMintSy`, `pendleSwap = address(0)`, and `swapData` is empty.

#### TokenOutput

- `tokenOut` & `minTokenOut`: Token & minimal amount that the user finally receives.
- `tokenRedeemSy`: The token used to redeem SY. Must be in `SY.getTokensOut()`. If `tokenRedeemSy != tokenOut`, aggregator data must be populated.
- `pendleSwap`: Address of swap helper, do not hardcode.
- `swapData`: Data for swap, generated by Pendle's SDK.

If no aggregator is used, `tokenOut = tokenRedeemSy`, `pendleSwap = address(0)`, and `swapData` is empty.

### LimitOrderData

```solidity


struct LimitOrderData {
	address limitRouter;
	uint256 epsSkipMarket;
	FillOrderParams[] normalFills;
	FillOrderParams[] flashFills;
	bytes optData;
}
```

LimitOrderData is generated using Pendle's SDK. If not using a limit order, all fields can be set to `address(0)` or empty.
