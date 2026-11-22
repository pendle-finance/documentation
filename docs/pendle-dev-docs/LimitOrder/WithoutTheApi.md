---
hide_table_of_contents: true
---

# Without the Pendle API

The Pendle API is a convenience. These actions use only the Limit Order contract, so they work when the API is offline or when you choose not to use it.

## Cancel your orders

- **Cancel one order:** call `cancelSingle(order)` with the order data. Keep a copy of every order you sign, so that you can cancel it without the API.
- **Cancel many orders:** call `cancelBatch(orders)`.
- **Cancel all your orders:** call `increaseNonces()`. Every order with a nonce lower than your new nonce becomes invalid. You do not need the order data.

See [Cancel Limit Orders](./CancelOrders.mdx).

## Fill an order

Any taker who has a valid signed order can call `fill` on the Limit Order contract. Pass the order, its signature and the amount to fill. The contract checks the order and settles the trade.

See [Fill a Limit Order](./FillALimitOrder.md).

## Post an order on-chain

A maker can register an order on-chain with `preSignSingle(order)`, or `preSignBatch(orders)` for many orders. A taker who has the order data can then fill it with an empty signature (`0x`).

See [Create an Order On-Chain](./CreateALimitOrder.md#alternative-create-an-order-on-chain).

## Build the order data yourself

The order struct and its fields are public. You can build and sign an order without the generate-order API. See [Order Struct Definition](./LimitOrderContract.md#order-struct-definition).
