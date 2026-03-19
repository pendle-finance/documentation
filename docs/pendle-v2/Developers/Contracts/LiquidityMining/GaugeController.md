---
hide_table_of_contents: true
---

# GaugeController

`PendleGaugeControllerUpg` is the central contract that allocates PENDLE token incentives to whitelisted Pendle markets. It holds a balance of PENDLE and streams it to each market at a configured rate.

Pendle's off-chain algorithm (see [Incentives](../../ProtocolMechanics/Mechanisms/Incentives)) determines how much PENDLE each market should receive per week, and the protocol owner periodically pushes updated rates on-chain via `setRewardDatas`. On every reward interaction in a market, the market contract calls `redeemMarketReward()` to pull its accumulated PENDLE from the controller.

---

## `MarketRewardData` Struct

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
| `accumulatedPendle` | PENDLE that has accrued since the last time the market called `redeemMarketReward()`. This is transferred out when the market redeems. |
| `lastUpdated` | The last timestamp at which accumulation was settled (either by a rate update or a market redeem). |
| `incentiveEndsAt` | The timestamp at which PENDLE emission for this market ceases. Must be ≤ the market's expiry. |

---

## Accumulation Formula

PENDLE accrues linearly over time, stopping at `incentiveEndsAt`:

```
pendingPendle   = pendlePerSec × (min(now, incentiveEndsAt) − lastUpdated)
totalClaimable  = accumulatedPendle + pendingPendle
```

Once `block.timestamp >= incentiveEndsAt`, accumulation stops and no further PENDLE accrues to the market.

---

## Functions

### `rewardData(address market) → MarketRewardData`

Returns the raw on-chain reward state for a given market.

```solidity
(uint128 pendlePerSec, uint128 accumulatedPendle, uint128 lastUpdated, uint128 incentiveEndsAt)
    = gaugeController.rewardData(market);
```

Note: `accumulatedPendle` reflects the settled balance as of the last update. Add the pending accumulation (formula above) to get the full current claimable amount.

### `isWhitelisted(address market) → bool`

Returns whether a market is eligible to receive PENDLE incentives. Markets must be whitelisted before `setRewardDatas` can be called for them.

```solidity
bool eligible = gaugeController.isWhitelisted(market);
```

---

### `redeemMarketReward()`

Transfers all accumulated PENDLE to the calling market and resets `accumulatedPendle` to zero.

```solidity
function redeemMarketReward() external;
```

This function is called internally by the market contract (`PendleGauge._redeemExternalReward`) on every reward interaction. **Users and integrators do not call this directly** — it is automatically triggered when users call `redeemRewards` on a market.

---

## Computing Current Pending PENDLE Off-Chain

To compute how much PENDLE a market can currently claim (including what has not yet been settled on-chain):

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

---

:::note
GaugeController only handles **PENDLE** incentives. SY-native external rewards (e.g., AAVE tokens from an Aave SY, or Morpho rewards) flow through a completely separate path and are documented in [Rewards](./Rewards).
:::
