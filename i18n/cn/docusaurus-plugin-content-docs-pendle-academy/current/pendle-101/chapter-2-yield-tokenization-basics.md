---
pagination_label: "第 2 章 - 收益代币化基础"
title: "第 2 章 - 收益代币化基础"
---

import Hint from '@site/src/components/Hint';

# 第二章 - 收益代币化基础

> 课程级别：**#初级**

<iframe height="400" width="100%" src="https://www.youtube.com/embed/oDZ3JAkcFeM" title="Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

## 简而言之

收益代币化是指将收益资产拆分为**本金**和**收益**两个组成部分。

收益资产是指随时间产生收益的资产（例如 stETH、Uniswap LP 代币、sDAI 等）。为了更好地说明这一点，我们可以以**房地产**为例。房产是一种收益资产，它为房主产生租金收益。

现在想象一下，一处房产被拆分为两个部分：

* 房产所有权。您可以将其视为**本金**。
* 租金收益权，可以让其持有者在特定时间内收取房产产生的所有租金收益（即收益）。您可以将其视为**收益**。

<figure><img src="/pendle-academy/imgs/image (35).png" alt="" /><figcaption><p>1 PT + 1 YT = 1 底层资产</p></figcaption></figure>

在任何时候，您都可以将两者合并以获得完整的房产：

<Hint style="info">
以 stETH 为例：**本金**（stETH 本金权利）+ **收益**（stETH 收益权利）= **收益资产**（stETH）
</Hint>

当您将收益代币化后，您甚至可以在到期前出售或交易收益部分。这创造了管理甚至投机收益的新方式。

假设到期日为 1 年后：

<figure><img src="/pendle-academy/imgs/image (39).png" alt="" /><figcaption></figcaption></figure>

* 您可以以**低于实际房产**的价格购买所有权权利。1 年后，该权利允许您赎回房产。从折价的纸面所有权到拥有其全部价值之间的保证价值增长，构成了固定收益/收入。

<figure><img src="/pendle-academy/imgs/image (38).png" alt="" /><figcaption></figcaption></figure>

* 您也可以只购买收益部分（租金收款权），在 1 年内获得租金。假设这花费了 5000 美元，当您在这一年内收取超过 5000 美元时，您将获利；而当收益不足时则会亏损。购买这部分让您可以投机房产"收益"。认为租金价格即将上涨并想获得一些敞口？购买"收益"而不是支付整个房产价格。

<Hint style="info">
💡 Pendle 是一个市场，房产所有者可以在这里分别拆分和交易其本金（底层资产的权利）和收益（租金收款权利）。

本金和收益头寸均可在任何时候出售（无锁定），甚至在到期前也可以。
</Hint>

## Pendle 中的 PT 与 YT

DeFi 池在您质押或存入代币后会给您一个收益头寸作为回报。

在 Pendle 中，收益头寸可以拆分为两个部分：

* **YT（收益代币，Yield Token）-> 代表头寸的收益应收款**
* **PT（本金代币，Principal Token）-> 代表本金金额**

当收益被代币化时，代币化会有一个**到期日**，如下图所示。

<figure><img src="/pendle-academy/imgs/image (97).png" alt="" /><figcaption></figcaption></figure>

PT 和 YT 的美元价值之和应等于其底层资产，因为它们是整体的各个部分。您可以通过存入等量的 PT 和 YT 来赎回底层资产。到期时，PT 可以在没有对应 YT 的情况下赎回其底层资产（这是因为到期的 YT 价值为零，因为它们不再产生收益）。

<Hint style="info">
💡 您可以通过在市场页面选择 Pendle 上的任何资产，然后选择页面左侧的"铸造"选项卡，在 Pendle 上对收益代币进行代币化。
</Hint>

<figure><img src="/pendle-academy/imgs/image (98).png" alt="" width="375" /><figcaption><p>铸造 PT 和 YT（收益代币化）</p></figcaption></figure>

### **PT 和 YT 究竟是什么？**

以下是 **PT** 和 **YT** 的定义：

* **1 YT 赋予您在到期前获得 1 单位记账资产（例如 1 ETH、1 DAI、1 USDe 等）收益的权利，可实时领取。**
* **1 PT 赋予您在到期时赎回 1 单位记账资产（例如 1 ETH、1 DAI、1 USDe 等）的权利。**

