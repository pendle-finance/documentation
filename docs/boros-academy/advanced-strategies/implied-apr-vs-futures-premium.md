import Hint from '@site/src/components/Hint';

# Implied APR vs Futures Premium

## Crypto Futures Premium

A futures contract is a standardised agreement to buy or sell an underlying asset at a predetermined price on a specified maturity date. Crypto futures contracts have historically traded at a premium to spot (a.k.a. contango) with the basis (the price difference between futures vs spot price) converging to zero at expiry as the contract approaches settlement, in other words, futures prices will converge to its spot value at maturity.

This premium can be captured through a **cash-and-carry trade** (commonly called a basis trade): 

1. Long spot position while simultaneously:
2. Short the futures contract of equivalent notional size. 

The resulting position is delta-neutral and earns the futures premium as a fixed yield, locked in at the time of trade entry and held to contract maturity.

<figure><img src="/boros-academy/imgs/image4.png" alt="" /><figcaption></figcaption></figure>

For example: if BTC quarterly futures are trading at an 8% annualised premium to spot, a trader long 1 BTC spot and short 1 BTC equivalent of futures will earn approximately 8% APR with no directional exposure, provided the position is held to maturity.

## Constructing a Futures Equivalent Position via Boros

An analogous carry strategy can be executed using perpetual contracts rather than fixed-maturity futures. Here, the investor holds a long spot position while shorting the perpetual contract of the same notional, effectively receiving the funding rate as a yield stream so long as funding remains positive. Unlike the fixed-maturity basis trade, however, perpetual carry is inherently floating: funding rates can be volatile, and there is no contractual guarantee of yield over any given horizon.

This variability can be addressed through Boros. As covered in the preceding chapter, a trader executing a perpetual carry strategy can short the equivalent notional in YU on Boros, converting their floating funding rate receivable into a fixed yield at the **implied APR** prevailing at the time of entry, replicating the fixed return and fixed term profile of a traditional futures basis trade, but through the perpetuals market and Boros.

## Implied APR as a Benchmark for Futures Premium

The two strategies outlined above share a materially identical risk-return profile:

| Strategy | Mechanism | Yield Type |
| --- | --- | --- |
| Futures cash-and-carry | Long spot + short fixed-maturity futures | Fixed (locked to futures premium at entry) |
| Perpetual carry + Boros | Long spot + short perp + short YU on Boros | Fixed (locked to Boros implied APR at entry) |

Both achieve delta-neutral exposure and fixed yields over a defined horizon. Given this structural equivalence, crypto futures premium and Boros implied APR should, in equilibrium, be closely correlated.

<figure><img src="/boros-academy/imgs/image5.png" alt="" /><figcaption></figcaption></figure>

This convergence dynamic implies an important arbitrage relationship: where a material disparity exists between the implied APR on Boros and the annualised futures premium for the same underlying asset, rational carry traders will migrate capital toward the more attractive fixed yield and unwind the less favourable position. This flow should exert pressure that compresses the spread over time.

In this sense, **futures premium serves as a natural market benchmark for Boros implied APR** and divergences between the two represent a potential opportunity for basis arbitrageurs operating across both venues.