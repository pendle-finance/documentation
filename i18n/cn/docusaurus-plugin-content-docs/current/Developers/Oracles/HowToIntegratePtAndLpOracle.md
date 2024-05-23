---
hide_table_of_contents: true
---
# How to Integrate PT and LP Oracle

Integrating PT and LP oracles into your system can be accomplished in six easy steps. This document provides detailed instructions along with runnable examples. If you need personalized assistance, don't hesitate to contact us via our Developers channel on [Discord](https://pendle.finance/discord).

## First, Understand SY, PT, LP

You can read High Level Architecture & StandardizedYield to understand the Pendle system.

Refer to the examples [here](https://github.com/pendle-finance/pendle-examples/tree/main/test) & [here](https://github.com/pendle-finance/pendle-core-v2-public/tree/main/contracts/oracles) for further understanding.

## Second, Choose a Market & Duration

We recommend choosing a market with high trading activities & deep liquidity. For instance, we'll choose EtherFi's weETH market on Arbitrum, which has 70M USD liquidity at block 192_001_277.

The recommended duration is 15 mins (900 secs) or 30 mins (1800 secs), but it can vary depending on the market.

For a detailed guide on assessing the risk, depth of liquidity & twap duration, refer to the corresponding risk assessment docs.

## Third, Initialize the Oracle

By default, markets' oracles are un-initialized. You can check the oracle's status & initialize it if necessary using `getOracleState` on the `PendlePYLpOracle` contract.

![/img/Developers/Pasted_image_20240319215123.png](/img/Developers/Pasted_image_20240319215123.png)

## Fourth, Get the Price

There are 2 units PT / LP can be denominated in, in SY or in Asset. To get the price in SY, call `getPtToSyRate()`, else call `getPtToAssetRate()`. Ensure to use the appropriate function as SY price is well defined for some markets, but Asset price is not & vice-versa.

Refer to [StandardizedYield docs](../Contracts/StandardizedYield.md) to call the correct function.

Below is an example of how to call the functions.

![/img/Developers/Pasted_image_20240319221744.png](/img/Developers/Pasted_image_20240319221744.png)

![/img/Developers/Pasted_image_20240319221801.png](/img/Developers/Pasted_image_20240319221801.png)

If you don't want to use the library, you can call the `PendlePtLpOracle` directly though it will take around ~4k additional gas.

![/img/Developers/Pasted_image_20240319230732.png](/img/Developers/Pasted_image_20240319230732.png)
## (Optional) Fifth, Multiply the Price with a 3rd Price

You can multiply the `PT-weETH` to `weETH` price by `weETH/ETH` price to get the `PT-weETH/ETH` price, which is more applicable for money markets.

For example:

![/img/Developers/Pasted_image_20240319230333.png](/img/Developers/Pasted_image_20240319230333.png)

![/img/Developers/Pasted_image_20240319230350.png](/img/Developers/Pasted_image_20240319230350.png)

## Lastly, Handle liquidation & LP's rewards

### For PT liquidation
* When a liquidation with $PT$ as collateral occurs, commonly, the liquidator will have to sell $PT$ into common asset to pay their debt.
* In Pendle's system, we support converting $PT$ back to $SY$ by selling $PT$ on our AMM (before maturity) or redeeming directly from `PendleYieldToken` contract (post maturity). This will then allow the liquidator to redeem their $SY$ into one of the output token of $SY$ (see [EIP-5115](https://eips.ethereum.org/EIPS/eip-5115)).
* For reference, we have written the [`BoringPtSeller`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/offchain-helpers/BoringPtSeller.sol) contract to sell $PT$ into one of the output token.
* You can extend this abstract contract to use in a liquidation system.

### For LP liquidation
* When a liquidation with $LP$ as collateral occurs, commonly, the liquidator will have to sell $LP$ into common asset to pay their debt.
* In Pendle's system, we support converting $LP$ back to $SY$ by removing liquidity single-sided into $SY$ on our AMM (before maturity) or redeeming $PT$ + $SY$ and redeeming $PT$ to $SY$ directly from `PendleYieldToken` contract (post maturity). This will then allow the liquidator to redeem their $SY$ into one of the output token of $SY$ (see [EIP-5115](https://eips.ethereum.org/EIPS/eip-5115)).
* For reference, we have written the [`BoringLpSeller`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/offchain-helpers/BoringLpSeller.sol) contract to sell $LP$ into one of SY's output tokens.
* You can extend this abstract contract to use in a liquidation system.

### Handling of Pendle LP's rewards:
* Holding Pendle LP tokens will generate PENDLE incentives and potential reward tokens (like WETH for LP for GLP pool)
* The money market contracts will need to redeem these rewards by calling the `redeemRewards` function and implement logic to distribute these rewards to their users
