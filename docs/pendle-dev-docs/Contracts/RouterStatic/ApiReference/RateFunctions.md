---
hide_table_of_contents: true
---

# Market Rates & State Functions

These functions come from the `IPActionMarketAuxStatic` facet. They cover spot prices, market state, price impact calculations, and `ApproxParams` generation helpers.

---

## Spot Rates

All spot rates are returned as 18-decimal fixed-point numbers.

### getLpToSyRate

Returns the **spot** price of 1 LP token denominated in the market's SY token.

```solidity
function getLpToSyRate(address market) external view returns (uint256)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |

**Return Values**

| Type | Description |
|------|-------------|
| `uint256` | Spot LP price in SY units (18 decimals) |

---

### getLpToAssetRate

Returns the **spot** price of 1 LP token denominated in the SY's underlying asset.

```solidity
function getLpToAssetRate(address market) external view returns (uint256)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |

**Return Values**

| Type | Description |
|------|-------------|
| `uint256` | Spot LP price in underlying asset units (18 decimals) |

---

### getPtToSyRate

Returns the **spot** price of 1 PT token denominated in SY.

```solidity
function getPtToSyRate(address market) external view returns (uint256)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |

**Return Values**

| Type | Description |
|------|-------------|
| `uint256` | Spot PT price in SY units (18 decimals) |

---

### getPtToAssetRate

Returns the **spot** price of 1 PT token denominated in the SY's underlying asset.

```solidity
function getPtToAssetRate(address market) external view returns (uint256)
```

---

### getYtToSyRate

Returns the **spot** price of 1 YT token denominated in SY.

```solidity
function getYtToSyRate(address market) external view returns (uint256)
```

---

### getYtToAssetRate

Returns the **spot** price of 1 YT token denominated in the SY's underlying asset.

```solidity
function getYtToAssetRate(address market) external view returns (uint256)
```

---

## Market State

### getMarketState

Returns the full market state along with derived metrics.

```solidity
function getMarketState(address market)
    external
    view
    returns (
        address pt,
        address yt,
        address sy,
        int256 impliedYield,
        uint256 marketExchangeRateExcludeFee,
        MarketState memory state
    )
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| pt | `address` | Principal Token address |
| yt | `address` | Yield Token address |
| sy | `address` | SY token address |
| impliedYield | `int256` | Current implied yield rate (18 decimals) |
| marketExchangeRateExcludeFee | `uint256` | Current PT/SY exchange rate (fees excluded) |
| state | `MarketState` | Full low-level AMM state struct |

---

### getTradeExchangeRateExcludeFee

Returns the current trade exchange rate from a given market state, excluding fees.

```solidity
function getTradeExchangeRateExcludeFee(address market, MarketState memory state)
    external
    view
    returns (uint256)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| state | `MarketState` | Market state (e.g. from `getMarketState`) |

**Return Values**

| Type | Description |
|------|-------------|
| `uint256` | Exchange rate excluding fees (18 decimals) |

---

### getTradeExchangeRateIncludeFee

Returns the effective exchange rate for a specific trade size, including fees.

```solidity
function getTradeExchangeRateIncludeFee(address market, int256 netPtOut)
    external
    view
    returns (uint256)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| netPtOut | `int256` | Signed PT delta for the trade (positive = PT leaving pool, negative = PT entering pool) |

**Return Values**

| Type | Description |
|------|-------------|
| `uint256` | Effective exchange rate including fees (18 decimals) |

---

## Price Impact

All price impact values are returned as 18-decimal fixed-point numbers (e.g. `1e16` = 1%).

### calcPriceImpactPt

Calculates the price impact of a PT trade.

```solidity
function calcPriceImpactPt(address market, int256 netPtOut)
    external
    view
    returns (uint256)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| netPtOut | `int256` | Signed PT amount (positive = buy PT, negative = sell PT) |

**Return Values**

| Type | Description |
|------|-------------|
| `uint256` | Price impact as a fraction (18 decimals) |

---

### calcPriceImpactYt

Calculates the price impact of a YT trade, expressed in PT terms.

```solidity
function calcPriceImpactYt(address market, int256 netPtOut)
    external
    view
    returns (uint256)
```

---

### calcPriceImpactPY

Calculates the combined price impact of a simultaneous PT+YT trade.

```solidity
function calcPriceImpactPY(address market, int256 netPtOut)
    external
    view
    returns (uint256)
```

---

## Yield Token / PT / YT Conversion Rates

### getYieldTokenAndPtRate

Returns how many yield tokens are equivalent to 1 PT at current rates.

```solidity
function getYieldTokenAndPtRate(address market)
    external
    view
    returns (address yieldToken, uint256 netPtOut, uint256 netYieldTokenOut)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| yieldToken | `address` | The market's underlying yield-bearing token |
| netPtOut | `uint256` | Normalised PT amount used as the basis (typically 1e18) |
| netYieldTokenOut | `uint256` | Equivalent yield token amount |

---

### getYieldTokenAndYtRate

Returns how many yield tokens are equivalent to 1 YT at current rates.

```solidity
function getYieldTokenAndYtRate(address market)
    external
    view
    returns (address yieldToken, uint256 netYtOut, uint256 netYieldTokenOut)
```

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| yieldToken | `address` | The market's underlying yield-bearing token |
| netYtOut | `uint256` | Normalised YT amount used as the basis (typically 1e18) |
| netYieldTokenOut | `uint256` | Equivalent yield token amount |

---

## ApproxParams Helpers

These functions combine a swap simulation with automatic `ApproxParams` generation. Pass the returned `approxParams` directly to the corresponding Router function.

### swapExactSyForPtStaticAndGenerateApproxParams

