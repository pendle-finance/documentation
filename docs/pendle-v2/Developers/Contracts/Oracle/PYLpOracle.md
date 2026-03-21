---
hide_table_of_contents: true
---

# PendlePYLpOracle

## Overview

`PendlePYLpOracle` is the canonical on-chain TWAP price oracle for Pendle's PT, YT, and LP tokens, modelled after the UniswapV3 oracle design.

> All rates are expressed as `1e18`-scaled fixed-point numbers. A return value of `0.95e18` means 1 unit of the queried token is worth 0.95 units of the denominator token.

The contract is deployed to the same address on every supported network. Find it under `"pendlePYLpOracle"` in the [Deployments on GitHub](https://github.com/pendle-finance/pendle-core-v2-public/tree/main/deployments).

**Interface**: [`IPPYLpOracle`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/interfaces/IPPYLpOracle.sol)
**Source**: [`PendlePYLpOracle.sol`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/oracles/PtYtLpOracle/PendlePYLpOracle.sol)

---

## Oracle Architecture

### TWAP Mechanism

Pendle's oracle is modelled after the UniswapV3 oracle design. Each `PendleMarket` contract stores a ring buffer of timestamped observations. Each observation records:

```solidity
struct Observation {
    uint32  blockTimestamp;          // block timestamp at write time
    uint216 lnImpliedRateCumulative; // cumulative sum of ln(impliedRate) * elapsed_time
    bool    initialized;             // whether this slot has been written
}
```

The TWAP geometric-mean implied rate over the interval `[t₀, t₁]` is computed as:

```
lnImpliedRate = (lnImpliedRateCumulative[t₁] - lnImpliedRateCumulative[t₀]) / (t₁ - t₀)
```

From `lnImpliedRate` and the remaining time to expiry, the PT-to-asset exchange rate is derived:

```
assetToPtRate  = exp(lnImpliedRate)^(timeToExpiry / ONE_YEAR)
ptToAssetRate  = 1 / assetToPtRate
ytToAssetRate  = 1 - ptToAssetRate
```

### LP Pricing

LP token pricing uses a **hypothetical-trade simulation**: the oracle calculates what the total pool asset value would be after a simulated rebalancing trade that prices all PT in the pool at the TWAP-implied rate. See [`IntroductionOfLpOracle`](../../Oracles/IntroductionOfLpOracle.md) for the full derivation.

### SY Solvency Adjustment

All six rate functions apply a solvency guard. Let:
- `syIndex` = current `SY.exchangeRate()` (asset per SY, 1e18-scaled)
- `pyIndex` = `max(syIndex, YT.pyIndexStored())` — the accrued index at last PT/YT interaction

When `syIndex < pyIndex` (meaning the SY backing has lost value since the last index accrual — e.g., a depeg or slashing event), rates are scaled down by `syIndex / pyIndex` to reflect the reduced redemption value. When `syIndex >= pyIndex` the adjustment is a no-op.

:::warning Prefer `ToSy` over `ToAsset` for most integrations

PT-to-SY pricing is natively guaranteed by the Pendle AMM: 1 PT can always be traded for some amount of SY. PT-to-asset pricing depends additionally on `SY.exchangeRate()`, which is provided by the underlying protocol and can diverge if the asset depegs or becomes unredeemable from SY.

For most lending/borrowing and money-market integrations, price **PT/YT/LP in SY** and handle the SY→asset conversion separately with an appropriate external oracle or your own risk model.

:::

---

## Prerequisites: Oracle Initialization

Markets are deployed with an observation cardinality of 1 (a single slot), which is **insufficient for TWAP queries**. Before calling any rate function, the oracle must be initialized for the chosen duration.

### Step 1 — Check oracle state

```solidity
(bool increaseCardinalityRequired, uint16 cardinalityRequired, bool oldestObservationSatisfied)
    = oracle.getOracleState(market, duration);
```

### Step 2 — Increase cardinality (if required)

If `increaseCardinalityRequired == true`, call:

```solidity
IPMarket(market).increaseObservationsCardinalityNext(cardinalityRequired);
```

Typical `cardinalityRequired` values for common chains and durations:

| Duration | Ethereum (≈12 s blocks) | Arbitrum / fast chains (≈1 s) |
|---|---|---|
| 900 s (15 min) | ~85 | ~900 |
| 1800 s (30 min) | ~165 | ~1800 |

The exact value is returned by `getOracleState` and is calculated as:

```
cardinalityRequired = ceil(duration × 1000 / blockCycleNumerator) + 1
```

where `blockCycleNumerator` is a chain-specific constant (Ethereum: `11000`, Arbitrum: `1000`).

### Step 3 — Wait for data

After increasing cardinality, wait at least `duration` seconds before querying prices. `oldestObservationSatisfied == false` means the buffer does not yet hold observations old enough to cover the requested TWAP window.

---

## `getOracleState`

```solidity
function getOracleState(address market, uint32 duration)
    external
    view
    returns (
        bool   increaseCardinalityRequired,
        uint16 cardinalityRequired,
        bool   oldestObservationSatisfied
    );
```

**Parameters**

| Name | Type | Description |
|---|---|---|
| `market` | `address` | `PendleMarket` contract address |
| `duration` | `uint32` | Desired TWAP window in seconds |

**Return values**

| Name | Type | Description |
|---|---|---|
| `increaseCardinalityRequired` | `bool` | `true` if `IPMarket.increaseObservationsCardinalityNext` must be called before the oracle can serve this duration |
| `cardinalityRequired` | `uint16` | Minimum cardinality required for the given duration (pass this to `increaseObservationsCardinalityNext`) |
| `oldestObservationSatisfied` | `bool` | `true` if the ring buffer already holds an observation old enough to serve the full TWAP window |

The oracle is ready to use only when **both** `increaseCardinalityRequired == false` **and** `oldestObservationSatisfied == true`.

---

## Rate Functions

All six rate functions share the same parameter signature:

| Parameter | Type | Description |
|---|---|---|
| `market` | `address` | `PendleMarket` contract address |
| `duration` | `uint32` | TWAP window in seconds. Pass `0` to read the current spot implied rate (not TWAP). **Do not use `duration = 0` in production** — spot rates can be manipulated within a single block. |

All functions return a `uint256` value scaled to `1e18`. The return value `r` means:

```
1 raw_unit(queried_token) = r / 1e18  raw_units(denominator_token)
```

### `getPtToAssetRate`

```solidity
function getPtToAssetRate(address market, uint32 duration)
    external view returns (uint256);
```

Returns the TWAP rate of PT denominated in the market's underlying **asset** (as defined by `SY.assetInfo()`). Applies the SY solvency adjustment. Returns exactly `1e18` after market expiry (PT redeems 1:1 for asset post-expiry).

### `getPtToSyRate`

```solidity
function getPtToSyRate(address market, uint32 duration)
    external view returns (uint256);
```

Returns the TWAP rate of PT denominated in **SY**. This is the natively-guaranteed exchange rate and the **recommended denomination for collateral pricing**.

### `getYtToAssetRate`

```solidity
function getYtToAssetRate(address market, uint32 duration)
    external view returns (uint256);
```

Returns the TWAP rate of YT in **asset** terms. Applies the SY solvency adjustment. Computed as `1 - getPtToAssetRateRaw`, then adjusted for solvency.

:::note

Post-expiry, `ptToAssetRate = 1`, so `ytToAssetRate = 0`. Pricing YT after expiry is not meaningful and the function will return `0`.

:::

### `getYtToSyRate`

```solidity
function getYtToSyRate(address market, uint32 duration)
    external view returns (uint256);
```

Returns the TWAP rate of YT in **SY** terms.

### `getLpToAssetRate`

```solidity
function getLpToAssetRate(address market, uint32 duration)
    external view returns (uint256);
```

Returns the approximate TWAP rate of one LP token in **asset** terms, using the hypothetical-trade simulation. Applies the SY solvency adjustment. Reverts if called while the market is mid-transaction (reentrancy guard).

### `getLpToSyRate`

```solidity
function getLpToSyRate(address market, uint32 duration)
    external view returns (uint256);
```

Returns the approximate TWAP rate of one LP token in **SY** terms.

---

## Public State Variables

### `blockCycleNumerator`

```solidity
function blockCycleNumerator() external view returns (uint16);
```

Encodes the average block time of the chain as `blockTime_seconds × 1000`. Used internally to compute the minimum ring-buffer cardinality for a given TWAP duration. Configured per deployment:

| Chain | `blockCycleNumerator` | Effective block time |
|---|---|---|
| Ethereum | `11000` | &lt;12 s |
| Arbitrum, Base, other fast chains | `1000` | ≤1 s (minimum granularity) |

---

## Using the Oracle Libraries Directly

Two libraries expose the same rate functions as method calls on `IPMarket`:

| Library | Functions |
|---|---|
| `PendlePYOracleLib` | `getPtToAssetRate`, `getPtToSyRate`, `getYtToAssetRate`, `getYtToSyRate` |
| `PendleLpOracleLib` | `getLpToAssetRate`, `getLpToSyRate` |

**Getting PT price in SY:**

```solidity
import {PendlePYOracleLib} from "@pendle/core-v2/contracts/oracles/PtYtLpOracle/PendlePYOracleLib.sol";
import {IPMarket} from "@pendle/core-v2/contracts/interfaces/IPMarket.sol";

contract MyIntegration {
    using PendlePYOracleLib for IPMarket;

    function getPtPrice(address market, uint32 duration) external view returns (uint256) {
        return IPMarket(market).getPtToSyRate(duration);
    }
}
```

**Getting LP price in asset:**

```solidity
import {PendleLpOracleLib} from "@pendle/core-v2/contracts/oracles/PtYtLpOracle/PendleLpOracleLib.sol";
import {IPMarket} from "@pendle/core-v2/contracts/interfaces/IPMarket.sol";

contract MyIntegration {
    using PendleLpOracleLib for IPMarket;

    function getLpPrice(address market, uint32 duration) external view returns (uint256) {
        return IPMarket(market).getLpToAssetRate(duration);
    }
}
```

**Source files**:
- [`PendlePYOracleLib.sol`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/oracles/PtYtLpOracle/PendlePYOracleLib.sol)
- [`PendleLpOracleLib.sol`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/oracles/PtYtLpOracle/PendleLpOracleLib.sol)

---

## Chainlink-Compatible Oracle Wrappers

For protocols that consume prices via the standard `AggregatorV3Interface`, see [Chainlink-Compatible Oracle Wrappers](./ChainlinkOracle.md) for full documentation on `PendleChainlinkOracle`, `PendleChainlinkOracleWithQuote`, and `PendleChainlinkOracleFactory`.

---

## Integration Checklist

1. **Call `getOracleState`** for your chosen market and duration. Parse `increaseCardinalityRequired` and `oldestObservationSatisfied`.
2. **If cardinality is insufficient**, call `IPMarket(market).increaseObservationsCardinalityNext(cardinalityRequired)`.
3. **Wait at least `duration` seconds** after increasing cardinality (or if cardinality was already sufficient but `oldestObservationSatisfied == false`).
4. **Select a denomination**:
   - Prefer `ToSy` (e.g., `getPtToSyRate`) for maximum trustlessness.
   - Use `ToAsset` only if your protocol explicitly needs asset-unit pricing and you understand the SY-solvency risk.
5. **For LP collateral**, also implement reward redemption: call `IPMarket(market).redeemRewards(address)` to claim PENDLE incentives and any protocol reward tokens accrued to LP positions.

---

## Further Reading

- [How to Integrate PT and LP Oracle](../../Oracles/HowToIntegratePtAndLpOracle.md) — step-by-step integration guide with runnable examples
- [Introduction of PT Oracle](../../Oracles/IntroductionOfPtOracle.md) — TWAP math and cumulative rate derivation
- [Introduction of LP Oracle](../../Oracles/IntroductionOfLpOracle.md) — hypothetical-trade simulation methodology
- [PT as Collateral — Risk Analysis](../../Oracles/PTAsCollateral.md)
- [LP as Collateral — Risk Analysis](../../Oracles/LPAsCollateral.md)
- [Deployments](https://github.com/pendle-finance/pendle-core-v2-public/tree/main/deployments) — full list of deployed addresses per chain
