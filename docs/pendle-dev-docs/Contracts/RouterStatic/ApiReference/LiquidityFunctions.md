---
hide_table_of_contents: true
---

# Liquidity Simulation Functions

These functions come from the `IPActionMarketCoreStatic` facet. They simulate the corresponding Router liquidity operations and return expected token flows, fees, and price impact.

---

## Add Liquidity

### addLiquidityDualSyAndPtStatic

Simulates adding liquidity with both SY and PT simultaneously. No swap is performed — tokens are deposited proportionally.

```solidity
function addLiquidityDualSyAndPtStatic(address market, uint256 netSyDesired, uint256 netPtDesired)
    external
    view
    returns (uint256 netLpOut, uint256 netSyUsed, uint256 netPtUsed)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| netSyDesired | `uint256` | Maximum SY to deposit |
| netPtDesired | `uint256` | Maximum PT to deposit |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netLpOut | `uint256` | LP tokens received |
| netSyUsed | `uint256` | Actual SY deposited (≤ `netSyDesired`) |
| netPtUsed | `uint256` | Actual PT deposited (≤ `netPtDesired`) |

---

### addLiquidityDualTokenAndPtStatic

Simulates adding liquidity with an arbitrary token and PT. The token is converted to SY first.

```solidity
function addLiquidityDualTokenAndPtStatic(
    address market,
    address tokenIn,
    uint256 netTokenDesired,
    uint256 netPtDesired
)
    external
    view
    returns (
        uint256 netLpOut,
        uint256 netTokenUsed,
        uint256 netPtUsed,
        uint256 netSyUsed,
        uint256 netSyDesired
    )
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| tokenIn | `address` | Input token to convert to SY |
| netTokenDesired | `uint256` | Maximum token amount to deposit |
| netPtDesired | `uint256` | Maximum PT to deposit |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netLpOut | `uint256` | LP tokens received |
| netTokenUsed | `uint256` | Actual token consumed |
| netPtUsed | `uint256` | Actual PT deposited |
| netSyUsed | `uint256` | SY deposited into the pool |
| netSyDesired | `uint256` | SY minted from `netTokenUsed` |

---

### addLiquiditySinglePtStatic

Simulates adding liquidity with PT only. A portion of the PT is swapped to SY internally.

```solidity
function addLiquiditySinglePtStatic(address market, uint256 netPtIn)
    external
    view
    returns (
        uint256 netLpOut,
        uint256 netPtToSwap,
        uint256 netSyFee,
        uint256 priceImpact,
        uint256 exchangeRateAfter,
        uint256 netSyFromSwap
    )
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| netPtIn | `uint256` | Total PT to deposit |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netLpOut | `uint256` | LP tokens received |
| netPtToSwap | `uint256` | PT swapped to SY to balance the deposit |
| netSyFee | `uint256` | Fee paid in SY |
| priceImpact | `uint256` | Price impact of the internal swap |
| exchangeRateAfter | `uint256` | Exchange rate after the internal swap |
| netSyFromSwap | `uint256` | SY obtained from swapping `netPtToSwap` |

---

### addLiquiditySingleSyStatic

Simulates adding liquidity with SY only. A portion of the SY is swapped to PT internally.

```solidity
function addLiquiditySingleSyStatic(address market, uint256 netSyIn)
    external
    view
    returns (
        uint256 netLpOut,
        uint256 netPtFromSwap,
        uint256 netSyFee,
        uint256 priceImpact,
        uint256 exchangeRateAfter,
        uint256 netSyToSwap
    )
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| netSyIn | `uint256` | Total SY to deposit |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netLpOut | `uint256` | LP tokens received |
| netPtFromSwap | `uint256` | PT obtained from swapping SY |
| netSyFee | `uint256` | Fee paid in SY |
| priceImpact | `uint256` | Price impact of the internal swap |
| exchangeRateAfter | `uint256` | Exchange rate after the internal swap |
| netSyToSwap | `uint256` | SY used in the internal swap |

---

### addLiquiditySingleTokenStatic

Simulates adding liquidity with an arbitrary token only. The token is minted to SY, then handled like `addLiquiditySingleSy`.

