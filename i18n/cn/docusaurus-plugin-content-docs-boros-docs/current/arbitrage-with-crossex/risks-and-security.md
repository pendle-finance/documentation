---
pagination_label: "风险与安全"
title: "风险与安全"
---

import Hint from '@site/src/components/Hint';

# 风险与安全

<Hint style="warning">
Arbitrage with CrossEx 是 Pendle 发布的免费开源**实验性软件**。它会在你自己的交易所账户上用真实资金下单，可能造成亏损。本文不构成财务、投资、法律或税务建议——完整内容请见 [免责声明](https://github.com/pendle-finance/arbitrage-with-crossex/blob/main/docs/DISCLAIMER.md)。
</Hint>

## 交易风险

使用 CrossEx 可以让套利的永续腿保持市场中性，但该交易并非零风险：

- **交易所或平台问题** — Gate 作为交易所出现问题，或 CrossEx 出现故障，都可能干扰套利交易。
- **永续价格错位** — 两个永续交易所之间出现不太可能但仍有可能发生的价格错位，即便仓位是市场中性的，统一保证金账户仍可能面临清算风险。
- **Boros 清算** — 如果利差相对于你的入场点位移动过大，你的 Boros 仓位可能被清算，从而破坏固定收益。建议在 Boros 仓位上保留保证金缓冲，以降低这一风险。
- **未对冲的腿** — 如果只有一条永续腿成交（或某条腿在没有对冲的情况下被开出），在问题被修正之前你将承担价格风险。执行后请务必确认两条腿都已成交。

## 数据与安全模型

- **你的 API 密钥不会离开你的机器**，唯一的例外是签名后发往 Gate.io 官方 API（`api.gateio.ws`）的请求。密钥保存在 `~/.boros-crossex/config/.env`（macOS）或 `%LOCALAPPDATA%\CrossEx-Boros\config\.env`（Windows），仅你自己的用户账户可读。
- **应用无法通过网络访问。** 服务器仅绑定 `127.0.0.1`，并拒绝 Host/Origin 不是 localhost 的请求。
- **无遥测、无数据分析。** 唯一的对外流量是发往 Gate 官方 API、相关交易所的公开行情接口，以及一个定期对 GitHub 的版本检查请求，用于显示"有可用更新"（可通过 `UPDATE_CHECK=0` 关闭）。
- **无法提现你的资金。** 只要你按照 [设置 CrossEx 与 API Key](./setup-api-key) 中的说明创建 API 密钥，Gate 会在账户层面强制执行这一限制，与应用本身的行为无关。
- **Boros 代理密钥同样无法划转资金。** 用于签署 Boros 订单的委托密钥可以交易该账户，但无法存入或提取资金——这些操作需要你本人的钱包。你可以随时在 Boros rates 面板中点击 **Remove key** 撤销该密钥，且该授权本身带有到期日期。

## 自行验证该软件

该应用是开源的。你可以直接在 [github.com/pendle-finance/arbitrage-with-crossex](https://github.com/pendle-finance/arbitrage-with-crossex) 阅读源代码，或使用 README 中的 [AI 审计提示词](https://github.com/pendle-finance/arbitrage-with-crossex#verify-this-project-yourself-with-ai)，让 AI 助手在你运行任何脚本前先审查安装脚本、卸载脚本以及应用源代码。

## 常见问题

**页面上展示的利率是可执行的报价吗？**
不是。每个利率都是实时变动的，页面上展示的数字都不是可以按固定价格执行的报价。所有利率均按每条腿 10 万美元名义本金、标准（VIP 0）费率档位计价，因此你自己的规模和费率档位会改变实际结果。

**为什么有时利差是负数？**
系统始终展示能获得更高固定利率的那个方向——负数只是说明在该规模下，执行成本（手续费、价格冲击）超过了利差本身，因此不值得交易。

**如果软件出问题怎么办？**
这是开源的实验性软件，不保证提供支持。请自行阅读源代码，或在粘贴密钥之前先让你信任的 AI 助手审计一遍。

## 延伸阅读

- [理解 Boros 上的隐含 APR 与底层 APR](https://pendle.gitbook.io/boros/the-basics/chapter-2-implied-apr-and-underlying-apr)
- [Boros 如何为浮动资金费率提供固定利率支付](https://pendle.gitbook.io/boros/advanced-strategies/hedging-funding-rates-payment)
- [Boros 如何让你从浮动资金费率中获得固定利率](https://pendle.gitbook.io/boros/advanced-strategies/fixed-funding-rates-receivables)
- [固定收益资金费率套利 — Boros Academy](https://docs.pendle.finance/boros-academy/advanced-strategies/fixed-return-funding-arbitrage)
- [Arbitrage with CrossEx 用户指南](https://github.com/pendle-finance/arbitrage-with-crossex/blob/main/docs/USER_GUIDE.md)
- [完整免责声明](https://github.com/pendle-finance/arbitrage-with-crossex/blob/main/docs/DISCLAIMER.md)
