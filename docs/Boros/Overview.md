---
hide_table_of_contents: true
slug: /
---

# Introduction to Boros

Pendle Boros is an on-chain platform for trading interest rate swaps. The protocol enables users to take long or short positions on variable interest rates with leverage through a hybrid system combining a central limit order book and AMM. At launch, Boros only support trading of funding rates, though Boros is designed to allow trading of any types of interest rates that have an index oracle.

Boros is deployed on Arbitrum and the addresses can be found [here](https://github.com/pendle-finance/boros-core-public/tree/main/deployments).

## Core Documentation

- [Lite Paper](./LitePaper.md)
- [High Level Architecture](./HighLevelArchitecture.md)
- [Frequently Asked Questions](./FAQ.md)

## Protocol Mechanics

- [Order Book](./Mechanics/OrderBook.md)
- [Settlement](./Mechanics/Settlement.md)
- [Fees](./Mechanics/Fees.md)
- [Margin](./Mechanics/Margin.md)

## Integration Guides

External parties can integrate with Boros through two primary methods:

- **Direct Contract Integration** - Make direct calls to Boros smart contracts for maximum control and customization. This approach is ideal for sophisticated traders who want to implement custom trading logic on-chain.

  - **Entry point**: [Router](./Contracts/Router.md)
  - **Data query**: [MarketHub](./Contracts/MarketHub.md) | [Market](./Contracts/Market.md)
  - **NPM package**: [@pendle/boros-core](https://www.npmjs.com/package/@pendle/boros-core)

- **SDK Integration** - Use the Boros SDK for simplified integration through agent-based calls. The SDK handles transaction management, signature generation, and provides a high-level API for common trading operations.
  - [SDK Integration Guide](./Backend/SDK.md)
  - **NPM package**: [@pendle/sdk-boros](https://www.npmjs.com/package/@pendle/sdk-boros)

Additionally, Boros provides comprehensive data access through:

- **REST API** - Query market data, order book snapshots, historical trades, and account information

  - [REST API Documentation](./Backend/REST%20API.md)

- **WebSocket** - Real-time data streaming for order book updates, trades, and market events
  - [WebSocket Documentation](./Backend/WebSocket.md)

## Resources

- [Whitepapers](https://github.com/pendle-finance/boros-core-public/tree/main/whitepapers)
- [Core Contracts Repository](https://github.com/pendle-finance/boros-core-public)
- [Audit Reports](https://github.com/pendle-finance/boros-core-public/tree/main/audits/)
