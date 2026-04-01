import Hint from '@site/src/components/Hint';

# Pendle 生态竞争与"贿赂"

> 本页信息最后更新时间：2023-10-12

**"Pendle Wars（Pendle 生态竞争）"** 是指 Penpie、Equilibria 和 StakeDAO 等不同平台之间争夺 Pendle 生态系统影响力、积累 $PENDLE 代币和 Pendle 流动性的竞争。这些项目的目标是通过锁定更多 $PENDLE 来**积累** **vePENDLE**，从而提升其在 Pendle 上的收益并传递给用户。

### **什么是 vePENDLE？**

投票锁定 PENDLE（vePENDLE）是 PENDLE 代币的锁定版本。它赋予持有者：

* 分享 Pendle 上产生的协议收入，
* 提升 LP 头寸的收益（增益），以及
* 引导 $PENDLE 排放流向。

<Hint style="info">
💡 在文档中[了解更多关于 vePENDLE](https://docs.pendle.finance/ProtocolMechanics/Mechanisms/vePENDLE) 的内容。
</Hint>

然而，vePENDLE 不具有流动性，这意味着在锁定期到期前无法转让。这为其他平台创造了提供替代解决方案的机会，让用户无需锁定代币也能享受 vePENDLE 的好处。

## Pendle Wars 的主要参与者

* **Penpie** ([https://www.pendle.magpiexyz.io/](https://www.pendle.magpiexyz.io/))
* **Equilibria** ([https://equilibria.fi/](https://equilibria.fi/))
* **StakeDAO** ([https://lockers.stakedao.org/lockers/pendle](https://lockers.stakedao.org/lockers/pendle) 或 [https://beta.stakedao.org/lockers/pendle](https://beta.stakedao.org/lockers/pendle))

StakeDAO 仅在以太坊主网部署，而 Penpie 和 Equilibria 则在多条链上部署。

<Hint style="info">
💡 **免责声明：** 请注意，这些项目由外部方管理，_不是_ Pendle 团队的一部分，_也不_得到 Pendle 的官方背书。与往常一样，在与 DeFi 中的不同协议交互时，请**做好自己的研究**并**了解您的风险**。
</Hint>

### 这些平台为 Pendle 用户提供什么？

不同平台为 Pendle 用户提供各种好处，例如：

* 提高 Pendle LP 头寸的收益（**APR 增益**）
* 在不自行锁定 $PENDLE 的情况下获得对 Pendle Finance 的治理权和收入分享
  * 这些平台发行 vePENDLE 的液态包装版本（例如 $mPendle、$ePendle、$sdPendle），这些代币也在_其_平台上分享收入
  * 这些平台还发行自己的治理代币，可以锁定以分享 Pendle 的治理权和收入
* 通过投票引导奖励流向不同的 Pendle 池来赚取**"贿赂"**
  * 用户通常需要获得_其_治理代币的投票锁定版本，才能投票并赚取"贿赂"
* 访问其他独特功能和特定平台的好处（如有）

### Pendle Wars 统计数据

关于 Pendle Wars 有一些有趣的信息，例如：

1. vePENDLE 在不同平台之间的当前分布
2. 液态包装代币的当前和历史挂钩情况（即液态包装代币与普通 $PENDLE 的兑换率）
3. 不同平台治理代币的投票锁定百分比

以下是一些社区创建的 Pendle Wars 统计数据/可视化工具：

1. DefiWars ([https://www.defiwars.xyz/wars/pendle](https://www.defiwars.xyz/wars/pendle))
2. Dune Analytics ([https://dune.com/coumarin/pendle-war](https://dune.com/coumarin/pendle-war))

***

## 什么是"贿赂"？

在 DeFi 协议治理的背景下，投票中的"贿赂"是指向治理代币持有者提供的、以换取其投票的奖励。这些奖励可以是代币、费用或其他旨在影响投票结果的激励措施。

尽管通常称为"贿赂"，但重要的是要注意，这些奖励可以被视为激励参与和促进治理的合法方式。

对于 Pendle，**"贿赂"是指向 vePENDLE 投票者提供的、以换取其在 Pendle 计量器投票系统中投票的奖励**。计量器投票系统用于引导奖励流向不同的 Pendle 池。通过参与投票，vePENDLE 持有者可以获得在 Pendle 上拥有流动性池的其他项目提供的奖励。

### 如何赚取"贿赂"？

目前，"贿赂"通常提供给 Penpie 和 Equilibria 控制的 vePENDLE，因此获得"贿赂"只能通过 Penpie 和 Equilibria 的贿赂市场。但如果项目愿意直接向其他 vePENDLE 持有者提供"贿赂"，这种情况将来可能会改变。

要访问 Penpie 和 Equilibria 的贿赂市场，您需要持有他们的投票锁定（vl-）代币，即 vlPNP 或 vlEQB。这些 vl 代币给予其持有者投票权和协议收入。

以下是针对 Pendle 计量器投票系统的**活跃贿赂市场**：

* Penpie 的贿赂市场：[https://www.pendle.magpiexyz.io/bribe](https://www.pendle.magpiexyz.io/bribe)
* Equilibria 的贿赂市场：[https://equilibria.fi/vote](https://equilibria.fi/vote) 和 [https://hiddenhand.finance/equilibria](https://hiddenhand.finance/equilibria)

请参阅每个项目的文档，了解各自的投票锁定代币和贿赂市场运作方式。

### 为什么项目要提供"贿赂"？

这些 vl 代币背后的 TVL 通常远小于这些协议实际控制的 vePENDLE 价值。这为这些 vl 代币所控制的投票权创造了杠杆效应。因此，相对少量的"贿赂"就足以引导大量投票流向目标池，从而显著增加流向该池的 $PENDLE 激励。

因此，对于其他项目来说，贿赂投票者比直接向 LP 池排放代币奖励更具资本效率。根据 Pendle Intern 的推文（[https://x.com/PendleIntern/status/1706240227776606528?s=20](https://x.com/PendleIntern/status/1706240227776606528?s=20)），基于 2023 年 9 月 25 日的研究，效率高达每 1 美元贿赂对应 400 至 2300 美元的 $PENDLE 投票。

<figure><img src="/pendle-academy/imgs/image (26).png" alt="" /><figcaption><p>截至 2023 年 9 月 25 日，Equilibria 贿赂市场上的贿赂效率</p></figcaption></figure>

<figure><img src="/pendle-academy/imgs/image (27).png" alt="" /><figcaption><p>截至 2023 年 9 月 25 日，Penpie 贿赂市场上的贿赂效率</p></figcaption></figure>

### 总结

总而言之，"贿赂"是向 vePENDLE 持有者提供的、以换取其在计量器投票系统中投票的奖励。Equilibria 和 Penpie 提供不同的代币（vlEQB 和 vlPNP），这些代币赋予其持有者投票权和协议收入。在 Pendle Finance 上拥有流动性的协议非常愿意从这些平台购买投票权，因为它们可以获得更多流向其流动性的 PENDLE 排放。在参与计量器投票或贿赂市场的投票后，vePENDLE 持有者可以从 Pendle 获得投票奖励，还可以从其他协议获得潜在的贿赂奖励。
