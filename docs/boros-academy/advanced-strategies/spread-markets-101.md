import Hint from '@site/src/components/Hint';

# Spread Markets 101

## What is a spread market?

Spread markets are a separate category from funding markets. They let you trade the difference between two funding rates with a single position.

**For example:** ETH Spread HL-Gate is the Boros spread market for the difference between ETH funding rates on Hyperliquid and Gate.

<figure><img src="/boros-academy/imgs/spread-markets-trading-the-gap.png" alt="How do Spread Markets work? ETH 30-day block average funding rate on Hyperliquid and Gate, with the spread between them shaded" /><figcaption></figcaption></figure>

**Thus, underlying APR = HL ETH funding − Gate ETH funding**

**1 YU = the funding rate spread between HL and Gate on 1 ETH**

<Hint style="info">
During periods of market volatility, the underlying APR of a spread can flip negative.
</Hint>

Trading spread markets works the same way as trading any other Boros market. Longs bet that the underlying rate will average higher than the implied APR of their entry. Shorts bet that it will average lower. In a spread market, a long YU position bets that the average funding rate spread will be higher than the implied APR at entry.

*Note: implied APR works on spread markets just like it does on [funding markets](../the-basics/chapter-2-implied-apr-and-underlying-apr).*

## Short spread for fixed yield arbitrage

Pairing a short spread on Boros with an equivalent perp position (short perp A, long perp B) gives you fixed yield arbitrage on the spread.

**This is [Fixed Return Funding Arbitrage](fixed-return-funding-arbitrage), with the two Boros legs combined into one position.**

**3 simple steps:**

1. Short the spread market on Boros. This locks in the implied APR as your yield receivable, while you pay the floating spread.
2. Short perp A and long perp B for the equivalent notional on the two perp markets. This creates a delta-neutral position that earns the perp spread.
3. The floating spreads cancel out: the perp spread you earn pays the floating spread you owe on Boros.

**Result: you collect your implied APR as fixed yield until maturity.**

<figure><img src="/boros-academy/imgs/short-spread-arbitrage-diagram.png" alt="Short spread arbitrage: perp positions on Exchange A and Exchange B, with a short spread position on Boros receiving the implied APR as a fixed funding rate" /><figcaption></figcaption></figure>

## Long spread

**Spread markets give longs a structural edge that funding markets don't.**

**Spread shorters are largely indifferent to rate movements.** They short the spread market to turn their perp spread into a fixed yield arbitrage, so *the price they pay is mostly secondary.*

As a result, implied spreads face constant short pressure, and longs can benefit from taking the other side of the book.

Longs held until maturity capture the difference between the implied spread and the underlying spread. **The more the implied spread is shorted below the underlying spread, the more longs can profit.** The bigger the gap, the more yield you earn from holding the long spread position.

Arbitrageurs short spreads to lock in fixed yield on their perp spreads. By longing the spread, you collect the difference between the implied and underlying spreads.

To see how longing spreads also works as a mean reversion trade, backed by historical data, read [this thread](https://x.com/gabavineb/status/2102389618394223006).

## The PvE nature of spread markets

Both sides benefit from the trade, which makes spread markets a positive-sum (player-versus-environment, or PvE) yield opportunity on Boros. Arbitrageurs use the fixed yield mechanism of spread markets to lock in high fixed yields. Longs capture the difference between compressed implied spreads and the underlying rates.

Longs and shorts help each other's positions. The more a spread market is shorted, the more potential gain there is for spread longers. The more longs push up implied spreads, the higher the yield shorts can earn from their arbitrage.

<figure><img src="/boros-academy/imgs/spread-markets-how-everyone-wins.png" alt="Spread Markets: How Everyone Wins. A four-step flywheel: arbitrageurs short the spread to lock in fixed yield, longs buy the compressed spread as it reverts, arbitrageurs re-short the wider spread at larger size, and longs buy the compressed spread again" /><figcaption></figcaption></figure>

For the full mechanics of spread markets, including settlement and margin, see [Spread Markets](/boros-docs/about-boros/spread-markets) in the docs.
