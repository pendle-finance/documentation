# Cancel Limit Orders

Makers can send a transaction to the Limit Order contract to cancel their orders. This action prevents those orders from being settled by the contract.

There are two methods for makers to cancel their orders:

1. Cancel specific orders: Target individual orders for cancellation.
2. Increase nonce: Cancel all orders with a nonce less than the current maker's nonce.
3. 
Pendle provides an API to help makers find their active orders, allowing them to cancel orders more easily.
[Get maker's active orders](https://api-v2.pendle.finance/limit-order/docs#/Maker/MakersController_getMakerLimitOrder)

# Typescript example

**Note:**: The code examples in the guide below are taken from our demo GitHub repository, which demonstrates the complete end-to-end Limit Order processes in a TypeScript environment.

[Repo](https://github.com/pendle-finance/pendle-examples-public/tree/main/limit-order-api-demo)

## Cancel specific order

### Step 1: Find the maker's active orders

To cancel specific orders, you need the data for those orders. Makers can use the Pendle API to retrieve their active order data.

```ts
  const requestQuery: LimitOrderMakerQuery = {
    skip: 0,
    limit: 10,
    chainId: ChainId.ARBITRUM,
    maker: await getSigner().getAddress(),
    isActive: true
  }

```

You can find a complete example of how to get a maker's active orders in our [API demo repository](https://github.com/pendle-finance/pendle-examples-public/tree/main/limit-order-api-demo)

### Step 2: Cancel the orders

Once you have the limit order data, you can send this data to the Limit Order contract to cancel specific orders.

```ts
const tx = await contract.cancelSingle(order);
```


You can find a complete example of how to cancel an order in our [API demo repository](https://github.com/pendle-finance/pendle-examples-public/tree/main/limit-order-api-demo)

## Increase nonce

Each order has a `nonce` field. When creating a limit order, this field is typically set to the current maker's nonce.

All orders with a nonce lower than the current maker's nonce become invalid. Makers can increase their nonce in the Limit Order contract to cancel all orders with a lower nonce (assuming they were created with the maker's nonce at the time of creation).

```ts
const tx = await contract.increaseNonces();
```

You can find a complete example of how to increase the nonce in our [API demo repository](https://github.com/pendle-finance/pendle-examples-public/tree/main/limit-order-api-demo)
