---
hide_table_of_contents: true
---

# Incentives

The algorithmic incentive model is an automated merit-based reward system that allocates PENDLE emissions to pools based on their performance. Pools that excel across liquidity, swap fee, and co-incentive categories receive a higher share of rewards to recognize their contributions to the Pendle ecosystem.

The algorithmic incentive model has four reward streams:
- Performance: Automated emissions based on liquidity and swap fees
- Limit Order: Automated emissions based on Total TVL and recent volume
- Co-Incentives: Matching rewards for protocol-provided incentives
- Discretionary: Strategic allocations for high-potential pools

The maximum rewards per week across all streams is 90,000 PENDLE. Each pool may receive up to $2,500 and $1,250 in PENDLE rewards per week from the performance and limit order streams respectively. Any PENDLE not distributed in a given week is returned to the protocol treasury and does not roll over to the next week's budget.

## How Often Are Incentives Updated?​

Incentives are recalculated and updated every hour. When a new pool is whitelisted, it will begin receiving incentives within the next hour.

Individual components update on different schedules:
- Liquidity emissions: Continuously in real-time as TVL changes
- Fee emissions: Recalculated three times per week (Monday, Wednesday, Saturday)
- Limit order emissions: Continuously in real-time as TVL and volume changes.
- Co-incentives: Updated weekly on Wednesdays
- Discretionary: Updated weekly on Wednesdays

## Performance 

Performance-based emissions are adapted to support pools based on their expected needs throughout their lifecycle: newer pools are aggressively incentivized based on liquidity growth while mature pools are primarily incentivized based on swap fee performance.

![incentive timeline](/pendle-docs/imgs/ProtocolMechanics/incentive_timeline.png "Incentive Timeline")

Total performance rewards (from the fee curve and TVL curves) are capped at the lower of $3,000 or 2,500 PENDLE (in USD terms) per week

## Liquidity-Based Emissions

Pools receive PENDLE based on their weighted TVL which reflects:

    ```Math
    WeightedTVL = LP TVL + k x Floating TVL
    ```

Where k is currently set to 0.2. 

Weighted TVL determines a pool’s share of emissions depending on its phase which is defined by its days since launch.
Bootstrapping -> \<14 days since deployment
Growth -> 14-28 days since deployment
Mature -> 28 days since deployment


![Emission Curve](/pendle-docs/imgs/ProtocolMechanics/emission_curve.png "Emission Curve")

The Bootstrapping curve has an aggressive reward per liquidity slope to support new pools during their critical early phases. As a pool moves closer to maturity, these benefits are gradually tapered with pool performance driven by fees instead.

The initial liquidity parameters are as follows:

| Liquidity     | PENDLE Emission (\<14 Days Since Launch) | PENDLE Emission (\>28 Days Since Launch) |
|---------|------------------------------------------|------------------------------------------|
| 0–2m    | 0%–0.6%                                    | 0%                                        |
| 2–5m    | 0.6%–1.25%                                | 0%-0.1125%                                        |
| 5–10m   | 1.25%-1.5                             | 0.1125%-0.3%                                    |
| 10m  | 1.5%                                    | 0.3%                                  |

### Renewed Pools
When a new maturity (‘Renewal Pool’) is launched for an existing pool (‘Maturing Pool’) on the same chain, the Renewal Pool benefits from the **Renewal Liquidity Curve** which overrides the default Liquidity curve. 

The Renewal Pools’ incentives are determined by:
1. Maturing Pool’s days-to-maturity
2. Renewal Pool’s Liquidity

There are 3 phases for the **Renewal Liquidity Curve**:
1. Pre-Maturity (\<7 days before the original pool matures)
2. Transitional (0-7 days after the original pool matures)
3. Post-Maturity (\>7 days after the original pool matures OR >7 days before the original pool matures)

![Renewal Curve](/pendle-docs/imgs/ProtocolMechanics/renewal_curve.png "Renewal Curve")

Each phase applies different emissions levels based on the Renewal Pool’s Liquidity:

| Liquidity (Renewal Pool)    | PENDLE Emission (Pre-Maturity) | PENDLE Emission (Post-Maturity) |
|---------|------------------------------------------|------------------------------------------|
| 0–2m    | 0%–0.2%                                    | 0%                                        |
| 2–5m    | 0.2%–0.5%                                | 0%-0.1125%                                        |
| 5–10m   | 0.5%–1%                              | 0.1125%-0.3%                                  |
| 10m+  | 1%                                    | 0.3%                                  |

