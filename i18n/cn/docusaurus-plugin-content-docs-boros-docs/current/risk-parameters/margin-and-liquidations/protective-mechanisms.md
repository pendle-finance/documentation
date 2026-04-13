---
pagination_label: "保护机制"
title: "保护机制"
---

# 保护机制

Boros 设有几项机制来降低用户和系统的风险。

### 未平仓上限（OI Cap）

* 任何市场的未平仓量（OI）有硬性上限
* 从市场 API 获取该值：
  * 未平仓上限 = **`hardOICap`/`1e18`**

### 仅平仓模式（Closing Only Mode）

* 当市场动态变得过于极端时（例如价格波动异常高或流动性低），仅平仓模式将自动开启
* 仅平仓模式开启时，用户只能平仓现有头寸（不能开设新头寸）

### 最大利率偏差（Max Rate Deviation）

* 系统不允许以距当前标记利率过远的利率进行任何市场交易。
* 如果交易超过此限制，UI 上将显示"大利率偏差"错误
* 确切要求如下：

$$
|markRate - rateTraded| \leq maxRateDeviationFactor \times max(markRate, RateFloor)
$$

* `maxRateDeviationFactor` = **`maxRateDeviationFactorBase1e4` / `1e4`**
  * 其中 **`maxRateDeviationFactorBase1e4`** 来自市场 API

### 限价单利率的最大边界（Max Bounds on Limit Order rates）

* 放置限价单时，用户不能在远高于标记利率处做多，也不能在远低于标记利率处做空。
* 确切机制如下：
  * 多头订单利率不得超过 _f_<sup>_u_</sup>
  * 空头订单利率不得低于 _f_<sup>_l_</sup>

$$
f^u(r_m) =    \begin{cases}      r_m\times upperLimitSlope & r_m \geq I_{threshold} \\      r_m + upperLimitConstant & 0 \leq r_m < I_{threshold} \\      -f^l(-r_m) & r_m < 0    \end{cases}\\    f^l(r_m) =    \begin{cases}      r_m\times lowerLimitSlope & r_m \geq I_{threshold} \\      r_m + lowerLimitConstant & 0 \leq r_m < I_{threshold} \\      -f^u(-r_m) & r_m < 0    \end{cases}
$$

* 从市场 API 返回值获取变量：
  * `upperLimitSlope` = **`loUpperSlopeBase1e4` / 1e4**
  * `upperLimitConstant` = **`loUpperConstBase1e4` / 1e4**
  * `lowerLimitSlope` = **`loLowerSlopeBase1e4` / 1e4**
  * `lowerLimitConstant` = **`loLowerConstBase1e4` / 1e4**
