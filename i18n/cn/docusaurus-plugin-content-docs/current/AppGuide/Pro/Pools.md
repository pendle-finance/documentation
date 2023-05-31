---
hide_table_of_contents: true
---

# 流动性池

## 零价格影响 Zap 模式

!["Zero Price Impact Mode"](/img/AppGuide/zero-price-impact-mode.png "Zero Price Impact Mode")

在 Pendle 上，用户可以选择激活「**零价格影响**」模式，这样向 PT/SY 池提供流动性时，并不会产生价格影响。通常情况下，添加流动性时，一部分底层资产会被用于从 PT/SY 池购买 PT，剩余的则被包装为 SY。然而，购买 PT 可能会导致价格影响。

启用「**零价格影响**」模式后，底层资产将完全被包装为 SY，其中一部分用于铸造 PT 和 YT。然后将 PT 和剩余的 SY 用于提供流动性，YT 将返还回到用户的钱包。这消除了购买 PT 的步骤，从而避免了任何潜在的价格影响。

请注意，如果您的输入资产需要被交易转换为池子的底层代币，则仍然会造成价格影响。


## 提领奖励包

!["Redeem Rewards Bundle"](/img/AppGuide/redeem-rewards-bundle.png "Redeem Rewards Bundle")

在“Zap Out”页面，激活「提领全部池子奖励」选项 (Claim All Pool Rewards)，Pendle Pro用户可以退出流动性时一并在同一次交易中领取奖励，以省去燃料费用。
