---

hide_table_of_contents: true

---

# StandardizedYield (SY)

## Overview

SY is a wrapped version of an yieldToken that can also be staked into other protocols to earn even more interest. In the Pendle system, SY is used instead of the yieldToken for all operations, including trading on PendleMarket or minting Principal Tokens (PT) and Yield Tokens (YT).

## Minting and Redeeming SY

SY can usually be minted using `tokenIn`, with some exceptions. Remember, SY simply wraps the underlying yield token. Minting SY essentially buys the underlying token. Consequently, minting/redeeming behavior varies based on the underlying protocol. Here are some examples of quirks:

- **GLP**: While purchasable with ETH, USDC, USDT, UNI, etc., caps on ETH & USDC are frequently reached, preventing their use for GLP acquisition. Therefore, SY-GLP, despite offering these tokens as `tokenIn`, may not guarantee their use for minting.
- **ankrBNB**: Requires a minimum mint amount of 0.1 BNB. Minting SY-ankrBNB with less than 0.1 BNB will revert. Similarly, ankrBNB can only be withdrawn to BNB through a quick withdrawal pool with sufficient liquidity. Redeeming SY-ankrBNB might occasionally fail.
- **wstETH**: Allows minting by staking ETH, but not vice versa. Consequently, SY-wstETH's `getTokensIn` includes ETH, but `getTokensOut` does not.

The most reliable way to mint/redeem SY is by using the protocol's yield token. However, hardcoding this is not recommended.

## Preview Functions

The underlying protocol often lacks an explicit function for previewing the amount of mintable/redeemable tokens. SY's preview function, a best effort by the Pendle team, approximates the actual mint/redeem results. While its correctness is verified through testing, it is not audited, and on-chain use is discouraged.

## Accrued Rewards Function

Similar to preview functions, the underlying protocol might not offer a way to preview a user's redeemable rewards. Therefore, SY's `accruedRewards` function only reflects accrued rewards for the user. To get the latest results, simulate `claimRewards(user)` through `eth_call` or `staticCall`.

## Asset of SY / AssetInfo Function

Pendle is a derivative protocol that integrates a wide range of underlying protocols, each with its own unique mechanism. SY acts as an adapter for these protocols, and hence SY's metadata standard (AssetInfo function, what SY is wrapping) is not consistent and doesn't follow a strict standard, though Pendle tries its best to make it so.

The AssetInfo function returns the asset that represents the best estimation of what asset SY appreciates against and aims to enable a rough estimation of SY's value on-chain. It's important to note that it's an estimation because more often than not the asset doesn't exist. The address may not be on the same chain as the SY. For example, SY-wstETH on Arbitrum appreciates against stETH, but stETH doesn't exist on Arbitrum, so we set the address to be stETH's address on Ethereum instead.

SY's exchange rate represents how much asset a SY is worth. A 2x increase in the exchange rate means a SY is now worth double the amount of the underlying asset.

### Standard SYs

Most SYs in Pendle are standard, 1-1 wrap of yieldToken. It's best to value PT/YT/LP by yieldToken (getPtToSy / getLpToSy). If not possible, value it by Asset but take into account the risk of not being able to withdraw from yieldToken to Asset (getPtToAsset / getLpToAsset). This is not to be considered an official security advisory in any way.

