---
hide_table_of_contents: true
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to Integrate PT and LP Oracle

Integrating PT and LP oracles into your system can be accomplished in the following steps. This document provides detailed instructions along with runnable examples.

If you need personalized assistance, don't hesitate to contact us via our Developers channel on [Pendle Discord].

## Prerequisite

### Understand SY, PT, LP

- Read [High Level Architecture](../HighLevelArchitecture.md) and [StandardizedYield docs] to understand the Pendle system.
- Refer to the examples in the following repository for further understanding:
    - https://github.com/pendle-finance/pendle-examples/tree/main/test
    - https://github.com/pendle-finance/pendle-core-v2-public/tree/main/contracts/oracles

### Follow security advisories

As Pendle becomes more permissionless, certain security assumptions of SY will
change in the future, and the Pendle team will verify for all teams currently
integrating the LP Oracle that their integration meets the new **security
assumptions** of SY. Please reach out to us on [Pendle Discord] if you have any
questions.

## Choose a Market

In this documentation and the code example, EtherFi's [weETH market] on Arbitrum,
which has 70M USD liquidity at block 192 001 277, is chosen.

[weETH market]: https://arbiscan.io/address/0x952083cde7aaa11AB8449057F7de23A970AA8472

We recommend choosing a market with high trading activities & deep liquidity.
For a detailed guide on assessing the risk, depth of liquidity & twap
duration, refer to the corresponding risk assessment docs.

