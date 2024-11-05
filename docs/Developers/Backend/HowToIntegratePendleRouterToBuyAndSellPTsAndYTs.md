---
hide_table_of_contents: true
---

# How to buy and sell PTs/YTs

This guide covers how to interact with the Pendle Router to buy and sell Principal Tokens (PTs) and Yield Tokens (YTs) using two methods:

1. **Pendle's Hosted SDK**: Recommended for optimized liquidity, gas efficiency, and broader token support. Hosted SDK is publicly available at [https://api-v2.pendle.finance/core/docs](https://api-v2.pendle.finance/core/docs). More about it at [Pendle Hosted SDK](Backend.md#pendle-hosted-sdk).
2. **Direct Interaction with the Pendle Router**: Offers direct contract interaction, all data are generate onchain.

Using the Pendle Hosted SDK is generally preferred due to:

- **Improved liquidity and gas efficiency**
- **Access to deeper liquidity with limit orders**
- **Convenient zapping with any ERC20 token**

We’ll explore both methods, including example code, for each approach.

## Method 1: Using the Pendle Hosted SDK

Pendle’s Hosted SDK provides a generic `swap` endpoint to swap any supported ERC20 token for PT or YT and vice versa. The SDK automatically finds the best route for the swap, including intermediate swaps if necessary. It supports:

- Swap an exact amount of a supported ERC20 token for PT.
- Swap an exact amount of PT for a supported ERC20 token.
- Swap an exact amount of a supported ERC20 token for YT.
- Swap an exact amount of YT for a supported ERC20 token.

### Example: Buy PT (wstETH) using 1 wstETH with 1% Slippage

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

### Example: Sell 1 YT (wstETH) to wstETH with 1% Slippage

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

### Using the Aggregator for Optimal Routing

Aggregator is a feature of the Pendle SDK that helps users find the most optimal route to interact with the Pendle system from any supported ERC20 token. This feature ensures that users can use whatever token they have to interact with the Pendle system. For example, user can use `USDC` to buy `PT wstETH` in `wstETH` market using aggregator, without it, user need to swap `USDC` to `wETH` first then use Pendle to buy `PT wstETH` with `wETH` .

To take advantage of the aggregator, users need to set the `enableAggregator` option to `true`.

#### Example: Buy PT (wstETH) using 1000 USDC with 1% Slippage

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

#### Example: Sell 1 PT (wstETH) to USDC with 1% Slippage

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

## Method 2: Direct Interaction with the Pendle Router

You can also generate contract calls directly using the Pendle Router. This approach requires knowledge of specific Pendle Router contract structures, including `TokenInput`, `TokenOutput`, `ApproxParams`, and `LimitOrderData`.

For detailed information on these structures, refer to the [Pendle Router Documentation](https://docs.pendle.finance/Developers/Contracts/PendleRouter).

### Generating Required Parameters On-Chain

Although Pendle’s Hosted SDK is recommended for parameter generation, the following functions can be used for on-chain generation:

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

### Example: Swapping 1000 USDC for PT via Pendle Router

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

# More Actions Available!

In addition to swapping tokens, you can also **add**, **remove liquidity**, **mint PT YT**, **redeem PT YT**, **transfer liquidity**, **roll over pt** in Pendle markets using either the **Pendle Hosted SDK** or by directly interacting with the **Pendle Router**.

## Adding and Removing Liquidity

### Using the Pendle Hosted SDK

We have provided examples for each action using the Pendle Hosted SDK:

- [Add Liquidity](https://github.com/pendle-finance/pendle-examples-public/blob/main/hosted-sdk-demo/src/add-liquidity-dual.ts)
- [Zap In (single token)](https://github.com/pendle-finance/pendle-examples-public/blob/main/hosted-sdk-demo/src/add-liquidity.ts)
- [Remove Liquidity](https://github.com/pendle-finance/pendle-examples-public/blob/main/hosted-sdk-demo/src/remove-liquidity-dual.ts)
- [Zap Out (single token)](https://github.com/pendle-finance/pendle-examples-public/blob/main/hosted-sdk-demo/src/remove-liquidity.ts)
- [Transfer Liquidity](https://github.com/pendle-finance/pendle-examples-public/blob/main/hosted-sdk-demo/src/transfer-liquidity.ts)
- [Roll Over PT](https://github.com/pendle-finance/pendle-examples-public/blob/main/hosted-sdk-demo/src/roll-over-pt.ts)
- [Mint PT YT](https://github.com/pendle-finance/pendle-examples-public/blob/main/hosted-sdk-demo/src/mint-py.ts)
- [Redeem PT YT](https://github.com/pendle-finance/pendle-examples-public/blob/main/hosted-sdk-demo/src/redeem-py.ts)

### Direct Interaction with the Pendle Router

Here’s an example of adding liquidity with a single token (zap in) via the Pendle Router:

```solidity
addLiquiditySingleToken(
    msg.sender,
    MARKET_ADDRESS,
    minLpOut,
    createDefaultApproxParams(),
    createTokenInputSimple(USDC_ADDRESS, 1000e6),
    createEmptyLimitOrderData()
);
```
