import Hint from '@site/src/components/Hint';

# 第四章 - YT 收益交易基础

> 课程级别：**#中级**

您已经完成了前三章，了解了 [PT 和 YT 的基础知识](../pendle-101/chapter-2-yield-tokenization-basics)，以及如何使用 Pendle [赚取被动收入](chapter-3.1-fixed-yield-on-pendle)。做得好！现在让我们深入研究，通过买卖 YT 执行各种收益交易策略。

## 用 YT 进行收益交易 101

在本章中，我们将探讨最简单的收益交易形式——_购买 YT（收益代币）_。

### 买入 YT 做多收益

用 Pendle 交易收益的一种方式是购买 YT（[收益代币](../pendle-101/chapter-2-yield-tokenization-basics)）。这意味着您在**增加您的收益敞口（做多收益）**。您可以持有到期，也可以通过低买高卖进行波段交易快速获利。当您预期某资产的底层 APY 未来将上涨，或者认为 YT 价格被低估时（我们稍后会详细说明），该策略效果良好。

<Hint style="info">
💡 记住：YT 持有者获得底层资产的收益
</Hint>

<figure><img src="/pendle-academy/imgs/image (92).png" alt="" /><figcaption><p>从顶部菜单栏"交易"界面下进入"市场"。然后选择您的资产并点击"YT"。</p></figcaption></figure>

### **无借贷风险的杠杆收益敞口**

由于 YT 的价格通常远低于本金，通过购买 YT，您可以_有效地_获得**杠杆收益敞口**。例如，在下图中，您只需花费 1 stETH，就可以赚取约 11.9 stETH 的收益，这在_名义价值交易_方面是 11.9 倍的有效杠杆。

**无需借贷**，因此**没有清算或预言机错误的风险**。杠杆是通过[收益代币化](../pendle-101/chapter-2-yield-tokenization-basics)简单实现的，它让您以原始价格的一小部分购买资产的收益部分。

<figure><img src="/pendle-academy/imgs/image (93).png" alt="" width="375" /><figcaption><p>用 1 stETH 的成本，您购买了 11.9 stETH 的收益敞口。在本例中名义价值上达到 11.9 倍杠杆。</p></figcaption></figure>

### **如何从购买 YT 中获利？**

当以下任一情况发生时，您将获利：

1. YT 价格上涨，或
2. 从 YT 收到的收益超过购买 YT 的成本

一般来说，您是在押注……

1. 购买后**隐含 APY** 上升（推高 YT 价格），隐含 APY 由**市场力量**驱动（YT 和 PT 的供需关系）
2. **底层 APY** 和/或**做多收益 APY** 变得更高（意味着收益产生得更快）

<Hint style="danger">
💡 如果您不熟悉不同种类的 APY 和术语，不用担心，我们将在[下一章](chapter-5-important-concepts-in-yield-trading)中介绍这些内容。目前，下面的摘要表格对于大多数情况已经足够。
</Hint>

以下表格快速总结了作为 YT 持有者，哪些因素有利于您，哪些因素不利于您。如果指标朝相反方向发展，只需将箭头方向反转即可。

<table><thead><tr><th width="374">指标👇 / 效果 👉</th><th width="158.33333333333331">YT 价格</th><th>YT 收益应收款</th></tr></thead><tbody><tr><td>底层资产价格 ⤴️</td><td>⬆️</td><td>┄</td></tr><tr><td>隐含 APY ⤴️</td><td>⬆️</td><td>┄</td></tr><tr><td>底层 APY ⤴️</td><td>┄</td><td>⬆️</td></tr><tr><td>做多收益 APY ⤴️</td><td>┄</td><td>⬆️</td></tr><tr><td>到期剩余时间 ⤵️</td><td>⬇️（缓慢）</td><td>┄</td></tr></tbody></table>

简而言之：

* **买入 YT 的好时机**是当隐含 APY 较低时，即 YT 价格较低。您还需要确保做多收益 APY 为正（越高越好），这表明 YT _可能_被低估。
* **卖出 YT 的好时机**正好相反——当隐含 APY 较高时，即 YT 价格较高。另外，当做多收益 APY 接近零甚至为负时，这表明 YT _可能_被高估。

<Hint style="info">
💡 更多关于如何更好判断何时是买入或卖出 YT 的好时机，请参阅我们的[第 8 章](../yield-trading-deep-dives/chapter-8-long-yield-obtain-leveraged-yield-exposure.md)。
</Hint>

### **如何购买 YT**

1. 从顶部菜单前往"市场"页面 [https://app.pendle.finance/trade/markets](https://app.pendle.finance/trade/markets)
2. 选择资产并购买其 YT
   1. 选择您喜欢的底层资产和到期日。寻找底层 APY 高和/或隐含 APY 低的资产。
   2. 点击"YT - 做多收益 APY"框继续。
   3. 选择您的输入资产和数量（如有必要，将兑换为池资产以购买 YT）。这可以是与底层资产不同的代币，我们将找到最佳路由来兑换您的资产。
   4. 查看价格影响和费用后的有效隐含 APY（也是您的 YT 有效成本），以及您将赚取的有效做多收益 APY。

<figure><img src="/pendle-academy/imgs/image (48).png" alt="" width="375" /><figcaption><p>查看有效隐含 APY、做多收益 APY 和价格影响。</p></figcaption></figure>

<figure><img src="/pendle-academy/imgs/image (49).png" alt="" /><figcaption><p>查看不同场景下的利润预测。您也可以使用页面右下角的"计算器"进行自定义预测。</p></figcaption></figure>

3. 批准并确认交易。
4. 如果您有开仓头寸，点击顶部菜单的**"仪表板"**查看您当前的头寸。之后您可以点击**"领取"**按钮来领取您 YT 产生的收益。

<Hint style="warning">
记住：**您可以随时退出并卖出您的 YT 头寸。** Pendle 市场 24/7 全天候运营。在 Pendle 中，提前平仓没有任何锁定或罚款。
</Hint>
