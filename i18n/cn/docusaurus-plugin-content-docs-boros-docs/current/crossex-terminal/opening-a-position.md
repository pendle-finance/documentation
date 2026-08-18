---
pagination_label: "开仓"
title: "开仓"
---

import Hint from '@site/src/components/Hint';

# 开仓

## 阅读机会扫描（Opportunities scan）

面板首页展示当前可用的固定利差，按选定的名义本金计价。点击某个利差的假设条件窗口即可查看和调整：

![Click to expand rates](/boros-docs/imgs/crossex-terminal/click-to-expand-rates.png "Click to expand rates")

**永续腿入场方式（Perp entry）**

- **2 market orders（两笔市价单）** — 立即以市价单开仓。
- **Limit + hedge（限价+对冲）** — 先在一个交易所挂限价单，成交后再以市价单在另一交易所对冲。可节省手续费（挂单费低于吃单费），代价是执行耗时更长。

**永续腿平仓成本（Perp exit cost）**

- **Close positions（平仓）** — 在 Boros 到期时平掉永续腿。
- **Roll over（展期）** — 到期后继续持有永续腿，滚动进入下一期固定利差，从而省去一轮永续腿的开平仓手续费。

**Boros 入场方式（Boros entry）**

- **At mark rate（按标记利率）** — 假设 Boros YU 腿以当前标记 APR 无价格冲击成交时的潜在 APR。
- **Market at size（按规模市价成交）** — 假设 Boros YU 腿以立即市价单成交时的潜在 APR。

点击某个机会或其 **Details** 按钮，即可查看该笔交易各条腿的明细：

![Expanding arb details](/boros-docs/imgs/crossex-terminal/expanding-arb-details.png "Expanding arb details")

<Hint style="info">
建议先开 Boros 腿，再开永续腿——Boros 的价格冲击更大也更难预测，因此应先锁定 Boros 利差，再执行完整的四腿仓位。首次操作建议先用小额测试，熟悉流程后再执行更大金额。
</Hint>

## 执行永续腿

找到合适的交易后，点击 **"Execute it"**，然后在订单面板中调整每条腿的名义本金。选择订单类型（市价单 / 限价+对冲），然后点击并按住 **"Execute pair"** 以开出永续价差：

![Order ticket - Execute it](/boros-docs/imgs/crossex-terminal/order-ticket-execute-it.png "Order ticket - Execute it")

## 开出 Boros 腿

进入 **Positions** 标签页，查看还需要开出哪些 Boros 仓位以锁定固定利率。前往每个永续市场对应的 Boros 到期日，按 1:1 的名义本金开出与刚执行的永续腿相匹配的多空仓位。

完成后返回终端——此时你已开始获得固定收益直至到期，**Positions** 标签页会显示你在该笔资金上的预估收益。

下一步：[监控与平仓](./monitoring-and-closing)
