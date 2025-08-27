---
hide_table_of_contents: true
---

# Order Book

Pendle features an Order Book system alongside its AMM to enable peer-to-peer trading of PT and YT. Users can place limit orders to buy or sell at a specified implied APY. 

Together, the Order Book and AMM enhance market liquidity, facilitating smoother trading on Pendle.

![Order Book](/img/AppGuide/order_book.png "Order Book")

## What is Limit Order

Limit order on Pendle is a purchase / sell order at a specified implied APY. You can set limit orders on PT and YT of supported assets on any chain. 

Most popular market on Pendle has limit order support. 

## Order Execution

A limit order will be executed if the implied APY of the AMM moves towards the order APY. At that moment, any further swaps (taker order) in said implied APY direction will fill the order book first, before proceeding to the AMM. In other words, a limit order deepens liquidity of the AMM at that specific implied APY as swaps will fill the order first before pushing the AMM’s implied APY again. 

Swaps can be partially allocated to the AMM and limit orders (if any) to optimize for price-impact. That amount is determined at the most optimal amount, taking the AMM price impact and gas fees into account. Consequently, smaller orders face a lower likelihood of being filled due to the increased number of transactions required, leading to higher gas fees, particularly on chains with costly gas fees.

Orders can be:
- Active (Partially or fully fillable)
- Executed (Order is fully filled)
- Expired (Order is not fully filled by its expiry date)
- Cancelled 
- Invalid

[Flash swap](https://docs.pendle.finance/ProtocolMechanics/AMM#flash-swaps) capability between PT and YT enhances the Order Book's flexibility by allowing a buy YT taker order to be matched with a buy PT limit order, and vice versa—a sell YT taker order can be matched with a sell PT limit order. This capability significantly broadens potential trading matches, streamlining transactions between PT and YT.

## Order Validity

Only the underlying yield-bearing asset can be used to place a limit order.

Partially Fillable order will be highlighted in a yellow warning. Orders will only be partially fillable when: 
1. The balance of asset in your wallet falls below the order amount but not 0
2. The allowance set from your address is less than the order amount but not 0

Invalid orders will be highlighted in a red warning. Limit orders will be invalid when:
1. The balance of asset in your wallet falls to 0
2. The allowance set from your address is 0

Setting a limit order requires signature from your address while revoking the order involves a transaction to revoke the signature.

## Fees

Fees for swaps on limit order will be the same as if they were done on the AMM. Currently, maker order fee is set to be 0 (taker order fees remain the same). The team has full discretion on when to scale-up fees for maker order.

Fees collected will be distributed in $ETH to vePENDLE voters of its respective pools.

## Arbitrage 

Pendle operates an arbitrage bot that continuously aligns prices between the AMM and the Order Book. This ensures any price discrepancies due to liquidity differences are quickly corrected, maintaining consistent pricing across the two system.
