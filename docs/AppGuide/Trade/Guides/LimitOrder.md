---
hide_table_of_contents: true
---

# Limit Order

## What is Limit-Order

Limit-order on Pendle is a purchase / sell order at a specified implied APY. You can set limit-orders on PT and YT of supported assets on Arbitrum. 

Limit order support on other chains to come soon, stay tuned!

## Order Execution

A limit-order will be executed if the implied APY of the AMM moves towards the order APY. At that moment, any further swaps in said implied APY direction will fill the order-book first, before proceeding to the AMM. In other words, a limit-order deepens liquidity of the AMM at that specific implied APY as swaps will fill the order first before pushing the AMM’s implied APY again. 

Swaps can be partially allocated to the AMM and limit orders (if any) to optimize for price-impact. That amount is determined at the most optimal amount, taking the AMM price impact and gas fees into account.

Orders can be:
- Executed (Order is filled)
- Expired (Order is not filled by its expired)
- Invalid

## Order Validity

Only the underlying yield-bearing asset can be used to place a limit-order.

Invalid orders will be highlighted in a yellow warning. Limit orders will be invalid when:
1. The balance of asset in your wallet falls below the order amount
2. The allowance set from your address is less than the order amount

Setting a limit order requires signature from your address while revoking the order involves a transaction to revoke the signature.

## Fees

Fees for swaps on limit order will be the same as if they were done on the AMM. Currently, maker order fee is set to be 0 (taker order fees remain the same). The team has full discretion on when to scale-up fees for maker order.

Fees collected will be distributed in $ETH to vePENDLE voters of its respective pools.

## Guides

![Limit Order Interface](/img/AppGuide/limit_order.png "Limit Order Interface")
1. Select your desired asset and navigate to the “Limit” tab
2. Input the amount to set aside for limit-order. (Note: for orders to remain valid, your balance should not fall below the amount set here)
3. Input your desired Implied APY and Order Expiry (Note: Order will not execute after the order expiry)
4. Approve and submit your signature
5. Your order status will be shown at **My Active Orders** table at the bottom of the page

![Order Table](/img/AppGuide/order_table.png "Order Table")
1. To cancel your order, click on the red bin logo on the right
2. Your order fill status is shown on the table until its expiry date, where it’ll be shown in **My Order History** table.


