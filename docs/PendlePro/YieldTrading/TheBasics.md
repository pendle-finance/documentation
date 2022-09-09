---
hide_table_of_contents: true
---

# The Basics

**Buy low, sell high.**

Every trader knows this mantra. We buy assets when the price is low, and sell them for a profit when the price pumps.

Trading yield on Pendle is no different, except instead of looking at the price itself, we look at a derived value known as implied yield.

## Implied Yield

The maths behind implied yield is a little more involved, but it is also not absolutely necessary to understand the maths to understand how to trade. Refer to the appendix to dive deeper. .// TODO

TL;DR: implied yield is the market's evaluation of an asset's yield, as determined by the market price of YT.

A lower YT price implies a lower yield, while a higher YT price implies higher yield. The opposite would be true for PT price.


<figure>
  <img src="/img/pendlepro/implied_yield.png" alt="Implied yield of YT-PA/P" />
  <figcaption>Implied yield of YT-PA/P</figcaption>
</figure>

To know when to buy or sell, you just need to compare the yield of the underlying asset versus the implied yield or discount.

If the implied yield is lower than the average expected yield, you are paying less to get the same underlying yield via YT.

If the implied yield is higher than the average expected yield, your YT is worth more than the yield accrued by holding YT.

Knowing all this, you can easily make informed trading decisions on Pendle.

## Case Study

We can see the power of yield trading on Pendle from[Vu's 240K% APY example](https://twitter.com/gabavineb/status/1471782829419745284). Let's see if we can emulate what he did with a more relevant asset.

Let’s say you want to farm stablecoins on Avalanche and you have supplied $1000 of USDC into Benqi, receiving qiUSDC in return. That deposit would net you around 6% APY if you simply let it sit there.

That's not a lot, but Pendle can help to make your wealth work a little harder and squeeze out some extra yield.

Let's say the implied yield of qiUSDC on Pendle is currently at 4%. If you think that the Benqi yield of 6% will hold in the long term, it means that YT-qiUSDC is currently underpriced.

To convert your qiUSDC to YT-qiUSDC, you can first mint YT and PT from qiUSDC, then sell your PT for USDC and use that to buy YT.

How much of a difference does this make? Using this method, you will actually get an APY of 150%, since you have effectively bought a 6% APY at the price of a 4% APY. That's a huge difference compared to simply holding qiUSDC.

In the case that the implied yield is higher than the actual yield, this means the PT is underpriced and you can simply buy and hold PT to earn the extra APY.

Of course, there is a bit of luck and timing involved, but with the volatility of crypto prices and some number crunching, there will be plenty of opportunities to make quick bucks.

## Appendix

YT price responds to market demand and can serve as an indication of market sentiment on yields. However, YT price decays through time and it can be difficult to gauge its market value just by looking at the price.

Implied yield is the annual yield on the underlying asset that the market is implying by the current price of YT. Implied yield allows for quick comparisons of the value of YT against the current yield of the underlying.

$$$
\text{Implied Yield} = \left[\left(1 + \cfrac{\text{PriceOfYT}}{\text{ValueOfUnderlying} - \text{PriceOfYT}}\right)\right]^{\cfrac{365}{\text{Days to expiry}}} - 1
$$$

For example, if YT-aUSDC-0.5Year is trading at $0.05, the market is collectively saying that aUSDC annual yield for the next half a year is 9.75% per year.

### Pricing

From the concept of implied yield, we can also derive a theoretical market equilibrium for YT and OT, given that the asset APY and price remains constant. We can establish two equations, assuming that the market is perfectly efficient, such that

$$$
CurrentAPY = ImpliedYield
$$$

The first one is simple, the sum of YT and OT prices should equal the price of the underlying, since 1 unit of YT and 1 unit of OT together can be redeemed for 1 unit of the underlying asset.

$$$
(1)\, YT + OT = underlying
$$$

The second equation is slightly more involved, saying that the ratio of OT and YT price is equal to the ratio of underlying to yield. This is so that the APY of OT and YT remains the same, following the perfect market assumption.

$$$
(2)\, OT : YT = underlying : yield
$$$

To determine market equilibrium prices for OT and YT, you simply have to plug in the underlying and yield values, and solve for OT and YT.

Let's use qiAVAX as an example, with Pendle contract expiry of 2 years, given that $AVAX is at $90 and BENQI Supply APY is currently 10%.

Using $AVAX price, we can plug it into (1) to get the first of our two simultaneous equations.

$$$
(3)\, YT + OT = 90
$$$

Then, we calculate the yield for two years

$$$
TwoYearYield = \left(\cfrac{10}{100} + 1\right)^\cfrac{730}{365} - 1 = 0.21 \approx 20%
$$$

which we can plug it into (2) to get our second simultaneous equation.

$$$
(4)\,  OT : YT = 100\% : 20\% = 5 : 1
$$$

With (3) and (4), we solve for OT and YT, giving us

$$$
OT = 75 \\
YT = 15
$$$

Therefore, at the given $AVAX price and BENQI supply APY, market equilibrium price is $75 for OT and $15 for YT. Of course, these values are purely theoretical and assume that other variables remain constant. However it can be used as a rough guide to compare OT and YT prices against underlying prices.
