# Funding Rate Settlement

## How Boros Positions Work

Every position on Boros is an interest rate swap: you exchange one interest stream for another until maturity.

- **Long (Pay Fixed, Receive Floating):** You lock in a fixed APR at entry and receive the underlying floating rate at each settlement. You profit when the floating rate exceeds your fixed rate.
- **Short (Pay Floating, Receive Fixed):** You receive your locked-in fixed APR and pay the underlying floating rate at each settlement. You profit when the floating rate stays below your fixed rate.

![FR Settlement](/boros-docs/imgs/image2.png "FR Settlement")

Your fixed APR is set at the moment your order fills. It is the average implied APR of the filled order.

## Periodic Settlement

A settlement occurs when the underlying exchange charges its funding rate payments. At each settlement interval, Boros fetches the actual underlying funding rate from its oracle and realises the net difference between the floating and fixed rate into your collateral.

Settlement intervals mirror the underlying market:

- **Binance markets:** every 8 hours
- **Hyperliquid markets:** every 1 hour

The net cash flow per settlement:

> **Long:** Settlement = Position Size × (Floating Rate − Fixed Rate) × Settlement Period
> **Short:** Settlement = Position Size × (Fixed Rate − Floating Rate) × Settlement Period

A positive / negative result adds / reduces to your collateral respectively.

## How Settlement Affects Margin

Each settlement period, two things happen:

1. **Collateral changes** by the net rate differential (positive or negative).
2. **Margin requirement declines** as time to maturity shrinks. The remaining yield stream is smaller, so less margin is required to hold the same position size.

A position that is persistently out of the money will see collateral eroded each period. If sustained, this can push a position toward liquidation even without any change in the mark rate.

At maturity, rate sensitivity reaches zero, all margin is freed, and collateral reflects the cumulative net of every settlement over the position's life.

## The Underlying Rate Oracle

The underlying rate used in each settlement is sourced independently, not derived from Boros's order book. The pipeline:

1. An off-chain bot fetches the actual funding rate from the relevant CEX / perp DEX at each epoch boundary
2. The rate is submitted to a **FundingRateVerifier**, validated against one of three independent oracle sources (Chainlink Data Streams, ChaosLabs Risk Oracle, or Pendle's oracle)
3. Once validated, it is forwarded to the **FIndex Oracle**, which accumulates it into a cumulative index that the market reads at settlement

Every submitted rate is validated for correct sequencing, **no funding rate settlement can be skipped**. If the bot misses an update window, a short grace period allows catch-up; after that, a manual admin override merges the missed epochs into the next valid update.