---
hide_table_of_contents: true
---

# 流动性池

在[这页面](https://app.pendle.finance/pro/pools)提供Pendle 池子的流动性 (LP)。您可查看不同池子的**到期日**、池内流动性的**总金额**、及提供流动性的现行**收益率**。Base APY为基础收益率，视乎您持有的vePENDLE数量，可以对APY进行一定程度的加速(Boost)。

流动性提供者从多个渠道获得回报：

* 来自池中 PT 的固定利率收益
* 底层代币的协议奖励
* 交易费用
* PENDLE 激励

## 教程

1. 转到[流动性池](https://app.pendle.finance/pro/pools)页面
2. 选择您想要LP的池子
3. 选择输入 “Zap” 的资产
4. 键入您希望提供的流动性代币数量
5. （进阶）通过点击网页最右上角的齿轮图标，控制您的滑点容忍度
6. 批准交易并完成 “Zap” 存款！

### 零价格影响 Zap

在 Pendle 上，用户可以选择激活「**零价格影响**」模式，这样向 PT/SY 池提供流动性时，并不会产生价格影响。通常情况下，添加流动性时，一部分底层资产会被用于从 PT/SY 池购买 PT，剩余的则被包装为 SY。然而，购买 PT 可能会导致价格影响。

启用「**零价格影响**」模式后，底层资产将完全被包装为 SY，其中一部分用于铸造 PT 和 YT。然后将 PT 和剩余的 SY 用于提供流动性，YT 将返还回到用户的钱包。这消除了购买 PT 的步骤，从而避免了任何潜在的价格影响。

## 零价格影响 Zap 模式

!["Zero Price Impact Mode"](/img/AppGuide/zero-price-impact-mode.png "Zero Price Impact Mode")

在 Pendle 上，用户可以选择激活「**零价格影响**」模式，这样向 PT/SY 池提供流动性时，并不会产生价格影响。通常情况下，添加流动性时，一部分底层资产会被用于从 PT/SY 池购买 PT，剩余的则被包装为 SY。然而，购买 PT 可能会导致价格影响。

启用「**零价格影响**」模式后，底层资产将完全被包装为 SY，其中一部分用于铸造 PT 和 YT。然后将 PT 和剩余的 SY 用于提供流动性，YT 将返还回到用户的钱包。这消除了购买 PT 的步骤，从而避免了任何潜在的价格影响。

请注意，如果您的输入资产需要被交易转换为池子的底层代币，则仍然会造成价格影响。

## 提领奖励包

!["Redeem Rewards Bundle"](/img/AppGuide/redeem-rewards-bundle.png "Redeem Rewards Bundle")

在“Zap Out”页面，激活「提领全部池子奖励」选项 (Claim All Pool Rewards)，「Pendle 交易」用户可以退出流动性时一并在同一次交易中领取奖励，以省去燃料费用。