---
hide_table_of_contents: true
---

# Pendle Router Overview

## Quick Start

- To see examples of how to use Pendle Router, check out the [Integration Guide](#integration-guide).

## Overview

PendleRouter is a contract that aggregates callers' actions with various SYs, PTs, YTs, and markets. It does not have any special permissions or whitelists on any contracts it interacts with. However, it is recommended that third parties use the Router to enjoy the fee discount while trading with the pool, as opposed to directly interacting with the pools themselves. The lnFeeRateRoot in the pool will be reduced when the Router is used to trade.

The Router has had three historical versions, with **RouterV4** very likely being the final version:

| Version | Deployed | Address | Notes |
|---------|----------|---------|-------|
| RouterV1 | Nov 23, 2022 | `0x41FAD93F225b5C1C95f2445A5d7fcB85bA46713f` | Initial release |
| RouterV2 | Feb 21, 2023 | `0x0000000001e4ef00d069e71d6ba041b0a16f7ea0` | 15–20% gas optimization |
| RouterV3 | Dec 18, 2023 | `0x00000000005BBB0EF59571E58418F9a4357b68A0` | Added limit order support |
| **RouterV4** | Apr 29, 2024 | `0x888888888889758F76e7103c6CbF23ABbF58F946` | **Upgradable** — new features and optimizations are added gradually without requiring partners to migrate |

Since PendleRouter is a proxy to multiple implementations (using the [EIP-2535 Diamond Standard](https://eips.ethereum.org/EIPS/eip-2535)), the caller can call the desired functions, and the Router will resolve to the correct implementation. Please refer to the [list of callable functions](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/interfaces/IPAllActionV3.sol).

:::caution Block Explorer Limitation
Because the Router uses the Diamond proxy pattern, block explorers like Etherscan **cannot correctly display all available functions**. They typically only show the ABI of the base proxy contract, not the aggregated functions from all its facets (implementations). To interact with the full range of Router functions, use the complete combined ABI from [`IPAllActionV3.sol`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/interfaces/IPAllActionV3.sol).
:::

**Important notes on older Router versions:**
- **RouterV2** may have issues with newer markets where a necessary approval step is not being called. On some networks like Mantle, RouterV2 is not supported and will revert.
- **RouterV3** and earlier versions remain functional but lack the latest optimizations. Upgrading to **RouterV4** is highly recommended for all integrations.

For a comprehensive understanding of the Pendle ecosystem, including key concepts and terminology, please refer to the [High Level Architecture](../../HighLevelArchitecture).

## Integration Guide

This section covers how to interact with the Pendle Router to buy and sell Principal Tokens (PTs) and Yield Tokens (YTs) using two methods:

1. **Pendle's Hosted SDK**: Recommended for optimized liquidity, gas efficiency, and broader token support. Hosted SDK is publicly available at [https://api-v2.pendle.finance/core/docs](https://api-v2.pendle.finance/core/docs). More about it at [Pendle Hosted SDK](../../Backend/HostedSdk.mdx).
2. **Direct Interaction with the Pendle Router**: Offers direct contract interaction, all data is generated on-chain.

We highly recommend using Pendle's SDK to generate calldata for several reasons:

1. **Gas Efficiency**: Currently, Pendle's AMM only supports the built-in `swapExactPtForSy` and `swapSyForExactPt`. To execute a `swapExactTokenForPt` (which is essentially the same as `swapExactSyForPt`), the router will conduct a binary search to determine the amount of PT to swap. While the binary search can be done entirely on-chain, limiting the search range off-chain will result in significantly less gas consumption for this function. The SDK leverages off-chain data to optimize gas usage, potentially reducing gas costs significantly.
2. **Accurate Price Impacts**: The SDK provides precise calculations for swaps, ensuring better price impacts for users.
3. **Limit Order System**: The limit order system of Pendle exists solely off-chain. Including these limit orders in on-chain swaps can significantly improve the price impact for users, particularly during large-size swaps.
4. **Ease of Integration**: By using the SDK, developers can seamlessly integrate Pendle's functionality into their applications, leveraging the full power of the swap aggregator, limit order system, and off-chain data preparation.
5. **Convenient zapping with any ERC20 token**: Liquidity is currently fragmented across a large number of pools across various DEXes. Integrating only Uniswap or Balancer has proven to be insufficient. As a result, PendleRouter has natively integrated [KyberSwap](https://kyberswap.com/) to swap from any ERC20 token to another. For KyberSwap to work, the routing algorithm must be called off-chain and then pass the routing results to the Router to execute.

We'll explore both methods, including example code, for each approach.

### Method 1: Using the Pendle Hosted SDK (Recommended)

The Hosted SDK handles off-chain optimization, aggregator routing, and limit order integration automatically. See the [Hosted SDK Documentation](../../Backend/HostedSdk.mdx) for full details, examples, and supported operations.

### Method 2: Direct Interaction with the Pendle Router

For fully on-chain integrations without the SDK, see the [Contract Integration Guide](./ContractIntegrationGuide) for step-by-step Solidity examples covering PT/YT trading, liquidity management, and minting/redeeming.

Key struct types used by the Router (`TokenInput`, `TokenOutput`, `ApproxParams`, `LimitOrderData`) are documented in the [Types and Utility Functions](./ApiReference/Types) reference, along with helper functions for on-chain parameter generation.

### Available Router Functions

- **Trading**: `swapExactTokenForPt`, `swapExactPtForToken`, `swapExactTokenForYt`, `swapExactYtForToken`
- **Liquidity**: `addLiquiditySingleToken`, `removeLiquiditySingleToken`
- **Minting/Redeeming**: `mintPyFromToken`, `redeemPyToToken`
- **Rewards**: `redeemDueInterestAndRewards`

For the full list, see [`IPAllActionV3.sol`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/interfaces/IPAllActionV3.sol). Example code: [RouterSample.sol](https://github.com/pendle-finance/pendle-examples-public/blob/main/test/RouterSample.sol).
