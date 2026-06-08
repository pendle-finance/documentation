---
hide_table_of_contents: true
---

# Incentives

The Algorithmic Incentive Model (AIM) is an automated, merit-based reward system that allocates PENDLE emissions to pools based on their performance. Pools that excel across liquidity, swap fees, limit-order depth, and co-incentives receive a higher share of rewards to recognize their contribution to the Pendle ecosystem. Each weekly incentive epoch starts on **Thursday 00:00 UTC**.

Incentives are delivered through four reward streams:
- **Performance**: emissions based on a pool's liquidity (TVL) and swap-fee generation
- **Limit Order**: emissions that reward limit-order depth on the orderbook
- **Co-Incentives**: PENDLE that Pendle matches against protocol-provided incentives — now used to boost the market's limit-order (maker) incentive
- **Discretionary**: strategic allocations for high-potential pools

A pool's combined **Performance** (TVL + Fee) incentive is capped at the lower of **\$2,000 or 1,500 PENDLE** per week, and its **Limit Order** incentive is capped at **\$1,250** per week. A typical weekly budget is around 90,000 PENDLE. Any PENDLE not distributed in a given week is returned to the protocol treasury and does not roll over to the next week's budget.

## How Often Are Incentives Updated?​

Incentives are recalculated and updated every hour. When a new pool is whitelisted, it begins receiving incentives within the next hour.

Individual components update on different schedules:
- **Liquidity emissions**: continuously in real time as TVL changes
- **Fee emissions**: recalculated three times per epoch — at the initial Thursday distribution, then again on Saturday and Monday
- **Limit order emissions**: continuously (hourly) as TVL and volume change
- **Co-incentives**: updated weekly
- **Discretionary**: updated weekly

## Performance

A pool's Performance incentive is the sum of its **liquidity-based** and **fee-based** emissions. It is adapted to support pools across their lifecycle: newer pools are aggressively incentivized based on liquidity growth, while mature pools are primarily incentivized based on swap-fee performance.

![incentive timeline](/pendle-docs/imgs/ProtocolMechanics/incentive_timeline.png "Incentive Timeline")

