---
pagination_label: "术语表"
title: "术语表"
---

# 术语表

**YU（收益单位，Yield Units）**：每个 YU 代表 1 单位抵押品所赚取的浮动利率。例如，在以 BTC 为抵押品的 BTCUSDT（Hyperliquid）市场中，每个 YU 代表 Hyperliquid 上 1 BTC 的资金费率。在 BTC Spread HL-Gate 市场中，每个 YU 代表 1 BTC 的 Hyperliquid 减 Gate 资金费率价差。

**抵押品（Collateral）**：支撑您头寸的资金。在 Boros 上开设任何头寸都需要抵押品。当您的净余额低于维持保证金时，抵押品将被开放清算。

**隐含 APR（Implied APR）**：YU 以收益百分比表示的"价格"，本质上是市场对 YU 未来平均收益的共识。开设头寸后，该时间点的隐含收益率即成为到期前的固定 APR 应付/应收款（多头/空头头寸）。

**标记 APR（Mark APR，即标记隐含 APR）**：订单簿上最近成交的隐含 APR 的简单时间加权平均（TWAP）。标记 APR 用于未实现盈亏与清算计算。这类似于永续合约交易所的"标记价格"，用于避免短期价格操纵带来的不良后果。

**底层 APR（Underlying APR）**：市场所追踪的当前浮动利率，由其预言机提供。在资金费率市场上，即所参考交易所的资金费率；在价差市场上，即腿 A 的资金费率减去腿 B 的资金费率。

**资金费率市场（Funding Market）**：底层利率为单一交易所上单个永续合约市场资金费率的市场，例如 BTCUSDT (Binance)。参见[市场类型](./market-types)。

**价差市场（Spread Market）**：底层利率为同一资产在两家交易所资金费率之差的市场，命名形式如 *BTC Spread HL-Gate*。参见[价差市场](./spread-markets)。

**腿（Leg）**：构成价差市场的两个资金费率之一。名称中排在前面的交易场所为腿 A，排在后面的为腿 B。底层价差为 A − B。

**我的固定 APR（My Fixed APR）**：当前已开设头寸的固定 APR。这由入场时隐含 APR 的加权平均值确定。

**利率敏感度（Rate Sensitivity）**：APR 每变动 1% 时，您的头寸盈亏的变化幅度，相当于 TradFi 利率掉期惯例中的 100 倍 DV01。距到期时间越长的头寸，利率敏感度越高，因为每 1% 的变动覆盖更长周期内的更多收益。

`Rate Sensitivity = Notional Size (YU) * DaysToMaturity/365 * 1%`

**每日波动率（Daily Volatility）**：市场隐含 APR 区间的 7 日移动平均，反映该利率近期每日的波动幅度（即波动率）。

**多头 YU（Long YU）**：底层利率的多头头寸。多头利率头寸支付固定 APR 以接收底层 APR。固定 APR 由开设头寸时的平均隐含收益率确定。

**空头 YU（Short YU）**：底层利率的空头头寸。空头利率头寸支付底层 APR 以接收固定 APR。固定 APR 由开设头寸时的平均隐含收益率确定。

**到期日（Maturity）**：池的结束时间。到期时，头寸已完全结算并反映在您的抵押品中。

**清算隐含 APR（Liquidation Implied APR）**：如果市场隐含 APR 达到此水平，您的头寸将被开放清算。这是因为隐含 APR 的变动直接影响您的净余额。

**总头寸价值（Total Position Value）**：当前已开设头寸的价值。假设隐含 APY 不变，随着收益的结算和实现进入您的抵押品，总头寸价值随时间线性衰减。

**名义规模（Notional Size）**：您的 YU 头寸从中赚取收益的等效底层资产规模。

例如：若用户开设 200-YU-ETHUSDT（Binance）头寸，名义规模为 200 ETH。

**净余额（Net Balance）**：您的投资组合在该头寸中的总价值。净余额由您的抵押品和未实现盈亏组成。抵押品价值在每次收益结算后发生变化。未实现盈亏受市场当前隐含 APR 影响。

**维持保证金（Maintenance Margin）**：维持头寸所需的资金量。当净余额低于维持保证金时，您的头寸将被开放清算。维持保证金设定为初始保证金的 66%。

**初始保证金（Initial Margin）**：开设头寸时占用的保证金，依据名义规模、距到期时间以及隐含 APR 计算。

`InitialMargin=NotionalSize*YearsToMaturity*max(|ImpliedAPR|, MarginFloor)*IMRatio`

**保证金底线（Margin Floor）**：当池接近到期或其隐含 APR 接近 0% 时，开设头寸所需的最低保证金。此阈值防止所需保证金低于某个水平，保护平台免受高波动性带来的坏账风险。

**IM Ratio**：市场的杠杆比率，数值越低，该市场的初始保证金要求越低。
