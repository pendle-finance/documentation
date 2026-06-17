# Boros x Futures Arbitrage

## The Core Idea

As established in the previous chapter, these positions are structurally equivalent:

1. Cash-and-carry trade via futures and 
2. Cash-and-carry trade via perpetuals + Boros

Both produce a delta-neutral position earning a fixed annualized yield. This equivalence creates a direct arbitrage opportunity whenever the two yields diverge materially.

The trade is straightforward: go long the cheaper fixed yield, short the more expensive one. Since both legs are delta-neutral independently, the combined position carries no directional BTC exposure, only exposure to the spread between the two rates converging.

## Mechanics

### Case 1: Futures basis > Boros implied APR

*Example: BTC quarterly futures at 8% APR premium. Boros implied APR at 3%.*

Short BTC futures and long BTC perp simultaneously. The opposing legs cancel out any directional price exposure. Then long YU on Boros to fix the 3% rate you are paying on the perp side.

Net yield: **8% - 3% = 5% APR**, with no directional BTC exposure.

### Case 2: Boros implied APR > Futures basis

*Example: Boros implied APR at 6%. BTC quarterly futures premium at 1.5%.*

Reverse the legs: short YU on Boros to receive the 6% implied APR, and short BTC perp + long BTC futures to pay the 1.5% futures basis. Again, the perp and futures legs offset each other directionally.

Net yield: 6**% - 1.5% = 4.5% APR**, delta-neutral.

## The Role of Leverage

<figure><img src="/boros-academy/imgs/image6.png" alt="" /><figcaption></figcaption></figure>

A 4% spread alone may not seem significant in isolation, but with reasonable leverage, the outlook shifts significantly.

Both futures platforms and Boros allow leveraged positions. If you run both legs at 5x leverage, a 4% spread on notional becomes approximately 20% APR on deployed capital, while remaining delta-neutral and fixed-rate.

| Leverage | Spread | Approx. return on capital |
| --- | --- | --- |
| 1x | 4% | 4% APR |
| 3x | 4% | ~12% APR |
| 5x | 4% | ~20% APR |
| 10x | 4% | ~40% APR |

Note: leverage on the futures and perp exchanges introduces liquidation risk on each leg if margin is insufficient. The entire position is delta-neutral, but the exchange only sees your futures or perp position individually. If BTC moves sharply before you can top up margin, the exchange may liquidate. Sizing margin conservatively relative to the leverage used is essential.

Note that the figures above are illustrative. Actual returns depend on each platform's margin requirements independently across all legs, and do not account for trading fees.

## Why the Spread Exists

The strategy requires no view on BTC price direction or funding rate movements, while returning a fixed yield. So why does the spread exist in the first place?

Crypto exchanges operate in silos and funding rate markets today are structurally inefficient. Boros enables this arbitrage and in doing so, pushes the broader market toward equilibrium.

In equilibrium, the two rates should trade close together, with any residual gap reflecting execution friction, liquidity, among other constraints.