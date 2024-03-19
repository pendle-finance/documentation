---
hide_table_of_contents: true
---

# Introduction of PT Oracle

In Pendle system, $PT$ can be freely traded from and to $SY$ ultilizing our AMM. With the built-in TWAP oracle library, the geometric mean price of $PT$ in terms of SY or asset can be derived from our `PendleMarket` contracts fully on-chain. Please refer to the [StandardizedYield doc](../Contracts/StandardizedYield) for more details of SY & asset
## Oracle design

Pendle's oracle implementation is inspired from the idea of UniswapV3 Oracle (see [here](https://docs.uniswap.org/concepts/protocol/oracle)) with a slight difference in how we define the cumulative rate. In short, our oracle stores the cumulative logarithm of implied APY (the interest rate implied by $PT/asset$ pricing). From the cumulative logarithm of Implied APY, we can calculate the geometric mean of Implied APY, which will used to derive the mean $PT$ price.

In a way, the Pendle AMM contract has a built-in oracle of interest rate, which can used to derive $PT$ prices.
### Formulas

Our oracle storage is in the following form:

```sol
struct Observation {
    // the block timestamp of the observation
    uint32 blockTimestamp;
    // the tick logarithm accumulator, i.e., ln(impliedRate) * time elapsed since the pool was first initialized
    uint216 lnImpliedRateCumulative;
    // whether or not the observation is initialized
    bool initialized;
}
```

The geometric mean price of $PT$ for the time interval of $[t_0, t_1]$ is:

$$
lnImpliedRate = \frac{lnImpliedRateCumulative_1 - lnImpliedRateCumulative_0}{t_1 - t_0}
$$

$$
impliedRate = e^{lnImpliedRate}
$$

$$
assetToPtPrice = impliedRate^{\frac{timeToMaturity}{oneYear}}
$$

$$
ptToAssetPrice = 1 / assetToPtPrice
$$