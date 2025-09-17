# Withdrawals / Deposits from Other Chains

Pendle exists in multiple chains + L2s and certain assets that Pendle supports on these chains might not be native to the chain.&#x20;

These assets might have liquidity constraints on external DEXes which can affect user experience on Pendle, especially when interacting via a different asset (e.g: Using USDT to purchase PT-sUSDE on Arbitrum -> Pendle will utilize external DEXes to swap USDT to sUSDE prior to purchasing PT).

To avoid heavy price impacts from external DEXes in such situations, you can consider interacting with the asset's home chain (usually Ethereum mainnet):&#x20;

#### Withdrawal Guide for non-native assets in L2:

1. Bridge to Ethereum Mainnet
   1. Use the underlying protocol's dedicated bridge (if any, refer to the respective protocol's docs for more info)
   2. Or use your preferred bridge aggregator
2. Withdraw natively via the underlying protocol
   1. Go to the underlying protocol's website / dApp and withdraw. \
      If the same asset is available on Pendle on Ethereum, check out the info page for the URL.![](/pendle-academy/imgs/image.png)

#### Deposit Guide for non-native assets in L2:

1. Deposit natively via the underlying protocol
   1. Go to the underlying protocol's website / dApp.\
      If the same asset is available on Pendle on its home chain, check out the info page for the URL.\
      ![](/pendle-academy/imgs/image.png)
2. Bridge to the destination network
   1. Use the underlying protocol's dedicated bridge (if any, refer to the respective protocol's docs for more info)
   2. Or use your preferred bridge aggregator
