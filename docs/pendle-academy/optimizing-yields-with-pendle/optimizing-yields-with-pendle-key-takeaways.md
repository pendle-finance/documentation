import Hint from '@site/src/components/Hint';

# Optimizing Yields with Pendle - Key Takeaways

> Course level: **#intermediate**

<Hint style="info">
💡 Review [Pendle 101 key takeaways](../pendle-101/pendle-101-key-takeaways) if you need to refresh your memory about what is PT and YT in Pendle.
</Hint>

## Simple Yield Farming on Pendle

### 1. Earn fixed yield

* Go to [Market](https://app.pendle.finance/trade/markets). Select an asset and click the “PT - Fixed APY” box to continue.
* You are **guaranteed to earn the displayed amount of your chosen underlying asset** if you hold until the maturity date.
*

    <figure><img src="/pendle-academy/imgs/image (9).png" alt="" /><figcaption><p>In this example, you are guaranteed to earn ~0.17 stETH (which is ~4.6% APY) on 29th Dec 2027.</p></figcaption></figure>
* The fixed yield comes from the discount you get from buying the Principal Token (**PT**) **at a lower price** than the underlying asset. Your PT can be **redeemed 1:1 for the underlying asset** at or after the maturity date. In other words, the price difference is your yield at maturity.
* The PT can be a viable alternative to spot, with similar risk exposure, and the benefit of downside cushion thanks to the Fixed Yield realized upon redemption.
* **You are&#x20;**_**not**_**&#x20;locked** and **can exit at any time**, even before the maturity date.
  * If you exit early, your actual earning will depend on the market price of PT, which is driven by buyers/sellers activities (supply and demand). So you may earn higher or lower (and in extreme cases, at a loss) than the fixed APY at entry.
* Note that **time works in your favor** because PT price gradually closes its gap (i.e. rises) to the underlying asset, and becomes 1:1 to the underlying asset at the maturity date. So you don’t need to worry about short term price fluctuations.
  *   You may even take early profit by exiting early when PT price rises.

      <figure><img src="/pendle-academy/imgs/image (108).png" alt="" width="563" /><figcaption><p>Example showing PT price gradually rises to the redeem price (\$1 in this case) over time despite short term fluctuations.</p></figcaption></figure>

### 2. Liquidity provision

* Go to the “[Pools](https://app.pendle.finance/trade/pools)” and select an asset to continue.
* You can deposit your yield-bearing assets to provide liquidity to Pendle pools to **earn extra “free” yields on top the native yields using the same assets.**
  * LP receives returns from multiple avenues:
    * Native yields
      * Yields/rewards from the underlying asset (e.g. yield from stETH, or ETH rewards distributed from GMX’s GLP)
      * Fixed yield from the PT component of the pool
    * Swap fees
    * \$PENDLE incentives
  * LP is denominated in your selected underlying asset _only_ (e.g. native stETH plus PT-stETH only in the stETH pools)
    * you are not exposed to price actions of uncorrelated assets
    * **ultimately no impermanent-loss (IL) concern at maturity**
* **You are&#x20;**_**not**_**&#x20;locked** and **can exit at any time**, even before the maturity date. The APY you earn from liquidity provision is also independent of the maturity date.

<Hint style="info">
💡 Lock PENDLE for vePENDLE to boost LP incentives (optional). vePENDLE holders can also boost their Liquidity Provision APY up to 2.5X. Click [here](https://docs.pendle.finance/ProtocolMechanics/Mechanisms/vePENDLE) to learn more.
</Hint>

***

## Yield Trading Basics

### Buy YT to long yield

* Go to [Market](https://app.pendle.finance/trade/markets). Then select your asset and click “YT”.
* Buying a YT means you are **increasing your yield exposure (long yield)**. You can either hold it until maturity, or buy low and sell high to turn a quick profit.
  * You profit when either or both…
    1. the price of YT rises (then you may sell it off for a capital gain),
    2. the yield produced by the YT becomes bigger than your cost buying the YT
  * This strategy works well when you expect the underlying APY of an asset to rise in the future, or when you think the YT price is undervalued.
*   Since YT is typically much cheaper than the underlying asset, you _effectively_ get **leveraged yield exposure** by buying YT, with no actual borrowing involved, so there’s **no risk of liquidation or oracle errors**.



    <figure><img src="/pendle-academy/imgs/image (110).png" alt="" width="375" /><figcaption><p>With the cost of 1 stETH, you are buying yield exposure of 11.9 stETH. An 11.9x leverage in notional value in this case.</p></figcaption></figure>
*   Here’s a table that quickly summarises what is going in favor or against you as a YT holder. Just flip the arrows’ directions if the indicators go the other way round.

    | Indicators👇 / Effect 👉  | YT Price    | YT Yield Receivables |
    | ------------------------- | ----------- | -------------------- |
    | Underlying asset price ⤴️ | ⬆️          | ┄                    |
    | Implied APY ⤴️            | ⬆️          | ┄                    |
    | Underlying APY ⤴️         | ┄           | ⬆️                   |
    | Long Yield APY ⤴️         | ┄           | ⬆️                   |
    | Time to maturity ⤵️       | ⬇️ (slowly) | ┄                    |

***

## Important concepts in yield trading

#### **PT + YT = Underlying asset**

* So the higher the YT price, the lower the PT price, and vice versa.
* **PT and YT are just two sides of the same coin**

#### **Underlying APY**

* The yield of the underlying asset. Pendle displays a 7-day moving average in the app.
* Note that the underlying APY does _not_ directly affect the implied APY

#### **Implied APY**

* Represents the **market&#x20;**_**consensus**_**&#x20;of the future APY** of an asset
*   It changes depending on the supply and demand of YT and PT in the market

    | Buy/Sell | YT            | PT            |
    | -------- | ------------- | ------------- |
    | Buy      | Implied APY ↑ | Implied APY ↓ |
    | Sell     | Implied APY ↓ | Implied APY ↑ |
* **It is the measure of how valuable the YT is**
  * In layman's terms, implied APY is the “price of YT” in yield % terms (and the inverse price of PT)

<Hint style="info">
💡 Key takeaway: Pendle is **a marketplace of&#x20;**_**Implied APYs**_ of different assets. (Akin to how Uniswap is a marketplace of _spot prices_ of different assets)
</Hint>

#### Long Yield APY

* is the _**estimated**_**&#x20;return** (expressed as annualized percentage yield) that you can get **by** **buying YT and holding it until maturity**, assuming the underlying APY stays the same at its current value.
  * Its value can be negative if the total value of the future yield based on the current underlying APY will be less than the cost of buying YT.
* Gives you a _**clue**_ if the YT is currently cheap (when positive) or expensive (when negative)

#### Fixed APY

* is the guaranteed yield you will receive if you buy and hold PT now
* numerically equivalent to the Implied APY
