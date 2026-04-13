---
pagination_label: "负收益"
title: "负收益"
hide_table_of_contents: true
---

# 了解生息代币（IBT）的负收益风险

生息代币（IBT）通常会随着奖励和收益的累积而随时间升值，导致 IBT 与其会计资产之间的[汇率](./Glossary#exchange-rate)持续上升。例如，1 个 sUSDe（IBT）可以随时间兑换更多 USDe。

然而，在收益转为负值的情况下，IBT 的价值可能反而下降。这会影响 PT 和 YT 的表现，尤其是在汇率下跌时。

## 什么是水位线汇率？

[水位线汇率（Watermark Rate）](./Glossary#watermark-rate) 是 IBT 与其会计资产之间汇率的历史最高记录值。在长期负收益期间，汇率可能跌破这一水位。

发生这种情况时：

- **PT** 将在到期时以低于实际价值的价格兑换，导致潜在损失。例如，正常情况下 1 个 PT-RLP（USDC）预计在到期时兑换为 1 个 USDC。但当汇率跌破水位线汇率时，PT-RLP 将在到期时兑换少于 1 个 USDC。
- **YT** 将停止累积收益，直至汇率恢复至水位线汇率以上

![Watermark Chart](/pendle-docs/imgs/ProtocolMechanics/watermark_chart.png "Watermark Chart")

你可以在任意资产的市场页面切换至**水位线汇率**视图，实时追踪水位线汇率和当前汇率。

由于预言机定价错误或 IBT 份额价格短暂飙升等因素，水位线汇率可能被人为抬高至虚高水平。发生这种情况时，系统会记录一个新的虚高水位线汇率，即便汇率随后恢复至资产真实价值，该水位线仍然有效。在此期间，该池子可能显示为产生负收益，直至汇率追上这个虚高的水位线汇率。
