---
sidebar_position: 4
---

# Compounded Yield

Leverage is a common concept in crypto. You loop lending and borrowing to increase your exposure to the price of an asset, so that when its price increase 100x, you will profit 300x.

One big risk here though - you're "leveraged to the tits", as it were. On the off-chance that the price actually drops, your entire portfolio can potentially get liquidated, leaving you with next to nothing.

With Pendle, you can leverage your exposure to the yield of a yield-bearing asset without any borrowing, meaning that there's **no liquidation risk** and you can multiply your profits without risking more than what you invest if you are **bullish** on yield.

![Literally cannot go tits up](/img/pendle-guide/literally.png)

To leverage, you simply buy YT. YT is **capital efficient**, as you can buy more YT with the same amount of capital since it always costs less than the underlying asset. Holding more YT entitles you to more units of the asset yield, thus increasing your exposure to the yield.

## Case Study

Anton is a savvy trader. Anton looks at the 3% lending rates for USDC on Aave and thinks, that will increase to 5% by EOY as demand for stablecoins will increase with an overall bearish market.

<figure>
  <img src="/img/pendle-guide/case-study-5.png" alt="Graph" />
  <figcaption>USDC on Aave</figcaption>
</figure>

Let's say Anton has 1,000 USDC. If Anton simply deposits his USDC into Aave, he will receive 1,000 aUSDC in return, and by EOY, if his predictions come true, he will have 1,050 aUSDC, a 5% yield.

Instead, he can go to Pendle and buy YT-aUSDC priced at $0.03. (Why $0.03? Click [here](../../dive-deeper/implied-yield.md) to learn more about fair price.) With 1,000 USDC, he can buy 33,333 YT-aUSDC - that's more than 33x leverage.

By EOY when the YT expires, he will have accrued 33,333 units worth of aUSDC yield, which will be $0.05. In total, he has accrued 33,333 x 0.05 = 1667 aUSDC, giving an APY of 67%.

The 2% increase in Aave lending rates was multiplied by 33x for Anton due to his exposure to aUSDC yield via holding YT. That's the power of leverage on Pendle - all without any form of borrowed capital.