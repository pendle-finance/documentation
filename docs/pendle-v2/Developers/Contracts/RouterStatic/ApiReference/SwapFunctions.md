---
hide_table_of_contents: true
---

# Swap Simulation Functions

These functions come from the `IPActionMarketCoreStatic` facet. Each function simulates the corresponding Router swap and returns expected outputs, fee, price impact, and the exchange rate after the trade.

Common return fields:

| Field | Description |
|-------|-------------|
| `netSyFee` | Fee deducted from the trade, expressed in SY (18 decimals) |
| `priceImpact` | Price impact as an 18-decimal fraction (e.g. `1e16` = 1%) |
| `exchangeRateAfter` | PT/SY exchange rate after the trade (18 decimals) |

---

## PT Swaps (Exact In)

### swapExactPtForSyStatic

Simulates selling an exact amount of PT for SY.

```solidity
function swapExactPtForSyStatic(address market, uint256 exactPtIn)
    external
    view
    returns (uint256 netSyOut, uint256 netSyFee, uint256 priceImpact, uint256 exchangeRateAfter)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| exactPtIn | `uint256` | Exact PT amount to sell |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netSyOut | `uint256` | SY received |
| netSyFee | `uint256` | Fee in SY |
| priceImpact | `uint256` | Price impact |
| exchangeRateAfter | `uint256` | Exchange rate after trade |

---

### swapExactPtForTokenStatic

Simulates selling an exact amount of PT for an arbitrary token.

```solidity
function swapExactPtForTokenStatic(address market, uint256 exactPtIn, address tokenOut)
    external
    view
    returns (
        uint256 netTokenOut,
        uint256 netSyToRedeem,
        uint256 netSyFee,
        uint256 priceImpact,
        uint256 exchangeRateAfter
    )
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| exactPtIn | `uint256` | Exact PT amount to sell |
| tokenOut | `address` | Desired output token address |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netTokenOut | `uint256` | Token received |
| netSyToRedeem | `uint256` | SY redeemed to produce the token output |
| netSyFee | `uint256` | Fee in SY |
| priceImpact | `uint256` | Price impact |
| exchangeRateAfter | `uint256` | Exchange rate after trade |

---

### swapExactPtForYtStatic

Simulates swapping an exact amount of PT for YT (leverage/deleverage operation).

```solidity
function swapExactPtForYtStatic(address market, uint256 exactPtIn)
    external
    view
    returns (
        uint256 netYtOut,
        uint256 totalPtToSwap,
        uint256 netSyFee,
        uint256 priceImpact,
        uint256 exchangeRateAfter
    )
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| exactPtIn | `uint256` | Exact PT amount to swap |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netYtOut | `uint256` | YT received |
| totalPtToSwap | `uint256` | Total PT routed through the market (including flash-swap leg) |
| netSyFee | `uint256` | Fee in SY |
| priceImpact | `uint256` | Price impact |
| exchangeRateAfter | `uint256` | Exchange rate after trade |

---

## SY / Token Swaps (Exact In, PT Out)

### swapExactSyForPtStatic

Simulates buying PT with an exact amount of SY.

```solidity
function swapExactSyForPtStatic(address market, uint256 exactSyIn)
    external
    view
    returns (uint256 netPtOut, uint256 netSyFee, uint256 priceImpact, uint256 exchangeRateAfter)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| exactSyIn | `uint256` | Exact SY amount to spend |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netPtOut | `uint256` | PT received |
| netSyFee | `uint256` | Fee in SY |
| priceImpact | `uint256` | Price impact |
| exchangeRateAfter | `uint256` | Exchange rate after trade |