```solidity
function addLiquiditySingleTokenStatic(address market, address tokenIn, uint256 netTokenIn)
    external
    view
    returns (
        uint256 netLpOut,
        uint256 netPtFromSwap,
        uint256 netSyFee,
        uint256 priceImpact,
        uint256 exchangeRateAfter,
        uint256 netSyMinted,
        uint256 netSyToSwap
    )
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| tokenIn | `address` | Input token address |
| netTokenIn | `uint256` | Token amount to deposit |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netLpOut | `uint256` | LP tokens received |
| netPtFromSwap | `uint256` | PT obtained from the internal swap |
| netSyFee | `uint256` | Fee paid in SY |
| priceImpact | `uint256` | Price impact of the internal swap |
| exchangeRateAfter | `uint256` | Exchange rate after the internal swap |
| netSyMinted | `uint256` | SY minted from the input token |
| netSyToSwap | `uint256` | SY used in the internal swap |

---

### addLiquiditySingleSyKeepYtStatic

Simulates adding liquidity with SY and retaining the YT that is minted during the process. Part of the SY is used to mint PT+YT; the PT goes into the pool while the YT is kept by the user.

```solidity
function addLiquiditySingleSyKeepYtStatic(address market, uint256 netSyIn)
    external
    view
    returns (uint256 netLpOut, uint256 netYtOut, uint256 netSyToPY)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| netSyIn | `uint256` | SY to deposit |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netLpOut | `uint256` | LP tokens received |
| netYtOut | `uint256` | YT retained by the user |
| netSyToPY | `uint256` | SY used to mint PT+YT |

---

### addLiquiditySingleTokenKeepYtStatic

Simulates adding liquidity with an arbitrary token while retaining the minted YT.

```solidity
function addLiquiditySingleTokenKeepYtStatic(address market, address tokenIn, uint256 netTokenIn)
    external
    view
    returns (uint256 netLpOut, uint256 netYtOut, uint256 netSyMinted, uint256 netSyToPY)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| tokenIn | `address` | Input token address |
| netTokenIn | `uint256` | Token amount to deposit |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netLpOut | `uint256` | LP tokens received |
| netYtOut | `uint256` | YT retained by the user |
| netSyMinted | `uint256` | SY minted from the input token |
| netSyToPY | `uint256` | SY used to mint PT+YT |

---

## Remove Liquidity

### removeLiquidityDualSyAndPtStatic

Simulates removing liquidity and receiving both SY and PT proportionally.

```solidity
function removeLiquidityDualSyAndPtStatic(address market, uint256 netLpToRemove)
    external
    view
    returns (uint256 netSyOut, uint256 netPtOut)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| netLpToRemove | `uint256` | LP tokens to burn |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netSyOut | `uint256` | SY received |
| netPtOut | `uint256` | PT received |

---

### removeLiquidityDualTokenAndPtStatic

Simulates removing liquidity and receiving an arbitrary token (converted from SY) plus PT.

```solidity
function removeLiquidityDualTokenAndPtStatic(address market, uint256 netLpToRemove, address tokenOut)
    external
    view
    returns (uint256 netTokenOut, uint256 netPtOut, uint256 netSyToRedeem)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| netLpToRemove | `uint256` | LP tokens to burn |
| tokenOut | `address` | Desired output token |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netTokenOut | `uint256` | Token received (converted from SY) |
| netPtOut | `uint256` | PT received |
| netSyToRedeem | `uint256` | SY redeemed to produce the token output |

---

### removeLiquiditySinglePtStatic

Simulates removing liquidity and receiving PT only. The SY portion is swapped to PT internally.

```solidity
function removeLiquiditySinglePtStatic(address market, uint256 netLpToRemove)
    external
    view
    returns (
        uint256 netPtOut,
        uint256 netPtFromSwap,
        uint256 netSyFee,
        uint256 priceImpact,
        uint256 exchangeRateAfter,
        uint256 netSyFromBurn,
        uint256 netPtFromBurn
    )
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| netLpToRemove | `uint256` | LP tokens to burn |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netPtOut | `uint256` | Total PT received |
| netPtFromSwap | `uint256` | PT obtained from swapping the SY portion |
| netSyFee | `uint256` | Fee paid in SY |
| priceImpact | `uint256` | Price impact of the internal swap |
| exchangeRateAfter | `uint256` | Exchange rate after the internal swap |
| netSyFromBurn | `uint256` | SY received from burning LP |
| netPtFromBurn | `uint256` | PT received directly from burning LP |

