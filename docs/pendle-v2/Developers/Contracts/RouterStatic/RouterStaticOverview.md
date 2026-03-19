---
hide_table_of_contents: true
---

# RouterStatic Overview

:::info
RouterStatic is designed for **off-chain simulation only** and should not be used for fund-sensitive or on-chain transactions. If you need to call any of these functions on-chain, please contact the Pendle team.
:::

:::tip Recommended: Use the Pendle API
For most integrations, the [Pendle Hosted SDK / API](../../Backend/HostedSdk) is the better choice. It handles off-chain approximation, limit-order filling, and multi-DEX zap routing automatically — all things RouterStatic cannot do. Use RouterStatic directly only when you need fully on-chain quote generation without any external API dependency.
:::

## Overview

RouterStatic is a read-only contract that mirrors every swap, liquidity, mint/redeem, and user-info operation exposed by the live [PendleRouter](../PendleRouter/PendleRouterOverview). Its purpose is pre-flight simulation: call a `*Static` function off-chain to get expected outputs, price impact, and exchange rates, then use those results to set `minOut` / `ApproxParams` before submitting the real transaction.

RouterStatic is a multi-facet proxy ([ERC-2535 Diamond Standard](https://eips.ethereum.org/EIPS/eip-2535)). Use the ABI of `IPRouterStatic` to interact with it — the proxy resolves each call to the correct facet automatically.

Deployment addresses are listed on the [Deployments](../../Deployments) page.

## Interface Facets

| Interface | Purpose |
|-----------|---------|
| `IPActionInfoStatic` | User & position info |
| `IPActionMarketAuxStatic` | Market rates, state, price impact, ApproxParams helpers |
| `IPActionMarketCoreStatic` | Swap + liquidity simulations |
| `IPActionMintRedeemStatic` | Mint/redeem simulations + pyIndex views |
| `IPActionStorageStatic` | Default ApproxParams storage |
| `IPActionVePendleStatic` | vePENDLE-related views |

## Return Types

### TokenAmount

```solidity
struct TokenAmount {
    address token;
    uint256 amount;
}
```

A generic token–amount pair used throughout info functions.

### UserSYInfo

```solidity
struct UserSYInfo {
    TokenAmount syBalance;
    TokenAmount[] unclaimedRewards;
}
```

Returned by `getUserSYInfo`. Contains the user's SY balance and any unclaimed reward tokens.

### UserPYInfo

```solidity
struct UserPYInfo {
    TokenAmount ptBalance;
    TokenAmount ytBalance;
    TokenAmount unclaimedInterest;
    TokenAmount[] unclaimedRewards;
}
```

Returned by `getUserPYInfo`. Contains PT/YT balances, accrued interest, and unclaimed rewards.

### UserMarketInfo

```solidity
struct UserMarketInfo {
    TokenAmount lpBalance;
    TokenAmount ptBalance;
    TokenAmount syBalance;
    TokenAmount[] unclaimedRewards;
}
```

Returned by `getUserMarketInfo`. Contains LP balance, the underlying PT and SY value of that LP, and unclaimed LP rewards.

### MarketState

`MarketState` is the low-level AMM state struct returned by `getMarketState` and `readMarketState`. See [PendleMarket](../PendleMarket) for field-level documentation.

### ApproxParams

`ApproxParams` is used by the live Router for binary-search approximation. The `swapExact*StaticAndGenerateApproxParams` helpers construct a ready-to-use `ApproxParams` struct. See [Types](../PendleRouter/ApiReference/Types#approxparams) for field documentation.

---

## Integration Examples

RouterStatic always follows the same two-step pattern:

1. Call a `*Static` function (off-chain, `eth_call`) to get expected amounts and parameters.
2. Pass those results into the corresponding Router function as `minOut` and/or `ApproxParams`.

The examples below use ethers.js v6. Addresses and amounts are illustrative.

### Setup

```typescript
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(RPC_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Use IPRouterStatic ABI for RouterStatic — the Diamond proxy resolves all facets
const routerStatic = new ethers.Contract(ROUTER_STATIC_ADDRESS, IPRouterStaticABI, provider);

// Use IPAllActionV3 ABI for the live Router
const router = new ethers.Contract(ROUTER_ADDRESS, IPAllActionV3ABI, signer);

const SLIPPAGE = ethers.parseEther("0.005"); // 0.5%

function applySlippage(amount: bigint): bigint {
    return (amount * 995n) / 1000n; // 0.5% slippage
}
```

---

### Buy PT with Token

`swapExactTokenForPtStaticAndGenerateApproxParams` is the recommended way to preflight this trade — it returns `ApproxParams` ready to pass to the Router, which eliminates the need to tune the binary-search parameters manually.

```typescript
const tokenIn   = WSTETH_ADDRESS;
const amountIn  = ethers.parseEther("1");

// 1. Simulate and get ApproxParams
const [netPtOut, , , priceImpact, , approxParams] =
    await routerStatic.swapExactTokenForPtStaticAndGenerateApproxParams(
        MARKET_ADDRESS,
        tokenIn,
        amountIn,
        SLIPPAGE
    );

console.log(`Expected PT out: ${ethers.formatEther(netPtOut)}`);
console.log(`Price impact: ${ethers.formatEther(priceImpact * 100n)}%`);

// 2. Execute
await IERC20(tokenIn).approve(ROUTER_ADDRESS, amountIn);
await router.swapExactTokenForPt(
    signer.address,                         // receiver
    MARKET_ADDRESS,
    applySlippage(netPtOut),                // minPtOut
    approxParams,                           // from RouterStatic
    createTokenInputStruct(tokenIn, amountIn),
    emptyLimitOrderData
);
```

---

### Sell PT for Token

No `ApproxParams` needed — selling PT is an exact-out AMM operation.

```typescript
const tokenOut = WSTETH_ADDRESS;
const ptAmount = ethers.parseEther("1");

// 1. Simulate
const [netTokenOut, , , priceImpact] =
    await routerStatic.swapExactPtForTokenStatic(
        MARKET_ADDRESS,
        ptAmount,
        tokenOut
    );

console.log(`Expected token out: ${ethers.formatEther(netTokenOut)}`);

// 2. Execute
await IERC20(PT_ADDRESS).approve(ROUTER_ADDRESS, ptAmount);
await router.swapExactPtForToken(
    signer.address,
    MARKET_ADDRESS,
    ptAmount,
    createTokenOutputStruct(tokenOut, applySlippage(netTokenOut)), // minTokenOut baked in
    emptyLimitOrderData
);
```

---

### Buy YT with Token

YT buying also requires `ApproxParams`. Use `swapExactSyForPtStaticAndGenerateApproxParams` (after minting SY first) or simply use `swapExactSyForYtStatic` to check the trade, then supply `defaultApproxParams` to the Router.

```typescript
const tokenIn  = WSTETH_ADDRESS;
const amountIn = ethers.parseEther("0.1");

// 1. Simulate YT out (no ApproxParams helper for YT — use defaultApprox on Router)
const [netYtOut, , priceImpact] =
    await routerStatic.swapExactTokenForYtStatic(
        MARKET_ADDRESS,
        tokenIn,
        amountIn
    );

console.log(`Expected YT out: ${ethers.formatEther(netYtOut)}`);
console.log(`Price impact: ${ethers.formatEther(priceImpact * 100n)}%`);

// Reject if price impact is too high
if (priceImpact > ethers.parseEther("0.02")) {  // > 2%
    throw new Error("Price impact too high");
}

// 2. Execute
await IERC20(tokenIn).approve(ROUTER_ADDRESS, amountIn);
await router.swapExactTokenForYt(
    signer.address,
    MARKET_ADDRESS,
    applySlippage(netYtOut),                // minYtOut
    defaultApproxParams,
    createTokenInputStruct(tokenIn, amountIn),
    emptyLimitOrderData
);
```

---

### Sell YT for Token

```typescript
const tokenOut = WSTETH_ADDRESS;
const ytAmount = ethers.parseEther("10");

// 1. Simulate
const [netTokenOut, , priceImpact] =
    await routerStatic.swapExactYtForTokenStatic(
        MARKET_ADDRESS,
        ytAmount,
        tokenOut
    );

console.log(`Expected token out: ${ethers.formatEther(netTokenOut)}`);

// 2. Execute
await IERC20(YT_ADDRESS).approve(ROUTER_ADDRESS, ytAmount);
await router.swapExactYtForToken(
    signer.address,
    MARKET_ADDRESS,
    ytAmount,
    createTokenOutputStruct(tokenOut, applySlippage(netTokenOut)),
    emptyLimitOrderData
);
```

---

### Add Liquidity (Single Token)

```typescript
const tokenIn  = WSTETH_ADDRESS;
const amountIn = ethers.parseEther("1");

// 1. Simulate
const [netLpOut, , , priceImpact] =
    await routerStatic.addLiquiditySingleTokenStatic(
        MARKET_ADDRESS,
        tokenIn,
        amountIn
    );

console.log(`Expected LP out: ${ethers.formatEther(netLpOut)}`);

// 2. Execute
await IERC20(tokenIn).approve(ROUTER_ADDRESS, amountIn);
await router.addLiquiditySingleToken(
    signer.address,
    MARKET_ADDRESS,
    applySlippage(netLpOut),                // minLpOut
    defaultApproxParams,
    createTokenInputStruct(tokenIn, amountIn),
    emptyLimitOrderData
);
```

---

### Add Liquidity and Keep YT

This operation splits your token into LP + YT. RouterStatic lets you preview both outputs.

```typescript
const tokenIn  = WSTETH_ADDRESS;
const amountIn = ethers.parseEther("1");

// 1. Simulate
const [netLpOut, netYtOut, netSyMinted, netSyToPY] =
    await routerStatic.addLiquiditySingleTokenKeepYtStatic(
        MARKET_ADDRESS,
        tokenIn,
        amountIn
    );

console.log(`Expected LP out: ${ethers.formatEther(netLpOut)}`);
console.log(`Expected YT out: ${ethers.formatEther(netYtOut)}`);

// 2. Execute
await IERC20(tokenIn).approve(ROUTER_ADDRESS, amountIn);
await router.addLiquiditySingleTokenKeepYt(
    signer.address,
    MARKET_ADDRESS,
    applySlippage(netLpOut),                // minLpOut
    applySlippage(netYtOut),                // minYtOut
    createTokenInputStruct(tokenIn, amountIn)
    // note: no limit order parameter for KeepYt variant
);
```

---

### Remove Liquidity (Single Token)

```typescript
const tokenOut = WSTETH_ADDRESS;
const lpAmount = ethers.parseEther("0.5");

// 1. Simulate
const [netTokenOut, , priceImpact] =
    await routerStatic.removeLiquiditySingleTokenStatic(
        MARKET_ADDRESS,
        lpAmount,
        tokenOut
    );

console.log(`Expected token out: ${ethers.formatEther(netTokenOut)}`);

// 2. Execute
await IERC20(MARKET_ADDRESS).approve(ROUTER_ADDRESS, lpAmount);
await router.removeLiquiditySingleToken(
    signer.address,
    MARKET_ADDRESS,
    lpAmount,
    createTokenOutputStruct(tokenOut, applySlippage(netTokenOut)),
    emptyLimitOrderData
);
```

---

### Mint PT & YT from Token

```typescript
const tokenIn  = WSTETH_ADDRESS;
const amountIn = ethers.parseEther("1");

// 1. Simulate
const netPyOut = await routerStatic.mintPyFromTokenStatic(
    YT_ADDRESS,
    tokenIn,
    amountIn
);

console.log(`Expected PT+YT out: ${ethers.formatEther(netPyOut)} each`);

// 2. Execute
await IERC20(tokenIn).approve(ROUTER_ADDRESS, amountIn);
await router.mintPyFromToken(
    signer.address,
    YT_ADDRESS,
    applySlippage(netPyOut),                // minPyOut
    createTokenInputStruct(tokenIn, amountIn)
);
```

---

### Redeem PT & YT to Token

```typescript
const tokenOut = WSTETH_ADDRESS;
const pyAmount = ethers.parseEther("1");

// 1. Simulate
const netTokenOut = await routerStatic.redeemPyToTokenStatic(
    YT_ADDRESS,
    pyAmount,
    tokenOut
);

console.log(`Expected token out: ${ethers.formatEther(netTokenOut)}`);

// 2. Execute
await IERC20(PT_ADDRESS).approve(ROUTER_ADDRESS, pyAmount);
await IERC20(YT_ADDRESS).approve(ROUTER_ADDRESS, pyAmount);
await router.redeemPyToToken(
    signer.address,
    YT_ADDRESS,
    pyAmount,
    createTokenOutputStruct(tokenOut, applySlippage(netTokenOut))
);
```

---

### Price Impact Guard

Use RouterStatic to reject trades that exceed a price impact threshold before ever building a transaction.

```typescript
const MAX_PRICE_IMPACT = ethers.parseEther("0.01"); // 1%

async function safeBuyPt(market: string, tokenIn: string, amountIn: bigint) {
    const [netPtOut, , , priceImpact, , approxParams] =
        await routerStatic.swapExactTokenForPtStaticAndGenerateApproxParams(
            market, tokenIn, amountIn, SLIPPAGE
        );

    if (priceImpact > MAX_PRICE_IMPACT) {
        throw new Error(`Price impact ${ethers.formatEther(priceImpact * 100n)}% exceeds limit`);
    }

    await IERC20(tokenIn).approve(ROUTER_ADDRESS, amountIn);
    return router.swapExactTokenForPt(
        signer.address,
        market,
        applySlippage(netPtOut),
        approxParams,
        createTokenInputStruct(tokenIn, amountIn),
        emptyLimitOrderData
    );
}
```

---

### Check Pending Rewards Before Claiming

```typescript
// 1. Preview rewards without writing state
const marketInfo = await routerStatic.getUserMarketInfo(MARKET_ADDRESS, userAddress);

for (const reward of marketInfo.unclaimedRewards) {
    console.log(`Reward token: ${reward.token}, amount: ${ethers.formatEther(reward.amount)}`);
}

// Only claim if there's something worth the gas
const totalRewardValue = await estimateRewardValue(marketInfo.unclaimedRewards);
if (totalRewardValue > MIN_CLAIM_THRESHOLD) {
    await router.redeemDueInterestAndRewards(
        userAddress,
        [],           // SY addresses
        [],           // YT addresses
        [MARKET_ADDRESS]
    );
}
```

> **Note:** RouterStatic functions must be called with `eth_call` (read-only). Never submit them as state-changing transactions.
