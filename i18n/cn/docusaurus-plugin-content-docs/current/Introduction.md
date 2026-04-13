---
pagination_label: "介绍"
hide_table_of_contents: true
title: 简介
---

# Pendle 简介

<iframe height="400" width="100%" src="https://www.youtube.com/embed/SyjPDpjU6-s" title="Chapter 1: Introduction to Pendle" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

你能确定将 1,000 USDC 存入 Aave 后的收益率是多少吗？1%？3%？5%？

事实上，无法确定。收益率就像代币价格一样波动不定——在牛市中上涨，在熊市中下降，还受各种微观因素的影响进一步震荡。

<figure>
  <img src="/pendle-docs/imgs/historical_yield.jpg" alt="Compound 历史收益率图表" />
  <figcaption>Compound 历史收益率图表，来源：<a href="https://www.theblockcrypto.com/data/decentralized-finance/cryptocurrency-lending/compound-lending-rates">The Block Crypto</a></figcaption>
</figure>

有了 Pendle，你可以随时最大化自己的收益：在牛市中扩大收益敞口，在熊市中对冲收益下行风险。

## Pendle 能做什么？

我们将收益的掌控权交回用户手中。

[Pendle](https://pendle.finance/) 是一个无需许可 (permissionless) 的收益率交易协议，用户可以在此执行各种收益管理策略。它作为二阶衍生品层，构建于 DeFi 生态中现有的核心生息原语之上，并与其深度集成——包括流动性质押代币（LST）、流动性再质押代币（LRT）、稳定币、RWA 等。

Pendle 的智能合约架构是**无需许可的**——任何用户或协议都可以在链上创建新的收益率交易市场。虽然链上创建对所有人开放，但官方 [Pendle UI](https://app.pendle.finance) 上市场的可见性需经过审核，以确保质量与安全。社区成员也可通过[社区上架门户](https://listing.pendle.finance)进行便捷的上架申请。

完整理解 Pendle 需要掌握两大核心部分：

1. 收益代币化

    首先，Pendle 将**生息代币**封装成 **SY**（标准化收益代币），这是底层生息代币的封装版本，与 Pendle AMM 兼容（例如 stETH → SY-stETH）。SY 随后被拆分为本金和收益两个组成部分，分别对应 **PT**（本金代币）和 **YT**（收益代币）。这一过程即为收益代币化，将收益独立代币化为单独的代币。

2. Pendle AMM

    PT 和 YT 均可通过 Pendle 的 **AMM** 进行交易。尽管 AMM 是 Pendle 的核心引擎，但交易 PT 和 YT 并不需要深入了解 AMM 的内部机制。

作为收益衍生品协议，我们正在将传统金融利率衍生品市场（[名义价值超过 400 万亿美元](https://www.bis.org/publ/otc_hy2111/intgraphs/graphA3.htm)）引入 DeFi，让所有人都能参与其中。

通过在 DeFi 中创建收益市场，Pendle 充分释放收益的潜力，让用户能够执行高级收益策略，例如：

- 固定收益（如：在 stETH 上锁定固定收益）
- 做多收益（如：通过购买更多收益敞口押注 stETH 收益上涨）
- 在无额外风险的情况下赚取更多收益（如：用 stETH 提供流动性）
- 以上策略的任意组合，更多执行方法请参阅 [Pendle Academy](/pendle-academy/Introduction)
