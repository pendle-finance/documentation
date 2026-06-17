import Hint from '@site/src/components/Hint';

# Chapter 0 - Understanding Funding Rates

<iframe height="400" width="100%" src="https://www.youtube.com/embed/u918Tj7S0Ug" title="Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

## What are funding rates?

Funding rate is an essential part of perpetual markets such as Binance Futures and Hyperliquid.

They act as a mechanism to ensure that the price of a perpetual contract stays anchored to the actual market price (i.e. price on the spot market).

Funding rates achieve this balance by establishing periodic payments made between traders with long and short positions:

* If the price of the perpetual contract BTCUSDT is higher than the BTC spot price, traders holding long positions will pay funding to those in short positions. This payment discourages long holders and incentivizes short positions, helping to bring the contract price closer to the spot price.
* Conversely, if the perpetual contract BTCUSDT trades below the BTC spot price, short position holders pay funding to long holders, encouraging more traders to go long, thus raising the perpetual's price to the spot level.

<figure><img src="/boros-academy/imgs/image (3).png" alt="" /><figcaption></figcaption></figure>

<Hint style="info">
Traders either pay _or_ get paid to keep their perpetual contracts open. This periodic payment is called funding rate.

* When funding rate is positive, traders with long positions pay traders with short positions
* When funding rate is negative, traders with short positions pay traders with long positions
</Hint>

## How Do Funding Rates Work?

Funding rates are settled at regular intervals, which can differ across exchanges (8h intervals for Binance, 1h interval for Hyperliquid, etc).&#x20;

During settlement, long or short positions are either charged or paid the funding rates.

<figure><img src="/boros-academy/imgs/image (44).png" alt="" /><figcaption><p><em>Source:</em> <a href="https://app.hyperliquid.xyz/trade/BTC"><em>Hyperliquid</em></a></p></figcaption></figure>

On exchanges, funding rates are usually presented in scaled down figures (based on their settlement interval).

On Hyperliquid, funding rates are settled _**every hour**_, so a 0.0013% rate (positive funding) in the example above would mean that:

* A trader with a \$100,000 long position in BTCUSD on Hyperliquid will have to pay _\$100,000 x 0.0013% = \$1.30_ every hour (assuming funding rate remains).
* A trader with a \$100,000 short position in BTCUSD on Hyperliquid will earn \$1.30 every hour (assuming funding rate remains).

<figure><img src="/boros-academy/imgs/image (46).png" alt="" /><figcaption><p><em>Source:</em> <a href="https://www.coinglass.com/funding/BTC"><em>CoinGlass</em></a></p></figcaption></figure>

The example above is an illustration of how funding rates can vary greatly between exchanges. The rates can exhibit significant volatility, often exceeding the volatility of the underlying asset’s price.

For example, the funding rate for BTCUSDT on Binance shown above dropped dramatically from 0.0032% to -0.0041% within 48 hours, a 228% change if annualized.

These volatile swings are relatively common in the realm funding rates, even for blue chip assets like BTC.

Boros allows traders to speculate on the direction of funding rates, potentially profiting from changes in these rates.

## How to Use Funding Rates

Here are some examples of how funding rates can be utilized to enhance your trading strategies.

### Gauging Market Sentiment

<figure><img src="/boros-academy/imgs/image (47).png" alt="" /><figcaption><p><em>Source:</em> <a href="https://www.coinglass.com/FundingRateHeatMap"><em>CoinGlass</em></a></p></figcaption></figure>

Many traders rely on funding rates as an indicator of market sentiment.

For example, a positive funding rate in ETHUSDT tells us that there are more traders in long positions, and that the market is bullish. However, an _overly_ positive funding _**may**_ point to ETH being overbought.

Funding rates are a reflection of collective market behavior. Leveraging this information might help you frame your market outlook.

On Boros, you can proactively use this understanding to your advantage. Bullish ETH outlook? Go long on the ETH funding rate. Think SOL is overbought? Short the SOL funding rate. Given the volatility historically seen in funding rates, the potential for profits (or losses) is also present.

