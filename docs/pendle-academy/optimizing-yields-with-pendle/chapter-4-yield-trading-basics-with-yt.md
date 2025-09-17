import Hint from '@site/src/components/Hint';

# Chapter 4 - Yield Trading Basics with YT

> Course level: **#intermediate**

You’ve made it through the first 3 chapters and learned the [basics of PT and YT](../pendle-101/chapter-2-yield-tokenization-basics), as well as how to use Pendle to [earn passive income](chapter-3.1-fixed-yield-on-pendle) from yield. Great job! Now let’s dive deeper to execute various kinds of yield trading strategies through buying and selling YT.

## Yield Trading 101 with YT

In this chapter, we will tap into the simplest form of yield trade — _buying a YT (Yield Token)._

### Buy YT to long yield

One way to trade yield with Pendle is to buy YT ([Yield Token](../pendle-101/chapter-2-yield-tokenization-basics)). That means you are **increasing your yield exposure (long yield)**. You can either hold it until maturity, or swing-trade it to turn a quick profit, if you buy low and sell high. This strategy works well when you expect the underlying APY of an asset to rise in the future, or when you think the YT price is undervalued (we’ll explain more later).

<Hint style="info">
💡 Remember: YT holders receive the yield of the underlying asset
</Hint>

<figure><img src="/pendle-academy/imgs/image (92).png" alt="" /><figcaption><p>Go to “Market” under the “Trade” interface from the top menu bar. Then choose your asset and click “YT”.</p></figcaption></figure>

### **Get leveraged yield exposure without borrowing risk**

Since YT is typically much cheaper than the principal, you _effectively_ get **leveraged yield exposure** by buying YT. For example, in the image below, you can earn the yield of \~11.9 stETH with just the cost of 1 stETH, which is an 11.9x effective leverage in _notional value traded_.

There’s **no borrowing involved**, so there’s **no risk of liquidation or oracle errors**. The leverage is simply achieved by [Yield Tokenisation](../pendle-101/chapter-2-yield-tokenization-basics), which lets you buy only the yield portion of the asset for a small fraction of the original price.

<figure><img src="/pendle-academy/imgs/image (93).png" alt="" width="375" /><figcaption><p>With the cost of 1 stETH, you are buying yield exposure of 11.9 stETH. An 11.9x leverage in notional value in this case.</p></figcaption></figure>

### **How do I profit from buying YT?**

You profit when either:

1. YT price increases, or
2. Yield received from YT is more than the cost of buying YT

Generally speaking, you are betting that either or both…

1. the **implied APY** rises after you buy (which pumps the YT price), and implied APY is driven by **market force** (supply & demand of YT and PT)
2. the **underlying APY** and/or the **long yield APY** becomes higher (which means yield is being produced faster)

<Hint style="danger">
💡 Don’t worry if you are not familiar with the different kinds of APYs and jargons, we will cover those in the [next chapter](chapter-5-important-concepts-in-yield-trading). For now, the summary table below should be enough for most situations.
</Hint>

Here’s a table that quickly summarizes what is going in favor or against you as a YT holder. Just flip the arrows’ directions if the indicators go the other way round.

<table><thead><tr><th width="374">Indicators👇 / Effect 👉</th><th width="158.33333333333331">YT Price</th><th>YT Yield Receivables</th></tr></thead><tbody><tr><td>Underlying asset price ⤴️</td><td>⬆️</td><td>┄</td></tr><tr><td>Implied APY ⤴️</td><td>⬆️</td><td>┄</td></tr><tr><td>Underlying APY ⤴️</td><td>┄</td><td>⬆️</td></tr><tr><td>Long Yield APY ⤴️</td><td>┄</td><td>⬆️</td></tr><tr><td>Time to maturity ⤵️</td><td>⬇️ (slowly)</td><td>┄</td></tr></tbody></table>

In simple terms:

* **A good time to buy YT** is when the implied APY is low, which means the YT price is low. You also want to make sure the long yield APY is positive (the higher the better), which suggests that the YT _may_ be undervalued.
* **A good time to sell YT** is just the opposite — when the implied APY is high, which means the YT price is high. Also, when the long yield APY is close to zero or even negative, it suggests that the YT _may_ be overvalued.

<Hint style="info">
💡 More on how to better determine when it is a good time to buy or sell YT, in our [chapter-8-long-yield-obtain-leveraged-yield-exposure.md](../yield-trading-deep-dives/chapter-8-long-yield-obtain-leveraged-yield-exposure.md "mention").
</Hint>

### **How to buy YT**

1. Go to the “Markets” page [https://app.pendle.finance/trade/markets](https://app.pendle.finance/trade/markets) from the top menu.
2. Choose an asset and buy its YT
   1. Select an underlying asset and a maturity date you like. Look for one with high underlying APY and/or low implied APY.
   2. Click on the “YT - Long Yield APY” box to continue.
   3. Select your input asset and amount (which will be swapped to the pool’s asset to buy YT, if necessary). This can be a different token to the underlying asset and we will find the best route to swap your asset.
   4. Review the effective implied APY after price impact and fees, which is also the effective cost of your YT, and the effective long yield APY you will earn.

<figure><img src="/pendle-academy/imgs/image (48).png" alt="" width="375" /><figcaption><p>Review the effective implied APY, long yield APY and price impact.</p></figcaption></figure>

<figure><img src="/pendle-academy/imgs/image (49).png" alt="" /><figcaption><p>Review the different scenarios of your profit projections. You can also use the “Calculator” on the bottom right of the page to run customized projections.</p></figcaption></figure>

3. Approve and confirm the transaction.
4. If you have an open position, click **“Dashboard”** on the top menu to see your current positions. You can later click the **“Claim”** button to claim the yield produced by your YT.

<Hint style="warning">
Remember: **You can exit and sell your YT positions at any time.** The Pendle market is 24/7. There’s never any lock or penalty to close your position early in Pendle.
</Hint>
