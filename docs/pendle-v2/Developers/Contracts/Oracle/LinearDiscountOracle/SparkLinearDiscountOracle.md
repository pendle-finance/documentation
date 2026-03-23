---
hide_table_of_contents: true
---

# Spark Linear Discount Oracle (PT)

**Sources:**
- [`PendleSparkLinearDiscountOracle.sol`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/oracles/internal/PendleSparkLinearDiscountOracle.sol)
- [`PendleSparkLinearDiscountOracleFactory.sol`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/oracles/internal/PendleSparkLinearDiscountOracleFactory.sol)

## Overview

`PendleSparkLinearDiscountOracle` is a deterministic feed that returns a **discount factor** for a given PT. The factor increases linearly as time passes and converges to `1.0` at maturity, so integrators can price PT conservatively without relying on external market data.

The returned value is a **multiplier in 18 decimals**, not a USD price. It implements `IPChainlinkOracleEssential` and is cardinality-free (no ring-buffer setup required).

For pricing formulas, use cases, and integration examples, see the [integration guide](../../../Oracles/DeterministicOracles/LinearDiscountOracle.md).

---

## Should I use this oracle?

**Use this oracle if:**
- The market is newly listed and has no TWAP history yet
- Your protocol requires a manipulation-proof, fully deterministic price feed
- You prefer a predictable, auditable pricing function over market-derived rates

**Use [`PendlePYLpOracle`](../PYLpOracle.md) instead if:**
- The market is established and has sufficient TWAP cardinality
- You need prices that track the actual market-implied rate

See [Choosing Linear Discount Parameters](../../../Oracles/DeterministicOracles/ChoosingLinearDiscountParams.md) for guidance on selecting `baseDiscountPerYear`.

---

## Deployment

Deploy via `PendleSparkLinearDiscountOracleFactory`. Find the factory address under `"sparkLinearDiscountOracleFactory"` in the [Deployments on GitHub](https://github.com/pendle-finance/pendle-core-v2-public/tree/main/deployments).

```solidity
// Deploy using the PT address directly
function createWithPt(address pt, uint256 baseDiscountPerYear) external returns (address);

// Or derive PT from the market address automatically
function createWithMarket(address market, uint256 baseDiscountPerYear) external returns (address);
```

Emits `OracleCreated(address indexed pt, uint256 baseDiscountPerYear, address oracle)`.

## `updatedAt` Staleness Compatibility

Most lending protocols reject feeds where `block.timestamp - updatedAt` exceeds a threshold. This oracle always returns `updatedAt = 0` — it is stateless and computes the price live from `block.timestamp`, so it is never stale by design.

If your protocol enforces a staleness check, use `PendleSparkLinearDiscountOracleFactoryWrapper` instead — it deploys and wraps the oracle in one step, returning `updatedAt = block.timestamp`. Find it under `"sparkLinearDiscountOracleFactoryWrapper"` in deployments. See [`LinearDiscountOracleWrapper`](./LinearDiscountOracleWrapper.md) for details.

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
timeLeft = max(maturity - block.timestamp, 0)
discount = timeLeft × baseDiscountPerYear / SECONDS_PER_YEAR
answer   = clamp(1e18 - discount, 0, 1e18)
```

`answer` is the current value of 1 PT as a fraction of its maturity redemption value. An `answer` of `0.95e18` means 1 PT is currently priced at 95% of 1 unit of the underlying asset.

```solidity
function decimals() external pure returns (uint8);   // returns 18
```

---

## Contract Reference

### Public Variables

| Variable | Type | Description |
|---|---|---|
| `PT` | `address` | The PT token this oracle prices |
| `maturity` | `uint256` | Expiry timestamp, read from `PT.expiry()` at construction |
| `baseDiscountPerYear` | `uint256` | Annual discount slope; `1e18 = 100%/year`. Constructor enforces `<= 1e18`. |

### `getDiscount`

```solidity
function getDiscount(uint256 timeLeft) public view returns (uint256);
```

Returns the raw discount amount for a given `timeLeft` in seconds. The `answer` from `latestRoundData()` equals `1e18 - getDiscount(timeLeft)`.

---

## Further Reading

- [`LinearDiscountOracleWrapper`](./LinearDiscountOracleWrapper.md) — when and how to apply the `updatedAt` wrapper
- [LP Linear Discount Oracle](./LpLinearDiscountOracle.md) — deterministic pricing for LP tokens
- [Choosing Linear Discount Parameters](../../../Oracles/DeterministicOracles/ChoosingLinearDiscountParams.md) — guidance on selecting `baseDiscountPerYear`
- [Integration Guide](../../../Oracles/DeterministicOracles/LinearDiscountOracle.md) — pricing formulas, examples, and use cases
