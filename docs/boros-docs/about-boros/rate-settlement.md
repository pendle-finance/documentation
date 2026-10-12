# Rate Settlement

## How Boros Positions Work

Every position on Boros is an interest rate swap: you exchange one rate stream for another until maturity. One side is fixed. The other is the market's floating underlying rate, which is a single funding rate on a Funding Market or the spread between two funding rates on a [Spread Market](./spread-markets).

- **Long (Pay Fixed, Receive Floating):** You lock in a fixed APR at entry and receive the underlying floating rate at each settlement. You profit when the floating rate exceeds your fixed rate.
- **Short (Pay Floating, Receive Fixed):** You receive your locked-in fixed APR and pay the underlying floating rate at each settlement. You profit when the floating rate stays below your fixed rate.

![FR Settlement](/boros-docs/imgs/image2.png "FR Settlement")

Your fixed APR is set at the moment your order fills. It is the average implied APR of the filled order.

## Periodic Settlement

At each settlement interval, Boros reads the underlying rate from its oracle and realises the net difference between the floating and fixed rate into your collateral.

Settlement intervals follow the underlying market:

| Market type | Settlement interval |
| --- | --- |
| Funding Market, Binance | Every 8 hours |
| Funding Market, Hyperliquid | Every 1 hour |
| Spread Market | The interval of the less frequent leg, e.g. every 8 hours for BTC Spread HL-Gate. The more frequent leg contributes the average of its rates since the last settlement. See [Spread Markets](./spread-markets#settlement). |

The net cash flow per settlement:

> **Long:** Settlement = Position Size × (Floating Rate − Fixed Rate) × Settlement Period
> **Short:** Settlement = Position Size × (Fixed Rate − Floating Rate) × Settlement Period

A positive result is added to your collateral and a negative result is deducted from it.

## How Settlement Affects Margin

Each settlement period, two things happen:

1. **Collateral changes** by the net rate differential (positive or negative).
2. **Margin requirement declines** as time to maturity shrinks. The remaining yield stream is smaller, so less margin is required to hold the same position size.

A position that is persistently out of the money will see collateral eroded each period. If sustained, this can push a position toward liquidation even without any change in the mark rate.

At maturity, rate sensitivity reaches zero, all margin is freed, and collateral reflects the cumulative net of every settlement over the position's life.

## The Underlying Rate Oracle

The underlying rate used in each settlement is sourced independently and is never derived from Boros's own order book. The pipeline:

1. An off-chain bot fetches the actual funding rate from the relevant CEX or perp DEX at each epoch boundary
2. The rate is submitted to a **FundingRateVerifier**, validated against one of three independent oracle sources (Chainlink Data Streams, ChaosLabs Risk Oracle, or Pendle's oracle)
3. Once validated, it is forwarded to the **FIndex Oracle**, which accumulates it into a cumulative index that the market reads at settlement

A Spread Market does not have a separate oracle. It reads the existing validated feeds of its two legs and settles their difference.

Every submitted rate is validated for correct sequencing, so **no rate settlement can be skipped**. If the bot misses an update window, a short grace period allows catch-up. After that, a manual admin override merges the missed epochs into the next valid update.
