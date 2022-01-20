---
sidebar_position: 1
---

# Implied Yield

YT price responds to market demand and can serve as an indication of market sentiment on yields. However, YT price decays through time and it can be difficult to gauge its market value just by looking at the price.

Implied yield is the annual yield on the underlying asset that the market is implying by the current price of YT. Implied yield allows for quick comparisons of the value of YT against the current yield of the underlying.

$$$
\text{Implied Yield} = \left[\left(1 + \cfrac{\text{PriceOfYT}}{\text{ValueOfUnderlying} - \text{PriceOfYT}}\right)\right]^{\cfrac{365}{\text{Days to expiry}}} - 1
$$$

For example, if YT-aUSDC-0.5Year is trading at $0.05, the market is collectively saying that aUSDC annual yield for the next half a year is 9.75% per year.

## Pricing

From the concept of implied yield, we can also derive a theoretical market equilibrium for YT and OT, given that the asset APY and price remains constant. We can establish two equations, assuming that the market is perfectly efficient, such that

$$$
CurrentAPY = ImpliedYield
$$$

The first one is simple, the sum of YT and OT prices should equal the price of the underlying, since 1 unit of YT and 1 unit of OT together can be redeemed for 1 unit of the underlying asset.

$$$
YT + OT = underlying
$$$

The second equation is slightly more involved, saying that the ratio of OT and YT price is equal to the ratio of underlying to yield. This is so that the APY of OT and YT remains the same, following the perfect market assumption.

$$$
OT : YT = underlying : yield
$$$

To determine market equilibrium prices for OT and YT, you simply have to plug in the underlying and yield values, and solve for OT and YT.

Let's use wMEMO as an example, with Pendle contract expiry of 2 months, given that $TIME is at $3600 and Wonderland APY is currently 80,000%.

Using $TIME price, we can plug it into (1) to get the first of our two simultaneous equations.

$$$
YT + OT = 3600
$$$

Then, we calculate the yield for two months

$$$
TwoMonthYield = \left(\cfrac{80000}{100} + 1\right)^\cfrac{60}{365} - 1 = 2.001 \approx 200%
$$$

which we can plug it into (2) to get our second simultaneous equation.

$$$
OT : YT = 100\% : 200\% = 1 : 2
$$$

With (3) and (4), we solve for OT and YT, giving us

$$$
OT = 1200 \\
YT = 2400
$$$

Therefore, at the given $TIME price and Wonderland APY, market equilibrium price is $1200 for OT and $2400 for YT. Of course, these values are purely theoretical and assumes that other variables remain constant, however it can be used as a rough guide to compare OT and YT prices against.
