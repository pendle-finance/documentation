---
hide_table_of_contents: true
---

# Common Market Deployments

**Contract:** [`PendleCommonPoolDeployHelperV2`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/offchain-helpers/deploy/PendleCommonPoolDeployHelperV2.sol)

**Repository:** [pendle-finance/Pendle-Common-Pool-Deploy](https://github.com/pendle-finance/Pendle-Common-Pool-Deploy)

## Overview

`PendleCommonPoolDeployHelperV2` is the recommended helper for deploying Pendle markets. It handles the full deployment pipeline in a single transaction:

1. Deploy (or reuse) the SY contract
2. Create PT and YT via the yield contract factory
3. Create the market via the market factory
4. Seed initial liquidity at a target implied rate

There are two deployment paths depending on whether you are using a [Common SY](../StandardizedYield/CommonSY.md) or a custom SY you've already deployed.

**Prerequisite:** Approve `tokenToSeedLiquidity` spending by `PendleCommonPoolDeployHelperV2` before calling. ETH is accepted natively.

---

## Path 1: Deploy Common Market

Use this path when your asset fits one of the [pre-built Common SY types](../StandardizedYield/CommonSY.md). The helper deploys the SY for you alongside the market.

```solidity
function deployCommonMarketById(
    bytes32        id,
    bytes memory   constructorParams,
    bytes memory   initData,
    PoolConfig memory config,
    address        tokenToSeedLiquidity,
    uint256        amountToSeed,
    address        syOwner
) external returns (PoolDeploymentAddrs memory);
```

- `id` — the `bytes32` type ID of the Common SY (see [Registered Type IDs](../StandardizedYield/CommonSY.md#registered-type-ids))
- `constructorParams` / `initData` — ABI-encoded constructor and initializer args for the SY (see [Common SY Types](../StandardizedYield/CommonSY.md#common-sy-types) for encoding per type)
- `config` — market parameters (see [`PoolConfig`](#poolconfig-struct) below)
- `tokenToSeedLiquidity` — token to use for seeding initial liquidity
- `amountToSeed` — amount of that token to seed
- `syOwner` — owner address for the deployed SY contract

Returns `PoolDeploymentAddrs { SY, PT, YT, market }`.

---

## Path 2: Deploy Normal Market

Use this path when you have already deployed a custom SY (i.e., not a Common SY type) and want to create the PT/YT pair and market around it.

```solidity
function deploy5115MarketAndSeedLiquidity(
    address        SY,
    PoolConfig memory config,
    address        tokenToSeedLiquidity,
    uint256        amountToSeed
) public payable returns (PoolDeploymentAddrs memory);
```

- `SY` — address of your already-deployed SY contract
- `config` — market parameters (see [`PoolConfig`](#poolconfig-struct) below)
- `tokenToSeedLiquidity` / `amountToSeed` — token and amount for initial liquidity seeding

This is callable by anyone (not owner-gated), making it suitable for permissionlessly listing a custom SY. Returns `PoolDeploymentAddrs { SY, PT, YT, market }`.

---

## `PoolConfig` Struct

```solidity
struct PoolConfig {
    uint32  expiry;
    uint256 rateMin;
    uint256 rateMax;
    uint256 desiredImpliedRate;
    uint256 fee;
}
```

| Field | Description |
|---|---|
| `expiry` | Market expiry as a Unix timestamp |
| `rateMin` | Minimum implied APR, 1e18-scaled (e.g., `0.01e18` = 1%) |
| `rateMax` | Maximum implied APR, 1e18-scaled (e.g., `0.30e18` = 30%) |
| `desiredImpliedRate` | Target implied APR for seeding; must be between `rateMin` and `rateMax` |
| `fee` | Swap fee, 1e18-scaled (e.g., `0.001e18` = 0.1%) |

---

## Further Reading

- [Pendle-Common-Pool-Deploy Repository](https://github.com/pendle-finance/Pendle-Common-Pool-Deploy) — scripts and examples for deploying common pools
- [Common SY Contracts](../StandardizedYield/CommonSY.md) — available Common SY types and their constructor encoding
- [Community Listing](../../Integration/CommunityListing) — process for listing a new asset on Pendle
- [PendleMarket](./PendleMarket.md) — market state, AMM mechanics, and direct market interaction
