---
description: The implied APR crystal ball
---

# Implied APR vs Futures Premium

## Crypto Futures Premium

A futures contract is an agreement to buy or sell an asset at a set price on a future date (i.e. a maturity date). Crypto futures contract tend to trade at a premium vs its spot value, and will eventually converge to its spot value at contract expiry.

<figure><img src="../.gitbook/assets/image (40).png" alt=""><figcaption></figcaption></figure>

To capture the futures premium, traders can execute a cash-and-carry trade (a.k.a Basis trade), where they hold a spot position while simultaneously shorting the futures contract of the same asset until the contract’s expiry.

Using the above screenshot as an example, a trader can hold 1 BTC spot position while simultaneously shorting 1 BTC worth of the futures contract above, effectively earning the 8% APR premium of the contract while being delta neutral (i.e. unaffected by the change in price of BTC). Note that the 8% APR is fixed as long as the trader keeps this position open until contract maturity.

## Funding Rate Basis Trading

Traders can carry out the same cash-and-carry trade strategy via Perpetual contracts as well.

In this scenario, the trader will hold a spot BTC position while shorting a BTC perpetual contract of the same size, effectively earning the funding rate as long the position is open (assuming a positive funding rate). While Perpetual contracts have no maturity as opposed to Futures contracts, this strategy has no guarantee on yield as funding rates can fluctuate significantly.

However as covered in the previous [chapter](fixed-funding-rates-receivables.md), traders can fix their funding rates receivables by shorting YU of the same notional size on Boros. In this scenario, traders executing a cash-and-carry trade strategy on perpetual funding rates can fix their yield on Boros, effectively converting their floating rate exposure into a fixed exposure at the implied APR upon opening their position.

## Implied APR vs Futures Premium

Now lets compare the 2 different strategies listed above:

1. Cash-and-carry trade via Futures\
   This is enabled by holding a spot asset while shorting the futures contract simultaneously, **earning a fixed yield from the quarterly futures premium** until the contract expiry.
2. Cash-and-carry trade via Perpetuals and Boros \
   This is enabled by holding a spot asset while shorting the perpetuals contract simultaneously, earning yield from funding rates. The trader can then open a short position on Boros to **earn a fixed yield at the implied APR** upon opening the position until maturity.

Notice that the above strategies have extremely similar behaviors and in fact, crypto futures premium movement have historically been rather correlated to funding rates.

With Boros, traders can now execute cash-and-carry trade strategies on either perpetuals or futures to achieve a delta neutral exposure while earning fixed yields. Barring contract risks, both of these strategies have similar market exposure + fixed yields. With that, perhaps futures premium might be a good indicator of implied APR of the same asset? 🤔

{% hint style="success" %}
Futures premium might be a good indicator of implied APR as traders can execute a cash-and-carry trade strategy of similar risk profile with the same fixed yield outcome.

If there is a disparity between the implied APR on Boros vs Futures Premium of a given asset, cash-and-carry traders will likely execute the strategy with the more favorable APR and unwind the less favorable one.
{% endhint %}
