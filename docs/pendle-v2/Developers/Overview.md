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

## Core Documentation

- [High Level Architecture](./HighLevelArchitecture.md)
- [StandardizedYield (SY)](./Contracts/StandardizedYield.md)
- [Common Questions](./FAQ.md)

## Integration Guides

### On-chain Integration

- **Router**: [Documentation](./Contracts/PendleRouter/PendleRouterOverview.md) | [Integration Guide](./Contracts/PendleRouter/ContractIntegrationGuide.md)
- **Oracles**: [Integration Guide](./Oracles/HowToIntegratePtAndLpOracle.md) | [PT as Collateral](./Oracles/PTAsCollateral.md) | [LP as Collateral](./Oracles/LPAsCollateral.md)
- [Example Repository](https://github.com/pendle-finance/pendle-examples-public) - Various contract interaction examples

### Off-chain Integration

- [Backend API overview](./Backend/ApiOverview.mdx)
- [RouterStatic](./Backend/RouterStatic.md) - Extensively tested contract for off-chain calculations. Not audited; should not be used for on-chain fund-related operations.

### Limit Orders

- [Contract](./LimitOrder/LimitOrderContract.md) | [Create](./LimitOrder/CreateALimitOrder.md) | [Cancel](./LimitOrder/CancelOrders.mdx) | [Fill](./LimitOrder/FillALimitOrder.md)

## Resources

- [Deployed Contract Addresses](./Deployments.md) — Core contracts and market addresses by chain
- [Core Contract Repository](https://github.com/pendle-finance/pendle-core-v2-public)
- [SY Contract Repository](https://github.com/pendle-finance/Pendle-SY-Public)
- [Example Repository](https://github.com/pendle-finance/pendle-examples-public)
- [Whitepapers](https://github.com/pendle-finance/pendle-v2-resources/tree/main/whitepapers)
