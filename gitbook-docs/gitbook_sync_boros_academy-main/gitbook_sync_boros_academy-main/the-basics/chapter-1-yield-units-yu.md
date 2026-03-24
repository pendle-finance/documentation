# Chapter 1 - Yield Units (YU)

{% hint style="success" %}
For those familiar with Pendle V2, YU (Yield Units) on Boros is akin to YT (Yield Tokens) on Pendle V2.
{% endhint %}

{% embed url="https://www.youtube.com/watch?v=JOoJO3ZCo28" %}

## Understanding YU

Boros enables yield trading by creating something called a Yield Unit (YU). YU represents the future yield of an underlying asset until its maturity. Simply put, when you own a YU, you own the rights to the yield that asset generates over a specific period.

For example:

* 5 YU-ETHUSDT-Binance represents yield from funding rates on a 5 ETH position on Binance ETHUSDT.
* 69 YU-BTCUSDT-Hyperliquid represents yield from funding rates on a 69 BTC position on Hyperliquid.

{% hint style="info" %}
Yield Units (or YU) is the core of all actions in Boros. Yield trading on Boros is enabled by entering either a long position or a short position on YU. The goal is to capture differences in expected yield over time.
{% endhint %}

### Implied APR

YU’s price is denoted in “Implied APR”. You can think of this as the cost to purchase YU.

Upon entering a position, the average Implied APR of your entry forms the basis for fixed rate payments.

Another way to look at Implied APR is the market’s expected average funding rate payments from now until maturity.

You can learn more about Implied APR in [Chapter 2](chapter-2-implied-apr-and-underlying-apr.md).

### YU Maturity

Every YU has a maturity date. At maturity, YU no longer receives any yield, and all payment obligations will have been settled.

Example:

In the ETHUSDT-Binance market with a maturity date of December 25, 2026, a trader who buys 5 long YU position will:

1. Receive yield from ETHUSDT Binance equivalent to a 5 ETH position from now until 25-Dec-2026
2. Pay a fixed yield (which is the implied APR at the point of entry) from now until 25-Dec-2026

### YU Value / YU Price

Remember - YU essentially represents the future yield of an asset. As such, the fair value of YU is the sum of total yield you will receive until maturity.

<div align="center" data-full-width="true"><figure><img src="../.gitbook/assets/image (18).png" alt=""><figcaption></figcaption></figure></div>

A trader with a long position in YU-ETHUSDT-Binance for instance will receive yield after every settlement. As such, the value of YU will also decrease after every settlement, since there will be less future yield to account for, assuming Implied APR stays the same. You can learn more about settlement in [Chapter 4](chapter-4-settlement.md).

At maturity, the entire position will have been settled, as there are no more yield obligations. At that point, the value of YU will be zero.

***

Additional notes:

Note that all yields on Boros are denoted in APR terms (i.e. yields are annualized with simple interest calculations, not compound interest) to align with the market standard.

Users familiar with Pendle V2 can think of YU as the YT, where users “pay” the implied yield in exchange for the underlying yield. Yield Units (YU) is used on Boros to represent the funding rate from 1 unit of the collateral asset in the underlying perpetuals exchange (e.g. Hyperliquid, Binance, Deribit, etc).
