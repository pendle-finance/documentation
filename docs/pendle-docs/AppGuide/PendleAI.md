---
hide_table_of_contents: true
---

# Pendle AI Plugin

The Pendle AI plugin ([pendle-finance/pendle-ai](https://github.com/pendle-finance/pendle-ai)) is an open-source, beta-stage toolkit that lets AI agents interact with the Pendle V2 protocol directly. It exposes 25 MCP tools and 4 skills, enabling agents to trade yield tokens, manage LP positions, place limit orders, and query live market data — all across 7 EVM chains.

The plugin works with Claude Code, Cursor, and Windsurf.

---

## Installation

Install via the Claude Code plugin marketplace:

```
/plugin marketplace add pendle-finance/pendle-ai
/plugin install pendle-v2
```

**Requirements:** Node.js 20 or higher.

---

## What You Can Do

The plugin is organized into four skills, each covering a distinct area of Pendle's functionality:

### `pendle-swap` — Trading and Liquidity

Swap PT, YT, and SY tokens, add or remove liquidity from Pendle pools, and collect accrued rewards.

### `pendle-data` — Market Intelligence

Query live market data, filter markets by APY or other criteria, look up token details, and explore yield strategy information. Market data is kept current via an in-memory database that refreshes every 5 minutes.

### `pendle-portfolio` — Position Tracking

View your open positions across all Pendle markets, track profit and loss, and get notified as positions approach maturity.

### `pendle-order` — Limit Orders

Create, sign, submit, and cancel limit orders on Pendle's order book.

---

## Example Prompts

Once installed, you can interact with Pendle through natural language. Some examples:

- *"Show me all PT markets on Arbitrum with an implied yield above 8%."*
- *"Buy PT-weETH on Ethereum with 100 USDC."*
- *"What are my current Pendle positions and their P&L?"*
- *"Place a limit order to buy PT-stETH at 5% implied yield."*
- *"Add liquidity to the PT-USDe pool on Mantle."*

---

## Supported Chains

The plugin covers 7 EVM chains, including Ethereum, Arbitrum, Optimism, BNB Chain, Mantle, Base, and others as supported by the Pendle V2 protocol.

---

## Source Code and Contributions

The plugin is open source under the MIT License. See the [GitHub repository](https://github.com/pendle-finance/pendle-ai) for setup instructions, contribution guidelines, and the full list of available MCP tools.