---

### removeLiquiditySingleSyStatic

Simulates removing liquidity and receiving SY only. The PT portion is swapped to SY internally.

```solidity
function removeLiquiditySingleSyStatic(address market, uint256 netLpToRemove)
    external
    view
    returns (
        uint256 netSyOut,
        uint256 netSyFee,
        uint256 priceImpact,
        uint256 exchangeRateAfter,
        uint256 netSyFromBurn,
        uint256 netPtFromBurn,
        uint256 netSyFromSwap
    )
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| netLpToRemove | `uint256` | LP tokens to burn |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netSyOut | `uint256` | Total SY received |
| netSyFee | `uint256` | Fee paid in SY |
| priceImpact | `uint256` | Price impact of the internal swap |
| exchangeRateAfter | `uint256` | Exchange rate after the internal swap |
| netSyFromBurn | `uint256` | SY received directly from burning LP |
| netPtFromBurn | `uint256` | PT received from burning LP (then swapped) |
| netSyFromSwap | `uint256` | SY obtained from swapping `netPtFromBurn` |

---

### removeLiquiditySingleTokenStatic

Simulates removing liquidity and receiving an arbitrary token only. The SY from LP burn is redeemed, and the PT portion is first swapped to SY.

```solidity
function removeLiquiditySingleTokenStatic(address market, uint256 netLpToRemove, address tokenOut)
    external
    view
    returns (
        uint256 netTokenOut,
        uint256 netSyFee,
        uint256 priceImpact,
        uint256 exchangeRateAfter,
        uint256 netSyOut,
        uint256 netSyFromBurn,
        uint256 netPtFromBurn,
        uint256 netSyFromSwap
    )
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| netLpToRemove | `uint256` | LP tokens to burn |
| tokenOut | `address` | Desired output token |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netTokenOut | `uint256` | Token received |
| netSyFee | `uint256` | Fee paid in SY |
| priceImpact | `uint256` | Price impact of the internal swap |
| exchangeRateAfter | `uint256` | Exchange rate after the internal swap |
| netSyOut | `uint256` | Total SY before token redemption |
| netSyFromBurn | `uint256` | SY received directly from burning LP |
| netPtFromBurn | `uint256` | PT received from burning LP (then swapped) |
| netSyFromSwap | `uint256` | SY obtained from swapping `netPtFromBurn` |

---

## Examples

:::tip Recommended: Use the Pendle API
The examples below show direct RouterStatic usage. For most integrations, the [Pendle Hosted SDK / API](../../../Backend/HostedSdk) is the better choice — it handles approximation, limit-order filling, and zap routing automatically.
:::

### Add single-token liquidity — simulate then execute

```typescript
const tokenIn  = WSTETH_ADDRESS;
const amountIn = ethers.parseEther("1");

// 1. Simulate to get expected LP and internal breakdown
const [netLpOut, netPtFromSwap, , priceImpact, , netSyMinted, netSyToSwap] =
    await routerStatic.addLiquiditySingleTokenStatic(MARKET_ADDRESS, tokenIn, amountIn);

console.log(`Expected LP out: ${ethers.formatEther(netLpOut)}`);
console.log(`Price impact: ${ethers.formatEther(priceImpact * 100n)}%`);
// netSyToSwap / netSyMinted shows what fraction of your deposit goes into the PT-buy
console.log(`SY swapped to PT: ${ethers.formatEther(netSyToSwap)} / ${ethers.formatEther(netSyMinted)}`);

// 2. Execute
await IERC20(tokenIn).approve(ROUTER_ADDRESS, amountIn);
await router.addLiquiditySingleToken(
    signer.address,
    MARKET_ADDRESS,
    (netLpOut * 995n) / 1000n,  // minLpOut (0.5% slippage)
    defaultApproxParams,
    createTokenInputStruct(tokenIn, amountIn),
    emptyLimitOrderData
);
```

