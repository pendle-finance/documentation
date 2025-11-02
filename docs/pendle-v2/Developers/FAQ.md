---
hide_table_of_contents: true
---
# Frequently Asked Questions

**This document is being iterated on rapidly due to incoming questions from partner protocols.** 
## Contract

### Why No `swapExactSyForPt`?

Unlike standard AMMs, Pendle's AMM only allows swapping exact PT in/out. Therefore, functions like `swapExactSyForPt` and `swapPtForExactSy` should generally be avoided. If necessary, use PendleRouter's `swapExactSyForPt` with `approx` parameters. Refer to the PendleRouter documentation for details.

### How can I deploy a new SY Token on Pendle?
Pendle's smart contracts are permissionless, meaning anyone can deploy a new Standardized Yield (SY) Token without requiring approval from the Pendle team. To implement an SY Token, you must follow the Pendle SY Token standard, ensuring compatibility with the ecosystem. Detailed guidance, including contract structure and best practices, can be found in the [Pendle Developer Documentation](https://docs.pendle.finance/Developers/Contracts/StandardizedYield).

## Backend

### How can I preview the received amount of add/remove liquidity?

To preview the amount you'll receive before submitting transactions, you can use:

- Pendle API method (recommended): [Pendle Hosted SDK API](https://api-v2.pendle.finance/core/docs#/SDK/SdkController_addLiquidity)
- On-chain method: [PendleRouter Contract](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/interfaces/IPActionAddRemoveLiqV3.sol). The detailed guide can be found here [https://docs.pendle.finance/Developers/Contracts/PendleRouter](https://docs.pendle.finance/Developers/Contracts/PendleRouter)

### How do I fetch the PT price?
You can get the PT (Principal Token) price via:
- Pendle API method (recommended): [Pendle price API](https://api-v2.pendle.finance/core/docs#/Assets/AssetsSimplifiedController_getAllAssetPricesByAddresses)
- On-chain method: `getPtToAssetRate` of RouterStatic [https://docs.pendle.finance/Developers/Backend/RouterStatic](https://docs.pendle.finance/Developers/Backend/RouterStatic)

### How can I retrieve historical PT and YT prices?
You can track historical PT/YT prices using:

- Pendle API method: [Pendle ohlcv API](https://api-v2.pendle.finance/core/docs#/Prices/PricesController_ohlcv_v4). Note that shorter timeframes (e.g., minute-by-minute updates) are not yet available.

## Others

### Getting Up-to-Date `accruedRewards` On-Chain (Applicable to SY, YT, & LP)

There are two methods:

1. **Call `redeemRewards(user)` and retrieve the output.** This method has the side effect of redeeming the user's rewards, so it might not be ideal.
2. **Call `IERC20(market).transfer(user,0)` followed by `accruedRewards`.** The transfer triggers an update of the user's rewards.

### Can the output of `getRewardTokens` change?

Yes, the output can change if the underlying protocol adds new reward tokens. However, no reward tokens will ever be removed.

### How to read unclaimed Rewards and Interest for SY/YT/Market

**On-Chain Method:**

To read for SY, please execute an `eth_call` (`callStatic` in ethersjs) to the following function of SY:

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

### How can I generate all the params for the Router on-chain
Please refer to the following 3 links:

- [PendleRouter](https://docs.pendle.finance/Developers/Contracts/PendleRouter#generating-required-parameters-on-chain)
- [IPAllActionTypeV3.sol](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/interfaces/IPAllActionTypeV3.sol)
- [Pendle Examples](https://github.com/pendle-finance/pendle-examples-public)


### Why shouldn't I use getPtToAssetRate

Please read the following:

**Question:**
I am trying to better understand why Pendle recommends the pricing of PT to SY instead of Assets. From my understanding, pricing of the PT to the SY does not expose the PT price feed the YT to Asset risk. How is the exchange rate from SY to Asset calculated and would that possibly impact the price feed if there was a scenario where there was not withdraw liquidity from SY to Asset?

**Answer:**
Actually, that might be misunderstood. Pendle recommends pricing PT to SY. For SY to any other units, the integrator can choose an appropriate method based on whether the asset can be directly redeemed from the SY or if there is a slashing risk, etc.

Pendle can't provide a perfect PT to Asset price because the Asset price is not well defined. Take a simple example:
- PT-sUSDe / SY-sUSDe with asset being USDe
- Pendle can guarantee 1 PT-sUSDe can be traded to X SY-sUSDe == X sUSDe. So PT to SY price exists natively.
- Pendle can't guarantee sUSDe is redeemable to some amount of USDe.

This traces back to: SY-sUSDe's asset is not USDe, but USDe staked in Ethena, and the price of this is not well defined.

**Question:**
Thanks! That makes sense utilizing the SY and letting integrators choose the appropriate method. What would happen in essence if there was a depeg in USDe from PT to Asset, would there possibly be any impact on the PT to Asset oracle feed relative to a PT to SY?

**Answer:**
For sUSDe depeg from USDe, PT price is not impacted even when PT-Asset is used because Pendle bases the SY-Asset conversion rate on the underlying contract, not the market rate (this rate is `SY.exchangeRate()` and it will always read a rate provided by the underlying contract).

**Question:**
Why do quoted amounts from Pendle's quoter contract rate functions (e.g., `getPtToSyRate`, `getYtToSyRate`) differ from actual amounts returned by router functions, and what is the most accurate method for obtaining swap amounts?

**Answer:**
The rate functions in Pendle's quoter contract provide spot prices, which do not account for price impact. To obtain the most accurate swap amounts, call Pendle's router functions directly.

**Question:**
Why does the quantity of aTokens fluctuate when claiming rewards or transferring them, and how does this affect transactions?

**Answer:**
aTokens are rebasing tokens from Aave, meaning their quantity accrues rewards in real-time. This property causes the token balance to fluctuate, even during a transfer. Consequently, if you attempt to transfer a specific amount, the actual amount received might be slightly different (e.g., A-1 instead of A), which can lead to transaction failures if not accounted for. This is a well-known characteristic of aTokens, not an issue with Pendle itself.

**Question:**
What is the recommended way to handle aToken rebasing to prevent transaction failures?

**Answer:**
Due to the real-time rebasing nature of aTokens, their balance can change unexpectedly. To prevent transaction failures, it is crucial to check the aToken balance immediately before each transfer or operation that relies on a precise quantity. This ensures that the transaction uses the most up-to-date balance.

**Question:**
What is the format for `expectedCap` and `currentCap`?

**Answer:**
The `expectedCap` and `currentCap` values are provided in base18 format (18 decimals).

**Question:**
How can I get pending LP/market rewards and YT rewards?

**Answer:**
You can call the `redeemRewards` function in the market contract for LP/market rewards, or call `redeemDueInterestAndRewards` in YT contracts for YT rewards.

**Question:**
Are PT to PT swaps supported for all asset pairs on the same chain?

**Answer:**
No, PT to PT swaps are only available selectively and not across all assets.

**Question:**
Are there any fees associated with using the Pendle API?

**Answer:**
No, there are no fees required to use the Pendle API.

**Question:**
What are the considerations for selecting aggregators when using Pendle's API, and which aggregator is recommended for specific use cases?

**Answer:**
The choice of aggregators depends on your use case, as using more aggregators increases cost. For previewing results, Kyber is recommended due to its speed, extensive route support, and low CU cost. For sending transactions, it is advisable to enable more aggregators to ensure the best possible routing.

**Question:**
When will PENDLE incentives for a new market begin?

**Answer:**
PENDLE incentives for a new market will begin on Thursday at 00:00 UTC (12 AM UTC), after the market has been whitelisted and added to voting.

**Question:**
Does the `priceImpact` value in the Pendle API account for both fees and slippage?

**Answer:**
The `priceImpact` value includes fees but does not account for slippage. Slippage can only be determined after the transaction has been sent.

