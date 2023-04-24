---
hide_table_of_contents: true
---

# Simple UI

Pendle provides a simplified user experience that is more accessible to new users. It has the same pools, tokens, and contracts, with a streamlined dApp for two main functions: buying assets at a discount and providing liquidity.

<iframe width="860" height="615" src="https://www.youtube.com/embed/xB4pBhQCwSM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Dashboard

![Pendle Dashboard](/img/using-pendle/dashboard_banner.png "Pendle Dashboard")

The Dashboard gives you a holistic view of your entire portfolio. From the Dashboard, you can 
* View your discounted assets
* View liquidity provided
* Claim LP rewards
* Exit positions 
* Redeem mature PT 

### Tutorial

Claim rewards
1. Go to the [Dashboard page](https://app.pendle.finance/simple/dashboard/)

![My portfolio](/img/using-pendle/my_portfolio.png "My portfolio")

2. Click "Claim Yield and Rewards"

![Claim earnings](/img/using-pendle/claim_earnings.png "Claim earnings")

3. Use the slider in the top right to filter for balance value

4. Select which rewards you would like to claim

5. Check your gas and swap fees, and hit Claim!

## Buy Assets at a Discount

![Buy Assets at a Discount](/img/using-pendle/discount_banner.png "Buy Assets at a Discount")

### How it works

We enable users to purchase assets for less than market price by splitting yield-bearing tokens into principal and yield. The principal of the yield-bearing token is represented by PT until a fixed maturity date, while the entitlement to the yield during that period is represented by YT and is sold to other buyers. With the monetary value of YT separated, the principal asset (i.e. PT) can then be sold at a lower price.

Certain pools may also carry more discount if the underlying asset such as rETH appreciates in price overtime against its base asset like ETH. This results in an even higher discount for PT.

![Tokenization](/img/using-pendle/tokenization_graphic.jpg "Tokenization")

Once the maturity date is reached, the PT can then be claimed for the underlying yield-bearing token. However, even though there is a fixed maturity, you can choose to exit your position and take profit at any time before maturity. By not paying for the yield, the asset can be obtained at less than market price.

For example, ETH sells on Pendle for 5% discount with a 1 year maturity. This means our savvy trader Anton can buy the entitlement to 100 ETH for the price of 95 ETH. After a year, he will be entitled to claim the full 100 ETH.

If Anton decides to exit before the PT matures, he can still sell the discounted ETH, likely at an appreciated value albeit not the full 100 ETH value.

### Tutorial

1. Go to the [Discounts page](https://app.pendle.finance/simple/discounted-assets/)

![Assets at a Discount](/img/using-pendle/assets_at_a_discount.png "Assets at a Discount")

2. Select your desired asset
   
3. Choose your asset’s maturity date

![Asset's maturity date](/img/using-pendle/assets_maturity_date.png "Asset's maturity date")

4. Enter your transaction amount

![Transaction amount](/img/using-pendle/transaction_amount.png "Transaction amount")

5. (Advanced) Control your slippage tolerance by clicking the Gear icon in the top right
   
![Slippage tolerance](/img/using-pendle/slippage_tolerance.png "Slippage tolerance")

6. Check the details of your transaction

![Transaction details](/img/using-pendle/transaction_details_1.png "Transaction details")
![Transaction details](/img/using-pendle/transaction_details_2.png "Transaction details")

7. Approve the transaction and Buy Now!



## Pools

Provide liquidity for Pendle pools and receive swap fees as yield. Different pools have different APYs due to trading volume and PENDLE incentives (determined via governance and voting).

Liquidity providers receive returns from multiple avenues:
* Fixed rate from PT
* Protocol rewards from underlying token
* Swap fees 
* PENDLE incentives


### Tutorial

1. Go to the [Pools page](https://app.pendle.finance/simple/pools/)
   
![Provide liquidity](/img/using-pendle/provide_liquidity.png "Provide liquidity")

2. Select your desired asset

3. Choose the maturity date of the asset

![Choose pool](/img/using-pendle/choose_pool.png "Choose pool")

4. Enter the amount of liquidity you wish to provide

![Enter amount](/img/using-pendle/enter_amount.png "Enter amount")

5. (Advanced) Control your slippage tolerance by clicking the Gear icon in the top right

6. (Advanced) [Stake vePENDLE](https://app.pendle.finance/vependle) to boost your APY

7. Check the details of your LP

![Liquidity provision APY](/img/using-pendle/liquidity_provision_apy_1.png "Liquidity provision APY")

![Liquidity provision APY](/img/using-pendle/liquidity_provision_apy_2.png "Liquidity provision APY")

8. Approve the transaction and Deposit!
