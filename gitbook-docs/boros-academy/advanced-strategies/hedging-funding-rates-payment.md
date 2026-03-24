# Hedging Funding Rates Payment

Assuming a positive funding rate environment, traders with a long position on perp exchanges will pay the funding rate at each interval (differs across exchanges).

<figure><img src="../.gitbook/assets/image (33).png" alt=""><figcaption></figcaption></figure>

In the example above, a long position on Binance’s BTCUSDT Perp market will pay 0.0069% or 7.55% APR. However funding rate payments can fluctuate significantly, which can be a significant cost for traders with large position sizes.

Traders can hedge their floating payment exposure to funding rates by swapping it into a fixed payment on Boros. To achieve this, traders with a long position on the underlying perps exchange should open a long YU position on Boros on the same market.

To illustrate how this works:

Let’s use an example of a trader with a long position of 100 BTC on the Binance BTCUSDT market, effectively paying funding rates on 100 BTC while the position remains open.

To hedge this funding rate position, the trader opens a long position of 100 YU-BTCUSDT(Binance) on Boros at an implied APR of 6%.

This long YU position:

* Pays a fixed rate at the implied APR of 6%
* Receives the underlying APR (i.e. the funding rate of the underlying position)

<figure><img src="../.gitbook/assets/image (14).png" alt=""><figcaption></figcaption></figure>

Notice that the trader was initially paying the floating funding rate on Binance. After opening a 100 YU position on Boros, the trader now receives that same floating funding rate payment, while paying a fixed APR of 6%.

This resulted in an aggregate position where the trader has locked in to paying a fixed APR of 6% (i.e. the implied APR when the position was opened) and has removed his exposure to the volatile fluctuations of the floating funding rate.

<figure><img src="../.gitbook/assets/image (15).png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
**A trader looking to hedge their funding rate payment only needs to observe the current implied APR of the asset they are looking to hedge.**

The trader can open a long YU position if the implied APR is favorable to fix their funding rate payments. A lower implied APR will result in a lower fixed APR payable, in other words, a better hedge for the trader.
{% endhint %}

TLDR: To hedge the funding rates exposure of a long position on a perp exchange, you should open a long YU position on Boros of the same notional size.

For example, if you have a 50 ETH long position on ETHUSDT(Hyperliquid), you can hedge the funding rate payments by opening a long position of 50 YU-ETHUSDT(Hyperliquid on Boros).
