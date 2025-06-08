Pendle SDK is hosted at [https://api-v2.pendle.finance/core/docs](https://api-v2.pendle.finance/core/docs)

Pendle accommodates a vast array of assets, each characterized by its unique nuances and complexities. While the Pendle protocol remains immutable, the underlying assets don't share this feature, requiring our app and SDK to be updated frequently to align with changes in these assets.

To address this, Pendle has introduced a hosted version of our SDK. It ensures the output remains consistent with Pendle's UI and keeps up-to-date with the latest protocol changes. The API design prioritizes simplicity and stability, with a high rate limit to meet the needs of most users.

### Supported functions

- Swap
- Add liquidity
- Remove liquidity
- Mint PT & YT
- Redeem PT & YT
- Transfer liquidity
- Roll over PT
- Add liquidity dual
- Remove liquidity dual
- Mint SY
- Redeem SY

**Example**

To get calldata and info of swapping **1000 USDC** to **PT stETH** in **stETH (0x34280882267ffa6383b363e278b027be083bbe3b)** with 1% slippage:

![SDK swap](/img/Developers/sdk_swap_usdc.png "SDK swap")

```
GET https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/swap?receiver=<RECEIVER_ADDRESS>&slippage=0.01&enableAggregator=true&tokenIn=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&tokenOut=0xb253eff1104802b97ac7e3ac9fdd73aece295a2c&amountIn=1000000000&additionalData=impliedApy
```

In code:
```ts
export async function swapTokenToPt() {
    // Swap 1 USDC to PT in stETH market with 1% slippage
    const res = await callSDK<SwapData>(`/v1/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/swap`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: USDC_ADDRESS,
        tokenOut: PT_ADDRESS,
        amountIn: '1000000000'
    });

    console.log('Amount PT Out: ', res.data.amountOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}
```

To add liquidity of 1 ETH to **stETH (0x34280882267ffa6383b363e278b027be083bbe3b)** with 1% slippage

![SDK add liquidity](/img/Developers/sdk_add_liquidity.png "SDK add liquidity")

```
GET https://api-v2.pendle.finance/core/v1/sdk/1/markets/0x34280882267ffa6383b363e278b027be083bbe3b/add-liquidity?receiver=<RECEIVER_ADDRESS>&slippage=0.01&enableAggregator=true&tokenIn=0x0000000000000000000000000000000000000000&amountIn=1000000000000000000&zpi=false&additionalData=impliedApy
```

In code:

```ts
export async function addLiquiditySingleToken() {
    // Use 1 ETH to add liquidity to stETH pool with 1% slippage
    const res = await callSDK<AddLiquidityData>(`/v1/sdk/${CHAIN_ID}/markets/${MARKET_ADDRESS}/add-liquidity`, {
        receiver: RECEIVER_ADDRESS,
        slippage: 0.01,
        tokenIn: ETH_ADDRESS,
        amountIn: '1000000000000000000'
    });

    console.log('Amount LP Out: ', res.data.amountLpOut);
    console.log('Price impact: ', res.data.priceImpact);

    // Send tx
    getSigner().sendTransaction(res.tx);
}
```

Please visit our [Pendle Hosted SDK demo](https://github.com/pendle-finance/pendle-examples-public/tree/main/hosted-sdk-demo/src) to see more detailed examples.

### Features

#### Routing

Routing is a feature of the Pendle SDK that helps users find the most optimal route to interact with the Pendle system. This feature ensures that users can efficiently execute their transactions by identifying the best paths for their specific needs, whether it's swapping assets, adding or removing liquidity, or any other supported function.

To take advantage of the routing feature, users need to set the `enableAggregator` option to `true`. When this option is enabled, the system will automatically perform routing to find the most optimal route for the user's transaction. This ensures that users always get the best possible outcome when interacting with the Pendle system.

#### Additional data

When an endpoint has an `additionalData` field, users can pass in some fields to receive more data, but it will cost more computing units.

For example, our **swap** endpoint has `additionalData` with two available fields: `impliedApy` and `effectiveApy`. If the query parameters have `additionalData=impliedApy`, the response will have the implied APY before and after the swap action.

For additional usage, please refer to our external swagger to explore more.

#### Migrations

If you are using the old Hosted SDK, please take a look at [our example](https://github.com/pendle-finance/pendle-examples-public/tree/main/hosted-sdk-demo/src/migrations) to migrate to the new system.