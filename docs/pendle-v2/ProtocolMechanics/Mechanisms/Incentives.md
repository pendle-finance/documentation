---
hide_table_of_contents: true
---

# Incentives

The algorithmic incentive model is an automated merit-based reward system that allocates PENDLE emissions to pools based on their performance. Pools that excel across liquidity, swap fee, and co-incentive categories receive a higher share of rewards to recognize their contributions to the Pendle ecosystem.

The algorithmic incentive model has three reward streams:
- Performance: Automated emissions based on liquidity and swap fees
- Co-Incentives: Matching rewards for protocol-provided incentives
- Discretionary: Strategic allocations for high-potential pools

The maximum rewards per week across all streams is 90,000 PENDLE. Each pool may receive up to 7.5% of total emissions (6,750 PENDLE) from the Performance stream specifically, though total rewards can exceed this when co-incentives and discretionary allocations are included. Any PENDLE not distributed in a given week is returned to the protocol treasury and does not roll over to the next week's budget.

## How Often Are Incentives Updated?​

Incentives are recalculated and updated every hour. When a new pool is whitelisted, it will begin receiving incentives within the next hour.

Individual components update on different schedules:
- Liquidity emissions: Continuously in real-time as TVL changes
- Fee emissions: Recalculated three times per week (Monday, Wednesday, Saturday)
- Co-incentives: Updated weekly on Wednesdays
- Discretionary: Updated weekly on Wednesdays

## Performance 

Performance-based emissions are adapted to support pools based on their expected needs throughout their lifecycle: newer pools are aggressively incentivized based on liquidity growth while mature pools are primarily incentivized based on swap fee performance.

![incentive timeline](/img/ProtocolMechanics/incentive_timeline.png "Incentive Timeline")

The performance-basexd emission streams may receive up to the maximum weekly reward rate less emissions consumed by the co-incentive and discretionary streams.

## Liquidity-Based Emissions

Pools receive PENDLE based on their LP liquidity and time since deployment and is split into three phases:
1. Bootstrapping -> \<21 days since deployment
2. Growth -> 21-35 days since deployment
3. Mature -> 35 days since deployment

![Emission Curve](/img/ProtocolMechanics/emission_curve.png "Emission Curve")

The Bootstrapping curve has an aggressive reward per liquidity slope to support new pools during their critical early phases. As a pool moves closer to maturity, these benefits are gradually tapered with pool performance driven by fees instead.

The initial liquidity parameters are as follows:

| Liquidity     | PENDLE Emission (\<21 Days Since Launch) | PENDLE Emission (\>35 Days Since Launch) |
|---------|------------------------------------------|------------------------------------------|
| 0–2m    | 0%–0.6%                                    | 0%                                        |
| 2–5m    | 0.6%–1.5%                                | 0%                                        |
| 5–10m   | 1.5%–2%                              | 0%-0.167%                                    |
| 10–20m  | 2%                                    | 0.167%-0.5%                                  |
| 20m+    | 2%                                    | 0.5%                                      |

### Renewed Pools
When a new maturity (‘Renewal Pool’) is launched for an existing pool (‘Maturing Pool’) on the same chain, the Renewal Pool benefits from the **Renewal Liquidity Curve** which overrides the default Liquidity curve. 

The Renewal Pools’ incentives are determined by:
1. Maturing Pool’s days-to-maturity
2. Renewal Pool’s Liquidity

There are 3 phases for the **Renewal Liquidity Curve**:
1. Pre-Maturity (\<14 days before the original pool matures)
2. Transitional (0-14 days after the original pool matures)
3. Post-Maturity (\>14 days after the original pool matures OR >14 days before the original pool matures)

![Renewal Curve](/img/ProtocolMechanics/renewal_curve.png "Renewal Curve")

Each phase applies different emissions levels based on the Renewal Pool’s Liquidity:

| Liquidity (Renewal Pool)    | PENDLE Emission (Pre-Maturity) | PENDLE Emission (Post-Maturity) |
|---------|------------------------------------------|------------------------------------------|
| 0–2m    | 0%–0.2%                                    | 0%                                        |
| 2–5m    | 0.2%–0.5%                                | 0%                                        |
| 5–10m   | 0.5%–1%                              | 0%-0.167%                                  |
| 10–20m  | 1%-2%                                    | 0.167%–0.5%                                  |
| 20m+    | 2%                                    | 0.5%                                      |

#### Example

![Renewal Emission](/img/ProtocolMechanics/renewal_emission.png "Renewal Emission")

*Assume the USDe pool is maturing soon, with the renewal pool (next closest maturity) having $10M liquidity. Under ordinary circumstances, it would receive 2.0% emission share under the default Liquidity Curve (Bootstrapping)*.

*Since it is a renewal pool, it follows the Renewal liquidity curve instead, determined by the maturing USDe pool’s day to maturity*:
- \<14 days pre-maturity -> 1.0% emission share
- 8 days post maturity -> 0.643% emission share
- \>14 days post-maturity -> 0.167% emission share

The objective is to calibrate incentives based on context. Renewal pools benefit from established liquidity and userbase, requiring less bootstrapping support than genuine new assets.

This allows the protocol to focus stronger incentives on new asset launches, while still supporting smooth rollovers for maturing pools

## Fee-Based Emission

Fee-based Emissions receives the remaining PENDLE balance that has not been paid out by the liquidity substream.

*For example, if 30,000 PENDLE is paid out for liquidity, 50,000 PENDLE is available to be distributed for fees.*

A pool’s share of **total swap fees** determines their pro-rata share of the fee-based emission budget with a maximum cap of **four times** its fee performance from this stream.

### Eligibility and Fee Measurement​

**Eligibility**: Pools must be at least 2 days old to receive fee-based emissions. Newer pools can still receive liquidity-based emissions and other incentives.
**Fee Calculation**: Fee performance uses a recency-weighted methodology that emphasizes recent activity:
- For pools older than 14 days: Uses a 2-week recency-weighted average with the most recent 7 days weighted 2x and the previous 7 days weighted 1x
- For younger pools: Special calculations account for limited trading history

## Co-Incentive

Protocols can use External Incentive Campaigns to provide additional rewards to Pendle users. Participants are also eligible for co-incentives, where Pendle will match contributions up to a defined amount.

For every $1 contributed by the protocol, Pendle provides additional PENDLE of:
- $0.4 for external incentives provided as PENDLE
- $0.3 for external incentives provided as other tokens

**How Matching Works​**
- Protocols submit incentives weekly (Wednesdays) through External Incentive Campaigns
- Token values are calculated using 7-day moving average prices for both the contributed token and PENDLE
- Protocols receive their guaranteed match rate for that week
- Maximum co-incentive budget: 9,000 PENDLE per week

## Discretionary

Up to 15% of the maximum weekly emissions may be used for discretionary allocations which are primarily targeted towards pools with high growth potential.
