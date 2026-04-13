---
pagination_label: "术语表"
title: "术语表"
hide_table_of_contents: true
---

# 术语表

#### 生息代币（Yield-Bearing Token）

生息代币是所有能产生收益的代币的统称。例如 stETH、GLP、gDAI，或流动性代币如 Aura rETH-WETH。

#### 会计资产（Accounting Asset）

生息代币相对于其升值的基准资产，显示在每个市场名称末尾的括号中。

#### SY = 标准化收益代币（Standardized Yield）

SY 是 Pendle 团队编写的代币标准，可将任何生息代币封装并提供统一接口，以便与任何生息代币的收益生成机制进行交互。SY 是纯技术组件，用户不会直接与 SY 交互。

#### PT = 本金代币（Principal Token）

PT 代表底层生息代币的本金部分，到期后可按 1:1 兑换。例如持有 1 个到期为 1 年的 PT-wstETH（stETH），1 年后可兑换 1 个 stETH。

PT 可在到期前随时交易。

#### YT = 收益代币（Yield Token）

YT 代表底层生息代币实时产生的全部收益的权利，累积的收益可在 Pendle 仪表板（Dashboard）中*随时*手动领取。

例如，持有 1 个 YT-wstETH（stETH），若 stETH 全年平均收益率为 5%，则到年底将累积 0.05 个 stETH。

YT 可在到期前随时交易。

#### 到期（Maturity）

到期日是 PT 可完全兑换为底层资产、YT 停止累积收益的日期。同一资产可以有多个到期日，每个到期日对应独立的市场，因此同一资产在不同到期日的隐含年化收益率（Implied APY）也可能不同。

#### 底层 APY（Underlying APY）

底层 APY 表示底层资产过去 7 天的移动平均收益率，旨在提供比单日数据更准确的收益指示，帮助交易者更好地估计未来平均底层 APY。

#### 隐含 APY（Implied APY）

Implied APY 是市场对资产未来 APY 的共识，根据 YT 与 PT 价格之比计算，公式如下。

结合底层 APY 使用时，Implied APY 可用于判断 YT 和 PT 当前价格的相对估值，帮助交易者制定交易策略。

隐含收益率在数值上等同于固定收益 APY（Fixed Yield APY）。

$$
\text{Implied APY} = \left[\left(1 + \frac{\text{YT Price}}{\text{PT Price}}\right)^{\frac{365}{\text{Days to expiry}}}\right] - 1
$$

#### 固定 APY（Fixed APY）

固定 APY 是持有 PT 可获得的确定收益，数值上等同于 Implied APY。

#### 做多收益 APY（Long Yield APY）

做多收益 APY 是在底层 APY 维持当前水平不变的假设下，以当前价格买入 YT 并持有至到期的年化近似收益率。

该值可能为负，意味着基于底层 APY 的未来收益总值低于购买 YT 的成本。

#### 汇率（Exchange Rate）

指生息代币与其会计资产之间的兑换比率。

#### LP = 流动性提供者代币（Liquidity Provider Token）

LP 代币代表用户在 Pendle 流动性池中的份额，该流动性池由 PT 和 SY 组成。LP 可同时从多个来源获取收益：交易手续费、PENDLE 激励、SY 部分的底层收益，以及 PT 部分的隐含固定收益。

#### LP 封装代币（LP Wrapper）

一种以 1:1 比例封装底层 LP 仓位的 ERC-20 代币，使 LP 代币可作为外部货币市场的抵押品，同时仍可累积 PENDLE 奖励及链下积分。封装合约确保原始存款人继续获得所有相关奖励。

#### 水位线汇率（Watermark Rate）

IBT 与其会计资产之间汇率的历史最高记录值。当汇率跌破该水位时，PT 将在到期时以低于实际价值的价格兑换，YT 也将停止累积收益。