Simulates swapping exact SY for PT and returns a ready-to-use `ApproxParams`.

```solidity
function swapExactSyForPtStaticAndGenerateApproxParams(
    address market,
    uint256 exactSyIn,
    uint256 slippage
)
    external
    view
    returns (
        uint256 netPtOut,
        uint256 netSyFee,
        uint256 priceImpact,
        uint256 exchangeRateAfter,
        ApproxParams memory approxParams
    )
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| exactSyIn | `uint256` | Exact SY amount to swap in |
| slippage | `uint256` | Maximum acceptable slippage (18-decimal fraction, e.g. `5e15` = 0.5%) |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netPtOut | `uint256` | Expected PT output |
| netSyFee | `uint256` | Fee paid in SY |
| priceImpact | `uint256` | Price impact of the trade (18 decimals) |
| exchangeRateAfter | `uint256` | Exchange rate after the trade (18 decimals) |
| approxParams | [`ApproxParams`](../../PendleRouter/ApiReference/Types#approxparams) | Pre-filled approximation parameters for the Router call |

---

### swapExactTokenForPtStaticAndGenerateApproxParams

Simulates swapping exact tokens for PT and returns a ready-to-use `ApproxParams`.

```solidity
function swapExactTokenForPtStaticAndGenerateApproxParams(
    address market,
    address tokenIn,
    uint256 amountTokenIn,
    uint256 slippage
)
    external
    view
    returns (
        uint256 netPtOut,
        uint256 netSyMinted,
        uint256 netSyFee,
        uint256 priceImpact,
        uint256 exchangeRateAfter,
        ApproxParams memory approxParams
    )
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| tokenIn | `address` | Input token address |
| amountTokenIn | `uint256` | Exact token amount to swap in |
| slippage | `uint256` | Maximum acceptable slippage (18-decimal fraction) |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netPtOut | `uint256` | Expected PT output |
| netSyMinted | `uint256` | SY minted from the input token |
| netSyFee | `uint256` | Fee paid in SY |
| priceImpact | `uint256` | Price impact of the trade (18 decimals) |
| exchangeRateAfter | `uint256` | Exchange rate after the trade (18 decimals) |
| approxParams | [`ApproxParams`](../../PendleRouter/ApiReference/Types#approxparams) | Pre-filled approximation parameters for the Router call |

**Use Case**
This is the recommended way to populate `ApproxParams` for `swapExactTokenForPt`. It avoids the need to tune approximation parameters manually.

---

## Examples

:::tip Recommended: Use the Pendle API
The examples below show direct RouterStatic usage. For most integrations, the [Pendle Hosted SDK / API](../../../Backend/HostedSdk) is the better choice — it handles approximation, limit-order filling, and zap routing automatically.
:::

### Display LP / PT / YT spot prices

```typescript
const [lpToAsset, ptToAsset, ytToAsset] = await Promise.all([
    routerStatic.getLpToAssetRate(MARKET_ADDRESS),
    routerStatic.getPtToAssetRate(MARKET_ADDRESS),
    routerStatic.getYtToAssetRate(MARKET_ADDRESS),
]);

// All values are 18-decimal fractions of the underlying asset
console.log(`1 LP  = ${ethers.formatEther(lpToAsset)} underlying`);
console.log(`1 PT  = ${ethers.formatEther(ptToAsset)} underlying`);
console.log(`1 YT  = ${ethers.formatEther(ytToAsset)} underlying`);
```

### Read market state and implied yield

```typescript
const [pt, yt, sy, impliedYield, exchangeRateExcludeFee, state] =
    await routerStatic.getMarketState(MARKET_ADDRESS);

// impliedYield is a signed 18-decimal annualised rate
const impliedYieldPct = Number(ethers.formatEther(impliedYield)) * 100;
console.log(`Implied yield: ${impliedYieldPct.toFixed(2)}%`);
console.log(`PT: ${pt}, YT: ${yt}, SY: ${sy}`);
```

### Gate a trade on price impact

```typescript
const netPtOut_amount = ethers.parseEther("500");

const priceImpact = await routerStatic.calcPriceImpactPt(MARKET_ADDRESS, netPtOut_amount);
const impactPct = Number(ethers.formatEther(priceImpact)) * 100;

if (impactPct > 1.0) {
    throw new Error(`Price impact ${impactPct.toFixed(2)}% exceeds 1% threshold — reduce size`);
}
```

### Buy PT with token using generated ApproxParams

```typescript
const tokenIn  = WSTETH_ADDRESS;
const amountIn = ethers.parseEther("1");
const SLIPPAGE = ethers.parseEther("0.005"); // 0.5%

// 1. Get simulation + ready-to-use ApproxParams in a single call
const [netPtOut, netSyMinted, netSyFee, priceImpact, exchangeRateAfter, approxParams] =
    await routerStatic.swapExactTokenForPtStaticAndGenerateApproxParams(
        MARKET_ADDRESS,
        tokenIn,
        amountIn,
        SLIPPAGE
    );

console.log(`PT out: ${ethers.formatEther(netPtOut)}`);
console.log(`Fee:    ${ethers.formatEther(netSyFee)} SY`);
console.log(`Impact: ${ethers.formatEther(priceImpact * 100n)}%`);

// 2. Execute — pass approxParams directly, no manual tuning needed
await IERC20(tokenIn).approve(ROUTER_ADDRESS, amountIn);
await router.swapExactTokenForPt(
    signer.address,
    MARKET_ADDRESS,
    (netPtOut * 995n) / 1000n,  // minPtOut
    approxParams,               // generated by RouterStatic
    createTokenInputStruct(tokenIn, amountIn),
    emptyLimitOrderData
);
```
