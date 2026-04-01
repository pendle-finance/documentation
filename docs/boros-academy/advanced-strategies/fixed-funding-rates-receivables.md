import Hint from '@site/src/components/Hint';

# Fixed Funding Rates Receivables

Assuming a positive funding rate environment, traders with a SHORT position on perp exchanges will receive a funding rate payment at every interval (which can differ across exchanges).

<figure><img src="/boros-academy/imgs/image (37).png" alt="" /><figcaption></figcaption></figure>

In the example above, a short position on Binance’s BTCUSDT Perp market will receive 0.0062% or 6.789% APR every 8 hours. However funding rate payments can fluctuate significantly, which can be hedged to receive a fixed APR on Boros.

This is especially useful for entities with large exposure on funding rate APRs, e.g. funding rate basis traders like Ethena.

Traders can hedge their floating funding rate receivables by swapping it into a fixed APR on Boros. To achieve this, traders with a short position on the underlying perps exchange should open a short YU position on Boros on the same market.

To illustrate how this works:

Let’s use an example of Bob with a short position on the Binance BTCUSDT market of 50 BTC, which is effectively receiving funding rates from 50 BTC as long as the position remains open.

To hedge the funding rate receivables, **Bob opens a short position of 50 YU-BTCUSDT(Binance) on Boros at an implied APR of 5%**.

Note that a short YU position:

* Receives a fixed rate of 5%. (The implied APR when opening the position)
* Pays the underlying APR (i.e. the funding rate of the underlying position)

<figure><img src="/boros-academy/imgs/image (16).png" alt="" /><figcaption></figcaption></figure>

Notice that Bob was initially exposed to a floating funding rate yield receivables from Binance. After opening a 50 YU position on Boros, Bob pays the same floating funding rate in exchange for a fixed APR receivable.

This effectively results in an aggregate position where Bob is receiving a fixed APR of 5% (i.e. the implied APR when the position was opened).

<figure><img src="/boros-academy/imgs/image (17).png" alt="" /><figcaption></figcaption></figure>

<Hint style="info">
**A trader looking to hedge their funding rate receivables only needs to observe the current implied APR of the asset they are looking to hedge.**

The trader can open a short YU position if the implied APR is favorable to fix their funding rate yields. A higher implied APR will result in a higher fixed APR receivables, in other words, a better fixed income for the trader.
</Hint>

TLDR: To hedge the funding rates receivables of a short position on a perp exchange, you should open a short YU position on Boros of the same notional size.

For example, if you have a 20 ETH short position on ETHUSDT(Hyperliquid), you can hedge the funding rate receivables by opening a short position of 20 YU-ETHUSDT(Hyperliquid) on Boros.
