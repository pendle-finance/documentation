---
hide_table_of_contents: true
---

# 常见问题解答

## 一般

### 什么是到期日？

每个PT和YT都有一个到期日。如您持有 PT，您可以在到期日之后赎回全部底层生息代币。至于YT，底层生息代币的收益仅在到期日之前累积和派发，到期日之后YT将不再有价值。

### 简易UI界面和专业UI界面之间有什么区别？

简易UI界面和专业UI界面运行在同一组合约上，并使用相同的代币。

简易ui将Pendle包装成两个主要功能。大多数用户都能理解并使用。

专业UI提供了Pendle的全部功能套件，允许用户通过购买和出售PT和YT来进行收益率交易。

您可以通过在应用程序的右上角切换UI来在这两种模式之间切换。

![Simple Toggle](/img/faq/simple_toggle.png "Simple Toggle")
![Pro Toggle](/img/faq/pro_toggle.png "Pro Toggle")

### 什么是epoch？

在Pendle，一个epoch正好是一周。每个epoch都从周四00:00 UTC开始并结束。

每个epoch都会进行vePENDLE投票的快照，非收益奖励（例如$CRV，$CVX代币）也会在每个epoch分发。

### 为什么Pendle上显示的底层APY与底层协议中显示的APY不同？

Pendle上显示的底层APY（Underlying APY）是在过去7天的智能合约层面上实际累积收益的7天移动平均数。

## 提供流动性

### 提供流动性可以获得什么回报？

* 由流动性池产生的交易费用
* PENDLE 奖励
* 由底层资产发行的协议奖励（例如 $COMP，$AAVE）

### 我必须抵押我的 LP 代币才能获得奖励吗？

不必, LP代币持有人都可获得奖励

## vePENDLE

### 什么是 vePENDLE？

vePENDLE 是 Pendle 的治理系统。

### vePENDLE 如何运作？

锁定 PENDLE 以获得 vePENDLE。锁定期限越长，您的 vePENDLE ‘数量’好像更合适越大。您的 vePENDLE 数值会随时间衰减，但您可以延长锁定期限以抵消衰减。

我们使用 vePENDLE 来控制 PENDLE 代币奖励。投票支持您想要激励流动性的池子。您拥有的 vePENDLE 越多，您持有的投票权就越大。

您将可获得您所投票池子的 80% 交易费用。界面所显示的「投票人APY」正是这个交易费收入的年化收益率（投票前收益）。

vePENDLE 持有者还将获得一部分协议收益，这些收益来自交易费用和 YT 费用。

### 我的 PENDLE 何时解锁？

您可以将 PENDLE 锁定为 vePENDLE，锁定期最长为 2 年。一个钱包只有一个解锁日期。如果您延长锁定期限或锁定更多 PENDLE，则您的vePENDLE数量与vePENDLE解锁日期会更新。

### 以太坊和其他链之间有什么区别吗？

vePENDLE 只存在于以太坊区块链上，这意味着您只能在以太坊上锁定 PENDLE 和投票，但您仍可为其他链上的池子投票。因此通过投票，PENDLE奖励仍可引导到其他区块链上，但投票这一动作则只能在以太坊上进行。

## 安全性

### Pendle通过了审计吗？

Pendle的代码库已经由知名审计师进行了全面审计，所有漏洞都已得到解决。可以在此处阅读[审计报告](https://github.com/pendle-finance/pendle-core-v2-public/tree/main/audits)。尽管如此，我们建议用户谨慎行事，并谨慎部署资金。

### 使用本协议可能存在哪些风险？

由于Pendle与第三方协议和合约进行交互，因此与第三方协议部署的智能合约和系统相关的风险是仍有可能发生的。Pendle不对因第三方合约中的漏洞而丢失的资金负责。
