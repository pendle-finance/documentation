---
pagination_label: "监控与平仓"
title: "监控与平仓"
---

import Hint from '@site/src/components/Hint';

# 监控与平仓

## Positions 标签页

四腿仓位开出后几乎无需维护——主要的决策是到期时如何处理。**Positions** 标签页将每个策略归为一个独立方框，并在同一张表格中列出全部四条腿。

![Positions tab](/boros-docs/imgs/arbitrage-with-crossex/positions-tab.png "Positions tab")

顶部的 **BOROS-TRACKED TOTALS** 汇总所有被追踪的仓位：**Current PnL（当前盈亏）**、**Capital（资本）** 和 **Est. by maturity（到期预估）**。

每个仓位方框的标题显示币种、交易所组合（例如 `Gate ⇄ Hyperliquid`）、到期日及剩余天数，以及状态标识——四条腿齐备时显示 `hedged ✓`；各条腿方向均正确但规模不匹配时显示 `partial hedge`；有腿缺失时显示 `unhedged`。其下是主要数字：

- **FIXED APY** — 锁定的年化回报，下方附有对应利差与 ROI
- **PNL NOW** — 当前的浮动盈亏
- **PNL AT MATURITY** — 持有至到期的预计结果
- **CAPITAL** — 该仓位占用的资本

腿表格列出全部四条腿——两条 `·CX` 永续腿和两条 `BOROS` 利率腿——并显示名义本金、利率（永续腿为 `floating`，Boros 腿为锁定利率）以及净盈亏。

<Hint style="info">
只有当全部四条腿齐备时，仓位才会显示利率、资本和 ROI。尚未建全的仓位会显示 **Incomplete position**；规模不匹配的仓位会显示 **Sizes don't match**——各条腿方向均正确，但只有匹配的部分被对冲。`unhedged` 方框则提供 **Open the perp legs →** 按钮，可用相反的浮动敞口预填对交易面板。
</Hint>

## 平掉仓位

每一侧都在各自的交易所平仓，使用仓位方框底部的两个按钮：

- **Close perp pair** — 同时平掉两条 CrossEx 永续腿。
- **Close Boros legs** — 平掉两条 Boros 利率腿。

若需更精细的控制，每一行腿的 **MANUAL ADJUSTMENT** 列可只平掉单条腿，而非整侧。当整条腿都属于该仓位时显示 **All of it**；当该腿与其他策略共享时，则显示匹配规模与交易所总量之比（例如 `1.26 HYPE / 1.89 HYPE`）。

<Hint style="info">
由于永续腿使用了杠杆，你可能会收到 Gate 关于初始保证金率（IMR）的提醒邮件。由于仓位是市场中性的，除非出现跨交易所的价格错位，否则清算风险极低。
</Hint>

## 展期（Rolling over）而非平仓

如果你能在同一永续交易对的下一到期日锁定不错的利差，展期通常优于平仓。原有仓位省去了永续腿的平仓手续费，新仓位也省去了开仓手续费——若能持续展期，仓位将完全不必支付永续腿手续费，这是该策略可获得的最大提升之一。

展期做法：到期时只平掉 Boros 腿，在下一到期日开出新的 Boros 腿，永续腿保持不动。然后将原仓位的 **Perp exit cost** 设为 *Omit (rolling over)*，并在新仓位中取消勾选 **Perp entry cost** 下继承而来的执行记录。两者都位于 **Costs** 弹窗中——详见[理解仓位盈亏](./position-pnl)。

## 直接使用订单面板

点击页首的 **Order ticket** 打开侧边面板，即可在引导式向导之外手动操作任意一侧——适合为某条腿加仓，或部分平掉某个仓位。各下单页的说明详见[订单面板](./opening-a-position#订单面板order-ticket)。

下一步：[理解仓位盈亏](./position-pnl)
