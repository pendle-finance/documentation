---
pagination_label: "SY"
title: "SY"
hide_table_of_contents: true
---

# SY

![SY](/pendle-docs/imgs/ProtocolMechanics/sy.png "SY")

SY 是一种代币标准，为智能合约内封装的生息代币提供标准化 API。所有生息代币均可被封装为 SY，从而获得可供外部构建的统一接口。SY 将 Pendle 的收益代币化机制开放给 DeFi 中所有生息代币，构建出一个无需许可 (permissionless) 的生态系统。

> 例如，stETH、cDAI 和 yvUSDC 可分别被封装为 SY-stETH、SY-cDAI 和 SY-yvUSDC，从而将它们的收益生成机制标准化，以便在 Pendle 上使用。

由于所有 SY 具有相同的机制，Pendle 以 SY 作为与所有生息代币交互的主接口。PT 和 YT 从 SY 铸造，Pendle AMM 池子中也以 PT 对 SY 进行交易。

虽然听起来复杂，但 Pendle 会自动完成生息代币与 SY 之间的转换，整个过程在后台静默进行，用户体验上如同直接操作生息代币，无需手动处理 SY ↔ 生息代币的转换。

### 核心特性

- **1:1 封装（通常情况下）：** 大多数情况下，1 个 SY 代币代表 1 单位底层生息资产。例如，1 SY-rsETH 等于 1 rsETH。但存在例外（如 mPendle、aUSDC），封装比例并非严格 1:1，集成方需验证各 SY 代币的具体封装机制。
- **无到期日：** 与 PT 和 YT 不同，SY 代币没有到期日。只要持有在 Pendle 生态内，它就作为底层资产的永久封装存在。
- **收益与积分的来源：** SY 合约持有存入的底层资产，并直接接收该资产累积的所有收益和积分。Pendle 市场内分配的所有奖励均来自市场中持有的 SY 代币。
- **可升级性：** 大多数较新的 SY 合约以可升级代理形式部署，支持未来增强功能（如添加新存入资产或调整机制），无需完整的市场迁移。

SY 标准不仅服务于 Pendle 本身，我们对其的愿景远不止于此。SY 旨在为整个 DeFi 创造前所未有的可组合性，使开发者能够无缝构建于现有合约之上，无需手动集成。

## SY 转换器（SY Converter）

![SY Converter](/pendle-docs/imgs/ProtocolMechanics/sy-converter.png "SY Converter")

SY 转换器可在相关市场的交易表单中找到。例如，*SY-sUSDe* 的封装/解封工具可从任意到期日的 sUSDe 市场中访问。

**使用 SY 转换器：**

![SY Converter Window](/pendle-docs/imgs/ProtocolMechanics/sy-converter-window.png "SY Unwrapper Window")

1. 在「**解封**」("Unwrap") 和「**封装**」("Wrap") 模式之间选择。

2. 选择要封装的代币或解封的目标代币。

3. 确认汇率和输出数量。

4. 确认并批准交易。
