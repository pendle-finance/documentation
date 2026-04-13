---
pagination_label: "PT / YT / LP 速查表"
title: "PT / YT / LP 速查表"
---

import Hint from '@site/src/components/Hint';

# PT / YT / LP 速查手册

## 什么是 Pendle

Pendle 让您获得更好的收益。我们帮助您获取更高的确定性和更高的回报（即更高的 APY 🔥）。

1. 赚取固定收益（使用 PT）
2. 提供流动性（LP）以最小或零无常损失（IL）赚取额外收益
3. 做多收益（使用 YT）

### PT 和 YT——快速回顾

想象 Pendle 是一个市场，房产所有者可以在这里分别拆分和交易其本金（房产所有权）和收益（租金收款权利）。您甚至可以在到期前出售或交易收益部分。这创造了管理甚至投机收益的新方式。

<Hint style="info">
💡 以 stETH 为例：**本金**（stETH 本金权利）+ **收益**（stETH 收益权利）= **收益资产**（stETH）
</Hint>

#### **本金代币（PT）**

* 1 PT 让您在到期日赎回 1 单位原始资产。
* PT 类似于传统金融中的[零息债券](https://www.investopedia.com/terms/z/zero-couponbond.asp)。

#### 收益**代币（YT）**

* 1 YT 让您在到期日之前获得 1 单位原始资产的收益，可实时领取。
* YT 类似于传统金融中的[债券分离息票](https://www.investopedia.com/terms/c/coupon.asp)。

<Hint style="danger">
**您可以随时出售 PT 和 YT**，在 Pendle 市场上，_**无需**_**锁定或罚款**，以市价交易，24/7 全天候可用。
</Hint>

关于 PT 和 YT 最重要的结论：

<Hint style="success">
💡 PT 价格 + YT 价格 = 底层资产价格
</Hint>

***

## PT 速查手册——赚取固定收益

<table data-header-hidden><thead><tr><th width="218"></th><th></th></tr></thead><tbody><tr><td>简而言之</td><td><strong>如果您持有头寸直至到期日，可以保证赚取所选资产的固定数量。</strong></td></tr><tr><td>收益来源</td><td>PT <a href="../pendle-101/chapter-2-yield-tokenization-basics">入场成本低于底层资产</a>，其价值随时间增长，到期日时可 1:1 兑换原始资产。您实现的折价即为固定收益。</td></tr><tr><td>波动性</td><td>低</td></tr><tr><td>投资偏好</td><td>长期</td></tr><tr><td></td><td>适合初学者</td></tr><tr><td>保证</td><td>如果持有到到期，本金和回报均有保证</td></tr><tr><td>底层资产收益展望</td><td>看跌</td></tr><tr><td>价格变化</td><td><p>价格在_短期内_随以下因素上涨… </p><ol><li>时间流逝 </li><li><a href="../optimizing-yields-with-pendle/chapter-5-important-concepts-in-yield-trading#implied-apy">隐含 APY</a> 下降 </li><li>底层资产价格上涨（反之亦然）注意：PT 始终在到期日 1:1 可兑换底层资产。</li></ol></td></tr><tr><td>估值</td><td>当<a href="../optimizing-yields-with-pendle/chapter-5-important-concepts-in-yield-trading#implied-apy"><em>隐含 APY</em></a> 远高于<a href="../optimizing-yields-with-pendle/chapter-5-important-concepts-in-yield-trading#underlying-apy"><em>底层 APY</em></a> 时，PT 较便宜</td></tr><tr><td>入场时机</td><td><ol><li>如果您认为该资产未来将产生更少的 APY， </li><li>如果您想对冲收益下降风险， </li><li>如果您对广告中的 APY 感到满足， </li><li>如果您认为 PT 过于低估</li></ol></td></tr><tr><td>提前退出</td><td><strong>随时可以</strong>，<strong>无锁定或罚款</strong>。PT 始终在 Pendle 的 AMM 中有市场价格。</td></tr><tr><td>资金效率</td><td>本身没有杠杆。然而，有些<a href="/broken/pages/S29PfY1wPN1zLrdFQ1fP">借贷平台</a>允许您将 PT 作为抵押品借入资产，甚至进行循环杠杆。</td></tr><tr><td>其他备注</td><td>PT 可以作为现货的可行替代方案，具有类似的风险敞口，以及赎回时实现固定收益带来的下行缓冲优势。PT 也可以作为<a href="../yield-trading-deep-dives/chapter-6-shorting-yield">做空收益策略</a>，如果底层收益下降，您可能在短期内获利。</td></tr></tbody></table>

<details>

<summary>如果提前退出 PT，我能获利吗？</summary>

提前退出时，您的收益将取决于 PT 的市场退出价格。您可能赚到比广告中 APY 更高或更低（极端情况下可能亏损）的收益。请注意，PT 始终在到期日 1:1 可兑换底层资产，因此不一定需要在短期不利价格波动时卖出。

</details>

## YT 速查手册——增加收益敞口（做多收益）

<table data-header-hidden><thead><tr><th width="220"></th><th></th></tr></thead><tbody><tr><td>简而言之</td><td><p><strong>增加您的收益敞口（做多收益）</strong>。可以持有到期，也可以低买高卖快速获利。当以下任一情况发生时，您将获利… </p><ol><li>YT 价格上涨， </li><li>YT 产生的收益超过您购买 YT 的成本</li></ol></td></tr><tr><td>收益来源</td><td>YT <a href="../pendle-101/chapter-2-yield-tokenization-basics">接收底层资产产生的所有收益</a>直至到期日，可实时领取。</td></tr><tr><td>波动性</td><td>较高</td></tr><tr><td>投资偏好</td><td>短期或长期</td></tr><tr><td></td><td>适合中高级投资者</td></tr><tr><td>保证</td><td>不适用</td></tr><tr><td>底层资产收益展望</td><td>看涨</td></tr><tr><td>价格变化</td><td><p>价格随以下因素上涨… </p><ol><li><a href="../optimizing-yields-with-pendle/chapter-5-important-concepts-in-yield-trading#implied-apy">隐含 APY</a> 上升 </li><li>底层资产价格上涨 </li><li>收益/奖励代币资产价格上涨（如适用）（反之亦然）注意：<strong>时间</strong>对 YT _不利_——YT 价格随时间缓慢下降至到期时的零。</li></ol></td></tr><tr><td>估值</td><td>当<a href="../optimizing-yields-with-pendle/chapter-5-important-concepts-in-yield-trading#implied-apy"><em>隐含 APY</em></a> 远低于<a href="../optimizing-yields-with-pendle/chapter-5-important-concepts-in-yield-trading#underlying-apy"><em>底层 APY</em></a> 时，YT 较便宜</td></tr><tr><td>入场时机</td><td><ol><li>如果您认为该资产未来将产生更多 APY， </li><li>如果您想对冲收益上升风险， </li><li>如果您想投机收益率或收益代币价格的短期上涨 </li><li>如果您认为 YT 过于低估</li></ol></td></tr><tr><td>提前退出</td><td><strong>随时可以</strong>，<strong>无锁定或罚款</strong>。YT 始终在 Pendle 的 AMM 中有市场价格。</td></tr><tr><td>资金效率</td><td>由于 <a href="../pendle-101/chapter-2-yield-tokenization-basics">YT 的价格远低于底层资产</a>，您可以_有效地_获得<strong>杠杆收益敞口</strong>（通常为 20 倍或以上），没有实际借贷。因此<strong>没有清算或预言机错误风险</strong>。</td></tr></tbody></table>



## LP 速查手册——提供流动性赚取被动额外收益

<table data-header-hidden><thead><tr><th width="220"></th><th></th></tr></thead><tbody><tr><td>简而言之</td><td><strong>在原本闲置的收益资产基础上赚取额外"免费"收益。</strong> Pendle 池只以您选择的底层资产计价（PT + SY）（SY 是底层资产的简单包装版本，以与 Pendle 架构兼容）。<strong>到期时也没有无常损失（IL）顾虑</strong>。</td></tr><tr><td>收益来源</td><td><p>多个渠道： </p><ol><li>原生收益——资产的底层收益 + PT 的固定收益 </li><li>交换费 </li><li>$PENDLE 激励 </li></ol></td></tr><tr><td>波动性</td><td>低，到期日前 IL 极小（池只包含高度相关代币）。到期日时没有 IL，因为池中的 PT 将变为 1:1 可兑换底层资产。</td></tr><tr><td>投资偏好</td><td>短期或长期</td></tr><tr><td></td><td>适合初学者</td></tr><tr><td>保证</td><td>APY 不保证，但如果持有到到期，本金有保证</td></tr><tr><td>底层资产收益展望</td><td>略微看跌，由于池中部分 PT 的存在</td></tr><tr><td>价格变化</td><td>短期价格变化行为类似于 PT，因为池中存在部分 PT。注意池中的 PT 始终在到期日 1:1 可兑换底层资产。</td></tr><tr><td>入场时机</td><td>随时。时机或底层收益展望不是很重要。当隐含 APY 较低时，启用"<strong>保留 YT</strong>模式"入场更有利，反之亦然。</td></tr><tr><td>提前退出</td><td><strong>随时可以</strong>，<strong>无锁定或罚款</strong>。提前退出也不会影响您的 APY。</td></tr><tr><td>备注</td><td>由于池中部分 PT 的存在，可用于对冲底层收益下降。了解更多关于<a href="../yield-trading-deep-dives/chapter-7-providing-liquidity-while-trading-yield">将 LP 作为收益交易一部分</a>的内容。</td></tr></tbody></table>

<Hint style="info">
在[第 9 章](../yield-trading-deep-dives/chapter-9-identifying-opportunities-to-long-short-yield.md)中了解更多
</Hint>
