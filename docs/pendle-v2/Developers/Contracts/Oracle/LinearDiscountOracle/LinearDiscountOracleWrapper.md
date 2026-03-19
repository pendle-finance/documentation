---
hide_table_of_contents: true
---

# Linear Discount Oracle Wrapper

**Sources:**
- [`PendleLinearDiscountOracleWrapper.sol`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/oracles/StatelessWrapper/PendleLinearDiscountOracleWrapper.sol)
- [`PendleSparkLinearDiscountOracleFactoryWrapper.sol`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/oracles/StatelessWrapper/PendleSparkLinearDiscountOracleFactoryWrapper.sol)

## Overview

`PendleLinearDiscountOracleWrapper` is a thin stateless wrapper that fixes the one incompatibility between Pendle's deterministic oracles and Chainlink-consuming protocols: the `updatedAt` field.

Pendle's deterministic oracles (`PendleSparkLinearDiscountOracle`, `PendleLpLinearDiscountOracle`) return `updatedAt = 0` in `latestRoundData()` because their prices are computed entirely from `block.timestamp` and immutable constructor parameters — they are never "stale" by design. However, most lending protocols enforce a staleness check of the form `block.timestamp - updatedAt < threshold`, which will reject any feed that returns `updatedAt = 0`.

The wrapper solves this by forwarding all fields from the inner oracle unchanged, **except `updatedAt`**, which it overwrites with `block.timestamp`.

---

## When to Use the Wrapper

| Scenario | What to deploy |
|---|---|
| Protocol does **not** check `updatedAt` staleness | Deploy `PendleSparkLinearDiscountOracle` directly via `PendleSparkLinearDiscountOracleFactory` |
| Protocol **does** check `updatedAt` staleness (most lending protocols) | Deploy via `PendleSparkLinearDiscountOracleFactoryWrapper` — the wrapper always returns `updatedAt = block.timestamp` |
| You already have a bare oracle and need to add the wrapper | Call `PendleSparkLinearDiscountOracleFactoryWrapper.wrap(existingOracle)` |

:::note LP oracle has no factory wrapper

`PendleLpLinearDiscountOracle` does not have a dedicated factory wrapper contract. To apply the wrapper to an LP oracle, deploy `PendleLpLinearDiscountOracle` via `PendleLpLinearDiscountOracleFactory`, then wrap the deployed address manually:

```solidity
address lpOracle   = lpFactory.create(market, baseLpDiscountPerYear, lpMaturedPrice);
address lpWrapped  = address(new PendleLinearDiscountOracleWrapper(lpOracle));
```

:::

---

## `PendleLinearDiscountOracleWrapper`

A minimal proxy that wraps **any** `IPChainlinkOracleEssential`-compatible oracle and replaces its `updatedAt` with `block.timestamp`.

```solidity
contract PendleLinearDiscountOracleWrapper is IPChainlinkOracleEssential {
    IPChainlinkOracleEssential public immutable innerOracle;

    constructor(address _innerOracle);
}
```

### `latestRoundData`

```solidity
function latestRoundData()
    external
    view
    returns (
        uint80  roundId,
        int256  answer,
        uint256 startedAt,
        uint256 updatedAt,      // overwritten to block.timestamp
        uint80  answeredInRound
    );
```

All fields are forwarded from `innerOracle.latestRoundData()`, except `updatedAt` which is replaced with `block.timestamp`. The `answer` (the discount factor or LP price) is not modified in any way.

### `decimals`

```solidity
function decimals() external view returns (uint8);
```

Delegates directly to `innerOracle.decimals()`. Returns `18` for all Pendle deterministic oracles.

---

## `PendleSparkLinearDiscountOracleFactoryWrapper`

A convenience contract that combines `PendleSparkLinearDiscountOracleFactory` and `PendleLinearDiscountOracleWrapper` into a single deployment step. Calling `createWithPt` or `createWithMarket` on this contract:

1. Deploys a `PendleSparkLinearDiscountOracle` (via the inner factory)
2. Immediately wraps it in `PendleLinearDiscountOracleWrapper`
3. Returns the **wrapper address** — the address your protocol should point at

Emits `WrapperOracleCreated(address indexed innerOracle, address indexed wrapper)` on each deployment.

```solidity
contract PendleSparkLinearDiscountOracleFactoryWrapper {
    PendleSparkLinearDiscountOracleFactory public immutable innerFactory;

    constructor(address _innerFactory);
}
```

### `createWithPt`

```solidity
function createWithPt(
    address pt,
    uint256 baseDiscountPerYear
) external returns (address wrapper);
```

Deploys a `PendleSparkLinearDiscountOracle` for the given PT address, then wraps it. Returns the wrapper address.

### `createWithMarket`

```solidity
function createWithMarket(
    address market,
    uint256 baseDiscountPerYear
) external returns (address wrapper);
```

Derives the PT address from `IPMarket(market).readTokens()`, then proceeds identically to `createWithPt`.

### `wrap`

```solidity
function wrap(address innerOracle) public returns (address wrapper);
```

Wraps an already-deployed `IPChainlinkOracleEssential`-compatible oracle in a new `PendleLinearDiscountOracleWrapper`. Useful if you deployed an oracle via `PendleSparkLinearDiscountOracleFactory` directly and need to add the wrapper afterwards.

**Deployment addresses:** Find the factory wrapper address for each chain under `"sparkLinearDiscountOracleFactoryWrapper"` in the [Deployments on GitHub](https://github.com/pendle-finance/pendle-core-v2-public/tree/main/deployments).

---

## Further Reading

- [Spark Linear Discount Oracle](./SparkLinearDiscountOracle.md) — full contract reference for the PT oracle
- [LP Linear Discount Oracle](./LpLinearDiscountOracle.md) — full contract reference for the LP oracle
- [Choosing Linear Discount Parameters](../../../../Oracles/DeterministicOracles/ChoosingLinearDiscountParams.md) — guidance on setting `baseDiscountPerYear`