The combined liquidity + fee (Performance) incentive is capped per pool at the lower of **\$2,000 or 1,500 PENDLE** per week (see [Performance Cap & Cut-off](#performance-cap--cut-off)).

## Liquidity-Based Emissions

Pools receive PENDLE based on their **weighted TVL**, a blend that gives most of the weight to in-pool liquidity:

```Math
Weighted TVL = 80% × Pool Liquidity + 20% × Total TVL (including PT/YT holders)
```

(Equivalently, `Weighted TVL = LP TVL + k × Floating TVL` with `k = 0.2`.)

Weighted TVL determines a pool's share of emissions depending on its lifecycle phase, defined by its age (counted from the first Thursday after it was whitelisted):
- **Bootstrap** → less than 14 days since launch
- **Transition** → 14–21 days since launch
- **Mature** → 21 days or more since launch

![Emission Curve](/pendle-docs/imgs/ProtocolMechanics/emission_curve.png "Emission Curve")

The Bootstrap curve has an aggressive reward-per-liquidity slope to support new pools during their critical early phase. During the Transition phase the curve gradually shifts from Bootstrap toward Mature, after which pool performance is driven mainly by fees.

During the Bootstrap phase, pools also receive an artificial TVL floor so very small new pools are not under-rewarded: pools under \$200K are treated as \$200K, pools between \$200K and \$500K as \$500K, and pools between \$500K and \$2M as \$2M.

The liquidity emission share is interpolated piecewise-linearly between the following milestones:

| Weighted TVL | PENDLE Emission Share (Bootstrap, \<14 days) | PENDLE Emission Share (Mature, ≥21 days) |
|---|---|---|
| \$0     | 0%      | 0%     |
| \$2m    | 0.333%  | 0%     |
| \$5m    | 0.75%   | 0.15%  |
| \$10m+  | 0.75%   | 0.15%  |

### Renewed Pools
When a new maturity (a **Renewal Pool**) is launched for an existing pool (a **Maturing Pool**) on the same chain, the Renewal Pool follows the **Renewal Liquidity Curve**, which overrides the default Liquidity Curve.

The Renewal Pool's incentives are determined by:
1. The Maturing Pool's days-to-maturity
2. The Renewal Pool's liquidity

There are 3 phases for the **Renewal Liquidity Curve** (transition period is 7 days):
1. **Pre-Maturity** (\<7 days before the original pool matures)
2. **Transition** (0–7 days after the original pool matures)
3. **Post-Maturity** (\>7 days after the original pool matures, or \>7 days before it matures)

![Renewal Curve](/pendle-docs/imgs/ProtocolMechanics/renewal_curve.png "Renewal Curve")

Each phase applies a different emission level based on the Renewal Pool's liquidity:

| Weighted TVL (Renewal Pool) | PENDLE Emission Share (Pre-Maturity) | PENDLE Emission Share (Post-Maturity) |
|---|---|---|
| \$0     | 0%      | 0%     |
| \$2m    | 0.333%  | 0%     |
| \$5m    | 0.75%   | 0.15%  |
| \$10m+  | 0.75%   | 0.15%  |

The system also looks at how much incentive the Maturing Pool was earning, and guarantees the Renewal Pool at least a weighted decay from the predecessor's share — ensuring a smooth transition rather than a sudden drop.

#### Example

![Renewal Emission](/pendle-docs/imgs/ProtocolMechanics/renewal_emission.png "Renewal Emission")

*Assume a USDe pool is maturing soon, and its Renewal Pool (the next closest maturity) has \$10M weighted TVL.*

Following the Renewal Liquidity Curve, the Renewal Pool's emission share depends on the Maturing Pool's days-to-maturity:
- More than 7 days before the predecessor matures → Post-Maturity curve → **0.15%** emission share
- Within 7 days before the predecessor matures → Pre-Maturity curve → **0.75%** emission share
- During the 7-day window after the predecessor matures → blends from Pre-Maturity (0.75%) down to Post-Maturity (0.15%)

The objective is to calibrate incentives based on context. Renewal pools inherit established liquidity and a user base, so they need less bootstrapping support than a genuinely new asset. This lets the protocol focus stronger incentives on new asset launches while still supporting smooth rollovers for maturing pools.

## Fee-Based Emissions

Pools receive PENDLE based on their swap-fee performance. Unlike the previous model, fee incentive is now **deterministic per pool**: each pool earns a PENDLE amount derived directly from its own fees, with **no shared weekly budget** and no scaling against other pools.

A pool's fee incentive is computed in three steps:

1. **Recency-weighted fee** — fee performance uses a 2-week recency-weighted treasury fee that emphasizes recent activity:

   ```Math
   Weighted Fee = (Recent Week Fee × 2 + Previous Week Fee) / 3
   ```

   For newer pools (less than 14 days old), only the recent week's fee is used.

2. **TVL-tier rate** — the weighted fee is multiplied by a rate that amplifies small, young pools during their Bootstrap phase. The rate is interpolated over weighted-TVL tiers:

   | Weighted TVL | Rate (Bootstrap, age \< 21 days) | Rate (Mature, age ≥ 21 days) |
   |---|---|---|
   | ≤ \$2m   | 0.75 | 0.25 |
   | \$2m–\$5m | 0.75 → 0.25 | 0.25 |
   | ≥ \$5m   | 0.25 | 0.25 |

   Once a pool is mature, the rate is a flat 0.25.

3. **Convert to PENDLE** — the rate-adjusted fee is divided by the current PENDLE price to give the pool's deterministic weekly fee incentive in PENDLE.

There is **no global fee budget** and no cross-pool sharing. Each pool's fee incentive stands on its own and is bounded only by the per-pool [Performance Cap](#performance-cap--cut-off).

### Eligibility and Fee Measurement​

**Eligibility**: pools must be at least 2 days old to receive fee-based emissions. Newer pools can still receive liquidity-based emissions and other incentives.

**Renewed markets**: a freshly deployed Renewal Pool can inherit a portion of its predecessor's fee history during the renewal window, so its fee incentive does not start from zero. As the renewal window elapses, the pool transitions to using only its own fees.

## Performance Cap & Cut-off

The combined Performance incentive (TVL + Fee) for each pool is capped at the lower of **\$2,000 or 1,500 PENDLE** per week. TVL incentive is allocated first; the fee incentive then fills whatever room remains under the cap.

If a pool's combined TVL + Fee incentive falls below **50 PENDLE per week**, it is set to zero. This avoids pushing negligibly small on-chain rewards that cost gas but add little value. The cut-off is **skipped** in two cases:
- **Pre-mature pools** (still in the Bootstrap or Transition phase, age under 21 days) — these legitimately have small TVL and fee revenue while ramping up.
- **Manually overridden pools** — when an admin has fixed a TVL or Fee value for the market.

Co-incentive (limit-order boost), Limit Order incentive, and Discretionary allocations are added **on top** and are not subject to the Performance Cap or cut-off.

## Limit Order Emissions

Pools receive Limit Order (LO) rewards for providing limit-order depth on the orderbook, with a per-pool cap of **\$1,250 per week**. Incentives are distributed to limit orders within **±3.5%** of the current implied yield, on a time- and notional-value-weighted basis.

### Target Depth

Each pool targets a baseline of **5% of its total TVL** in orderbook depth, with the potential to grow up to **15% of total TVL** based on its recent trading volume.

- **TVL-Implied Depth (TID)**: 5% of total TVL — the baseline floor.
- **Volume-Implied Depth (VID)**: a 4-day recency-weighted trading volume — `(Recent 4-day Volume × 2 + Previous 4-day Volume) / 3` (newer pools use only the recent 4 days).
- **Depth Cap**: 15% of total TVL — the upper limit.

The target depth is whichever is larger between TID and VID, but never exceeding the Depth Cap. For example, a pool with \$10m total TVL targets \$500k in orderbook depth as a baseline, and can grow toward the \$1.5m depth cap as its recent volume rises.

### Decay-Adjusted Target Depth
A pool's target depth may be reduced to reflect its days-to-maturity (DTM), since pools far from maturity see less active trading. The decay rate starts at 25% for pools with DTM \> 120 and decreases linearly to 0% for pools with DTM \< 60.

For example, for a pool with \$1m target depth:
- 120 DTM → \$750k decay-adjusted target depth (full 25% reduction)
- 90 DTM → \$875k decay-adjusted target depth (half the reduction)
- 60 DTM → \$1m decay-adjusted target depth (no reduction)

### Target Incentives
The decay-adjusted target depth is used to determine the actual incentive allocated to a pool, based on a target LO APR of **50%**. The dollar value is derived by multiplying the target depth by the YT relative price, then applying the 50% reward rate over the year.

For example, given a decay-adjusted target depth of \$1m, a YT/USD of \$0.02, and a target APR of 50%, a pool would receive roughly \$192 in weekly PENDLE incentive. The weekly incentive per pool is capped at **\$1,250**.

### New Pool Boost
When a market is newly deployed — no predecessor and whitelisted less than 4 days — it has no trading history to imply depth from. To ensure it earns LO incentive from day one, its target depth is set to the greater of the depth cap (15% of TVL) and a **\$50,000** floor. After the new-pool period ends, the normal TID/VID calculation takes over.

### Renewed Markets
When a market rolls over to a new expiry, the new pool has no trading history yet, so its VID would otherwise drop to zero. To prevent a sudden incentive drop, renewed markets get two adjustments during a 7-day transition:
1. **Depth-cap bypass** — the 15%-of-TVL depth cap is not applied, so target depth can exceed the normal upper bound (the \$1,250 weekly cap still applies).
2. **Volume blending** — the predecessor's trading volume is blended into the new pool's VID, shifting from the predecessor's volume to the new pool's own volume as trading activity migrates.

## Co-Incentives

Protocols can use **External Incentive Campaigns** to provide additional rewards to Pendle users. The protocol's own deposited tokens are distributed to that market's holders, exactly as before. On top of that, Pendle **matches** a portion of the campaign's value in PENDLE:

- **22%** when the contributed token is PENDLE
- **15%** for external incentives provided as other tokens

**Where the matched PENDLE now goes.** Previously, Pendle's matched PENDLE was paid to passive LP/YT holders. It is now used to **boost the target market's Limit Order (maker) incentive** — added on top of the market's base LO emission. This rewards makers who actually place limit orders and trade PT/YT, and surfaces as part of the market's maker/LO APR rather than its holder APR.

A few practical notes:
- The boost only applies to markets that already run a Limit Order incentive program. If a co-incentivized market has no LO program — or cannot absorb the extra PENDLE under its per-maker LO APR cap — that portion simply is not distributed.
- The external protocol's own tokens are unaffected: they still go to the campaign's holders.
- Combined co-incentive spend is capped at **9,000 PENDLE per epoch**.

**How matching works​**
- Protocols submit incentives weekly through External Incentive Campaigns.
- Token values are calculated using 7-day moving-average prices for both the contributed token and PENDLE.
- Protocols receive their guaranteed match rate for that week.

## Discretionary

Up to **15%** of the maximum weekly emissions may be used for discretionary allocations, primarily targeted at pools with high growth potential.

## How It Adds Up

A pool's total weekly incentive is:

> **Total = Discretionary + Co-incentive LO boost + Limit Order incentive + min(Performance Cap, TVL + Fee)**

Only the TVL + Fee Performance component is subject to the per-pool Performance Cap and the small-amount cut-off. Discretionary, the co-incentive limit-order boost, and the Limit Order incentive are added on top.
