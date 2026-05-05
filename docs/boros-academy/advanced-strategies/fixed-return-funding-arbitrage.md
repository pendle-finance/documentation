import Hint from '@site/src/components/Hint';

# Fixed Return Funding Arbitrage

**Can you get delta-neutral, fixed yield between two perp markets?**

Before Boros, this trade was fraught with risks from funding rate volatility. Now, it’s a viable, repeatable yield strategy.

## How it works

Because platforms have different liquidity, trader flows, market sentiment, and risk models, perp funding rates often do not move in sync. For example, Binance settles on an 8-hour basis, while Hyperliquid settles hourly. These structural differences between platforms can create persistent opportunities to arbitrage the spread between funding rates.

## Traditional naked arbitrage (without Boros)

The classic approach is simple on paper: take opposite perp positions on two exchanges to capture the difference in funding rates.

**But in practice, it is operationally heavy.**

**Example:**

<Hint style="info">
Funding rate for BTC on Exchange A → +5% APR (Long)

Funding rate for BTC on Exchange B → +25% APR (Short)

Short Exchange B, Long Exchange A: 25% - 5% = receive 20% APR
</Hint>

**This trade comes with “hidden” complications:**

* Traders need margin on multiple exchanges and must constantly monitor the gap between rates to know when to unwind the trade profitably.
* **During volatile market conditions, accounts may need to be rebalanced and adjusted accordingly, and liquidation risks increase.**
* Shifts in funding rates can be sudden and volatile, leading to reduced yield and potential losses if rates change.

**But with Boros, this trade becomes a stable, fixed-yield trade with zero directional exposure.**

## Using Boros for Funding Rate Arbitrage

By pairing YUs with this funding rate arbitrage, the risks above are reduced significantly.

Instead, traders can compare the spread between the implied APRs of two perp markets and use it to earn fixed yield between perp platforms.

<figure><img src="/boros-academy/imgs/fixed-arb-illustration.png" alt="" /><figcaption></figcaption></figure>

<Hint style="info">
Long Perp + Long YU = Pay Fixed Funding

Short Perp + Short YU = Receive Fixed Funding

**Difference between YU Implied APR = Your Fixed Funding**
</Hint>

**Let’s map this out with an example.**

Assume you are trying to arbitrage the spread between BTC rates on Hyperliquid and BTC rates on Binance.

1. Short Hyperliquid BTC rates (on Boros)
2. Short BTC on Hyperliquid
3. Long Binance BTC rates (on Boros)
4. Long BTC on Binance

- A + B = Receive fixed funding on BTC on Hyperliquid
- C + D = Pay fixed funding on BTC on Binance
- B + D = Delta-neutral on BTC

**A + B + C + D = Receive the fixed funding between Hyperliquid and Binance with no exposure to BTC price movements or funding rate volatility.**

## The Benefits of this Strategy

Executing this arbitrage with Boros comes with significant benefits, such as:

* **Funding rate volatility risk is eliminated.** Traders do not need to worry about swings in funding rates, only their implied APR entry on Boros.
* **Fixed-yield strategy.** When funding rates between platforms diverge, Boros allows traders to take advantage of a time-sensitive arbitrage and farm its yield until market maturity.
* **Longer-duration arbitrage (more potential yield).** With the removal of rate volatility, this arbitrage can be executed for longer time periods, allowing traders to capture a larger share of the available yield.
* **Negative funding ceases to be an issue.** Previously, traders executing this arbitrage had to unwind positions when rates went negative.
* **Delta-neutral exposure while farming yield.** Directional price risk is non-existent on this trade, due to being delta-neutral. Boros unlocks yield farming from discrepancies between perp funding rates.

## Using the Boros Strategy Dashboard

The Boros Strategy Dashboard makes spotting arbitrage opportunities and executing them quick and easy.

The dashboard highlights currently available arbitrage opportunities, and the possible fixed yields with Boros.

[Simply load up the dashboard](https://boros.pendle.finance/strategy), select the arbitrage you would like to set up, and follow the steps to unlock fixed yield.

Note: The possible yield from this arbitrage is determined by your leverage on the perp side of the trade. As such, adjust perp leverage in the strategy calculator according to your risk appetite.

**For a detailed overview of this strategy, and the average returns from it on BTC and ETH, check out our [in-depth report here](https://x.com/boros_fi/status/2001831621817962761).**
