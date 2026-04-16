---
pagination_label: "第 9 章 - 识别做多/做空收益的机会"
title: "第 9 章 - 识别做多/做空收益的机会"
---

import Hint from '@site/src/components/Hint';

# 第九章 - 识别做多/做空收益的机会

> 课程级别：#**高级**

## 简而言之

该策略的目标是通过在 2 种可能的头寸之间切换来最大化底层资产的 APY：

1. [**持有 PT（做空收益）**](chapter-6-shorting-yield)
2. [**持有 YT（做多收益）**](chapter-8-long-yield-obtain-leveraged-yield-exposure)

由于 DeFi 中的收益不断波动，Pendle 市场上的隐含 APY 也随之波动。

随着隐含 APY 的波动，市场将在两种模式之间切换：

<figure><img src="/pendle-academy/imgs/image (80).png" alt="" /><figcaption></figcaption></figure>

因此，如果您能把握市场时机并在卖出和买入 PT 和 YT 之间交替，您可能会获得更大的利润。这本质上是对收益的波段交易。然而，如果您不确定收益走势，您也可以简单地持有底层资产以对冲两边风险。

## 收益市场的 3 种模式

<figure><img src="/pendle-academy/imgs/image (84).png" alt="" /><figcaption></figcaption></figure>

### **PT 便宜模式**

当隐含 APY 较高（高估）时，PT 便宜且固定 APY 较高，**持有 PT 往往是最佳策略。**

持有 PT 时：

* 如果市场波动且隐含 APY 下降，检查隐含 APY 以确定市场已转变为哪种模式，并执行相关策略。
* 如果其他条件保持不变，您可以持有 PT 到期并赎回底层资产，实现固定 APY（见第 2 级固定收益策略）。

### **均衡模式**

当隐含 APY 处于合理水平时，意味着 PT 和 YT 价格都合理，**市场处于均衡状态**。

因此，**三种策略中的任何一种（持有 PT、持有 YT 或持有底层资产）**都可能是合理的。

### **YT 便宜模式**

当隐含 APY 较低（低估）时，YT 便宜且做多收益 APY 较高，**持有 YT 往往是最佳策略。**

持有 YT 时：

* 如果市场波动且隐含 APY 上升，检查隐含 APY 以确定市场已转变为哪种模式，并执行相关策略。
* 如果其他条件保持不变，您可以持有 YT 到期并继续收集资产收益。

### 如何识别正确的模式

识别模式的关键是判断**当前隐含 APY 是否被高估或低估**。

> 回顾一下，**隐含 APY** 是**市场通过以当前价格交易 PT 和 YT 所隐含的平均未来 APY**。

归根结底是预测**平均未来 APY**，然后将您的预测与**当前隐含 APY** 进行比较。在许多情况下，将平均未来 APY 近似为**底层 APY** 是合理的。

然而，在极少数情况下收益可能大幅波动，底层 APY 可能与实际平均未来 APY 有较大偏差。

例如，如果某协议宣布即将削减 APY，市场可能已经将其计入，导致隐含收益率看起来偏低而 YT 看起来便宜。

最终，决定性因素是**您对平均未来 APY 的自身判断**，这将指导您的决策并决定您在收益交易中的成功。

<Hint style="info">
💡 另见 [#如何预测平均未来-apy](chapter-8-long-yield-obtain-leveraged-yield-exposure#how-can-i-predict-the-average-future-apy)
</Hint>

<Hint style="info">
💡 在[第 8 章](chapter-8-long-yield-obtain-leveraged-yield-exposure.md)中了解何时进入/退出 YT 头寸
</Hint>

### 实际操作

假设现在是 2023 年 1 月 1 日，Pendle 上有一个 stETH 市场，**到期期限为 1 年（2024 年 1 月 1 日）**。

**2023 年 1 月 1 日（距到期还有 1 年）：**

<figure><img src="/pendle-academy/imgs/image (56).png" alt="" /><figcaption></figcaption></figure>

**2023 年 4 月 1 日（距到期还有 9 个月）：**

<figure><img src="/pendle-academy/imgs/image (55).png" alt="" /><figcaption></figcaption></figure>

**2023 年 10 月 1 日（距到期还有 3 个月）：**

<figure><img src="/pendle-academy/imgs/image (57).png" alt="" /><figcaption></figcaption></figure>

总共，经过 9 个月，Peepo 执行了 **3 次交易**，**从初始本金 4.3 stETH 获得了 5.301 stETH。这相当于 32.2% 的 APY**。

显然，Peepo 执行的正确交易越多，他的 APY 就越高。我们也可以观察到，正确的 YT 交易可以带来巨大利润。当然，反过来也是如此，错误的 YT 交易可能导致巨大损失。另一方面，PT 交易风险较低，回报也较低。

<Hint style="warning">
**专业提示**

除了整体市场状况导致的隐含 APY 变化外，还有仅仅由于人们买卖 PT 和 YT 引起的波动性变化。您可以主动交易这些变动，在 PT / YT 之间更频繁地切换，如果做对了，可能获得更大的利润。
</Hint>
