---
hide_table_of_contents: true
---

# LP Linear Discount Oracle

## Overview

Similar to [Pendle Spark Linear Discount Oracle](./LinearDiscountOracle.md), the **LPLinearDiscountOracle** provides a deterministic discount factor for Pendle Liquidity Provider (LP) tokens. This oracle is designed to help money markets and lending platforms value LP tokens that represent a share in a liquidity pool containing Pendle's LP Tokens.

The only difference between this oracle and the standard Linear Discount Oracle is that the LP version allows setting the `lpMaturedPrice` - the price of the LP token at maturity, while the convergence price of PT is always 1.0.

The contract exposes familiar read functions (`latestRoundData`, `decimals`) so money markets can plug it in like a Chainlink-compatible feed. The returned value is a **multiplier in 18 decimals**, not a USD price.

Please see the [Choosing Linear Discount Parameters](./ChoosingLinearDiscountParams.md) documentation for guidance on selecting appropriate linear discount parameters.

## Use cases

For money markets listing LPs as collateral or borrowable assets, the oracle provides a stable, predictable valuation path. Integrators read the factor, multiply it by their LP redemption preview (and then by the underlying'S USD price feed if needed). Because the factor converges linearly to `lpMaturedPrice` at expiry, LTVs and liquidation thresholds behave smoothly instead of whipsawing with AMM volatility.

## Usage

### Deployment

The oracle can be deployed using the `lpLinearDiscountOracleFactory`. The address of the factory can be found in the [Deployments](../../Deployments/Ethereum.md) sections, under the `"lpLinearDiscountOracleFactory"` field. The factory has a method to help with oracle deployment:

```sol
function create(address market, uint256 basePtDiscountPerYear, uint256 lpMaturedPrice) external returns (address res);
```

### Feed retrieval

```sol
function latestRoundData()
    external
    view
    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
```

Since the oracle is deterministic, except for `answer`, every other fields returned are `0`.

#### Feed properties

- **Decimals**: The oracle returns values in 18 decimals, so integrators should multiply the factor by their LP redemption preview (also in 18 decimals) to get the value.
- **Deterministic**: The oracle is deterministic, meaning the same inputs will always yield the same output. This allows for predictable valuation paths.
- **Linear Discount**: The discount factor increases linearly over time, converging to `lpMaturedPrice` at maturity.
- **No External Calls**: The oracle does not make any external calls during reads, ensuring minimal liveness or manipulation surface. It relies solely on `block.timestamp` for time calculations.

<details>
<summary>How <code>answer</code> is deterministically calculated</summary>

The `answer` relies on two parameters:
- `baseDiscountPerYear` - the annual discount slope, expressed in wad (1e18 = 100%/year).
- `maturity` - the LP maturity timestamp in seconds (`LP.expiry()`).
- `lpMaturedPrice` - the price of the LP token at maturity, expressed in wad (1e18 = 100%).

The `answer` at a given time `t` (in seconds) is calculated as follows:
$$
\text{answer} = \text{lpMaturedPrice} \cdot
    \min\left(
        10^{18},
        10^{18} - \frac{(\text{maturity} - t) \cdot \text{baseDiscountPerYear}}{365 \cdot 24 \cdot 60 \cdot 60} 
    \right)
$$

</details>

