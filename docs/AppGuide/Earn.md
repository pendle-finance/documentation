---
hide_table_of_contents: true
---

# Pendle Earn

Pendle Earn enables you to obtain fixed yield or provide liquidity in a simple interface. Pendle Earn and Trade runs on the same set of contracts with a separate user interface to cater to different audiences.

<iframe width="860" height="615" src="https://www.youtube.com/embed/HIGF1_oot9g?si=6woAjZP8UAYmcCzD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Enabling Pendle Earn

To enable Pendle Earn, toggle the button in the top right corner of the app.

## About Pendle Earn

There are two main sections in Pendle Earn:

1. Fixed Yield
2. Liquidity

As the name suggests, the “Fixed Yield” page allows you to obtain fixed yield from various assets and the “Liquidity” page shows the different pools for you to provide liquidity

## Fixed Yield

### Get Fixed Yield on Pendle

Pendle enables you to obtain fixed yield on various assets. The fixed yield will be redeemable on maturity. Note that your position is not locked and you can exit anytime prior to maturity, however the yield is not guaranteed and fluctuates based on market sentiment if you choose to exit prior to maturity.

### Guide

1. Go to [Fixed Yield](https://app.pendle.finance/earn/fixed-yield) page
2. Select your desired asset
3. Select your desired maturity
4. Select your input asset and amount
Your input asset will be automatically routed to the required asset for the fixed-yield position when you submit the transaction.
5. Submit transaction

### Additional Info

Fixed yield position on Pendle Earn is actually a [PT (Principal Token)](../ProtocolMechanics/YieldTokenization/PT.md) position on Pendle Trade. The Earn interface routes your transaction to purchase PT from the Pendle AMM, which is equivalent to purchasing PT directly on Pendle Trade.

Exiting your Fixed Yield position on Pendle Earn before maturity is equivalent to selling PT to the Pendle AMM. While PT price should trend upwards as time passes, there is no guarantee for its price, hence fixed yield is not guaranteed you exit your fixed yield position prior to maturity.

Since entering / exiting the fixed yield position is equivalent to buying / selling PT on the Pendle AMM, there will be price impact on transactions which affects the fixed-yield receivable. Higher trade sizes will incur higher price impacts. The displayed fixed-yield will also change based on the amount you input.

## Provide Liquidity

### Providing Liquidity on Pendle Earn

You can earn yield by providing liquidity to facilitate trades on Pendle. Unlike the “Fixed Yield” section, yields from liquidity provision fluctuates based on the weekly allocated PENDLE into the pool and total deposits in the pool. Note that your position is not locked and you can withdraw anytime prior to maturity.

Liquidity provision on Pendle also have minimal impermanent loss (IL). From our study, the highest IL observed on Pendle was 0.85%.

### Guide

1. Go to [Liquidity](https://app.pendle.finance/earn/liquidity) page
2. Select your desired asset
3. Select your desired maturity
4. Select your input asset and amount
Your input asset will be automatically routed to the required asset for liquidity provision
5. Submit transaction

### Additional Info

The liquidity farm position on Pendle is actually an LP position on Pendle Trade. The Earn interface routes your transaction to provide liquidity to the Pendle AMM.

Some price impact is expected from this.
