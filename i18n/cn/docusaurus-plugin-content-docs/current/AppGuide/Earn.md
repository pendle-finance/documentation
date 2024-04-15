---
hide_table_of_contents: true
---

# Pendle Earn

Pendle Earn使您能够通过一个简单的界面获得固定收益或提供流动性。Pendle Earn和Trade使用相同的合约集，但有一个单独的用户界面以满足不同用户的需求。

<iframe width="860" height="615" src="https://www.youtube.com/embed/HIGF1_oot9g?si=6woAjZP8UAYmcCzD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 启用 Pendle Earn

要启用 Pendle Earn，请在应用程序右上角切换按钮。

## 关于 Pendle Earn

Pendle Earn主要有两个部分：

1. 固定收益
2. 流动性

正如名称所示，“固定收益”页面允许您从各种资产中获得固定收益，“流动性”页面显示您可以提供流动性的不同池子。

## 固定收益

### 在 Pendle 上获得固定收益

Pendle使您能够在各种资产上获得固定收益。这种固定收益将在到期时可兑现。请注意，您的仓位不是锁定的，您可以在到期之前随时退出，但如果您选择在到期之前退出，则收益不是保证的，且会根据市场情绪波动。

### 指南

1. 访问[固定收益](https://app.pendle.finance/earn/fixed-yield)页面
2. 选择您想要的资产
3. 选择您想要的到期时间
4. 选择您的输入资产和数量
您输入的资产在提交交易时将自动路由到所需的固定收益资产。
5. 提交交易

### 额外信息

Pendle Earn上的固定收益仓位实际上是在Pendle Trade上的[PT（Fixed Yield）](../ProtocolMechanics/YieldTokenization/PT.md)仓位。Earn界面将您的交易路由到从Pendle AMM购买PT，这等同于直接在Pendle Trade上购买PT。

在到期前退出您在Pendle Earn上的固定收益仓位相当于向Pendle AMM出售PT。虽然PT价格应该随着时间的推移而上升，但没有保证其价格，因此如果您在到期前退出固定收益仓位，则固定收益不是保证的。

由于进入/退出固定收益仓位等同于在Pendle AMM上买卖PT，所以交易会有价格影响，影响固定收益的可接收金额。较大的交易规模将产生较大的价格影响。显示的固定收益也会根据您输入的金额而变化。

## 提供流动性

### 在 Pendle Earn 上提供流动性

您可以通过向Pendle提供流动性来赚取收益，以促进交易。与“固定收益”部分不同，流动性提供的收益会根据每周分配到池中的PENDLE数量和池中的总存款波动。请注意，您的仓位不是锁定的，您可以在到期之前随时提取。

Pendle上的流动性提供也有最小的无常损失（IL）。根据我们的研究，Pendle观察到的最高IL是0.85%。

### 指南

1. 访问[流动性](https://app.pendle.finance/earn/liquidity)页面
2. 选择您想要的资产
3. 选择您想要的到期时间
4. 选择您的输入资产和数量
您输入的资产将自动路由到所需的资产以提供流动性
5. 提交交易

### 额外信息

Pendle上的流动性农场仓位实际上是在Pendle Trade上的LP仓位。Earn界面将您的交易路由到为Pendle AMM提供流动性。

可以预期会有一些价格影响。
