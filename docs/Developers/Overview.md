---
hide_table_of_contents: true
---

# Overview

## How Pendle Works

To understand how Pendle works on the contract level, you can:
- Start with Pendle's [High Level Architecture](./HighLevelArchitecture.md) for an overview of the components in Pendle protocol.
- Refer to the developer docs on [vePENDLE](./Contracts/vePENDLE.md) to understand the components and cross-chain mechanisms of vePENDLE.

- Refer to the repository for Pendle V2 contracts: [GitHub link](https://github.com/pendle-finance/pendle-core-v2-public/)

To understand the deeper mechanics and formulas involved in the Pendle protocol, you can refer to the 4 whitepapers at [this link](https://github.com/pendle-finance/pendle-v2-resources/tree/main/whitepapers):
- SY: explains EIP-5115 Standardized Yield, a token standard to generalize yield generating mechanisms;
- SYS: explains how Pendle split any Standardized Yield token into Principal Tokens and Yield Tokens;
- V2_AMM: explains how the AMM works in Pendle V2;
- vePENDLE: explains how vePENDLE works;

## How to Integrate Pendle

### For on-chain contract systems building on top of Pendle
- For money markets or CDP-like stablecoins looking to accepts PT as collateral: refer to [PT as Collateral doc](./Integration/PTAsCollateral.md)
- For money markets or CDP-like stablecoins looking to accepts Pendle's LP token as collateral: refer to [LP as Collateral doc](./Integration/LPAsCollateral.md)
- For systems that need an oracle for PT or LP prices: refer to [this for the PT Oracle](./Integration/PTOracle.md) and [this for the LP Oracle](./Integration/LPOracle.md)

### For off-chain systems building on top of Pendle:
Pendle provides three key services to support developers in leveraging the Pendle protocol.
* **Pendle's RouterStatic:** This is a low-level system built in Solidity, consisting of on-chain computational and data aggregation functions. You can find additional details [here](./Helpers/PendleRouterStatic.md).
* **Pendle's Hosted SDK:** This is a collection of APIs designed to generate calldata for on-chain operations, such as buying PT, zapping into a market, or redeeming yield. More information is available [here](./Helpers/HostedSDK.md).
* **Pendle's Backend:** This comprises a set of APIs designed to integrate on-chain and off-chain data, covering aspects like spot and historical prices of various assets, APYs of different markets, and a list of transactions for a market. Further details can be found [here](./Helpers/Backend.md).


### For mobile wallets who want to feature Pendle Earn in your app:
- Pendle Earn is already optimized for mobile usage
- You just need to add a link or shortcut for users to navigate to the Pendle Earn app at https://app.pendle.finance/earn
- If your wallet is not supported on Pendle yet, please reach out to us by creating a ticket at the #collab-ticket channel in our Discord at https://pendle.finance/discord

### Deployed contract addresses:
* [Ethereum](./Deployments/Ethereum.md)
* [Arbitrum](./Deployments/Arbitrum.md)
* [BNB Chain](./Deployments/BNBChain.md)

Other relevant sections can be found in the navigation sidebar on the left.

### Support
Should you need additional assistance, feel free to reach out to us via our [Developers channel in Discord](https://pendle.finance/discord). Pendle's developers are always at hand and you can anticipate a response to your inquiries within 12 hours.