- [For using PT as collateral](./PTAsCollateral.md#risk-analysis-for-pt-as-a-collateral)
- [For using LP as collateral](./LPAsCollateral.md#risk-analysis-for-lp-as-a-collateral)

## TWAP Duration and Oracle Initialization

By default, markets' oracles are **NOT initialized**. The oracle's status can be checked using the `_test_oracle_ready` function ([source](https://github.com/pendle-finance/pendle-examples-public/blob/642b1ab2784b3015691d6c26a2684cd5f7585b0d/test/OracleSample.sol#L75-L91)).

- The passed in `duration` is the TWAP duration (in seconds) you want to use.
    - The recommended TWAP duration is 900 seconds (15 minutes) for most markets or 1800 seconds (30 minutes).


```solidity
function _test_oracle_ready(address marketToCheck, uint32 duration) public view {
    (bool increaseCardinalityRequired, , bool oldestObservationSatisfied) =
        oracle.getOracleState(marketToCheck, duration);

    if (increaseCardinalityRequired) {
        // <=============== (1) - Oracle need to be initialized
    }

    if (!oldestObservationSatisfied) {
        // <=============== (2) - Need to wait for data to be available
    }

    // <=============== (3) - Oracle is ready
    assert(!increaseCardinalityRequired);
    assert(oldestObservationSatisfied);
}
```

### Point (1) - Oracle needs to be initialized
At this point, the oracle needs to be initialized. This can be done by calling the following yourself:

```solidity
IPMarket(market).increaseObservationsCardinalityNext(cardinalityRequired)
```

 Here are possible values for `cardinalityRequired`:

| `duration` (seconds) | `900`| `1800`|
| -------------------- | -----| ----- |
| For Ethereum         | 85   | 165   |
| For Arbitrum         | 900  | 1800  |

So on Ethereum, for `duration` of 900 seconds, `cardinalityRequired` can be 85.

<details><summary>Calculate <code>cardinalityRequired</code></summary>

In general, it can calculated like this

$$
\mathtt{cardinalityRequired} \approx
    \frac
        {\mathtt{duration}}
        {\max\{\mathrm{\text{chain block time}}, 1\}}
$$

</details>

After that, you need **to wait** for `duration` seconds for the first data to be available.

### Point (2) - Need to wait for data to be available

Similar to the previous point, you need **to wait** for `duration` seconds for the first data to be available.

### Point (3) - Oracle is ready

Now you can call functions to get the observed price!

## Price Retrieval

We have provided a few ways to obtain the price. Use the one that best suits your needs.

<Tabs>

<TabItem value="chainlink-oracle" label="Using ChainLink oracle" default>

We have provided a way to the price, with the same interface as ChainLink oracles.

The source code of the whole example can be found here:
- https://github.com/pendle-finance/pendle-examples-public/blob/main/test/ChainlinkOracleSample.sol

### Step 1. Deploy the oracle (if not already deployed)

If the oracle are not already deployed, you can deploy yourself the same as this `setUp` function ([source](https://github.com/pendle-finance/pendle-examples-public/blob/642b1ab2784b3015691d6c26a2684cd5f7585b0d/test/ChainlinkOracleSample.sol#L30-L41)).

```solidity title="code fragment of setUp function"
factory = new PendleChainlinkOracleFactory(0x9a9Fa8338dd5E5B2188006f1Cd2Ef26d921650C2);
PT_LBTC_oracle = PendleChainlinkOracle(
    factory.createOracle(address(market), twapDuration, PendleOracleType.PT_TO_SY)
);

PT_USD_oracle = PendleChainlinkOracleWithQuote(
    factory.createOracleWithQuote(address(market), twapDuration, PendleOracleType.PT_TO_SY, address(LBTC_USD_feed))
);
```

<details><summary>Parameters summary</summary>

- `market` is the market address you want to observe the price.
- `twapDuration` is the TWAP duration you want to use, chosen in the previous section.
- `0x9a9Fa8338dd5E5B2188006f1Cd2Ef26d921650C2` is the address of the deployed Pendle Oracle.
    - It was deployed to have the same address for all network.
    - Refer to [Deployment](../Deployments/Ethereum.md) section for the full list of addresses.
    - The deployed ChainLink oracles **wrap** this oracle.
    - Please refer to the _Using Pendle Oracle_ way if you want to use it directly.

</details>

When deploy the oracle, you need to specified the type:
- `PendleOracleType.PT_TO_SY` - to get the price of PT in SY.
- `PendleOracleType.PT_TO_ASSET` - to get the price of PT in the underlying asset.

We support 2 contracts for obtaining the price:
- `PendleChainlinkOracle` - to get the price of PT in SY/asset.
- `PendleChainlinkOracleWithQuote` - to get price of PT in a different token if you have the ChainLink oracle of that token with the underlying asset.

### Step 2. Call the oracle

Price can be obtained simply by calling the `getLatestRoundData` function ([source](https://github.com/pendle-finance/pendle-examples-public/blob/642b1ab2784b3015691d6c26a2684cd5f7585b0d/test/ChainlinkOracleSample.sol#L43-L54)).

```solidity
function test_get_prices_in_SY() external view {
    (uint80 roundId, int256 answer, , uint256 updatedAt, uint80 answeredInRound) = PT_LBTC_oracle.latestRoundData();
    console.log("PT LBTC to SY-LBTC");
    console.log(uint256(roundId), uint256(answer), updatedAt, uint256(answeredInRound));
    // answer = 992893819205953801, meaning 1 PT = 0.992893819205953801 SY-LBTC
}

function test_get_prices_in_quote() external view {
    (uint80 roundId, int256 answer, , uint256 updatedAt, uint80 answeredInRound) = PT_USD_oracle.latestRoundData();
    console.log("PT LBTC to BTC");
    console.log(uint256(roundId), uint256(answer), updatedAt, uint256(answeredInRound));
    // answer = 990999427443599801, meaning 1 PT = 0.9909994274435997 BTC
}
```

</TabItem>

<TabItem value="pendle-oracle" label="Using Pendle Oracle">

The source code of the whole example can be found here:
- https://github.com/pendle-finance/pendle-examples-public/blob/main/test/OracleSample.sol

We have deployed an a contract that helps obtaining the price of PT/YT/LP token in SY or asset.

The contract is at address `0x9a9Fa8338dd5E5B2188006f1Cd2Ef26d921650C2`.
  - It was deployed to have the same address for all network.
  - Refer to [Deployment](../Deployments/Ethereum.md) section for the full list of addresses.

Getting the price can be done simply by calling the corresponding function ([source](https://github.com/pendle-finance/pendle-examples-public/blob/642b1ab2784b3015691d6c26a2684cd5f7585b0d/test/OracleSample.sol#L38-L46)).

```solidity
function test_get_price_LRT_in_underlying() external view {
    uint256 ptRateInWeEth = oracle.getPtToSyRate(address(market), twapDuration);
    uint256 ytRateInWeEth = oracle.getYtToSyRate(address(market), twapDuration);
    uint256 lpRateInWeEth = oracle.getLpToSyRate(address(market), twapDuration);

    console.log("1 PT = %s Wrapped eEth (base 1e18)", ptRateInWeEth);
    console.log("1 YT = %s Wrapped eEth (base 1e18)", ytRateInWeEth);
    console.log("1 LP = %s Wrapped eEth (base 1e18)", lpRateInWeEth);
}
```

### Optional: Convert the price to a different asset
Additionally, if you have an on-chain feed for the price of the underlying asset with a different token, you can **convert** the price using multiplication.

```solidity
function test_get_price_LRT_with_external_oracle() external view {
    uint256 ptRateInWeEth = oracle.getPtToSyRate(address(market), twapDuration); // 1 SY-weETH = 1 weETH

    uint256 ptRateInEth = (ptRateInWeEth * uint256(weETH_ETH_feed.latestAnswer())) / (10 ** weETH_ETH_feed.decimals());
    console.log("1 PT = %s ETH (base 1e18)", ptRateInEth); // 1 PT = 0.980103943942239852 ETH

    uint256 ptRateInUsd = (ptRateInEth * uint256(ETH_USD_feed.latestAnswer())) / (10 ** ETH_USD_feed.decimals());
    console.log("1 PT = %s USD (base 1e18)", ptRateInUsd); // 1 PT = 3714.1302603652102 USD
}
```

</TabItem>

<TabItem value="pendle-library" label="Using Pendle Library">

The source code of the whole example can be found here:
- https://github.com/pendle-finance/pendle-examples-public/blob/main/test/OracleSample.sol

This library is used in the Pendle Oracle (refer to _Using Pendle Oracle_ section). But it can also be used directly in your contract source code. This can help save **about 4k gas**!

Before using it, import it as follows:

```solidity
import {
    PendlePYOracleLib,
    PendleLpOracleLib
} from "@pendle/core-v2/contracts/oracles/PtYtLpOracle/PendlePYLpOracle.sol";

contract YourContract {
    using PendlePYOracleLib for IPMarket;
    using PendleLpOracleLib for IPMarket;
    // ...
}
```

Then you can call the functions directly on the market address.

```solidity
function test_get_price_LRT_in_underlying_with_lib() external view {
    uint256 ptRateInWeEth = market.getPtToSyRate(twapDuration);
    uint256 ytRateInWeEth = market.getYtToSyRate(twapDuration);
    uint256 lpRateInWeEth = market.getLpToSyRate(twapDuration);

    console.log("1 PT = %s Wrapped eEth (base 1e18)", ptRateInWeEth);
    console.log("1 YT = %s Wrapped eEth (base 1e18)", ytRateInWeEth);
    console.log("1 LP = %s Wrapped eEth (base 1e18)", lpRateInWeEth);
}
```

Refer to [StandardizedYield docs] to call the correct function.

### Optional: Convert the price to a different asset

Additionally, if you have an on-chain feed for the price of the underlying asset with a different token, you can **convert** the price using multiplication.

```solidity
function test_get_price_LRT_with_external_oracle_with_lib() external view {
    uint256 ptRateInWeEth = market.getPtToSyRate(twapDuration); // 1 SY-weETH = 1 weETH

    uint256 ptRateInEth = (ptRateInWeEth * uint256(weETH_ETH_feed.latestAnswer())) / (10 ** weETH_ETH_feed.decimals());
    console.log("1 PT = %s ETH (base 1e18)", ptRateInEth); // 1 PT = 0.980103943942239852 ETH

    uint256 ptRateInUsd = (ptRateInEth * uint256(ETH_USD_feed.latestAnswer())) / (10 ** ETH_USD_feed.decimals());
    console.log("1 PT = %s USD (base 1e18)", ptRateInUsd); // 1 PT = 3714.1302603652102 USD
}
```

</TabItem>

</Tabs>

:::warning We recommend pricing PT to <u>SY</u> instead of asset.

For SY to any other units, the integrator can choose an appropriate method
based on whether the asset can be directly redeemed from the SY or if there is
a slashing risk, etc. Pendle can’t provide a perfect PT to Asset price because
Asset price is not well defined.

:::

:::info About unit and decimals

As the `decimals` is a token metadata, and only be used to show the amount to
the users, Pendle contract does **not** operate with decimals.

Let's say you want to know how much $X$ LP is worth in SY.

First, we convert $X$ into the **raw** format so that the contract can understand.

$$
\mathtt{rawX} = X / 10^{\mathtt{LP}.\mathtt{decimals}}
$$

After obtaining the `lpToSyRate`, we convert `rawX` to the **raw** form of SY as follows:

$$
\mathtt{rawY} = \mathtt{rawX} \times \mathtt{lpToSyRate} / 10^{18}
$$

Finally, we can convert `rawY` to the human-readable format:

$$
Y = \mathtt{rawY} \times 10^{\mathtt{SY}.\mathtt{decimals}}
$$

As Pendle support multiple assets, each with a different `decimals`, this fact is important to remember.

:::

## Handle liquidation & LP's rewards

### For PT liquidation
* When a liquidation with $PT$ as collateral occurs, commonly, the liquidator will have to sell $PT$ into common asset to pay their debt.
* In Pendle's system, we support converting $PT$ back to $SY$ by selling $PT$ on our AMM (before maturity) or redeeming directly from `PendleYieldToken` contract (post maturity). This will then allow the liquidator to redeem their $SY$ into one of the output token of $SY$ (see [EIP-5115](https://eips.ethereum.org/EIPS/eip-5115)).
* For reference, we have written the [`BoringPtSeller`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/oracles/samples/BoringPtSeller.sol) contract to sell $PT$ into one of the output token.
* You can extend this abstract contract to use in a liquidation system.

### For LP liquidation
* When a liquidation with $LP$ as collateral occurs, commonly, the liquidator will have to sell $LP$ into common asset to pay their debt.
* In Pendle's system, we support converting $LP$ back to $SY$ by removing liquidity single-sided into $SY$ on our AMM (before maturity) or redeeming $PT$ + $SY$ and redeeming $PT$ to $SY$ directly from `PendleYieldToken` contract (post maturity). This will then allow the liquidator to redeem their $SY$ into one of the output token of $SY$ (see [EIP-5115](https://eips.ethereum.org/EIPS/eip-5115)).
* For reference, we have written the [`BoringLpSeller`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/oracles/samples/BoringLpSeller.sol) contract to sell $LP$ into one of SY's output tokens.
* You can extend this abstract contract to use in a liquidation system.

### Handling of Pendle LP's rewards:
* Holding Pendle LP tokens will generate PENDLE incentives and potential reward tokens (like WETH for LP for GLP pool)
* The money market contracts will need to redeem these rewards by calling the `redeemRewards` function and implement logic to distribute these rewards to their users

[Pendle Discord]: https://pendle.finance/discord
[StandardizedYield docs]: ../Contracts/StandardizedYield.md
