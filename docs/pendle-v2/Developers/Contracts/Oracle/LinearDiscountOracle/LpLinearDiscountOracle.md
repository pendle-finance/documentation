---
hide_table_of_contents: true
---

# LP Linear Discount Oracle

**Sources:**
- [`PendleLpLinearDiscountOracle.sol`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/oracles/internal/PendleLpLinearDiscountOracle.sol)
- [`PendleLpLinearDiscountOracleFactory.sol`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/oracles/internal/PendleLpLinearDiscountOracleFactory.sol)

## Overview

`PendleLpLinearDiscountOracle` is a deterministic feed that returns a **discount factor** for a Pendle LP token. It works identically to the [Spark Linear Discount Oracle](./SparkLinearDiscountOracle.md) for PT, except the convergence target is a configurable `lpMaturedPrice` (≥ 1.0) rather than exactly 1.0 — reflecting that LP tokens accrue SY yield while the market is live.

The returned value is a **multiplier in 18 decimals**, not a USD price. It implements `IPChainlinkOracleEssential` and is cardinality-free (no ring-buffer setup required).

For use cases and integration examples, see the [integration guide](../../../../Oracles/DeterministicOracles/LPLinearDiscountOracle.md).

---

## Deployment

Deploy via `PendleLpLinearDiscountOracleFactory`. Find the factory address under `"lpLinearDiscountOracleFactory"` in the [Deployments on GitHub](https://github.com/pendle-finance/pendle-core-v2-public/tree/main/deployments).

```solidity
function create(
    address market,
    uint256 baseLpDiscountPerYear,
    uint256 lpMaturedPrice
) external returns (address);
```

| Parameter | Description |
|---|---|
| `market` | The `PendleMarket` (LP token) address |
| `baseLpDiscountPerYear` | Annual discount slope in wad (`1e18 = 100%/year`) |
| `lpMaturedPrice` | Target LP price at maturity in wad; must be `>= 1e18`. Set slightly above `1e18` to reflect SY yield accrued in the pool by maturity. |

See [Choosing Linear Discount Parameters](../../../../Oracles/DeterministicOracles/ChoosingLinearDiscountParams.md) for guidance on selecting these values.

:::warning No factory wrapper for LP

There is no dedicated LP factory wrapper. To satisfy protocols that check `updatedAt` staleness, wrap the oracle manually after deployment:

```solidity
address lpOracle  = lpFactory.create(market, baseLpDiscountPerYear, lpMaturedPrice);
address lpWrapped = address(new PendleLinearDiscountOracleWrapper(lpOracle));
```

See [`LinearDiscountOracleWrapper`](./LinearDiscountOracleWrapper.md) for details.

:::

---

## Reading the Price

```solidity
function latestRoundData()
    external
    view
    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);
```

Only `answer` carries meaningful data. All other fields return `0`.

**Formula:**

```
timeLeft   = max(maturity - block.timestamp, 0)
lpDiscount = timeLeft × baseLpDiscountPerYear / SECONDS_PER_YEAR
answer     = (1e18 - lpDiscount) × lpMaturedPrice / 1e18
```

Reverts if `lpDiscount > 1e18` (only possible if `baseLpDiscountPerYear` is set so high that the discount at launch would exceed 100%).

```solidity
function decimals() external pure returns (uint8);   // returns 18
```

---

## Contract Reference

### Immutable Variables

| Variable | Type | Description |
|---|---|---|
| `LP` | `address` | The Pendle market (LP token) this oracle prices |
| `maturity` | `uint256` | Expiry timestamp, read from `LP.expiry()` at construction |
| `baseLpDiscountPerYear` | `uint256` | Annual discount slope; `1e18 = 100%/year` |
| `lpMaturedPrice` | `uint256` | Target LP price at maturity in wad; enforced `>= 1e18` at construction |

### `getLpPrice`

```solidity
function getLpPrice(uint256 timeLeft) public view returns (uint256);
```

Returns the LP price factor for a given `timeLeft` in seconds. Same value as `answer` in `latestRoundData()`.

### `getLpDiscount`

```solidity
function getLpDiscount(uint256 timeLeft) public view returns (uint256);
```

Returns the raw discount for a given `timeLeft` in seconds:
```
lpDiscount = timeLeft × baseLpDiscountPerYear / SECONDS_PER_YEAR
```

---

## Further Reading

- [`LinearDiscountOracleWrapper`](./LinearDiscountOracleWrapper.md) — applying the `updatedAt` wrapper manually
- [Spark Linear Discount Oracle](./SparkLinearDiscountOracle.md) — deterministic pricing for PT tokens
- [Choosing Linear Discount Parameters](../../../../Oracles/DeterministicOracles/ChoosingLinearDiscountParams.md) — guidance on selecting `baseLpDiscountPerYear` and `lpMaturedPrice`
- [Integration Guide](../../../../Oracles/DeterministicOracles/LPLinearDiscountOracle.md) — use cases and integration walkthrough
