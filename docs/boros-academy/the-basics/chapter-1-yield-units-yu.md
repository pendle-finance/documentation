import Hint from '@site/src/components/Hint';

# Chapter 1 - Yield Units (YU)

<Hint style="success">
For those familiar with Pendle V2, YU (Yield Units) on Boros is akin to YT (Yield Tokens) on Pendle V2.
</Hint>

<iframe height="400" width="100%" src="https://www.youtube.com/embed/JOoJO3ZCo28" title="Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

## Understanding YU

Boros enables yield trading by creating something called a Yield Unit (YU). YU represents the future yield of an underlying asset until its maturity. Simply put, when you own a YU, you own the rights to the yield that asset generates over a specific period.

For example:

* 5 YU-ETHUSDT-Binance represents yield from funding rates on a 5 ETH position on Binance ETHUSDT.
* 69 YU-BTCUSDT-Hyperliquid represents yield from funding rates on a 69 BTC position on Hyperliquid.

<Hint style="info">
Yield Units (or YU) is the core of all actions in Boros. Yield trading on Boros is enabled by entering either a long position or a short position on YU. The goal is to capture differences in expected yield over time.
</Hint>

### Implied APR

YU’s price is denoted in “Implied APR”. You can think of this as the cost to purchase YU.

Upon entering a position, the average Implied APR of your entry forms the basis for fixed rate payments.

Another way to look at Implied APR is the market’s expected average funding rate payments from now until maturity.

You can learn more about Implied APR in [Chapter 2](chapter-2-implied-apr-and-underlying-apr).

### Maturity

Every market has a maturity date. At maturity, your position no longer receives any yield, and all payment obligations will have been settled.

Example:

In the ETHUSDT-Binance market with a maturity date of December 25, 2026, a trader who enters a 5 long YU position will:

1. Receive yield from ETHUSDT Binance equivalent to a 5 ETH position from now until 25-Dec-2026
2. Pay a fixed yield (which is the implied APR at the point of entry) from now until 25-Dec-2026

***

Additional notes:

Note that all yields on Boros are denoted in APR terms (i.e. yields are annualized with simple interest calculations, not compound interest) to align with the market standard.

Users familiar with Pendle V2 can think of YU as the YT, where users “pay” the implied yield in exchange for the underlying yield. Yield Units (YU) is used on Boros to represent the funding rate from 1 unit of the collateral asset in the underlying perpetuals exchange (e.g. Hyperliquid, Binance, Deribit, etc).
