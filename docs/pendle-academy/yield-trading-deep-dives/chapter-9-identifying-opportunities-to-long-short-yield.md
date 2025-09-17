import Hint from '@site/src/components/Hint';

# Chapter 9 - Identifying Opportunities to Long/Short Yield

> Course level: #**advanced**

## TLDR

The objective of this strategy is to maximize your APY on the underlying asset by switching between the 2 possible positions:

1. [**Hold PT (short yield)**](chapter-6-shorting-yield)
2. [**Hold YT (long yield)**](chapter-8-long-yield-obtain-leveraged-yield-exposure)

Since yields in DeFi are constantly fluctuating, Implied APY on Pendle markets also fluctuates.

As Implied APY fluctuates, the market will swing between two modes:

<figure><img src="/pendle-academy/imgs/image (80).png" alt="" /><figcaption></figcaption></figure>

Hence, if you can time the market well and alternate between selling and buying PT and YT, you can potentially get greater profits. This is essentially swing trading for yield. However, if you are unsure of the yield movements, you can also simply hold the underlying asset to hedge against both sides.

## The 3 modes of the yield market

<figure><img src="/pendle-academy/imgs/image (84).png" alt="" /><figcaption></figcaption></figure>

### **CHEAP PT MODE**

When Implied APY is high (overvalued), PT is cheap with a high fixed APY, **holding PT tends to be the best strategy.**

When holding PT:

* If the market swings and Implied APY falls, examine the Implied APY to determine which mode the market has morphed into, and execute the relevant strategies.
* If all else stays constant, you can hold PT until maturity and redeem the underlying asset, realising the Fixed APY (see Level 2 for fixed yield strategy).

### **EQUILIBRIUM MODE**

When Implied APY is at a reasonable rate, it means that PT and YT prices are both reasonable and the **market is at an equilibrium**.

As such, **any of the three strategies (holding PT, holding YT, or holding the underlying asset)** are all potentially sound.

### **CHEAP YT MODE**

When Implied APY is low (undervalued), YT is cheap with a high Long Yield APY, **holding YT tends to be the best strategy.**

When holding YT:

* If the market swings and Implied APY rises, examine the Implied APY to determine which mode the market has morphed into, and execute the relevant strategies.
* If all else stays constant, you can hold YT until maturity and continue collecting the yield of the asset.

### How to identify the correct mode

The key to identifying the mode is to judge whether the **current Implied APY is overvalued or undervalued**.

> To recap, **Implied APY** is the **average future APY that the market is implying by trading PT and YT at the current prices**.

It boils down to predicting the **average future APY**, then comparing your predictions with the **current Implied APY**. In many cases, it is reasonable to approximate the average future APY to the **underlying APY**.

However, yield can fluctuate by large amounts in rare cases, and the underlying APY might deviate significantly from the actual average future APY.

For example, if a protocol has announced an upcoming APY reduction, the market will likely have priced it in, resulting in a seemingly low Implied Yield and cheap YT.

Ultimately, the deciding factor is **your own outlook on the average future APY** that guides your decisions and determines your success in yield trading.

<Hint style="info">
💡 See also [#how-can-i-predict-the-average-future-apy](chapter-8-long-yield-obtain-leveraged-yield-exposure#how-can-i-predict-the-average-future-apy "mention")
</Hint>

<Hint style="info">
💡 Review when to enter/exit a YT position in [chapter-8-long-yield-obtain-leveraged-yield-exposure.md](chapter-8-long-yield-obtain-leveraged-yield-exposure.md "mention")
</Hint>

### How it works in practice

Suppose it is 1 Jan 2023, and there is a stETH market on Pendle with a **1-year maturity period (1 Jan 2024)**.

**On 1 Jan 2023 (1 year till maturity):**

<figure><img src="/pendle-academy/imgs/image (56).png" alt="" /><figcaption></figcaption></figure>

**On 1 April 2023 (9 months till maturity):**

<figure><img src="/pendle-academy/imgs/image (55).png" alt="" /><figcaption></figcaption></figure>

**On 1 Oct 2023 (3 months till maturity):**

<figure><img src="/pendle-academy/imgs/image (57).png" alt="" /><figcaption></figcaption></figure>

In total, after 9 months, Peepo executed **3 trades** and has **5.301 stETH from a starting principal of 4.3 stETH. This translates into an APY of 32.2%**.

Obviously, the more correct trades Peepo executes, the larger his APY. We can also observe that correct YT trades can lead to large profits. Of course, the inverse is also true, that wrong YT trades can lead to large losses. PT trades, on the other hand, will be lower risk, and lower reward as well.

<Hint style="warning">
**PRO TIP**&#x20;

On top of Implied APY changes due to overall market conditions, there are Implied APY changes simply due to volatility as people buy and sell PT and YT. You can actively trade these movements and switch between PT / YT much more often, which could give larger profits if you do it right.
</Hint>
