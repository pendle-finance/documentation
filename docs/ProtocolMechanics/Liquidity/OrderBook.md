---
hide_table_of_contents: true
---

# Order Book

## What is Limit-Order

Limit-order on Pendle is a purchase / sell order at a specified implied APY. You can set limit-orders on PT and YT of supported assets on Arbitrum. 

Limit order support on other chains to come soon, stay tuned!

## Order Execution

A limit-order will be executed if the implied APY of the AMM moves towards the order APY. At that moment, any further swaps in said implied APY direction will fill the order-book first, before proceeding to the AMM. In other words, a limit-order deepens liquidity of the AMM at that specific implied APY as swaps will fill the order first before pushing the AMM’s implied APY again. 

Swaps can be partially allocated to the AMM and limit orders (if any) to optimize for price-impact. That amount is determined at the most optimal amount, taking the AMM price impact and gas fees into account.

Orders can be:
- Active (Partially filled and still valid)
- Executed (Order is fully filled)
- Expired (Order is not fully filled by its expiry date)
- Cancelled 
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
