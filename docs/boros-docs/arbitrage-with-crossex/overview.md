import Hint from '@site/src/components/Hint';

# Overview

**Arbitrage with CrossEx** is a free, [open-source tool](https://github.com/pendle-finance/arbitrage-with-crossex) built by the Pendle team that lets traders execute a **4-leg cross-exchange funding-rate arbitrage** through [Gate CrossEx](https://www.gate.com/crossex) and Boros, from a single dashboard on their own machine.

It runs locally — there's nothing to sign up for on the app itself. It talks directly to your own Gate account and your own Boros wallet.

Learn more and get started at [boros.pendle.finance/arbitrage-crossex](https://boros.pendle.finance/arbitrage-crossex).

## The strategy: 4-leg funding rate arbitrage

Boros lets traders convert a venue's floating funding rate into a tradable fixed rate. The same coin's funding often carries a different **implied APR** on different venues — for example, ETH funding priced at 8% APR on Hyperliquid but 4% APR on Binance. The strategy locks in that gap as yield.

One position is 4 legs, all at the same notional. Using BTC as an example:

- **Short 10 YU** of BTC Hyperliquid funding at 8% Implied APR (Boros)
- **Long 10 YU** of BTC Binance funding at 4% Implied APR (Boros)
- **Short 10 BTC** on Hyperliquid BTC perp (via CrossEx)
- **Long 10 BTC** on Binance BTC perp (via CrossEx)

The two perp legs cancel each other's price exposure and offset the floating funding owed on the Boros legs, leaving the trader **delta-neutral** and holding just the **4% APR spread** as fixed yield until the Boros markets mature (before leverage).

![4 leg funding rate arbitrage](/boros-docs/imgs/arbitrage-with-crossex/4-leg-funding-rate-arbitrage.jpg "4 Leg Funding Rate Arbitrage")

With leverage, this can be a lucrative yield farm — but coordinating collateral and positions across multiple exchanges manually is clunky, which is what keeps most traders from running it.

## Why CrossEx

[CrossEx](https://www.gate.com/crossex) is a Gate.io product that gives traders **unified margin** across perp positions opened on multiple exchanges simultaneously. Instead of juggling separate collateral pools per venue, a trader can open the long/short perp legs of the arbitrage under one account and remain fully delta-neutral.

## What the app does

Arbitrage with CrossEx integrates both CrossEx and Boros so a trader can:

- **Scan opportunities** — see live fixed-rate spreads across venues, with potential returns and required margin calculated automatically
- **Execute all four legs** — a guided wizard locks the fixed rate on Boros, then hedges the perp legs through CrossEx, without leaving the dashboard
- **Monitor** margin, PnL, and yield across the whole 4-leg position from a single dashboard, with a full breakdown of every cost charged against the return

<Hint style="warning">
This is experimental, open-source software that places real orders with real funds on your own exchange account. It is not financial, investment, legal, or tax advice. See [Risks & Security](./risks-and-security) before use.
</Hint>

## Further reading

- [Understanding Implied and Underlying APR on Boros](https://pendle.gitbook.io/boros/the-basics/chapter-2-implied-apr-and-underlying-apr)
- [How Boros enables fixed rate payments on floating funding rates](https://pendle.gitbook.io/boros/advanced-strategies/hedging-funding-rates-payment)
- [How Boros enables receiving fixed rates on floating funding rates](https://pendle.gitbook.io/boros/advanced-strategies/fixed-funding-rates-receivables)
- [Fixed-Return Funding Arbitrage — Boros Academy](https://docs.pendle.finance/boros-academy/advanced-strategies/fixed-return-funding-arbitrage)

Next: [Installation](./installation)
