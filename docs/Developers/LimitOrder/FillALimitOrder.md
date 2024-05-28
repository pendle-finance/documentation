# Fill a Limit Order

Takers can fill any signed limit order from the Pendle Limit Order order books by executing the fill order on the smart contract. By using Pendle Limit Order APIs, takers can access liquidity sources without slippage, ensuring secure on-chain settlements.

Pendle exposes 1 API for takers to view active orders to fill them on-chain

[Get limit orders](https://api-v2.pendle.finance/limit-order/docs#/Taker/TakersController_generateLimitOrderData)

# Typescript example

**Note:**: The code examples in the guide below are taken from our demo GitHub repository, which demonstrates the complete end-to-end Limit Order processes in a TypeScript environment.

[Repo](https://github.com/pendle-finance/pendle-examples-public/tree/main/limit-order-api-demo)

### Step 1: Fetch the limit orders

Takers can use Pendle's API to fetch the limit orders and use any fetched orders to fill.

```ts
const requestQuery: LimitOrderQuery = {
  skip: 0,
  limit: 10, // Use skip and limit to fetch the orders, you can fetch upto 100 orders at a request
  chainId: ChainId.ARBITRUM,
  yt: aUSDC_MARKET.yt,
  type: LimitOrderType.TOKEN_FOR_PT,
  sortBy: 'Implied Rate',
  sortOrder: 'asc',
};
```

A single API response can return up to 100 orders. Takers can use the skip and limit parameters to find more orders.

Takers can sort the orders by implied rate (in ascending or descending order) to find the best orders.

For example: If a taker want to find orders sell token for YT, the orders with lower implied rate will be profitable than those with a higher implied rate. So takers can fetch the orders sorted by `Implied Rate` and `sortOrder` set to `asc`.

The returned data will include `netFromTaker`, `netToTaker`, indicating the amount the taker will receive and the amount that will be taken from the taker.

### Step 2: Fill the order

```ts
const sumNetFromTaker = limitOrdersInfo.reduce((acc, limitOrderInfo) => {
  return acc + BigInt(limitOrderInfo.netFromTaker);
}, 0n);

// Maximum amount to be used to fill the order
// We recommend buffer the returned value from BE by 1% because
// the netFromTaker amount will change by time
const maxTaking = (sumNetFromTaker * 101n) / 100n;

const tx = await contract.fill(
  fillParams, // limit of order to fill
  signer.getAddress(), // receiver
  maxTaking,
  '0x',
  '0x'
);
```

There are three main params that you need to fill the limit orders
1. `fillParams`: The list of limit orders and the amount you want to fill (you can partially fill the order)
2. `receiver`: The address that will receive the maker amount from the limit orders.
3. `maxTaking`: The maximum amount the limit order contract can take from the Taker to fill the limit orders.

The maxTaking value indicates the maximum amount the limit order contract can take from the Taker to fill the limit orders.

Because the `netFromTaker` data received from Pendle's backend can be change over time, it's recommended to buffer the maxTaking by 1% of the sumNetFromTaker.

You can find more implementation details in our [demo repository](https://github.com/pendle-finance/pendle-examples-public/tree/main/limit-order-api-demo)
