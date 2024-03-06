---
hide_table_of_contents: true
---
# In-depth technical details

**This document is being iterated on rapidly due to incoming questions from partner protocols.** 

## StandardizedYield (SY)

### Minting and Redeeming SY

SY can usually be minted using `tokenIn`, with some exceptions. Remember, SY simply wraps the underlying yield token. Minting SY essentially buys the underlying token. Consequently, minting/redeeming behavior varies based on the underlying protocol. Here are some examples of quirks:

- **GLP:** While purchasable with ETH, USDC, USDT, UNI, etc., caps on ETH & USDC are frequently reached, preventing their use for GLP acquisition. Therefore, SY-GLP, despite offering these tokens as `tokenIn`, may not guarantee their use for minting.
- **ankrBNB:** Requires a minimum mint amount of 0.1 BNB. Minting SY-ankrBNB with less than 0.1 BNB will revert. Similarly, ankrBNB can only be withdrawn to BNB through a quick withdrawal pool with sufficient liquidity. Redeeming SY-ankrBNB might occasionally fail.
- **wstETH:** Allows minting by staking ETH, but not vice versa. Consequently, SY-wstETH's `getTokensIn` includes ETH, but `getTokensOut` does not.

The most reliable way to mint/redeem SY is by using the protocol's `yieldToken`. However, hardcoding this approach is not recommended.

### Preview Functions

The underlying protocol often lacks an explicit function for previewing the amount of mintable/redeemable tokens. SY's preview function, a best effort by the Pendle team, approximates the actual mint/redeem results. While its correctness is verified through testing, on-chain use is discouraged.

### AccruedRewards Function

Similar to preview functions, the underlying protocol might not offer a way to preview a user's redeemable rewards. Therefore, SY's `accruedRewards` function only reflects accrued (not yet accrued) rewards for the user. To get the latest results, simulate `claimRewards(user)` through `eth_call` or `staticCall`.

### Asset of SY / AssetInfo Function

Setting the asset of SY can be tricky. The returned asset represents the best approximation of what SY appreciates against. However, SY price often deviates from `exchangeRate()` multiplied by the asset price. A prime example is SY-ETHx, where the asset is ETH, but ETHx usually has a slight depeg. Unfortunately, there's no better way to set the asset for ETHx.

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