---
pagination_label: "第 6 章 - 做空收益"
title: "第 6 章 - 做空收益"
---

import Hint from '@site/src/components/Hint';

# 第六章 - 做空收益

> 课程级别：**#高级**

<Hint style="info">
💡 回顾[第二章](../pendle-101/chapter-2-yield-tokenization-basics)了解**本金代币（PT）**的基础知识。回顾[第三章](../optimizing-yields-with-pendle/chapter-3.1-fixed-yield-on-pendle)了解购买 PT 以获得固定收益的内容。
</Hint>

### 简而言之

回想一下，您可以在 Pendle 上将收益资产[拆分](../pendle-101/chapter-2-yield-tokenization-basics)为代表本金的（PT）和代表收益的（YT）两部分。您可以在 Pendle 市场上买卖这些代币来押注收益变化。例如，如果您认为收益会下降，可以卖出 YT 并持有 PT。这样，您可以锁定固定回报率，避免收益下降带来的损失。这就是**做空收益**。

### PT 是**做空收益头寸**

买入并持有 PT 不仅仅是赚取固定收益。它也是押注收益下降的方式。当市场预期收益下降时，PT 价格上涨。因此，PT 也是一个做空收益头寸。

[如果市场共识认为某资产的收益将下降，隐含 APY 就会下降](../optimizing-yields-with-pendle/chapter-5-important-concepts-in-yield-trading#implied-apy)。这会推高 PT 价格，您可以选择卖出 PT 来获利。这就是主动收益交易。

### 什么时候应该买入 PT？

从买入并持有 PT 获得的固定收益**取决于 PT 的当前市场价格**。

直觉上，您应该**在 PT 较便宜时买入**，因为您将**获得更高的固定收益**。但如何判断 PT 的价格是否便宜呢？

您需要**将固定收益与底层资产的平均未来收益进行比较**。平均未来收益是您对从现在到到期日期间未来收益的预测。如果固定收益高于您对平均未来收益的预测，那么现在可能是买入 PT 的好时机。这意味着您是在逆市押注并锁定更高的回报率。

例如，如果您预测到期前 stETH 的平均未来收益为 5%，但 PT stETH 以 6% 的固定利率定价，那么您应该买入并持有 PT stETH。

<Hint style="warning">
_**专业提示**_ \
**执行 PT 交易时，时机很重要**。随着人们在 Pendle 上买卖 PT，固定利率会上下波动。如果您能等待并在 PT 超卖时（由于波动性或定价错误）入场，您将锁定一个高固定利率，一直持续到到期为止。
</Hint>

从数值上看，**固定 APY = 隐含 APY**，显示市场对未来收益的预期。因此您也可以在"市场"页面上比较各资产市场的隐含 APY 与底层 APY。

一般来说，**当隐含 APY 远高于底层 APY 时，PT 较便宜**（除非您认为底层 APY 会反弹）。

<figure><img src="/pendle-academy/imgs/image (105).png" alt="" /><figcaption></figcaption></figure>

总而言之，当以下情况发生时，您可以考虑通过购买 PT 进入做空收益头寸：

1. 您认为该资产未来将产生更少的底层 APY，或
2. 您想对冲收益下降风险，或
3. 您对广告中的 APY 感到满足，或
4. 您认为 PT 过于低估

### 如何操作

1. **前往** [**Pendle**](https://app.pendle.finance/pro/markets)
2. **买入 PT**
   1. 选择您想购买的 PT。
   2. 选择输入资产（即您想用来购买 PT 的资产）。
   3. 查看您的交易输出和价格影响。
   4. 批准并确认交易。
3. **被动管理** - 持有 PT 并在到期后赎回底层资产  **主动交易** - 在价格上涨时卖出 PT

### 提前卖出 PT

除了等到期赎回底层资产外，您也可以选择提前卖出 PT。提前卖出 PT 的常见原因包括：

* 退出头寸以将资金转移到其他地方，或
* PT 价格已大幅上涨，有机会提前获利。这就是所谓的主动收益交易。

### 实际操作示例

假设 Pendle 上有一个到期期限为 1 年的 stETH 池。这意味着 **PT stETH 的持有者可以保证在 1 年后以 1:1 赎回 stETH**。

Peepo 在 2023 年 1 月 1 日看到 Pendle 市场页面的以下信息：

<figure><img src="/pendle-academy/imgs/image (42).png" alt="" /><figcaption></figcaption></figure>

**PT stETH = 0.94 stETH**

您可以现在花 0.94 stETH 购买 1 PT stETH，到期后赎回 1 stETH

**底层 APY = 5%**

底层 APY 意味着 stETH 目前从 Lido 质押奖励中产生 5% 的收益。因此持有 stETH 的净 APY 为 5%。

**固定 APY = 6.4%**

买入并持有 PT 到期的固定 APY 为 6.4%

Peepo 预测 Lido 的平均未来收益**最多为 6%**，因此锁定 **6.4% 固定收益**是个好选择。Peepo 继续购买了 **100 PT stETH（= 94 stETH）**。拥有 **100 PT stETH** 后，Peepo 保证可以在 1 年后 PT 到期时**赎回 100 stETH**。这实际上产生了 **6.4% 的固定 APY**。

<figure><img src="/pendle-academy/imgs/image (43).png" alt="" /><figcaption></figcaption></figure>

实际上，**即使固定 APY 略低于底层 APY**，这可能仍然是个好选择，特别是**如果您预测未来收益将下降**。这在收益可以快速波动的动荡市场中特别有用，您可以**以满意的利率锁定 APY**，完全不用担心回报下降。
