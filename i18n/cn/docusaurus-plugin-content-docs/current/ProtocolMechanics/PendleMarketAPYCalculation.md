---
pagination_label: "APY 计算"
title: "APY 计算"
hide_table_of_contents: true
---

# APY 计算

本文档包含用于计算 Pendle 市场 APY 的公式。

以主网市场 `0x107a2e3cd2bb9a32b9ee2e4d51143149f8367eba` 为示例。

## **变量说明**

| 变量名 | 说明 |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| $\text{market}$ | [0x107a2e3cd2bb9a32b9ee2e4d51143149f8367eba](https://etherscan.io/address/0x107a2e3cd2bb9a32b9ee2e4d51143149f8367eba) |
| $\text{sy}$ | [0xC4ed348c56223C5953939e932E315F9d72Cd83fF](https://etherscan.io/address/0xC4ed348c56223C5953939e932E315F9d72Cd83fF) |
| $\text{lpPriceUsd}$ | LP 代币的 USD 价格 |
| $\text{syPriceUsd}$ | SY 代币的 USD 价格 |
| $\text{pendlePriceUSD}$ | PENDLE 代币的 USD 价格 |
| $\text{duration}$ | 用于计算 APY 的时间间隔。例如 $\text{duration}=7$ 表示基于过去 7 天的数据计算 APY。系统默认使用 7 天。 |
| $\text{syIndex}$ | SY 代币的当前指数，可从 SY 合约的 [exchangeRate 函数](https://etherscan.io/address/0xC4ed348c56223C5953939e932E315F9d72Cd83fF#readContract#F9)读取 |
| $\text{prevSyIndex}$ | $\text{duration}$ 天前的 $\text{syIndex}$ |
| $\text{yearsToExpiry}$ | 市场到期的年数 |


## 底层 APY

$\text{underlyingApy} = \text{underlyingInterestApy} + \text{underlyingRewardApr}$

$\text{underlyingApy}$ 由两部分组成，各自计算方法如下：

### **底层利息 APY（UnderlyingInterestApy）**
$\text{interestMultiple} = \dfrac{\text{syIndex}}{\text{prevSyIndex}}$

$\text{underlyingInterestApy} = \text{interestMultiple}^{\frac{365}{\text{days}}} - 1$

- 说明：
    - $\text{underlyingInterestApy}$ 估算 SY 代币底层协议**利息**的当前 APY。**利息** = 以底层资产计价的收益，默认自动复利。
    - 此公式取过去 7 天的历史 APY，并外推为年化收益率。

### **底层奖励 APR（UnderlyingRewardApr）**

- 对于每种奖励代币：

    - $\text{prevRewardIndex} =$ $\text{duration}$ 天前的 $\text{rewardIndex}$
    - $\text{dailyRewardPerSy} = \dfrac{\text{rewardIndex} - \text{prevRewardIndex}}{\text{days}}$

    - $\text{dailyRewardYield} = \text{dailyRewardPerSy} * \dfrac{\text{rewardPrice}}{\text{syPrice}}$

    - $\text{tokenRewardApr} = \text{dailyRewardYield} \times 365$

- $\text{underlyingRewardApr} = \sum \text{tokenRewardApr}$

- 说明：
    - $\text{underlyingRewardApr}$ 估算 SY 代币底层协议**奖励**的当前 APR。**奖励** = 以奖励代币计价的收益，默认不自动复利。
    - 此公式取过去 7 天的历史奖励速率，并外推为年化收益率。
    - 每种奖励代币有独立的奖励速率，对应独立的 APR，求和得到所有奖励代币的总 APR。


## **隐含 APY（impliedAPY）**
$\text{apy} = e^{\text{lnImpliedYield}} - 1$

- $\text{lnImpliedYield}$ 可从市场合约的 [readState](https://etherscan.io/address/0x107a2e3cd2bb9a32b9ee2e4d51143149f8367eba#readContract#F18) 函数读取，请注意需除以 1e18 进行缩放。


## **兑换手续费 APY（SwapFeeApy）**

### SwapFeeApy
$\text{swapFeeApy}$ 是 LP 持有者从池子兑换手续费中获得的 APY。

$\text{poolValue} = \text{lpPriceUsd} * \text{totalSupply}$

$\text{swapFeeForLpHolder} = \text{explicitSwapFee} * 20\% + \text{implicitSwapFee}$



$\text{swapFeeRateForLpHolder} = \dfrac{\text{swapFeeForLpHolder} * \text{syPriceUsd}}{\text{poolValue}}$

$\text{swapFeeApy} = (1 + \text{swapFeeRateForLpHolder})^\frac{{365}}{\text{durations}} - 1$


- 说明：
    - LP 持有者获得显式兑换手续费的 20% 和全部隐式兑换手续费
    - $\text{swapFeeRateForLpHolder}$ 是 LP 持有者以 USD 计算获得的手续费比率，再外推得到 $swapFeeApy$

#### 做多收益 APY（longYieldApy）：

$\text{interestReturns} = (1+\text{underlyingInterestApy})^{\text{yearsToExpiry}} - 1$
$\text{rewardsReturns} = \text{underlyingRewardApy} * \text{yearsToExpiry}$


$\text{ytReturns} = \text{interestReturns} + \text{rewardsReturns}$
$\text{ytReturnsAfterFee} = \text{holdYtReturns} \times 95\%$

$\text{longYieldApy}=\dfrac{\text{ytReturnsAfterFee}}{\text{ytPriceInAsset}}^{\frac{1}{\text{yearsToExpiry}}}-1$

- 说明：
    - $\text{interestReturns}$：
        - 持有 1 个 YT 从现在到到期日，以会计资产计价的利息收益
    - $\text{rewardsReturns}$：
        - 持有 1 个 YT 从现在到到期日，以会计资产计价的奖励收益
    - $\text{ytReturnsAfterFee}$：
        - YT 收益收取 5% 手续费，因此需乘以 95%
    - $\text{longYieldApy}$：
        - 即今日买入 YT 并持有至到期日、假设底层 APY 保持不变的 APY。可能为负（若 YT 收益总和低于 YT 购买价格）
        - 从 $\text{ytPriceInAsset}$ 出发，经过 $\text{yearsToExpiry}$ 年后得回 $\text{ytReturnsWithFee}$，再换算为年化即得 APY

## $\text{effectiveImpliedApy}$（实际隐含 APY）
实际隐含 APY 是基于用户实际兑换汇率计算的 APY。

计算 $\text{effectiveImpliedApy}$ 需要获取 $\text{ptExchangeRate}$：即 1 个底层资产可兑换的 PT 数量。

共有三种兑换类型：
- PT ↔ YT 以外的任意代币
- YT ↔ PT 以外的任意代币
- PT ↔ YT

每种类型计算 $ptExchangeRate$ 的方式不同：

### PT ↔ 任意代币
- $\text{underlying}$：以底层代币计价的输入/输出代币数量
- $\text{ptAmount}$：PT 输入/输出数量

$$\text{ptExchangeRate} = \dfrac{\text{ptAmount}}{\text{underlying}}$$

### YT ↔ 任意代币
- $\text{ytAmount}$：YT 输入/输出数量

$$\text{ptExchangeRate} = \dfrac{1}{1 - \dfrac{\text{underlying}}{\text{ytAmount}}}$$


### PT ↔ YT
$$\text{ptExchangeRate} = 1 + \dfrac{\text{ptAmount}}{\text{ytAmount}}$$


由 $\text{ptExchangeRate}$ 可按如下公式计算 effectiveImpliedApy：

$$\text{effectiveImpliedApy} = \text{ptExchangeRate}^{\frac{365}{\text{daysToExpiry}}} - 1$$
