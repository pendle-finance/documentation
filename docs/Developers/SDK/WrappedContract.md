---
hide_table_of_contents: true
---

# WrappedContract

## Overview

Pendle SDK is built on top of [Ethers](https://docs.ethers.io/v5/). While being versatile, Ethers lacks some specific functionalities, such as calling contracts with multicall and catching our contract’s errors. Using Ethers’ Contract objects directly is often less reusable, as sometimes we want to estimate the consumed gas, or get the result instead of making a transaction, but with the same logic as making the transaction. To solve these problems, we decided to make wrap Ethers’ Contract object to create a high-level object, making the contract interaction process more convenient. 

## Usage

### WrappedContract Creation

To create a `WrappedContract`, use the function `createContractObject`. In the following example, contract objects for the USDC token.

```ts
import { createContractObject, toAddress } from '@pendle/sdk-v2';
import { PendleERC20, PendleERC20ABI } from '@pendle/sdk-v2';
import { providers, Wallet } from 'ethers';

const USDCAddress = toAddress('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48');
const provider = new providers.StaticJsonRpcProvider();
const signer = Wallet.createRandom().connect(provider);
const chainId = 1;

const readonlyWrappedContract = createContractObject<PendleERC20>(USDCAddress, PendleERC20ABI, { provider }); 
const readWriteWrappedContract = createContractObject<PendleERC20>(USDCAddress, PendleERC20ABI, { signer });
```

This function accepts a type parameter `C`, which is the generated contract's typechain type. Next is the contract’s addresses, and its ABI. The final parameter is the configuration.

The configuration has the `signer` and `provider` similar to the configuration of `PendleEntity`. See [ERC20 contract interaction tutorial with Pendle SDK](./ERC20Interaction.md), as well as the `NetworkConnection` type in [Types and Functions](./TypesAndFunctions.md).

By default, this function returns `WrappedContract<C>`, but it can also return Ethersj.s' Contract, if `doWrap: false` is passed to the configuration.

```ts
// Will have type PendleERC20 instead of WrappedContract<PendleERC20>
const ethersJsContract: PendleERC20 = createContractObject<PendleERC20>(USDCAddress, PendleERC20ABI, { signer, doWrap: false });
```

### Basic Contract Interaction

A `WrappedContract` object also has *the same* meta classes as ethersjs’ Contract, and they can be used the same way! Here is an example for the read function.

```ts
import { Address, BigNumberish, ContractLike } from '@pendle/sdk-v2';

async function exampleReadFunctions(contract: ContractLike<PendleERC20>, user1: Address, user2: Address) {
  // call methods right from the contract object
  const user1Balance = (await contract.balanceOf(user1)).toString();
  const symbol = await contract.symbol();
  const name = await contract.name();
  
  // call static
  const user2Balance = (await contract.callStatic.balanceOf(user2)).toString();

  // estimate gas
  const allowanceGasUsed = (await contract.estimateGas.allowance(user1, user2)).toString();
  return {
    user1Balance,
    user2Balance,
    symbol,
    name,
    allowanceGasUsed, 
  };
}
```

To see the functions in action, we can use the following addresses taken from the [top USDC holder page](https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#balances)

```ts
const user1 = toAddress('0x0a59649758aa4d66e25f08dd01271e891fe52199');
const user2 = toAddress('0xf977814e90da44bfa03b6295a0616a897441acec');

// works with both Ethersjs' Contract and WrappedContract

try {
  console.log('readonly wrapped contract', await exampleReadFunctions(readonlyWrappedContract, user1, user2));
  console.log('read write wrapped contract', await exampleReadFunctions(readWriteWrappedContract, user1, user2));
  console.log('ehtersjs contract', await exampleReadFunctions(ethersJsContract, user1, user2));
} catch (e) {
  console.error(e);
}
```

Output:

```ts
readonly wrapped contract {
  user1Balance: '431722858735941',
  user2Balance: '6390000000',
  symbol: 'USDC',
  name: 'USD Coin',
  allowanceGasUsed: '31726'
}
read write wrapped contract {
  user1Balance: '431722858735941',
  user2Balance: '6390000000',
  symbol: 'USDC',
  name: 'USD Coin',
  allowanceGasUsed: '31726'
}
ehtersjs contract {
  user1Balance: '431722858735941',
  user2Balance: '6390000000',
  symbol: 'USDC',
  name: 'USD Coin',
  allowanceGasUsed: '31726'
}
```

The write function can also be done in the same way. But please do not run them if you do not intend to in this example!

```ts
async function exampleWriteFunctions(contract: ContractLike<PendleERC20>, receiver: Address, amount: BigNumberish) {
  // functions
  await contract.functions.approve(receiver, amount);

  // call methods right from the contract object
  await contract.transfer(receiver, amount);
}

// exampleWriteFunctions(readWriteWrappedContract, user1, tesAmount);
// exampleWriteFunctions(ethersJsContract, user1, testAmount);
```

Though the interfaces are the same, there is a key difference: when there is an error, Pendle SDK will throw a custom error, especially for Pendle Contracts. See [Error handling](./ErrorHandling.md).

### Multicall Support

#### `multicallStatic` meta-class

```ts
import { Multicall, MulticallOverrides } from '@pendle/sdk-v2';
```

The `WrappedContract` object has an additional meta-class called `multicallStatic`. It has the same function as the `callStatic` meta-class, but the signature is a bit different.

The signature of a `callStatic` method will have the following form:
```ts
callStaticMethod(arg1, arg2, ..., overrides?: Override): Promise<Result>;
```
The signature of a `multicallStatic` method will have the following form instead:

```ts
multicallStaticMethod(arg1, arg2, ..., multicallStaticParams?: MulticallStaticParams): Promise<Result>;
```

Where

```ts
type MulticallStaticParams = {
  multicall?: Multicall;
  overrides?: MulticallOverrides;
};
```

The `multicallStatic` is guaranteed to work **correctly**. If `multicall` is not specified, the methods of this meta-class will act as `callStatic`.

Similarly to a `PendleEntity`, like our `ERC20` entity (see [ERC20 contract interaction tutorial with Pendle SDK](./ERC20Interaction.md)), there are two way to use `multicall`.

#### Initialize the `WrappedContract` with `Multicall`

Pass the `Multicall` instance to the configuration of `createContractObject`. Then use `multicallStatic` to have the *batching* effects of multicall.

```ts
{
  async function wrappedContractWithMulticall(contractAddress: Address, userAddress: Address) {
    const multicall = new Multicall({ chainId, provider });
    const contract = createContractObject<PendleERC20>(contractAddress, PendleERC20ABI, {
      provider,
      multicall  // pass it here
    });
    
    const [name, symbol, decimals, userBalance] = await Promise.all([
      contract.multicallStatic.name(),
      contract.multicallStatic.symbol(),
      contract.multicallStatic.decimals(),
      contract.multicallStatic.balanceOf(userAddress),
    ]);
    return { name, symbol, decimals, userBalance: userBalance.toString()};
  }

  try {
    console.log(await wrappedContractWithMulticall(USDCAddress, user1));
  } catch (e) {
    console.error(e);
  }
}
```

Output:

```ts
{
  name: 'USD Coin',
  symbol: 'USDC',
  decimals: 6,
  userBalance: '431722858735941'
}
```

:::note
`Promise.all` should be used to have the *batching* effect.
:::

#### Pass `Multicall` to `multicallStatic` methods

`Multicall` instance can also be passed to the calling methods.

```ts
{
  async function wrappedContractWithMulticall(contractAddress: Address, userAddress: Address) {
    const multicall = new Multicall({ chainId, provider });
    const contract = createContractObject<PendleERC20>(contractAddress, PendleERC20ABI, {
      provider,
    });
    
    const [name, symbol, decimals, userBalance] = await Promise.all([
      contract.multicallStatic.name({multicall}),
      contract.multicallStatic.symbol({multicall}),
      contract.multicallStatic.decimals({multicall}),
      contract.multicallStatic.balanceOf(userAddress, {multicall}),
    ]);
    return { name, symbol, decimals, userBalance: userBalance.toString()};
  }

  try {
    console.log(await wrappedContractWithMulticall(USDCAddress, user1));
  } catch (e) {
      console.error(e);
  }
}
```

Output:

```ts
{
  name: 'USD Coin',
  symbol: 'USDC',
  decimals: 6,
  userBalance: '431722858735941'
}
```

:::note
If the contract is already initialized with `Multicall`, but another `Multicall` instance is passed into the `multicallStatic` methods, **the passed one will be used**. So one `WrappedContract` instance can be used with different `Multicall` instance in different contexts.

We encourage using the _`Multicall` to `multicallStatic` methods_ style for developing new functions, as the contract can always be called with the user's defined `Multicall` in different contexts.
:::

#### `metaCall` meta class

Similar to an ERC20 entity, all PendleEntity classes will support calling write functions with meta-methods. See [ERC20 contract interaction tutorial with Pendle SDK](./ERC20Interaction.md), the Meta-methods section for examples.

To aid the development of these write functions, `WrappedContract` methods can also be called directly with meta-methods via the meta-class `metaCall`. 

The methods of `metaCall` will have the following signature:

```ts
contract.metaCall.methodName(arg1, arg2, ..., metaMethodType?: MetaMethodExtraParam): MetaMethodReturnType;
```

Where

```ts
type MetaMethodExtraParams<T extends MetaMethodType = 'send'> = MulticallStaticParams & {
  method?: T;
  gasLimitBufferingPercent?: number;
};

type MetaMethodType = 'send' | 'callStatic' | 'estimateGas' | 'meta-method' | 'multicallStatic' | 'populateTransaction' | 'extractParams';
```

And `MetaMethodReturnType` is a helper type that will be defined for each `MetaMethodType`.

Here is a table for the actual return type for each `MetaMethodType`.

| MetaMethodType | The meta-class to be mimicked | Specific return type |
| --- | --- | --- |
| `send` | `contract.functions` | `Promise<ContractTransaction>` for write-methods. `Promise<R>` for read-methods. |
| `callStatic` | `contract.callStatic` | `Promise<R>` |
| `estimateGas` | `contract.estimateGas` | `Promise<BigNumber>` |
| `multicallStatic` | `contract.multicallStatic` | `Promise<R>` |
| `populateTransaction` | `contract.populateTransaction` | `Promise<PopulatedTransaction>` |
| `extractParams` | `contract.interface.decodeFunctionData` | `Promise<any[]>` |
| `meta-method` | `contract.metaCall` | `ContractMetaMethod` |

Here `Promise<R>` is the return type of the contract methods. For example, for ERC20 contract, `balanceOf` will return `Promise<BigNumber>`, `name()` and `symbol()` will return `Promise<string>`. `Promise<any[]>` is the return type of params extraction. For example, for `transfer` method of a ERC20 contract, the return type will be `Promise<[to: string, amount: BigNumberish, overrides?: CallOverrides | undefined]>`.

When the `metaMethodType` is `undefined`, the method act like `send.`

See [`type MetaMethodReturnType`](http://playground.pendle.finance/sdk-docs/types/MetaMethodReturnType.html) for a more formal specification of `MetaMethodReturnType`, and [`class ContractMetaMethod`](http://playground.pendle.finance/sdk-docs/classes/ContractMetaMethod.html) for additional features of `ContractMetaMethod`.

## Quick Example

```ts
import { WrappedContract } from '@pendle/sdk-v2';

async function metaCallExample(contract: WrappedContract<PendleERC20>) {
  const user1 = toAddress('0x0a59649758aa4d66e25f08dd01271e891fe52199'), user2 = toAddress('0xf977814e90da44bfa03b6295a0616a897441acec');
  const amount = '100';

	// send example
  await contract.metaCall.approve(user1, amount, { method: 'send' });
  await contract.metaCall.approve(user1, amount);  // do the same as the above.

  // call static example
  const allowance = await contract.metaCall.allowance(user1, user2, { method: 'callStatic' });

  // multicallStatic example
  const [name, symbol, decimals, totalSuply] = await Promise.all([
    contract.metaCall.name({ method: 'multicallStatic'}),
    contract.metaCall.symbol({ method: 'multicallStatic' }),
    contract.metaCall.decimals({ method: 'multicallStatic' }),
    contract.metaCall.totalSupply({ method: 'multicallStatic' })
  ]);

  // estimateGas example
  const transferGasUsed = await contract.metaCall.transfer(user1, amount, { method: 'estimateGas' });

  // populateTransaction example
  const transferPopulatedTransaction = await contract.metaCall.transfer(user1, amount, { method: 'populateTransaction' });

  // extractParams example
  const transferParams = await contract.metaCall.transfer(user1, amount, { method: 'extractParams' });
  
  // meta-method example

  const transferMetaMethod = await contract.metaCall.transfer(user1, amount, { method: 'meta-method' });
  {
    // use with callStatic.
    const remaning = await transferMetaMethod.callStatic();
    // use with estimateGas.
    const gasUsed = await transferMetaMethod.estimateGas();
    await transferMetaMethod.send();
    // can also be used to send again.
    await transferMetaMethod.send();
  }
}
```
