---
pagination_label: "第 8 章 - 做多收益（获取杠杆收益敞口）"
title: "第 8 章 - 做多收益（获取杠杆收益敞口）"
---

import Hint from '@site/src/components/Hint';

# 第八章 - 做多收益（获得杠杆收益敞口）

> 课程级别：**#高级**

### 简而言之

**收益代币（YT）** 与本金代币（PT）在 Pendle AMM 的同一个池中交易。

<figure><img src="/pendle-academy/imgs/image (70).png" alt="" /><figcaption></figcaption></figure>

假设 **1 YT stETH** 以 **0.04 stETH** 交易，**到期期限为 1 年**。持有 **1 YT stETH** 赋予您**在到期前获得 1 stETH 收益的权利**。

Peepo 认为 **1 stETH 在 1 年内将产生超过 0.04 stETH 的收益**（相当于 4% APY），并选择**购买 1 YT stETH**。

<figure><img src="/pendle-academy/imgs/image (69).png" alt="" /><figcaption></figcaption></figure>

在这里，**Peepo 获利**，因为他**累积的未来收益大于购买 YT stETH 时的价格**。Peepo 基本上是在**做多 stETH 收益**：

<Hint style="info">
💡 **买入并持有 YT = 做多收益 利润 = 未来收益 - YT 成本**
</Hint>

### 如何操作

