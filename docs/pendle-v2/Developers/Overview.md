---
hide_table_of_contents: true
---

# Overview

## Stay Connected

**Important:** Stay up to date with the latest developer updates and get support from our team:

- **Telegram**: Join [t.me/pendledevelopers](https://t.me/pendledevelopers) for all development updates, API changes, and important announcements
- **Telegram bot**: We have a Telegram bot for developers to ask about the API at [t.me/peepo_the_engineer_bot](https://t.me/peepo_the_engineer_bot)
- **Discord**: Get technical support on our [Discord Developer Channel](https://pendle.finance/discord) with responses within 24 hours

## For AI users
- As many of us increasingly rely on AI tools to read and understand project documentation, we’ve added a new folder to the repository: [docs/Developers](https://github.com/pendle-finance/documentation/tree/master/docs/Developers). It contains a list of questions and answers about our system and our API, useful for AI to better understand our system and provide more accurate answers when you query them. Our in-house AI is also using these knowledge bases!

- Follow the instructions in [README.md](https://github.com/pendle-finance/documentation/tree/master?tab=readme-ov-file#ai-knowledge-bases) to index the knowledge bases for your AI.

## What do you want to do?

| Goal | Start here |
|---|---|
| **Build a trading bot or data aggregator** | [Quickstart](./Quickstart.md) → [Backend API Overview](./Backend/ApiOverview.mdx) |
| **Integrate PT/YT into your protocol (on-chain)** | [Router Overview](./Contracts/PendleRouter/PendleRouterOverview.md) → [Integration Guide](./Contracts/PendleRouter/ContractIntegrationGuide.md) |
| **Price PT or LP (oracle / collateral)** | [Oracle Overview](./Oracles/OracleOverview.md) → [How to Integrate](./Oracles/HowToIntegratePtAndLpOracle.md) |
| **Analyze yields & APY composition** | [Market Historical Data API](./Backend/ApiOverview.mdx#market-data-endpoints) |
| **Work with Limit Orders** | [Limit Order Overview](./LimitOrder/Overview.md) |
| **Track sPENDLE rewards** | [sPENDLE API](./Backend/ApiOverview.mdx#spendle-api-endpoints) |

## Core Documentation

- [High Level Architecture](./HighLevelArchitecture.md)
- [StandardizedYield (SY)](./Contracts/StandardizedYield/StandardizedYield.md)
- [Common Questions](./FAQ.md)

## Integration Guides

### On-chain Integration

- **Router**: [Documentation](./Contracts/PendleRouter/PendleRouterOverview.md) | [Integration Guide](./Contracts/PendleRouter/ContractIntegrationGuide.md)
- **Oracles**: [Overview](./Oracles/OracleOverview.md) | [Integration Guide](./Oracles/HowToIntegratePtAndLpOracle.md) | [PT as Collateral](./Oracles/PTAsCollateral.md) | [LP as Collateral](./Oracles/LPAsCollateral.md)
- [Example Repository](https://github.com/pendle-finance/pendle-examples-public) - Various contract interaction examples

### Off-chain Integration

- [Backend API overview](./Backend/ApiOverview.mdx)
- [Market Historical Data & APY Breakdown](./Backend/ApiOverview.mdx#market-data-endpoints) - Time-series data with detailed yield composition
- [RouterStatic](./Backend/RouterStatic.md) - Extensively tested contract for off-chain calculations. Not audited; should not be used for on-chain fund-related operations.
- [sPENDLE API](./Backend/ApiOverview.mdx#spendle-api-endpoints) - Staking stats and per-user reward data

### Limit Orders

- [Contract](./LimitOrder/LimitOrderContract.md) | [Create](./LimitOrder/CreateALimitOrder.md) | [Cancel](./LimitOrder/CancelOrders.mdx) | [Fill](./LimitOrder/FillALimitOrder.md)

## Resources

- [Deployed Contract Addresses](./Deployments.md) — Core contracts and market addresses by chain
- [Core Contract Repository](https://github.com/pendle-finance/pendle-core-v2-public)
- [SY Contract Repository](https://github.com/pendle-finance/Pendle-SY-Public)
- [Example Repository](https://github.com/pendle-finance/pendle-examples-public)
- [Whitepapers](https://github.com/pendle-finance/pendle-v2-resources/tree/main/whitepapers)
