---
hide_table_of_contents: true
---

# PT as Collateral in a Money Market

PTs are good collaterals in a money market since it is a fixed rate position (or a zero coupon bond) on an asset. This document discusses the use cases for PT as a collateral, as well as considerations for a money market when integrating PT as a collateral.

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
  * If a user is bullish on an asset in the long term, they can use its PT as a collateral to borrow stables to buy more PT
  * For example, a long term ETH holder can use PT-stETH as collateral to borrow USDC to buy more PT-stETH
  * Essentially, the user will be getting a fixed APY (from PT) on top of their leveraged long position on ETH.


## Risk analysis for PT as a collateral


### 1. Smart contract vulnerability in Pendle contracts:
  * If Pendle contracts malfunctions or gets exploited, PT could lose value significantly in a short duration, leading to bad debt for the money market protocol.
  * Assessment:
    * Pendle V2 contracts have been audited by 6 auditors, with 3 of the top 4 C4 auditors. Find the audit reports [here](https://github.com/pendle-finance/pendle-core-v2-public/tree/main/audits).
    * Pendle V2 contract system's components (SY, YT-PT, Market, sPENDLE) are decoupled from each other, only interacting with the other components via interfaces, decreasing the chance for bugs due to complexity and interwoven logic.
    * Lindy-ness: There have been no incidents so far in Pendle contracts since June 2021
      * Pendle V2 contracts have been live since November 2022 (peak TVL of $93M)
      * Pendle V1 contracts (with many similar mechanisms to V2) have been live since June 2021, with a peak TVL of $37M
    * Apart from the core Pendle contracts (for YT-PT and Pendle Market) which remain the same throughout, risk assessment needs to be done on the SY implementation for the particular PT pool.

### 2. Smart contract vulnerability in underlying protocols:
  * Each PT is built on top of an underlying yield bearing token (like stETH, USDT staked in Stargate). If the underlying protocol malfunctions or gets exploited, PT could lose value significantly in a short duration, leading to bad debt for the money market
  * As such, risk assessment should be made for each underlying protocol for each PT.

### 3. Oracle exploit:
  * If the oracle for PT price is easily manipulated or exploited, PT price could inflate unnaturally (leading to an attack of using over-priced PT to borrow, and get away with free money leading to bad protocol debt after PT price drops sharply after), or drops sharply (leading to bad debt for the protocol)
  * Assessment:
    * Pendle's oracle for PT/asset is permissionless and built into the contract (no maintenance needed), hence liveness and correctness is not a concern.
    * The PT/asset oracle can return TWAP prices for customisable durations (within 65536 blocks, which is ~9 days for Ethereum), hence is not susceptible to short term or within-a-block manipulation of prices if the TWAP duration used is sufficient.

### 4. Insufficient PT liquidity for liquidation in a short duration
When PT price drops significantly vs the borrowAsset (say for 20%) and doesn't bounce back, there might not be enough liquidity to liquidate PT collaterals for liquidatable loans, which might lead to bad debt.

#### Assessment - Study 1: we want to make sure if PT/borrowAsset price drops significantly in one go, liquidators can liquidate the maximum possible liquidatable PT collaterals in profit
* Assume the following parameters in the money market:
  * Collateral factor for PT: `cRatio`
  * Deposit limit for PT collateral: `dCap` (in dollars)
  * Let's say after a significant price drop, the maximum portion of loans (using PT collaterals) that will become liquidatable will be `k` (`k` = 0.3 might be a reasonable number. 30% of the borrow becomes liquidate-able in one single moment)
  * When a position becomes liquidatable, liquidators can liquidate a portion `f` of the liquidatable position (usually 50% in most money markets)
  * The profit for liquidators is `p` (usually ~5-10% in money markets)
* When PT/borrowAsset price drops significantly, we will need to liquidate a maximum of `dCap * cRatio * k` worth of borrow. The maximum amount liquidators can repay and liquidate is `dCap * cRatio * k * f`. The collateral dollar value that liquidators will get (and need to sell) is `dCap * cRatio * k * f * (1+p)`
* To make a profitable liquidation, we need to be able to sell these PT collaterals for < `p` price impact (since the profit is `p`)
* To sell PT collaterals to borrowAsset, we need to sell PT to SY (a yield bearing position of PT's asset) via Pendle's market, convert SY to asset and sell asset for borrowAsset
* Assuming minimal price impact for selling asset to borrowAsset (might not hold for non-bluechip borrow asset), **we just need to make sure that we could sell `dCap * cRatio * k * f * (1+p)` worth of PT with less than `p` price impact.**
* Example for listing PT-stETH-Dec2025 in CompoundV2 with a collateral factor `cRatio` of 0.70
  * `cRatio = 0.70`
  * Assume `k = 0.30`
  * `f = 0.5` in Compound
  * `p = 0.08` in Compound
  * Hence, selling `dCap * 0.70 * 0.30 * 0.5 * (1+0.08) = 0.1134 dCap` worth of PT should have a price impact of lower than 8%
  * As of writing (2 Jun 2023), selling $1M of PT-stETH-Dec2025 has a price impact of 2.5%
  * Therefore, a `dCap` of $1M / 0.1134 = $8.8M is already pretty safe (since it will be corresponding to a sell of $1M of PT, which only has a 2.5% price impact, well less than 8%)
* This could be used as a framework to gauge how reasonable certain numbers for `dCap`, `cRatio` could be for certain PT collateral.
* **Important note**: There is a cascading effect, where PT price dropping due to the collateral sell could lead to more liquidation. Ideally, the factor `k` should already take this into account (basically, after all the cascading effect from PT price dropping due to liquidations, what's the proportion of PT-collateralised loans that will become liquidatable). In the most extreme assumption, we could assume `k=1` for the strictest analysis.

#### Assessment - On collateral factor for PT

* Study 1 is already the strictest analysis, where all the liquidatble PT collaterals can be liquidated in one go.
* Due to the nature of Pendle AMM which is specialised for trading PTs (it concentrates liquidity, taking into account how PT will converge to the underlying asset), price impact for selling an amount of PT is much smaller than a normal pool of the same liquidity can provide.
* When setting collateral factor for PT, the bottom line is to protect the money market from bad debt, in case PT/borrowAsset price drops so fast that liquidations can't happen fast enough to liquidate the liquidatable accounts.
* In terms of "being able to liquidate PTs fast enough", there are two factors:
  1. Liquidity for liquidating PTs, to support liquidating PTs in a short duration.
  2. The liquidation system which needs to be functional and reacts fast enough to liquidate in time
* For i: it's already covered in Study 1, so theoretically if the equation (taking into account the important note) in Study 1 holds, it's good (even if cRatio is 0.90). This is assuming a highly efficient liquidation system that could liquidate immediately.
* For ii: it depends on how mature and decentralised the liquidation ecosystem for the money market is. If the liquidators are highly active/efficient, collateral factors could be set higher
* In another approach for thinking about setting collateral factor for PT: it could be similar to the collateral factor for PT's asset in the money market, since PT price will fluctuate along the asset's price.
* Since it's generally troublesome to decrease collateral factor and much easier to increase it, it's generally a good approach to start with more conservative collateral factors

### 5. Highly volatile PT price could liquidate users unnecessarily
  * If PT prices are too volatile, a temporary dip in PT price could liquidate certain users unnecessarily
  * Assessment:
    * In normal circumstances, PT price in terms of asset should not fluctuate as wildly as normal asset prices since it's based on people trading interest rates (which don't change too often).
    * Depending on the nature of the PT collateral (nature of the interest rate, and liquidity of the pool), an appropriate TWAP duration could be used in the oracle, to minimise liquidations due to temporary dips in PT prices.