以 Ethena 的 sUSDe 为例，PT 和 YT 的命名规则为：

* 1 YT-sUSDe (USDe)
* 1 PT-sUSDe (USDe)

根据此示例，PT 和 YT 的定义为：

* 1 YT-sUSDe (USDe) -> 获得 1 USDe 价值的 sUSDe 收益
* 1 PT-sUSDe (USDe) -> 可赎回 1 USDe 价值的 sUSDe
* 1 YT-HLP (USDC) -> 获得 1 USDC 价值的 HLP 收益
* 1 PT-HLP (USDC) -> 可赎回 1 USDC 价值的 HLP

<iframe height="400" width="100%" src="https://www.youtube.com/embed/kOErP_ZUncs" title="Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

<iframe height="400" width="100%" src="https://www.youtube.com/embed/RHuqNScvrnw" title="Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

### PT 和 YT 有哪些用途？

#### 到期前：

1.  PT 和 YT 可以从底层资产铸造。\


    <figure><img src="/pendle-academy/imgs/image (100).png" alt="" width="530" /><figcaption></figcaption></figure>
2.  PT 和 YT 可以赎回回其底层资产\


    <figure><img src="/pendle-academy/imgs/image (102).png" alt="" width="534" /><figcaption></figcaption></figure>
3.  YT 持有者可以实时领取任何已累积的收益。\


    <figure><img src="/pendle-academy/imgs/image (103).png" alt="" width="542" /><figcaption></figcaption></figure>

#### 到期后

*   PT 持有者可以 1:1 赎回底层资产，无需 YT。\


    <figure><img src="/pendle-academy/imgs/image (104).png" alt="" width="527" /><figcaption></figcaption></figure>

#### **随时**

您可以在公开市场上**买卖 PT 和 YT**。因此，PT 和 YT 始终有市场价格。我们将在接下来的章节中更多地讨论 PT 和 YT 的交易。

### **PT / YT 等式**

<Hint style="success">
PT 价格 + YT 价格 = 记账资产价格
</Hint>

由于 **1 单位底层资产可铸造 1 PT + 1 YT**，而 **1 PT + 1 YT 可赎回 1 单位记账资产**，因此它们的价格之间存在明显关系：

Pendle AMM 确保这种关系始终成立。

***

## TradFi 中的 PT 和 YT 类比

在传统金融（TradFi）中，Pendle 所做的类似于债券剥离。债券的本金和利息被分离，因此 PT 等同于[零息债券](https://www.investopedia.com/terms/z/zero-couponbond.asp)，而 YT 则是分离的[息票](https://www.investopedia.com/terms/c/coupon.asp)。

#### PT 是 DeFi 中的零息债券

<figure><img src="/pendle-academy/imgs/image (44).png" alt="" width="375" /><figcaption></figcaption></figure>

零息债券是一种在债券存续期间不向债券持有人支付任何利息的债券类型。相反，债券以**大幅折价**于其面值出售，**债券持有人在债券到期时收到完整的面值**。购买价格与面值之间的差额即为投资者的回报或利润。例如，如果您以 800 美元购买面值 1000 美元、3 年后到期的零息债券，您将在到期时收到 1000 美元，并在 3 年投资期内赚取 200 美元的利润。

<Hint style="info">
同样，您不需要持有债券到期，可以随时在公开市场以市场价格出售。
</Hint>

#### YT 是 DeFi 中的分离息票

分离息票是从债券上分离出来的、可以单独交易或出售的部分。息票债券是一种向债券持有人支付定期利息的债券类型，直到债券到期为止。利息支付被称为息票，通常附着在债券证书上。分离息票是**从证书上剪下来**并**可由任何持有者兑现为现金**的息票。例如，如果您有一张每年支付 50 美元、持续 3 年的息票债券，并将息票分离，您可以将其出售给希望在 3 年内领取这 150 美元的人。以低于 150 美元的价格购买分离息票的人在 3 年内可以获利。

<Hint style="info">
💡 分离息票也可以随时以市场价格在公开市场出售。
</Hint>

> 延伸阅读：[Coupon Bond Vs. Zero Coupon Bond: What's the Difference? (investopedia.com)](https://www.investopedia.com/ask/answers/06/zerocouponregularbond.asp)
