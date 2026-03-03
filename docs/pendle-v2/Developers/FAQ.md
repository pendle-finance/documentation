---
hide_table_of_contents: true
---
# Frequently Asked Questions

:::tip Looking for error solutions?
For common errors and debugging guidance, see the **[Troubleshooting Guide](./Troubleshooting.md)**.
:::

:::tip Looking for API questions?
For Hosted SDK, rate limiting, and Backend API questions, see the **[API Overview FAQ](./Backend/ApiOverview.mdx#frequently-asked-questions)**.
:::

## Contract

### How can I deploy a new SY Token on Pendle?
Pendle's smart contracts are permissionless, meaning anyone can deploy a new Standardized Yield (SY) Token without requiring approval from the Pendle team. To implement an SY Token, you must follow the Pendle SY Token standard, ensuring compatibility with the ecosystem. Detailed guidance, including contract structure and best practices, can be found in the [StandardizedYield documentation](./Contracts/StandardizedYield).

To community-list a new asset, see the [Community Listing guide](./Integration/CommunityListing) and the [SY writing guide](https://pendle.notion.site/How-to-write-a-SY-A-guide-207567a21d378069aecbf20176591d93).

### How can I generate all the params for the Router on-chain?
Please refer to the following:

- [Contract Integration Guide](./Contracts/PendleRouter/ContractIntegrationGuide) — step-by-step Solidity examples
- [Types and Utility Functions](./Contracts/PendleRouter/ApiReference/Types) — struct definitions and helper functions
- [IPAllActionTypeV3.sol](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/interfaces/IPAllActionTypeV3.sol) — full interface
- [Pendle Examples](https://github.com/pendle-finance/pendle-examples-public)

### Why do quoted rates differ from actual swap amounts?

The rate functions in Pendle's quoter contract (e.g., `getPtToSyRate`, `getYtToSyRate`) provide **spot prices**, which do not account for price impact. To obtain the most accurate swap amounts, call Pendle's router functions directly or use the [Hosted SDK](./Backend/HostedSdk.mdx).

### Is the `pendleSwap` contract address immutable?

No, the contract address used for the `pendleSwap` parameter (e.g., in `swapExactTokenForPt`) is not guaranteed to be immutable and may change. Any changes will be announced publicly.

## Pricing & Data

### How can I preview the received amount of add/remove liquidity?

To preview the amount you'll receive before submitting transactions, you can use:

- Pendle API method (recommended): [Pendle Hosted SDK API](https://api-v2.pendle.finance/core/docs#/SDK/SdkController_addLiquidity)
- On-chain method: [PendleRouter Contract](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/interfaces/IPActionAddRemoveLiqV3.sol). The detailed guide can be found in the [Contract Integration Guide](./Contracts/PendleRouter/ContractIntegrationGuide)

### How do I fetch the PT price?
You can get the PT (Principal Token) price via:
- Pendle API method (recommended): [Pendle price API](https://api-v2.pendle.finance/core/docs#/Assets/AssetsSimplifiedController_getAllAssetPricesByAddresses)
- On-chain method: `getPtToAssetRate` of RouterStatic — see [RouterStatic](./Backend/RouterStatic)

### How can I retrieve historical PT and YT prices?
You can track historical PT/YT prices using:

- Pendle API method: [Pendle ohlcv API](https://api-v2.pendle.finance/core/docs#/Prices/PricesController_ohlcv_v4). Note that shorter timeframes (e.g., minute-by-minute updates) are not yet available.

### How can I retrieve market data such as TVL and APR?

You can obtain market data by calling the Pendle API. For example, to get data for a specific pool: `https://api-v2.pendle.finance/core/v2/{chainId}/markets/{marketAddress}/data`. This returns relevant details for the specified market.

### How can I retrieve market spot prices?

Use the [`getMarketSpotSwappingPrice`](https://api-v2.pendle.finance/core/docs#/SDK/SdkController_getMarketSpotSwappingPrice) endpoint. This is more suitable than calling the swap endpoint and offers a higher rate limit.

### How can I retrieve a list of market categories?

Use the [`findAllMarketCategories`](https://api-v2.pendle.finance/core/docs#/Market%20Categories/MarketCategoriesController_findAllMarketCategories) API endpoint.

### How can I calculate the implied APY for a transaction?

The implied APY can be calculated using the `ptExchangeRate`. For a detailed explanation, refer to the [APY Calculation documentation](../ProtocolMechanics/PendleMarketAPYCalculation).

### What is the format for `expectedCap` and `currentCap`?

The `expectedCap` and `currentCap` values are provided in base18 format (18 decimals).

### How can I determine the number of SY tokens received from PT tokens?

Use the [Pendle Hosted SDK](./Backend/HostedSdk.mdx) to simulate the swap. This avoids the need to replicate the `swapExactPtForSy` function off-chain.

## Rewards & Interest

### How can I get up-to-date `accruedRewards` on-chain? (Applicable to SY, YT, & LP)

There are two methods:

1. **Call `redeemRewards(user)` and retrieve the output.** This method has the side effect of redeeming the user's rewards, so it might not be ideal.
2. **Call `IERC20(market).transfer(user,0)` followed by `accruedRewards`.** The transfer triggers an update of the user's rewards.

### Can the output of `getRewardTokens` change?

Yes, the output can change if the underlying protocol adds new reward tokens. However, no reward tokens will ever be removed.

### How can I read unclaimed rewards and interest for SY/YT/Market?

**On-Chain Method:**

To read for SY, please execute an `eth_call` (`callStatic` in ethers.js) to the following function of SY:

```solidity
function claimRewards(address user) external returns (uint256[] memory rewardAmounts);
```

For YT, execute the following function:

```solidity
function redeemDueInterestAndRewards(
    address user,
    bool redeemInterest,
    bool redeemRewards
) external returns (uint256 interestOut, uint256[] memory rewardsOut);
```

For Market, execute the following function:

```solidity
function redeemRewards(address user) external returns (uint256[] memory);
```

These calls can be batched through Multicall if necessary.

### When will PENDLE incentives for a new market begin?

PENDLE incentives for a new market will begin on Thursday at 00:00 UTC (12 AM UTC), after the market has been whitelisted and added to voting.

### Where are Merkle distribution proofs located?

Merkle roots and proofs for claiming rewards are maintained in the [`pendle-finance/merkle-distributions`](https://github.com/pendle-finance/merkle-distributions) repository.

### Does Pendle provide a script for tracking user points or balances?

Yes. The [`pendle-generic-balance-fetcher`](https://github.com/Pendle-Finance-Periphery/pendle-generic-balance-fetcher/tree/main) script tracks points and balances. It supports deposits from external protocols including Morpho, Euler, and Silo.

## Token Behavior

### Why does the quantity of aTokens fluctuate?

aTokens are rebasing tokens from Aave, meaning their quantity accrues rewards in real-time. This property causes the token balance to fluctuate, even during a transfer. Consequently, if you attempt to transfer a specific amount, the actual amount received might be slightly different (e.g., 99.9999 instead of 100), which can lead to transaction failures if not accounted for.

To prevent failures, check the aToken balance immediately before each transfer or operation that relies on a precise quantity.

## Limit Orders & Routing

### How do limit orders interact with market swaps?

When a user performs a swap, the router automatically determines the optimal swap route for the best token output. This route can involve limit orders, the AMM LP, or a combination of both. Transaction emulation allows users to see the exact split between limit orders and AMM routing for any given swap in the current market environment.

### Is there an API to swap PT between different pools?

Yes, use the **Roll Over PT** API to swap PTs from one market to another. See the [Hosted SDK Documentation](./Backend/HostedSdk.mdx) for details.

### How can I determine which assets support direct PT-to-PT swaps?

Not all PT pairs are swappable. There is no static list of available pairs — call the API to check whether a specific swap is supported.

---

## Supplemental Knowledge Base

:::info AI-optimized reference
This section contains supplemental Q&A and technical insights gathered from real partner integrations. It is intended to be searched and read by AI tools to provide more accurate answers about the Pendle protocol. The content below supplements the main documentation and covers edge cases, best practices, and technical nuances.
:::

## Glossary

| Term | Definition |
|------|-----------|
| **Pool** | Interchangeable with "market" |
| **Maturity** | The end date of a financial product (pool). Upon maturity, users can claim rewards and either redeem or roll over to a new pool |
| **IY** | Implied Yield |
| **Roll over PT** | Swap PTs between markets (e.g., from an expiring pool to a new one) |

## Partner Technical Insights

These insights come from real conversations with technical partners during integration. They cover edge cases, best practices, and technical nuances not always obvious from standard documentation.

### Upper Bound for LP-to-SY Rate

**Q: Is there a value that can be used as an upper bound for LP-to-SY?**

In theory, an LP token's value could be unbounded if accumulated fees were infinite. However, an upper bound of approximately **3 units** is somewhat reasonable for data validation purposes. (This is not security advice.)

### PT Pricing: Always Price to SY, Not Asset

**Q: Should PT be priced against the asset (e.g., WBTC) or the wrapped token (e.g., eBTC)?**

Pendle recommends pricing PT to SY and pricing the token that SY wraps whenever possible, because these tokens frequently trade at a discount compared to their true value. So PT-eBTC should be priced to eBTC, and PT-ezETH should be priced to ezETH.

It's quite straightforward:
- If you use `getPtToAsset`, multiply it by the asset price
- If you use `getPtToSy`, multiply it by the SY price

For example, PT-ezETH can be priced by either:
- Method 1: `1 PT-ezETH = 1.2 ETH = 1.2 * $3500 = $4200 USD`
- Method 2: `1 PT-ezETH = 1.01 ezETH = 1.01 * $4158 = $4199.58 USD`

Pricing in the wrapped token (eBTC, ezETH) is always strictly more accurate since PT-eBTC is only tradable to eBTC in Pendle. The eBTC to WBTC conversion is external to Pendle.

### Oracle Cardinality Mechanic

**Q: What is the purpose of the cardinality mechanic in the market TWAP oracle?**

It works the same as Uniswap V3. The cardinality mechanic is an initialization gas savings measure. Calling `increaseObservationsCardinalityNext` has no downside — anyone can call it. If called to the max, it costs `65536 * 20000 gas`, which is significant. The practical approach is to increase cardinality to your required level (e.g., 1800 for most use cases).

### PendleChainlinkOracle Decimals

**Q: Why does the PendleChainlinkOracle return a price with more than 18 decimals?**

The `answer` from `PendleChainlinkOracle` satisfies:

```
1 natural unit of PendleToken = (answer / 1e18) natural unit of OutputToken
```

In other words:

```
10**(PendleToken.decimals) = (answer / 1e18) * 10**(OutputToken.decimals)
```

This means the `answer` has `18 + OutputToken.decimals` total decimals. For example, if `OutputToken.decimals = 12`, the answer will have 30 decimals. This is expected behavior.

### sPENDLE Monthly Revenue API

**Q: How can I retrieve sPENDLE monthly revenue data?**

Use the API endpoint: [`getMonthlyRevenue`](https://api-v2.pendle.finance/core/docs#/Ve%20Pendle/VePendleController_getMonthlyRevenue). The response contains:
- `revenues`: Array of monthly revenues in USD
- `timestamps`: Corresponding month timestamps (first epoch's start timestamp, in seconds)
- `accumulatedRevenue`: Sum of all revenues
