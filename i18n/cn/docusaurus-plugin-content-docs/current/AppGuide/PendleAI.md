---
pagination_label: "Pendle AI 插件"
title: "Pendle AI 插件"
hide_table_of_contents: true
---

# Pendle AI 插件

Pendle AI 插件（[pendle-finance/pendle-ai](https://github.com/pendle-finance/pendle-ai)）是一个开源的测试阶段工具包，允许 AI 代理直接与 Pendle V2 协议交互。它提供 25 个 MCP 工具和 4 个技能，使代理能够在 7 条 EVM 链上交易收益代币、管理 LP 持仓、挂限价单以及查询实时市场数据。

该插件支持 Claude Code、Cursor 和 Windsurf。

---

## 安装

通过 Claude Code 插件市场安装：

```
/plugin marketplace add pendle-finance/pendle-ai
/plugin install pendle-v2
```

**环境要求：** Node.js 20 或更高版本。

---

## 您可以做什么

该插件分为四个技能，每个技能涵盖 Pendle 功能的不同领域：

### `pendle-swap` — 交易与流动性

兑换 PT、YT 和 SY 代币，在 Pendle 资金池中添加或撤出流动性，以及领取应计奖励。

### `pendle-data` — 市场数据

查询实时市场数据，按 APY 或其他条件筛选市场，查找代币详情，并探索收益策略信息。市场数据通过每 5 分钟刷新一次的内存数据库保持实时更新。

### `pendle-portfolio` — 持仓追踪

查看您在所有 Pendle 市场中的持仓，追踪盈亏情况，并在持仓临近到期时获得提醒。

### `pendle-order` — 限价单

在 Pendle 订单簿上创建、签名、提交和取消限价单。

---

## 示例提示词

安装完成后，您可以通过自然语言与 Pendle 交互。示例如下：

- *"显示 Arbitrum 上所有隐含收益率高于 8% 的 PT 市场。"*
- *"用 100 USDC 在以太坊上购买 PT-weETH。"*
- *"我目前在 Pendle 上有哪些持仓，各自的盈亏情况如何？"*
- *"以 5% 隐含收益率挂一个购买 PT-stETH 的限价单。"*
- *"在 Mantle 的 PT-USDe 资金池中添加流动性。"*

---

## 支持的链

该插件覆盖 7 条 EVM 链，包括以太坊、Arbitrum、Optimism、BNB Chain、Mantle、Base 等 Pendle V2 协议所支持的网络。

---

## 源代码与贡献

该插件基于 MIT 许可证开源。有关安装说明、贡献指南和完整 MCP 工具列表，请访问 [GitHub 仓库](https://github.com/pendle-finance/pendle-ai)。
