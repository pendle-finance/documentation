---
hide_table_of_contents: true
---

# Arbitrary Tokens with Pendle SDK Router

## How to use arbitrary tokens

Normally, to interact with the Pendle contracts, a user must hold token that is either _input token_ or _output token_ (which can be obtained via `getTokensIn` and `getTokensOut` methods of [IStandardizedYield contract]). 

Here is an example.

Suppose that we want to add liquidity to the [PT stETH
Pool](https://app.pendle.finance/pro/pools/0xc374f7ec85f8c7de3207a10bb1978ba104bda3b2/zap/in?chain=ethereum).

But this time we want to do it with 100 USDT.

```ts
import { provider, testAccounts } from './sdk-doc-playground.mjs';
import { toAddress, BN, createERC20 } from '@pendle/sdk-v2';
const USDTAddress = toAddress('0xdac17f958d2ee523a2206206994597c13d831ec7');
const USDTContract = createERC20(USDTAddress, {
    chainId: 1,
    provider,
    signer: testAccounts[0].wallet,
});
const USDTDecimals = BigInt(await USDTContract.decimals());

const marketAddress = toAddress('0xc374f7ec85f8c7de3207a10bb1978ba104bda3b2');
const tokenInAddress = USDTAddress;
const amountTokenIn = BN.from(100n * 10n ** USDTDecimals);
const slippage = 0.2 / 100;
```

```ts
import { Router } from '@pendle/sdk-v2';

const router = Router.getRouter({
    chainId: 1,
    provider,
    signer: testAccounts[0].wallet,
});
```

```ts
// Remember to approve our router first!
await USDTContract.approve(router.address, amountTokenIn).then((tx) => tx?.wait());

try {
    await router.addLiquiditySingleToken(marketAddress, tokenInAddress, amountTokenIn, slippage);
    console.log('Success!');
} catch (e) {
    console.log('Error!');
    console.log(e);
}
```

Output:

```ts
Error!
NoRouteFoundError: No route found to add liquidity from 0xdac17f958d2ee523a2206206994597c13d831ec7 to 0xc374f7ec85f8c7de3207a10bb1978ba104bda3b2
    at Function.action (/home/darkkcyan/projects/pendle-sdk-core-v2-docs/node_modules/@pendle/sdk-v2/src/errors.ts:62:16)
    at Router.addLiquiditySingleToken (/home/darkkcyan/projects/pendle-sdk-core-v2-docs/node_modules/@pendle/sdk-v2/src/entities/Router/BaseRouter.ts:461:37)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at async file:///home/darkkcyan/projects/pendle-sdk-core-v2-docs/temp-dir/docs/using-arbitary-tokens-with-router.mts:57:5 {
  tokenInAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  tokenOutAddress: '0xc374f7ec85f8c7de3207a10bb1978ba104bda3b2',
  actionName: 'add liquidity'
}
```

We received the error, because USDT is not one of the SY token in PT stETH pool.

```ts
import { MarketEntity } from '@pendle/sdk-v2';
const marketEntity = new MarketEntity(marketAddress, {
    chainId: 1,
    provider,
    signer: testAccounts[0].wallet,
});
const syEntity = await marketEntity.syEntity();
const tokensIn = await syEntity.getTokensIn();
const isIncluded = tokensIn.includes(USDTAddress);

console.log({ tokensIn, USDTAddress, isIncluded });
```

Output:

```ts
{
  tokensIn: [
    '0x0000000000000000000000000000000000000000',
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
    '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0'
  ],
  USDTAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  isIncluded: false
}
```

To overcome this, Pendle is using [KyberSwap] as the middleware aggregator to swap an arbitrary token into one of the input token, and then the swapped amount will be further used for the operation.

To enable this feature, you can do as follows:

```ts
import { KyberSwapAggregatorHelper } from '@pendle/sdk-v2';
const aggregatorHelper = new KyberSwapAggregatorHelper(router.address, {
    chainId: 1,
    provider,
});

const routerWithAggregatorHelper = Router.getRouter({
    chainId: 1,
    provider,
    signer: testAccounts[0].wallet,

    aggregatorHelper, // <---- aggregator helper is passed here
});
```

Or, alternatively:

```ts
const routerWithAggregatorHelper2 = Router.getRouterWithKyberAggregator({
    chainId: 1,
    provider,
    signer: testAccounts[0].wallet,
});
```

Then you can call the method as normal:

```ts
const tx = await routerWithAggregatorHelper.addLiquiditySingleToken(
    marketAddress,
    tokenInAddress,
    amountTokenIn,
    slippage
);

await tx.wait();

const lpAmount = await marketEntity.balanceOf(testAccounts[0].address);

console.log({ lpAmount });
```

Output:

```ts
{ lpAmount: BigNumber { value: "27526493643865688" } }
```

You can even remove liquidity to a different token than output token of Standardized Yield! Let say we want to remove all the liquidity to USDC.

```ts
const USDCAddress = toAddress('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48');
const USDCContract = createERC20(USDCAddress, { chainId: 1, provider });
await marketEntity.approve(router.address, lpAmount).then((tx) => tx.wait());
await routerWithAggregatorHelper
    .removeLiquiditySingleToken(marketAddress, lpAmount, USDCAddress, slippage)
    .then((tx) => tx.wait());

const USDCBalance = await USDCContract.balanceOf(testAccounts[0].address);
console.log(USDCBalance);
```

Output:

```ts
BigNumber { value: "1100711387" }
```

[IStandardizedYield Contract]: https://github.com/pendle-finance/pendle-core-v2/blob/bc08c7aaf82c7975cf8591aef2fca3fe92a743b2/contracts/interfaces/IStandardizedYield.sol#L135-L143
[KyberSwap]: https://kyberswap.com
