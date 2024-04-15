---
hide_table_of_contents: true
---
# StandardizedYield (SY)

## Overview

SY is a wrapped version of the interest-bearing token (ibToken) that can also be staked into other protocols to earn even more interest. In the Pendle system, SY is used instead of the ibToken for all operations, including trading on PendleMarket or minting Principal Token & Yield Token.

The following are true:

|              SY              |                     ibToken (1 SY = 1 ib Token)                     | Asset (ibToken appreciates against) |
| :--------------------------: | :-----------------------------------------------------------------: | :---------------------------------: |
|            SY GLP            |                                 GLP                                 |     NIL, GLP doesn't appreciate     |
|          SY wstETH           |                               wstETH                                |                stETH                |
|           SY ETHx            |                                ETHx                                 |    ETH locked in ETHx contract*     |
|           SY aUSDC           |                Not 1-1 to aUSDC since it's rebasing                 |                aUSDC                |
| SY rETH-WETH_BalancerLP Aura | rETH-WETH LP of Balancer staked into the corresponding Aura's gauge |     Liquidity of rETH-WETH pool     |

For *: ETH locked in ETHx is different from normal ETH due to withdrawal from ETHx having a delay. Under normal circumstances, it's also normal for ETHx to trade at a market price lower than the amount of ETH it can be withdrawn to.

## Minting and Redeeming SY

SY can usually be minted using tokenIn, with some exceptions. Remember, SY simply wraps the underlying yield token. Minting SY essentially buys the underlying token. Consequently, minting/redeeming behavior varies based on the underlying protocol. Here are some examples of quirks:

- GLP: While purchasable with ETH, USDC, USDT, UNI, etc., caps on ETH & USDC are frequently reached, preventing their use for GLP acquisition. Therefore, SY-GLP, despite offering these tokens as tokenIn, may not guarantee their use for minting.
- ankrBNB: Requires a minimum mint amount of 0.1 BNB. Minting SY-ankrBNB with less than 0.1 BNB will revert. Similarly, ankrBNB can only be withdrawn to BNB through a quick withdrawal pool with sufficient liquidity. Redeeming SY-ankrBNB might occasionally fail.
- wstETH: Allows minting by staking ETH, but not vice versa. Consequently, SY-wstETH's getTokensIn includes ETH, but getTokensOut does not.

The most reliable way to mint/redeem SY is by using the protocol's yieldToken. However, hardcoding this is not recommended.

## Preview Functions

The underlying protocol often lacks an explicit function for previewing the amount of mintable/redeemable tokens. SY's preview function, a best effort by the Pendle team, approximates the actual mint/redeem results. While its correctness is verified through testing, it's not audited & on-chain use is discouraged.

## AccruedRewards Function

Similar to preview functions, the underlying protocol might not offer a way to preview a user's redeemable rewards. Therefore, SY's accruedRewards function only reflects accrued rewards for the user. To get the latest results simulate `claimRewards(user)` through `eth_call` or `staticCall`.

## Asset of SY / AssetInfo Function

Pendle is a derivative protocol & integrates a wide range of underlying protocols, each has their own unique mechanism. SY acts as an adapter for these protocols, and hence SY's metadata standard (AssetInfo function, what SY is wrapping) is not consistent and doesn't follow a strict standard even though Pendle tries its best to make it so.

The AssetInfo function returns the asset that represents the best estimation of what asset SY appreciates against & aims to enable a rough estimation of SY's value on-chain. It's important to note that it's an estimation because more often than not the asset doesn't exist. The address may not be on the same chain as the SY, for example, SY-wstETH on Arbitrum appreciates against stETH, but stETH doesn't exist on Arbitrum, so we set the address to be stETH address on Ethereum instead.

SY's exchangeRate represents how much Asset a SY is worth. A 2x in exchangeRate represents a SY now worth double the underlying asset amount.

### Standard SYs

