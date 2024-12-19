---
hide_table_of_contents: true
---

# Backend and Hosted SDK

Pendle Backend offers developers accurate and up-to-date data, empowering them to build and innovate with the latest protocol information.

Pendle backend is hosted at [https://api-v2.pendle.finance/core/docs](https://api-v2.pendle.finance/core/docs)

Our Pendle Backend include two core features: Pendle Restful API and Pendle Hosted SDK.

- **Pendle Restful API**: Provides developers with accurate and up-to-date data, empowering them to build and innovate with the latest protocol information.
- **Pendle Hosted SDK**: Offers a more optimized and efficient way to interact with the Pendle Router to buy and sell PTs/YTs, add/remove liquidity, and more.

## Pendle Restful API

We support:

- Get Pendle asset's information
- Get Pendle market's information
- Get vePendle's information
- Get spot prices, historical prices of Pendle assets
- Get historical data of Pendle markets

### Get List of Active Markets

Retrieve all whitelisted and non-expired markets: [https://api-v2.pendle.finance/core/docs#/Markets/MarketsSimplifiedController_getActiveMarkets](https://api-v2.pendle.finance/core/docs#/Markets/MarketsSimplifiedController_getActiveMarkets)

Example: [https://api-v2.pendle.finance/core/v1/1/markets/active](https://api-v2.pendle.finance/core/v1/1/markets/active) returns all active markets on Ethereum mainnet.

### Get Latest Market Data

Retrieve the latest data for a specific market, including liquidity, trading volume, and APY metrics: [https://api-v2.pendle.finance/core/docs#/Markets/MarketsController_marketData_v2](https://api-v2.pendle.finance/core/docs#/Markets/MarketsController_marketData_v2)

Example: [https://api-v2.pendle.finance/core/v2/1/markets/0xe6d4986cd935529fc4505d48e926bcd36a58a0f0/data](https://api-v2.pendle.finance/core/v2/1/markets/0xe6d4986cd935529fc4505d48e926bcd36a58a0f0/data) returns the latest data for the market with the address `0xe6d4986cd935529fc4505d48e926bcd36a58a0f0` on Ethereum mainnet.

### Fetch Historical Market Data

Retrieve historical data for a market in a time-series format:[https://api-v2.pendle.finance/core/docs#/Markets/MarketsController_marketApyHistory_v3](https://api-v2.pendle.finance/core/docs#/Markets/MarketsController_marketApyHistory_v3). The API includes historical max apy, base apy, underlying apy, implied apy and tvl of a market.

To reduce payload side, the API returns the response using table format. You can read more about [response as a table concept](https://github.com/ylabio/trandingview-wiki/blob/master/UDF.md#response-as-a-table-concept) to understand the response.

Example: [https://api-v2.pendle.finance/core/v1/1/markets/0xe6d4986cd935529fc4505d48e926bcd36a58a0f0/historical-data?time_frame=week](https://api-v2.pendle.finance/core/v1/1/markets/0xe6d4986cd935529fc4505d48e926bcd36a58a0f0/historical-data?time_frame=week) returns the historical data for the market with the address `0xe6d4986cd935529fc4505d48e926bcd36a58a0f0` on Ethereum mainnet. Market data is aggregated by week.

### Get Metadata for All Assets

Retrieve metadata (name, expiry, decimals, address) of all LP, YT, and PT assets: [https://api-v2.pendle.finance/core/docs#/Asset%20Simple%20APIs/AssetsSimplifiedController_getAllAssets](https://api-v2.pendle.finance/core/docs#/Asset%20Simple%20APIs/AssetsSimplifiedController_getAllAssets)

Example: [https://api-v2.pendle.finance/core/v3/42161/assets/all](https://api-v2.pendle.finance/core/v3/1/assets/all) returns metadata for all assets on Arbitrum.

### Get Voter APR and Fee Data

Retrieve the voter APR and swap fees for all markets: [https://api-v2.pendle.finance/core/docs#/Ve%20Pendle/VePendleController_getPoolVoterAprAndSwapFee](https://api-v2.pendle.finance/core/docs#/Ve%20Pendle/VePendleController_getPoolVoterAprAndSwapFee)

Example: [https://api-v2.pendle.finance/core/v1/ve-pendle/pool-voter-apr-swap-fee](https://api-v2.pendle.finance/core/v1/ve-pendle/pool-voter-apr-swap-fee) returns voterApr of the last epoch, swap fee of the last epoch, and the projected (expected) voter apr of the current epoch for all markets.

### Get Vote Snapshot

Retrieve the vote snapshot for specific weeks: [https://api-v2.pendle.finance/core/docs#/Ve%20Pendle/VePendleController_voteSnapshot](https://api-v2.pendle.finance/core/docs#/Ve%20Pendle/VePendleController_voteSnapshot)

Example: [https://api-v2.pendle.finance/core/v1/ve-pendle/vote-snapshot?epoch=2024-12-12T00%3A00%3A00.000Z](https://api-v2.pendle.finance/core/v1/ve-pendle/vote-snapshot?epoch=2024-12-12T00%3A00%3A00.000Z) returns the vote result for the epoch `2024-12-12T00:00:00.000Z`.

Please visit to our [github public example repository](https://github.com/pendle-finance/pendle-examples-public/blob/main/backend-api-demo/src/index.ts) to see more examples of how to use our backend API.

## Pendle Hosted SDK

Pendle accommodates a vast array of assets, each characterized by its unique nuances and complexities. While the Pendle protocol remains immutable, the underlying assets don't share this feature, requiring our app and SDK to be updated frequently to align with changes in these assets.

To address this, Pendle has introduced a hosted version of our SDK. It ensures the output remains consistent with Pendle's UI and keeps up-to-date with the latest protocol changes. The API design prioritizes simplicity and stability, with a high rate limit to meet the needs of most users.

### Supported functions

- Swap
- Add liquidity
- Remove liquidity
- Mint PT & YT
- Redeem PT & YT
- Transfer liquidity
- Roll over PT
- Add liquidity dual
- Remove liquidity dual
- Mint SY
- Redeem SY

**Example**

To swap **1 USDC** to **PT eETH** in **eETH (0x7d372819240d14fb477f17b964f95f33beb4c704)** with 1% slippage:

```
GET https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x7d372819240d14fb477f17b964f95f33beb4c704/swap?receiver=<RECEIVER_ADDRESS>&slippage=0.01&enableAggregator=true&tokenIn=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&tokenOut=0x6ee2b5e19ecba773a352e5b21415dc419a700d1d&amountIn=1000000
```

Please visit to our [github](https://github.com/pendle-finance/pendle-examples-public/tree/main/hosted-sdk-demo/src) to see more example

### Features

#### Routing

Routing is a feature of the Pendle SDK that helps users find the most optimal route to interact with the Pendle system. This feature ensures that users can efficiently execute their transactions by identifying the best paths for their specific needs, whether it's swapping assets, adding or removing liquidity, or any other supported function.

To take advantage of the routing feature, users need to set the `enableAggregator` option to `true`. When this option is enabled, the system will automatically perform routing to find the most optimal route for the user's transaction. This ensures that users always get the best possible outcome when interacting with the Pendle system.

#### Additional data

When an endpoint has an `additionalData` field, users can pass in some fields to receive more data, but it will cost more computing units.

For example, our **swap** endpoint has `additionalData` with two available fields: `impliedApy` and `effectiveApy`. If the query parameters have `additionalData=impliedApy`, the response will have the implied APY before and after the swap action.

For additional usage, please refer to our external swagger to explore more.

#### Migrations

If you are using the old Hosted SDK, please take a look at [our example](https://github.com/pendle-finance/pendle-examples-public/tree/main/hosted-sdk-demo/src/migrations) to migrate to the new system.

## Rate limiting

To ensure the stability of our services and fair usage for all users, all of our endpoints are rate-limited.

Pendle API utilizes a calculated query cost method to determine rate limits. Each endpoint has a specific query cost, and the overall rate limit is calculated based on the total query cost of the endpoints accessed.

### Rate limiting method

Every user is allocated a certain number of points that they can spend per minute, referred to as the rate limit. The query cost of each endpoint varies, and the rate limit is derived from these costs. Currently, the rate limit for each user is set at 100 points per minute.

For example, if a user has 100 points per minute, and the query cost of an endpoint is 1, it is the same as saying that the user can make 100 queries per minute. If the query cost of an endpoint is 2, then the user can only make 50 queries per minute.

### Cost calculation

Most endpoints have a fixed query cost, which is displayed in the swagger documentation under the CU (Computing Unit) box before the endpoint description.

![Computing cost](/img/Developers/swagger_external.png "Computing cost")

Some endpoints have a dynamic query cost, which depends on the number of additional data fields requested. For instance, the swap endpoint has a base query cost of 5, but if the aggregator is run, the query cost increases to 10. The more additional data fields requested, the higher the query cost.

### Rate limit headers

In the response headers, we provide the following information to help you manage your rate limit, as shown below:

| Header                  | Description                                                                  |
| ----------------------- | ---------------------------------------------------------------------------- |
| `X-RateLimit-Limit`     | The maximum number of points that the user is permitted to make in a minute. |
| `X-RateLimit-Remaining` | The number of points remaining in the current rate limit window.             |
| `X-RateLimit-Reset`     | The time at which the current rate limit window resets in UTC epoch seconds. |
| `X-Computing-Unit`      | The query cost of the endpoint.                                              |

Example:

```
x-ratelimit-limit: 100
x-ratelimit-remaining: 99
x-ratelimit-reset: 1724206817
```

Those headers mean that the user has 100 points per minute, and they have 99 points remaining. The point will reset at 1724206817 (August 21, 2024 2:20:17 UTC)
