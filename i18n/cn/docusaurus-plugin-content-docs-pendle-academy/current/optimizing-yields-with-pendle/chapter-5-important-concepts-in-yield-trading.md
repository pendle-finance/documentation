import Hint from '@site/src/components/Hint';

# 第五章 - 收益交易中的重要概念

> 课程级别：**#中级**

我们在[第四章 - 收益交易基础](chapter-4-yield-trading-basics-with-yt)中介绍了各种术语和概念。让我们更深入地探讨这些重要的收益交易概念。

### PT + YT = 底层资产

作为提醒，Pendle [收益代币化](../pendle-101/chapter-2-yield-tokenization-basics)的核心是将收益代币拆分为 PT 和 YT。两个代币的价格之和等于底层资产的价格。因此，PT 和 YT 的价格必然**负相关**——YT 价格越高，PT 价格越低，反之亦然。

<Hint style="warning">
💡 关键要点：**PT 和 YT 只是同一枚硬币的两面——隐含 APY**
</Hint>

### 底层 APY

底层 APY 代表底层资产 7 天移动平均收益率。这种方法可以更准确地反映一段时间内的底层收益。

### 隐含 APY

隐含 APY 是市场对资产收益的当前**共识**。换言之，它是 YT 的"价格"，以百分比表示。

**隐含 APY 随时间变化，取决于市场上 YT 和 PT 的供需关系**。购买 YT 的人越多，或卖出 PT 的人越多（记住它们只是同一枚硬币的两面），隐含 APY 就越高，YT 就越贵（或 PT 越便宜），反之亦然。

以下表格总结了市场活动如何影响隐含 APY：

| 买/卖 | YT            | PT            |
| -------- | ------------- | ------------- |
| 买      | 隐含 APY ↑ | 隐含 APY ↓ |
| 卖     | 隐含 APY ↓ | 隐含 APY ↑ |

<Hint style="info">
💡 关键要点：将**隐含 APY 视为 YT 价值的衡量标准**。它是 YT 的价格，以收益率百分比表示。
</Hint>

<Hint style="info">
💡 关键要点：Pendle 是**不同资产_隐含 APY_ 的交易市场**。（类似于 Uniswap 是不同资产_现货价格_的交易市场）
</Hint>

$$ImpliedAPY = [(1+\frac{YTprice}{PTprice})^\frac{365}{DaysToMaturity} ]-1$$

不需要完全理解隐含 APY 背后的数学原理，但您可以从中注意到两点：

1. **底层 APY 不直接影响隐含 APY**\
   隐含 APY 取决于 YT 或 PT 的需求，这由市场力量决定。因此，即使底层 APY 保持不变，隐含 APY 也可能因市场情绪变化而波动。
2. **在隐含 APY 不变的情况下，随时间推移 YT 价格下降而 PT 价格上升**\
   即使市场完全没有交易活动（因此隐含 APY 保持不变），时间也会影响 YT 和 PT 的价格。这是合理的，随着时间趋近到期（到期日），YT 剩余可收取的收益越来越少，因此其价格下降。YT 价格下降反过来导致 PT 价格向上趋势，到期时等于其底层资产。

### 做多收益 APY

做多收益 APY 是您**通过购买 YT 并持有到期可以获得的_预估_回报**（以年化收益率表示），假设底层 APY 保持当前值不变。

该值可以为负，意味着基于当前底层 APY 的未来收益总价值将小于购买 YT 的成本。

简而言之，做多收益 APY 代表底层 APY（预估获得的收益）与隐含 APY（YT 的成本）之间的差值。如果您买入并持有 YT，您希望这个值保持正值，越高越好。

<Hint style="info">
💡 关键要点：做多收益 APY 给您一个_**提示**_，说明 YT 当前是否便宜（正值）或昂贵（负值）。
</Hint>

在[第 9 章](../yield-trading-deep-dives/chapter-9-identifying-opportunities-to-long-short-yield.md)中了解更多关于如何评估 YT 和 PT 价值的内容。

### 固定 APY

固定 APY 是您在现在买入并持有 PT 情况下保证获得的收益。该值在数值上等于隐含 APY。

### 示例 1

<figure><img src="/pendle-academy/imgs/image (46).png" alt="" width="563" /><figcaption></figcaption></figure>

上图是 Pendle 上一个收益资产的示例。sDAI 是 MakerDAO（Spark Protocol）的 DAI 储蓄利率，目前产生 5% 的收益。

上图显示 Pendle 上的隐含 APY 为 3.89%，这意味着 YT-sDAI-2024 目前的定价为 3.89%。

<Hint style="info">
💡 如果您认为 sDAI 的平均收益（底层 APY）到期前将高于其隐含 APY，购买 YT 将是一个好决策。
</Hint>

在这种情况下购买 YT-sDAI 将产生 5% 的收益，而成本为 3.89%，由于您获得的收益多于您所花费的，此时做多收益 APY 为正（如附图所示为 29.42%）。
