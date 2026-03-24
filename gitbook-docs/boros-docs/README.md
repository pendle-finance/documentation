# Boros Overview

Boros is a yield-trading platform on margin by Pendle. Currently, Boros offers the trading of funding-rates from various avenues, including off-chain funding-rates from centralized exchanges. In the future, Boros will expand to support trading yields of different categories.

<figure><img src=".gitbook/assets/image (9).png" alt=""><figcaption></figcaption></figure>

Boros enables traders to express their view on funding rates. Those bullish on funding rates can open a long position whereas bears can open a short position. Boros also enables those with a floating funding rate exposure to hedge their funding rates payment / receivables.

There are 3 main components within Boros:

### 1. Interest Rate Accounting

To trade a yield of a given asset, Boros has to first obtain its yield-rate via an oracle (e.g. Binance BTCUSDT funding rate, $ATOM staking rate, etc). This yield is referred to as the “Underlying Yield” as the number is obtained from the yield of the underlying asset.

{% hint style="info" %}
As long as there is an oracle feed for a yield percentage, the asset can be supported on Boros.
{% endhint %}

### 2. Interest Rate Trading (YU trading)

**Boros enables the trading of interest rates by representing a floating-yield stream into YU (yield unit).** Each YU represents the yield of 1 unit of the collateral asset in the underlying yield bearing asset.

For example, in a BTCUSDT(Hyperliquid) market on Boros with BTC as collateral, each YU in this market represents the funding rate of 1 BTC in Hyperliquid.

Some use cases:

1. A trader bullish on funding-rate can enter a long position on YU. This position is effectively paying the implied APR in a fixed-stream in exchange for the current funding-rate (i.e. the underlying APR of YU). If the funding-rate yield is higher than the fixed-stream payments, the trader is in profit.
2. A BTC/USDT Binance perp trader can hedge their funding-rate payments by turning it into a fixed-stream payment. To achieve that, they can enter a long position on YU-BTCUSDT(Binance). This is achieved by paying a fixed stream to receive a floating stream of the underlying BTC/USDT funding rate. The results in the trader hedging the funding rate payment into a fixed payment until maturity.
3. A trader with a cash and carry position via perps can lock-in the current rates offered on Boros by entering a short-yield position. A cash and carry position receives funding-rate yields from the perps market. The trader can receive fixed yield by paying the current floating-stream (of funding rates) in exchange for the current fixed-stream payment. The net result of the position is a fixed-yield position until maturity.

### 3. Margin, Liquidations and Risk Parameters

To open a position on Boros, you have to place collaterals based on the desired asset. After which you can either open a long / short position on Boros. If your net balance falls under the maintenance margin, the position will be open for liquidation.
