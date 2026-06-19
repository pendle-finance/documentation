# Incentives

Boros runs two distinct incentive programs: one for resting limit orders that provide liquidity within a defined rate boundary, and one that returns a portion of taker fees to the makers those takers fill against.

## Limit Order Incentives

Boros distributes weekly PENDLE incentives to users who place limit orders that rest in the order book and are subsequently filled by takers. The goal is to encourage organic liquidity provision across markets.

### Eligibility

A limit order qualifies for incentives when:

- It is placed as a **maker order,** meaning it rests in the order book rather than filling immediately on placement.
- The order rate falls **within the incentive boundary** for that market (see below).

Limit orders that match immediately upon placement are treated as taker orders and do not qualify.

### Incentive Boundary

Each market defines an incentive boundary, a rate range around the current mid rate within which resting limit orders must sit to qualify. Orders placed outside this boundary do not earn incentives.

The boundary is market-specific and dynamic. It is set asymmetrically when there is a liquidity imbalance between the long and short sides of the book: the thinner side receives a wider boundary and proportionally higher rewards, creating a directional incentive to fill liquidity gaps. The specific boundary for each market is queryable via the Boros API.

### Reward Calculation

Incentives are allocated weekly per market. Each user's share is determined by their contribution to total maker contribution within the epoch:

Incentives are denominated in PENDLE. The weekly allocation per market is set by Boros and may be adjusted based on market activity and growth targets.


## Maker Incentive

When a maker limit order is filled by a taker, the maker receives **20% of the taker fee** paid on that trade as a rebate, distributed weekly.

### How It Works

Takers pay a swap fee on every fill. The fee is calculated as:

`Taker fee = Fee rate × Notional (in YU) × Time to maturity (in years)`

Of that fee, 20% is passed to the maker whose order was filled. The remaining 80% is retained by the protocol.

### Notes

- The incentive applies to any filled maker limit order, regardless of whether that order also qualifies for the limit order incentive program above.
- The incentive is credited in the same collateral asset used to settle the trade.
- Makers already benefit from 0% fees on their own order placement; the 20% incentive is additive on top of this.


## Distribution

Incentive epochs run weekly from Friday 00:00 to Friday 00:00 UTC. At the close of each epoch, each eligible user's share is calculated based on their sizes recorded during that window.

Distribution is completed by Monday 23:59 UTC at the latest. Before any distribution is processed, the team reviews activity from the epoch to verify that all qualifying volume is legitimate. Boros reserves the right to withhold or adjust distributions where activity is flagged as manipulative or otherwise in bad faith.