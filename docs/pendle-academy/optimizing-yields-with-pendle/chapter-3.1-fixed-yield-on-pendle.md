import Hint from '@site/src/components/Hint';

# Chapter 3.1 - Fixed Yield on Pendle

> Course level: **#intermediate**.

## Fixed Yield with PT

With a fixed yield deposit, you are **guaranteed to earn the displayed amount of your chosen underlying asset** if you hold the position until the maturity date.

In the example below, if you deposit 1 stETH, you can redeem \~1.17 stETH on 29th of December 2027, earning a fixed profit of \~0.17 stETH or an annualized rate of \~4.687%.

<figure><img src="/pendle-academy/imgs/image (1).png" alt="" /><figcaption><p>Volatility-proof yield - what you see is what you get</p></figcaption></figure>

<Hint style="success">
💡 Think of it like a term-deposit account, or a CD (Certificate of Deposit) offered by commercial banks, but it’s even better with Pendle as **your deposit is&#x20;**_**not**_**&#x20;locked** and **can exit at any time**.
</Hint>

***

### Why earn fixed yield?

DeFi yield often declines over time. With Pendle fixed yield, you can secure the yield you like on Pendle Earn, and then relax. No more checking the APRs every day and hopping from farm to farm.

<Hint style="info">
💡 A fixed yield deposit can also be a viable alternative to spot, with similar risk exposure, and the benefit of downside cushion thanks to the Fixed Yield realized upon redemption.
</Hint>

### Where does the yield come from?

Behind the scenes, you are swapping your deposit for the [**Principal Token**](../pendle-101/chapter-2-yield-tokenization-basics#pt-and-yt-in-pendle) **(PT)** of your chosen asset. You buy the PT (PT-stETH in this example) **at a lower price** than the underlying asset (stETH in this example). Your PT can be **redeemed 1:1 for the underlying asset** (stETH in this example) at or after the maturity date. In other words, the price difference is your yield at maturity.

You can refer back to [Chapter 2](../pendle-101/chapter-2-yield-tokenization-basics) where we explained how PT can be sold at a discount by using yield tokenization, and how it works just like zero-coupon bonds in TradFi.

<figure><img src="/pendle-academy/imgs/image (76).png" alt="" width="563" /><figcaption></figcaption></figure>

### How to start earning

1. Go to the Markets page: [https://app.pendle.finance/trade/markets](https://app.pendle.finance/trade/markets) .
2. Deposit and start earning
   1. Select an asset and a maturity date you like. You can also sort the list by the “Highest Fixed APY”.
   2. Click on the “PT - Fixed APY” box to continue.
   3. Select your input asset and amount (which will be swapped to the pool’s asset to buy PT, if necessary). This can be a different token to the underlying asset and we will find the best route to swap your asset.
   4. Review how much you will be able to redeem at maturity (i.e. the actual earning) and the effective Fixed APY you will earn.
   5. Approve and confirm the transaction.

<figure><img src="/pendle-academy/imgs/image (2).png" alt="" /><figcaption></figcaption></figure>

### FAQ

**Am I locked until the maturity date? Can I exit early?**

> You are _not_ locked at all, you can exit at any time by selling your position (which is a PT) at market price on Pendle’s AMM (through “Pendle Trade” interface).

**Do I earn less or even lose money if I exit early?**

> It depends on the market price of PT (after deducting trading fees and slippage). The market price is driven by buyers'/sellers' activities, and generally, if the market expects the asset to generate higher APY%, PT price may drop in the short term. Conversely, if the market expects the asset to generate lower APY%, PT price may rise in the short term.
>
> _However_, note that **time works in your favor** in this strategy because PT price gradually closes its gap to the underlying asset (in other words, the PT price relative to the underlying asset increases over time), and eventually becomes 1:1 to the underlying asset at maturity date. So you don’t need to worry even if PT price fluctuates in the short term. You may even take early profit by exiting early when PT price rises too.

<figure><img src="/pendle-academy/imgs/image (78).png" alt="" width="563" /><figcaption><p>You can sell your position at any time at market price. Market prices may fluctuate but eventually converge to the full underlying asset price.</p></figcaption></figure>

**The fixed yield APY% being offered on Pendle changes over time, does that affect my earnings?**

> No, you are **guaranteed to the fixed yield APY% when you open your position**. The new rate only affects new deposits or newly opened positions. It is just like bonds or CDs in TradFi, the market rate can change daily but once you open your position, you’re secured to the rate at that time.

**When is a good time to open a fixed-yield position?**

> The simple answer is when the APY% offered is high. Of course, we can’t predict how the market will behave, so as long as you are satisfied with earning 4% with your stETH for example, go for it.
>
> Also, if you expect the underlying asset’s APY to go down (let’s say you think ETH staking yield will drop because more people will join staking), the fixed yield strategy will benefit you because:
>
> 1. You secured a higher APY% before it goes down
> 2. PT market price may rise in the short term compared to your purchase price if other traders think the same (to buy more PTs or sell their YTs which pushes up PT’s market price), and you may be able to close your position early with a profit

**Do I have to claim my yield?**

> No. You earn by getting a lower price when you buy PT. You are guaranteed to redeem 1:1 the underlying asset at or after the maturity date, thereby fully realizing the discount as profit.
>
> You’ll need to manually redeem the underlying at maturity.

### PT as a short-yield strategy

> Check out [chapter-6-shorting-yield.md](../yield-trading-deep-dives/chapter-6-shorting-yield.md "mention") for a deep dive into how the strategy also works _as a short-yield strategy_ and how to look for the best time to enter or exit.
