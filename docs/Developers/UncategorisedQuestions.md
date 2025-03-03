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

### How do I fetch the PT exchange rate?
You can get the PT (Principal Token) exchange rate via:
- Pendle API method (recommended): [Pendle price API](https://api-v2.pendle.finance/core/docs#/Assets/AssetsSimplifiedController_getAllAssetPricesByAddresses)
- On-chain method: [https://docs.pendle.finance/Developers/Backend/RouterStatic](https://docs.pendle.finance/Developers/Backend/RouterStatic)

### How can I retrieve historical PT and YT prices?
You can track historical PT/YT prices using:

- Pendle API method (recommended): [Pendle ohlcv API](https://api-v2.pendle.finance/core/docs#/Prices/PricesController_ohlcv_v4). Note that shorter timeframes (e.g., minute-by-minute updates) are not yet available.
- Pendle API for market history

### What should I do if swap endpoints are deprecated?
If an API swap endpoint is deprecated, follow these steps:

- Check Pendle’s API docs for the latest endpoints
- Use updated SDK methods for compatibility
- Follow official announcements for migration guidance

For the latest API versions, visit Pendle API v2 Docs.

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

This FAQ section is regularly updated with new questions and answers as they arise.

