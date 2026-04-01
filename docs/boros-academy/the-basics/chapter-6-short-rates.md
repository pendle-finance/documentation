# Chapter 6 - Short Rates

A short position is the exact opposite of a long one. If you expect the yield of BTCUSDT-Binance to decrease, you would enter a short position on its YU.

Similarly, you can profit from a short position in YU from:

1. Decline in Underlying APR
2. Decline in Implied APR

## Decline in Underlying APR

<figure><img src="/boros-academy/imgs/image (50).png" alt="" /><figcaption></figcaption></figure>

When you open a short position on Boros, you commit to paying the floating Underlying APR. In return, you receive a Fixed APR, determined by the average Implied APR at the time you enter the position.

Essentially, you are betting that the Fixed APR that you have locked in will exceed the total Underlying APR you will end up paying.

During each settlement, your yield payment will be based on the YU’s Underlying APR, or funding rate in this case. You profit when the total yield earned (Fixed APR) surpasses the total yield you have paid (Underlying APR).

**For example:**

Dylan enters a short position in 5 YU-BTCUSDT-Binance at 10% Implied APR.

At maturity (or when the position is closed), if the average Implied APR upon entry > average Underlying APY, Dylan will profit.

In other words, Dylan will have collected more yield than what he will have paid.

_Total Profit = (Fixed Yield Collected - Underlying Yield Paid)_

## Decline in Implied APR

You can also profit by “buying high, selling low” with a short position, that is by closing off your YU position at a lower Implied APR.

**For example:**

Dylan enters a short position in 5 YU-BTCUSDT-Binance at 10% Implied APR.

After 3 rounds of settlement, Implied APR of YU-BTCUSDT-Binance drops to 2% Implied APR.

At this point, Dylan could opt to close his position before maturity at a lower “price”, which is beneficial for traders in a short position.

_Total Profit = (Fixed Yield Collected - Underlying Yield Paid)+ Profit from YU Sale_

Instead of holding to maturity, this strategy employs a more active approach in market timing to exit your position when the Implied APR (market value of YU) is lower than your entry, allowing you to capture both:

1. Yield Profits
2. Capital Gain from YU Trading
