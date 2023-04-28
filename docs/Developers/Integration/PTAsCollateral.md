---
hide_table_of_contents: true
---

# PT as Collateral in a Money Market

PT tokens are good collaterals in a money market since it is a fixed rate position (or a zero coupon bond) on an asset. This document discusses the use cases for PT as a collateral, as well as considerations for a money market when integrating PT as a collateral.

## Main Use Cases

#### 1. Get leveraged APY doing yield arbitrage

Example: PT-stETH gives a fixed 5% APY, but the ETH borrow rate is only 3% in the money market.
   * In this case, a user can deposit PT-stETH as collateral, borrow ETH, swap borrowed ETH to more PT-stETH to use as more collateral, and so on.
    * As a result, the user will get a leveraged APY in ETH terms, benefiting from the difference between the PT fixed rate and ETH borrow rate
    * If the collateral factor is 0.80, the user can leverage 5x their capital to get a maximum APY of 5 * (5-3) = 10%

This use case is similar to depositing a yield bearing asset (like wstETH) and borrowing (ETH) in a money market, but is better due to the certainty from the fixed rate in PT.

#### 2. Leverage short yield

  * If a user thinks the current fixed yield in Pendle is overvalued (PT is undervalued), they can do the exact step as the previous section (for example, use PT-stETH as collateral to borrow ETH to buy more PT-stETH) to short yield.
  * If the fixed yield indeed goes down, the user can unwind their position (sell PT to repay the borrowed ETH) for a profit.

#### 3. Leverage long assets while earning fixed yield
  * If a user is bullish on an asset in the long term, they can use it's PT as a collateral to borrow stables to buy more PT
  * For example, a long term ETH holder can use PT-stETH as collateral to borrow USDC to buy more PT-stETH
  * Essentially, the user will be getting a fixed APY (from PT) on top of their leveraged long position on ETH.

## Integrating PT as a collateral in a money market

There are two main prerequisites to integrate PTs as a collateral in a money market:

#### Reliable oracle for PT price:
  * There is a permission-less oracle system for PTs that allows for querying TWAP prices for customised durations.
  * Please refer to [this page](PTOracle.md) for the oracle documentations.

#### Liquidation of PTs
  * When a liquidation with $PT$ as collateral occurs, commonly, the liquidator will have to sell $PT$ into common asset to pay their debt.
  * In Pendle's system, we support converting $PT$ back to $SY$ by selling $PT$ on our AMM (before maturity) or redeeming directly from `PendleYieldToken` contract (post maturity). This will then allow the liquidator to redeem their $SY$ into one of the output token of $SY$ (see [EIP-5115](https://eips.ethereum.org/EIPS/eip-5115)).
  * For reference, we have written the [`BoringPtSeller`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/offchain-helpers/BoringPtSeller.sol) contract to sell $PT$ into one of the output token.

## Risk analysis for PT as a collateral

### 1. Risks for the money market protocol:

#### Smart contract vulnerability in Pendle contracts:
  * If Pendle contracts malfunctions or gets exploited, PT could lose value significantly in a short duration, leading to bad debt for the money market protocol.
  * Assessment:
    * Pendle V2 contracts have been audited extensively by 6 auditors, with 3 of the top 4 C4 auditors. [Links to audit reports](https://github.com/pendle-finance/pendle-core-v2-public/tree/main/audits)
    * Pendle V2 contracts are written in a very modular way, with separate components (SY, YT-PT, Market, vePENDLE) decoupled from each other, only interacting with the other components via interfaces, thus minimising any possible bugs due to complexity and interwoven logic.
    * Lindy-ness: There have been zero incidents in Pendle contracts since June 2021
      * Pendle V2 contracts have been live since November 2022, with a peak TVL of $60M
      * Pendle V1 contracts (with many similar mechanism to V2) have been live since June 2021, with a peak TVL of $37M

#### Smart contract vulnerability in underlying protocols:
  * Each PT is built on top of an underlying yield bearing token (like stETH, USDT staked in Stargate). If the underlying protocol malfunctions or gets exploited, PT could lose value significantly in a short duration, leading to bad debt for the money market
  * As such, risk assessment should be made for each underlying protocol for each PT.

#### Oracle exploit:
  * If the oracle for PT price is easily manipulated or exploited, PT price could inflate unnaturally (leading to an attack of using over-priced PT to borrow, and get away with free money leading to bad protocol debt after PT price drops sharply after), or drops sharply (leading to bad debt for the protocol)
  * Assessment:
    * Pendle's oracle for PT/asset is permissionless and built into the contract (zero maintanance needed), hence liveness and correctness is always guaranteed
    * The PT/asset oracle returns TWAP prices for any customisable duration (within 65536 blocks, which is ~9 days for Ethereum), hence is not susceptible to short term or within-a-block manipulation of prices if the TWAP duration used is sufficient.

#### PTs are not liquidated fast enough to cover borrowed funds
  * When PT price drops sharply and doesn't bounce back, liquidations might not happen fast enough, leading to bad debt.
  * Assessment:
    * PT price will naturally converge to the asset price (which should be a major asset) at maturity, therefore any sharp price decrease should be temporary (barring any exploit in the contracts)
    * There should ideally be a deposit cap for PT collateral, such that PT liquidity (in Pendle market) should be sufficient to liquidate enough PT collaterals profitably in extreme cases.

### 2. Risks for users of the money market protocol:

  * The same risks in the previous section would impact the users due to bad debt to the protocol, which means users won't be able to withdraw all their deposits back
  * Getting liquidated due to temporary PT price drop:
    * Assessment:
      * If the appropriate TWAP duration is used in the oracle, PT price won't fluctuate too wildly.
      * Liquidity of the Pendle PT pool should be considered when setting the collateral factor for PT as a collateral, such that there's less chance PT TWAP price can fluctuate enough to unfairly liquidate users.
