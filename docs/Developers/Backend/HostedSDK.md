---
hide_table_of_contents: true
---

# Hosted SDK

The SDK is hosted at [https://api-v2.pendle.finance/core/docs](https://api-v2.pendle.finance/core/docs).

Pendle accommodates a vast array of assets, each characterized by its unique nuances and complexities. While the Pendle protocol remains immutable, the underlying assets don't share this feature, requiring our app and SDK to be updated frequently to align with changes in these assets.

To address this, Pendle has introduced a hosted version of our SDK. It ensures the output remains consistent with Pendle's UI and keeps up-to-date with the latest protocol changes. The API design prioritizes simplicity and stability, with a high rate limit to meet the needs of most users.

## Supported functions

- Swap
- Add liquidity
- Remove liquidity
- Mint PT & YT
- Redeem PT & YT
- Transfer liquidity
- Roll over PT
- Add liquidity dual
- Remove liquidity dual

**Example**

To swap **1 USDC** to **PT eETH** in **eETH (0x7d372819240d14fb477f17b964f95f33beb4c704)** with 1% slippage:

```
GET https://api-v2.pendle.finance/api/external/v1/sdk/1/markets/0x7d372819240d14fb477f17b964f95f33beb4c704/swap?receiver=<RECEIVER_ADDRESS>&slippage=0.01&enableAggregator=true&tokenIn=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&tokenOut=0x6ee2b5e19ecba773a352e5b21415dc419a700d1d&amountIn=1000000
```

Please visit to our [github](https://github.com/pendle-finance/pendle-examples-public/tree/main/hosted-sdk-demo/src) to see more example

## Features

### Routing

Routing is a feature of the Pendle SDK that helps users find the most optimal route to interact with the Pendle system. This feature ensures that users can efficiently execute their transactions by identifying the best paths for their specific needs, whether it's swapping assets, adding or removing liquidity, or any other supported function.

To take advantage of the routing feature, users need to set the `enableAggregator` option to `true`. When this option is enabled, the system will automatically perform routing to find the most optimal route for the user's transaction. This ensures that users always get the best possible outcome when interacting with the Pendle system.

### Additional data

When an endpoint has an `additionalData` field, users can pass in some fields to receive more data, but it will cost more computing units.

For example, our **swap** endpoint has `additionalData` with two available fields: `impliedApy` and `effectiveApy`. If the query parameters have `additionalData=impliedApy`, the response will have the implied APY before and after the swap action.

For additional usage, please refer to our external swagger to explore more.

## Rate limiting

Refer to the [Rate Limiting](/Developers/Backend#rate-limiting) section in the Pendle Backend documentation for more information on rate limiting.
