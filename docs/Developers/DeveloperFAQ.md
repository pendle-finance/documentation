---
hide_table_of_contents: true
---

# Developer FAQ

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


