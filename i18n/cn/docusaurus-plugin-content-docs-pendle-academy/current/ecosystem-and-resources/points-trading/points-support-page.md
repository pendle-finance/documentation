---
pagination_label: "积分支持页面"
title: "积分支持页面"
---

import Hint from '@site/src/components/Hint';
import CardGrid, { Card } from '@site/src/components/CardGrid';

# 积分支持页面

## 自助服务

<CardGrid type="selfService">
  <Card
    title="YT / PT / LP" link="points-support-page#yt-pt-lp"
  />
  <Card
    title="风险" link="points-support-page#risks"
  />
  <Card
    title="余额下降" link="points-support-page#balance-is-down"
  />
  <Card
    title="积分相关" link="points-support-page#points-related"
  />
  <Card
    title="保留 YT 模式 LP" link="points-support-page#zero-price-impact-lp"
  />
  <Card
    title="Arbitrum 上的 LRT" link="points-support-page#lrt-on-arbitrum"
  />
  <Card
    title="有上限的资产" link="points-support-page#usde-cap"
  />
  <Card
    title="其他" link="points-support-page#others"
  />
</CardGrid>

## 常见问题

### YT / PT / LP

#### 1. YT、PT 和 LP 之间有什么区别？

Pendle 将收益资产（eETH、stETH、GLP 等）拆分为两部分，**YT**（收益代币）和 **PT**（本金代币）。这两个组成部分可以在 Pendle 上交易，交易由 **LP**（流动性提供者）促成。

