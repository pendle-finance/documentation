---
hide_table_of_contents: true
---

# Overview

### How Pendle works
To understand how Pendle works on the contract level, you can:
- Start with Pendle's [High Level Architecture](./HighLevelArchitecture.md) for an overview of the components in Pendle protocol.
- Refer to [this](./Contracts/vePENDLE.md) to understand the components and cross-chain mechanisms of vePENDLE
- Refer to the docs about [PendleRouter](./Contracts/PendleRouter.md) and [PendleRouterStatic](./Contracts/PendleRouterStatic.md) to understand how to interact with the protocol on the contract level.
- Refer to the repository for Pendle V2 contracts: [GitHub link](https://github.com/pendle-finance/pendle-core-v2-public/)

To understand the deeper mechanics and formulas involved in the Pendle protocol, you can refer to the 4 whitepapers at [this link](https://github.com/pendle-finance/pendle-v2-resources/tree/main/whitepapers):
- SY: explains Standardized Yield, a token standard to generalise yield generating mechanisms
- SYS: explains how Pendle split any Standardized Yield token into Principal Tokens and Yield Tokens
- V2_AMM: explains how the AMM works in Pendle V2
- vePENDLE: explains how vePENDLE works

### How to integrate Pendle
##### For on-chain contract systems building on top of Pendle:
- For money markets or CDP-like stablecoins looking to accepts PT as collateral: start [here](./Integration/PTAsCollateral.md)
- For money markets or CDP-like stablecoins looking to accepts Pendle's LP token as collateral: start [here](./Integration/LPAsCollateral.md)
- For systems that need an oracle for PT or LP prices: refer to [this for PT oracle](./Integration/PTOracle.md) and [this for LP oracle](./Integration/LPOracle.md)

##### For offchain systems building on top of Pendle:
- To interact with Pendle contracts or to read onchain information (for a frontend, or a bot/script), you can use the Pendle SDK. See the docs [here](./SDK/GettingStarted.md)
- To read details about Pendle systems from our backend (for example, to display or monitor details of certain Pendle markets), you can use our REST API. See the relevant docs [here](./API/RESTfulAPI.md)

##### For mobile wallets who want to feature Pendle Earn in your app:
- Pendle Earn is already optimised for mobile usage
- You just need to add a link or shortcut for users to navigate to Pendle Earn app at https://app.pendle.finance/earn
- If your wallet is not supported on Pendle yet, please reach out to us by creating a ticket at the #collab-ticket channel in our Discord at https://pendle.finance/discord

### Deployed contract addresses:
* [Ethereum](./Deployments/Ethereum.md)
* [Arbitrum](./Deployments/Arbitrum.md)
* [BNB Chain](./Deployments/BNBChain.md)

Other relevant sections can be found in the navigation sidebar on the left.
