---
hide_table_of_contents: true
---

# 铸币

当用户在将资金存入收益来源时，会获得生息资产 (yield-bearing asset)。例如，在Compound中抵押的DAI将得到*cDAI*。在Lido中质押的ETH将得到*stETH*。 

*cDAI*和*stETH*就是**生息资产的示**例。

在Pendle中，生息资产可拆分为两个部分：**本金代币**（PT）**和收益代币**（YT）。PT代表底层生息代币的本金部份，而YT代表该资产的全部利息收益的权益。YT和PT均可以在Pendle上交易。

![Yield Splitting](/img/ProtocolMechanics/yield-splitting.png "Yield Splitting")

Pendle所做的与传统金融中的债券剥离类似 － 债券的本金和利息分离。在这里，PT等效于[零息债券](https://www.investopedia.com/terms/z/zero-couponbond.asp/)，而YT则是分离的[息票](https://www.investopedia.com/terms/c/coupon.asp/) (Coupon)。

用户可以把生息资产（例如stETH）存入Pendle来铸造PT和YT。基础资产（例如ETH）将在铸造PT和YT之前，自动转换为生息资产。

例如，ETH → stETH → SY-stETH → (PT-stETH + YT-stETH)。在选择其中一种资产后，此功能可以在Pro UI中找到。

![Yield Splitting UI](/img/ProtocolMechanics/yield-splitting-ui.png "Yield Splitting UI")

## 使用外部预言机

在二层网络上，需要外部预言机来从以太坊主网获取接受的产生收益资产的合约比率。为此，Pendle 在 Arbitrum 上使用 [RedStone Oracles](https://docs.redstone.finance/docs/smart-contract-devs/price-feeds) 来获取几个市场的合约比率。 