> For generating `ApproxParams` automatically, use [`swapExactSyForPtStaticAndGenerateApproxParams`](./RateFunctions#swapexactsyforptstaticanddgenerateapproxparams) instead.

---

### swapExactTokenForPtStatic

Simulates buying PT with an exact amount of an arbitrary token.

```solidity
function swapExactTokenForPtStatic(address market, address tokenIn, uint256 amountTokenIn)
    external
    view
    returns (
        uint256 netPtOut,
        uint256 netSyMinted,
        uint256 netSyFee,
        uint256 priceImpact,
        uint256 exchangeRateAfter
    )
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| tokenIn | `address` | Input token address |
| amountTokenIn | `uint256` | Exact token amount to spend |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netPtOut | `uint256` | PT received |
| netSyMinted | `uint256` | SY minted from the input token |
| netSyFee | `uint256` | Fee in SY |
| priceImpact | `uint256` | Price impact |
| exchangeRateAfter | `uint256` | Exchange rate after trade |

> For generating `ApproxParams` automatically, use [`swapExactTokenForPtStaticAndGenerateApproxParams`](./RateFunctions#swapexacttokenforptstaticanddgenerateapproxparams) instead.

---

## YT Swaps (Exact In)

### swapExactSyForYtStatic

Simulates buying YT with an exact amount of SY.

```solidity
function swapExactSyForYtStatic(address market, uint256 exactSyIn)
    external
    view
    returns (uint256 netYtOut, uint256 netSyFee, uint256 priceImpact, uint256 exchangeRateAfter)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| exactSyIn | `uint256` | Exact SY amount to spend |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netYtOut | `uint256` | YT received |
| netSyFee | `uint256` | Fee in SY |
| priceImpact | `uint256` | Price impact |
| exchangeRateAfter | `uint256` | Exchange rate after trade |

---

### swapExactTokenForYtStatic

Simulates buying YT with an exact amount of an arbitrary token.

```solidity
function swapExactTokenForYtStatic(address market, address tokenIn, uint256 amountTokenIn)
    external
    view
    returns (
        uint256 netYtOut,
        uint256 netSyMinted,
        uint256 netSyFee,
        uint256 priceImpact,
        uint256 exchangeRateAfter
    )
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| tokenIn | `address` | Input token address |
| amountTokenIn | `uint256` | Exact token amount to spend |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netYtOut | `uint256` | YT received |
| netSyMinted | `uint256` | SY minted from the input token |
| netSyFee | `uint256` | Fee in SY |
| priceImpact | `uint256` | Price impact |
| exchangeRateAfter | `uint256` | Exchange rate after trade |

---

### swapExactYtForSyStatic

Simulates selling an exact amount of YT for SY. YT selling involves flash-swapping PT to repay accrued interest.

```solidity
function swapExactYtForSyStatic(address market, uint256 exactYtIn)
    external
    view
    returns (
        uint256 netSyOut,
        uint256 netSyFee,
        uint256 priceImpact,
        uint256 exchangeRateAfter,
        uint256 netSyOwedInt,
        uint256 netPYToRepaySyOwedInt,
        uint256 netPYToRedeemSyOutInt
    )
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| exactYtIn | `uint256` | Exact YT amount to sell |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netSyOut | `uint256` | SY received after repaying interest |
| netSyFee | `uint256` | Fee in SY |
| priceImpact | `uint256` | Price impact |
| exchangeRateAfter | `uint256` | Exchange rate after trade |
| netSyOwedInt | `uint256` | SY owed as interest that must be repaid |
| netPYToRepaySyOwedInt | `uint256` | PY units used to repay the interest obligation |
| netPYToRedeemSyOutInt | `uint256` | PY units redeemed to produce final SY output |

---

### swapExactYtForTokenStatic

Simulates selling an exact amount of YT for an arbitrary token.

```solidity
function swapExactYtForTokenStatic(address market, uint256 exactYtIn, address tokenOut)
    external
    view
    returns (
        uint256 netTokenOut,
        uint256 netSyFee,
        uint256 priceImpact,
        uint256 exchangeRateAfter,
        uint256 netSyOut,
        uint256 netSyOwedInt,
        uint256 netPYToRepaySyOwedInt,
        uint256 netPYToRedeemSyOutInt
    )
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| exactYtIn | `uint256` | Exact YT amount to sell |
| tokenOut | `address` | Desired output token address |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netTokenOut | `uint256` | Token received |
| netSyFee | `uint256` | Fee in SY |
| priceImpact | `uint256` | Price impact |
| exchangeRateAfter | `uint256` | Exchange rate after trade |
| netSyOut | `uint256` | Intermediate SY before token redemption |
| netSyOwedInt | `uint256` | SY owed as interest |
| netPYToRepaySyOwedInt | `uint256` | PY units used to repay the interest obligation |
| netPYToRedeemSyOutInt | `uint256` | PY units redeemed to produce final output |

---

### swapExactYtForPtStatic

Simulates swapping an exact amount of YT for PT (leverage/deleverage operation).

```solidity
function swapExactYtForPtStatic(address market, uint256 exactYtIn)
    external
    view
    returns (
        uint256 netPtOut,
        uint256 totalPtSwapped,
        uint256 netSyFee,
        uint256 priceImpact,
        uint256 exchangeRateAfter
    )
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| exactYtIn | `uint256` | Exact YT amount to swap |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netPtOut | `uint256` | PT received |
| totalPtSwapped | `uint256` | Total PT routed through the market |
| netSyFee | `uint256` | Fee in SY |
| priceImpact | `uint256` | Price impact |
| exchangeRateAfter | `uint256` | Exchange rate after trade |

---

## Exact-Out Swaps (Inverse)

These functions let you specify the desired output amount and compute the required input.

### swapPtForExactSyStatic

Simulates selling PT to receive an exact amount of SY.

```solidity
function swapPtForExactSyStatic(address market, uint256 exactSyOut)
    external
    view
    returns (uint256 netPtIn, uint256 netSyFee, uint256 priceImpact, uint256 exchangeRateAfter)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| exactSyOut | `uint256` | Exact SY amount desired |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netPtIn | `uint256` | PT required |
| netSyFee | `uint256` | Fee in SY |
| priceImpact | `uint256` | Price impact |
| exchangeRateAfter | `uint256` | Exchange rate after trade |

---

### swapSyForExactPtStatic

Simulates buying an exact amount of PT with SY.

```solidity
function swapSyForExactPtStatic(address market, uint256 exactPtOut)
    external
    view
    returns (uint256 netSyIn, uint256 netSyFee, uint256 priceImpact, uint256 exchangeRateAfter)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| exactPtOut | `uint256` | Exact PT amount desired |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netSyIn | `uint256` | SY required |
| netSyFee | `uint256` | Fee in SY |
| priceImpact | `uint256` | Price impact |
| exchangeRateAfter | `uint256` | Exchange rate after trade |

---

### swapSyForExactYtStatic

Simulates buying an exact amount of YT with SY. Includes the internal interest accounting fields.

```solidity
function swapSyForExactYtStatic(address market, uint256 exactYtOut)
    external
    view
    returns (
        uint256 netSyIn,
        uint256 netSyFee,
        uint256 priceImpact,
        uint256 exchangeRateAfter,
        uint256 netSyReceivedInt,
        uint256 totalSyNeedInt
    )
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| exactYtOut | `uint256` | Exact YT amount desired |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netSyIn | `uint256` | SY required from the user |
| netSyFee | `uint256` | Fee in SY |
| priceImpact | `uint256` | Price impact |
| exchangeRateAfter | `uint256` | Exchange rate after trade |
| netSyReceivedInt | `uint256` | SY received from the internal flash-swap leg |
| totalSyNeedInt | `uint256` | Total SY needed for minting PT+YT in the flash-swap |

---

### swapYtForExactSyStatic

Simulates selling YT to receive an exact amount of SY.

```solidity
function swapYtForExactSyStatic(address market, uint256 exactSyOut)
    external
    view
    returns (uint256 netYtIn, uint256 netSyFee, uint256 priceImpact, uint256 exchangeRateAfter)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| exactSyOut | `uint256` | Exact SY amount desired |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netYtIn | `uint256` | YT required |
| netSyFee | `uint256` | Fee in SY |
| priceImpact | `uint256` | Price impact |
| exchangeRateAfter | `uint256` | Exchange rate after trade |

---

## Market State

### readMarketState

Returns the raw `MarketState` struct for a given market.

```solidity
function readMarketState(address market) external view returns (MarketState memory)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |

**Return Values**

| Type | Description |
|------|-------------|
| `MarketState` | Full AMM state (see [PendleMarket](../../PendleMarket) for field details) |

**Use Case**
Use to pass a pre-fetched `MarketState` into `getTradeExchangeRateExcludeFee` or other functions that accept it as a parameter, avoiding redundant on-chain reads.

---

## Examples

:::tip Recommended: Use the Pendle API
The examples below show direct RouterStatic usage. For most integrations, the [Pendle Hosted SDK / API](../../../Backend/HostedSdk) is the better choice — it handles approximation, limit-order filling, and zap routing automatically.
:::

### Sell PT — simulate then execute

```typescript
const ptAmount = ethers.parseEther("100");

// 1. Simulate
const [netTokenOut, , , priceImpact, exchangeRateAfter] =
    await routerStatic.swapExactPtForTokenStatic(MARKET_ADDRESS, ptAmount, WSTETH_ADDRESS);

console.log(`Receive: ${ethers.formatEther(netTokenOut)} wstETH`);
console.log(`Price impact: ${ethers.formatEther(priceImpact * 100n)}%`);
console.log(`Rate after: ${ethers.formatEther(exchangeRateAfter)}`);

// 2. Execute
await IERC20(PT_ADDRESS).approve(ROUTER_ADDRESS, ptAmount);
await router.swapExactPtForToken(
    signer.address,
    MARKET_ADDRESS,
    ptAmount,
    createTokenOutputStruct(WSTETH_ADDRESS, (netTokenOut * 995n) / 1000n), // 0.5% slippage
    emptyLimitOrderData
);
```

### Sell YT — simulate then execute

```typescript
const ytAmount = ethers.parseEther("50");

// 1. Simulate (note: YT selling involves flash-swap interest repayment internals)
const [netTokenOut, , priceImpact, , , netSyOwedInt] =
    await routerStatic.swapExactYtForTokenStatic(MARKET_ADDRESS, ytAmount, WSTETH_ADDRESS);

console.log(`Receive: ${ethers.formatEther(netTokenOut)} wstETH`);
console.log(`Interest repaid in swap: ${ethers.formatEther(netSyOwedInt)} SY`);

// 2. Execute
await IERC20(YT_ADDRESS).approve(ROUTER_ADDRESS, ytAmount);
await router.swapExactYtForToken(
    signer.address,
    MARKET_ADDRESS,
    ytAmount,
    createTokenOutputStruct(WSTETH_ADDRESS, (netTokenOut * 995n) / 1000n),
    emptyLimitOrderData
);
```

### PT↔YT swap — simulate then execute

Swapping PT for YT (or YT for PT) changes your yield exposure direction without unwinding to the underlying asset.

```typescript
const ptAmount = ethers.parseEther("10");

// 1. Simulate PT → YT
const [netYtOut, totalPtToSwap, , priceImpact] =
    await routerStatic.swapExactPtForYtStatic(MARKET_ADDRESS, ptAmount);

console.log(`YT out: ${ethers.formatEther(netYtOut)}`);
console.log(`Total PT routed (incl. flash leg): ${ethers.formatEther(totalPtToSwap)}`);

// 2. Execute
await IERC20(PT_ADDRESS).approve(ROUTER_ADDRESS, ptAmount);
await router.swapExactPtForYt(
    signer.address,
    MARKET_ADDRESS,
    ptAmount,
    (netYtOut * 995n) / 1000n,  // minYtOut
    defaultApproxParams
);
```

### Exact-out: buy a precise SY amount

Use `swapPtForExactSyStatic` when you need a known SY amount (e.g. to meet a downstream obligation).

```typescript
const exactSyNeeded = ethers.parseEther("1.5");

// 1. Simulate — how much PT to sell?
const [netPtIn, , priceImpact] =
    await routerStatic.swapPtForExactSyStatic(MARKET_ADDRESS, exactSyNeeded);

console.log(`PT required: ${ethers.formatEther(netPtIn)}`);

// Apply slippage on the input side (accept up to 0.5% more PT in)
const maxPtIn = (netPtIn * 1005n) / 1000n;

// 2. Execute
await IERC20(PT_ADDRESS).approve(ROUTER_ADDRESS, maxPtIn);
await router.swapPtForExactSy(
    signer.address,
    MARKET_ADDRESS,
    exactSyNeeded,
    maxPtIn,
    emptyLimitOrderData
);
```
