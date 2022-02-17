---
sidebar_position: 2
---

# The Basics

**Buy low, sell high.**

Every trader knows this mantra. We buy assets when the price is low, and sell them for a profit when the price pumps. 

Trading yield on Pendle is no different, except instead of looking at the price itself, we look at a derived value known as implied yield. 

## Implied Yield

The math behind implied yield is not too complex, but it is also not absolutely necessary to understand the math to understand how to trade. Click [here](../../dive-deeper/implied-yield.md) to dive deeper.

TL;DR implied yield is the market's evaluation of an asset's yield, as determined by the market price of YT.

A lower YT price implies a lower yield, while a higher YT price implies higher yield. The opposite would be true for OT price.

<figure>
  <img src="/img/pendle-guide/implied-yield.png" alt="Graph" />
  <figcaption>Implied yield of YT-PA/P as displayed on https://app.pendle.finance/market</figcaption>
</figure>

To know when to buy or sell, you just need to compare the yield of the underlying asset versus the implied yield or discount.

If the implied yield is lower than the average expected yield, you are paying less to get the same underlying yield via YT.

If the implied yield is higher than the average expected yield, your YT is worth more than the yield accrued by holding YT.

Knowing all this, you can easily make informed trading decisions on Pendle.

## Case Study

We can see the power of yield trading on Pendle from [Vu's 240K% APY example](https://twitter.com/gabavineb/status/1471782829419745284) that was brought up earlier. Let's see if we can emulate what he did with a more relevant asset. 

Lets say you want to farm stablecoins on Avalanche and you have supplied $1000 of USDC into Benqi, receiving qiUSDC in return. That deposit would net you around 6% APY if you simply let it sit there.

That's not a lot, but Pendle can help to make your wealth work a little harder and squeeze out some extra yield. 

Let's say the implied yield of qiUSDC on Pendle is currently at 4%. If you think that the Benqi yield of 6% will hold in the long term, it means that YT-qiUSDC is currently underpriced.

To convert your qiUSDC to YT-qiUSDC, you can first mint YT and OT from qiUSDC, then sell your OT for USDC and use that to buy YT.

How much of a difference does this make? Using this method, you will actually get an APY of 150%, since you have effectively bought a 6% APY at the price of a 4% APY. That's a huge difference compared to simply holding qiUSDC.

In the case that the implied yield is higher than the actual yield, this means the OT is underpriced and you can simply buy and hold OT to earn the extra APY.

Of course, there is a bit of luck and timing involved, but with the volatility of crypto prices and some number crunching, there will be plenty of opportunities to make quick bucks.

Furthermore, there is a [resource](https://docs.google.com/spreadsheets/d/1D57dlQil37fMIjYRcsuFDsmRvfTe6WmCKlbcr4nPlfY/edit#gid=0) to help you to calculate better understand when these opportunities are present, courtesy of Vu himself.
