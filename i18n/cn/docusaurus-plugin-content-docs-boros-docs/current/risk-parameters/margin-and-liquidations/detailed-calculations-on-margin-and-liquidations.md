# 保证金与清算的详细计算

## 初始保证金（IM）

* 概述：初始保证金是用户开设新头寸所需的保证金
* 变量：
  * `k`<sub>`IM`</sub>：初始保证金系数，特定于每个市场的设置
  * `s`：名义规模
  * `t`：到期时间（以年为单位）
  * `TimeFloor`：到期时间的底线，特定于每个市场的设置
  * `RateFloor`：标记利率的底线，特定于每个市场的设置
* 公式：

$$
IM = k_{IM} \times |s| \times max(t, TimeFloor) \times max(markRate, RateFloor)
$$

* 如果用户的总初始保证金小于其净余额，或者他们正在平仓现有头寸，则用户可以开设新的限价单或市价单

## 维持保证金（MM）

* 概述：维持保证金是用户需要维持头寸（不被清算）所需的保证金
* 变量：
  * `k`<sub>`MM`</sub>：维持保证金系数，特定于每个市场的设置
  * `s`：名义规模
  * `t`：到期时间（以年为单位）
  * `TimeFloor`：到期时间的底线，特定于每个市场的设置
  * `RateFloor`：标记利率的底线，特定于每个市场的设置
* 公式：

$$
MM = k_{MM} \times |s| \times max(t, TimeFloor) \times max(markRate, RateFloor)
$$

* 从 API 获取设置：
  * API：[https://api.boros.finance/core/docs#/Markets/MarketsController\_getMarketInfo](https://api.boros.finance/core/docs#/Markets/MarketsController_getMarketInfo)
  * 从 API 获取设置的说明：
    * TimeFloor：API 中的 **`tThresh`**，除以 365\*_24\*_&#x33;600
    * RateFloor：
      * `1.00005^(iTickThresh*tickStep) - 1`

## 清算

* 概述：如果抵押品区域内的净余额低于维持保证金，用户将被清算
* 当发生清算时，用户的头寸以标记利率平仓，用户将损失以下清算罚款：

$$
清算罚款 = k \times 被清算头寸的维持保证金
$$

* 其中 k 在头寸刚刚可被清算时从 25% 开始，随着头寸变得越来越不健康（但仍未被清算），线性增加至 50%
