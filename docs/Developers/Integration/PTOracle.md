---
hide_table_of_contents: true
---

# PT Oracle

The **Principal Token (PT)** is an ERC20 token bearing the value of a certain amount of asset which can be redeemed at maturity. For example, `100 PT-stETH-25DEC2025` can be redeemed for `100 stETH` on the 25th of December 2025.

In Pendle system, $PT$ can be freely traded from and to $SY$ (EIP-5115 token) ultilizing our AMM. With the built-in TWAP oracle library, the geometric mean price of $PT$ in terms of asset (please refer to the definition of asset [here](https://eips.ethereum.org/EIPS/eip-5115)) can be derived from our `PendleMarket` contracts fully on-chain.

## About Our Oracles

Pendle's oracle implementation is inspired from the idea of UniswapV3 Oracle (see [here](https://docs.uniswap.org/concepts/protocol/oracle)) with a slight difference in how we define the cumulative rate. In short, our oracle stores the cumulative logarithm of implied APY (the interest rate implied by $PT/asset$ pricing). From the cumulative logarithm of Implied APY, we can calculate the geometric mean of Implied APY, which will used to derive the mean $PT$ price.

In a way, the Pendle AMM contract has a built-in oracle of interest rate, which can used to derive $PT$ prices.

### EIP5115 Asset

Although the AMMs hold their positions and execute trades in $PT$ and $SY$, their underlying logics assume all their $SY$ balances are converted to assets. As a result, the exchange rate returned by our oracles are between $PT$ and $Asset$, which should make pricing $PT$ more straightforward.

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

First of all, the rate returned from Pendle $PT$ oracles is the exchange rate between $PT$ and $Asset$. This implies your oracle implementation should take care of the conversion between $Asset$ and the quote asset of your oracle system. 

There are two ways to derive the exchange rate between $PT$ and $Asset$ from our oracle:
1. Calling `getPtToAssetRate(address market, uint32 duration)` function from our `PendlePtOracle` contract
2. Using our [contract library](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/oracles/PendlePtOracleLib.sol) in your own contract

Compared to the first method, using a library reduce one external call from your contract to `PendlePtOracle`, making the implementation more gas saving.

:::note
We recommend using the contract library to get the PT price to save on gas, especially on Ethereum.
:::

As an example, here's how we calculate `PT-GLP` price in US dollar:

```sol
// You can install npm package @pendle/core-v2 to directly import Pendle V2 contracts
import "@pendle/core-v2/contracts/oracles/PendlePtOracleLib.sol";
contract PendlePtGlpOracle {
    //...
    function getPtPrice() external view virtual returns (uint256) {
        uint256 ptRate = IPMarket(market).getPtToAssetRate(twapDuration);
        uint256 assetPrice = IGlpManager(glpManager).getPrice(true);
        return (assetPrice * ptRate) / (10 ** 30);
    }
}
```

For implementation details, please refer to our sample contracts for `GLP` and `ChainlinkAsset` oracles [here](https://github.com/pendle-finance/pendle-core-v2-public/tree/main/contracts/oracles/samples). 

## PT Oracle Addresses

| Network  |                                                               Address                                                                |
| :------: | :----------------------------------------------------------------------------------------------------------------------------------: |
| Ethereum | [`0x14030836AEc15B2ad48bB097bd57032559339c92`](https://etherscan.io/address/0x14030836AEc15B2ad48bB097bd57032559339c92#readContract) |
| Arbitrum | [`0x1f6Cee6740e1492C279532348137FF40E0f23D05`](https://arbiscan.io/address/0x1f6Cee6740e1492C279532348137FF40E0f23D05#readContract)  |
| BNBChain | [`0xA48A88EbF6683324bAf17aEB51A6d89294D4bedc`](https://bscscan.com/address/0xA48A88EbF6683324bAf17aEB51A6d89294D4bedc#readContract)  |

The PT-GLP oracle has also been deployed [here](https://arbiscan.io/address/0x43D03031FAb845065e9CEfE89Dd122d63F72011F#code).
