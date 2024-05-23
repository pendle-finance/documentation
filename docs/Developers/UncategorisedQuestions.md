---
hide_table_of_contents: true
---
# Uncategorised questions

**This document is being iterated on rapidly due to incoming questions from partner protocols.** 
## Router

### Why No `swapExactSyForPt`?

Unlike standard AMMs, Pendle's AMM only allows swapping exact PT in/out. Therefore, functions like `swapExactSyForPt` and `swapPtForExactSy` should generally be avoided. If necessary, use PendleRouter's `swapExactSyForPt` with `approx` parameters. Refer to the PendleRouter documentation for details.

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

