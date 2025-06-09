Pendle Backend offers developers accurate and up-to-date data, empowering them to build and innovate with the latest protocol information.

Pendle backend is hosted at [https://api-v2.pendle.finance/core/docs](https://api-v2.pendle.finance/core/docs)

We support:

- Get Pendle market's information
- Get Pendle asset prices
- Get Pendle asset's information
- Get positions of a user in all pendle markets
- Get vePendle's information
- Get spot prices, historical prices of Pendle assets
- Get historical data of Pendle markets

### Get List of User Positions in Pendle
[API Documentation](https://api-v2.pendle.finance/core/docs#/Dashboard/DashboardController_getUserPositions)
![User Postions](/img/Developers/user_positions.png "User Postions")

Example:
```
GET https://api-v2.pendle.finance/core/v1/dashboard/positions/database/${userAddress}?filterUsd=0.1
```

Return the list of positions for user `userAddress`

### Get Pendle asset prices

[API Documentation](https://api-v2.pendle.finance/core/docs#/Assets/AssetsSimplifiedController_getAllAssetPricesByAddresses)

Example:
```
GET https://api-v2.pendle.finance/core/v1/1/assets/prices?addresses=0xb253eff1104802b97ac7e3ac9fdd73aece295a2c%2C0x34280882267ffa6383b363e278b027be083bbe3b
```

returns the prices of the assets with the addresses `0xb253eff1104802b97ac7e3ac9fdd73aece295a2c` (PT-stETH-30DEC2027) and `0x34280882267ffa6383b363e278b027be083bbe3b` (LP-stETH-30DEC2027) on Ethereum mainnet.

### Get List of Active Markets

Retrieve all active markets on Pendle: 

[API Documentation](https://api-v2.pendle.finance/core/docs#/Markets/MarketsSimplifiedController_getActiveMarkets)

![Active Markets List](/img/Developers/list_active_markets.png "Active Markets List")

Example: 
```
GET https://api-v2.pendle.finance/core/v1/1/markets/active
```
returns all active markets on Ethereum mainnet.

### Get Latest Market Data

Retrieve the latest data for a specific market, including liquidity, trading volume, and APY metrics: [API Documentation](https://api-v2.pendle.finance/core/docs#/Markets/MarketsController_marketData_v2)

![Market Latest Data](/img/Developers/market_latest_data.png "Market Latest Data")

Example: 
```
GET https://api-v2.pendle.finance/core/v2/1/markets/0xe6d4986cd935529fc4505d48e926bcd36a58a0f0/data
```
returns the latest data for the market with the address `0xe6d4986cd935529fc4505d48e926bcd36a58a0f0` on Ethereum mainnet.

### Fetch Historical Market Data

Retrieve historical data for a market in a time-series format:

[API Documentation](https://api-v2.pendle.finance/core/docs#/Markets/MarketsController_marketApyHistory_v3)

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

[API Documentation](https://api-v2.pendle.finance/core/docs#/Assets/AssetsSimplifiedController_getAllAssets)

![Assets List](/img/Developers/pt_asset_list.png "Assets List")

Example: 
```
GET https://api-v2.pendle.finance/core/v3/1/assets/all
``` 
returns metadata for all assets on Arbitrum.

### Get Voter APR and Fee Data

Retrieve the voter APR and swap fees for all markets: 

[API Documentation](https://api-v2.pendle.finance/core/docs#/Ve%20Pendle/VePendleController_getPoolVoterAprAndSwapFee)

![Voter APR and swap fees](/img/Developers/voter_fee_apr.png "Voter APR and swap fees")

Example: 
```
GET https://api-v2.pendle.finance/core/v1/ve-pendle/pool-voter-apr-swap-fee
```
returns voterApr of the last epoch, swap fee of the last epoch, and the projected (expected) voter apr of the current epoch for all markets.

### Get Vote Snapshot

Retrieve the vote snapshot for specific weeks: [API Documentation](https://api-v2.pendle.finance/core/docs#/Ve%20Pendle/VePendleController_voteSnapshot)

![Vote snapshot](/img/Developers/vote_snapshot.png "Vote snapshot")

Example: 
```
GET https://api-v2.pendle.finance/core/v1/ve-pendle/vote-snapshot?epoch=2024-12-12T00%3A00%3A00.000Z
```
returns the vote result for the epoch `2024-12-12T00:00:00.000Z`.

Please visit our [Pendle Backend API demo](https://github.com/pendle-finance/pendle-examples-public/blob/main/backend-api-demo/src/index.ts) to see more detailed examples.