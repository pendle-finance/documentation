---
hide_table_of_contents: true
---
# Frequently Asked Questions

**This document is being iterated on rapidly due to incoming questions from partner protocols.** 
## Contract

### Why No `swapExactSyForPt`?

Unlike standard AMMs, Pendle's AMM only allows swapping exact PT in/out. Therefore, functions like `swapExactSyForPt` and `swapPtForExactSy` should generally be avoided. If necessary, use PendleRouter's `swapExactSyForPt` with `approx` parameters. Refer to the PendleRouter documentation for details.

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

### Getting Up-to-Date `accruedRewards` On-Chain (Applicable to SY, YT, & LP)

There are two methods:

1. **Call `redeemRewards(user)` and retrieve the output.** This method has the side effect of redeeming the user's rewards, so it might not be ideal.
2. **Call `IERC20(market).transfer(user,0)` followed by `accruedRewards`.** The transfer triggers an update of the user's rewards.

### Can the output of `getRewardTokens` change?

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

Pendle can’t provide a perfect PT to Asset price because Asset price is not well defined. Take a simple example:
PT-sUSDe / SY-sUSDe with asset being USDe
Pendle can guarantee 1 PT-sUSDe can be traded to X SY-sUSDe == X sUSDe . So PT to SY price exists natively
Pendle can’t guarantee sUSDe is redeemable to some amount of USDe

Which now traced back to: SY-sUSDe’s asset is not USDe, but USDe staked in Ethena, and the price of this is not well defined

**Question:**
Thanks! That makes sense utilizing the SY and letting integrators choose the approriate method. What would happen in essence if there was a depeg in USDe from PT to Asset, would there possibly be any impact on the PT to Asset oracle feed relative to a PT to SY?

**Answer:**
for sUSDe depeg from USDe, PT price is not impacted even when PT-Asset is used because Pendle base the SY-Asset conversion rate on the underlying contract, not the market rate (this rate is SY.exchangeRate() and it will always read a rate provided by the underlying contract)