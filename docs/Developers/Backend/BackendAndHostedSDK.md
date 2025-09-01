---
hide_table_of_contents: true
---

# Backend and Hosted SDK

Pendle Backend offers developers accurate and up-to-date data, empowering them to build and innovate with the latest protocol information.

Pendle backend is hosted at [https://api-v2.pendle.finance/core/docs](https://api-v2.pendle.finance/core/docs)

Our Pendle Backend include two core features: Pendle Hosted SDK and Pendle API.

- **Pendle Hosted SDK**: Offers a more optimized and efficient way to interact with the Pendle Router to buy and sell PTs/YTs, add/remove liquidity, and more.
  - Code with examples: [Pendle Hosted SDK demo](https://github.com/pendle-finance/pendle-examples-public/tree/main/hosted-sdk-demo/src)
- **Pendle API**: Provides developers with accurate and up-to-date data, empowering them to build and innovate with the latest protocol information.
  - Code with examples: [Pendle Backend API demo](https://github.com/pendle-finance/pendle-examples-public/blob/main/backend-api-demo/src/index.ts)

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

To get calldata and info of swapping **1000 USDC** to **PT stETH** in **stETH (0x34280882267ffa6383b363e278b027be083bbe3b)** with 1% slippage:

![SDK swap](/img/Developers/sdk_swap_usdc.png "SDK swap")

```
GET https://api-v2.pendle.finance/core/v2/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/swap?receiver={RECEIVER_ADDRESS}&slippage=0.01&enableAggregator=true&aggregators=kyberswap&tokenIn=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&tokenOut=0xb253eff1104802b97ac7e3ac9fdd73aece295a2c&amountIn=1000000000&additionalData=impliedApy
```

In code:

```ts
export async function swapTokenToPt() {
  // Swap 1 USDC to PT in stETH market with 1% slippage
  const res = await callSDK<SwapData>(`/v2/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
    receiver: RECEIVER_ADDRESS,
    slippage: 0.01,
    tokenIn: USDC_ADDRESS,
    tokenOut: PT_ADDRESS,
    amountIn: "1000000000",
    enableAggregator: true,
    aggregators: "kyberswap",
  });

  console.log("Amount PT Out: ", res.data.amountOut);
  console.log("Price impact: ", res.data.priceImpact);

  // Send tx
  getSigner().sendTransaction(res.tx);
}
```

To add liquidity of 1 ETH to **stETH (0x34280882267ffa6383b363e278b027be083bbe3b)** with 1% slippage

![SDK add liquidity](/img/Developers/sdk_add_liquidity.png "SDK add liquidity")

```
GET https://api-v2.pendle.finance/core/v2/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/add-liquidity?receiver={RECEIVER_ADDRESS}&slippage=0.01&enableAggregator=true&aggregators=kyberswap&tokenIn=0x0000000000000000000000000000000000000000&amountIn=1000000000000000000&zpi=false&additionalData=impliedApy
```

In code:

```ts
export async function addLiquiditySingleToken() {
  // Use 1 ETH to add liquidity to stETH pool with 1% slippage
  const res = await callSDK<AddLiquidityData>(`/v2/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/add-liquidity`, {
    receiver: RECEIVER_ADDRESS,
    slippage: 0.01,
    tokenIn: ETH_ADDRESS,
    amountIn: "1000000000000000000",
    enableAggregator: true,
    aggregators: "kyberswap",
  });

  console.log("Amount LP Out: ", res.data.amountLpOut);
  console.log("Price impact: ", res.data.priceImpact);

  // Send tx
  getSigner().sendTransaction(res.tx);
}
```

Please visit our [Pendle Hosted SDK demo](https://github.com/pendle-finance/pendle-examples-public/tree/main/hosted-sdk-demo/src) to see more detailed examples.

### Features

#### Routing

Routing is a feature of the Pendle SDK that helps users find the most optimal route to interact with the Pendle system. This feature ensures that users can efficiently execute their transactions by identifying the best paths for their specific needs, whether it's swapping assets, adding or removing liquidity, or any other supported function.

To take advantage of the routing feature, users need to set the `enableAggregator` option to `true`. When this option is enabled, the system will automatically perform routing to find the most optimal route for the user's transaction. This ensures that users always get the best possible outcome when interacting with the Pendle system.

##### Select aggregators

When `enableAggregator` is set to `true`, you can control which aggregators are used by specifying the `aggregators` parameter. This parameter accepts a comma-separated list of aggregator names (e.g. "kyberswap,odos"). If not specified, the system will use all available aggregators to find the optimal route.

Using more aggregators generally results in better optimized routes since there are more options to choose from. However, each aggregator adds to the computing unit cost of the request (see [rate limiting](#rate-limiting)). You can balance between optimization and cost by selectively enabling only the aggregators you want to use.

Currently supported aggregators (can be fetched from [fetch supported aggregators](https://api-v2.pendle.finance/core/docs#/SDK/SdkController_getSupportedAggregators) endpoint), this list is subject to change:

| Aggregator  | Cost (Computing Units) |
| ----------- | ---------------------- |
| `kyberswap` | 5                      |
| `odos`      | 15                     |
| `okx`       | 10                     |
| `paraswap`  | 15                     |

Example, this request will use KyberSwap and Odos aggregators to find the optimal route, and it cost 25 computing units (5 from kyberswap, 15 from odos, and 5 from the base computing cost):

```ts
export async function addLiquiditySingleToken() {
  // Use 1 ETH to add liquidity to stETH pool with 1% slippage
  const res = await callSDK<AddLiquidityData>(`/v2/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/add-liquidity`, {
    receiver: RECEIVER_ADDRESS,
    slippage: 0.01,
    tokenIn: ETH_ADDRESS,
    amountIn: "1000000000000000000",
    enableAggregator: true,
    aggregators: "kyberswap,odos",
  });

  console.log("Amount LP Out: ", res.data.amountLpOut);
  console.log("Price impact: ", res.data.priceImpact);

  // Send tx
  getSigner().sendTransaction(res.tx);
}
```

#### Additional data

When an endpoint has an `additionalData` field, users can pass in some fields to receive more data, but it will cost more computing units.

For example, our **swap** endpoint has `additionalData` with two available fields: `impliedApy` and `effectiveApy`. If the query parameters have `additionalData=impliedApy`, the response will have the implied APY before and after the swap action.

For additional usage, please refer to our external swagger to explore more.

#### Migrations

If you are using the old Hosted SDK, please take a look at [our example](https://github.com/pendle-finance/pendle-examples-public/tree/main/hosted-sdk-demo/src/migrations) to migrate to the new system.

## Pendle Restful API

We support:

- Get Pendle asset's information
- Get Pendle market's information
- Get vePendle's information
- Get spot prices, historical prices of Pendle assets
- Get historical data of Pendle markets

### Get List of Active Markets

Retrieve all active markets on Pendle:

[https://api-v2.pendle.finance/core/docs#/Markets/MarketsSimplifiedController_getActiveMarkets](https://api-v2.pendle.finance/core/docs#/Markets/MarketsSimplifiedController_getActiveMarkets)

![Active Markets List](/img/Developers/list_active_markets.png "Active Markets List")

Example:

```
GET https://api-v2.pendle.finance/core/v1/1/markets/active
```

returns all active markets on Ethereum mainnet.

### Get Latest Market Data

Retrieve the latest data for a specific market, including liquidity, trading volume, and APY metrics: [https://api-v2.pendle.finance/core/docs#/Markets/MarketsController_marketData_v2](https://api-v2.pendle.finance/core/docs#/Markets/MarketsController_marketData_v2)

![Market Latest Data](/img/Developers/market_latest_data.png "Market Latest Data")

Example:

```
GET https://api-v2.pendle.finance/core/v2/1/markets/0xe6d4986cd935529fc4505d48e926bcd36a58a0f0/data
```

returns the latest data for the market with the address `0xe6d4986cd935529fc4505d48e926bcd36a58a0f0` on Ethereum mainnet.

### Fetch Historical Market Data

Retrieve historical data for a market in a time-series format:

[https://api-v2.pendle.finance/core/docs#/Markets/MarketsController_marketApyHistory_v3](https://api-v2.pendle.finance/core/docs#/Markets/MarketsController_marketApyHistory_v3).

The API includes chart data of historical max apy, base apy, underlying apy, implied apy and tvl of a market.

![Market Historical Data](/img/Developers/market_historical_data.png "Market Historical Data")

To reduce payload side, the API returns the response using table format. You can read more about [response as a table concept](https://github.com/ylabio/trandingview-wiki/blob/master/UDF.md#response-as-a-table-concept) to understand the response.

Example:

```
GET https://api-v2.pendle.finance/core/v1/1/markets/0xe6d4986cd935529fc4505d48e926bcd36a58a0f0/historical-data?time_frame=week
```

returns the historical data for the market with the address `0xe6d4986cd935529fc4505d48e926bcd36a58a0f0` on Ethereum mainnet. Market data is aggregated by week.

### Get Metadata for All Assets

Retrieve metadata (name, expiry, decimals, address) of all Pendle's assets (includes LP, YT, PT, SY):

[https://api-v2.pendle.finance/core/docs#/Asset%20Simple%20APIs/AssetsSimplifiedController_getAllAssets](https://api-v2.pendle.finance/core/docs#/Asset%20Simple%20APIs/AssetsSimplifiedController_getAllAssets)

![Assets List](/img/Developers/pt_asset_list.png "Assets List")

Example:

```
GET https://api-v2.pendle.finance/core/v3/1/assets/all
```

returns metadata for all assets on Arbitrum.

### Get Voter APR and Fee Data

Retrieve the voter APR and swap fees for all markets:

[https://api-v2.pendle.finance/core/docs#/Ve%20Pendle/VePendleController_getPoolVoterAprAndSwapFee](https://api-v2.pendle.finance/core/docs#/Ve%20Pendle/VePendleController_getPoolVoterAprAndSwapFee)

![Voter APR and swap fees](/img/Developers/voter_fee_apr.png "Voter APR and swap fees")

Example:

```
GET https://api-v2.pendle.finance/core/v1/ve-pendle/pool-voter-apr-swap-fee
```

returns voterApr of the last epoch, swap fee of the last epoch, and the projected (expected) voter apr of the current epoch for all markets.

### Get Vote Snapshot

Retrieve the vote snapshot for specific weeks: [https://api-v2.pendle.finance/core/docs#/Ve%20Pendle/VePendleController_voteSnapshot](https://api-v2.pendle.finance/core/docs#/Ve%20Pendle/VePendleController_voteSnapshot)

![Vote snapshot](/img/Developers/vote_snapshot.png "Vote snapshot")

Example:

```
GET https://api-v2.pendle.finance/core/v1/ve-pendle/vote-snapshot?epoch=2024-12-12T00%3A00%3A00.000Z
```

returns the vote result for the epoch `2024-12-12T00:00:00.000Z`.

Please visit our [Pendle Backend API demo](https://github.com/pendle-finance/pendle-examples-public/blob/main/backend-api-demo/src/index.ts) to see more detailed examples.

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
