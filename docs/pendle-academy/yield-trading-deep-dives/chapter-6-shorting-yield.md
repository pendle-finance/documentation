import Hint from '@site/src/components/Hint';

# Chapter 6 - Shorting Yield

> Course level: **#advanced**

<Hint style="info">
💡 Review [chapter 2](../pendle-101/chapter-2-yield-tokenization-basics) to learn about the basics of what is a **Principal Token** (**PT**). Review [chapter 3](../optimizing-yields-with-pendle/chapter-3.1-fixed-yield-on-pendle) to learn about buying PT to get fixed-yields.
</Hint>

### TLDR

Recall that you can [split your yield-bearing asset](../pendle-101/chapter-2-yield-tokenization-basics) on Pendle into one that represents the principal (PT) and one that represents the yield (YT). You can sell or buy these tokens on the Pendle market to bet on the changes in yield. For example, if you think the yield will go down, you can sell your YT and keep your PT. This way, you can secure a fixed rate of return and avoid losing money if the yield drops. This is called **shorting yield**.

### PT is a **short yield position**

Buying and holding PT is more than just earning a fixed income. It is also a way to bet against falling yields. When the market expects yield to go down, PT price goes up. PT is therefore also a short-yield position.

[Implied APY falls if the market consensus believes the yield of an asset will go down](../optimizing-yields-with-pendle/chapter-5-important-concepts-in-yield-trading#implied-apy). This drives PT price higher and you can choose to sell your PT to make a profit. This is called active yield trading.

### When should you buy PT?

The fixed yield from buying and holding PT **depends on the current market price of PT**.

Intuitively, you should **buy PT when it is cheaper,** as you would **get a higher fixed yield**. But how can you tell that PT is selling at a cheap price?

You need to **compare the fixed yield** **with the average future yield of the underlying asset**. The average future yield is your own prediction of the future yield from now until maturity. If the fixed yield is higher than your prediction of the average future yield, then it is probably a good time to buy PT. This means you are betting against the market and securing a higher rate of return.

For example, if you predict that the average future yield until maturity for stETH is 5%, but PT stETH is priced at a 6% fixed rate, then you should buy and hold PT stETH.

<Hint style="warning">
_**PRO TIP**_ \
**Timing is important** when executing a PT trade. As people buy and sell PT in Pendle, the fixed rate will fluctuate up and down. If you can wait and enter the PT trade right when PT is oversold (due to volatility or mispricing), you will secure a high fixed rate all the way until maturity.
</Hint>

Numerically, **Fixed APY = Implied APY**, which shows the market expectation of the future yield. You can therefore also compare the implied APY against the underlying APY within each asset market in the “Market” page.

Generally speaking, **PT is cheap when the implied APY is much higher than the underlying APY** (unless you believe the underlying APY is going to bounce back).

<figure><img src="/pendle-academy/imgs/image (105).png" alt="" /><figcaption></figcaption></figure>

In a nutshell, you may consider entering a short yield position by buying PT when…

1. you believe the asset will generate less underlying APY in the future, or
2. you want to hedge against falling yield, or
3. you feel satisfied enough with the advertised APY, or
4. you believe PT is too undervalued

### How to Ape

1. **Go to** [**Pendle**](https://app.pendle.finance/pro/markets)
2. **Buy PT**
   1. Select the PT you want to buy.
   2. Select input asset (i.e. what you want to use to buy PT).
   3. Review the Output and Price Impact of your trade.
   4. Approve and confirm the transaction.
3. **Passive Management** - Hold PT and redeem the Underlying Asset upon expiry  **Active Trading** - Sell PT when price increases

### Early selling of PTs

Instead of waiting until maturity to redeem the underlying asset, you can also choose to sell your PT early. The usual motivations for selling PTs include:

* Exiting the position to move capital elsewhere, or
* PT price has increased significantly and there is an opportunity to take profit early. This is known as Active Yield Trading.

### See how it works in practice

Let's say that there is an stETH pool in Pendle with a maturity of 1 year. That means the holder of **PT stETH is guaranteed to be able to redeem stETH at 1:1** after 1 year.

Peepo sees the following information from the Pendle Market page on 01 Jan 2023:

<figure><img src="/pendle-academy/imgs/image (42).png" alt="" /><figcaption></figcaption></figure>

**PT stETH = 0.94 stETH**

You can pay 0.94 stETH to buy 1 PT stETH now and redeem 1 stETH after maturity

**Underlying APY = 5%**

Underlying APY means that stETH is currently generating a 5% yield from staking rewards in Lido. Thus holding stETH nets a 5% APY.

**Fixed APY = 6.4%**

Fixed APY for buying and holding PT until maturity is 6.4%

Peepo predicts that the average future yield in Lido will **at best be 6%**, so securing a **6.4% fixed yield** is a good move. Peepo proceeds to purchase **100 PT stETH (= 94 stETH)**. Having purchased **100 PT stETH**, Peepo is guaranteed to be able to **redeem 100 stETH** after the PT matures in 1 year. Effectively this produces a **Fixed APY of 6.4%**.

<figure><img src="/pendle-academy/imgs/image (43).png" alt="" /><figcaption></figcaption></figure>

Actually, **even if the Fixed APY was slightly lower than the Underlying APY**, it might still be a good deal, especially **if you predict that** **yield will drop in the future**. This is especially useful in turbulent markets when the yield can fluctuate rapidly, as you can **fix your APY at a desirable rate** and not need to worry about your return dropping at all.
