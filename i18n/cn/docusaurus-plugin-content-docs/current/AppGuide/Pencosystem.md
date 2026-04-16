---
pagination_label: "Pencosystem"
title: "Pencosystem"
hide_table_of_contents: true
---

# Pencosystem

Pencosystem 是不断壮大的生态系统，由已在 Pendle 上构建、与 Pendle 合作或集成 Pendle 的 DeFi 协议、CeFi 平台及机构共同组成——集体拓展了在 Pendle App 之外使用 PT、YT 和 LP 仓位的可能性。

从接受 PT 作为抵押品的货币市场，到自动化循环策略的收益协议，再到将 Pendle 带向更广泛受众的 CEX 和钱包——Pencosystem 使 Pendle 的收益在更广泛的加密生态系统中触手可及。

## 寻找集成项目

### 全局 Pencosystem 目录

所有 Pencosystem 合作伙伴均列于 [pendle.finance/pencosystem](https://pendle.finance/pencosystem)，按类别整理：

- **货币市场（Money Market）** — 可存入 PT 作为抵押品并借款的协议（如 Aave、Morpho、Euler、Dolomite）
- **收益策略（Yield Strategy）** — 在 Pendle 市场之上构建自动化策略的协议（如 Contango、Ceres、AFI）
- **CEX / Web3 钱包** — 已上架或集成 Pendle 资产的中心化交易所和钱包（如 Binance、Bybit、Coinbase、Bitget）
- **保险（Insurance）** — 为 Pendle 仓位提供保障的协议

### 每个市场的 Pencosystem 标签

在 Pendle App 上查看特定 PT 市场时，切换至 **Pencosystem** 标签可查看该市场支持的集成项目，聚焦展示如何在单纯持有之外将你的 PT 进一步利用。

货币市场部分一目了然地显示关键指标：

| 字段 | 说明 |
|---|---|
| **总供应量 / 上限（Total Supply / Cap）** | 存入货币市场的 PT 总量及协议供应上限（如有） |
| **可借资产（Assets to Borrow）** | 可以用 PT 抵押借入的资产及当前借款利率 |
| **最大 LTV（Max LTV）** | 最大贷款价值比——相对 PT 抵押品价值最多可借的比例 |
| **可用流动性（Available Liquidity）** | 当前可借的数量 |
| **最大循环 APY（Max Looping APY）** | 通过循环 PT 仓位可实现的最大 APY（见下文） |

---

## 货币市场

货币市场集成是 Pencosystem 最实用的功能之一。将 PT 存入作为抵押品后，可在不放弃 PT 敞口的情况下借款，解锁资金流动性。

### 用 PT 借款

1. 前往你持有的 PT 市场，打开 **Pencosystem** 标签。
2. 选择货币市场（如 Morpho）并点击链接打开。
3. 将 PT 存入作为抵押品。
4. 用 PT 抵押借入资产（如 USDC），上限为显示的最大 LTV。

PT 是一种固定收益资产，价值在到期时趋向面值，使其成为可预测、低波动的抵押品形式。许多货币市场因此为其提供相对优厚的 LTV 比率。

### 循环 PT 获取杠杆固定收益

循环策略通过借入资金递归购买更多 PT 来放大固定 APY。Pencosystem 标签中显示的**最大循环 APY** 表示当前利率下通过该策略理论上可实现的最高收益。

典型循环流程：

1. 存入 PT 作为抵押品 → 借出 USDC。
2. 用借得的 USDC 在 Pendle 上购买更多 PT。
3. 将新 PT 存入作为额外抵押品 → 借出更多 USDC。
4. 重复以上步骤，直至达到目标杠杆水平。

最终获得更大的 PT 仓位，享受固定 APY，扣除借款成本后为净收益。**最大循环 APY** 反映了最大循环深度下的净收益。

**注意：** 循环策略会增加你的敞口，若 PT 的抵押品价值相对借款仓位下降，则面临清算风险。部分协议（如 Contango）可自动执行此策略并代为管理循环。

---

## 跨链访问

通过[跨链 PT](./CrossChainPT.md)，你可以在有货币市场或收益策略的链上持有 PT，即使底层 Pendle 市场在另一条链上。无论资金来自哪条链，都能访问完整的 Pencosystem。

例如，若 HyperEVM 上的货币市场接受 PT-wstETH 作为抵押品，你可以从任意链购买该 PT 并直接在 HyperEVM 上收到，无需额外跨链操作，即可存入。
