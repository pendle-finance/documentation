# Create a Limit Order

Pendle Limit Order system allows makers to create limit orders without using gas. To achieve this, makers' signed orders are stored off-chain and will be filled by the takers on-chain.

To be able to create a limit order and submit it to the Pendle Limit Order system, you can follow these steps:

1. Generate the limit order data
2. Sign the limit order data
3. Post the limit order data and its signature to the Pendle Limit Order system

Pendle exposes 2 APIs to help makers create orders more easily
1. [Generate limit order data](https://api-v2.pendle.finance/limit-order/docs#/Maker/MakersController_generateLimitOrderData)
2. [Post limit order](https://api-v2.pendle.finance/limit-order/docs#/Maker/MakersController_createOrder)

## TypeScript Example

**Note:** The code examples in the guide below are taken from our demo GitHub repository, which demonstrates the complete end-to-end Limit Order processes in a TypeScript environment.

[Repo](https://github.com/pendle-finance/pendle-examples-public/tree/main/limit-order-api-demo)

### Step 1: Generate limit order data

[Order data definition](./LimitOrderContract.md#order-struct-definition)

To place a limit order, the maker needs to generate this Order struct, which requires several details. Pendle provides a backend API that helps generate this data more easily. By providing the necessary information (`orderType`, `token`, `maker`, `impliedAPY`), the API returns the full limit order data for the maker.

Makers can generate the complete data themselves, but the API simplifies the process by handling complex fields like `salt`, `failSafeRate`, `nonce`, etc.
```ts
const requestBody: GenerateLimitOrderDataRequest = {
  chainId: ChainId.ARBITRUM,
  YT: aUSDC_MARKET.yt,
  maker: signerAddress,
  orderType: LimitOrderType.TOKEN_FOR_PT,
  token: aUSDC_MARKET.tokenIn.usdc, // Use USDC as token in to swap to PT
  makingAmount: '10000000', // 10 USDC
  impliedApy: 0.1, // 10% implied APY
  expiry: String(Math.floor(Date.now() / 1000) + 20 * 60), // order will be expired in 20 minutes
};
```

Full details of all limit order data can be found via the `GenerateLimitOrderDataResponse` on our [API specification](https://api-v2.pendle.finance/limit-order/docs#/)

Note that you need to ensure you have sufficient balance and allowance to create the limit order; otherwise, the API will return a 400 error.

### Step 2: Sign limit order data

```ts
const signature = await signer.signTypedData(limitOrderDomainArbitrum, typesLimitOrder, data);
```

You can find the full example of signing a limit order using the ethers.js library on our [API demo repository](https://github.com/pendle-finance/pendle-examples-public/tree/main/limit-order-api-demo)

### Step 3: Post the limit order

After signing the limit order data, you can send the limit order data along with the signature to our Backend API

```ts
const requestBody: CreateLimitOrderRequest = {
  ...generatedLimitOrderData,
  yt: generatedLimitOrderData.YT,
  type: generatedLimitOrderData.orderType,
  signature,
};
```

All the implementation details can be found in the [API demo repository](https://github.com/pendle-finance/pendle-examples-public/tree/main/limit-order-api-demo)

## Alternative: Create an Order On-Chain

In addition to off-chain signing, makers can register an order directly on-chain by calling `preSignSingle` (or `preSignBatch` for multiple orders) on the Limit Router. This is mainly useful for:

- **Smart-contract makers** that cannot produce an ECDSA signature off-chain.
- **ERC-1271 contracts** that prefer to register orders explicitly instead of relying on `isValidSignature` at fill time.

> **ERC-1271 contracts can skip the on-chain pre-sign step entirely.** When the taker passes an empty signature, the Limit Router's ECDSA recovery fails and falls back to `IERC1271(maker).isValidSignature(hash, signature)`. A maker contract can therefore authorize an order simply by whitelisting its hash internally — no transaction to the Limit Router is required. See [Signature Validation](./LimitOrderContract.md#signature-validation) for the full flow.

### Steps

1. Generate the order data (same `Order` struct as the off-chain flow — see [Order Struct Definition](./LimitOrderContract.md#order-struct-definition)). You can still use the [generate-limit-order-data API](https://api-v2.pendle.finance/core/docs#tag/limit-orders/post/v1/limit-orders/makers/generate-limit-order-data) — just skip the signing step.
2. Call `preSignSingle(order)` from the `maker` address.

Once an order is pre-signed, takers fill it the same way as a normally signed order, but they may pass an empty signature (`'0x'`) in `FillOrderParams.signature`. See [Signature Validation](./LimitOrderContract.md#signature-validation) for details.

