---
pagination_label: "监控与平仓"
title: "监控与平仓"
---

import Hint from '@site/src/components/Hint';

# 监控与平仓

## 平掉四腿套利仓位

首先，平掉你在 Boros 上的 YU 仓位。平仓后，永续腿窗口右下角会出现 **"Close both"** 按钮——点击并按住该按钮，即可通过市价单平掉两条永续仓位。

![Close both perp legs](/boros-docs/imgs/arbitrage-with-crossex/close-both-perp-legs.png "Close both perp legs")

<Hint style="info">
由于该套利的永续腿使用了较高杠杆，你可能会收到 Gate 关于 CrossEx 账户初始保证金率（IMR）的提醒邮件。由于你的仓位是市场中性的，除非出现跨多个永续交易所的价格错位，否则清算风险极低。
</Hint>

## 使用订单面板（进阶）

若要在引导式的 Opportunities 流程之外手动开出永续价差，可使用 **Order ticket（订单面板）**：

1. 选择要开价差的标的
2. 输入每条腿的名义本金
3. 选择订单类型（市价单 / 限价单）
4. 点击并按住 **"Execute pair"**

此时你的价差交易已经生效。该方式适合希望在用 Boros YU 锁定固定利率之前先建立永续价差的交易者，或希望设置特定限价单以实现更进阶策略的交易者。如果你刚接触资金费率套利，建议使用引导式 Opportunities 流程。

下一步：[风险与安全](./risks-and-security)