Most SY in Pendle are standard. 1-1 wrap of ibToken. Best to value PT/YT/LP by ibToken if it's tradable (getPtToSy / getLpToSy). If not possible, value it by Asset but take into account the risk of not being able to withdraw from ibToken to Asset (getPtToAsset / getLpToAsset). `(*)` represents it's recommended against valuing by that ibToken / Asset, usually applicable for cases where there is risk of insolvency / slashing. This is not to be considered an official security advisory in any way.

| SY                 | ibToken | Asset                                | Risk of ibToken conversion to Asset |
| ------------------ | ------- | ------------------------------------ | ----------------------------------- |
| SY-sDAI            | sDAI    | DAI                                  | Liquidity not available             |
| SY-weETH           | weETH   | eETH                                 | None                                |
| SY-USDe            | USDe    | USDe                                 | None                                |
| SY-sUSDe           | sUSDe   | USDe                                 | Withdrawal wait                     |
| SY-crvUSD Silo     | scrvUSD | crvUSD                               | Liquidity not available             |
| SY-wsETH           | wstETH  | stETH                                | None                                |
| SY-fUSDC           | fUSDC   | USDC                                 | Liquidity not available             |
| SY-sFRAX           | sFRAX   | FRAX                                 | None                                |
| SY-sfrxETH         | sfrxETH | frxETH                               | None                                |
| SY-woETH           | woETH   | oETH                                 | None                                |
| SY-GLP             | GLP     | GLP                                  | None                                |
| SY-MUXLP           | MUXLP   | MUXLP                                | None                                |
| SY-HLP             | HLP     | HLP                                  | None                                |
| SY-gDAI            | gDAI    | DAI (*)                              | Withdrawal wait / insolvency risk   |
| SY-ezETH           | ezETH   | ETH staked on Renzo (*)              | Withdrawal wait / slashing risk     |
| SY-rETH            | rETH    | ETH staked on Rocket (*)             | Withdrawal wait / slashing risk     |
| SY-ezETH (Zircuit) | ezETH   | ETH staked on Renzo then Zircuit (*) | Withdrawal wait / slashing risk     |
| SY-uniETH          | uniETH  | ETH staked on Bedrock (*)            | Withdrawal wait / slashing risk     |
| SY-rswETH          | rswETH  | ETH staked on Swell (*)              | Withdrawal wait / slashing risk     |
| SY-swETH           | swETH   | ETH staked on Swell (*)              | Withdrawal wait / slashing risk     |
| SY-ETHx            | ETHx    | ETH staked on Stadler (*)            | Withdrawal wait / slashing risk     |
| SY-rsETH           | rsETH   | ETH staked on Kelp (*)               | Withdrawal wait / slashing risk     |

### Non-standard SYs
Each SY has its own properties. To value by ibToken, use getPtToSy / getLpToSy. To value by Asset, use getPtToAsset / getLpToAsset.

| SY                            | ibToken                          | Asset                            | Note                                                                             |
| ----------------------------- | -------------------------------- | -------------------------------- | -------------------------------------------------------------------------------- |
| SY-aUSDT                      | -                                | USDT                             | SY-aUSDT is worth more aUSDT over time. Not 1-1 wrap. Best to value by Asset     |
| SY-aUSDC                      | -                                | USDC                             | SY-aUSDC is worth more aUSDC over time. Not 1-1 wrap. Best to value by Asset     |
| SY-ePENDLE                    | -                                | ePENDLE                          | SY-ePENDLE is worth more ePENDLE over time. Not 1-1 wrap. Best to value by Asset |
| SY-ankrETH-wstETH on Balancer | LP of ankrETH-wstETH on Balancer | Liquidity of ankrETH-wstETH pool | (1)                                                                              |

(1) Liquidity of LPs is a very superficial term & is different for each type of AMM. In general, we can take the following example:
1 LP is worth 10 asset, and can be redeemed for 10 ankrETH & 10 wstETH. Assuming no IL, if this LP worths double the amount of liquidity, it now can be redeemed for 20 ankrETH & 20 wstETH. This is a 2x in exchangeRate.