---
hide_table_of_contents: true
---

# PendleRouterStatic

## Overview

**Please note that this RouterStatic should not be used for fund-sensitive/on-chain transactions. If you or your team needs to use any functions on-chain, please let us know.** 

This docs assume you have read Pendle's [High Level Architecture](../HighLevelArchitecture.md).

The RouterStatic addresses across the different chains can be found under Deployments on the navigation sidebar on the left.

RouterStatic is a contract designed for off-chain computations. It's a multi-facet proxy (ERC2535), so the easiest way to use it is by using the ABI of `contracts/interfaces/IPRouterStatic.sol`. The Router will resolve the call accordingly when any function is called.

Most functions are straightforward to use. Below, we discuss some less straightforward functions:

```solidity
function getLpToSyRate(address market) external view returns (uint256);

function getPtToSyRate(address market) external view returns (uint256);

function getLpToAssetRate(address market) external view returns (uint256);

function getPtToAssetRate(address market) external view returns (uint256);
```

- `getLpToSyRate`: Retrieves the **spot** price of LP in terms of its corresponding SY.
- `getLpToAssetRate`: Serves the same purpose, but in terms of SY's asset.

Let's consider the following example:

![RouterStatic Example](/img/Developers/routerstatic_example.png "RouterStatic Example")

The total value of LP is 4.90M USD, and the total supply of LP is 1,373.11.

⇒ The price of one LP is 3568 USD.

By calling **`getLpToSyRate`**, we receive `1817546249542325054`, which is 1.817 SY-wstETH == 1.817 wstETH. At this time, the price of one token is 1,966 USD, so one LP is roughly 3572 USD.

By calling **`getLpToAssetRate`**, we receive `2049787610667181659`, which is 2.049 stETH == one LP is roughly 3567 USD.
