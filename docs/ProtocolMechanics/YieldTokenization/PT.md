---
hide_table_of_contents: true
---

# PT

<iframe width="860" height="615" src="https://www.youtube.com/embed/kOErP_ZUncs" title="Chapter 4: What is Principle Token (PT)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Principal Token (PT) represents the principal portion of an underlying yield-bearing asset. Upon maturity, PT can be redeemed at 1:1 for the accounting asset.  This is the base, principal asset deployed in the underlying protocol such as Lido, Renzo, and Aave (e.g. ETH in stETH, ETH in ezETH, USDC in aUSDC). 

![PT Mechanics](/img/ProtocolMechanics/pt-mechanics.png "PT Mechanics")

Since the collective value of its yield component has been separated, PT can be acquired at a discount relative to its accounting asset. Assuming no swaps, the value of PT will approach and ultimately match the value of accounting asset on maturity when redemption is enabled.

This appreciation in value is what establishes its Fixed Yield APY.

# Redemption Value
In general, yield bearing assets can be broadly categorized as:
1. Rebasing assets - tokens that increase in count/number overtime as yield is accrued
   
   *Examples: stETH, aUSDC* 

2. Interest-bearing assets - tokens that increase in value overtime as yield is accrued
    
   *Examples: ezETH, wstETH*

![Redemption Value](/img/ProtocolMechanics/redemption-value.png "Redemption Value")

In the case of reward-bearing assets, it’s particularly important to note that PT is redeemable 1:1 for the accounting asset, *NOT* the **underlying asset.

For example, the value of Renzo ezETH increases overtime relative to ETH as staking and restaking rewards are accrued. For every 1 PT-ezETH you own, you’ll be able to redeem 1 ETH worth of ezETH upon maturity, *NOT* 1 ezETH which has a higher value**.**

You can double-check the redemption value of PT on [Pendle Trade](https://app.pendle.finance/trade/markets)'s individual asset pages.

# How to Redeem PT

To redeem your PT on maturity:
1. Visit [Pendle Trade Markets](https://app.pendle.finance/trade/markets) and toggle to the “Inactive” markets page
2. Select a market
3. Select an output asset. Pendle will automatically perform Redemption > Swap (if needed) for you