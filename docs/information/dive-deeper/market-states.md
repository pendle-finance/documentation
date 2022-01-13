---
sidebar_position: 3
---

# Market States

There are three market states for YT in Pendle:
 1. Active
 2. Frozen
 3. Expired

### Active state

The Active State makes up the majority of the life cycle of the market. During this phase, users are able to perform all functions in the pool, with the exception of the renew function.

### Frozen state

As YT contracts near expiry, the market will enter the Frozen State. The start time for the Frozen State can be calculated as follows:

**On Ethereum**
$$$
startTimeFrozenState = \cfrac{1}{20} \cdot contractDuration
$$$

**On Avalanche**
$$$
startTimeFrozenState = \cfrac{1}{360} \cdot contractDuration
$$$

During the Frozen state, the following functions will be disabled for that pool:

* Swapping of tokens
* Provision of liquidity with both single asset and dual assets
* Withdrawal of liquidity with single asset

The frozen state is implemented to mitigate the margin of error in the accuracy of token quantities during this period, which affects any swap of tokens, including when providing or withdrawing single asset liquidity.

Providing liquidity at this time would also be inefficient for a new LPer, as liquidity incentives and swap fees cease upon contract expiry.

However, users are still free to withdraw liquidity with dual assets and the YT will continue to accrue yield as per normal.

### Expired state

As contracts enter the Expired State, LPs will stop earning incentives and swap fees and YTs will also no longer accrue yield. If you have staked LP tokens, you are advised to

1. Unstake the LP tokens
2. Remove liquidity of the position held
3. Renew the expired OT to a new expiry or redeem the underlying

No action is necessary for expired YT tokens. You can [claim](../using-the-app/claim.md) the accrued yield, along with any incentives and rewards, on the [Dashboard](https://app.pendle.finance/dashboard). 
