---
hide_table_of_contents: true
---

# Pendle Oracle Overview

Pendle offers two oracle types for pricing PT and LP tokens. For most new integrations, **the Linear Discount Oracle is the recommended choice** — it has been widely adopted by top Aave and Morpho curators including Gauntlet and Steakhouse due to its manipulation-resistant design and alignment with PT's guaranteed 1:1 redemption to underlying at maturity. The TWAP oracle remains available for integrations that require a market-derived price.

## Which oracle should I use?

| Oracle type | Status | Best for | Docs |
|---|---|---|---|
| **Deterministic (Linear Discount)** | ✅ **Recommended** | Money markets, lending protocols, collateral pricing | [LinearDiscountOracle](./DeterministicOracles/LinearDiscountOracle.md) · [LP variant](./DeterministicOracles/LPLinearDiscountOracle.md) · [Choosing params](./DeterministicOracles/ChoosingLinearDiscountParams.md) |
| TWAP PT/LP Oracle | Available | Integrations requiring a live market-derived price | [HowToIntegratePtAndLpOracle](./HowToIntegratePtAndLpOracle.md) |

## Why the Linear Discount Oracle is recommended

PT is **guaranteed to redeem 1:1 to its underlying asset at maturity**. This hard floor means a linear discount model — which prices PT as a fraction that converges to 1.0 at expiry — is fundamentally sound and tightly tracks fair value. In contrast, TWAP oracles derive price from AMM activity, which introduces AMM manipulation surface and requires careful initialization and liquidity depth assessment.

The Linear Discount Oracle has no external dependencies during reads (`block.timestamp` only), making it liveness-risk-free and manipulation-resistant. This is why it has become the oracle of choice for top risk curators integrating PT across Aave and Morpho markets.

## About the PT Oracle

In the Pendle system, $PT$ can be freely traded from and to $SY$ utilizing our AMM. With the built-in TWAP oracle library, the geometric mean price of $PT$ in terms of SY or asset can be derived from our `PendleMarket` contracts fully on-chain. Please refer to the [StandardizedYield doc](../Contracts/StandardizedYield/StandardizedYield) for more details of SY & asset.

### Oracle design

Pendle's oracle implementation is inspired by the idea of the UniswapV3 Oracle (see [here](https://docs.uniswap.org/concepts/protocol/oracle)) with a slight difference in how we define the cumulative rate. In short, our oracle stores the cumulative logarithm of implied APY (the interest rate implied by $PT/asset$ pricing). From the cumulative logarithm of Implied APY, we can calculate the geometric mean of Implied APY, which will be used to derive the mean $PT$ price.

In a way, the Pendle AMM contract has a built-in oracle of interest rate, which can be used to derive $PT$ prices.

### Formulas

Our oracle storage is in the following form:

```sol
struct Observation {
    // the block timestamp of the observation
    uint32 blockTimestamp;
    // the tick logarithm accumulator, i.e., ln(impliedRate) * time elapsed since the pool was first initialized
    uint216 lnImpliedRateCumulative;
    // whether or not the observation is initialized
    bool initialized;
}
```

The geometric mean price of $PT$ for the time interval of $[t_0, t_1]$ is:

$$
lnImpliedRate = \frac{lnImpliedRateCumulative_1 - lnImpliedRateCumulative_0}{t_1 - t_0}
$$

$$
impliedRate = e^{lnImpliedRate}
$$

$$
assetToPtPrice = impliedRate^{\frac{timeToMaturity}{oneYear}}
$$

$$
ptToAssetPrice = 1 / assetToPtPrice
$$

See [How to Integrate](./HowToIntegratePtAndLpOracle.md) for a step-by-step guide.

## About the LP Oracle

Pendle's LP token represents a user's share in Pendle AMM which pairs up PT and SY.

SY is the interest-bearing token wrapper which enables depositing from and redeeming from underlying asset with no additional fee or price impact. PT can be traded to and from SY/underlying asset using our AMM, with a built-in geometric mean pricing module.

LP oracle returns the estimated TWAP exchange rate between LP token and underlying asset. Our approach for LP pricing is to simulate a hypothetical trade on the AMM so that its PT spot price (and the implied rate) matches PT price (and the implied rate) from PT oracle before using market state to calculate LP price.

For example:
* The 1hr TWAP PT price is 0.90 asset.
* The current state of the market is (x PT, y SY), where PT price is 0.92 asset
* We calculate a hypothetical, zero-fee swap that brings PT price to 0.90 asset, to reach a state of (x' PT, y' SY)
* We calculate the estimated TWAP LP token price based on the hypothetical state (x' PT, y' SY) and PT price of 0.90 asset

Detailed documentation on the math for this approach can be found [here](https://github.com/pendle-finance/pendle-v2-resources/blob/main/docs/LP_Oracle_Doc.pdf).

See [How to Integrate](./HowToIntegratePtAndLpOracle.md) for a step-by-step guide.

## Recommended reading order

### If using the Linear Discount Oracle (recommended)
1. This page — understand which oracle type fits your use case
2. [Linear Discount Oracle](./DeterministicOracles/LinearDiscountOracle.md) — how the oracle works and how to deploy it
3. [Choosing Linear Discount Parameters](./DeterministicOracles/ChoosingLinearDiscountParams.md) — how to select the right discount rate
4. If pricing LP tokens: [LP Linear Discount Oracle](./DeterministicOracles/LPLinearDiscountOracle.md)
5. If using as collateral: [PT as Collateral](./PTAsCollateral.md) or [LP as Collateral](./LPAsCollateral.md)

### If using the TWAP Oracle
1. This page — understand which oracle type fits your use case
2. [How to Integrate PT and LP Oracle](./HowToIntegratePtAndLpOracle.md) — hands-on TWAP integration with code
3. [PT Sanity Checks](./PTSanityChecks.md) — validate your integration before going live
4. If using as collateral: [PT as Collateral](./PTAsCollateral.md) or [LP as Collateral](./LPAsCollateral.md)
