---
hide_table_of_contents: true
---

# Pendle Spark Linear Discount Oracle

## Overview

**PendleSparkLinearDiscountOracle** is a simple, deterministic feed that returns a **discount factor** for a given PT. The factor increases linearly as time passes and converges to 1.0 at maturity, so integrators can price PT conservatively without relying on external market data.

The contract exposes familiar read functions (`latestRoundData`, `decimals`) so money markets can plug it in like a Chainlink-compatible feed. The returned value is a **multiplier in 18 decimals**, not a USD price.

## Use cases

For money markets listing PTs as collateral or borrowable assets, the oracle provides a stable, predictable valuation path. Integrators read the factor, multiply it by their PT redemption preview (and then by the underlying'S USD price feed if needed). Because the factor converges linearly to 1.0 at expiry, LTVs and liquidation thresholds behave smoothly instead of whipsawing with AMM volatility.

## Usage

### Deployment

The oracle can be deployed using the `sparkLinearDiscountOracleFactory`. The address of the factory can be found in the [Deployments on GitHub](https://github.com/pendle-finance/pendle-core-v2-public/tree/main/deployments), under the `"sparkLinearDiscountOracleFactory"` field. The factory has two methods to help with oracle deployment:

```sol
function createWithPt(address pt, uint256 baseDiscountPerYear) external returns (address);
function createWithMarket(address market, uint256 baseDiscountPerYear) external returns (address);
```

The second method will will automatically derive the PT address from the market, which is useful for Pendle markets where the PT is derived from the underlying asset.

### Feed retrieval

```sol
function latestRoundData()
    external
    view
    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
```

Since the oracle is deterministic, except for `answer`, every other fields returned are `0`.

#### Feed properties

- **Decimals**: The oracle returns values in 18 decimals, so integrators should multiply the factor by their PT redemption preview (also in 18 decimals) to get the value.
- **Deterministic**: The oracle is deterministic, meaning the same inputs will always yield the same output. This allows for predictable valuation paths.
- **Linear Discount**: The discount factor increases linearly over time, converging to 1.0 at maturity. This means the factor is always between 0 and 1, and it never goes negative.
- **No External Calls**: The oracle does not make any external calls during reads, ensuring minimal liveness or manipulation surface. It relies solely on `block.timestamp` for time calculations.
- **Clamping**: The oracle clamps the discount factor to never exceed 100% (1e18), ensuring it remains a valid multiplier.

Here is a graphic showing how different `baseDiscountPerYear` values affect the discount factor over time, with the x-axis representing time left until maturity in years and the y-axis showing the discount factor (1.0 = 100%):

<iframe src="https://www.desmos.com/calculator/maytjkrvor?embed" width="700" height="700" style={{border: "1px solid #ccc"}} frameborder="0"></iframe>

<details>
<summary>How <code>answer</code> is deterministically calculated</summary>

The `answer` relies on two parameters:
- `baseDiscountPerYear` - the annual discount slope, expressed in wad (1e18 = 100%/year).
- `maturity` - the PT maturity timestamp in seconds (`PT.expiry()`).

The `answer` at a given time `t` (in seconds) is calculated as follows:
$$
\text{answer} =
    \min\left(
        10^{18},
        10^{18} - \frac{(\text{maturity} - t) \cdot \text{baseDiscountPerYear}}{365 \cdot 24 \cdot 60 \cdot 60} 
    \right)
$$

</details>

