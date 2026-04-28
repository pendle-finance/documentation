import Hint from '@site/src/components/Hint';

# Chapter 5 - Long Rates

If you're expecting funding rates of BTCUSDT-Binance to increase - you would long its YU market on Boros.

Here’s how you can profit from a long position in YU:

1. Increase in Underlying APR
2. Increase in Implied APR

## Increase in Underlying APR

<figure><img src="/boros-academy/imgs/image (12).png" alt="" /><figcaption></figcaption></figure>

In a long position, you are essentially speculating that the Underlying APR will exceed the Fixed APR (determined by the average Implied APR at the time of entry) that you have committed to paying. This Underlying APR represents the actual yield you will receive during the position’s duration.

During each settlement, you receive yield based on the YU’s Underlying APR (i.e. the funding rate). For BTCUSDT-Binance, this would be the funding rate payments from this market. You profit when the total yield earned (Underlying APR) surpasses the total yield you have paid (Fixed APR).

**For example:**

Peepo enters a long position in 2 YU-BTCUSDT-Binance at 10% Implied APR.

This means that Peepo has committed to paying a 10% Fixed Rate, while receiving the Underlying APR (funding rate payments) equivalent to a 2 BTC position in Binance BTCUSDT.

At maturity (or when the position is closed), if the average Underlying APR > average Implied APR upon entry, Peepo will profit.

In other words, Peepo will have collected more yield than what he will have paid.

_Total Profit = (Underlying Yield Collected - Fixed Yield Paid)_

## Increase in Implied APR

Note that Implied APR is the price of YU.

This is akin to the principle of “buy low, sell high”. A trader with BTC, for instance, can profit by selling off BTC at a higher price.

Similarly, you can also profit by closing your YU position and “selling off” when its Implied APR (essentially its price) increases.

<Hint style="warning">
**Important**

Unlike token prices which floor at \$0, YUs do not have a price floor. Implied APR can go deeply negative. A long position entered at 10% Implied APR for instance can see its Implied APR drop to -100% or beyond, with no lower bound.

Each percentage point of that decline works against your margin at the rate of your Rate Sensitivity. Always account for this when sizing your position and assessing your margin runway before entering.

<figure><img src="/boros-academy/imgs/no-price-floor-ch5.png" alt="" /><figcaption></figcaption></figure>
</Hint>

**For example:**

<figure><img src="/boros-academy/imgs/long-rates-example-ch5.png" alt="" /><figcaption></figcaption></figure>

Peepo enters a long position of 5 YU-BTCUSDT-Hyperliquid at 3.2% Implied APR.

After a while, Implied APR increases by 2% to 5.2% Implied APR.

At this point, Peepo could opt to sell off his YUs (i.e. close his position) before maturity at a higher price.

_Total Profit = (Underlying APR Collected - Fixed APR Paid) + Profit from YU Sale (2 x Rate Sensitivity)_

**Instead of holding to maturity, this strategy leverages market timing to exit your position when the Implied APR (market value of YU) is higher than your entry, allowing you to capture both:**

1. Yield Profits
2. Capital Appreciation
