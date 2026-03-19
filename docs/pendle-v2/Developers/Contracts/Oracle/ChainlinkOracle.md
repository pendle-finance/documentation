---
hide_table_of_contents: true
---

# Pendle Chainlink-Compatible Oracle Wrappers

## Overview

Pendle provides a set of Chainlink-compatible oracle contracts that wrap `PendlePYLpOracle` rate functions behind the standard `AggregatorV3Interface`. This allows money markets, lending protocols, and any system that already consumes Chainlink feeds to price Pendle PT and LP tokens without any custom integration.

**Contracts covered here:**

| Contract | Role |
|---|---|
| `PendleChainlinkOracle` | Immutable per-market wrapper; returns PT or LP price in SY or asset |
| `PendleChainlinkOracleWithQuote` | Extends the base wrapper; multiplies the Pendle rate by an external quote feed |
| `PendleChainlinkOracleFactory` | Permissionless factory; deploys and registers both oracle variants |

**Sources:**
- [`PendleChainlinkOracle.sol`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/oracles/PtYtLpOracle/chainlink/PendleChainlinkOracle.sol)
- [`PendleChainlinkOracleWithQuote.sol`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/oracles/PtYtLpOracle/chainlink/PendleChainlinkOracleWithQuote.sol)
- [`PendleChainlinkOracleFactory.sol`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/oracles/PtYtLpOracle/chainlink/PendleChainlinkOracleFactory.sol)

