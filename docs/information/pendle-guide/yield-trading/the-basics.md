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
  <figcaption>Implied yield of YT-PA/P as displayed on the [Market](https://app.pendle.finance/market)</figcaption>
</figure>

To know when to buy or sell, you just need to compare the yield of the underlying asset versus the implied yield or discount.

If the implied yield is lower than the average expected yield, you are paying less to get the same underlying yield via YT.

If the implied yield is higher than the average expected yield, your YT is worth more than the yield accrued by holding YT.

Knowing all this, you can easily make informed trading decisions on Pendle.

## Case Study

We can see the power of yield arbitrage on Pendle from [Vu's 240K% APY example](https://twitter.com/gabavineb/status/1471782829419745284) that was brought up in the previous page. Let's take a look at what he did.

![Case Study 1](/img/pendle-guide/case-study-1.png)

Okay, simple enough, he mints YT and OT by depositing wMEMO into Pendle. 

<figure>
  <img src="/img/pendle-guide/case-study-2.png" alt="Graph" />
  <figcaption>MIM to *YT-wMEMO, pardon the typo</figcaption>
</figure>

Pause. Here's where the action happens.

At the time of the trade, YT-wMEMO was trading with an implied yield of just 20K%. Compared to Wonderland's APY at the time, which was 80K%, that's a massive discount! As a reference, YT-wMEMO generally traded at twice the price of OT-wMEMO at that point in time.

So how does this translate to 6-digit APY?

![Case Study 3](/img/pendle-guide/case-study-3.png)

In total, Vu now holds 0.96 YT-wMEMO, which will produce 2.44 MEMO of yield at Wonderland's 80K% APY up till expiry.

Getting 2.44 MEMO returns from 0.56 MEMO is a whopping 430% upside in just two months! Doing a little bit more math gets you to the promised wonderland of 240K% APY.

Of course, there is a bit of luck and timing involved, but with the volatility of crypto prices, there will be plenty of opportunities to make quick bucks.

Furthermore, there is a [resource](https://docs.google.com/spreadsheets/d/1D57dlQil37fMIjYRcsuFDsmRvfTe6WmCKlbcr4nPlfY/edit#gid=0) to help you to calculate better understand when these opportunities are present, courtesy of the man himself.

![Case Study 3](/img/pendle-guide/case-study-4.png)
