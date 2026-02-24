import Hint from '@site/src/components/Hint';

# Chapter 7 - Providing Liquidity while Trading Yield

> Course level: **#advanced**

Let’s first look at what exactly makes up a Pendle AMM liquidity pool.

## Pendle Pool Composition

A Pendle pool consists of PT and SY. Let’s use stETH as an example of our underlying asset. A stETH pool (for any maturity date) consists of two tokens:

* **PT**-stETH
* **SY**-stETH

**SY** is a wrapped version of the underlying asset, which gives Pendle a standard way to interact with any yield mechanism and split it into PT & YT. You can think of SY the same as the underlying yield-bearing asset.

> Notice that there’s no YT in the pool, because both PT and YT are traded through the same pool of liquidity. This is made possible by using a pseudo-AMM with [flash swaps](https://docs.pendle.finance/ProtocolMechanics/LiquidityEngines/AMM#flash-swaps), which we won’t go into details here.

## 1. Zap to provide liquidity to Long PT

**The best of both worlds: Earn fixed yield and swap fees with PT liquidity pools**

[Holding PT](chapter-7-providing-liquidity-while-trading-yield#2-how-to-be-yield-neutral-with-zero-price-impact-mode) gives you fixed yield that does not change with market conditions, and is a safe strategy that can still offer high returns.

PT can also be used to provide liquidity in our liquidity pools to earn extra yields. When you provide liquidity with PT and the underlying asset (e.g. PT-stETH + stETH), you can earn:

1. Swap fees from the pools
2. \$PENDLE incentives
3. Native yields
   1. A portion of PT fixed yield
   2. A portion of the underlying yield

You can withdraw your PT from the pool at any time and sell it for profit, or redeem it for the underlying asset after maturity.

### How to Ape

Pendle makes it easy for you to enter this strategy with the Zap function. It automatically converts your input token into PT and the underlying asset and adds them to the pool.

To use this strategy, follow these steps:

1. Go to the [Pools](https://app.pendle.finance/trade/pools) page.
2. Select the pool of your desired asset.
3. Deposit the token of the underlying asset, or any other token, and receive LP tokens in return.

<Hint style="warning">
💡 Your LP position is _**not**_**&#x20;locked** and you can **exit at any time**, even before the maturity date. The APY you earn from liquidity provision is also independent of the maturity date.
</Hint>

### **How this strategy is also a short-yield position**?

As we explained in [chapter-6-shorting-yield.md](chapter-6-shorting-yield.md "mention"), providing liquidity with PT means that you have a slightly bearish view on the underlying yield and you are shorting it. In other words, this strategy gives you **some protection against the falling yield rate** of the asset.

If you want to maintain a yield-neutral LP position, you can read the next section.

## 2. **How to be yield-neutral with “Zero price impact mode”**

If you want to provide liquidity without taking a net short-yield position, you can use the “Zero price impact mode” option when you Zap in.

Recall that a Pendle liquidity pool is made up of PT and the underlying asset. By default, when you Zap to provide liquidity, some of the underlying assets are used to buy PT from the PT/SY pool, and the rest is wrapped into SY. However, this purchase of PT can affect the price and the yield.

#### What is **“Zero price impact mode”?**

If you enable this mode, the underlying asset is fully converted into SY, a portion of which is used to mint PT and YT. The PT and the remaining SY are then used for liquidity provision, while keeping the YT in your wallet. This avoids buying PT during the Zap, thus won’t cause any price impact.

This option is for intermediate or advanced users, because you will need to know how to [manage your YT position](../optimizing-yields-with-pendle/chapter-4-yield-trading-basics-with-yt).

#### Yield-neutral

By using this option, you balance out the effect of the PT in your LP position with the YT in your wallet. This means that you are yield-neutral instead of short-yield.

#### **When not to use “Zero price impact” mode?**

You may not want to use this option if:

* You don’t want to manage a YT position
  * for example, on Ethereum mainnet, it may not be worth maintaining a small YT position due to gas costs
* You think the YT price is too overvalued (in other words, the PT is too cheap and you want to own more PT in the pool)

## 3. How to use an LP position as part of yield trading

#### Zap in when Implied APY / Fixed APY is High

One way to use an LP position as part of yield trading is to enter when the Implied APY is high, and exit when it is low.

This is similar to buying PT, which is best to enter when the Implied Yield is high. When the Implied APY is high, that means PT is cheaper (relative to the underlying token), and the resulting fixed yield APY is higher.

When the Implied APY is low, that means PT is more expensive, and you can look to exit the LP position for an early profit. You can also hold the LP position and continue earning yield from the pool until maturity, after which the PT can then be redeemed 1:1 for the underlying asset.

#### **Shorting Yield with LP**

Recall that _Long PT = Short yield_. You can quickly switch between Long and Short yield positions by zapping between YT and LP, instead of YT and PT.

An LP position partially holds PT and achieves the same objective of "shorting" yield, while also earning extra yields (from swap fees, PENDLE incentives, and SY rewards) on top of the PT fixed yield.

#### **No Impermanent Loss (IL) Concern**

You don’t have to worry about impermanent loss (IL) when providing liquidity in a Pendle pool. This is because a Pendle pool consists of PT and the underlying asset only, which are highly correlated and denominated in the same asset, so their price ratio does not fluctuate much. This means that IL is minimal before maturity. And thanks to the fact that PT is 1:1 redeemable at maturity, IL is also **guaranteed to be zero or none at maturity**.

<Hint style="success">
See how Pendle LP historically fared well against impermanent losses in the studies below.

* **Pendle LP Performance Study -** [**Part 1**](https://medium.com/pendle/evaluating-performance-of-pendle-liquidity-pools-part-1-f81e6957837d)
  * LP on Pendle vs. holding underlying asset w/o yield (e.g. ETH)
    * LP outperforms holding the underlying asset (e.g. ETH) in all cases studied here, even when excluding PENDLE incentives
    * No IL was observed in all cases studied here
    * The longer one LPs on Pendle, the greater the outperformance
* **Pendle LP Performance Study -** [**Part 2**](https://medium.com/pendle/evaluating-performance-of-pendle-liquidity-pools-part-2-3d085872a603)
  * LP on Pendle vs. depositing in the underlying pool (e.g. stETH)
    * LP generally outperforms non-Pendle users, even when excluding PENDLE incentives
    * In the worst case, IL was observed to be 0.85% only
    * When including PENDLE incentives, there was zero IL in the stETH and gDAI pools
    * The performance of an LP using Zero Price Impact Mode vs. without depends on the Underlying and Implied APY of the pool. Regardless, Pendle LPs still generally outperform non-Pendle users.
</Hint>

<Hint style="success">
💡 **Boost your APY with vePENDLE**

You can increase your APY (up to 2.5x) from your LP positions by locking PENDLE for vePENDLE. The zap interface shows you how much PENDLE you need to lock and for how long to get the maximum APY boost.

With vePENDLE, you can also vote for pools to allocate more incentives to them and earn extra swap fees on top. Learn more [here](https://docs.pendle.finance/ProtocolMechanics/Mechanisms/vePENDLE).

<img src="/pendle-academy/imgs/image (40).png" alt="Example of vePENDLE required to max boost APY" data-size="original" />
</Hint>

<Hint style="info">
💡 **Estimate Profit with Calculator**&#x20;

Look for the calculator icon next to the "Approve" or "Zap In" button. The calculator lets you estimate the potential profit for strategies such as Buy PT or Buy YT, and compares it to just holding the original asset.

<img src="/pendle-academy/imgs/image (41).png" alt="" data-size="original" />
</Hint>
