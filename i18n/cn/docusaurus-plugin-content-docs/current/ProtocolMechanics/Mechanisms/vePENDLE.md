---
hide_table_of_contents: true
---

# vePENDLE

Pendle的治理依赖于投票锁定（vote-escrowed）的PENDLE，也称为vePENDLE，以实现更高的去中心化程度。通过利用vePENDLE，PENDLE持有人可以获得一系列的赋能。

vePENDLE也减少了PENDLE代币的供应，从而增加代币的稳定性和协议的整体强度。因此，vePENDLE对于维护Pendle生态系统的长期健康和成功是一个重要的工具。

## 获取vePENDLE

锁定PENDLE即可获得vePENDLE。您的vePENDLE价值与锁定时间和数量成正比（最长锁定时间为2年）。在[此处](./Guides/Lock)可以找到教程。每个钱包只能绑定一个vePENDLE的到期日。

随着时间的推移，您的vePENDLE数值会逐渐降低，并且一旦锁定时间结束，您锁定的PENDLE将被解锁。

![vePENDLE Value Over Time](/img/ProtocolMechanics/vependle_value.jpg "vePENDLE Value Over Time")

要增加您的vePENDLE数值，您可以选择延长锁定时间，与及／或者 增加锁仓的PENDLE数量。

## 引导激励

vePENDLE同时驱动Pendle上的激励引导机制。vePENDLE持有人可以投票并引导增发奖励分派到不同的池子，从而有效地激励不同的流动性池。

直观地说，您的vePENDLE价值越高，您就有权引导得更多的激励。

在每个epoch的开始，即每个星期四00:00 UTC，将进行投票结果的快照，随后将相应地调整每个池的激励分派比率。

![Epoch Snapshots](/img/ProtocolMechanics/epoch_snapshots.jpg "Epoch Snapshots")

投票的vePENDLE持有人，还有权获得该池子80％的交易徵费（与该池子的所有投票者间按比例分配）。

## 费用和奖励

Pendle从YT产生的所有收益中收取3％的费用。目前，该费用的100％分配给vePENDLE持有者，而协议不收集任何收入。这可能会在未来发生变化。

已到期(matured)但尚未被持有人兑现领回(redeem)的PT的部分收益，也将按比例分配给vePENDLE持有者。

例如，已到期的PT-aUSDC相当于aUSDC无异。如果持有人不进行兑现，其所有收益将被转换为稳定币并由协议收集作为协议收入，并分配给vePENDLE持有者。

无论您的vePENDLE存储在何处，所有这些奖励将被转换为ETH，并由一个分配合约定期分配。

## vePENDLE APY

从YT中收集的利息抽成，加上已到期PT的奖励，构成了vePENDLE的 “Base APY”（基本APY）。

![vePENDLE Voter APYs](/img/ProtocolMechanics/vependle_voter_apys.png "vePENDLE Voter APYs")

除此之外，vePENDLE投票者还有权获得被投票池子80％的交易费，这构成了 “Voter’s APY”（投票者APY）。

_Base APY + Voter's APY_ － 就是您将收到的总收益奖励。

_Base APY + 「最高可能的Voter's APY」_－ 就是您可以从vePENDLE获得的最高收益奖励（即vePENDLE “Max APY”）。


![vePENDLE Base/Max APYs](/img/ProtocolMechanics/vependle_base_max_apys.png "vePENDLE Base/Max APYs")

有关vePENDLE的更多信息和统计信息，请访问我们的应用程序[社区仪表板](https://app.pendle.finance/vependle/stats)。

## LP奖励加速 (Boost)

如果您在持有vePENDLE的情况下，在LP池中提供流动性，则您的所有LP的PENDLE激励和底层分派的奖励，都将进一步提高，最高可提高250％，具体取决于您的vePENDLE价值。

![Boost received against vePendle](/img/ProtocolMechanics/vependle_boost.jpg "Boost received against vePendle")

尽管您的vePENDLE价值会随时间衰减，但您的LP加速率(Boost)是按首次套用加速时计算的。加速率将保持不变，直到您更新您的LP持仓，届时加速率将根据您当前的vePENDLE价值而改变。

您应该先将PENDLE锁定到vePENDLE中，然后再提供流动性，以获得加速奖励(Boost)。

如果您已经提供了流动性，并希望使用vePENDLE提高您的奖励，您需要[手动套用加速](./Guides/ApplyBoost)。

对于跨链奖励加速（例如，在Arbitrum上加速LP持仓），您需要首先从以太坊同步您的vePENDLE余额，然后才能套用加速。

![vePENDLE Cross-chain Reward Boosts](/img/ProtocolMechanics/vependle_crosschain.png "vePENDLE Cross-chain Reward Boosts")
