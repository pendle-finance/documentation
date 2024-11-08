---
hide_table_of_contents: true
---

# PendleRouter

## Quick Start

- To see examples of how to use Pendle Router, checkout [Integration Guide](#integration-guide).

## Overview

PendleRouter is a contract that aggregates callers' actions with various different SYs, PTs, YTs, and Markets. It does not have any special permissions or whitelists on any contracts it interacts with. Therefore, any third-party protocols can freely embed the router's logic into their code for better gas efficiency.

Please note that new versions of PendleRouter are released a couple of times per year. While older versions will continue to operate correctly, they will not receive new features. Up until now, the Router has had four versions:

- **RouterV1**, deployed on 23/11/2022 at `0x41FAD93F225b5C1C95f2445A5d7fcB85bA46713f`
- **RouterV2**, deployed on 21/02/2023 at `0x0000000001e4ef00d069e71d6ba041b0a16f7ea0`, 15% to 20% more gas-optimized
- **RouterV3**, deployed on 18/12/2023 at `0x00000000005BBB0EF59571E58418F9a4357b68A0`, supporting limit orders
- **RouterV4**, deployed on 29/04/2024 at `0x888888888889758F76e7103c6CbF23ABbF58F946`, upgradable router to support new features and optimize the algorithm more easily without requiring partners to migrate. This is likely the last version of the Router with features being added gradually.

Since PendleRouter is a proxy to multiple implementations, the caller can call the desired functions, and the Router will resolve to the correct implementation. Please refer to the [list of callable functions](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/interfaces/IPAllActionV3.sol).

For a comprehensive understanding of the Pendle ecosystem, including key concepts and terminology, please refer to the [Overview document](../Overview.md).

## Integration Guide

This section covers how to interact with the Pendle Router to buy and sell Principal Tokens (PTs) and Yield Tokens (YTs) using two methods:

1. **Pendle's Hosted SDK**: Recommended for optimized liquidity, gas efficiency, and broader token support. Hosted SDK is publicly available at [https://api-v2.pendle.finance/core/docs](https://api-v2.pendle.finance/core/docs). More about it at [Pendle Hosted SDK](Backend.md#pendle-hosted-sdk).
2. **Direct Interaction with the Pendle Router**: Offers direct contract interaction, all data are generate onchain.

We highly recommend using Pendle's SDK to generate calldata for several reasons:

1. **Gas Efficiency**: Currently, Pendle's AMM only supports the built-in `swapExactPtForSy` and `swapSyForExactPt`. To execute a `swapExactTokenForPt` (which is essentially the same as `swapExactSyForPt`), the router will conduct a binary search to determine the amount of PT to swap. While the binary search can be done entirely on-chain, limiting the search range off-chain will result in significantly less gas consumption for this function. The SDK leverages off-chain data to optimize gas usage, potentially reducing gas costs significantly.
2. **Accurate Price Impacts**: The SDK provides precise calculations for swaps, ensuring better price impacts for users.
3. **Limit Order System**: The limit order system of Pendle exists solely off-chain. Including these limit orders in on-chain swaps can significantly improve the price impact for users, particularly during large-size swaps.
4. **Ease of Integration**: By using the SDK, developers can seamlessly integrate Pendle's functionality into their applications, leveraging the full power of the swap aggregator, limit order system, and off-chain data preparation.
5. **Convenient zapping with any ERC20 token**: Liquidity is currently fragmented across a large number of pools across various DEXes. Integrating only Uniswap or Balancer has proven to be insufficient. As a result, PendleRouter has natively integrated [KyberSwap](https://kyberswap.com/) to swap from any ERC20 token to another. For KyberSwap to work, the routing algorithm must be called off-chain and then pass the routing results to the Router to execute.

We'll explore both methods, including example code, for each approach.

### Method 1: Using the Pendle Hosted SDK

Pendle's Hosted SDK provides a generic `swap` endpoint to swap any supported ERC20 token for PT or YT and vice versa. The SDK automatically finds the best route for the swap, including intermediate swaps if necessary. It supports:

- Swap an exact amount of a supported ERC20 token for PT.
- Swap an exact amount of PT for a supported ERC20 token.
- Swap an exact amount of a supported ERC20 token for YT.
- Swap an exact amount of YT for a supported ERC20 token.

#### Example: Buy PT (wstETH) using 1 wstETH with 1% Slippage

```ts
async function swapTokenToPt() {
  // Swap 1 wstETH to PT in wstETH market with 1% slippage
  const res = await callSDK<SwapData>(`/v1/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
    receiver: RECEIVER_ADDRESS,
    slippage: 0.01,
    tokenIn: wstETH,
    tokenOut: PT_ADDRESS,
    amountIn: "1000000000000000000",
  });

  console.log("Amount PT Out: ", res.data.amountOut);
  console.log("Price impact: ", res.data.priceImpact);
  console.log("Transaction data: ", res.data.tx);

  // Send transaction using the data that we get from the SDK
  await getSigner().sendTransaction(res.tx);
}
```

#### Example: Sell 1 YT (wstETH) to wstETH with 1% Slippage

```ts
export async function swapYtToToken() {
  // Swap 1 YT to wstETH in wstETH market with 1% slippage
  const res = await callSDK<SwapData>(`/v1/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
    receiver: RECEIVER_ADDRESS,
    slippage: 0.01,
    tokenIn: YT_ADDRESS,
    tokenOut: wstETH,
    amountIn: "1000000000000000000",
  });

  console.log("Amount wstETH Out: ", res.data.amountOut);
  console.log("Price impact: ", res.data.priceImpact);

  // Send tx
  getSigner().sendTransaction(res.tx);
}
```

For full source code, refer to [this example](https://github.com/pendle-finance/pendle-examples-public/blob/main/hosted-sdk-demo/src/swap.ts#L90).

#### Using the Aggregator for Optimal Routing

Aggregator is a feature of the Pendle SDK that helps users find the most optimal route to interact with the Pendle system from any supported ERC20 token. This feature ensures that users can use whatever token they have to interact with the Pendle system. For example, user can use `USDC` to buy `PT wstETH` in `wstETH` market using aggregator, without it, user need to swap `USDC` to `wETH` first then use Pendle to buy `PT wstETH` with `wETH` .

To take advantage of the aggregator, users need to set the `enableAggregator` option to `true`.

##### Example: Buy PT (wstETH) using 1000 USDC with 1% Slippage

```ts
export async function swapTokenToPtUsingAggregation() {
  // Swap 1000 USDC to PT in wstETH market with 1% slippage
  const res = await callSDK<SwapData>(`/v1/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
    receiver: RECEIVER_ADDRESS,
    slippage: 0.01,
    tokenIn: USDC,
    tokenOut: PT_ADDRESS,
    // USDC has 6 decimals
    amountIn: (1000n * 10n ** 6n).toString(),
    // enable aggregator, else it will throw an error because USDC could not be directly swapped to PT
    enableAggregator: true,
  });

  console.log("Amount PT Out: ", res.data.amountOut);
  console.log("Price impact: ", res.data.priceImpact);

  // Send tx
  await getSigner().sendTransaction(res.tx);
}
```

##### Example: Sell 1 PT (wstETH) to USDC with 1% Slippage

```ts
export async function swapPtToTokenUsingAggregation() {
  // Swap 1 PT to USDC in wstETH market with 1% slippage
  const res = await callSDK<SwapData>(`/v1/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
    receiver: RECEIVER_ADDRESS,
    slippage: 0.01,
    tokenIn: PT_ADDRESS,
    tokenOut: USDC,
    amountIn: "1000000000000000000",
    // enable aggregator
    enableAggregator: true,
  });

  console.log("Amount USDC Out: ", res.data.amountOut);
  console.log("Price impact: ", res.data.priceImpact);

  // Send tx
  getSigner().sendTransaction(res.tx);
}
```

### Method 2: Direct Interaction with the Pendle Router

You can also generate contract calls directly using the Pendle Router. This approach requires knowledge of specific Pendle Router contract structures, including `TokenInput`, `TokenOutput`, `ApproxParams`, and `LimitOrderData`.

For detailed information on these structures, refer to the [Important Structs in PendleRouter](#important-structs-in-pendlerouter).

#### Generating Required Parameters On-Chain

Although Pendle's Hosted SDK is recommended for parameter generation, the following functions can be used for on-chain generation:

- **`TokenInput`**: `createTokenInputSimple`
- **`TokenOutput`**: `createTokenOutputSimple`
- **`ApproxParams`**: `createDefaultApproxParams`
- **`LimitOrderData`**: `createEmptyLimitOrderData`

#### Example Code for Parameter Creation

```solidity
/// @dev Creates a TokenInput struct without using any swap aggregator
/// @param tokenIn must be one of the SY's tokens in (obtain via `IStandardizedYield#getTokensIn`)
/// @param netTokenIn amount of token in
function createTokenInputSimple(address tokenIn, uint256 netTokenIn) pure returns (TokenInput memory) {
    return
        TokenInput({
            tokenIn: tokenIn,
            netTokenIn: netTokenIn,
            tokenMintSy: tokenIn,
            pendleSwap: address(0),
            swapData: createSwapTypeNoAggregator()
        });
}

/// @dev Creates a TokenOutput struct without using any swap aggregator
/// @param tokenOut must be one of the SY's tokens out (obtain via `IStandardizedYield#getTokensOut`)
/// @param minTokenOut minimum amount of token out
function createTokenOutputSimple(address tokenOut, uint256 minTokenOut) pure returns (TokenOutput memory) {
    return
        TokenOutput({
            tokenOut: tokenOut,
            minTokenOut: minTokenOut,
            tokenRedeemSy: tokenOut,
            pendleSwap: address(0),
            swapData: createSwapTypeNoAggregator()
        });
}

function createEmptyLimitOrderData() pure returns (LimitOrderData memory) {}

/// @dev Creates default ApproxParams for on-chain approximation
function createDefaultApproxParams() pure returns (ApproxParams memory) {
    return ApproxParams({guessMin: 0, guessMax: type(uint256).max, guessOffchain: 0, maxIteration: 256, eps: 1e14});
}

function createSwapTypeNoAggregator() pure returns (SwapData memory) {}
```

The full source code is available [here](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/interfaces/IPAllActionTypeV3.sol).

#### Example: Swapping 1000 USDC for PT via Pendle Router

Once the parameters (`TokenInput`, `TokenOutput`, etc.) are generated, you can call `swapExactTokenForPt` on the Pendle Router.

```solidity
swapExactTokenForPt(
    msg.sender,
    MARKET_ADDRESS,
    minPtOut,
    createDefaultApproxParams(),
    createTokenInputSimple(USDC_ADDRESS, 1000e6),
    createEmptyLimitOrderData()
);
```

### More Actions Available!

In addition to swapping tokens, you can also **add**, **remove liquidity**, **mint PT YT**, **redeem PT YT**, **transfer liquidity**, **roll over pt** in Pendle markets using either the **Pendle Hosted SDK** or by directly interacting with the **Pendle Router**.

#### Using the Pendle Hosted SDK

We have provided examples for each action using the Pendle Hosted SDK:

- [Add Liquidity](https://github.com/pendle-finance/pendle-examples-public/blob/main/hosted-sdk-demo/src/add-liquidity-dual.ts)
- [Zap In (single token)](https://github.com/pendle-finance/pendle-examples-public/blob/main/hosted-sdk-demo/src/add-liquidity.ts)
- [Remove Liquidity](https://github.com/pendle-finance/pendle-examples-public/blob/main/hosted-sdk-demo/src/remove-liquidity-dual.ts)
- [Zap Out (single token)](https://github.com/pendle-finance/pendle-examples-public/blob/main/hosted-sdk-demo/src/remove-liquidity.ts)
- [Transfer Liquidity](https://github.com/pendle-finance/pendle-examples-public/blob/main/hosted-sdk-demo/src/transfer-liquidity.ts)
- [Roll Over PT](https://github.com/pendle-finance/pendle-examples-public/blob/main/hosted-sdk-demo/src/roll-over-pt.ts)
- [Mint PT YT](https://github.com/pendle-finance/pendle-examples-public/blob/main/hosted-sdk-demo/src/mint-py.ts)
- [Redeem PT YT](https://github.com/pendle-finance/pendle-examples-public/blob/main/hosted-sdk-demo/src/redeem-py.ts)

#### Direct Interaction with the Pendle Router

Here is the list of common functions and their actions in the Pendle Router:

- Add/Remove Liquidity
  - **`addLiquiditySingleToken`**: Add liquidity to a market with any ERC20 tokens.
  - **`removeLiquiditySingleToken`**: Remove liquidity from a market with ERC20 tokens.
- Buy/Sell PT, YT
  - **`swapExactTokenForPt`**: Swap an exact amount of a supported ERC20 token for PT.
  - **`swapExactPtForToken`**: Swap an exact amount of PT for a supported ERC20 token.
  - **`swapExactTokenForYt`**: Swap an exact amount of a supported ERC20 token for YT.
  - **`swapExactYtForToken`**: Swap an exact amount of YT for a supported ERC20 token.
- Redeeming PT post-expiry for the underlying
  - **`RedeemPyToToken`**: PY stands for PT and YT. Post-expiry, you no longer need YT to redeem.
- Redeeming LP, YT yield
  - **`redeemDueInterestAndRewards`**: Redeem the accrued interest and rewards from both the LP position and YT.

You can find example code on how to use those functions at [Example Repository/RouterSample.sol](https://github.com/pendle-finance/pendle-examples-public/blob/main/test/RouterSample.sol)

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
