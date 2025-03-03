---

hide_table_of_contents: true

---

# Overview

Welcome to the Pendle Documentation. This overview provides key information and resources to help you understand and integrate with the Pendle protocol.

## Understanding Pendle's Architecture

- Start with Pendle's [High Level Architecture](./HighLevelArchitecture.md) for an overview of the components in the Pendle protocol.
- Pendle's Standardized Yield (SY) have quite a number of nuances to it, refer to the [StandardizedYield](./Contracts/StandardizedYield.md) documentation to understand the different types of SY and how they work.
- Explore the developer documentation on [vePENDLE](./Contracts/vePENDLE.md) to understand the components and cross-chain mechanisms of vePENDLE.
- Also check out [FAQ Questions](./FAQ.md) for answers to common questions.
- To see the latest Pendle's contracts, refer to [Pendle Contract Repo](https://github.com/pendle-finance/pendle-core-v2-public/)
- To see examples of various contract interactions, refer to [Pendle Examples Repo](https://github.com/pendle-finance/pendle-examples-public)



## On-chain Integration

### Interact with Pendle Router
- To learn more about the Router and its functions, refer to [PendleRouter](./Contracts/PendleRouter.md).
- To generate calldata for on-chain operations such as buying PT, adding liquidity into a market, or redeeming yield, refer to [Pendle's Hosted SDK](./Backend/HostedSDK.md).

### Interact with Pendle Oracles
- To get the price of PT, YT, and LP, refer to [How To Integrate Oracles](./Oracles/HowToIntegratePtAndLpOracle.md).
- To learn more about using PT and LP as collateral, refer to [PT as Collateral](./Oracles/PTAsCollateral.md) & [LP as Collateral](./Oracles/LPAsCollateral.md).

## Off-chain Integration

- To query data on prices of PT, YT, LP, APY of pools, and other data, refer to [Pendle's Backend](./Backend/Backend.md). The Backend has a high rate limit and is also the source of data for Pendle DApp.
- To perform various on-chain calculations without using the Backend, refer to [Pendle's RouterStatic](./Backend/RouterStatic.md). This is a low-level system built in Solidity, consisting of on-chain computational and data aggregation functions. Note that this is not to be used for on-chain integration since the contracts are not audited.

## Limit Order System
- To learn more about Pendle's Limit Order System contract, refer to [LimitOrderContract](./LimitOrder/LimitOrderContract.md).
- To learn how to [Create](./LimitOrder/CreateALimitOrder.md), [Cancel](./LimitOrder/CancelOrders.md), [Fill Limit Orders](./LimitOrder/FillALimitOrder.md), refer to the respective files.

## Deployed Contract Addresses

All deployed contracts and markets can be found here: [GitHub link](https://github.com/pendle-finance/pendle-core-v2-public/tree/main/deployments)

To find the relevant addresses and details of a specific market:
1. Go to the market page.
2. Select the desired chain and click on an asset.
3. Click the button as shown in the image below.

![Market Info](/img/ProtocolMechanics/market_info.png "Market Info")

## Whitepaper
For a deeper dive into the mechanics and formulas involved in the Pendle protocol, refer to the four whitepapers at [this link](https://github.com/pendle-finance/pendle-v2-resources/tree/main/whitepapers):
- **SY**: Explains EIP-5115 Standardized Yield, a token standard to generalize yield-generating mechanisms.
- **SYS**: Explains how Pendle splits any Standardized Yield token into Principal Tokens and Yield Tokens.
- **V2_AMM**: Explains how the AMM works in Pendle V2.
- **vePENDLE**: Explains how vePENDLE works.

## Support

For additional assistance, reach out to us via our [Developers channel in Discord](https://pendle.finance/discord). Pendle's developers are always available, and you can expect a response to your inquiries within 12 hours.