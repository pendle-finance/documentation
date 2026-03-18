---
hide_table_of_contents: true
---

# Pencosystem

Pencosystem 是指由在 Pendle 上构建、与 Pendle 合作或集成 Pendle 的 DeFi 协议、CeFi 平台和机构共同构成的生态系统 — 共同拓展了您使用 PT、YT 和 LP 仓位的可能性，超越了 Pendle 应用本身的边界。

从接受 PT 作为抵押品的借贷市场，到自动化循环策略的收益协议，再到将 Pendle 带给更广泛用户的 CEX 和钱包 — Pencosystem 让 Pendle 的收益产品触达整个加密生态。

## 探索生态集成

### 全局 Pencosystem 目录

您可以在 [pendle.finance/pencosystem](https://pendle.finance/pencosystem) 浏览所有 Pencosystem 合作伙伴，按以下类别分类：

- **货币市场（Money Market）** — 支持存入 PT 作为抵押品并进行借款的协议（如 Aave、Morpho、Euler、Dolomite）
- **收益策略（Yield Strategy）** — 基于 Pendle 市场构建自动化策略的协议（如 Contango、Ceres、AFI）
- **CEX / Web3 钱包** — 已上线或集成 Pendle 资产的中心化交易所和钱包（如 Binance、Bybit、Coinbase、Bitget）
- **保险（Insurance）** — 为 Pendle 仓位提供保障的协议

### 单一市场的 Pencosystem 标签页

在 Pendle 应用中查看特定 PT 市场时，切换到 **Pencosystem** 标签页，即可查看该 PT 可用的集成协议。这为您提供了专注于该市场的视角，让您清楚了解持有 PT 之外还能如何充分利用您的仓位。

货币市场部分会一目了然地展示以下关键数据：

| 字段 | 说明 |
|---|---|
| **总供应量 / 上限** | 当前存入该货币市场的 PT 总量及协议设定的供应上限（如有） |
| **可借资产** | 您可以用 PT 抵押借出的资产及当前借款利率 |
| **最大 LTV** | 最大贷款价值比 — 相对于 PT 抵押品价值，您最多可以借出多少 |
| **可用流动性** | 当前可供借出的资金量 |
| **最大循环 APY** | 通过循环 PT 仓位可实现的最高 APY（详见下文） |

---

## 货币市场：让 PT 发挥更大价值

货币市场集成是 Pencosystem 最强大的功能之一。通过将 PT 存入货币市场作为抵押品，您可以在不放弃 PT 敞口的前提下借出资产，释放流动性。

### 以 PT 作为抵押品进行借款

1. 进入您持有的 PT 市场，切换到 **Pencosystem** 标签页。
2. 选择一个货币市场（如 Morpho）并点击链接进入。
3. 在货币市场中将您的 PT 存入作为抵押品。
4. 根据显示的最大 LTV，用 PT 借出资产（如 USDC）。

由于 PT 是固定收益资产，其价值会随时间向面值靠拢，价格波动性低且具有可预期性，因此许多货币市场协议将其视为优质抵押品，通常给予较优惠的 LTV 比率。

### 循环 PT 以放大固定收益

循环（Looping）通过将借出的资金反复购买更多 PT，来放大您的固定 APY。Pencosystem 标签页中显示的 **最大循环 APY** 代表在当前利率下通过此策略理论上可实现的最高收益。

典型的循环流程如下：

1. 存入 PT 作为抵押品 → 借出 USDC。
2. 用借出的 USDC 在 Pendle 上购买更多 PT。
3. 将新购的 PT 追加为抵押品 → 再次借出 USDC。
4. 重复上述步骤，直至达到目标杠杆水平。

最终您将持有更大规模的 PT 仓位，赚取固定 APY，同时扣除借款成本。**最大循环 APY** 即为达到最大循环深度时的净收益率。

> **注意：** 循环会放大您的敞口，若 PT 的抵押品价值相对借款仓位下降，则存在被清算的风险。部分协议（如 Contango）会自动化执行此策略并代为管理循环仓位。

---

## 跨链访问 Pencosystem

借助[跨链 PT](./CrossChainPT.md) 功能，您现在可以将 PT 持有在某条链上 — 即使该 Pendle 市场部署在另一条链上 — 只要目标链上有支持该 PT 的货币市场或收益策略协议。这让您无论资金在哪里，都能无缝接入完整的 Pencosystem。

例如，若 HyperEVM 上的某个货币市场支持 PT-wstETH 作为抵押品，您可以从任意链购买该 PT，并将其直接接收至 HyperEVM — 无需额外的跨链桥接步骤，即可直接存入使用。
