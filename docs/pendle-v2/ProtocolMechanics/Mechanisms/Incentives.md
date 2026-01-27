---
hide_table_of_contents: true
---

# Incentives

The algorithmic incentive model is an automated merit-based reward system that allocates PENDLE emissions to pools based on their performance. Pools that excel across TVL, swap fee, and co-incentive categories receive a higher share of rewards to recognize their contributions to the Pendle ecosystem.

The algorithmic incentive model has two reward streams:
- Performance
- Co-Incentives

Each pool is eligible for a maximum of 7,500 PENDLE per epoch.

Input data is based on a 2-week recency-weighted average that applies a 2x weighting on the most recent week and a 1x weighting on the previous week.

## Performance 

Performance-based emissions are adapted to support pools based on their expected needs throughout their lifecycle: newer pools are aggressively incentivized based on liquidity pool TVL growth while mature pools are primarily incentivized based on swap fee performance.

![incentive timeline](/img/ProtocolMechanics/incentive_timeline.png "Incentive Timeline")

The performance-based emission streams have a combined weekly budget of 80,000 PENDLE.

## TVL-Based Emissions

Pools receive PENDLE based on their LP TVL and time since deployment and is split into three phases:
1. Bootstrapping -> \<21 days since deployment
2. Growth -> 21-35 days since deployment
3. Mature -> 35 days since deployment

![Emission Curve](/img/ProtocolMechanics/emission_curve.png "Emission Curve")

The Bootstrapping curve has an aggressive reward per TVL slope to support new pools during their critical early phases. As a pool moves closer to maturity, these benefits are gradually tapered with pool performance driven by fees instead.

The initial TVL parameters are as follows:

| TVL     | PENDLE Emission (\<21 Days Since Launch) | PENDLE Emission (\>35 Days Since Launch) |
|---------|------------------------------------------|------------------------------------------|
| 0–2m    | 0–600                                    | 0                                        |
| 2–5m    | 600–1,500                                | 0                                        |
| 5–10m   | 1,500–2,000                              | 0–167                                    |
| 10–20m  | 2,000                                    | 167–500                                  |
| 20m+    | 2,000                                    | 500                                      |

### Renewed Pools
When a new maturity (‘Renewal Pool’) is launched for an existing pool (‘Maturing Pool’), the Renewal Pool benefits from the **Renewal TVL Curve** which overrides the default TVL curve. 

The Renewal Pools’ incentives are determined by:
1. Maturing Pool’s days-to-maturity
2. Renewal Pool’s TVL

There are 3 phases for the **Renewal TVL Curve**:
1. Pre-Maturity (\<14 days before the original pool matures)
2. Transitional (0-14 days after the original pool matures)
3. Post-Maturity (\>14 days after the original pool matures OR >14 days before the original pool matures)

Each phase applies different emissions levels based on the Renewal Pool’s TVL:

| TVL (Renewal Pool)    | PENDLE Emission (Pre-Maturity) | PENDLE Emission (Post-Maturity) |
|---------|------------------------------------------|------------------------------------------|
| 0–2m    | 0–200                                    | 0                                        |
| 2–5m    | 200–500                                | 0                                        |
| 5–10m   | 500–1,000                              | 0-167                                  |
| 10–20m  | 1,000-2,000                                    | 167–500                                  |
| 20m+    | 2,000                                    | 500                                      |

#### Example

![Renewal Emission](/img/ProtocolMechanics/renewal_emission.png "Renewal Emission")

*Assume the USDe pool is maturing soon, with the renewal pool (next closest maturity) having $10M TVL. Under ordinary circumstances, it would receive 2,000 PENDLE under the default TVL Curve (Bootstrapping)*.

*Since it is a renewal pool, it follows the Renewal TVL curve instead, determined by the maturing USDe pool’s day to maturity*:
- \<14 days pre-maturity -> 1,000 PENDLE
- 8 days post maturity -> 643 PENDLE
- \>14 days post-maturity -> 167 PENDLE

The objective is to calibrate incentives based on context. Renewal pools benefit from established liquidity and userbase, requiring less bootstrapping support than genuine new assets.

This allows the protocol to focus stronger incentives on new asset launches, while still supporting smooth rollovers for maturing pools

## Fee-Based Emission

Fee-based Emissions receives the remaining PENDLE balance that has not been paid out by the TVL substream.

*For example, if 30,000 PENDLE is paid out for TVL, 50,000 PENDLE is available to be distributed for fees.*

A pool’s share of **swap fees** determines their pro-rata share of the fee-based emission budget with a maximum cap of **four times** its 2-week recency weighted swap fees.

## Co-Incentive

Protocols can use External Incentive Campaigns to provide additional rewards to Pendle users. Participants are also eligible for co-incentives, where Pendle will match contributions up to a defined amount.

For every $1 contributed by the protocol, Pendle provides additional PENDLE of:
- $0.4 for external incentives provided as PENDLE
- $0.3 for external incentives provided as other tokens

A maximum budget of 9,000 PENDLE per epoch is allocated to co-incentives