#### Example

![Renewal Emission](/pendle-docs/imgs/ProtocolMechanics/renewal_emission.png "Renewal Emission")

*Assume the USDe pool is maturing soon, with the renewal pool (next closest maturity) having $10M weighted TVL. Under ordinary circumstances, it would receive 1.5% emission share under the default Liquidity Curve (Bootstrapping)*.

*Since it is a renewal pool, it follows the Renewal liquidity curve instead, determined by the maturing USDe pool’s day to maturity*:
- \<7 days pre-maturity -> 1.0% emission share
- 4 days post maturity -> 0.471% emission share
- \>7 days post-maturity -> 0.3% emission share

The objective is to calibrate incentives based on context. Renewal pools benefit from established liquidity and userbase, requiring less bootstrapping support than genuine new assets.

This allows the protocol to focus stronger incentives on new asset launches, while still supporting smooth rollovers for maturing pools

## Fee-Based Emission

Pools receive PENDLE based on their fee performance. The incentive rate is determined by the pool’s weighted TVL tier which enables smaller pools to receive more rewards for strong performance.

| Weighted TVL | Incentive Rate |
|---|---|
| \<2m    | 2       |
| 2–5m    | 1–2     |
| 5–10m   | 0.5–1   |
| \>10m   | 0.5     |

Linear interpolation is used to define the incentive rate for pools that sit within a weighted TVL range. After 28 days post-launch, all pools revert to a baseline incentive rate of 0.5.

Fee-based Emissions have a weekly budget of 40,000 PENDLE.

### Eligibility and Fee Measurement​

**Eligibility**: Pools must be at least 2 days old to receive fee-based emissions. Newer pools can still receive liquidity-based emissions and other incentives.
**Fee Calculation**: Fee performance uses a recency-weighted methodology that emphasizes recent activity:
- For pools older than 14 days: Fee performance number updates every snapshot with the fees 7 day before last snapshot weighted at 2x and the earlier 7 days weighted at 1x
- For younger pools: Special calculations account for limited trading history

## Limit Order Emissions

Pools receive Limit Order (LO) rewards based on their total TVL and recent swap volume with a per pool cap of $1,250 per week. Incentives are distributed to LOs within a 4% range of the current IY on a time and notional value weighted basis.

### Target Depth

Each pool targets a baseline of 10% of its total TVL in orderbook depth with potential to grow to 15% of total TVL based on its 4 day recency adjusted swap volume (4D-RASW).

For example, a pool with $10m total TVL will target $500k in orderbook depth as a baseline but may be adjusted based on 4D-RASW.
- $400k 4D-RASW → $500k target depth (4D-RASW \< Target Depth)
- $1m 4D-RASW → $750k target depth (4D-RASW \> Target Depth)
- $2m 4D-RASW → $1.5m target depth (4D-RASW \> Depth Cap)

### Decay-Adjusted Target Depth
A pool’s target depth may be adjusted to reflect its days to maturity (DTM). The decay rate initializes at 25% for pools with DTM \> 120 and decreases to 0% for pools with DTM \< 60.

For example, the decay-adjusted target depth for pools with $1m target depth with varying DTM is outlined as follows:
- 120 DTM → $750k decay-adjusted target depth
- 90 DTM → $875k decay-adjusted target depth
- 60 DTM → $600k decay-adjusted target depth

### Target Incentives
The decay-adjusted target depth is used to determine the actual incentives allocated to a pool based on a target LO APR of 50%. This is based on notional value which is derived by multiplying target depth by YT/USD.

For example, given a decay-adjusted target depth of \$1m, YT/USD of \$0.02, and target APR of 50%, a pool would receive $192 in weekly PENDLE incentives.


## Co-Incentive

Protocols can use External Incentive Campaigns to provide additional rewards to Pendle users. Participants are also eligible for co-incentives, where Pendle will match contributions up to a defined amount.

For every $1 contributed by the protocol, Pendle provides additional PENDLE of:
- $0.22 for external incentives provided as PENDLE
- $0.15 for external incentives provided as other tokens

**How Matching Works​**
- Protocols submit incentives weekly (Wednesdays) through External Incentive Campaigns
- Token values are calculated using 7-day moving average prices for both the contributed token and PENDLE
- Protocols receive their guaranteed match rate for that week
- Maximum co-incentive budget: 9,000 PENDLE per week

## Discretionary

Up to 15% of the maximum weekly emissions may be used for discretionary allocations which are primarily targeted towards pools with high growth potential.
