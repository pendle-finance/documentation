import Hint from '@site/src/components/Hint';

# Chapter 5 - Important concepts in yield trading

> Course level: **#intermediate**

We have introduced the various terms and jargon in [Chapter 4 - Yield Trading Basics](chapter-4-yield-trading-basics-with-yt). Let’s explore these important yield trading concepts in more depth.

### PT + YT = Underlying asset

As a reminder, the core of Pendle’s [yield tokenization](../pendle-101/chapter-2-yield-tokenization-basics) is to split a yield-bearing token into PT and YT. The price of the two tokens adds up to the price of the underlying asset. Therefore, the price of PT and YT must be **inversely correlated** — the higher the YT price, the lower the PT price, and vice versa.

<Hint style="warning">
💡 Key takeaway: **PT and YT are just two sides of the same coin — the Implied APY**
</Hint>

### Underlying APY

Underlying APY represents the 7-day moving average yield rate of the underlying asset. This approach allows a more accurate indication of the underlying yield over a period of time.

### Implied APY

Implied APY is the current **market consensus of the yield** of an asset. In other words, it is the “price” of YT, denoted in percentage terms.

**The implied APY changes over time, depending on the supply and demand of YT and PT in the market**. The more people buy YT, or sell PT (remember they are just two sides of the same coin), the higher the implied APY is, and the more expensive the YT is (or the cheaper the PT is), and vice versa.

Here is a table that summarizes the how market activities affect implied APY:

| Buy/Sell | YT            | PT            |
| -------- | ------------- | ------------- |
| Buy      | Implied APY ↑ | Implied APY ↓ |
| Sell     | Implied APY ↓ | Implied APY ↑ |

<Hint style="info">
💡 Key takeaway: Think of **implied APY as the measure of how valuable the YT is**. It is the price of YT, denoted in yield % terms.
</Hint>

<Hint style="info">
💡 Key takeaway: Pendle is **a marketplace of&#x20;**_**Implied APYs**_ of different assets. (Akin to how Uniswap is a marketplace of _spot prices_ of different assets)
</Hint>

$$ImpliedAPY = [(1+\frac{YTprice}{PTprice})^\frac{365}{DaysToMaturity} ]-1$$

It is not required to fully understand the math behind implied APY, but you can notice two things from it:

1. **The underlying APY does not directly affect the implied APY**\
   Implied APY depends on the demand of YT or PT, which is determined by market forces. So, even if the underlying APY stays the same, the implied APY can still fluctuate due to shifts in market sentiment.
2. **With a constant implied APY, YT price decreases and PT price increases over time** \
   Even if the market has no trading activity at all (and thus the implied APY stays the same), time will also affect the price of YT and PT. This is rational, as time approaches expiry (maturity), there are less yield remaining to collect for YT, hence its price decline. YT’s price decline in turn causes PT price to trend upwards, being equal to its underlying at maturity.

### Long Yield APY

The long yield APY is the _**estimated**_**&#x20;return** (expressed as annualized percentage yield) that you can get **by** **buying YT and holding it until maturity**, assuming the underlying APY remains at its current value.

This value can be negative, meaning that the total value of the future yield based on the current underlying APY will be less than the cost of buying YT.

In simple terms, the long yield APY represents the difference between the underlying APY (estimated yield to receive) and the implied APY (cost of YT). If you buy and hold YT, you want this value to stay positive, the higher the better.

<Hint style="info">
💡 Key takeaway: The long yield APY gives you a _**clue**_ if the YT is currently cheap (when positive) or expensive (when negative).
</Hint>

Learn more about how to value YT and PT at [chapter-9-identifying-opportunities-to-long-short-yield.md](../yield-trading-deep-dives/chapter-9-identifying-opportunities-to-long-short-yield.md "mention")

### Fixed APY

Fixed APY is the guaranteed yield you will receive if you buy and hold the PT now. This value is numerically equivalent to the Implied APY.

### Example 1

<figure><img src="/pendle-academy/imgs/image (46).png" alt="" width="563" /><figcaption></figcaption></figure>

The image above is an example of a yield-bearing asset on Pendle. sDAI is the DAI savings rate by MakerDAO (Spark Protocol) and it is currently generating 5% yield.

The implied APY on Pendle shown above is 3.89%, which means YT-sDAI-2024 is currently priced at 3.89%.

<Hint style="info">
💡 If you think that the average yield of sDAI (underlying APY) is going to be above its implied APY until maturity, purchasing YT will be a good decision.
</Hint>

Purchasing YT-sDAI in this instance will yield 5% while costing 3.89%, since you’ll be receiving more than what you’re spending, Long Yield APY in this instance is positive (29.42% as shown in the attached image).