> **Prerequisite:** The underlying `PendlePYLpOracle` TWAP must be initialized before any Chainlink oracle can be deployed for a market. See [PendlePYLpOracle — Oracle Initialization](./PYLpOracle.md#prerequisites-oracle-initialization).

---

## `PendleOracleType` Enum

All oracle types are selected at deployment time and fixed immutably:

```solidity
enum PendleOracleType {
    PT_TO_SY,     // 1 PT expressed in SY units
    PT_TO_ASSET,  // 1 PT expressed in underlying asset units
    LP_TO_SY,     // 1 LP expressed in SY units
    LP_TO_ASSET   // 1 LP expressed in underlying asset units
}
```

YT pricing is **not available** through the Chainlink wrapper. Use [`PendlePYLpOracle`](./PYLpOracle.md) directly for `getYtToSyRate` / `getYtToAssetRate`.

For guidance on choosing `ToSy` vs `ToAsset`, see [PendlePYLpOracle — SY Solvency Adjustment](./PYLpOracle.md#oracle-architecture).

---

## `PendleChainlinkOracle`

Wraps one of the four `PendleOracleType` rate functions and exposes it via `AggregatorV3Interface`. Every parameter (market, TWAP duration, oracle type) is set in the constructor and cannot be changed.

**Constructor** (called by the factory — not deployed directly):

```solidity
constructor(
    address          _market,          // PendleMarket address
    uint32           _twapDuration,    // TWAP window in seconds
    PendleOracleType _baseOracleType   // PT_TO_SY | PT_TO_ASSET | LP_TO_SY | LP_TO_ASSET
)
```

### Immutable Public Variables

| Variable | Type | Description |
|---|---|---|
| `factory` | `address` | Factory that deployed this oracle |
| `market` | `address` | `PendleMarket` this oracle prices |
| `twapDuration` | `uint32` | TWAP window in seconds |
| `baseOracleType` | `PendleOracleType` | The rate type returned |

### `latestRoundData`

```solidity
function latestRoundData()
    external
    view
    returns (
        uint80  roundId,
        int256  answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80  answeredInRound
    );
```

| Field | Value |
|---|---|
| `roundId` | Always `0` |
| `answer` | Price in 18 decimals (see semantics below) |
| `startedAt` | Always `0` |
| `updatedAt` | Always `block.timestamp` |
| `answeredInRound` | Always `0` |

**`answer` semantics:**
> 1 natural unit of the Pendle token = `answer / 1e18` natural units of the output token.

In other words, `10^(PendleToken.decimals) raw units` of the input token is worth `(answer / 1e18) × 10^(outputToken.decimals) raw units` of the output token.

**Examples:**
- `baseOracleType = PT_TO_SY`, `answer = 0.95e18` → 1 PT = 0.95 SY (in human/natural units)
- `baseOracleType = LP_TO_ASSET`, `answer = 1.12e18` → 1 LP = 1.12 units of the underlying asset

The contract internally rescales from the raw 1e18-scaled `PendlePYLpOracle` output to account for any token decimal differences between input and output.

### `getRoundData`

```solidity
function getRoundData(uint80 roundId)
    external
    view
    returns (uint80, int256, uint256, uint256, uint80);
```

Only accepts `roundId = 0`. Reverts with `InvalidRoundId()` for any other value. Returns the same data as `latestRoundData`.

### `decimals`

```solidity
function decimals() external pure returns (uint8);
```

Always returns `18`.

### `description`

```solidity
function description() external pure returns (string memory);
```

Returns `"Pendle Chainlink-compatible Oracle"`.

---

## `PendleChainlinkOracleWithQuote`

Extends `PendleChainlinkOracle` by multiplying the Pendle rate against an external Chainlink price feed, denominating the output in an arbitrary quote token (e.g., USD via ETH/USD, BTC/USD).

**Use case:** A lending protocol that wants to price `PT-weETH` in USD can deploy `PendleChainlinkOracleWithQuote` with:
- `baseOracleType = PT_TO_SY` (prices PT in weETH, the SY)
- `quoteOracle = weETH/USD Chainlink feed`

The resulting `answer` gives the USD value of 1 PT, updated whenever the quote oracle updates.

**Constructor** (called by the factory):

```solidity
constructor(
    address          _market,
    uint32           _twapDuration,
    PendleOracleType _baseOracleType,
    address          _quoteOracle      // must implement AggregatorV3Interface
)
```

### Additional Immutable Variables

| Variable | Type | Description |
|---|---|---|
| `quoteOracle` | `address` | External Chainlink feed used for the quote |
| `quoteScale` | `int256` | `10^quoteOracle.decimals()`, cached at construction |

### `latestRoundData`

```solidity
function latestRoundData()
    external
    view
    returns (
        uint80  roundId,        // 0
        int256  answer,         // pendleRate × quoteAnswer / quoteScale
        uint256 startedAt,      // 0
        uint256 updatedAt,      // quoteOracle.updatedAt (NOT block.timestamp)
        uint80  answeredInRound // 0
    );
```

**Key differences from the base `PendleChainlinkOracle`:**

1. **`updatedAt` reflects the quote feed's last update timestamp**, not `block.timestamp`. If the quote oracle is stale, `updatedAt` will be old — your protocol's staleness check will catch this correctly.
2. **`answer` is the product**: `pendleRate × quoteAnswer / 10^quoteOracle.decimals()`. Both inputs are in 18 decimals on the Pendle side; the formula rescales correctly regardless of the quote feed's decimals.

:::warning Check quote feed staleness

Always validate `updatedAt` against a maximum staleness threshold before consuming the answer. Pendle's TWAP rate is always fresh (recomputed on each call), but the quote feed is an external dependency. A stale quote will produce a stale `answer`.

:::

---

## `PendleChainlinkOracleFactory`

Permissionless factory that deploys oracle instances and stores them in a registry keyed by `keccak256(market, twapDuration, baseOracleType[, quoteOracle])`. Duplicate deployments are rejected.

**Lookup the factory address** for each chain in the [Deployments on GitHub](https://github.com/pendle-finance/pendle-core-v2-public/tree/main/deployments).

### `createOracle`

```solidity
function createOracle(
    address          market,
    uint32           twapDuration,
    PendleOracleType baseOracleType
) external returns (address oracle);
```

Deploys a new `PendleChainlinkOracle`. Emits `OracleCreated`.

**Reverts:**

| Error | Condition |
|---|---|
| `OracleAlreadyExists()` | An oracle with these exact parameters already exists in the registry |
| `OracleIncreaseCardinalityRequired(uint32 cardinalityRequired)` | The market's observation ring buffer is too small for the requested `twapDuration`; call `IPMarket(market).increaseObservationsCardinalityNext(cardinalityRequired)` first |
| `OracleOldestObservationNotSatisfied()` | Cardinality is sufficient, but not enough time has elapsed since initialization; wait at least `twapDuration` seconds |

### `createOracleWithQuote`

```solidity
function createOracleWithQuote(
    address          market,
    uint32           twapDuration,
    PendleOracleType baseOracleType,
    address          quoteOracle
) external returns (address oracle);
```

Deploys a new `PendleChainlinkOracleWithQuote`. Same revert conditions as `createOracle`. Emits `OracleWithQuoteCreated`.

`quoteOracle` must implement `AggregatorV3Interface` (specifically `latestRoundData()` and `decimals()`).

### `getOracle`

```solidity
function getOracle(
    address          market,
    uint32           twapDuration,
    PendleOracleType baseOracleType
) external view returns (address);
```

Returns the deployed oracle address, or `address(0)` if not yet deployed.

### `getOracleWithQuote`

```solidity
function getOracleWithQuote(
    address          market,
    uint32           twapDuration,
    PendleOracleType baseOracleType,
    address          quoteOracle
) external view returns (address);
```

Returns the deployed oracle-with-quote address, or `address(0)` if not yet deployed.

### `checkMarketOracleState`

```solidity
function checkMarketOracleState(address market, uint32 twapDuration) external view;
```

Reverts with the appropriate error if the market oracle is not ready. Useful as a pre-flight check before calling `createOracle`. Internally delegates to `PendlePYLpOracle.getOracleState`.

---

## Deployment Workflow

```
1. Call PendlePYLpOracle.getOracleState(market, twapDuration)
       → if increaseCardinalityRequired:
           IPMarket(market).increaseObservationsCardinalityNext(cardinalityRequired)
           wait twapDuration seconds
       → if !oldestObservationSatisfied:
           wait twapDuration seconds

2. Call factory.createOracle(market, twapDuration, baseOracleType)
   OR factory.createOracleWithQuote(market, twapDuration, baseOracleType, quoteOracle)
       → returns deployed oracle address

3. Use oracle.latestRoundData() in your protocol
```

### Code Example

```solidity
// Deploy a PT/SY oracle for a given market
address oracle = factory.createOracle(
    market,
    900,                        // 15-minute TWAP
    PendleOracleType.PT_TO_SY
);

// Deploy a PT/USD oracle using an external ETH/USD feed
address oracleUsd = factory.createOracleWithQuote(
    market,
    900,
    PendleOracleType.PT_TO_SY,
    address(ETH_USD_CHAINLINK_FEED)
);

// Consume PT/SY price
(, int256 answer, , uint256 updatedAt, ) = IAggregatorV3(oracle).latestRoundData();
// answer is 1e18-scaled: 1 PT = (answer / 1e18) SY (in natural units)

// Consume PT/USD price
(, int256 answerUsd, , uint256 updatedAtUsd, ) = IAggregatorV3(oracleUsd).latestRoundData();
// answer is 1e18-scaled: 1 PT = (answerUsd / 1e18) USD (in natural units)
```

---

## Further Reading

- [PendlePYLpOracle](./PYLpOracle.md) — the underlying TWAP oracle, including oracle initialization, `getOracleState`, and direct rate function specs
- [How to Integrate PT and LP Oracle](../Oracles/HowToIntegratePtAndLpOracle.md) — step-by-step integration guide with runnable examples
- [PT as Collateral — Risk Analysis](../Oracles/PTAsCollateral.md)
- [LP as Collateral — Risk Analysis](../Oracles/LPAsCollateral.md)
