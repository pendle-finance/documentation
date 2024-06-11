---
hide_table_of_contents: true
---

# APY Calculation

This document contains the formulas used to calculate the APY for Pendle markets.

In this document, we takes the market `0x107a2e3cd2bb9a32b9ee2e4d51143149f8367eba` on mainnet as an example.


## **Variables**

| name                  | Description                                                                                                                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|        $\text{market}$       |                                    [0x107a2e3cd2bb9a32b9ee2e4d51143149f8367eba](https://etherscan.io/address/0x107a2e3cd2bb9a32b9ee2e4d51143149f8367eba)                                    |
|          $\text{sy}$         |                                    [0xC4ed348c56223C5953939e932E315F9d72Cd83fF](https://etherscan.io/address/0xC4ed348c56223C5953939e932E315F9d72Cd83fF)                                    |
| $\text{lpPriceUsd}$          | price of the lp token in terms of USD                                                                                                                                                       |
| $\text{syPriceUsd}$          | price of the sy token in terms of USD                                                                                                                                                       |
| $\text{pendlePriceUSD}$      | price of the Pendle token in terms of USD                                                                                                                                                   |
| $\text{totalVotedLastEpoch}$ | total of vePendle voted for the pool in the last epoch                                                                                                                                      |
| $\text{duration}$            | the interval that we use to calculate the APY. For example, $\text{duration}=7$ means we calculate the APY based on data of the last 7 days. In our system, we use 7 days as the default duration! |
| $\text{syIndex}$             | the current index of the SY token, can be taken from [exchangeRate function](https://etherscan.io/address/0xC4ed348c56223C5953939e932E315F9d72Cd83fF#readContract#F9) of the sy contract    |
| $\text{prevSyIndex}$         | the $\text{syIndex}$ at $duration$ days ago.                                                                                                                                                       |
| $\text{yearsToExpiry}$       | the number of years until the expiry of the market.                                                                                                                                         |


## Underlying APY

$\text{underlyingApy} = \text{underlyingInterestApy} + \text{underlyingRewardApr}$

$\text{underlyingApy}$ comes in two part, below are how to calculate each of them


### **UnderlyingInterestApy**
$\text{interestMultiple} = \frac{\text{syIndex}}{\text{prevSyIndex}}$

$\text{underlyingInterestApy} = \text{interestMultiple}^{\frac{365}{\text{days}}} - 1$

- Explanation:
    - $\text{underlyingInterestApy}$ estimates the current APY for the **interest** of the underlying protocol of the SY token. **Interest** = returns in the underlying asset, and it’s auto-compounding by default.
    - In this formula, we are taking the historical APY for the last 7 days, to extrapolate into the returns for the year.

### **UnderlyingRewardApr:**

- For each reward token:

    - $\text{prevRewardIndex} =$  $\text{rewardIndex}$ at $\text{duration}$ days ago
    - $\text{dailyRewardPerSy} = \frac{\text{rewardIndex} - \text{prevRewardIndex}}{\text{days}}$

    - $\text{dailyRewardYield} = \text{dailyRewardPerSy} * \frac{\text{rewardPrice}}{\text{syPrice}}$

    - $\text{tokenRewardApr} = \text{dailyRewardYield} \times 365$

- $\text{underlyingRewardApr} = \sum \text{tokenRewardApr}$

- Explanation:
    - $\text{underlyingRewardApr}$ estimates the current APr for the **rewards** of the underlying protocol of the SY token. **Rewards** = returns in the reward token, and it’s not auto-compounding by default.

    - In this formula, we are taking the historical rewards rate for the last 7 days, to extrapolate into the returns for the year.
    - Each reward token has its own reward rate, so they have their own APR. We sum them up to get the total APR for all reward tokens.


## **impliedAPY:**
$apy = e^{\text{lnImpliedYield}} - 1$

- $lnImpliedYield$ can be read from [readState](https://etherscan.io/address/0x107a2e3cd2bb9a32b9ee2e4d51143149f8367eba#readContract#F18) function of the market contract. Do remember to scale it by 1e18.


## **SwapFeeApy & voterApr**
Define:

- `explicitSwapFee` is total explicit swap fee (in terms of SY) gotten from the last `durations` days
- `implicitSwapFee` is total implicit swap fee (in terms of SY) gotten from the last `duration` days

### SwapFeeApy
$\text{swapFeeApy}$ is the APY that LP holders will get from the swap fees of the pool.

$\text{poolValue} = \text{lpPriceUsd} * \text{totalSupply}$

$\text{swapFeeForLpHolder} = \text{explicitSwapFee} * 20\% + \text{implicitSwapFee}$



$\text{swapFeeRateForLpHolder} = \frac{\text{swapFeeForLpHolder} * \text{syPriceUsd}}{\text{poolValue}}$

$\text{swapFeeApy} = (1 + \text{swapFeeRateForLpHolder})^\frac{{365}}{\text{durations}} - 1$


- Explanation:
    - LP Holder will received 20% from explicit swap fee, and 100% from the implicit swap fee
    - $swapFeeRateForLpHolder$ is the rate of swap fee that LP holder will get in terms of USD, then we interpolate it to get the $swapFeeApy$

### VoterApr
$\text{VoterApr}$ is the APR that vePendle voters will get from voting for the pool.

$\text{swapFeeForVoter} = \text{explicitSwapFee} * 80\%$

$\text{swapFeeRateForVoter} = \frac{\text{swapFeeForVoter} \ \times \  \text{syPriceUsd}}{\text{PendlePriceUSD} \ \times \ \text{totalVotedLastEpoch}}$

$\text{voterApr} =  \text{swapFeeRateForVoter} \times \frac{365}{\text{durationInDays}}$


- Explanation:
    - Voter will received 80% from explicit swap fee of the pool


#### longYieldApy:

$\text{interestReturns} = (1+\text{underlyingInterestApy})^{\text{yearsToExpiry}} - 1$
$\text{rewardsReturns} = \text{underlyingRewardApy} * \text{yearsToExpiry}$


$\text{ytReturns} = \text{interestReturns} + \text{rewardsReturns}$
$\text{ytReturnsAfterFee} = \text{holdYtReturns} \times 97\%$

$\text{longYieldApy}=\frac{\text{ytReturnsAfterFee}}{\text{ytPriceInAsset}}^{\frac{1}{\text{yearsToExpiry}}}-1$

- Explanation:
    - $\text{interestReturns}$:
        - interest returns, in terms of accounting asset, for holding 1 YT from now until expiry
    - $\text{rewardsReturns}$:
        - rewards returns, in terms of accounting asset, for holding 1 YT from now until expiry
    - $\text{ytReturnsAfterFee}$:
        - we charge 3% on YT yield, so we need to scale it down by 97%
    - $\text{longYieldApy}$:
        - This is the APY if we buy YT today, and hold it all the way to expiry, assuming the underlying APY will stay the same. This can be negative (if the returns from YT is less than YT price)
        - Starting with $\text{ytPriceInAsset}$, we got back $\text{ytReturnsWithFee}$ after $\text{yearsToExpiry}$.Then we just need to scale it to one year to get the APY

