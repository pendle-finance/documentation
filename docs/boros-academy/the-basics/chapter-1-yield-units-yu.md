import Hint from '@site/src/components/Hint';

# Chapter 1 - Yield Units (YU)

<Hint style="success">
For those familiar with Pendle V2, YU (Yield Units) on Boros is akin to YT (Yield Tokens) on Pendle V2.
</Hint>

<iframe height="400" width="100%" src="https://www.youtube.com/embed/JOoJO3ZCo28" title="Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

## Understanding YU

Boros enables yield trading by creating something called a Yield Unit (YU). YU represents the future yield of an underlying rate until its maturity. Simply put, when you own a YU, you own the rights to the yield that rate generates over a specific period.

### What rates can YU represent?

Any rate with a reliable oracle feed can be listed on Boros. Today, Boros markets fall into two groups, shown as the **Funding** and **Spread** tabs in the app:

1. **Funding markets.** The funding rate of a single perpetual market on a single exchange. These include:
    * **Crypto perps on centralized exchanges**, such as BTC, ETH and HYPE perps on Binance, OKX, Bybit, Gate and KuCoin
    * **Crypto perps on decentralized exchanges**, such as ETH or HYPE on Hyperliquid and Lighter
    * **Non-crypto perps**, such as Brent oil on Hyperliquid
2. **Spread markets.** The *difference* between two funding rates for the same asset on two exchanges, such as Hyperliquid ETH funding minus Gate ETH funding. See [Spread Markets 101](../advanced-strategies/spread-markets-101).

For example:

* 5 YU-ETHUSDT-Binance represents yield from funding rates on a 5 ETH position on Binance ETHUSDT.
* 69 YU-BTCUSDT-Hyperliquid represents yield from funding rates on a 69 BTC position on Hyperliquid.
* 10 YU of ETH Spread HL-Gate represents the difference between Hyperliquid and Gate ETH funding rates on a 10 ETH position.

<Hint style="info">
Yield Units (or YU) is the core of all actions in Boros. Yield trading on Boros is enabled by entering either a long position or a short position on YU. The goal is to capture differences in expected yield over time.
</Hint>

### Implied APR

YU’s price is denoted in “Implied APR”. You can think of this as the cost to purchase YU.

Upon entering a position, the average Implied APR of your entry forms the basis for fixed rate payments.

Another way to look at Implied APR is the market’s expected average underlying rate (funding rate, or funding rate spread) from now until maturity.

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

Users familiar with Pendle V2 can think of YU as the YT, where users “pay” the implied yield in exchange for the underlying yield. Yield Units (YU) is used on Boros to represent the underlying rate on 1 unit of the collateral asset: the funding rate on a perpetuals exchange (e.g. Hyperliquid, Binance, Deribit, etc), or the funding rate spread between two of them.
