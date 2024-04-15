---
hide_table_of_contents: true
---

# PT

主要代币（PT）代表底层产生收益资产的本金部分。到期时，PT 可以以 1:1 的比例兑换为会计资产。 这是部署在底层协议中的基础、本金资产，例如 Lido、Renzo 和 Aave（例如 stETH 中的 ETH、ezETH 中的 ETH、aUSDC 中的 USDC）。

![PT Mechanics](/img/ProtocolMechanics/pt-mechanics.png "PT Mechanics")

由于其收益组成部分的总价值已分离，PT 可以以相对于其会计资产的折扣价值获得。假设没有交换，当兑换功能启用时，PT 的价值将逐渐接近并最终与到期时的会计资产的价值相匹配。

这种价值增值是建立其固定收益 APY 的基础。

# 兑换价值

一般来说，产生收益资产可以大致分类为：
1. 重新基准资产 - 随着时间的推移而增加数量/数量的代币

*示例：stETH、aUSDC*
2. 带奖励的资产 - 随着时间的推移而增值的代币

*示例：ezETH、wstETH*

![Redemption Value](/img/ProtocolMechanics/redemption-value.png "Redemption Value")

对于带奖励的资产，特别需要注意的是，PT 可以以 1:1 的比例兑换为会计资产，*而不是底层资产。

例如，Renzo 的 ezETH 的价值随着时间的推移相对于 ETH 增加，因为累积了质押和重新质押奖励。每拥有 1 个 PT-ezETH，您将能够在到期时兑换价值为 1 ETH 的 ezETH，*而不是具有更高价值的 1 ezETH**。

您可以在[Pendle Trade](https://app.pendle.finance/trade/markets)的个别资产页面上再次检查 PT 的兑换价值。

# 如何兑换 PT

在到期时兑换您的 PT：
1. 访问[Pendle Trade Markets](https://app.pendle.finance/trade/markets)，切换到“Inactive”市场页面
2. 选择一个市场
3. 选择一个输出资产。Pendle 将自动为您执行兑换 > 交换（如果需要）
