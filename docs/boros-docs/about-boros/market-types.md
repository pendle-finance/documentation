# Market Types

Every Boros market trades one floating rate against a fixed rate until maturity. What changes from one market to the next is the rate. The trading mechanics stay the same. Boros currently lists two types of markets, shown under the **Funding** and **Spread** tabs on the markets page.

The order book, [margin and liquidations](../boros-systems/margin-and-liquidations), [fees](../boros-systems/fees) and [protective mechanisms](../boros-systems/protective-mechanism) work the same way across both types.

## Funding Markets

The underlying rate is the funding rate of a single perpetual market on a single exchange.

| | |
| --- | --- |
| **Underlying APR** | The funding rate of the referenced perp market, annualised |
| **1 YU represents** | The funding earned on 1 unit of collateral, e.g. 1 BTC of notional on Binance BTCUSDT |
| **Settlement cadence** | Matches the exchange's funding interval, e.g. every 8 hours on Binance or every hour on Hyperliquid |
| **Oracle** | The exchange's funding rate, validated on-chain (see [Rate Settlement](./rate-settlement#the-underlying-rate-oracle)) |
| **Example** | BTCUSDT (Binance) |

## Spread Markets

The underlying rate is the difference between two funding rates on the same asset: **Rate A − Rate B**. The exchange listed first is usually the one with the historically higher funding rate.

| | |
| --- | --- |
| **Underlying APR** | Funding rate of exchange A − funding rate of exchange B, annualised. It can be negative. |
| **1 YU represents** | The spread earned on 1 unit of collateral, e.g. 1 BTC of notional on both venues |
| **Settlement cadence** | Matches the less frequent of the two exchanges |
| **Oracle** | The two existing funding rate feeds of the legs |
| **Example** | BTC Spread HL-Gate (Hyperliquid BTC funding − Gate BTC funding) |

See [Spread Markets](./spread-markets) for how Spread Markets work in detail.
