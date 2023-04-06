---
hide_table_of_contents: true
---

# Pools

## Zero Price Impact Zap Mode

!["Zero Price Impact Mode"](/img/AppGuide/zero-price-impact-mode.png "Zero Price Impact Mode")

On Pendle, LPs have the option to activate **Zero Price Impact Mode**, which allows them to provide liquidity to the PT/SY pool without affecting the price. Normally, when liquidity is added, a portion of the underlying asset is used to purchase PT from the PT/SY pool and the rest is wrapped into SY. However, this purchase of PT can cause a price impact.

With **Zero Price Impact Mode** enabled, the underlying asset is fully wrapped into SY, a portion of which is used to mint PT and YT. The PT and remaining SY are then used for liquidity provision, with the YT returned to the user's wallet. This eliminates the step of purchasing PT, thereby avoiding any potential price impact.

However, you will be exposed to price impact when input assets are swapped into underlying tokens.

## Redeem Rewards Bundle

!["Redeem Rewards Bundle"](/img/AppGuide/redeem-rewards-bundle.png "Redeem Rewards Bundle")

By toggling “Claim All Pool Rewards” on the Zap Out page, Pendle Pro users can save on gas by claiming rewards AND removing liquidity/zapping out at the same time - in just one single transaction.