### Delta Neutral Strategy (Cash and Carry Trade)

Funding rates can be a great source of yield, especially for traders who employ delta-neutral strategies, allowing them to double up on their yield streams.

As an example of how a simple delta-neutral strategy might work:

1. Stake 100 ETH on Lido to earn \~4% APR
2. Short 100 ETH on Binance

This strategy makes the portfolio delta-neutral, meaning it is insulated from fluctuations in ETH's price.

If ETH price goes down, the short position on Binance will yield profits that offset any devaluation of the staked ETH on Lido.

If ETH price rises, the ETH on Lido will become more valuable, cancelling out any losses from the short position on Binance.

No matter which way ETH price goes, you will be up in “yield” from Lido, minus any fees (if any) to maintain the short position.

If funding rate is positive, you will actually get paid to maintain the short position, thus earning double yield from Lido _**and**_ funding rate fees.

What you see here is essentially what the Ethena protocol does - delta neutral farming with ETH. The double yield stream allows Ethena to offer outsized stablecoin yield for sUSDe (when funding rate is positive for ETH). However, this yield is exposed to the volatility of funding rates, with no way of locking in higher APRs during high funding rate environments. Boros solves that.

On Boros, users are able to supplement their existing delta-neutral strategies by turning the variable fees from funding rates into a _**fixed**_ yield stream. This capability allows traders and protocols like Ethena to secure stable yields from delta-neutral farming, making their income streams more predictable and easier to manage, or even locking in higher rates.

You can learn more about advanced strategies for Boros [here](/boros-academy/advanced-strategies/hedging-funding-rates-payment).


## Advanced: The Funding Rate Formula

The standard formula used by Binance, Hyperliquid, and most major venues:

> **F = Average Premium Index (P) + clamp(Interest Rate − P, −d, +d)**

**Premium Index (P)** measures how far the perp is trading from the spot oracle price. It's computed from impact prices, the average execution price for a defined notional trade size on each side of the book, rather than the raw mid-price. This makes the index more resistant to thin-book manipulation.

> Premium Index = [Max(0, Impact Bid − Spot Index) − Max(0, Spot Index − Impact Ask)] / Spot Index

The premium is sampled repeatedly throughout the funding window (every 5 seconds on Hyperliquid, continuously on Binance) and time-averaged. A brief spike just before settlement has minimal effect on the final rate.

**Interest Rate (I)** is a small fixed component set by the exchange, reflecting the assumed cost-of-carry differential between holding cash and holding the underlying asset. On both Binance and Hyperliquid this is fixed at 0.01% per 8-hour period (~10.95% annualised). This introduces a structural positive bias into the formula, which is why funding has historically skewed positive across most assets.

**The clamp** prevents the interest adjustment term from moving the funding rate beyond a set bound in either direction. On Binance and Hyperliquid the clamp is ±0.05% (Hyperliquid expresses it as ±0.0005 per hour). This keeps funding from becoming punitive during extreme dislocations.

**Worked example (Binance):**

- Premium Index: 0.0429%
- Interest Rate: 0.01%
- F = 0.0429% + clamp(0.01% − 0.0429%, 0.05%, −0.05%)
- = 0.0429% + clamp(−0.0329%, 0.05%, −0.05%)
- = 0.0429% + (−0.0329%) = **0.01%**

The clamp absorbed the difference, pulling the rate toward the set interest rate.

## Further Reading

- [Binance: Funding Rate Explainer](https://www.binance.com/en/support/faq/360033525031)
- [Hyperliquid: Funding Docs](https://hyperliquid.gitbook.io/hyperliquid-docs/trading/funding)
- [BitMEX: Q3 2025 Derivatives Report](https://blog.bitmex.com/2025q3-derivatives-report/)
- [Binance Academy: What Are Funding Rates](https://academy.binance.com/en/articles/what-are-funding-rates-in-crypto-markets)
- [Why Crypto Perps Overcharge Longs](https://x.com/mcp0x/status/2054205819223232676)

