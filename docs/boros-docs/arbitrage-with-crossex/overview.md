import Hint from '@site/src/components/Hint';

# Overview

**Arbitrage with CrossEx** is a free, [open-source tool](https://github.com/pendle-finance/arbitrage-with-crossex) built by the Pendle team that lets traders run a **cross-exchange funding-rate arbitrage** through [Gate CrossEx](https://www.gate.com/crossex) and Boros, from a single dashboard on their own machine.

It runs locally — there's nothing to sign up for on the app itself. It talks directly to your own Gate account and your own Boros wallet.

Learn more and get started at [boros.pendle.finance/arbitrage-crossex](https://boros.pendle.finance/arbitrage-crossex).

## The strategy: cross-exchange funding rate arbitrage

The same coin's funding rate often differs between venues. For example, BTC funding might be priced at 8% APR on Hyperliquid and 4% APR on Binance. The strategy locks in that 4% gap as a fixed yield.

Every position has two halves, both at the same notional:

- **The perp pair (via CrossEx):** short the perp on the higher-funding venue and long the perp on the lower-funding venue. The two perps cancel each other's price exposure, and together they collect the floating funding gap.
- **The rate lock (on Boros):** pay that floating gap away on Boros in exchange for a fixed rate. What remains is a fixed return until the Boros market matures.

Boros offers two ways to lock the rate.

### Option 1: Short a Spread Market (3 legs)

If Boros lists a [Spread Market](../about-boros/spread-markets) for the venue pair, the whole rate lock is one position. Using BTC Spread HL-Gate as an example:

- **Short 10 YU** of BTC Spread HL-Gate at 4% Implied APR (Boros)
- **Short 10 BTC** on Hyperliquid BTC perp (via CrossEx)
- **Long 10 BTC** on Gate BTC perp (via CrossEx)

The Boros side is a single order, with **one margin requirement and one liquidation implied APR**, both based on the spread itself. A move in either venue's funding rate cannot liquidate you on its own. Only a move in the spread can.

### Option 2: Two Funding Market legs (4 legs)

For any venue pair without a Spread Market, the rate lock is built from two [Funding Market](../about-boros/market-types#funding-markets) positions. Using BTC on Hyperliquid and Binance:

- **Short 10 YU** of BTC Hyperliquid funding at 8% Implied APR (Boros)
- **Long 10 YU** of BTC Binance funding at 4% Implied APR (Boros)
- **Short 10 BTC** on Hyperliquid BTC perp (via CrossEx)
- **Long 10 BTC** on Binance BTC perp (via CrossEx)

This works for any two markets that share a collateral and maturity. The Boros side is then two positions, each with its own margin and its own liquidation level.

Either way, the trader is **delta-neutral** and holds just the **4% APR spread** as fixed yield until the Boros market matures (before leverage).

![4 leg funding rate arbitrage](/boros-docs/imgs/arbitrage-with-crossex/4-leg-funding-rate-arbitrage.jpg "4 Leg Funding Rate Arbitrage")

With leverage, this can be a lucrative yield farm — but coordinating collateral and positions across multiple exchanges manually is clunky, which is what keeps most traders from running it.

## Why CrossEx

[CrossEx](https://www.gate.com/crossex) is a Gate.io product that gives traders **unified margin** across perp positions opened on multiple exchanges simultaneously. Instead of juggling separate collateral pools per venue, a trader can open the long/short perp legs of the arbitrage under one account and remain fully delta-neutral.

## What the app does

Arbitrage with CrossEx integrates both CrossEx and Boros so a trader can:

- **Scan opportunities** — see live fixed-rate spreads across venues, with potential returns and required margin calculated automatically
- **Execute every leg** — a guided wizard locks the fixed rate on Boros (one Spread Market order, or two Funding Market orders), then hedges the perp legs through CrossEx, without leaving the dashboard
- **Monitor** margin, PnL, and yield across the whole position from a single dashboard, with a full breakdown of every cost charged against the return

<Hint style="warning">
This is experimental, open-source software that places real orders with real funds on your own exchange account. It is not financial, investment, legal, or tax advice. See [Risks & Security](./risks-and-security) before use.
</Hint>

## Further reading

- [Spread Markets on Boros](../about-boros/spread-markets)
- [Understanding Implied and Underlying APR on Boros](https://pendle.gitbook.io/boros/the-basics/chapter-2-implied-apr-and-underlying-apr)
- [How Boros enables fixed rate payments on floating funding rates](https://pendle.gitbook.io/boros/advanced-strategies/hedging-funding-rates-payment)
- [How Boros enables receiving fixed rates on floating funding rates](https://pendle.gitbook.io/boros/advanced-strategies/fixed-funding-rates-receivables)
- [Fixed-Return Funding Arbitrage — Boros Academy](https://docs.pendle.finance/boros-academy/advanced-strategies/fixed-return-funding-arbitrage)

Next: [Installation](./installation)