YT 和 PT 是 Pendle 中的两个基本概念。要在 LRT 背景下了解更多关于它们的内容，请查阅[#定义](./#definition)。

#### 2. 我可以在 PT 和 YT 之间互换吗？

可以。

#### 3. 为什么 YT 的做多收益 APY 为负？

做多收益 APY 为负是因为您支付的费用多于您获得的收益。但请注意，在 LRT 的情况下，YT 会获得积分，其价值未知（Pendle 将积分价值假设为 0）。由于 YT 的成本高于当前底层 APY 估算的收益应收款，因此做多收益 APY 显示为负值。

查阅[#做多收益-apy](../../optimizing-yields-with-pendle/chapter-5-important-concepts-in-yield-trading#long-yield-apy)了解更多关于做多收益 APY 的内容。

#### 4. 我必须持有到到期吗？

不需要。但请参阅[#风险](points-support-page#risks)，可能与您相关。

#### 5. 1 PT-weETH 在到期时赎回 1 weETH 还是 1 eETH？

1 PT-weETH 代表 1 eETH 的本金（与 ETH 1:1 挂钩）。因此到期时，1 PT-weETH 赎回 1 eETH，但以 weETH 形式给出（无论届时 weETH 和 eETH 的兑换率如何）。一种简单的理解方式是，**1 PT-LRT 在到期时可赎回 1 ETH**，以其收益代币形式给出（weETH、rsETH、ezETH 等）。

#### 6. 1 PT / YT 究竟代表什么？

不同资产可能有所不同，请参阅应用中的资产描述（价格图表上方）了解其确切表示。以下是使用 Ethena 的 sUSDe 的示例。

<figure><img src="/pendle-academy/imgs/image (123).png" alt="" width="375" /><figcaption></figcaption></figure>

### 风险

#### 1. 有哪些风险？

**任何 DeFi 协议都存在智能合约风险。**

**YT**：获得的积分和收益价值可能无法抵消您购买 YT 所支付的成本。

**PT**：持有到到期没有价格风险，您将能够赎回完整的底层资产。到期前退出可能使您面临价格风险（即 YT 和 PT 的隐含收益波动，可能导致退出时价值有所不同）。然而，您仍然面临底层价格风险，即底层资产脱锚、价格极端波动等。

**LP**：持有到到期没有价格风险，您将能够赎回完整的底层资产。到期前退出可能使您面临价格风险（即 YT 和 PT 的隐含收益波动，可能导致退出时价值有所不同）。然而，您仍然面临底层价格风险，即底层资产脱锚、价格极端波动等。

#### 2. 如果 EigenLayer（或 LRT 项目）停止分配积分会怎样？

Pendle 仍然正常运作。简而言之，Pendle 将积分和收益流向 YT 持有者。如果底层项目停止分配积分，YT 持有者（和 LP）也将停止赚取积分。

在理性市场中，我们预期：

* YT 的价值将下降，因为它现在价值较低（不再有积分可获取）。
* PT 的价值将上涨，因为 YT 的价值下降（注意 PT+YT = 底层资产）

#### 3. 积分是否保证会转化为空投？

不保证。这取决于底层协议决定将积分用于什么。Pendle 只是管理您积分敞口的工具。

***

### 余额下降

#### 1. 我的 YT 余额下降了，这是怎么回事？

这意味着 YT 的价格下跌了。有关风险列表，请参阅[#id-1.-有哪些风险](points-support-page#id-1.-what-are-the-risks)。

YT 的价格根据市场估值波动。YT 的价值来自其收益和积分应收款。如果市场认为其未来收益和积分的价值超过 YT 的交易价格，YT 应会出现需求，推动价格上涨，反之亦然。

也就是说，YT 价格在到期时自然降至零，同时从底层 LRT 中赚取收益和积分。由于积分的美元价值未知，Pendle 假设为 0，因此您的 YT 盈亏在 Pendle 仪表板中会显示为深度亏损。在[#id-3.-为什么-yt-的做多收益-apy-为负](points-support-page#id-3.-why-does-yt-have-a-negative-long-yield-apy)中了解更多。

#### 2. 我的 PT 余额下降了，这是怎么回事？

这意味着 PT 的价格下跌了。有关风险列表，请参阅[#id-1.-有哪些风险](points-support-page#id-1.-what-are-the-risks)。

PT 的价格根据市场估值波动。**然而，到期时 PT 将值其有保证的价值**。这意味着随着时间推移，每个 PT 将向该价值升值，中间有一些波动。PT 的价格上涨在到期时是有保证的，除了任何智能合约风险。

#### 3. 我的 LP 余额下降了，这是怎么回事？

首先，请做好自己的研究，您应该了解自己在为什么提供流动性。在[第 7 章](../../yield-trading-deep-dives/chapter-7-providing-liquidity-while-trading-yield.md)中了解更多关于流动性提供的内容。

简而言之，流动性提供是以 SY 和 PT 进行的。（例如 SY-eETH 和 PT-eETH，其中 SY 只是收益资产的包装版本，以与 Pendle 兼容）。LP 的价值可能因无常损失（IL）而暂时下降，但到期时不会有 IL。原因如下？

如果 PT 的价值下降，LP 的余额也会随之下降，因为它部分由 PT 组成。但请注意，PT 的最终价值是已知的，因为它是固定收益头寸（在[这里](points-support-page#yt-pt-lp)和[这里](../../cheatsheet-for-the-impatient/pt-yt-lp-cheatsheet)了解 PT 是什么）。这意味着**到期时，Pendle 上的 LP 不会有 IL**。短期内会有波动，但足够长的时间框架应该会产生净正头寸。

***

### 积分相关

#### 1. 在哪里可以查看我的积分？我如何知道积分在累积？

您可以在各自协议的仪表板上追踪您的 EigenLayer 和原生协议积分。

新池启动后，相关团队可能需要一段时间来构建仪表板。请耐心等待，您的积分正在累积，只是目前尚未显示在仪表板中。

任何争议都应在相关协议的渠道中进行。Pendle 只是一个交易收益（和积分）的协议。积分追踪最终由底层协议决定。

#### 3. Pendle 如何为 YT 实现积分杠杆？

请注意 Pendle 不提供也不产生额外积分来实现 YT 的杠杆。Pendle 只是将积分从底层流向 YT 持有者。要了解更多，请查阅[这里](./)和[这里](../../yield-trading-deep-dives/chapter-8-long-yield-obtain-leveraged-yield-exposure)。

#### 4. 积分多久累积一次？

因协议而异，请 1 天后再查看。

对于较新的市场，相关团队可能需要一段时间来构建仪表板。请耐心等待，您的积分正在累积，只是目前尚未显示在仪表板中。

#### 5. 我的积分没有显示，我该怎么办？

如果您购买了 PT，您不会获得积分。

如果您购买了 YT 或提供了流动性，您正在赚取积分。请等一段时间让相关仪表板显示。对于较新的市场，相关团队可能需要一段时间来构建仪表板。请耐心等待。

#### 6. 我在 Arbitrum 上的 Pendle 存入 LRT 时，会赚取 Eigenlayer 积分吗？

是的。但这取决于底层协议继续在 Arbitrum 上流式分发奖励和积分。

***

### **保留 YT 模式** - LP

#### 1. 开启保留 YT 模式与关闭相比有什么区别？

了解更多关于流动性提供的工作原理：[https://docs.pendle.finance/AppGuide/Trade/Guides/Pool](https://docs.pendle.finance/AppGuide/Trade/Guides/Pool)

不使用保留 YT 模式，您以 100% 的资本提供流动性。LP 由 PT 和底层资产（包装在 [SY](https://docs.pendle.finance/ProtocolMechanics/YieldTokenization/SY) 中）组成。请注意，PT 不赚取积分。

开启保留 YT 模式后，Pendle 在您的 LP 过程中保留您的 YT 敞口。（即 YT 不被出售换取额外 LP -> 因此没有价格影响）。这会导致更少的收益，因为 LP 中的头寸更少（因为一些资金保留在 YT 中）。在此过程中保留的 YT 数量等于 LP 头寸中 PT 的数量。**这意味着保留 YT 模式在赚取交换费和 Pendle 激励收益的同时，保留了您的大部分积分敞口。** 请注意，PT 的固定收益在到期时被 YT 的价格衰减所抵消。

#### 2. 我忘记在提供流动性时开启保留 YT 模式，如何恢复完整的积分敞口？

参见常见问题 #4，如果您没有开启保留 YT 模式，您的 YT 被出售换取了更多 LP。在这种情况下，获回积分敞口的最有效方式是**购买更多 YT**。

您可以购买等量于您 LP 头寸中 PT 数量的 YT。

您可以在池页面找到 LP 构成（eETH 示例：[https://app.pendle.finance/trade/pools/0xf32e58f92e60f4b0a37a69b95d642a471365eae8/zap/in?chain=ethereum](https://app.pendle.finance/trade/pools/0xf32e58f92e60f4b0a37a69b95d642a471365eae8/zap/in?chain=ethereum)）

<figure><img src="/pendle-academy/imgs/image (122).png" alt="" width="375" /><figcaption></figcaption></figure>

通过简单的数学计算，您可以计算出 LP 持仓中 PT 的数量，并购买等量的 YT 以恢复完整的积分敞口。

#### 3. 这一切太复杂了！在哪里可以了解更多？

查阅[第 7 章](../../yield-trading-deep-dives/chapter-7-providing-liquidity-while-trading-yield.md)了解您所需要的关于流动性提供的一切。

***

### Arbitrum 上的 LRT

#### 1. 如何将 LRT 桥接至 Arbitrum？

<Hint style="danger">
仅使用各自资产的专用桥接
</Hint>

**桥接 weETH：** 使用 Arbitrum 的原生桥接（[https://bridge.arbitrum.io/](https://bridge.arbitrum.io/)）将 weETH 从以太坊桥接至 Arbitrum。\
_仅桥接 weETH，而非 eETH。在 [https://app.ether.fi/eeth/wrap](https://app.ether.fi/eeth/wrap) 将您的 eETH 包装为 weETH_

**桥接 rsETH：** 使用由 LayerZero 提供支持的 Kelp 桥接（[https://bridge.kelpdao.xyz/](https://bridge.kelpdao.xyz/)）将 rsETH 从以太坊桥接至 Arbitrum。\
_如果您使用了原生 Arbitrum 桥接，则需要桥接回以太坊，这需要 7 天时间。_

桥接 ezETH：使用 connext（[https://bridge.connext.network/EZETH-from-ethereum-to-arbitrum?symbol=ezETH](https://bridge.connext.network/EZETH-from-ethereum-to-arbitrum?symbol=ezETH)）将 ezETH 从以太坊桥接至 Arbitrum。\
_如果您使用了原生 Arbitrum 桥接，则需要桥接回以太坊，这需要 7 天时间。_

#### 2. 我在 Arbitrum 上赚取 EigenLayer 积分吗？

是的。如果底层 LRT 在以太坊上提供积分，在 Arbitrum 上的行为相同。

***

### 有上限的资产

#### 1. 如果 Pendle 上的资产达到上限会怎样？

您将无法使用 Pendle 外部的资产购买 YT/PT/LP。您仍然可以将 YT/PT/LP 头寸退出至其他资产，但如果您退出后上限已被填满，将无法重新进入。

#### 2. 为什么 Pendle 上的某些资产有上限？

上限由底层协议强制执行。

***

### 其他

#### 1. 我需要质押任何东西吗？

不需要。如果您持有 YT、PT 或提供了流动性，您将无需质押任何东西即可获得资产给予的收益。

#### 2. 我的问题没有在这里得到解答，我该怎么办？

使用 Pendle Discord 的搜索功能。您的问题很可能之前已被问过并得到解答。如果没有，我们欢迎来自新角度的问题！

#### 3. Ether.fi / Renzo 是否受到 EigenLayer 上限的影响？

不受影响，ezETH 和 eETH 是原生再质押的，没有上限。
