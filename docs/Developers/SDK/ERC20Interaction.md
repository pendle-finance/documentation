---
hide_table_of_contents: true
---

# ERC20 Interaction with Pendle SDK

## Overview

There are a few kinds of entities in Pendle SDK, and ERC20 is one of them. The
entities have similar functionalities, and ERC20 is the most straightforward
and common entity. So let’s take a look at Pendle SDK’s functionalities with
ERC20.

## Preparation
Let’s say we want to interact with the USDC contract on Ethereum. USDC contract
has address
[`0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48).

```ts
const USDCAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
```

To communicate with the contract, we also need two things:
- A provider and/or signer.
- Some accounts with filled balance.

We have already prepared a module called [playground](./Playground.md) to provide these things. Let's import them!

```ts
import { provider, testAccounts } from './playground.mjs';
const [Alice, Bob] = testAccounts;

console.log("Alice's address: ", Alice.address);
console.log("Bob's address: ", Bob.address);
```

Output:

```ts
Alice's address:  0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
Bob's address:  0x70997970c51812dc3a010c7d01b50e0d17dc79c8
```

Here, we will only use 2 test accounts. There are totally 10 accounts in `testAccounts`, all of them has 1000 ETH, as well as some balance on various assets, such as USDC, USDT, etc. We'll demonstrate how to get the balance of these accounts shortly.

## ERC20 Entity Creation

Pendle ERC20 Entity can be constructed as follows:

```ts
import { ERC20Entity } from '@pendle/sdk-v2';

// ERC20 entity with read-only functionalities
const readonlyErc20 = new ERC20Entity(USDCAddress, { provider });

// ERC20 entity with read-write functionalities
const readWriteErc20 = new ERC20Entity(USDCAddress, { signer: Alice.wallet });
```

Other entities of Pendle SDK have roughly the same constructor signature: 

- the contract address,
- the entity configuration, including the network connection.

The network connection parameter inside the entity configuration should be an object that has either the property provider: `ethers.providers.Provider`, or `signer: ethers.Signer`. Pass signer if all contract functionalities are required. Otherwise, just pass in a provider. If both provider and signer are presented, the signer must be connected to the passed-in provider (an error will be thrown otherwise).

```ts
import { Wallet } from 'ethers';
const unconnectedWallet = Wallet.createRandom();
const connectedWallet = unconnectedWallet.connect(provider);

const contractAddress = USDCAddress;

// The following constructions work fine
new ERC20Entity(contractAddress, { provider });
new ERC20Entity(contractAddress, { signer: connectedWallet });
new ERC20Entity(contractAddress, { signer: unconnectedWallet });
new ERC20Entity(contractAddress, { provider, signer: connectedWallet });

// The following construction will throw an error
try {
    new ERC20Entity(contractAddress, { provider, signer: unconnectedWallet }); // Error
} catch (e) {
    console.log('Got error');
    console.log(e);
}
```

Output:

```ts
PendleSdkError: For contract creation, networkConnection.provider should be the same as networkConnection.signer.provider
    at createContractObject (/home/darkkcyan/projects/pendle-sdk-core-v2-docs/node_modules/@pendle/sdk-v2/src/contracts/createContractObject.ts:192:15)
    at new PendleEntity (/home/darkkcyan/projects/pendle-sdk-core-v2-docs/node_modules/@pendle/sdk-v2/src/entities/PendleEntity.ts:61:26)
    at new ERC20Entity (/home/darkkcyan/projects/pendle-sdk-core-v2-docs/node_modules/@pendle/sdk-v2/src/entities/erc20/ERC20Entity.ts:41:9)
    at file:///home/darkkcyan/projects/pendle-sdk-core-v2-docs/temp-dir/docs/1.erc20-tutorial.mts:72:5
    at processTicksAndRejections (node:internal/process/task_queues:96:5)

```

## Read-only Functions

An `ERC20` has the following read-only functions:

```solidity
function name() public view returns (string);
function symbol() public view returns (string);
function decimals() public view returns (uint8);
function totalSupply() public view returns (uint256);
function balanceOf(address _owner) public view returns (uint256 balance);
function allowance(address _owner, address _spender) public view returns (uint256 remaining);
```

You can use these functions similarly to calling them in a contract:

```ts
import { Address } from '@pendle/sdk-v2';

async function getErc20Info(erc20: ERC20Entity) {
    const name = await erc20.name();
    const symbol = await erc20.symbol();
    const decimals = await erc20.decimals();
    const totalSupply = await erc20.totalSupply();
    const AliceBalance = await erc20.balanceOf(Alice.address);
    const BobBalance = await erc20.balanceOf(Bob.address);

    return { name, symbol, decimals, totalSupply, AliceBalance, BobBalance };
}

console.log(await getErc20Info(readonlyErc20));
```

Output:

```ts
{
  name: 'USD Coin',
  symbol: 'USDC',
  decimals: 6,
  totalSupply: BigNumber { value: "35706426357059550" },
  AliceBalance: BigNumber { value: "1000000000" },
  BobBalance: BigNumber { value: "1000000000" }
}
```
We can also get allowance as well, though the allowance is a bit _boring_, as Alice and Bob didn't approve each other yet. We'll show how to approve shortly.

```ts
console.log("Bob's allowance from Alice: ", await readonlyErc20.allowance(Alice.address, Bob.address));
```

Output:

```ts
Bob's allowance from Alice:  BigNumber { value: "0" }

```

The function `readonlyFunctionsExample` sends the calls _sequentially_. To send the all the calls to the provider at the same time, use `Promise.all`.

```ts
async function readonlyFunctionExamplePromiseAll(erc20: ERC20Entity) {
    const [name, symbol, decimals, totalSupply, AliceBalance] = await Promise.all([
        erc20.name(),
        erc20.symbol(),
        erc20.decimals(),
        erc20.totalSupply(),
        erc20.balanceOf(Alice.address),
    ]);
    return { name, symbol, decimals, totalSupply, AliceBalance };
}

console.log(await readonlyFunctionExamplePromiseAll(readonlyErc20));
```

Output:

```ts
{
  name: 'USD Coin',
  symbol: 'USDC',
  decimals: 6,
  totalSupply: BigNumber { value: "35706426357059550" },
  AliceBalance: BigNumber { value: "1000000000" }
}

```

## Multicall Support

Pendle SDK supports calling read-only functions with [Multicall](https://github.com/makerdao/multicall)
from MakerDAO. Multicall is the preferred way to call multiple contract methods at once to reduce the round trips over the network. To use multicall, first create a Multicall instance as follows:

```ts
import { Multicall } from '@pendle/sdk-v2';

const multicall = new Multicall({ chainId: 1, provider });
```

`chainId` and `provider` are the required parameters. The `chainId` is `1`, as we are querying the Ethereum network. There is one more optional parameters:
- `callLimit: number` (default: `64`), the maximum number of calls per multicall request.

### Passing multicall to entity constructor

ERC20 entity's contractor’s third parameter also accept multicall. You can pass in `multicall` to ERC20 as follows:

```ts
const readonlyErc20WithMulticall = new ERC20Entity(USDCAddress, { provider, multicall });
```

After that, you can use it as in `readonlyFunctionExamplePromiseAll`, and Pendle
SDK will handle the batching for you:

```ts
console.log(await readonlyFunctionExamplePromiseAll(readonlyErc20WithMulticall));
```
Output:

```ts
{
  name: 'USD Coin',
  symbol: 'USDC',
  decimals: 6,
  totalSupply: BigNumber { value: "35706426357059550" },
  AliceBalance: BigNumber { value: "1000000000" }
}
```

Note that `readonlyFunctionsExample` will not work with multicall, as the methods are called sequentially. If used with an ERC20 entity that is initialized with a multicall instance, each call will be a multicall request with a single call inside instead!

### Passing multicall to the methods

If an ERC20 entity was not initialized with `multicall`, it can still be called with multicall by passing the `multicall` instance to the methods as the last parameter:

```ts
async function readonlyFunctionExample_multicallToMethods(erc20: ERC20Entity, multicall?: Multicall) {
    const [name, symbol, decimals, totalSupply, AliceBalance, BobBalance] = await Promise.all([
        erc20.name({ multicall }),
        erc20.symbol({ multicall }),
        erc20.decimals({ multicall }),
        erc20.totalSupply({ multicall }),
        erc20.balanceOf(Alice.address, { multicall }),
        erc20.balanceOf(Bob.address, { multicall }),
    ]);
    return { name, symbol, decimals, totalSupply, AliceBalance, BobBalance };
}

console.log(await readonlyFunctionExample_multicallToMethods(readonlyErc20WithMulticall, multicall));
```

Output:

```ts
{
  name: 'USD Coin',
  symbol: 'USDC',
  decimals: 6,
  totalSupply: BigNumber { value: "35706426357059550" },

  AliceBalance: BigNumber { value: "1000000000" },
  BobBalance: BigNumber { value: "1000000000" }
}

```

Again, Pendle SDK will handle all the batching. And also `readonlyFunctionsExample` will also not work for the same reason as above.

When `multicall` parameter is `undefined`, it will have the same effect as `readonlyFunctionExamplePromiseAll` (without `multicall`).

```ts
await readonlyFunctionExample_multicallToMethods(
    readonlyErc20WithMulticall
    // No multicall here
);
```

## Write Functions

An `ERC20` has the following write functions:

```sol
function approve(address _spender, uint256 _value) public returns (bool success);
function transfer(address _to, uint256 _value) public returns (bool success);
```

Similar to read-only functions, you can also use these functions by calling them in a contract. The following is an example on how to use `approve` method.

```ts
import { BN } from '@pendle/sdk-v2';
const erc20OfAlice = new ERC20Entity(USDCAddress, { signer: Alice.wallet });

const USDCDecimals = await erc20OfAlice.decimals();
const USDCDecimalsFactor = BN.from(10).pow(USDCDecimals);
{
    const approvalAmount = USDCDecimalsFactor.mul(10); // 10 USDC

    console.log("Bob's allowance before: ", await erc20OfAlice.allowance(Alice.address, Bob.address));

    const contractTransaction = await erc20OfAlice.approve(Bob.address, approvalAmount);
    await contractTransaction.wait(/* confirmation= */ 1);

    console.log("Bob's allowance after: ", await erc20OfAlice.allowance(Alice.address, Bob.address));
}
```

Output:

```ts
Bob's allowance before:  BigNumber { value: "0" }
Bob's allowance after:  BigNumber { value: "10000000" }
```

And here is an example on how to send some USDC from Alice to Bob. Very similar from the above example.

```ts
{
    const transferAmount = USDCDecimalsFactor.mul(10); // 10 USDC
    console.log("Alice's balance before: ", await erc20OfAlice.balanceOf(Alice.address));
    console.log("Bob's balance before: ", await erc20OfAlice.balanceOf(Bob.address));

    const contractTransaction = await erc20OfAlice.transfer(Bob.address, transferAmount);
    await contractTransaction.wait(/* confirmation= */ 1);

    console.log("Alice's balance after: ", await erc20OfAlice.balanceOf(Alice.address));
    console.log("Bob's balance after: ", await erc20OfAlice.balanceOf(Bob.address));
}
```

Output:

```ts
Alice's balance before:  BigNumber { value: "1000000000" }
Bob's balance before:  BigNumber { value: "1000000000" }
Alice's balance after:  BigNumber { value: "990000000" }
Bob's balance after:  BigNumber { value: "1010000000" }

```

## Meta-methods

Sometimes we don’t want to make a change to the network, but we only want to see the hypothetical results, or we want to estimate the amount of gas used. Ethers.js allows doing these actions directly via [`callStatic`](https://docs.ethers.io/v5/api/contract/contract/#contract-callStatic) and
[`estimateGas`](https://docs.ethers.io/v5/api/contract/contract/#contract-estimateGas)
*[meta classes](https://docs.ethers.io/v5/api/contract/contract/#Contract--metaclass)*.
    
The Pendle SDK also allows doing these actions via the *meta-method*. Each write function also accepts an additional parameter, which is `MetaMethodType`, defined as follows:

```ts
type MetaMethodType = 'send' | 'callStatic' | 'estimateGas' | 'meta-method' | 'multicallStatic';
```

This meta-method is the default behavior for a method call, which is to perform a transaction.

```ts
{
    const testAmount = USDCDecimalsFactor.mul(11);
    console.log('Before');
    console.log("Alice's balance:", await erc20OfAlice.balanceOf(Alice.address));
    console.log("Bob's balance:", await erc20OfAlice.balanceOf(Bob.address));
    console.log("Bob's allowance:", await erc20OfAlice.balanceOf(Alice.address, Bob.address));
    await erc20OfAlice.approve(Bob.address, testAmount, { method: 'send' }).then((transaction) => transaction.wait(1));
    await erc20OfAlice.transfer(Bob.address, testAmount, { method: 'send' }).then((transaction) => transaction.wait(1));
    console.log('After');
    console.log("Alice's balance:", await erc20OfAlice.balanceOf(Alice.address));
    console.log("Bob's balance:", await erc20OfAlice.balanceOf(Bob.address));
    console.log("Bob's allowance:", await erc20OfAlice.allowance(Alice.address, Bob.address));
}
```

Output:

```ts
Before
Alice's balance: BigNumber { value: "990000000" }
Bob's balance: BigNumber { value: "1010000000" }
Bob's allowance: BigNumber { value: "990000000" }
After
Alice's balance: BigNumber { value: "979000000" }
Bob's balance: BigNumber { value: "1021000000" }
Bob's allowance: BigNumber { value: "11000000" }

```

### `callStatic` meta-method

Use this meta-method to ask a node to execute the contract and return the hypothetical results of the method.

```ts
{
    const testAmount = USDCDecimalsFactor.mul(12);
    const isApproved = await erc20OfAlice.approve(Bob.address, testAmount, { method: 'callStatic' });
    const transferable = await erc20OfAlice.transfer(Bob.address, testAmount, { method: 'callStatic' });
    console.log({ isApproved, transferable });
}
```
Output:

```ts
{ isApproved: true, transferable: true }
```

### `multicallStatic` meta-method

This is the same as `callStatic` but with Multicall. Note that `multicall` effects only happen for this meta-method if the entity is initialized with `Multicall`, or passing it in the third parameter.

:::info
Because we are using **multicall**, the **sender** will not the original sender, but it is the multicall contract itself!

Because of that, the below only _demonstrates_ the `approve` function, and the owner here is **the multicall contract**. Even though this is not very useful in this context, `multicallStatic` can still be used with other entities.
:::

With `multicall` passed in the third parameter:

```ts
{
    const testAmount = USDCDecimalsFactor.mul(13);
    console.log({ testAmount });
    const [isApprovedForBob, isApprovedForAlice] = await Promise.all([
        readonlyErc20.approve(Bob.address, testAmount, { method: 'multicallStatic', multicall }),
        readonlyErc20.approve(Alice.address, testAmount, { method: 'multicallStatic', multicall }),
    ]);
    console.log({ isApprovedForBob, isApprovedForAlice });
}
```

Output:

```ts
{ testAmount: BigNumber { value: "13000000" } }
{ isApprovedForBob: true, isApprovedForAlice: true }
```

With ERC20 entity constructed with `multicall`.

```ts
{
    const testAmount = USDCDecimalsFactor.mul(13);
    console.log({ testAmount });
    const [isApprovedForBob, isApprovedForAlice] = await Promise.all([
        readonlyErc20WithMulticall.approve(Bob.address, testAmount, { method: 'multicallStatic' }),
        readonlyErc20WithMulticall.approve(Alice.address, testAmount, { method: 'multicallStatic' }),
    ]);
    console.log({ isApprovedForBob, isApprovedForAlice });
}
```

Output:

```ts
{ testAmount: BigNumber { value: "13000000" } }
{ isApprovedForBob: true, isApprovedForAlice: true }

```

### `estimateGas` meta-method

Use this meta method to estimate the amount of gas consumed for the method calls.

```ts
{
    const testAmount = USDCDecimalsFactor.mul(15);
    const [approvalGasUsed, transferGasUsed] = await Promise.all([
        erc20OfAlice.approve(Bob.address, testAmount, { method: 'estimateGas' }),
        erc20OfAlice.transfer(Bob.address, testAmount, { method: 'estimateGas' }),
    ]);
    console.log({ approvalGasUsed, transferGasUsed });
}
```

Output:

```ts
{
  approvalGasUsed: BigNumber { value: "43197" },
  transferGasUsed: BigNumber { value: "48892" }
}

```

### `meta-method` meta-method

This **meta-method** is the most powerful one. When this meta-method is used, the Pendle SDK will build and return an object, and we can do all previously mentioned methods with this built object.

```ts
{
    const testAmount = USDCDecimalsFactor.mul(16);
    const approveMetaMethod = await erc20OfAlice.approve(Bob.address, testAmount, { method: 'meta-method' });
    console.log('isApproved', await approveMetaMethod.callStatic());
    console.log('Gas usage', await approveMetaMethod.estimateGas());

    console.log("Bob's allowance before: ", await erc20OfAlice.allowance(Alice.address, Bob.address));
    const contractTransaction = await approveMetaMethod.send();
    await contractTransaction.wait(/* confirmations= */ 1);
    console.log("Bob's allowance after: ", await erc20OfAlice.allowance(Alice.address, Bob.address));
}
```

Output:

```ts
isApproved true
Gas usage BigNumber { value: "43185" }
Bob's allowance before:  BigNumber { value: "11000000" }
Bob's allowance after:  BigNumber { value: "16000000" }

```

## Other Functionalities

### Passing Ethers `Overrides` to the method calls

The `Overrides` can be passed in the last parameter of the methods. 

Consider this [transaction](https://etherscan.io/tx/0x14f77757bd1a80389cd1eb3a5fe49c7ce76e0e3462b434a9d33d9a4015e5f48d). It is at the block `16839151`, with some USDC transfered from `0x81A31Af5d27915861Eced7865837599f3A070a2D` to `0xe245212187AA7f423D09fC60F10CbBD623F97f9a`. Let's see their balance before and after this block.

```ts
import { toAddress } from '@pendle/sdk-v2';
{
    const block = 16839151;
    const sender = toAddress('0x81A31Af5d27915861Eced7865837599f3A070a2D');
    const receiver = toAddress('0xe245212187AA7f423D09fC60F10CbBD623F97f9a');

    const [senderBalanceBefore, receiverBalanceBefore, senderBalanceAfter, receiverBalanceAfter] = await Promise.all([
        readonlyErc20.balanceOf(sender, { multicall, overrides: { blockTag: block - 1 } }),
        readonlyErc20.balanceOf(receiver, { multicall, overrides: { blockTag: block - 1 } }),
        readonlyErc20.balanceOf(sender, { multicall, overrides: { blockTag: block } }),
        readonlyErc20.balanceOf(receiver, { multicall, overrides: { blockTag: block } }),
    ]);

    console.log('Before: ', {
        senderBalanceBefore,
        receiverBalanceBefore,
    });
    console.log('After', {
        senderBalanceAfter,
        receiverBalanceAfter,
    });
}
```

Output:

```ts
Before:  {
  senderBalanceBefore: BigNumber { value: "400000000" },
  receiverBalanceBefore: BigNumber { value: "500000000" }
}
After {
  senderBalanceAfter: BigNumber { value: "0" },
  receiverBalanceAfter: BigNumber { value: "900000000" }
}

```

### The Inner Contract

ERC20 entity has a property called `contract: WrappedContract<PendleERC20>`. `PendleERC20` is the contract interface generated to be compatible with ethers.js’s `Contract` object via [`typechain`](https://github.com/dethcrypto/TypeChain).

`WrappedContract` is our custom type that wraps around the generated interface to have additional functionalities, such as catching Pendle contract errors and calling contracts with multicall and meta-methods.

See [`WrappedContract`](./WrappedContract.md).

```ts
import { WrappedContract, PendleERC20 } from '@pendle/sdk-v2';

const wrappedContract: WrappedContract<PendleERC20> = readWriteErc20.contract;
```

### Setting the ABI

If you wish to extend `ERC20` classes with a different contract ABI, you can set the ABI via the constructor configuration parameters. The ABI should have a compatible type with the `ERC20` ABI. Be careful to do otherwise, as Pendle SDK does not check to ABI compatibility.

```ts
import { PendlePrincipalTokenABI, NetworkConnection } from '@pendle/sdk-v2';

function createErc20ForPT(address: Address, networkConnection: NetworkConnection) {
    return new ERC20Entity(address, { ...networkConnection, abi: PendlePrincipalTokenABI });
}
```

The `contract` property, however, will still be `WrappedContract<PendleERC20>`. If you know the correct type, you can cast it to that type.

If you wish to create a subclass of `ERC20`, you can do as follows:

```ts
import { PendlePrincipalToken } from '@pendle/sdk-v2';

class ERC20ForPT extends ERC20Entity {
    // ...

    get contract(): WrappedContract<PendlePrincipalToken> {
        return this._contract as WrappedContract<PendlePrincipalToken>;
    }
}
```

This is exactly what is done under the hood of Pendle SDK, as `PendlePrincipalToken` does indeed extend `PendleERC20` on the contract side.