| Market          | Recommended way to get price | Unit of price | yieldToken of SY (1-1 wrap) | Note                             | Asset of SY                      |
| --------------- | ---------------------------- | ------------- | --------------------------- | -------------------------------- | -------------------------------- |
| LBTC            | getPtToSy                    | LBTC          | LBTC                        | -                                | BTC staked on  Lombard           |
| sUSDe           | getPtToSy                    | sUSDe         | sUSDe                       | -                                | USDe                             |
| USDe            | getPtToSy                    | USDe          | USDe                        | -                                | USDe                             |
| eBTC            | getPtToSy                    | eBTC          | eBTC                        | -                                | eBTC (constant exchange rate)    |
| USD0++          | getPtToSy                    | USD0++        | USD0++                      | -                                | USD0++ (constant exchange rate)  |
| sENA            | getPtToSy                    | sENA          | sENA                        | -                                | ENA staked on Ethena             |
| SolvBTC.BBN     | getPtToSy                    | SolvBTC.BBN   | SolvBTC.BBN                 | -                                | BTC staked on Solv               |
| PumpBTC         | getPtToSy                    | PumpBTC       | PumpBTC                     | -                                | BTC staked on Pump               |
| weETH           | getPtToSy                    | weETH         | weETH                       | -                                | eETH                             |
| weETHs          | getPtToSy                    | weETHs        | weETHs                      | limited liquidity to market sell | weETHs (constant exchange rate)  |
| weETHk          | getPtToSy                    | weETHk        | weETHk                      | limited liquidity to market sell | weETHk (constant exchange rate)  |
| weETH (Karak)   | getPtToSy                    | weETH (Karak) | weETHk (Karak)              | can't market sell                | eETH                             |
| pufETH          | getPtToSy                    | pufETH        | pufETH                      | -                                | ETH staked on Puffer             |
| pzETH           | getPtToSy                    | pzETH         | pzETH                       | limited liquidity to market sell | pzETH (constant exchange rate)   |
| wstETH          | getPtToSy                    | wstETH        | wstETH                      | -                                | stETH                            |
| GLP             | getPtToSy                    | GLP           | GLP                         | -                                | GLP                              |
| MUXLP           | getPtToSy                    | MUXLP         | MUXLP                       | can't market sell                | MUXLP                            |
| HLP             | getPtToSy                    | HLP           | HLP                         | can't market sell                | HLP                              |
| ezETH           | getPtToSy                    | ezETH         | ezETH                       | -                                | ETH staked on Renzo              |
| rETH            | getPtToSy                    | rETH          | rETH                        | -                                | ETH staked on Rocket             |
| ezETH (Zircuit) | getPtToSy                    | ezETH         | ezETH                       | -                                | ETH staked on Renzo then Zircuit |
| uniETH          | getPtToSy                    | uniETH        | uniETH                      | -                                | ETH staked on Bedrock            |
| rswETH          | getPtToSy                    | rswETH        | rswETH                      | -                                | ETH staked on Swell              |
| rswETH Swell L2 | getPtToSy                    | rswETH        | rswETH                      | -                                | ETH staked on Swell              |
| swETH           | getPtToSy                    | swETH         | swETH                       | -                                | ETH staked on Swell              |
| ETHx            | getPtToSy                    | ETHx          | ETHx                        | -                                | ETH staked on Stadler            |
| rsETH           | getPtToSy                    | rsETH         | rsETH                       | -                                | ETH staked on Kelp               |
| sDAI            | **getPtToAsset**             | DAI           | sDAI                        | -                                | DAI                              |
| crvUSD Silo     | **getPtToAsset**             | crvUSD        | scrvUSD                     | -                                | crvUSD                           |
| gDAI            | **getPtToAsset**             | DAI           | gDAI                        | can't market sell                | DAI staked in Gains              |

**Notes on Assets of SYs:**
- All Liquid Staking Tokens (LRTs) except for weETH have assets listed as "ETH staked in xyz." This is different from ETH, as it takes 7 days or more to withdraw, and these staked ETH are subject to slashing if it occurs. As a result, LRT always trades at a slight depeg compared to the amount of ETH withdrawable from it. Hence, it's not safe to value these markets directly in ETH (which would not account for this depeg). Always value these in the original LRT form.
- sDAI, scrvUSD, and gDAI tokens are not tradable, so they must be valued directly in their underlying asset. Similar to LRT, valuing them directly in the underlying asset will skip the protocol's risk of not being able to withdraw from yieldToken to Asset. Please keep that in mind!
- All in all, it's safe to value tokens in yieldToken, whereas valuing them in assets carries additional conversion risk that you should be aware of.

### Non-standard SYs

Other SYs that are not 1-1 wrap of yieldToken:

| Market  | Recommended way to get price | Unit of price | yieldToken of SY (NOT 1-1 Wrap) | Asset of SY |
| ------- | ---------------------------- | ------------- | ------------------------------- | ----------- |
| aUSDT   | getPtToAsset                 | USDT          | -                               | USDT        |
| aUSDC   | getPtToAsset                 | USDC          | -                               | USDC        |
| ePENDLE | getPtToAsset                 | ePENDLE       | -                               | ePENDLE     |
| mPENDLE | getPtToAsset                 | mPENDLE       | -                               | mPENDLE     |

For aUSDT and aUSDC, similar considerations apply as for sDAI, scrvUSD, and gDAI. Value them directly in their underlying asset.

## Extended StandardizedYield

The following are _optional_ methods that a SY can have. They are not the standard methods, but they can help with calculation for better accuracy.

<!-- We might need to do documentation generation. -->
<!-- Though this is an exception so it can be fine to include it here. -->

### `pricingInfo()`

```solidity
function pricingInfo() external view returns (address refToken, bool refStrictlyEqual);
```

This function contains information to describe recommended pricing method for this SY
- `refToken` the token should be referred to when pricing this SY
- `refStrictlyEqual` whether the price of SY is strictly equal to refToken

For pricing PT & YT of this SY, it's recommended that:
- `refStrictlyEqual` = `true` : (1 natural unit of SY = 1 natural unit of refToken). `Use PYLpOracle.get{Token}ToSyRate()` and multiply with `refToken`'s according price.
- `refStrictlyEqual` = `false`: use `PYLpOracle.get{Token}ToAssetRate()` and multiply with `refToken`'s according price.

Please see documentation about [unit and decimals](./UnitAndDecimals.md) on notes about decimals differences between PT/YT and the assets.

:::tip
It is also highly recommended to contact us for discussion on this type of token.
:::

