---
hide_table_of_contents: true
---

# LP as Collateral in a Money Market

Pendle pools' LP tokens are good collaterals in a money market since it is a yield bearing position on the asset. This document discusses the use cases for LP as a collateral, as well as considerations for a money market when integrating LP as a collateral.

## Main Use Cases

#### 1. Leverage farming

Example: LP-stETH gives a 12% APY, but the ETH borrow rate is only 3% in the money market.
   * In this case, a user can deposit LP-stETH as collateral, borrow ETH, swap borrowed ETH to more LP-stETH to use as more collateral, and so on.
    * As a result, the user will get a leveraged APY in ETH terms, benefiting from the difference between the Pendle LP APY and ETH borrow rate
    * If the collateral factor is 0.80, the user can leverage 5x their capital to get a maximum APY of 5 * (12-3) = 45%

This use case is similar to depositing a yield bearing asset like wstETH and borrowing (ETH) in a money market.

#### 2. Leverage long assets while earning yields on Pendle
  * If a user is bullish on an asset in the long term, they can use its Pendle LP as a collateral to borrow stables to buy more LP
  * For example, a long term ETH holder can use LP-stETH as collateral to borrow USDC to buy more LP-stETH
  * Essentially, the user will be getting a good returns from the Pendle LP position on top of their leveraged long position on ETH.

## Risk analysis for LP as a collateral

### 1. Smart contract vulnerability in Pendle contracts:
  * This is similar to the analysis in the [risk analysis for PT as a collateral](./PTAsCollateral.md#1-smart-contract-vulnerability-in-pendle-contracts)

### 2. Smart contract vulnerability in underlying protocols:
  * This is similar to the analysis in the [risk analysis for PT as a collateral](./PTAsCollateral.md#2-smart-contract-vulnerability-in-underlying-protocols)

### 3. Oracle exploit:
  * If the oracle for LP price is easily manipulated or exploited, LP price could inflate unnaturally (leading to an attack of using over-priced LP to borrow, and get away with free money leading to bad protocol debt after LP price drops sharply after), or drops sharply (leading to bad debt for the protocol)
  * Assessment:
    * Pendle's oracle for LP/asset builds on top of the PT/asset oracle. The PT/asset oracle is permissionless and built into the contract (no maintanance needed), hence liveness and correctness is not a concern.
    * The LP/asset oracle returns TWAP prices for any customisable duration (within 65536 blocks, which is ~9 days for Ethereum), hence is not susceptible to short term or within-a-block manipulation of prices if the TWAP duration used is sufficient.
    * **Important note**:
      * You should only use the current LP oracle is the `SY` contract doesn't have a callback function. If the `SY` contract has a callback function, it is technically possible for the oracle to return an incorrect LP price, if it's called inside a SY's callback function. 
      * It should be very rare to have a SY with a callback function. If you do integrate with one, you can contact us. We can deploy a specialised oracle to deal with a SY with a call back function.

### 4. Insufficient LP liquidity for liquidation in a short duration
The considerations for this part is the same as the ones for integrating PT as collateral [here](./PTAsCollateral.md#4-insufficient-pt-liquidity-for-liquidation-in-a-short-duration).

The difference between LP and PT is just that LP prices fluctuate less than PT prices (because LP = PT + SY). Therefore, with the same pool, the parameters for supporting LP as a collateral could more more aggressive than that for supporting PT as a collateral.

### 5. Highly volatile LP price could liquidate users unnecessarily
* This is similar to the analysis in the [risk analysis for PT as a collateral](./PTAsCollateral.md#5-highly-volatile-pt-price-could-liquidate-users-unnecessarily)

