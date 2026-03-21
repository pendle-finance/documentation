---
hide_table_of_contents: true
---

# GaugeController

**Contract:** [`PendleGaugeControllerUpg`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/LiquidityMining/GaugeController/PendleGaugeControllerUpg.sol)

## Overview

`PendleGaugeControllerUpg` is the central contract that allocates **PENDLE token incentives** to whitelisted Pendle markets. It holds a balance of PENDLE and streams it to each market at a configured emission rate.

Pendle's off-chain algorithm (see [Incentives](../../../ProtocolMechanics/Mechanisms/Incentives)) determines how much PENDLE each market should receive per week, and the protocol owner periodically pushes updated rates on-chain via `setRewardDatas`. On every reward interaction in a market, the market contract calls `redeemMarketReward()` to pull its accumulated PENDLE from the controller.

GaugeController handles **PENDLE incentives only**. SY-native external rewards (e.g., AAVE tokens from an Aave SY, or Morpho rewards) flow through a completely separate path — see [Rewards](./Rewards) for the full picture.

## When to Use This

- **Displaying APR / incentive rates** — read `rewardData(market)` to get the current `pendlePerSec` emission rate and compute APR
- **Building dashboards** — query `rewardData` for multiple markets to show incentive schedules and remaining durations
- **Verifying market eligibility** — call `isWhitelisted(market)` to check if a market receives PENDLE incentives

:::note
To claim PENDLE incentives as an LP holder, call `redeemRewards(user)` on the [PendleMarket](../PendleMarket/PendleMarket) contract.
:::

## Core Concepts

### MarketRewardData

The controller stores per-market state in the following struct:

```solidity
struct MarketRewardData {
    uint128 pendlePerSec;       // PENDLE emission rate (tokens/second, 18 decimals)
    uint128 accumulatedPendle;  // accumulated but not yet transferred PENDLE
    uint128 lastUpdated;        // timestamp when accumulation was last settled
    uint128 incentiveEndsAt;    // timestamp when incentives for this market stop
}
```

| Field | Description |
|-------|-------------|
| `pendlePerSec` | The current emission rate in PENDLE tokens per second (18 decimals). Capped at `0.0333e18` (~20,000 PENDLE/week). |
| `accumulatedPendle` | PENDLE that has accrued since the last time the market called `redeemMarketReward()`. Transferred out when the market redeems. |
| `lastUpdated` | The last timestamp at which accumulation was settled (either by a rate update or a market redeem). |
| `incentiveEndsAt` | The timestamp at which PENDLE emission for this market ceases. Must be ≤ the market's expiry. |

### Accumulation Formula

PENDLE accrues linearly over time, stopping at `incentiveEndsAt`:

```
pendingPendle   = pendlePerSec × (min(now, incentiveEndsAt) − lastUpdated)
totalClaimable  = accumulatedPendle + pendingPendle
```

Once `block.timestamp >= incentiveEndsAt`, accumulation stops and no further PENDLE accrues to the market.

## Functions

### `rewardData`

Returns the raw on-chain reward state for a given market.

```solidity
function rewardData(address market)
    external
    view
    returns (uint128 pendlePerSec, uint128 accumulatedPendle, uint128 lastUpdated, uint128 incentiveEndsAt);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `market` | `address` | PendleMarket contract address |

| Return Value | Type | Description |
|--------------|------|-------------|
| `pendlePerSec` | `uint128` | Current emission rate (18 decimals) |
| `accumulatedPendle` | `uint128` | Settled but unclaimed PENDLE |
| `lastUpdated` | `uint128` | Timestamp of last settlement |
| `incentiveEndsAt` | `uint128` | Timestamp when emissions stop |

:::note
`accumulatedPendle` reflects the settled balance as of the last update. Add the pending accumulation (formula above) to get the full current claimable amount.
:::

### `isWhitelisted`

Returns whether a market is eligible to receive PENDLE incentives.

```solidity
function isWhitelisted(address market) external view returns (bool);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `market` | `address` | PendleMarket contract address |

Markets must be whitelisted before `setRewardDatas` can configure emissions for them.

### `redeemMarketReward`

Transfers all accumulated PENDLE to the calling market and resets `accumulatedPendle` to zero.

```solidity
function redeemMarketReward() external;
```

This function is called internally by the market contract (`PendleGauge._redeemExternalReward`) on every reward interaction. **Users and integrators do not need to call this directly** — it is automatically triggered when users call `redeemRewards` on a market.

## Integration Examples

:::danger Example code only
The snippets below are simplified for illustration and **are not audited**.
**Do not** use them in production or with real funds. If you adapt any example,
conduct a full review, add comprehensive tests, and obtain an independent **security audit**.
:::

### Computing pending PENDLE off-chain

```typescript
import { ethers } from "ethers";

async function getPendingPendle(
    gaugeController: ethers.Contract,
    market: string
): Promise<bigint> {
    const { pendlePerSec, accumulatedPendle, lastUpdated, incentiveEndsAt } =
        await gaugeController.rewardData(market);

    const now = BigInt(Math.floor(Date.now() / 1000));
    const effectiveNow = now < incentiveEndsAt ? now : incentiveEndsAt;
    const elapsed = effectiveNow > lastUpdated ? effectiveNow - lastUpdated : 0n;

    const pendingPendle = pendlePerSec * elapsed;
    return accumulatedPendle + pendingPendle;
}
```

### Computing PENDLE APR for a market

```typescript
import { ethers } from "ethers";

async function getPendleApr(
    gaugeController: ethers.Contract,
    market: ethers.Contract,
    pendlePriceUsd: number,
    lpTotalSupply: bigint,
    lpPriceUsd: number
): Promise<number> {
    const { pendlePerSec, incentiveEndsAt } =
        await gaugeController.rewardData(market.target);

    const now = BigInt(Math.floor(Date.now() / 1000));
    if (now >= incentiveEndsAt || pendlePerSec === 0n) return 0;

    const SECONDS_PER_YEAR = 365.25 * 24 * 3600;

    // Annual PENDLE emission for this market
    const pendlePerYear = Number(pendlePerSec) / 1e18 * SECONDS_PER_YEAR;
    const emissionValueUsd = pendlePerYear * pendlePriceUsd;

    // Total LP value staked
    const totalLpValueUsd = Number(lpTotalSupply) / 1e18 * lpPriceUsd;

    return emissionValueUsd / totalLpValueUsd; // e.g. 0.12 = 12% APR
}
```

## Further Reading

- [Rewards](./Rewards) — full reward accounting model covering SY-native, PENDLE, and off-chain rewards
- [MerkleDistributor](./MerkleDistributor) — off-chain reward distribution (voter incentives, partner points)
- [PendleMarket](../PendleMarket/PendleMarket) — market contract that calls `redeemMarketReward()` internally
- [Incentives](../../../ProtocolMechanics/Mechanisms/Incentives) — how PENDLE incentive allocations are determined
