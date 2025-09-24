---
hide_table_of_contents: true
---

# Deployments

:::info
While interacting with contracts, please use the ABI of implementation contracts from a block explorer or generate the ABI from the smart contract code in GitHub.
:::

## Core Contracts

Pendle's core contract addresses are organized by chain ID. You can find the latest contract addresses in the deployment files within the [Pendle contract repository](https://github.com/pendle-finance/pendle-core-v2-public).

Each chain's deployment file follows the naming pattern: `/deployments/{chainId}-core.json`

### Supported Chains

| Chain | Chain ID | Deployment File |
|-------|----------|-----------------|
| Ethereum | 1 | [`1-core.json`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/deployments/1-core.json) |
| Optimism | 10 | [`10-core.json`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/deployments/10-core.json) |
| BNB Chain | 56 | [`56-core.json`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/deployments/56-core.json) |
| Sonic | 146 | [`146-core.json`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/deployments/146-core.json) |
| HyperEVM | 999 | [`999-core.json`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/deployments/999-core.json) |
| Mantle | 5000 | [`5000-core.json`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/deployments/5000-core.json) |
| Base | 8453 | [`8453-core.json`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/deployments/8453-core.json) |
| Arbitrum | 42161 | [`42161-core.json`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/deployments/42161-core.json) |
| Berachain | 80094 | [`80094-core.json`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/deployments/80094-core.json) |

To access deployment information for any chain, simply reference the deployment file corresponding to its chain ID in the repository.

## SY / Market / PT / YT Addresses

To find the relevant addresses and details of a specific market:

1. Go to the [Pendle markets page](https://app.pendle.finance/trade/markets)
2. Select the desired chain and click into an asset
3. Click into the button as shown in the image below to view all contract addresses

![Market Info](/img/ProtocolMechanics/market_info.png "Market Info")

## Additional Resources

- [Core Contract Repository](https://github.com/pendle-finance/pendle-core-v2-public)
- [SY Contract Repository](https://github.com/pendle-finance/Pendle-SY-Public)
- All deployed Markets: [GitHub link](https://github.com/pendle-finance/Pendle-SY-Public)