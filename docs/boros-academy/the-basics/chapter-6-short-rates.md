import Hint from '@site/src/components/Hint';

# Chapter 6 - Short Rates

If you're expecting funding rates of BTCUSDT-Binance to decrease - you would short its YU market on Boros.

Here’s how you can profit from a short position in YU:

1. Decline in Underlying APR
2. Decline in Implied APR

## Decline in Underlying APR

<figure><img src="/boros-academy/imgs/image (50).png" alt="" /><figcaption></figcaption></figure>

When you open a short position on Boros, you commit to paying the floating Underlying APR. In return, you receive a Fixed APR, determined by the average Implied APR at the time you enter the position.

Essentially, you are betting that the Fixed APR that you have locked in will exceed the total Underlying APR you will end up paying.

During each settlement, your yield payment will be based on the YU’s Underlying APR, or funding rate in this case. You profit when the total yield earned (Fixed APR) surpasses the total yield you have paid (Underlying APR).

**For example:**

Peepo enters a short position in 5 YU-BTCUSDT-Binance at 10% Implied APR.

At maturity (or when the position is closed), if the average Implied APR upon entry > average Underlying APR, Peepo will profit.

In other words, Peepo will have collected more yield than what he will have paid.

_Total Profit = (Fixed Yield Collected - Underlying Yield Paid)_

## Decline in Implied APR

Note that Implied APR is the price of YU.

This is akin to the principle of “buy high, sell low” with a short — you profit when the price of YU drops below your entry.

Similarly, you can also profit by closing your YU position when its Implied APR (essentially its price) decreases.

<Hint style="warning">
**Important**

Unlike token prices which floor at \$0, YUs do not have a price floor. Implied APR can go deeply negative, and on the upside there is no upper bound either. A short position entered at 10% Implied APR can see its Implied APR climb to 100%, 200% or beyond, with no upper bound.

Each percentage point of that increase works against your margin at the rate of your Rate Sensitivity. Always account for this when sizing your position and assessing your margin runway before entering.

<figure><img src="/boros-academy/imgs/no-price-ceiling-ch6.png" alt="" /><figcaption></figcaption></figure>
</Hint>

**For example:**

<figure><img src="/boros-academy/imgs/short-rates-example-ch6.png" alt="" /><figcaption></figcaption></figure>

Peepo enters a short position of 5 YU-BTCUSDT-Hyperliquid at 5.2% Implied APR.

After a while, Implied APR decreases by 2% to 3.2% Implied APR.

At this point, Peepo could opt to close his position before maturity at a lower “price”, which is beneficial for traders in a short position.

_Total Profit = (Fixed APR Collected - Underlying APR Paid) + Profit from YU Sale (2 x Rate Sensitivity)_

**Instead of holding to maturity, this strategy leverages market timing to exit your position when the Implied APR (market value of YU) is lower than your entry, allowing you to capture both:**

1. Yield Profits
2. Capital Gain from YU Trading
