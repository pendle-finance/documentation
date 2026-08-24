import Hint from '@site/src/components/Hint';

# Risks & Security

<Hint style="warning">
Arbitrage with CrossEx is free, open-source, **experimental software** published by Pendle. It places real orders with real funds on your own exchange account and can lose money. Nothing here is financial, investment, legal, or tax advice — see the full [disclaimer](https://github.com/pendle-finance/arbitrage-with-crossex/blob/main/docs/DISCLAIMER.md).
</Hint>

## Trading risks

Using CrossEx gives delta-neutral positioning on the perp legs of the arbitrage, but the trade is not risk-free:

- **Exchange or platform issues** — problems with Gate as an exchange, or a CrossEx malfunction, can interfere with the arbitrage.
- **Perp price gaps** — an unlikely but possible dislocation between the two perp venues could put the unified margin account at risk of liquidation even though the position is delta-neutral.
- **Boros liquidation** — if the spread moves far enough from your entry, your Boros position can be liquidated, breaking the fixed return. Keep a margin buffer on your Boros positions to guard against this.
- **Unhedged legs** — if only one perp leg fills (or a leg is opened without its hedge), you're exposed to price risk until it's corrected. Always confirm both legs are filled after execution.

## Data & security model

- **Your API keys never leave your machine**, except inside signed requests to Gate.io's official API (`api.gateio.ws`). They're stored in `~/.boros-crossex/config/.env` (macOS) or `%LOCALAPPDATA%\CrossEx-Boros\config\.env` (Windows), readable only by your user account.
- **The app isn't reachable over your network.** The server binds to `127.0.0.1` only and rejects requests whose Host/Origin isn't localhost.
- **No telemetry, no analytics.** The only outbound traffic is to Gate's official API, public market-data endpoints for the venues involved, and a periodic version check against GitHub to show "update available" (`UPDATE_CHECK=0` disables it).
- **It can't withdraw your funds.** If you created the API key as described in [Setting up CrossEx & API Key](./setup-api-key), Gate enforces this at the account level regardless of anything the app does.
- **The Boros agent key can't move funds either.** The delegated key that signs your Boros orders can trade the account but cannot deposit or withdraw — those need your actual wallet. You can revoke it at any time with **Remove key** in the Boros rates ticket, and the approval carries an expiry date.

## Verifying the software yourself

The app is open source. Read the code directly at [github.com/pendle-finance/arbitrage-with-crossex](https://github.com/pendle-finance/arbitrage-with-crossex), or use the [AI-audit prompt](https://github.com/pendle-finance/arbitrage-with-crossex#verify-this-project-yourself-with-ai) in the README to have an AI assistant review the installer, uninstaller, and app source before you run anything.

## FAQ

**Are the displayed rates a quote?**
No. Every rate is live and moves; nothing shown is executable at a guaranteed price. Rates are priced at $100k notional per leg on the standard (VIP 0) fee tier, so your own size and fee tier will change the result.

**Why is a spread sometimes negative?**
The engine always shows the orientation that receives the higher fixed rate — a negative number means execution cost (fees, price impact) exceeds the spread at that size, so it isn't worth trading.

**What if the software breaks?**
It's open source and experimental, with no guaranteed support. Read the source yourself or have an AI assistant audit it before you paste in a key.

## Further reading

- [Understanding Implied and Underlying APR on Boros](https://pendle.gitbook.io/boros/the-basics/chapter-2-implied-apr-and-underlying-apr)
- [How Boros enables fixed rate payments on floating funding rates](https://pendle.gitbook.io/boros/advanced-strategies/hedging-funding-rates-payment)
- [How Boros enables receiving fixed rates on floating funding rates](https://pendle.gitbook.io/boros/advanced-strategies/fixed-funding-rates-receivables)
- [Fixed-Return Funding Arbitrage — Boros Academy](https://docs.pendle.finance/boros-academy/advanced-strategies/fixed-return-funding-arbitrage)
- [Arbitrage with CrossEx User Guide](https://github.com/pendle-finance/arbitrage-with-crossex/blob/main/docs/USER_GUIDE.md)
- [Full Disclaimer](https://github.com/pendle-finance/arbitrage-with-crossex/blob/main/docs/DISCLAIMER.md)
