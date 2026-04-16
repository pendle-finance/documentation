---
pagination_label: "PT"
title: "PT"
hide_table_of_contents: true
---

# PT

<iframe width="860" height="615" src="https://www.youtube.com/embed/kOErP_ZUncs" title="Chapter 4: What is Principle Token (PT)" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

本金代币（PT）代表底层生息资产的本金部分——本质上是底层资产的零息债券 (zero-coupon bond)。到期时，PT 可按 1:1 的比例兑换为会计资产，会计资产显示在每个 PT 名称末尾的括号中，即底层协议（如 Lido、Renzo、Aave）中实际部署的基础资产（例如 stETH 中的 stETH、ezETH 中的 ETH、aUSDC 中的 USDC）。

![PT Mechanics](/pendle-docs/imgs/ProtocolMechanics/pt-mechanics.png "PT Mechanics")

由于收益部分已被分离，PT 可以相对其会计资产以折价获得。在无交易的情况下，PT 的价值会随时间推移逐渐趋近并最终在到期时等于会计资产的价值。

这种价值升值正是其固定收益 APY 的来源。

:::info 核心特性
- **无可变收益或积分：** PT 持有者放弃底层资产产生的所有可变收益和积分——这些全部重新分配给 YT 持有者。
- **用作抵押品：** 由于 PT 在到期时具有可预测的价值，能有效降低清算风险，越来越多的货币市场（如 Morpho、Silo、Euler）将其作为抵押品接受。集成详情请参阅 [PT as Collateral](../../Developers/Oracles/PTAsCollateral)。
:::

# 兑换价值

一般而言，生息资产可大致分为以下两类：

1. Rebasing 资产——随着收益累积，代币数量随时间增加

   *示例：stETH、aUSDC*

2. 生息资产——随着收益累积，代币价值随时间增加

   *示例：ezETH、wstETH*

![Redemption Value](/pendle-docs/imgs/ProtocolMechanics/redemption-value.png "Redemption Value")

对于增值型资产，需特别注意：PT 按 1:1 兑换的是**会计资产**，而非**底层资产**。

例如，Renzo ezETH 的价值会随着质押和再质押奖励的累积而相对 ETH 不断升高。每持有 1 个 PT-ezETH，到期时可兑换价值 1 个 ETH 的 ezETH，而**不是**价值更高的 1 个 ezETH。

可通过市场名称括号中的资产来识别会计资产（例如 PT-ezETH (ETH) 表示 1 个 PT 兑换 1 个 ETH 价值的 ezETH）。

也可在 [Pendle App](https://app.pendle.finance/trade/markets) 各资产页面上核实 PT 的兑换价值。

# 如何兑换 PT

到期后兑换 PT 的步骤：

1. 访问 [Pendle Markets](https://app.pendle.finance/trade/markets) 并进入仪表板（Dashboard）。
2. 选择要兑换的仓位。
3. 选择输出资产，Pendle 将自动为你完成「兑换 → 兑换（如需）」的全流程。
