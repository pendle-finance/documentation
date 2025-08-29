---
hide_table_of_contents: true
---

<!-- TODO: Add corresponding images for examples -->

# Backend and Hosted SDK

Pendle Backend offers developers accurate and up-to-date data, empowering them to build and innovate with the latest protocol information.

Pendle backend is hosted at [https://api-v2.pendle.finance/core/docs](https://api-v2.pendle.finance/core/docs)

Our Pendle Backend includes two core features: Pendle Hosted SDK and Pendle API.

- **Pendle Hosted SDK**: Offers a more optimized and efficient way to interact with the Pendle Router to buy and sell PTs/YTs, add/remove liquidity, and more.
  - Code with examples: [Pendle Hosted SDK demo](https://github.com/pendle-finance/pendle-examples-public/tree/main/hosted-sdk-demo/src)
- **Pendle API**: Provides developers with accurate and up-to-date data, empowering them to build and innovate with the latest protocol information.
  - Code with examples: [Pendle Backend API demo](https://github.com/pendle-finance/pendle-examples-public/blob/main/backend-api-demo/src/index.ts)

## Pendle Hosted SDK

Pendle accommodates a vast array of assets, each characterized by its unique nuances and complexities. While the Pendle protocol remains immutable, the underlying assets don't share this feature, requiring our app and SDK to be updated frequently to align with changes in these assets.

To address this, Pendle has introduced the Router Actions API - a unified interface for executing Pendle protocol actions through intelligent action classification. Instead of calling separate endpoints for each action type, this API analyzes the input and output tokens to automatically determine the appropriate action and execute it accordingly. The API design prioritizes simplicity and stability, with a high rate limit to meet the needs of most users.

**Example**

To mint PT & YT from **1000 USDC** to **PT USDe** and **YT USDe** in **USDe market** with 1% slippage:

![Router Actions mint PY](/img/Developers/router_actions_mint.png "Router Actions mint PY")

```
GET https://api-v2.pendle.finance/core/v1/sdk/1/router-actions?receiver=<RECEIVER_ADDRESS>&slippage=0.01&enableAggregator=true&tokensIn=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&amountsIn=1000000000&tokensOut=0xbc6736d346a5ebc0debc997397912cd9b8fae10a,0x48bbbedc4d2491cc08915d7a5c7cc8a8edf165da
```

In code:

```ts
export async function mintPtYtFromToken() {
  // Mint PT & YT from 1000 USDC with 1% slippage
  const res = await callSDK<RouterActionsResponse>(`/v1/sdk/${CHAIN_ID}/router-actions`, {
    tokensIn: `${USDC_ADDRESS}`,
    amountsIn: '1000000000',
    tokensOut: `${PT_ADDRESS},${YT_ADDRESS}`,
    enableAggregator: true,
    receiver: RECEIVER_ADDRESS,
    slippage: 0.01,
  });

  console.log("Action: ", res.action);
  console.log("Outputs: ", res.routes[0].outputs);
  console.log("Price impact: ", res.routes[0].data.priceImpact);

  // Send tx
  getSigner().sendTransaction(res.routes[0].tx);
}
```

To transfer **1 LP + 1 PT + 1 YT** from **USDe pool** to **sUSDe pool** with ZPI and redeem rewards with 1% slippage, using KyberSwap and OKX aggregators:

![Router Actions transfer liquidity](/img/Developers/router_actions_transfer.png "Router Actions transfer liquidity")

```
GET https://api-v2.pendle.finance/core/v1/sdk/1/router-actions?receiver=<RECEIVER_ADDRESS>&slippage=0.01&enableAggregator=true&aggregators=kyberswap,okx&tokensIn=0xbc6736d346a5ebc0debc997397912cd9b8fae10a,0x48bbbedc4d2491cc08915d7a5c7cc8a8edf165da,0x6d98a2b6cdbf44939362a3e99793339ba2016af4&amountsIn=1000000000000000000,1000000000000000000,1000000000000000000&tokensOut=0xa36b60a14a1a5247912584768c6e53e1a269a9f7,0x029d6247adb0a57138c62e3019c92d3dfc9c1840&redeemRewards=true
```

In code:

```ts
export async function transferLiquidity() {
  // Transfer 1 LP + 1 PT + 1 YT from USDe pool to sUSDe pool with ZPI and redeem rewards with 1% slippage
  const res = await callSDK<RouterActionsResponse>(`/v1/sdk/${CHAIN_ID}/router-actions`, {
    tokensIn: [USDE_LP_ADDRESS, USDE_PT_ADDRESS, USDE_YT_ADDRESS],
    amountsIn: ["1000000000000000000", "1000000000000000000", "1000000000000000000"],
    tokensOut: [SUSDE_LP_ADDRESS, SUSDE_YT_ADDRESS],
    receiver: RECEIVER_ADDRESS,
    slippage: 0.01,
    enableAggregator: true,
    aggregators: "kyberswap,okx",
    redeemRewards: true,
  });

  console.log("Action: ", res.action);
  console.log("Outputs: ", res.routes[0].outputs);
  console.log("Price impact: ", res.routes[0].data.priceImpact);

  // Send tx
  getSigner().sendTransaction(res.routes[0].tx);
}
```

Please visit our [Router Actions API examples](https://github.com/pendle-finance/pendle-examples-public/tree/main/router-actions-demo) to see more detailed examples.

### Supported Actions

- Swap
- Add liquidity
- Remove liquidity
- Add liquidity dual
- Remove liquidity dual
- Mint PT & YT
- Redeem PT & YT
- Mint SY
- Redeem SY
- Roll over PT
- Transfer liquidity
- Exit market

### Inputs

The Router Actions API accepts the following input parameters:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `tokensIn` | string | Yes | - | Comma-separated input token addresses |
| `amountsIn` | string | Yes | - | Comma-separated input token amounts (in wei) |
| `tokensOut` | string | Yes | - | Comma-separated expected output token addresses |
| `receiver` | string | Yes | - | Address to receive the output tokens |
| `slippage` | number | Yes | - | Maximum slippage tolerance (0-1, where 0.01 = 1%) |
| `enableAggregator` | boolean | No | `false` | Enable swap aggregators for token conversions |
| `aggregators` | string | No | - | Specific aggregators to use (comma-separated), see [Routing](#routing) |
| `redeemRewards` | boolean | No | `false` | Whether to redeem rewards during the action, applicable to actions: `transfer-liquidity` |
| `additionalData` | string | No | - | Additional data to include in response (comma-separated), see [Additional data](#additional-data) |

### Outputs

The Router Actions API returns the following response structure:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `action` | string | Yes | The classified and executed action (e.g., `mint-py`, `swap`, `add-liquidity`) |
| `inputs` | [TokenAmountResponse[]](#tokenamountresponse) | Yes | Input tokens and amounts used in the action |
| `requiredApprovals` | [TokenAmountResponse[]](#tokenamountresponse) | No | Tokens requiring approval before execution |
| `routes` | [RouterActionsResponse[]](#routeractionsresponse-routes) | Yes | Array of route execution details (this version of the API always returns the single best route, i.e. `routes.length = 1`) |

#### TokenAmountResponse

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `token` | string | Yes | Token contract address (lowercase) |
| `amount` | string | Yes | Token amount in wei (BigInt string) |

#### RouterActionsResponse

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `contractParamInfo` | [ContractParamInfo](#contractparaminfo) | Yes | Param info for the contract method called |
| `tx` | [TransactionDto](#transactiondto-tx) | Yes | Complete transaction data for execution |
| `outputs` | [TokenAmountResponse[]](#tokenamountresponse) | Yes | Expected output tokens and amounts |
| `data` | [RouterActionsData](#routeractionsdata-data) | Yes | Action-specific data |

#### ContractParamInfo

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `method` | string | Yes | Contract method name (e.g., `mintPyFromToken`) |
| `contractCallParamsName` | string[] | Yes | Parameter names array |
| `contractCallParams` | any[] | Yes | Parameter values array |

#### TransactionDto

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `data` | string | Yes | Encoded transaction data (hex) |
| `to` | string | Yes | Contract address to call |
| `from` | string | Yes | Sender address |
| `value` | string | Yes | Native token amount to send |

#### RouterActionsData

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `priceImpact` | number | Yes | Price impact |
| `impliedApy` | [ImpliedApy](#impliedapy) | No | Market APY information for yield actions. (for `swap` actions) |
| `effectiveApy` | number | No | User's effective APY after fees/slippage. (for `swap` actions) |
| `paramsBreakdown` | [ParamsBreakdown](#paramsbreakdown) | No | Multi-step action breakdown (for `transfer-liquidity`) |

#### ImpliedApy

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `before` | number | Yes | Implied APY before transaction |
| `after` | number | Yes | Implied APY after transaction |

#### ParamsBreakdown

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `selfCall1` | [ContractParamInfo](#contractparaminfo) | Yes | Params info for selfCall1 |
| `selfCall2` | [ContractParamInfo](#contractparaminfo) | No | Params info for selfCall2 |
| `reflectCall` | [ContractParamInfo](#contractparaminfo) | Yes | Params info for reflectCall |

### Features

#### Routing

Router Actions API supports the same routing feature as the Pendle Hosted SDK. When `enableAggregator` is set to `true`, the system will automatically perform routing to find the most optimal route for the user's transaction.

##### Select aggregators

You can control which aggregators are used by specifying the `aggregators` parameter. This parameter accepts a comma-separated list of aggregator names (e.g. "kyberswap,odos"). If not specified, the system will use all available aggregators to find the optimal route.

Using more aggregators generally results in better optimized routes since there are more options to choose from. However, each aggregator adds to the computing unit cost of the request (see [rate limiting](#rate-limiting)). You can balance between optimization and cost by selectively enabling only the aggregators you want to use.

Currently supported aggregators:

| Aggregator  | Cost (Computing Units) |
| ----------- | ---------------------- |
| `kyberswap` | 5                      |
| `odos`      | 15                     |
| `okx`       | 10                     |
| `paraswap`  | 15                     |

#### Additional data

When an endpoint has an `additionalData` field, users can pass in some fields to receive more data, but it will cost more computing units.

For example, you can pass `additionalData=impliedApy,effectiveApy` to get implied APY and effective APY information in the response.

#### Migrations

If you are using the old Hosted SDK, please take a look at [our example](https://github.com/pendle-finance/pendle-examples-public/tree/main/hosted-sdk-demo/src/migrations) to migrate to the new system.

The main benefits are:

- **Simplified Integration**: One endpoint instead of 12+ individual endpoints
- **Automatic Action Detection**: No need to manually determine which action to use
- **Consistent Response Format**: Unified response structure across all actions
- **Enhanced Error Handling**: Better error messages for invalid action combinations

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

To reduce payload size, the API returns the response using table format. You can read more about [response as a table concept](https://github.com/ylabio/trandingview-wiki/blob/master/UDF.md#response-as-a-table-concept) to understand the response.

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

returns metadata for all assets on Ethereum.

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
