import Hint from '@site/src/components/Hint';

# Chapter 2 - Implied APR and Underlying APR

Trading on Boros shares similarities with trading on perpetuals exchanges (perps), but with a twist. Instead of betting on the price movements of assets, Boros traders bet on the movements of yield.

On a typical perp exchange:

* A long position profits when the asset's _price_ rises after opening a position.
* A short position profits when the asset's _price_ falls after opening a position.

On Boros:

* A long position in YU benefits when the _implied APR_ increases after opening a position.
* A short position in YU benefits when the _implied APR_ decreases after opening a position.

In other words, YU on Boros also has a _price_, denoted in yield terms. This is called “Implied APR”, essentially the _price_ that you pay to receive the underlying yield of the asset.

Just like how the price of BTC is the market’s valuation of the asset, Implied APR on Boros can be thought of as the market’s expectation on what the average yield of the asset is going to be until maturity.

<Hint style="success">
The Implied APR of a YU can also be thought of as the market consensus on what the average yield of the asset is going to be until maturity (assuming a rational market).
</Hint>

## Understanding Implied APR

**Upon entering a position, the Implied APR at that point in time locks in as your Fixed APR until maturity.** This rate remains constant, regardless of any future fluctuations in the Implied APR.

Long YU example:

Suppose the current Implied APR of YU-ETHUSDT-Binance is 5%, by entering a _**long**_ position:

* You commit to paying 5% APR until maturity, or until the position is closed
* Any subsequent changes in the Implied APR, decrease or increase, will NOT affect your locked-in rate (i.e. Fixed APR)

Short YU example:

Conversely, suppose the current Implied APR of YU-ETHUSDT-Binance is 5%, by entering a _**short**_ position:

* You will receive 5% APR until maturity, or until the position is closed
* Any subsequent changes in the Implied APR, decrease or increase, will NOT affect your locked-in rate (i.e. Fixed APR)

<Hint style="warning">
Notice that Implied APR is the “price” of YU, and when you open a long position on YU, you are paying the implied APR at the point of entry, which is the “price”.

This is similar to when you open a long position on BTC, you are paying the price of BTC at the point of entry.

Vice versa for a short position.
</Hint>

## Understanding Underlying APR

<figure><img src="/boros-academy/imgs/image (2).png" alt="" /><figcaption></figcaption></figure>

When you hold a long position on a YU, you receive the APR of the underlying asset. This is referred to as the “Underlying APR”.

For instance, if you hold a long position in 2 YU-BTCUSDT-Hyperliquid, you receive the yield from funding rate 2 BTC on Hyperliquid.

The key to trading YU effectively lies in comparing the current market's Implied APR to your expectations for the Underlying APR until maturity.

<Hint style="success">
**Long YU:** If the current Implied APR is lower than your expectations of Underlying APR, it suggests that the YU might be undervalued or cheap.

**Short YU:** Conversely, if the current Implied APR is higher than your expectations Underlying APR, it suggests that the YU might be overvalued or expensive.
</Hint>

***