1. **前往** [**Pendle**](https://app.pendle.finance/pro/markets)
2. **买入 YT**
   1. 选择您想购买的 YT。
   2. 选择输入资产（即您想用来购买 YT 的资产）
   3. 查看您的交易输出和价格影响。
   4. 批准并确认交易
3. **被动管理** - 持有 YT 并收集所有收益直到到期  **主动交易** - 在隐含 APY 上升时卖出 YT
4. **在** [**Pendle 仪表板**](https://app.pendle.finance/trade/dashboard/overview/positions) **领取 YT 收益**

### 我如何_获利_？

当以下任一情况发生时，您将获利：

1. YT 价格上涨
2. YT 产生的收益超过您购买 YT 的成本

一般来说，您是在押注：

1. 购买后**隐含 APY** 上升（推高 YT 价格），隐含 APY 由**市场力量**驱动（YT 和 PT 的供需关系）
2. **底层 APY** 和/或**做多收益 APY** 变得更高（意味着收益产生得更快）

以下表格快速总结了作为 YT 持有者，哪些因素有利于您，哪些因素不利于您。如果指标朝相反方向发展，只需将箭头方向反转即可。

| 指标👇 / 效果 👉  | YT 价格    | YT 收益应收款 |
| ------------------------- | ----------- | -------------------- |
| 底层资产价格 ⤴️ | ⬆️          | ┄                    |
| 隐含 APY ⤴️            | ⬆️          | ┄                    |
| 底层 APY ⤴️         | ┄           | ⬆️                   |
| 做多收益 APY ⤴️         | ┄           | ⬆️                   |
| 到期剩余时间 ⤵️       | ⬇️（缓慢） | ┄                    |

### 杠杆收益敞口和名义价值

由于 YT 的价格通常远低于底层资产，通过购买 YT，您可以_有效地_获得**杠杆收益敞口**。例如，在下图中，您只需花费 1 stETH，就可以赚取约 11.9 stETH 的收益，这在_**名义价值交易**_方面是 11.9 倍的有效杠杆。

**无需借贷**，因此**没有清算或预言机错误的风险**。杠杆是通过[收益代币化](../pendle-101/chapter-2-yield-tokenization-basics)简单实现的，它让您以原始价格的一小部分购买资产的收益部分。

<figure><img src="/pendle-academy/imgs/image (71).png" alt="" width="375" /><figcaption><p>用 1 stETH 的成本，您购买了 11.9 ETH 价值的 stETH 收益敞口。在本例中名义价值上达到 11.9 倍杠杆。</p></figcaption></figure>

### 什么时候应该做多收益并购买 YT？

简而言之部分的最后一句话可以浓缩为一个公式：

<figure><img src="/pendle-academy/imgs/image (72).png" alt="" /><figcaption><p><em>进行收益交易时，以 APY 而非美元价值来思考是最好的方式。</em></p></figcaption></figure>

如果您认为**平均未来 APY** 将高于**当前隐含 APY**（市场所隐含的 APY），那么**做多收益是个合理的策略**。

**平均未来 APY** 的一个简单估计是**当前底层 APY**，即**底层协议**当前产生的 APY。如果从现在到到期所有条件完全保持不变，**未来 APY 应与底层 APY 相同**。

**如果您假设****当前底层 APY** 是对**未来 APY** 的良好估计，以下是判断何时是购买 YT 好时机的简单指南：

<Hint style="info">
💡 如果**隐含 APY 低于底层 APY**，那么您**更有可能从购买 YT 中获利**。
</Hint>

<Hint style="info">
💡 如果**隐含 APY 高于底层 APY**，那么您**从购买 YT 中获利的可能性较小**。
</Hint>

### 如何管理我的交易？

**被动管理 - 在隐含 APY 低时买入并持有 YT**

当隐含 APY 相对于底层 APY 较低时，YT 较便宜。

只要底层 APY 保持高于您购买 YT 时的隐含 APY，您可能会从这笔交易中获利。

> 利润 = YT 收集的总收益 - YT 成本

**主动交易 - 在隐含 APY 高时卖出 YT**

YT 可以随时出售。就像任何其他代币一样，您也可以通过 YT 的"低买高卖"来获利。

您可以通过监控隐含 APY，在其升高时卖出 YT 来获利。

> 利润 = （收集的总收益 + YT 销售收入）- YT 成本

<figure><img src="/pendle-academy/imgs/image (73).png" alt="" width="563" /><figcaption><p>Pendle 应用中的隐含 APY 图表</p></figcaption></figure>

### 我如何预测平均未来 APY？

上一节中的简单指南有一个**重大假设**，即**底层 APY 将保持不变**。

当然，现实并非如此简单，这**通常不是实际情况**。许多其他因素可能影响未来收益，例如**市场情绪**或**底层协议收益机制的变化**。

例如，在牛市中，资金需求旺盛，导致货币市场的借贷利率更高。这种需求会转化为更高的借贷 APY，从而为贷款人带来更高的 APY。在识别和分析这些趋势方面的任何优势都将大有裨益，有助于预测未来收益并执行这一策略。

<figure><img src="/pendle-academy/imgs/image (58).png" alt="" width="563" /><figcaption></figcaption></figure>

作为另一个假设示例，GMX 可能即将成功与 Google 和 Amazon 合作，为 GLP 收益提供催化剂，由于用户活动、利息和最终的交换费、奖励等增加，未来可能飙升。

因此，仅仅因为 YT 相对昂贵并不一定意味着它被高估。在这种情况下，提前购买 YT 可能是个好主意。

另一种评估隐含 APY 价值的方法是分析其在 Pendle 上的历史趋势。

<figure><img src="/pendle-academy/imgs/image (60).png" alt="" width="563" /><figcaption></figcaption></figure>

### 它是如何运作的？

假设 Pendle 上有一个**到期期限为 1 年**的 **stETH 池**。这意味着 **YT stETH** 的持有者有权在**接下来 1 年内收集 stETH 收益**。

Peepo 在 2023 年 1 月 1 日看到 Pendle 市场页面的以下信息：

<figure><img src="/pendle-academy/imgs/image (61).png" alt="" /><figcaption></figcaption></figure>

**YT stETH = 0.04 stETH，隐含 APY = 4.2%**

通过以此价格交易 YT stETH，市场将 stETH 在接下来一年的平均未来 APY 估值为 4.2%。

**底层 APY = 5%**

底层 APY 意味着 stETH 目前从 Lido 质押奖励中产生 5% 的收益。因此持有 stETH 的净 APY 为 5%。

**做多收益 APY = 25%**

假设平均未来 APY 等于当前底层 APY，以当前价格买入并持有 YT 的 APY。

Peepo 预测 stETH 的平均未来 APY 将**保持在 5% 以上**，这意味着**当前 4.2% 的隐含 APY 是个好价格**。

Peepo 选择**购买 100 YT stETH（= 4 stETH）**，知道如果平均未来 APY 保持在当前底层 APY 水平（这是一个合理的假设），**他将获得 5 stETH 价值的收益，实现 25% APY**。

<figure><img src="/pendle-academy/imgs/image (62).png" alt="" /><figcaption></figcaption></figure>

事实证明，在接下来的一年中平均 APY 增长到 **5.5%**，**Peepo 最终获得了更大的收益**。

<figure><img src="/pendle-academy/imgs/image (63).png" alt="" /><figcaption></figcaption></figure>

与**简单持有 stETH**相比，后者将获得**显示的 5.5% APY**，Peepo 通过持有 **YT stETH** 获得的 APY 是前者的 **6 倍以上**。

***

**Wojak 买入了 4 stETH**

<img src="/pendle-academy/imgs/image (64).png" alt="" data-size="original" />

通过持有 **4 stETH** 一年，Wojak 赚取了 **5.5% APY = 0.22 stETH**

***

**Peepo 买入了 100 YT stETH（= 4 stETH）**

![](</pendle-academy/imgs/image (66).png>)

通过持有 **100 YT stETH** 一年，Peepo 赚取了 **1.5 stETH**。Peepo 获得的 APY 是持有 stETH 的 **6 倍以上**。

***

然而，重要的是要注意，与大多数投资一样，更高的回报伴随着更高的风险。

当**隐含收益率远大于底层 APY** 时，**做多收益 APY 将为负**。这意味着假设底层 APY 保持不变，购买 YT 的成本将超过收集的平均未来收益。在这种情况下，通常**不是购买 YT 的好时机**，除非您认为底层 APY 将上升超过当前隐含 APY。

即使您在**做多收益 APY 为正**的情况下（**隐含 APY < 底层 APY**）购买 YT，平均未来 APY 也可能**降至低于您交易的隐含 APY**，导致您亏损（再次查看第 3.1 节的公式）。

最终，您正在进入**做多收益**头寸，您的利润取决于**收益的持续或增长**。
