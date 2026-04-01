import Hint from '@site/src/components/Hint';

# 第 3.2 章 - 通过流动性提供获得更多收益

## Pendle 上的流动性提供

<iframe height="400" width="100%" src="https://www.youtube.com/embed/AWceGmkv2pc" title="Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

与许多其他 DeFi 协议类似，您也可以将资产存入以向 Pendle 池提供流动性。Pendle 池促成了本学院中讨论的所有其他收益策略。

<Hint style="info">
💡 在 Pendle 提供流动性在到期时没有无常损失风险。
</Hint>

#### 在原本闲置的收益资产基础上赚取额外收益

流动性提供者从多个渠道获得回报：

* 原生收益
  * 来自底层资产的协议收益/奖励（例如 stETH 的收益，或 GMX 的 GLP 分配的 ETH 奖励）
  * 来自池中 PT 组成部分的固定收益
* 交换费
* $PENDLE 激励

<figure><img src="/pendle-academy/imgs/image (6).png" alt="" /><figcaption><p>vePENDLE 锁定</p></figcaption></figure>

### 为什么要向 Pendle 池提供流动性？

1. 您可以**赚取额外的"免费"收益**，包括交换费和 $PENDLE 激励，在您原本闲置资产的基础上获得额外收益
2. 到期时无无常损失（IL）。Pendle 池只以您选择的底层资产计价（例如 stETH 池中只包含原生 stETH 加 PT-stETH），从而形成单一资产价格敞口。
3. 您**不**被锁定，可以随时退出。

### 如何开始赚取

在 Pendle 上提供流动性可以简单到只需一键操作，让您将持有的任何资产（例如 USDC）兑换为 Pendle LP 头寸（例如 Pendle LP-stETH）。同样，您甚至可以使用 [PT 或 YT](../pendle-101/chapter-2-yield-tokenization-basics) 等其他 Pendle 资产存入 Pendle LP。

1. 前往**池**页面：[https://app.pendle.finance/trade/pools](https://app.pendle.finance/trade/pools)
2. 存款并开始赚取
   1. 选择资产池和到期日以提供流动性。您也可以按"最高 APY"排序。
   2. 选择您的输入资产和数量（如有必要，将兑换为池资产）。这可以是与底层资产不同的代币，我们将找到最佳路由来兑换您的资产。
   3. 查看输出，批准并确认交易。
3. 如果您有开仓头寸：
   1. 点击顶部菜单中的"仪表板"查看您当前的 LP 头寸。
   2. 您可以返回"仪表板"中的"领取"按钮来领取您的 LP 奖励（请注意并非所有奖励都可领取，见常见问题）。
   3.

       <figure><img src="/pendle-academy/imgs/image (8).png" alt="" /><figcaption></figcaption></figure>

**我是否被锁定到到期日？可以提前退出吗？**

> 您完全_不_被锁定，可以随时移除 LP 并退出。

**我是否需要持有到到期日才能赚取广告中的 APY？**

> 不需要，流动性提供的 APY 与到期日无关。PENDLE 或原生奖励会持续流向 LP，在到期日前退出池不会改变流向您的奖励数量。

**LP 池中我真正持有哪些代币？**

> 我们将在[第 7 章](../yield-trading-deep-dives/chapter-7-providing-liquidity-while-trading-yield.md)中进行详细说明。简而言之，Pendle 池由两个部分组成：（1）底层资产的（包装版本），以及（2）其 PT 版本（通常比例较小）。您可以在[第二章](../pendle-101/chapter-2-yield-tokenization-basics.md)中了解 PT 的概念。

**为什么到期时没有无常损失（IL）？**

> 主要思路是 Pendle 池只包含高度相关且以您所选相同资产计价的代币，因此它们之间的价格比率变化不大。这意味着 IL 极小，且**到期时保证为零或没有**。

**如何领取 LP 奖励？**

> 您可以通过点击顶部菜单"仪表板"内的"领取"按钮来领取 LP 奖励。

**为什么有时看不到底层收益可以领取？**

> 某些资产，如 stETH、wstETH、rETH 和 gDAI，不会明确分配收益，而是随时间增加其代币价值。它们的收益已融入其不断上涨的代币价格中。Pendle 池的交换费也会增加池的价值，无需领取。
>
> 另一方面，某些资产，如 GLP 和 Stargate-USDT，会定期向持有者分配收益。您需要手动领取这些收益。
>
> $PENDLE 激励始终可以使用"领取"按钮领取。

**"Pendle Trade"中"Zap"界面里的"零价格影响模式"是什么？**

> 请查看[#2.-如何通过零价格影响模式实现收益中性](../yield-trading-deep-dives/chapter-7-providing-liquidity-while-trading-yield#2.-how-to-be-yield-neutral-with-zero-price-impact-mode)

### LP 作为您收益交易策略的一部分

提供流动性也可以成为您收益优化或交易策略的一部分，因为 LP 头寸对底层资产收益略有看跌倾向。这将在[第 7 章](../yield-trading-deep-dives/chapter-7-providing-liquidity-while-trading-yield.md)中深入讨论。
