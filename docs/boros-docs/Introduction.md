import Hint from '@site/src/components/Hint';

# Boros Overview

Boros is a rate-trading platform on margin by Pendle. Each Boros market tracks a floating rate, and lets you trade that rate against a fixed one until maturity. Any rate with a reliable oracle feed can be listed as a market.

Boros launched with funding rates from centralized and decentralized perp exchanges. It now also lists **Spread Markets**, which trade the difference between two funding rates. Other rate categories will follow.

![Boros Overview](/img/boros-overview.png)

Capturing funding rates through cash-and-carry trades is a staple strategy in both TradFi and crypto. Boros was the first protocol to let you trade the *movement* of those rates directly. It does this through Yield Unit (YU) markets, which open up new kinds of yield strategies.

There are 3 main components within Boros:

### 1. Interest Rate Accounting

Before Boros can trade a rate, it needs the rate itself. Boros reads each rate from an oracle, for example the Binance BTCUSDT funding rate or the Hyperliquid HYPEUSDC funding rate. This is called the **Underlying APR**, because it is the rate of the underlying asset or venue.

<Hint style="info">
As long as there is an oracle feed for a rate, it can be supported on Boros. That includes rates built from other rates, such as the spread between two exchanges' funding rates.
</Hint>

### 2. Interest Rate Trading (YU trading)

**Boros enables the trading of interest rates by representing a floating-rate stream as YU (Yield Units).** Each YU represents the floating rate earned on 1 unit of the collateral asset.

For example, in a BTCUSDT (Hyperliquid) market with BTC as collateral, each YU represents the funding rate of 1 BTC on Hyperliquid. In the BTC Spread HL-Gate market, each YU represents the Hyperliquid-minus-Gate funding spread on 1 BTC.

### 3. Margin, Liquidations and Risk Parameters

To open a position on Boros, you post collateral in the market's collateral asset, then open a long or short position. If your net balance falls below the maintenance margin, the position can be liquidated.

The same trading, margin, settlement and liquidation rules apply to every market, whatever rate it tracks.

## Market Types

Boros currently lists two types of markets. You can switch between them with the **Funding** and **Spread** tabs on the markets page.

- **[Funding Markets](./about-boros/market-types#funding-markets)**: the underlying rate is the funding rate of a single perp market, such as Binance BTCUSDT.
- **[Spread Markets](./about-boros/spread-markets)**: the underlying rate is the difference between two funding rates on the same asset, such as Hyperliquid BTC funding minus Gate BTC funding.

See [Market Types](./about-boros/market-types) for how each type is defined and settled.

## Use Cases

1. **Speculating on Rate Direction**
A trader who expects a funding rate to rise can go long YU. This position pays the implied APR as a fixed stream and receives the floating underlying rate. If the floating rate ends up higher than the fixed rate, the trader profits.
2. **Hedging Funding Rate Payments**
A BTC/USDT perp trader on Binance can turn their floating funding payments into a fixed payment. To do this, they go long YU-BTCUSDT (Binance), paying a fixed stream and receiving the floating funding rate. **The result is a funding cost fixed until maturity.**
3. **Locking in Fixed Yield for Cash and Carry**
A cash-and-carry position collects floating funding from the perp market. The trader can lock in today's rate by going short YU, which means paying the floating stream and receiving a fixed one. The combined position earns a fixed yield until maturity.
4. **Trading Funding Rate Spreads Between Platforms**
Funding rates for the same asset often differ across perp venues. A **[Spread Market](./about-boros/spread-markets)** lets you trade that difference as a single position:
    - **Short the spread** to lock in today's gap as a fixed rate. Paired with a short perp on the higher-funding venue and a long perp on the lower-funding one, this locks the cross-exchange arbitrage into a fixed return with no price exposure. [Arbitrage with CrossEx](./arbitrage-with-crossex/overview) automates this.
    - **Long the spread** to bet that the gap between the two venues will widen.

    For venue pairs without a Spread Market, you can build the same exposure from two Funding Market positions. Go short YU on the higher-funding venue and long YU on the lower-funding one.

## Why Trade Rates?

Perpetual futures are among the most actively traded instruments in crypto. Every perp position pays or receives funding, but until Boros there was no venue to trade that rate directly. Boros gives traders precise control over that exposure. It extends the same mechanism to any rate with an oracle feed, starting with the spreads between venues.

**There are three main ways to use Boros:**

- Long or short a rate to express a view on where it is headed
- Pair a YU position with an existing perp position to convert floating funding payments or receivables into a fixed rate
- Lock in the rate differential between two exchanges as fixed yield, in one position on a Spread Market
