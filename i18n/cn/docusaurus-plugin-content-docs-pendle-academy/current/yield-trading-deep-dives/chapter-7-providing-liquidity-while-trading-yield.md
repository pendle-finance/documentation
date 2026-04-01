import Hint from '@site/src/components/Hint';

# 第七章 - 在交易收益的同时提供流动性

> 课程级别：**#高级**

首先让我们看看 Pendle AMM 流动性池究竟由什么组成。

## Pendle 池构成

Pendle 池由 PT 和 SY 组成。以 stETH 为底层资产的例子来说，stETH 池（任何到期日）由两种代币组成：

* **PT**-stETH
* **SY**-stETH

**SY** 是底层资产的包装版本，为 Pendle 提供了一种与任何收益机制交互并将其拆分为 PT 和 YT 的标准方式。您可以将 SY 视为与底层收益资产相同的东西。

> 请注意池中没有 YT，因为 PT 和 YT 都通过同一个流动性池进行交易。这通过使用带有[闪电兑换](https://docs.pendle.finance/ProtocolMechanics/LiquidityEngines/AMM#flash-swaps)的伪 AMM 实现，这里不作详细介绍。

## 1. 一键操作提供流动性以做多 PT

**两全其美：通过 PT 流动性池赚取固定收益和交换费**

[持有 PT](chapter-7-providing-liquidity-while-trading-yield#2.-how-to-be-yield-neutral-with-zero-price-impact-mode) 可以获得不随市场条件变化的固定收益，这是一种仍能提供高回报的安全策略。

PT 也可以用于我们的流动性池以赚取额外收益。当您用 PT 和底层资产提供流动性（例如 PT-stETH + stETH）时，您可以赚取：

1. 池中的交换费
2. $PENDLE 激励
3. 原生收益
   1. 部分 PT 固定收益
   2. 部分底层收益

您可以随时从池中撤回 PT 并将其出售获利，或在到期后赎回底层资产。

### 如何操作

Pendle 通过 Zap 功能让您轻松进入这一策略。它会自动将您的输入代币转换为 PT 和底层资产，并将它们添加到池中。

要使用此策略，请按以下步骤操作：

1. 前往[池](https://app.pendle.finance/trade/pools)页面。
2. 选择您想要资产的池。
3. 存入底层资产的代币，或任何其他代币，并获得 LP 代币作为回报。

<Hint style="warning">
💡 您的 LP 头寸_**不**_**被锁定**，您可以**随时退出**，即使在到期日前。流动性提供的 APY 也与到期日无关。
</Hint>

### **这个策略同时也是做空收益头寸？**

正如我们在[第六章 - 做空收益](chapter-6-shorting-yield.md)中解释的，用 PT 提供流动性意味着您对底层收益略有看跌倾向，即在做空收益。换言之，这个策略给您提供了**一定的对冲，以防底层资产收益率下降**。

如果您想保持收益中性的 LP 头寸，可以阅读下一节。

## 2. **如何通过"保留 YT 模式"实现收益中性**

如果您想在不采取净做空收益头寸的情况下提供流动性，可以在 Zap 时使用"**保留 YT** 模式"选项。

回想一下，Pendle 流动性池由 PT 和底层资产组成。默认情况下，当您一键提供流动性时，一些底层资产用于从 PT/SY 池中购买 PT，其余则包装为 SY。然而，这种 PT 购买会影响价格和收益。

#### 什么是**"保留 YT 模式"？**

如果您启用此模式，底层资产将完全转换为 SY，其中一部分用于铸造 PT 和 YT。PT 和剩余的 SY 用于提供流动性，同时将 YT 保留在您的钱包中。这避免了在 Zap 时购买 PT，从而不会造成任何价格影响。

此选项适合中高级用户，因为您需要知道如何[管理您的 YT 头寸](../optimizing-yields-with-pendle/chapter-4-yield-trading-basics-with-yt)。

#### 收益中性

通过使用此选项，您用钱包中的 YT 平衡了 LP 头寸中 PT 的影响。这意味着您是收益中性的，而非做空收益。

#### **什么时候不使用"保留 YT"模式？**

在以下情况下，您可能不想使用此选项：

* 您不想管理 YT 头寸
  * 例如，在以太坊主网上，由于 gas 成本，维持小型 YT 头寸可能不划算
* 您认为 YT 价格过高（换言之，PT 过于便宜，您希望在池中持有更多 PT）

## 3. 如何将 LP 头寸用作收益交易的一部分

#### 在隐含 APY / 固定 APY 较高时 Zap 进入

将 LP 头寸用作收益交易一部分的一种方式是在隐含 APY 较高时入场，在较低时退出。

这类似于购买 PT，在隐含收益率较高时入场最为有利。当隐含 APY 较高时，意味着 PT 较便宜（相对于底层代币），由此产生的固定收益 APY 更高。

当隐含 APY 较低时，意味着 PT 较贵，您可以考虑提前退出 LP 头寸获利。您也可以持有 LP 头寸并继续赚取池的收益直到到期，之后 PT 可以 1:1 赎回底层资产。

#### **用 LP 做空收益**

回想一下，_做多 PT = 做空收益_。您可以通过在 YT 和 LP 之间 Zap，而不是在 YT 和 PT 之间，来快速切换多空收益头寸。

LP 头寸部分持有 PT，实现了"做空"收益的相同目标，同时在 PT 固定收益之上还可赚取额外收益（来自交换费、PENDLE 激励和 SY 奖励）。

#### **无无常损失（IL）顾虑**

在 Pendle 池中提供流动性时，您不需要担心无常损失（IL）。这是因为 Pendle 池只包含 PT 和底层资产，它们高度相关且以同一资产计价，因此它们的价格比率不会大幅波动。这意味着到期前 IL 极小。由于 PT 在到期时以 1:1 可赎回，**到期时的 IL 也保证为零或没有**。

<Hint style="success">
查看下面的研究，了解 Pendle LP 历史上如何良好地抵御无常损失。

* **Pendle LP 表现研究 -** [**第一部分**](https://medium.com/pendle/evaluating-performance-of-pendle-liquidity-pools-part-1-f81e6957837d)
  * Pendle 上的 LP 与不含收益的底层资产（例如 ETH）持有对比
    * 在所有研究的案例中，LP 优于持有底层资产（例如 ETH），即使不包括 PENDLE 激励
    * 在所有研究的案例中均未观察到 IL
    * 在 Pendle 上 LP 的时间越长，超额收益越大
* **Pendle LP 表现研究 -** [**第二部分**](https://medium.com/pendle/evaluating-performance-of-pendle-liquidity-pools-part-2-3d085872a603)
  * Pendle 上的 LP 与在底层池中存款（例如 stETH）对比
    * 即使不包括 PENDLE 激励，LP 通常也优于非 Pendle 用户
    * 在最差情况下，IL 仅为 0.85%
    * 包括 PENDLE 激励后，stETH 和 gDAI 池中没有 IL
    * 使用**保留 YT**模式与不使用的 LP 表现取决于池的底层 APY 和隐含 APY。无论如何，Pendle LP 通常仍优于非 Pendle 用户。
</Hint>

<Hint style="info">
💡 **用计算器估算利润**

在"批准"或"Zap 进入"按钮旁找到计算器图标。计算器让您估算买入 PT 或买入 YT 等策略的潜在利润，并与单纯持有原始资产进行比较。

<img src="/pendle-academy/imgs/image (41).png" alt="" data-size="original" />
</Hint>
