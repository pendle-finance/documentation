---
pagination_label: "开仓"
title: "开仓"
---

import Hint from '@site/src/components/Hint';

# 开仓

交易的两个部分都在终端内执行：Boros 上的**利率腿**，以及通过 CrossEx 执行的**永续腿**。推荐顺序始终是**先锁定利率，再对冲永续腿**——Boros 的价格冲击更大且更难预测，因此应先锁定利差，再投入永续腿。

## 阅读机会扫描（Opportunities scan）

Opportunities 标签页列出当前可用的固定利差，每一项都按你选定的名义本金计价，并已扣除引擎能够建模的全部成本。

![Opportunities scan](/boros-docs/imgs/arbitrage-with-crossex/opportunities-scan.png "Opportunities scan")

每张卡片显示币种、两个交易所（哪一侧做空、哪一侧做多）、到期日，以及：

- **APR** — 扣除手续费、价格冲击和滑点后的年化净回报
- **CAPITAL** — 四条腿实际占用的保证金
- **RETURN** — 该仓位存续期内的预估美元收益
- **NOTIONAL** — 每条腿的计价规模

## 调整假设条件

点击 **with these assumptions** 条即可展开面板。任何改动都会重新为所有卡片定价。

![Opportunity assumptions](/boros-docs/imgs/arbitrage-with-crossex/opportunity-assumptions.png "Opportunity assumptions")

**Notional（名义本金）** — $10k、$100k、$500k，或 $1k 至 $100M 之间的自定义金额。

**Perp entry（永续腿入场方式）**

- **2 market orders（两笔市价单）** — 立即以市价单同时开出两条腿。
- **Limit + hedge（限价 + 对冲）** — 在一个交易所挂限价单，一旦成交立即在另一交易所以市价单对冲。可节省挂单与吃单的手续费差额，代价是执行耗时更长。

**Perp exit cost（永续腿平仓成本）**

- **Close positions（平仓）** — 假设你在到期时平掉永续腿并支付相应手续费。
- **Roll over（展期）** — 假设你保留永续腿并滚动进入下一到期日，从而完全省去一轮永续腿手续费。

**Boros entry（Boros 入场方式）**

- **At mark rate（按标记利率）** — 假设 Boros 腿以无价格冲击成交。
- **Market at size（按规模市价成交）** — 假设两条 Boros 腿均按你的规模以市价单成交。

<Hint style="info">
你当前的 Gate VIP 等级已计入所有数字。由于永续腿手续费是最大的成本项之一，更高的 VIP 等级会显著提升同一笔交易的 APR。
</Hint>

## 查看完整拆解

点击任意卡片上的 **More details**，即可查看该数字是如何构成的。

![Opportunity details](/boros-docs/imgs/arbitrage-with-crossex/opportunity-details.png "Opportunity details")

该面板列出全部四条腿——两条 CrossEx 永续腿及其可用杠杆，以及两条 Boros 利率腿及其价格冲击前后的利率——随后是一行 **NET EFFECT**，说明所锁定的资金费率利差以及由此得到的资本 APR。

下方是两张瀑布图：**profit by maturity（到期收益）**，从总利差逐项扣除 Boros 价格冲击、Boros 手续费、结算费、永续腿入场手续费和入场滑点，得到预估收益；以及 **capital（资本）**，展示四条腿各自贡献的初始保证金。

<Hint style="warning">
此处的 APR 是按各腿所需的**最低**资本建模的。而 Positions 标签页会除以你实际投入的 Boros 保证金，因此一个超额抵押的实际仓位，其显示的 APR 会低于同一笔交易的估算值。
</Hint>

## 第一步 —— 在 Boros 上锁定利率

点击机会卡片上的 **Lock the rate**，两条 Boros 腿会被载入 **Boros rates** 订单面板。

![Boros rates ticket](/boros-docs/imgs/arbitrage-with-crossex/boros-rates-ticket.png "Boros rates ticket")

检查 **Leg A** 和 **Leg B**——每条腿对应一个市场与到期日，并各自有 Long/Short 方向——然后设置 **Size per leg（每条腿规模）**，将模式保持在 **Open**，并设置 **Max slippage (% APR)**，用于限制每条腿相对报价利率的最大成交偏离。点击 **Confirm — 2 Boros market orders** 发送订单。

两个市场必须使用相同的抵押品和到期日。你也可以单独使用该面板平掉利率腿（切换到 **Close**，该模式为只减仓），或通过 **Single** 标签页开出单条腿。

<Hint style="info">
若想改善所锁定的利差，可考虑在一条 Boros 腿上挂限价单，另一条以市价单成交，而非两条都吃单。这有时能带来可观的 APR 提升——不过遇到明显优质的机会时，也值得立即成交，以免被其他用户抢先。
</Hint>

## 第二步 —— 在 CrossEx 上对冲永续腿

锁定利率后，点击 **Hedge the perps**，将永续腿载入 **CrossEx perps** 面板。设置 **Size per leg**，然后选择执行方式。

**2 market orders** 会立即开出两条腿——操作简单，适合你希望确保成交的情况。

**Limit + hedge** 是默认选项，可节省手续费。系统会自动选择挂单方向，使总手续费最低。点击 **Execute pair** 后：

1. 系统按挂单价格挂出限价单——默认略优于盘口价格，并会跟随盘口移动，直到你手动输入价格将其固定。
2. 每当该限价单全部或部分成交，成交部分会立即在另一交易所以市价单对冲。
3. 如此反复，直至整对仓位建立完成。

如果 **Convert to taker after** 倒计时（1m / 5m / 15m）结束时订单仍未完全成交，剩余部分将被撤销并以市价单完成。若不希望如此，可在倒计时结束前点击 **Stop**。如果挂单距离市价过远迟迟未成交，**Re-peg to touch** 可将其移回最优买/卖价附近，你也可以重新挂到自定义价格。

<Hint style="warning">
在进行有意义的金额之前，请先用小额测试熟悉整个流程。对于较大的仓位，建议拆分成多次执行——例如分五次各 $100k，而非一次性 $500k——以降低平均滑点。在行情较为平静时执行也有帮助。
</Hint>

两步完成后，你就持有了全部四条腿，**Positions** 标签页会显示你锁定的利率以及到期前的预估回报。

下一步：[监控与平仓](./monitoring-and-closing)
