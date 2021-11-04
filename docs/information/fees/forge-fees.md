---
sidebar_position: 1
---

# Forge Fees

For every interest payment to any user's account, the protocol will take a
fees:

$$$
\text{fees} = \text{interest calculated for user} \cdot feesFactor
$$$

where

$0 \leq feesFactor < 1$

The total fees accrued for the protocol will be kept in a variable `totalFee`, for each of the underlying asset in a Forge. i.e. in a mapping `mapping(address => uint256) totalFee`

* Let's assume that m(t1, t2) is how much an amount of yield tokens will
grow, from t1 to t2 .
  * For Aave: $m(t1, t2) = \cfrac{\text{NormalizedIncome at t2}}{\text{NormalizedIncome at t1}}$
  * For Compound: $m(t1, t2) = 1$

This means that if totalFee was last updated in `t1` and there is an additional amount of `totalFee` at `t2`:

$$$
totalFee = totalFee \cdot m(t1,t2) + \text{additionalFees}
$$$

The governance address could ping the forge at anytime, with a list of underlying asset addresses, to withdraw the `totalFee` to the treasury address.
