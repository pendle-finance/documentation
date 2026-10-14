import Hint from '@site/src/components/Hint';

# Spread Markets

On a given day, BTC funding might be 10% APR on Hyperliquid and 7% APR on Gate. That 3% gap is a rate in its own right. It moves, and it can be forecast. A **Spread Market** lets you trade that gap directly, as a single position.

A Spread Market is a Boros market whose underlying rate is the difference between two funding rates on the same asset:

> **Underlying APR = Funding Rate of Exchange A − Funding Rate of Exchange B**

Each side of the spread is called a **leg**. The leg order is fixed by the market, and the market name shows it. In **BTC Spread HL-Gate**, Hyperliquid is leg A and Gate is leg B, so the underlying is Hyperliquid BTC funding minus Gate BTC funding. Leg A is usually the venue with the historically higher funding rate, so the spread is usually positive.

Apart from the underlying rate, a Spread Market is an ordinary Boros market. Implied APR, fixed APR, the order book, margin, liquidation, PnL and fees all work exactly as they do on a [Funding Market](./market-types#funding-markets).

## Long and Short the Spread

Each YU in a Spread Market represents the spread earned on 1 unit of collateral. In BTC Spread HL-Gate, 1 YU is the spread on 1 BTC of notional on both venues.

### Long the Spread

**Pay the fixed spread, receive the floating spread.**

A long spread position profits when:

1. The underlying spread is wider than your fixed APR (positive settlement cash flows)
2. The implied spread rises after entry (unrealised PnL improves)

Go long if you expect leg A's funding to pull further ahead of leg B's.

### Short the Spread

**Receive the fixed spread, pay the floating spread.**

A short spread position profits when:

1. The underlying spread is narrower than your fixed APR (positive settlement cash flows)
2. The implied spread falls after entry (unrealised PnL improves)

Go short if you expect the gap to close, or to lock in today's gap as a fixed rate. Locking in the gap is the cross-exchange arbitrage trade (see [below](#spread-markets-and-funding-rate-arbitrage)).

## Example

You short 10 YU of BTC Spread HL-Gate at an implied APR of 4%. That 4% becomes your fixed APR.

The market settles every 8 hours (see [Settlement](#settlement)). Over the next 8-hour period, Hyperliquid BTC funding averages 10% APR and Gate BTC funding is 7% APR. The underlying spread for that period is therefore 3%.

> Settlement = 10 BTC × (4% − 3%) × 8 / (24 × 365) ≈ 0.0000913 BTC

You received 4% and paid 3% on 10 BTC of notional for 8 hours, so your collateral increases by about 0.0000913 BTC. A long position at the same fixed rate would have paid this amount.

If the spread instead widened to 6% for the period, the same short position would pay 10 × (6% − 4%) × 8/8760 ≈ 0.000183 BTC.

## Negative Spreads

The underlying spread can turn negative when leg B's funding rises above leg A's. The settlement formula does not change. A negative spread is simply a low floating rate:

- A **short** position at a 4% fixed APR during a −3% period receives 4% − (−3%) = **7%** for that period
- A **long** position at the same fixed APR pays 7% for that period

The implied APR can also trade below zero if the market expects leg B to stay ahead. Margin is calculated on the *absolute* mark rate, so a market trading at −5% requires the same margin as one trading at +5%. See [Margin & Liquidations](../boros-systems/margin-and-liquidations#initial-margin).

## Settlement

The two legs of a spread often settle funding on different schedules. For example, Hyperliquid settles every hour and Gate every 8 hours. A Spread Market settles on the cadence of the **less frequent** of the two legs.

At each settlement:

- The less frequent leg contributes its funding rate for the period
- The more frequent leg contributes the **average** of its funding rates since the last Spread Market settlement
- The underlying spread for the period is leg A − leg B. It is cash-settled against your fixed APR, as on any other market.

In BTC Spread HL-Gate, the market settles every 8 hours. Over each 8-hour window, Hyperliquid's hourly funding prints are averaged and Gate's 8-hour rate is subtracted from that average.

If either exchange changes its funding interval, the Spread Market still settles on the less frequent leg's interval.

Both legs use the existing funding rate oracle feeds. See [Rate Settlement](./rate-settlement#the-underlying-rate-oracle) for how those feeds are validated.

## What Stays the Same

A Spread Market reuses every Boros system. Spread positions follow the same rules as any other position:

- **[Implied APR and position sizing](./implied-apr-and-position-sizing)**: rate sensitivity, buffer and daily volatility are calculated the same way
- **[Order book](../boros-systems/orderbook)**: market and limit orders, matching priority and rate bounds
- **[Margin & Liquidations](../boros-systems/margin-and-liquidations)**: one initial margin, one maintenance margin and one liquidation implied APR per position, in cross or isolated mode
- **[Fees](../boros-systems/fees)**: taker, settlement, market entrance and liquidation fees
- **[Protective Mechanisms](../boros-systems/protective-mechanism)**: purging, force-cancellation, ADL and market modes
- **[Maturity](./rate-settlement#how-settlement-affects-margin)**: settlements stop, margin is released, and collateral reflects every settlement over the position's life

## Spread Markets vs Two Funding Market Positions

Before Spread Markets, the only way to hold a spread on Boros was to open two [Funding Market](./market-types#funding-markets) positions. You would go short YU on leg A's market and long YU on leg B's. You can still do this, and it is the only option for venue pairs or maturities without a Spread Market.

| | Spread Market | Two Funding Market positions |
| --- | --- | --- |
| Positions | 1 | 2 |
| Margin requirement | 1 | 2, one per leg |
| Liquidation implied APR | 1, on the spread | 2, one per leg, each moving with its own rate |
| Execution | 1 order | 2 orders, and a limit order on one leg can fill without the other |
| Settlement | One cadence, the slower leg's | Each leg settles on its own exchange's cadence |
| Availability | Listed pairs and maturities only | Any two markets that share a collateral and maturity |

<Hint style="info">
With two Funding Market positions, each leg can be liquidated on its own move, even when the spread between them has barely changed. A Spread Market margins and liquidates the spread itself, so only a move in the spread can liquidate the position.
</Hint>

## Spread Markets and Funding Rate Arbitrage

When funding differs between two venues, the classic arbitrage is to short the perp on the higher-funding venue and long the perp on the lower-funding venue. The trade collects the gap without any price exposure. The gap is floating, though, and it can close or flip at any time.

Shorting the matching Spread Market fixes it:

- **Short 10 BTC perp** on Hyperliquid: receive Hyperliquid funding
- **Long 10 BTC perp** on Gate: pay Gate funding
- **Short 10 YU** of BTC Spread HL-Gate at 4%: pay (Hyperliquid − Gate) funding, receive 4% fixed

The floating funding on the perps cancels the floating spread paid on Boros. You are left with a fixed **4% APR** on 10 BTC of notional until maturity, with no price exposure. The trade has three legs and one Boros position.

[Arbitrage with CrossEx](../arbitrage-with-crossex/overview) runs this trade from a single dashboard, with the perp legs held on Gate CrossEx.

<Hint style="warning">
The Spread Market's settlement cadence may differ from the perp legs' funding cadence. The floating amounts on each side therefore net out over each settlement period rather than at every funding print. Your locked rate is unaffected.
</Hint>