### Add liquidity and keep YT — simulate then execute

```typescript
const tokenIn  = WSTETH_ADDRESS;
const amountIn = ethers.parseEther("1");

// 1. Simulate both LP and YT outputs
const [netLpOut, netYtOut, netSyMinted, netSyToPY] =
    await routerStatic.addLiquiditySingleTokenKeepYtStatic(MARKET_ADDRESS, tokenIn, amountIn);

console.log(`LP out: ${ethers.formatEther(netLpOut)}`);
console.log(`YT out: ${ethers.formatEther(netYtOut)}`);
// netSyToPY / netSyMinted shows how much goes to minting PT+YT vs swapping
console.log(`SY to PT+YT mint: ${ethers.formatEther(netSyToPY)} / ${ethers.formatEther(netSyMinted)}`);

// 2. Execute
await IERC20(tokenIn).approve(ROUTER_ADDRESS, amountIn);
await router.addLiquiditySingleTokenKeepYt(
    signer.address,
    MARKET_ADDRESS,
    (netLpOut * 995n) / 1000n,  // minLpOut
    (netYtOut * 995n) / 1000n,  // minYtOut
    createTokenInputStruct(tokenIn, amountIn)
);
```

### Remove single-token liquidity — simulate then execute

```typescript
const tokenOut = WSTETH_ADDRESS;
const lpAmount = ethers.parseEther("0.5");

// 1. Simulate
const [netTokenOut, , priceImpact, , , netSyFromBurn, netPtFromBurn, netSyFromSwap] =
    await routerStatic.removeLiquiditySingleTokenStatic(MARKET_ADDRESS, lpAmount, tokenOut);

console.log(`Expected token out: ${ethers.formatEther(netTokenOut)}`);
// Breakdown: SY from burn goes directly to redemption; PT from burn is first swapped to SY
console.log(`SY from LP burn: ${ethers.formatEther(netSyFromBurn)}`);
console.log(`PT from LP burn (then swapped): ${ethers.formatEther(netPtFromBurn)}`);
console.log(`SY from PT swap: ${ethers.formatEther(netSyFromSwap)}`);

// 2. Execute
await IERC20(MARKET_ADDRESS).approve(ROUTER_ADDRESS, lpAmount);
await router.removeLiquiditySingleToken(
    signer.address,
    MARKET_ADDRESS,
    lpAmount,
    createTokenOutputStruct(tokenOut, (netTokenOut * 995n) / 1000n),
    emptyLimitOrderData
);
```

### Dual-asset add — preview actual token consumption

The dual-asset functions consume tokens proportionally to the pool ratio, so actual amounts used may be less than desired.

```typescript
const netSyDesired = ethers.parseEther("1");
const netPtDesired = ethers.parseEther("1");

// 1. Simulate — find out how much is actually consumed
const [netLpOut, netSyUsed, netPtUsed] =
    await routerStatic.addLiquidityDualSyAndPtStatic(MARKET_ADDRESS, netSyDesired, netPtDesired);

console.log(`LP out: ${ethers.formatEther(netLpOut)}`);
console.log(`SY used: ${ethers.formatEther(netSyUsed)} (of ${ethers.formatEther(netSyDesired)} desired)`);
console.log(`PT used: ${ethers.formatEther(netPtUsed)} (of ${ethers.formatEther(netPtDesired)} desired)`);

// 2. Execute (approve only what will be used, plus a small buffer for safety)
await IERC20(SY_ADDRESS).approve(ROUTER_ADDRESS, netSyDesired);
await IERC20(PT_ADDRESS).approve(ROUTER_ADDRESS, netPtDesired);
await router.addLiquidityDualSyAndPt(
    signer.address,
    MARKET_ADDRESS,
    netSyDesired,
    netPtDesired,
    (netLpOut * 995n) / 1000n   // minLpOut
);
```
