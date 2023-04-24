---
hide_table_of_contents: true
---

# PT

Principal Token (PT) represents the principal portion of an underlying yield-bearing asset. Upon maturity, PT can be redeemed at 1:1 for the underlying asset (e.g. 1 PT-stETH is redeemed for 1 ETH worth of stETH).

![PT Mechanics](/img/ProtocolMechanics/pt-mechanics.png "PT Mechanics")

Since the collective value of its yield component has been separated, PT can be acquired at a discount compared to the underlying asset. Assuming no swaps, the value of PT will approach and ultimately match the value of underlying asset  on maturity when redemption is enabled.

The known final value of PT (relative to the underlying asset) is what establishes its Fixed Yield APY.

For example: 1 PT-stETH will be redeemable for 1 ETH (denominated in stETH).

Additionally, PT is also a core component of all the Pendle AMM pools. You can learn more about the Pendle AMM [here](../AMM.md).
