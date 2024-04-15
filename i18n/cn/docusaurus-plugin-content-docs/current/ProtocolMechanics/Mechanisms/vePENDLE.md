---
hide_table_of_contents: true
---

# vePENDLE

Pendle 的治理依赖于锁定投票的 PENDLE，也称为 vePENDLE，它可以实现更高程度的去中心化。通过利用 vePENDLE，PENDLE 持有者可以获得一系列增加代币效用的功能。

vePENDLE 还作为一个额外的“池”，用于减少 PENDLE 代币的供应，从而增加代币的稳定性和协议的整体韧性。这样，vePENDLE 成为维护 Pendle 生态系统的长期健康和成功的重要工具。

持有 vePENDLE 可以使您享有以下权益：

1. 投票将 $PENDLE 激励注入到池中
2. 投票以获得投票人 APY（所投票池的 80% 交易费）
3. 获得基本 APY
4. 提升 LP 奖励（最高可达 250%）

## 获取 vePENDLE

锁定 PENDLE 并获得 vePENDLE。您的 vePENDLE 价值与抵押数量和抵押期限成正比（最多为 2 年）。教程[在此](./Guides/Lock.md)。每个钱包都与单个 vePENDLE 过期日期关联。

您的 vePENDLE 价值会随着时间而减少，一旦锁定期结束，将降至零。然后您的抵押 PENDLE 将解锁。

![vePENDLE Value Over Time](/img/ProtocolMechanics/vependle_value.jpg "vePENDLE Value Over Time")

要增加您的 vePENDLE 价值，您可以选择延长抵押期限和/或增加抵押数量。

## 激励引导

vePENDLE 推动了 Pendle 上的激励引导机制。vePENDLE 持有者投票并指导奖励流向不同的池，从而有效地激励所投票池中的流动性。

直观地说，您的 vePENDLE 价值越高，您就可以获得的激励越多。

每个周期开始时（每周四，00:00 UTC），将对所有投票进行快照，每个池的激励率将相应调整。

![Epoch Snapshots](/img/ProtocolMechanics/epoch_snapshots.jpg "Epoch Snapshots")

为池投票还使 vePENDLE 持有者有资格获得所投票池收取的交易费的 80%，按比例分配给池的所有投票者。

## 费用和奖励

Pendle 从所有 YT 收集到的收益中收取 3% 的费用。目前，这笔费用的 100% 分配给 vePENDLE 持有者，而协议则不收取任何收入。这可能会在未来发生变化。

未兑现 PT 的成熟 SY 部分的收益也将按比例分配给 vePENDLE 持有者。

例如，成熟的 PT-aUSDC 等同于 aUSDC。如果未兑现，其所有收益将转换为稳定币，并由协议收取为协议收入，然后分配给 vePENDLE 持有者。

所有这些奖励将转换为 ETH，无论您的 vePENDLE 存放在何处，并定期通过分配合约进行分发。

## vePENDLE APY

从 YT 和成熟 PT 收集的利息构成了 vePENDLE _基本 APY_。

![vePENDLE Voter APYs](/img/ProtocolMechanics/vependle_voter_apys.png "vePENDLE Voter APYs")

此外，vePENDLE 投票人还有权获得所投票池的 80% 交易费，构成 _投票人 APY_。

_Base APY + 投票人 APY_ 决定了您将获得的总奖励。

_Base APY + 最高可能的投票人 APY_ 是您可以从 vePENDLE 获得的最高奖励量（即 vePENDLE 最大 APY）。

![vePENDLE Base/Max APYs](/img/ProtocolMechanics/vependle_base_max_apys.png "vePENDLE Base/Max APYs")

有关 vePENDLE 的更多信息和统计数据，请访问我们的应用内[社区仪表板](https://app.pendle.finance/vependle/stats)。

## LP 奖励提升

如果您持有 vePENDLE 并在某个池中提供流动性，那么您所有 LP 的 PENDLE 激励和奖励都将进一步提升，最高可达 250%，这取决于您的 vePENDLE 价值。要获得最大提升，您必须拥有与池中 LP 持有百分比等同的 vePENDLE 供应百分比。

![Boost received against vePendle](/img/ProtocolMechanics/vependle_boost.jpg "Boost received against vePendle")

尽管您的 vePENDLE 价值会随时间而减少，但您的 LP 提升率是在首次应用提升时计算的。提升率将保持恒定，直到您更新 LP 位置为止，在这种情况下，率将根据您当前的 vePENDLE 价值而变化。

要获得提升的奖励，您应首先将您的 PENDLE 锁定为 vePENDLE，然后再提供 LP。

如果您已经提供了 LP 并想使用 vePENDLE 提升您的奖励，您必须在为该池投票后手动[手动套用加速](./Guides/ApplyBoost.md)。

对于跨链奖励提升（例如，在 Arbitrum 上提升 LP 位置），您需要先从以太坊同步您的 vePENDLE 余额，然后才能应用提升。

![vePENDLE Cross-chain Reward Boosts](/img/ProtocolMechanics/vependle_crosschain.png "vePENDLE Cross-chain Reward Boosts")
