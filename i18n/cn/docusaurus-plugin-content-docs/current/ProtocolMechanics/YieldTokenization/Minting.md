---
pagination_label: "铸造"
title: "铸造"
hide_table_of_contents: true
---

# 铸造

<iframe width="860" height="615" src="https://www.youtube.com/embed/oDZ3JAkcFeM" title="Chapter 3: What is Yield Tokenization" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

用户在将资金存入收益来源时，会获得对应的生息资产。例如，存入 Compound 的 DAI 会被表示为 *cDAI*，存入 Lido 的 ETH 会被表示为 *stETH*。

*cDAI* 和 *stETH* 就是**生息资产**的典型例子。

在 Pendle 中，生息资产被拆分为两个组成部分：本金代币（**PT**）和收益代币（**YT**）。PT 代表底层生息代币的本金，YT 代表对资产全部收益的权利。YT 和 PT 均可在 Pendle 上交易。

![Yield Splitting](/pendle-docs/imgs/ProtocolMechanics/yield-splitting.png "Yield Splitting")

Pendle 的做法类似于传统金融中的债券剥离 (bond stripping)——将债券的本金与利息分离。在此类比下，PT 等同于[零息债券](https://www.investopedia.com/terms/z/zero-couponbond.asp)，而 YT 则等同于被剥离的[票息](https://www.investopedia.com/terms/c/coupon.asp)支付。

用户可通过将生息资产（如 stETH）存入 Pendle 来铸造 PT 和 YT。基础资产（如 ETH）会被自动转换为生息资产，然后再铸造 PT 和 YT。

例如：ETH → stETH → SY-stETH → PT-stETH + YT-stETH。此功能可在选择资产后的 Pendle App 中找到。

![Yield Splitting UI](/pendle-docs/imgs/ProtocolMechanics/yield-splitting-ui.png "Yield Splitting UI")
