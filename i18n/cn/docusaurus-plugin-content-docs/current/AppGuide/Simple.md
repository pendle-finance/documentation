---
hide_table_of_contents: true
---

# 简化版 UI 

Pendle 提供一个简化的用户体验，更适合新用户。使用的是相同的池子、代币和合约，但配备简化的 dApp，主要集中于两个功能：以折扣价格购买资产和提供流动性。

<iframe width="860" height="615" src="https://www.youtube.com/embed/xB4pBhQCwSM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Dashboard

![Pendle Dashboard](/img/AppGuide/dashboard_banner.png "Pendle Dashboard")

仪表板为您提供整体的投资组合概览。从仪表板，您可以：
* 查看您的折扣资产
* 查看提供的流动性
* 领取 LP 奖励
* 退出仓位
* 赎回到期的 PT


### 教程​

领取收益／奖励
1. 前往[仪表板页面](https://app.pendle.finance/simple/dashboard/)

![My portfolio](/img/AppGuide/my_portfolio.png "My portfolio")

2. 点击“领取收益和奖励” “Claim Yield and Rewards”

![Claim earnings](/img/AppGuide/claim_earnings.png "Claim earnings")

3. 你可以使用右上角的滑块筛选不同余额值

4. 选择要领取的奖励
  
5. 检查您的燃料和兑换费用，然后点击“领取”！


## 购买折扣资产

![Buy Assets at a Discount](/img/AppGuide/discount_banner.png "Buy Assets at a Discount")

### 如何运作

我们通过将生息型代币拆分为本金(PT)和收益(YT)两部分，使用户能够以低于市场价格的价格购买资产。PT 代表生息型代币的本金部份；而 YT 则代表直到指定到期日期间的利息收益拥有权，并出售给其他买家。由于 YT 的货币价值被分离，所以本金部份（即 PT）可以以更低的价格出售。

如果底层资产（如 rETH）随着时间推移相对于其基础资产（如 ETH）升值，这将导致 PT 的折价更高，则购买这些池子的资产可能也获得更多折扣

![Tokenization](/img/AppGuide/tokenization_graphic.jpg "Tokenization")

在到期日，PT 就可以用于赎取并领回其底层的生息代币。（然而，即使有PT有指定的到期日，**您仍然可以选择在到期之前的任何时间退出您的头寸并获利**。）

由于无需支付利息收益给PT，所以该资产可以低于市场价格获得。

例如，ETH 在 Pendle 上以 5% 的折扣出售，到期日为 1 年。这意味着我们精明的交易员 Anton 可以以 95 ETH 的价格购买 100 ETH 的权益。一年后，他将有权领回全部 100 ETH。

如果 Anton 决定在 PT 到期之前退出，他仍然可以把「折扣ETH」出售，尽管可能是一个介乎买入成本 (95 ETH) 至 100 ETH 之间的价值。

### 教程

1. 转到[折扣页面](https://app.pendle.finance/simple/discounted-assets/)

![Assets at a Discount](/img/AppGuide/assets_at_a_discount.png "Assets at a Discount")

2. 选择您想购买的资产
   
3. 选择您资产的到期日

![Asset's maturity date](/img/AppGuide/assets_maturity_date.png "Asset's maturity date")

4. 键入您的交易金额

![Transaction amount](/img/AppGuide/transaction_amount.png "Transaction amount")

5. （进阶）通过点击右上角的齿轮图标，控制您的滑点容忍度
   
![Slippage tolerance](/img/AppGuide/slippage_tolerance.png "Slippage tolerance")

6. 检查交易的详细信息

![Transaction details](/img/AppGuide/transaction_details_1.png "Transaction details")
![Transaction details](/img/AppGuide/transaction_details_2.png "Transaction details")

7. 批准交易并购买！



## 流动性池

给 Pendle 池子提供的流动性 (LP)，可获得交易费用作为收益。按池子的交易量和 PENDLE 激励（通过治理和投票确定），不同的池具有不同的 APY。

流动性提供者(LP)从多个渠道获得回报：
* 来自池中 PT 的固定利率收益
* 底层代币的协议奖励
* 交易费用
* PENDLE 激励

### 教程

1. 转到[流动性池页面](https://app.pendle.finance/simple/pools/)
   
![Provide liquidity](/img/AppGuide/provide_liquidity.png "Provide liquidity")

2. 选择您想要LP的资产

3. 键入您希望提供的流动性金额

![Choose pool](/img/AppGuide/choose_pool.png "Choose pool")

4. 键入您希望提供的流动性金额

![Enter amount](/img/AppGuide/enter_amount.png "Enter amount")

5. （进阶）通过点击右上角的齿轮图标控制您的滑点容忍度

6. （进阶）[质押 vePENDLE](https://app.pendle.finance/vependle) 来加速(Boost)您的APY

7. 检查详情

![Liquidity provision APY](/img/AppGuide/liquidity_provision_apy_1.png "Liquidity provision APY")

![Liquidity provision APY](/img/AppGuide/liquidity_provision_apy_2.png "Liquidity provision APY")

8. 批准交易并完成存款！
