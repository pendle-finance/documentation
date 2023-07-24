---
hide_table_of_contents: true
---

# Using Multicall

## Overview

Multicall is the preferred way to call contract methods and get hypothetical results. The Pendle SDK has integrated [Multicall](https://github.com/makerdao/multicall) (from MakerDAO) as a core component. Our multicall component is designed so that it is compatible with [ethers.js’ Contract][ethers-Contract], as well as our own component, can be used everywhere comfortably, but users also have the option to opt-out of using it if they don't want to.

## Usage

### Multicall Creation

```ts
import { Multicall } from '@pendle/sdk-v2';
import { provider } from './sdk-doc-playground.mjs';

const chainId = 1; // 1 for ethereum

const multicall = new Multicall({ chainId, provider });
```

Multicall accepts 2 required parameters in its configuration, which are:
- `chainId: ChainId` — the ID of the chain to use multicall with. See `ChainId` type in [Types and Functions](./TypesAndFunctions.md).
- `provider: Provider` — the connection to the network.

Additionally, it accepts the following optional parameters:
- `callLimit: number = 64` — the maximum number of *calls* to be included in a *multicall*.

### Calling Contract Methods

To use multicall with ethres.js' contract, first wrap it, then call it with `callStatic` (which is the only method).

```ts
import { PendleERC20, PendleERC20ABI, Address } from '@pendle/sdk-v2';
import { Contract } from 'ethers';

// an ERC20 contract object
const USDCAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
const contract = new Contract(USDCAddress, PendleERC20ABI, provider) as PendleERC20;

const contractWithMulticall = multicall.wrap(contract);

async function singleCall(userAddress: Address) {
    return await contractWithMulticall.callStatic.balanceOf(userAddress);
}
```

To test the `singleCall` function, we should pass in some addresses. Some interesting addresses can be taken from [Etherscan's USDC holders page](https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#balances).

```ts
import { toAddress } from '@pendle/sdk-v2';

const USDC_HOLDERS = {
    'Maker: PSM-USDC-A': toAddress('0x0a59649758aa4d66e25f08dd01271e891fe52199'),
    'Polygon (Matic): ERC20 Bridge': toAddress('0x40ec5b33f54e0e8a33a975908c5ba1c14e5bbbdf'),
    'Arbitrum One: L1 Arb - Custom Gateway': toAddress(
        '0xcee284f754e854890e311e3280b767f80797180d'
    ),
    'Binance 14': toAddress('0x28c6c06298d514db089934071355e5743bf21d60'),
} as const;
```

Now to test our function.

```ts
console.log(await singleCall(USDC_HOLDERS['Maker: PSM-USDC-A']));
```

Output:

```ts
BigNumber { value: "431722858735941" }
```

To have the *batching* effect, use it with `Promise.all`.

```ts
async function multicallCall(userAddresses: Address[]) {
    return await Promise.all(
        userAddresses.map((userAddress) => contractWithMulticall.callStatic.balanceOf(userAddress))
    );
}
```

```ts
import { zip } from '@pendle/sdk-v2';

const balances = await multicallCall(Object.values(USDC_HOLDERS));
for (const [holder, balance] of zip(Object.keys(USDC_HOLDERS), balances)) {
    console.log(`${holder} is holding ${String(balance)} USDC`);
}
```

Output:

```ts
Maker: PSM-USDC-A is holding 431722858735941 USDC
Polygon (Matic): ERC20 Bridge is holding 605658369590959 USDC
Arbitrum One: L1 Arb - Custom Gateway is holding 1120124145728251 USDC
Binance 14 is holding 184384382500926 USDC
```

You can even use `singleCall` for batching.

```ts
async function multicallCall2(userAddresses: Address[]) {
    return await Promise.all(userAddresses.map(singleCall));
}
```

### Result Caching

`Multicall#wrap` will only wrap each contract *once*. If the same contract is called with the same multicall instance, the cached result will be returned. The cached result is stored in `Multicall#cacheWrappedContract` weakMap. To access the cached result, you can get from the `cacheWrappedContract` weakMap of the `multicall` instance. For example, we can get the cache result of the above USDC `contract` instance as follows:

```ts
// this will not wrap the contract again, but return the cached result
const cachedResult = multicall.wrap(contract); 
console.log(multicall.wrap(contract) === cachedResult);
```

Output:

```ts
true
```

:::note
The `Multicall#multicallStaticSymbol` is not *static*. It is local to each `multicall` instance.
:::

### Have the user decide whether to use Multicall

We can also have the user decide whether to use Multicall using `Multicall.wrap` function, that accepts an optional parameter `Multicall?`. If it is undefined, the calling method will act just like `callStatic`. That is, no multicall.

```ts
async function singleCallOptional(userAddress: Address, multicall?: Multicall) {
    return await Multicall.wrap(contract, multicall).callStatic.balanceOf(userAddress);
}

async function multicallCallOptional(userAddresses: Address[], multicall?: Multicall) {
    return await Promise.all(
        userAddresses.map((userAddress) => singleCallOptional(userAddress, multicall))
    );
}

// have batching
const balances1 = await multicallCallOptional(Object.values(USDC_HOLDERS), multicall);
// no batching
const balances2 = await multicallCallOptional(Object.values(USDC_HOLDERS));

console.log(balances1);
console.log(balances2);
```

Output:

```ts
[
  BigNumber { value: "431722858735941" },
  BigNumber { value: "605658369590959" },
  BigNumber { value: "1120124145728251" },
  BigNumber { value: "184384382500926" }
]
[
  BigNumber { value: "431722858735941" },
  BigNumber { value: "605658369590959" },
  BigNumber { value: "1120124145728251" },
  BigNumber { value: "184384382500926" }
]
```

## Using `Multicall` with `Router`

`multicall` can be passed to the Pendle SDK's `Router` as follows:

```ts
import { Router } from '@pendle/sdk-v2';
import { testAccounts } from './sdk-doc-playground.mjs';
const router = Router.getRouter({
    chainId: 1,
    provider,
    signer: testAccounts[0].wallet,

    multicall, // pass multicall here
});
```

It is **advisable** to pass Multicall into Pendle SDK `Router` so 
that it can take advantages of the intermediate calculation.

[ethers-Contract]: https://docs.ethers.org/v5/api/contract/contract/
