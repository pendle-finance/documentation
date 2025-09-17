import Hint from '@site/src/components/Hint';

# Chapter 8 - Long Yield (Obtain Leveraged Yield-Exposure)

> Course level: **#advanced**

### TLDR

**Yield Tokens (YT)** are traded on the Pendle AMM in the same pool as Principal Tokens (PT).

<figure><img src="/pendle-academy/imgs/image (70).png" alt="" /><figcaption></figcaption></figure>

Let's say **1 YT stETH** is trading at **0.04 stETH**, with a **maturity in 1 year**. Holding **1 YT stETH** gives you the **right to receive the yield on 1 stETH until maturity**.

Peepo thinks that **1 stETH will generate more than 0.04 stETH yield in 1 year** (equivalent to 4% APY), and chooses to **buy 1 YT stETH**.

<figure><img src="/pendle-academy/imgs/image (69).png" alt="" /><figcaption></figcaption></figure>

Here, **Peepo profits** as the future yield that he **accrued is greater than the price of YT stETH when he purchased it**. Peepo was basically **longing stETH yield**:

<Hint style="info">
💡 **Buying and holding YT = longing yield Profits = Future yield - YT cost**
</Hint>

### How to Ape

1. **Go to** [**Pendle**](https://app.pendle.finance/pro/markets)
2. **Buy YT**
   1. Select the YT you want to buy.
   2. Select input asset (i.e. what you want to use to buy YT)
   3. Review the Output and Price Impact of your trade.
   4. Approve and confirm the transaction
3. **Passive Management** - Hold YT and collect all the yields until expiry  **Active Trading** - Sell YT when Implied APY increases
4. **Redeem YT yields** from the [Pendle Dashboard](https://app.pendle.finance/trade/dashboard/overview/positions)

### How do I become _profitable_?

You profit when either or both…

1. the price of YT rises
2. the yield produced by the YT becomes bigger than your cost buying the YT

Generally speaking, you are betting that either or both…

1. the **implied APY** rises after you buy (which pumps the YT price), implied APY is driven by **market force** (supply & demand of YT and PT)
2. the **underlying APY** and/or the **long yield APY** becomes higher (which means yield is being produced faster)

Here’s a table that quickly summarises what is going in favor or against you as a YT holder. Just flip the arrows’ directions if the indicators go the other way around.

| Indicators👇 / Effect 👉  | YT Price    | YT Yield Receivables |
| ------------------------- | ----------- | -------------------- |
| Underlying asset price ⤴️ | ⬆️          | ┄                    |
| Implied APY ⤴️            | ⬆️          | ┄                    |
| Underlying APY ⤴️         | ┄           | ⬆️                   |
| Long Yield APY ⤴️         | ┄           | ⬆️                   |
| Time to maturity ⤵️       | ⬇️ (slowly) | ┄                    |

### Leveraged yield exposure & nominal value

Since YT is typically much cheaper than the underlying asset, you _effectively_ get **leveraged yield exposure** by buying YT. For example, in the image below, you can earn the yield of \~11.9 stETH with just the cost of 1 stETH, which is an 11.9x effective leverage in _**notional value traded**_.

There’s **no borrowing involved**, so there’s **no risk of liquidation or oracle errors**. The leverage is simply achieved by [Yield Tokenisation](../pendle-101/chapter-2-yield-tokenization-basics), which lets you buy only the yield portion of the asset for a small fraction of the original price.

<figure><img src="/pendle-academy/imgs/image (71).png" alt="" width="375" /><figcaption><p>With the cost of 1 stETH, you are buying yield exposure of 11.9 ETH worth of stETH. An 11.9x leverage in notional value in this case.</p></figcaption></figure>

### When should I long yield and buy YT?

The last statement in the TLDR section can be condensed into a formula:

<figure><img src="/pendle-academy/imgs/image (72).png" alt="" /><figcaption><p><em>The best way to frame yield trading is to think in APY terms, instead of dollar values.</em></p></figcaption></figure>

If you think the **average future APY** will be higher than the **current Implied APY** (the APY that the market is implying), then **longing yield is a sound strategy**.

One simple estimate of the **average future APY** is the **current underlying APY**, which is the APY being generated **in the underlying protocol**. If all the conditions stay exactly the same from now until maturity, **the future APY should be the same as the underlying APY**.

**If you assume** that the **current underlying APY** is a good estimate of **future APY**, these are simple guidelines to see when is a good time to purchase YT:

<Hint style="info">
💡 If **Implied APY is low compared to Underlying APY**, then you are **more likely to profit** from buying YT.
</Hint>

<Hint style="info">
💡 If **Implied APY is high compared to Underlying APY**, then you are **less likely to profit** from buying YT.
</Hint>

### How to manage my trade?

**Passive Management - Buy and hold YT when Implied APY is low**

YT is cheap when Implied APY is low relative to the Underlying APY.

As long as the Underlying APY stays above the Implied APY you bought YT at, you will likely profit from this trade.

> Profit = Total Yield Collected from YT - Cost of YT

**Active Trading - Sell YT when Implied APY is high**

YT can be sold anytime. Just like any other tokens, you can also profit from “buying low, selling high” with YT.

You can profit by monitoring the Implied APY, and selling off your YT when Implied APY increases.

> Profit = (Total Yield Collected + Revenue from YT Sale) - Cost of YT

<figure><img src="/pendle-academy/imgs/image (73).png" alt="" width="563" /><figcaption><p>Implied APY Charts in the Pendle App</p></figcaption></figure>

### How can I predict the average future APY?

The simple guidelines in the previous section have a **big assumption** that the **underlying APY will stay the same**.

Of course, reality is not so simple and this **usually is not the case**. Many other factors can influence the future yield, such as **market sentiment** or **changes to the yield-generating mechanism of the underlying protocol**.

For example, in a bull market, there is a high demand for money, resulting in a higher rate of borrowing in money markets. This demand will translate to higher borrowing APY, and thus higher APY for lenders. Any edge in identifying and analyzing these trends will go a long way in predicting future yield and executing this strategy.

<figure><img src="/pendle-academy/imgs/image (58).png" alt="" width="563" /><figcaption></figcaption></figure>

As another hypothetical example, GMX could be close to successfully partnering up with Google and Amazon, providing a catalyst for GLP yield to skyrocket in the future due to increases in user activities, interests, and ultimately swap fees, rewards, etc.

So, just because YT is relatively expensive doesn’t necessarily mean that it’s overvalued. In this case, it might be a good idea to purchase YT now ahead of time.

Another way to evaluate the value of Implied APY is by analyzing its historical trend on Pendle.

<figure><img src="/pendle-academy/imgs/image (60).png" alt="" width="563" /><figcaption></figcaption></figure>

### How does it work?

Let's say that there is a **stETH pool** in Pendle with a **maturity of 1 year.** That means the holder of **YT stETH** has the right to collect **stETH yield for the next 1 year**.

Peepo sees the following information from the Pendle Market page on 01 Jan 2023:

<figure><img src="/pendle-academy/imgs/image (61).png" alt="" /><figcaption></figcaption></figure>

**YT stETH = 0.04 stETHImplied APY = 4.2%**

By trading YT stETH at this price, the market is valuing the average future APY of stETH to be 4.2% in the next year.

**Underlying APY = 5%**

Underlying APY means that stETH is currently generating a 5% yield from staking rewards in Lido. Thus holding stETH nets a 5% APY.

**Long Yield APY = 25%**

APY for buying and holding YT at the current price, assuming the average future APY is equivalent to the current underlying APY.

Peepo predicts that the average future APY of stETH will **remain above 5%**, meaning that the **current Implied APY of 4.2% is a bargain**.

Peepo chooses to **buy 100 YT stETH (= 4 stETH),** knowing that if the average future APY remains at the current underlying APY (which is a possible assumption), **he will receive 5 stETH worth of yield, netting a 25% APY**.

<figure><img src="/pendle-academy/imgs/image (62).png" alt="" /><figcaption></figcaption></figure>

It turns out that the average APY increases to **5.5%** within the next year, **Peepo ends up receiving an even greater yield**.

<figure><img src="/pendle-academy/imgs/image (63).png" alt="" /><figcaption></figcaption></figure>

Compared to **simply holding stETH**, which would receive the **displayed 5.5% APY**, Peepo receives **more than 6x** of that APY by holding **YT stETH** instead.

***

**Wojak bought 4 stETH**

<img src="/pendle-academy/imgs/image (64).png" alt="" data-size="original" />

By holding **4 stETH** for 1 year, Wojak earned **5.5% APY = 0.22 stETH**

***

**Peepo bought 100 YT stETH (=4 stETH)**

![](</pendle-academy/imgs/image (66).png>)

By holding **100 YT stETH** for 1 year, Peepo earned **1.5 stETH**. Peepo receives **more than 6x** of that APY by holding stETH instead.

***

However, it is important to note that, as with most investments, higher rewards comes with higher risks.

When **Implied Yield is much greater than Underlying APY**, then the **Long Yield APY will be negative**. This means that assuming the underlying APY remains constant, the cost of buying YT would be more than the average future yield collected. Under such scenario, it is generally **not a good time to buy YT**, unless you believe that the underlying APY will rise above the current implied APY.

Even when you buy YT at a **positive Long Yield APY** when **Implied APY < Underlying APY**, the average future APY could **drop lower than the Implied APY** of your trade and you will have a loss (look at the equation in section 3.1 again).

Ultimately, you are entering a **long-yield** position and your profit depends on **yield sustaining or increasing**.
