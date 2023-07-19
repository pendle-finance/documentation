---
hide_table_of_contents: true
---

# LP Oracle

:::info
Please make sure you have a good understanding of how Pendle prices PT before learning more about LP oracle (see more about PT oracles [here](./PTOracle.md))
:::

The Pendle's LP token represents a user's share in Pendle AMM which pairs up PT and SY.

SY is the interest-bearing token wrapper which enables depositing from and redeeming from underlying asset with no additional fee or price impact. PT can be traded to and from SY/underlying asset using our AMM, with a built-in geometric mean pricing module.

## About LP Oracle

LP oracle returns the estimated TWAP exchange rate between LP token and underlying asset. Our approach for LP pricing is to simulate a hypothetical trade on the AMM so that its PT spot price (and the implied rate) matches PT price (and the implied rate) from PT oracle before using market state to calculate LP price.

For example:
* The 1hr TWAP PT price is 0.90 asset.
* The current state of the market is (x PT, y SY), where PT price is 0.92 asset
* We calculate a hypothetical, zero-fee swap that brings PT price to 0.90 asset, to reach a state of (x' PT, y' SY)
* We calculate the estimated TWAP LP token price based on the hypothetical state (x' PT, y' SY) and PT price of 0.90 asset

A detailed work on the math for this approach can be found [here](https://github.com/pendle-finance/pendle-v2-resources/blob/main/docs/LP_Oracle_Doc.pdf).

## Oracle Preparation

Since LP pricing only depends on PT oracles, its preparation is also the same as setting up a [PT oracle](./PTOracle.md).

## Fetch price

We have implemented the library for fetching oracle exchange rate of LP/underlying asset, which can be found [here](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/oracles/PendleLpOracleLib.sol). 

We have also prepared a sample LP oracle for the GLP market in Pendle, in which the LP pricing to USD is as simple as:
```sol
// You can install npm package @pendle/core-v2 to directly import Pendle V2 contracts
import "@pendle/core-v2/contracts/oracles/PendleLpOracleLib.sol";
contract PendleLpGlpOracle {
    //...
    function getLpPrice() external view virtual returns (uint256) {
        uint256 lpRate = IPMarket(market).getLpToAssetRate(twapDuration);
        uint256 assetPrice = IGlpManager(glpManager).getPrice(true);
        return (assetPrice * lpRate) / (10 ** 30);
    }
}
```

The full implementation of this LP-GLP oracle has been deployed [here](https://arbiscan.io/address/0x67E64AF30E04A7277ab2D4f09ACE3F77a15801F9#code).
