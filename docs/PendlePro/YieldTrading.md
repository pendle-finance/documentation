
# ELI15: Yield Trading

By separating the yield from the asset, Pendle enables users to trade yield, unlocking a wide variety of strategies that asset holders can choose from. This is the core functionality of Pendle.

Besides securing high yields, you can also get massive discounts on assets, as well as earn additional yield on top of already insane APYs.

With V2 architecture, your yield trading potential is further improved, with reduced slippage and impermanent loss thanks to the new AMM.

## The Basics

**Buy low, sell high.**

Every trader knows this mantra. We buy assets when the price is low, and sell them for a profit when the price pumps.

Trading yield on Pendle is no different, except instead of looking at the price itself, we look at a derived value known as implied yield.

### Implied Yield

The maths behind implied yield is a little more involved, but it is also not absolutely necessary to understand the maths to understand how to trade. Refer to the appendix to dive deeper.

TL;DR: implied yield is the market's evaluation of an asset's yield, as determined by the market price of YT.

A lower YT price implies a lower yield, while a higher YT price implies higher yield. The opposite would be true for PT price.

<!-- <p id="gdcalert5" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image5.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert6">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

![alt_text](images/image5.png "image_tooltip") -->

_Implied yield of YT-PA/P_

To know when to buy or sell, you just need to compare the yield of the underlying asset versus the implied yield or discount.

If the implied yield is lower than the average expected yield, you are paying less to get the same underlying yield via YT.

If the implied yield is higher than the average expected yield, your YT is worth more than the yield accrued by holding YT.

Knowing all this, you can easily make informed trading decisions on Pendle.

### Case Study

We can see the power of yield trading on Pendle from[Vu's 240K% APY example](https://twitter.com/gabavineb/status/1471782829419745284). Let's see if we can emulate what he did with a more relevant asset.

Let’s say you want to farm stablecoins on Avalanche and you have supplied $1000 of USDC into Benqi, receiving qiUSDC in return. That deposit would net you around 6% APY if you simply let it sit there.

That's not a lot, but Pendle can help to make your wealth work a little harder and squeeze out some extra yield.

Let's say the implied yield of qiUSDC on Pendle is currently at 4%. If you think that the Benqi yield of 6% will hold in the long term, it means that YT-qiUSDC is currently underpriced.

To convert your qiUSDC to YT-qiUSDC, you can first mint YT and PT from qiUSDC, then sell your PT for USDC and use that to buy YT.

How much of a difference does this make? Using this method, you will actually get an APY of 150%, since you have effectively bought a 6% APY at the price of a 4% APY. That's a huge difference compared to simply holding qiUSDC.

In the case that the implied yield is higher than the actual yield, this means the PT is underpriced and you can simply buy and hold PT to earn the extra APY.

Of course, there is a bit of luck and timing involved, but with the volatility of crypto prices and some number crunching, there will be plenty of opportunities to make quick bucks.

### Appendix

Copy paste: [https://docs.pendle.finance/docs/information/dive-deeper/implied-yield](https://docs.pendle.finance/docs/information/dive-deeper/implied-yield)

## Fixed Yield

Also known as 'Lock Yield' or 'Capture Yield'.

With variable yield assets, APYs can spike to unusually high values. These spikes are not uncommon, but they don't last for very long.

Pendle enables users to fix your future yield at current rates, which is very useful if you are bearish on yield - you believe that current APY is unsustainable and will fall in the future.

To do this, you would want to convert all of the underlying asset to its PT equivalent. This can be achieved in two ways.

* If you already hold the underlying asset, deposit it into Pendle to mint YT and PT, sell the YT and buy more PT.
* If you don't have any underlying tokens or wish to increase your exposure to the asset, you can simply buy PT outright.

So you might be wondering, how does holding PT instead of the asset help you to capture high APY? Let's find out in the next section.

### Case Study

Dan notices that lending interest for $AVAX on Benqi, which usually sits around 8%, has spiked to **15%**. To take advantage of this, he wants to buy PT-qiAVAX with 1 year expiry, which is trading at ~87% the price of $AVAX. (Why 87%?[Click](https://docs.pendle.finance/docs/information/dive-deeper/implied-yield) here to learn more about the fair price.)

Let's say he has 100 $AVAX and buys ~115 PT-qiAVAX. After a year, when the contract expires, he will be able to redeem 115 PT-qiAVAX for 115 qiAVAX, giving an APY of **15%**.

If he instead deposited his 100 $AVAX in BenQI directly, the lending rates would have regressed to its average of 8%, and he would have only gotten 108 qiAVAX in a year, or **8%** APY.

By buying PT, he "locks in" the high prevailing APY, allowing him to take full advantage of the spike, even if the actual APY falls afterwards.

## Compounded Yield

Leverage is a common concept in crypto. You loop lending and borrowing to increase your exposure to the price of an asset, so that when its price increases 100x, you will profit 300x.

One big risk here though - you're "leveraged to the tits", as it were. On the off-chance that the price actually drops, your entire portfolio can potentially get liquidated, leaving you with next to nothing.

With Pendle, you can leverage your exposure to the yield of a yield-bearing asset without any borrowing, meaning that there's **no liquidation risk** and you can multiply your profits without risking more than what you invest if you are **bullish** on yield.

<!-- <p id="gdcalert6" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image6.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert7">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

![alt_text](images/image6.png "image_tooltip") -->

_Literally cannot go tits up_

To leverage, you simply buy YT. YT is **capital efficient**, as you can buy more YT with the same amount of capital since it always costs less than the underlying asset. Holding more YT entitles you to more units of the asset yield, thus increasing your exposure to the yield.

### Case Study

Anton is a savvy trader. Anton looks at the 3% lending rates for USDC on Aave and thinks that it will increase to 5% by EOY as demand for stablecoins will increase with an overall bearish market.

<!-- <p id="gdcalert7" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image7.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert8">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

![alt_text](images/image7.png "image_tooltip") -->

_USDC on Aave_

Let's say Anton has 1,000 USDC. If Anton simply deposits his USDC into Aave, he will receive 1,000 aUSDC in return, and by EOY, if his predictions come true, he will have 1,050 aUSDC, a 5% yield.

Instead, he can go to Pendle and buy YT-aUSDC priced at $0.03. (Why $0.03? Click[here](https://docs.pendle.finance/docs/information/dive-deeper/implied-yield) to learn more about Fair Price) With 1,000 USDC, he can buy 33,333 YT-aUSDC - that's more than 33x leverage.

By EOY when the YT expires, he will have accrued 33,333 units worth of aUSDC yield, which will be $0.05. In total, he has accrued 33,333 x 0.05 = 1667 aUSDC, giving an APY of 67%.

The 2% increase in Aave lending rates was multiplied by 33x for Anton due to his exposure to aUSDC yield via holding YT. That's the power of leverage on Pendle - all without any form of borrowed capital.
