---
pagination_label: "积分交易"
title: "积分交易"
---

import Hint from '@site/src/components/Hint';

# 积分交易

<Hint style="info">
遇到问题？前往我们的[支持](points-support-page)页面！
</Hint>

在 Pendle 上获得杠杆积分、收益，或通过积分交易获得最高固定收益！

## 定义

Pendle 上的积分交易与收益交易的工作方式相同，其中：

* YT 买家获得底层浮动收益和积分
* PT 买家以放弃所有浮动收益和积分为代价获得固定收益
* 流动性提供者在保留积分敞口的同时（启用**保留 YT 模式**），还可从交换费和 Pendle 激励中获得额外收益

<Hint style="info">
换言之，底层积分与底层收益的处理方式相同。这包括对底层收益和积分收取 3% 的 YT 费用。
</Hint>

## YT

购买 YT 的地址：[https://app.pendle.finance/points](https://app.pendle.finance/points)

**每个 YT 让您在到期前获得 1 单位底层资产（1 ETH、1 USDC 等）的收益和积分。**

<Hint style="warning">
YT 在**到期时价值为零**，因为它不再产生任何收益和积分。
</Hint>

<div align="left"><figure><img src="/pendle-academy/imgs/image (16).png" alt="" width="375" /><figcaption></figcaption></figure></div>

在上图中，1 ETH 使您能够购买 13.2 个 YT。换言之，您正在使用 1 ETH 购买 13.2 ETH 价值的 ezETH 收益和积分直至到期。

请注意 Pendle 上的头寸不被锁定，**您可以随时以市价卖出 YT**。点击输入框下方的箭头可以切换输入和输出资产。

## PT

购买 PT 的地址：[https://app.pendle.finance/points](https://app.pendle.finance/points)

**每个 PT 在到期时可以赎回 1 单位存入底层协议的底层资产（例如 1 ETH 价值的 ezETH，1 USDe 价值的 sUSDe，1 DAI 价值的 sDAI 等）。**

<Hint style="info">
由于 PT 的最终价值已知，其当前价格与到期时价值之间的差额就是 PT 的固定收益。
</Hint>

由于 PT 持有者将其所有底层收益和积分放弃给了对应的 YT，PT 的价值以折价交易。到期时，当 YT 停止累积收益和积分后，PT 将恢复完整价值，可以兑换底层资产的全部价值（1 ETH、1 USD 等）。

<div align="left"><figure><img src="/pendle-academy/imgs/image (19).png" alt="" width="375" /><figcaption></figcaption></figure></div>

在上图中，1 ETH 使您能够购买 1.15 PT。换言之，您正在放弃积分以获得到期前有保证的 11.5% 回报。在撰写本文时，这相当于约 30% APY。

请注意 Pendle 上的头寸不被锁定，**您可以随时以市价卖出 PT**。点击输入框下方的箭头可以切换输入和输出资产。

## LP

提供流动性的地址：[https://app.pendle.finance/points](https://app.pendle.finance/points)

Pendle 上的流动性提供者在保留所有积分敞口的同时，还可从 Pendle 获得额外收益。

<Hint style="warning">
**开启保留 YT 模式以保留大部分积分敞口**。
</Hint>

<div align="left"><figure><img src="/pendle-academy/imgs/image (20).png" alt="" width="375" /><figcaption></figcaption></figure></div>

Pendle 上的 LP 头寸由 PT 和底层资产的包装版本组成，例如 PT-eETH/SY-eETH、PT-USDe/SY-USDe（SY 只是底层资产的包装版本，以与 Pendle 架构兼容）。

如果关闭**保留 YT 模式**，您的 YT 将被出售换取更大的 LP 头寸（因此会产生一些价格影响）。这样可以获得更多收益，但由于 LP 头寸中的 PT 不赚取积分，会牺牲积分。

要保留大部分积分敞口，切换到保留 YT 模式以保留您的 YT 头寸。虽然 YT 在到期时归零，但其价值被 LP 头寸内 PT 的价格上涨所抵消。请注意，积分也受到 vePENDLE 增益的影响（即未获得增益的人可能比获得最大增益的人赚得略少）。

总结：Pendle 上的 LP 保留所有收益敞口和积分，同时从交换费和 $PENDLE 激励中获得额外收益。

为了最大化收益和积分，通过锁定 vePENDLE 或使用 Penpie 和 Equilibria 等液态锁定器来提升收益。

## Pendle 上的积分乘数

Pendle 上的某些资产比简单持有底层资产赚取更多积分。此乘数由底层协议提供，随时可能更改。

请参阅[此页面](https://app.pendle.finance/trade/points)获取 Pendle 上各种资产的积分乘数列表。

> 持有裸 SY（即不在 LP 中的 SY）不会赚取任何积分。\
> 这是为了阻止用户在不提供任何实用价值的情况下简单持有 SY，同时对上限产生负面贡献。LP 头寸中的 SY 和 YT 将继续按其乘数赚取积分。

<Hint style="danger">
积分乘数由各自的协议提供。争议应转交给各自的团队，而不是 Pendle。
</Hint>

<figure><img src="/pendle-academy/imgs/image (21).png" alt="" width="375" /><figcaption></figcaption></figure>

在上图中，1 ETH 使您能够购买 9.3 ETH 价值的收益和积分敞口。加上 2 倍 rsETH 乘数，1 ETH 购买：

* **9.35 倍** EigenLayer 积分
* **18.7 倍** Kelp Miles
* 来自 9.35 rsETH 的收益

## 常见问题

请参阅[积分支持页面](points-support-page.md)获取完整 FAQ。在向团队提问之前，请阅读本页和支持页面。

本文档中的信息是正确的。您不需要再次向团队确认。祝您收益（和积分）交易愉快。:relaxed:
