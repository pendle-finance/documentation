---
hide_table_of_contents: true
---

# Exiting the Kyber Pool

## Guide

As NFT withdrawals isn't directly support in the Pendle UI yet, here's a step by step guide on how to exit your Pendle LP position into the NFT.

1. ### Zap out LP Tokens to SY

![Kyber Pool Guide 1](/img/AppGuide/kyber-pool-guide-1.png "Kyber Pool Guide 1")

2. ### Redeem SY for NFT on Arbiscan
   1. Open the Kyber SY token contract on Arbiscan: https://arbiscan.io/token/0x6f14d3cd37a0647a3ee60eb2214486f8a1cddccc?a=0xb7ffe52ea584d2169ae66e7f0423574a5e15056f#readProxyContract#F5
   2. Find function `balanceOf()` and input your wallet address. Hit the query button and copy over the returned number.
   ![Kyber Pool Guide 2](/img/AppGuide/kyber-pool-guide-2.png "Kyber Pool Guide 2")
   3. Click the `Write as Proxy` tab in the same page to interact with the contract and to call the `withdrawNft()` function or click this link: https://arbiscan.io/token/0x6f14d3cd37a0647a3ee60eb2214486f8a1cddccc?a=0xb7ffe52ea584d2169ae66e7f0423574a5e15056f#writeProxyContract#F16
   4. Connect your wallet.
   5. Paste the number returned from `balanceOf()`  which you copied previously. Alternatively, you can manually input the amount of SY you want to withdraw, but make sure the value is in wei or multiplied by 10^18.
   6. Submit your transaction.
   ![Kyber Pool Guide 3](/img/AppGuide/kyber-pool-guide-3.png "Kyber Pool Guide 3")
3. ### Redeem wstETH and axlwstETH on KyberSwap.
   1. Visit Kyber's `My Pools`` page on KyberSwap: [KyberSwap My Pools](https://kyberswap.com/myPools/arbitrum)
   2. Connect your wallet to access your LP tokens. Make sure you are on the Arbitrum network.
   3. Locate and click on the `Remove Liquidity`` option.
   ![Kyber Pool Guide 4](/img/AppGuide/kyber-pool-guide-4.png "Kyber Pool Guide 4")
   4. Follow the on-screen steps to withdraw your wstETH and axlwstETH.
   ![Kyber Pool Guide 5](/img/AppGuide/kyber-pool-guide-5.png "Kyber Pool Guide 5")
