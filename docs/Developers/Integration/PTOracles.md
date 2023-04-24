---
hide_table_of_contents: true
---

# PT Oracles


The **Principal Token (PT)** is an ERC20 token bearing the value of a certain amount of asset which can be redeemed at maturity. For example, `100 PT-stETH-25DEC2025` can be redeemed for `100 stETH` on the 25th of December 2025.

In Pendle system, $PT$ can be freely traded from and to $SY$ (EIP-5115 token) ultilizing our AMM. With the built-in TWAP oracle library, the geometric mean price of $PT$ can be derived from our `PendleMarket` contracts fully on-chain.

## About Our Oracles

Pendle's oracle implementation is inspired from the idea of UniswapV3 Oracle (see [here](https://docs.uniswap.org/concepts/protocol/oracle)) with a slight difference on how we define the cumulative rate. In short, our oracle stores the cumulative logarithm exchange rate between $PT$ and $Asset$ (please refer to the definition of assets [here](https://eips.ethereum.org/EIPS/eip-5115)).

### EIP-5115 Asset

Although the AMMs hold their positions and execute trades in $PT$ and $SY$, their underlying logic assumes all their $SY$ balances are converted to assets. As a result, the exchange rate stored in our oracles are between $PT$ and $Asset$, which should make pricing $PT$ more straightforward.

Let's take `PT-stETH-25DEC2025` as an example. We have:
1. $Asset$ in this case is `stETH`
2. $oraclePtToAssetRate = 0.9$
3. $stETHPrice = \$2000$ 

Thus, the price of `PT-stETH-25DEC2025` should be $0.9 \times 2000 = \$1800$

### Formulas

Our oracle storage is in the following form:

```sol
struct Observation {
    // the block timestamp of the observation
    uint32 blockTimestamp;
    // the tick logarithm accumulator, i.e., ln(exchangeRate) * time elapsed since the pool was first initialized
    uint216 lnImpliedRateCumulative;
    // whether or not the observation is initialized
    bool initialized;
}
```

The geometric mean price of $PT$ for the time interval of $[t_0, t_1]$ is:

$$$
lnPrice = \frac{lnImpliedRateCumulative_1 - lnImpliedRateCumulative_0}{t_1 - t_0}
$$$
$$$
price = e^{lnPrice}
$$$

## Using PT as Collateral

### Oracle Preparation

Since our AMMs use TWAP oracles, firstly, we must define a $duration$ for the pricing interval. Same as UniswapV3 oracles, each $PT$ oracle has its own limitation on how far in the past the pricing data can be accessed. To check the validity of a duration for each a market, please query the following function from our `PendlePtOracle` contract:

```sol
function getOracleState(
    address market,
    uint32 duration
)
    external
    view
    returns (
        bool increaseCardinalityRequired,
        uint16 cardinalityRequired,
        bool oldestObservationSatisfied
    );
```

If `increaseCardinalityRequired` is returned `True`, it means the oracle's size of tracked observations must be expanded to `cardinalityRequired` before any price usage.

If `oldestObservationSatisfied` is returned `False`, it means the oldest observations was recorded less than $duration$ seconds ago. In this case, the oracle needs more time to fill its observations to satisfy this specific $duration$.

:::info

To sum up, please make sure you have `increaseCardinalityRequired = False` and `oldestObservationSatisfied = True` before using our oracle on production.

:::

### Fetch price

First of all, the rate returned from Pendle PT oracles is the exchange rate between $PT$ and $Asset$. This implies your oracle implementation should take care of the conversion between $Asset$ and the quote asset of your oracle system. 

There are two ways to achieve the exchange rate between $PT$ and $Asset$ from our oracle:
1. Calling `getPtToAssetRate(address market, uint32 duration)` function from our `PendlePtOracle` contract
2. Using our [contract library](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/oracles/PendlePtOracleLib.sol) in your own contract

Compared to the first method, using a library reduce one external call from your contract to `PendlePtOracle`, making the implementation more gas saving.

For reference, please check out our sample contracts for `GLP` and `ChainlinkAsset` oracles [here](https://github.com/pendle-finance/pendle-core-v2-public/tree/main/contracts/oracles/samples). 

### Liquidation

When a liquidation with PT as collateral occurs, commonly, the liquidator will have to sell $PT$ into common asset to pay their debt from flashloan. 

In Pendle's system, we support converting $PT$ back to $SY$ by selling $PT$ on our AMM (before maturity) or redeeming directly from `PendleYieldToken` contract (post maturity). This will then allow the liquidator to redeem their $SY$ into one of the output token of $SY$ (see [EIP-5115](https://eips.ethereum.org/EIPS/eip-5115)).

For reference, we have written the [`BoringPtSeller`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/offchain-helpers/BoringPtSeller.sol) contract to sell PT into one of the output token.

## PT Oracle Addresses

| Network  |                                                               Address                                                                |
| :------: | :----------------------------------------------------------------------------------------------------------------------------------: |
| Ethereum | [`0x414d3C8A26157085f286abE3BC6E1bb010733602`](https://etherscan.io/address/0x414d3C8A26157085f286abE3BC6E1bb010733602#readContract) |
| Arbitrum | [`0x428f2f93afAc3F96B0DE59854038c585e06165C8`](https://arbiscan.io/address/0x428f2f93afAc3F96B0DE59854038c585e06165C8#readContract)  |
