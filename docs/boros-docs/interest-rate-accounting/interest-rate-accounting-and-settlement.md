# Interest Rate Accounting and Settlement

Currently, Boros facilitates trading in Yield Units (YUs) of funding rates, with settlement intervals that mirror the underlying market’s schedule. For example:

* On Binance, funding rates are settled every 8 hours. Correspondingly, Binance YUs on Boros are settled on the same 8-hour schedule.
* For Hyperliquid, funding rates are settled every hour, thus Hyperliquid YUs on Boros are also settled hourly.

<figure><img src="/boros-docs/imgs/image (2).png" alt="" /><figcaption></figcaption></figure>

At each settlement period, Boros obtains the underlying APR (funding rate) via an oracle and settles it against every user’s fixed APR.

A user’s fixed APR is determined by the average implied APR upon opening a position. When the user opens a new position, the new fixed APR is the average implied APR of opening the position.

### At every settlement

Boros settles the underlying rate against every user’s fixed rate.

1. **Long YU:** the user **pays fixed APR and receives the underlying APR** (essentially betting on the underlying rate being HIGHER than the fixed payments). For example, if the user opened a long YU position at an implied APR of 8% and the underlying APR is currently 10%, they will receive rates of 2% (scaled down to the settlement period).
2. **Short YU:** the user **pays the underlying APR and receives a fixed APR** (essentially betting on the underlying rate being LOWER than the fixed payments). For example, if the user opened a short YU position at implied APR of 20% and the underlying rate is currently 25%, they will lose rates of 5% (scaled down to the settlement period).

The difference in the underlying and fixed APR is realized and will be reflected in every user’s collateral.

1. Positions that received more than they paid will see an increase in their collateral value.
2. Positions that received less than they paid will see a decline in their collateral value.

Assuming the implied APR remains the same, the position’s value declines as a portion of the position is already realized into the collateral (i.e. YU’s value declines as there are less yield remaining to settle until maturity).

The maintenance margin also declines as the position is now worth less than before the settlement (i.e. since the value of each YU is now lower, less margin is now required to maintain the same position). Maintenance margin will decline until the margin floor.

### At maturity

1. Total position value is zero as the whole position is already realized.
2. Collateral is fully freed.
