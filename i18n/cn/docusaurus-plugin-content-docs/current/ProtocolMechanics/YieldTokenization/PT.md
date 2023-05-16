---
hide_table_of_contents: true
---

# PT

本金代币 （Principal Token／PT）代表底层生息资产中的本金部分。持有PT代表你握有本金的拥有权。在到期日及以后，PT可以以 1：1 的比例兑换领回底层资产（例如，1 PT-stETH可以兑换为价值1 ETH的stETH）。

![PT Mechanics](/img/ProtocolMechanics/pt-mechanics.png "PT Mechanics")

由于其收益组成部分的已被分离，故PT可按一定折扣（与底层资产相比）的价格购买。即使二手市场没有任何交投活动，PT的价值将随时间推移趋近于、并最终在到期日（当赎回时）与底层资产的价值互相匹配。

因为我们可以确定PT的最终价值（相对于底层资产），是故我们也能确定买入PT的「固定收益率APY」。

例如：1 PT-stETH终将可以兑换为1 ETH（以stETH计价）。

此外，PT还是所有Pendle AMM池的核心组成部分。您可以在[这里](../AMM.md)了解有关Pendle AMM的更多信息。
