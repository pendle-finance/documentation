---
hide_table_of_contents: true
---



# LP Oracle

:::info

Please make sure you have a good understanding of how Pendle prices PT before learning more about LP oracle (see more about PT oracles [here](./PTOracle.md)).
:::

The Pendle's LP token represents an user's share in Pendle AMM pairing up PT and SY.

SY is the interest-bearing token wrapper which enables depositing from and redeeming from underlying asset with no additional fee or price impact. PT can be traded to and from SY/underlying asset with our AMM, with a built-in geometric mean pricing module.



## About LP Oracle

LP oracle returns the estimated TWAP exchange rate between LP token and underlying asset. Our approach for LP pricing is to simulate a hypthetical trade on the AMM so that its PT spot price matches PT price from PT Oracle before using market state to calculate LP price.

A detailed work on the math for this approach can be found [here](...).


## Oracle preparation

Since LP pricing only depends on PT oracles, its preparation is also the same as setting up a [PT oracle](./PTOracle.md).

## Fetch price

We have implemented the library for fetching oracle exchange rate of LP/underlying asset, which can be found [here](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/oracles/PendleLpOracleLib.sol). 

We have also prepared the LP oracle for GLP, in which the LP pricing to USD can be as simple as:
```sol
    function getLpPrice() external view virtual returns (uint256) {
        uint256 lpRate = IPMarket(market).getLpToAssetRate(twapDuration);
        uint256 assetPrice = IGlpManager(glpManager).getPrice(true);
        return (assetPrice * lpRate) / (10 ** 30);
    }
```

The full implementation of this LP-GLP oracle has been deployed [here](https://arbiscan.io/address/0x67E64AF30E04A7277ab2D4f09ACE3F77a15801F9#code).