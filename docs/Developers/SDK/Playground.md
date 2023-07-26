---
hide_table_of_contents: true
---

# Trying the Pendle SDK

## Overview

You can run a playground to play with the Pendle SDK by forking and cloning the [pendle-sdk-core-v2-public](https://github.com/pendle-finance/pendle-sdk-core-v2-public) repo.

## Dependencies Installation

After cloning to your local machine, to install the dependencies, do:

```console
npm install
```

## Configuration

### `.env` file

This file can be used to specify:
- The chain ID
- Block number to fork from (for deterministic result)

The `.env` values are also type checked. Check `./load-env.ts` to see the schema.

### `rpc-url.ts`

The RPC URL of the the supported chains by Pendle SDK can be specified here. By default, this file contains the public RPCs.

### `hardhat.config.ts`

The configuration for `hardhat`. Please refer to https://hardhat.org/hardhat-runner/docs/config.

## Usage

Code should be written in `src/index.ts` only to test things out.

## Running

Please start **2 terminals**.

The first one will run a local fork of a network with the chain ID specified in `.env`.:

```console
npm run local-fork
```

The second console can be used to run the script with the following command:

```console
npm start
```

The script will save a snapshot of the fork and it will automatically restore after the script is done.

## Features

Please refer to `booststrap.ts` for full list of useful functions. In this file, you are able to find:
- `impersonateAccount` for account impersonation;
- Human-readable ethers.js `BigNumber` when printing to console;
- Automatically revert after running;
- Test accounts with filled balances;

## Other things to note

### Bug Reporting

For bug reports, Please indicate the exact SDK version for easier debugging.

### Block number and aggregator helper

When using Pendle SDK router, please do not fix the block number. This is because the aggregator works independently from the local forked network.

It is recommended to use `Router.getRouter` if an aggregator (KyberSwap) is not required in the event that you need to affix a specific block number such that operations everything can be deterministic.

### Readable `BigNumber` value when printing

Pendle SDK is built on top of `Ethers.js` v5 library, and it uses `BigNumber` to do calculation with high precision integers. But its output is not readable for us.

```ts
import { BN } from '@pendle/sdk-v2';
console.log(BN.from(123));
```

Output:

```ts
BigNumber { _hex: '0x7b', _isBigNumber: true }
```

With the following fix from [hardhat-ethers](https://github.com/NomicFoundation/hardhat/blob/main/packages/hardhat-ethers/src/internal/index.ts#L19-L25), we can have a nice presentation of `BigNumber` logging into the console.

```ts
const registerCustomInspection = (BigNumber: any) => {
    const inspectCustomSymbol = Symbol.for('nodejs.util.inspect.custom');
    BigNumber.prototype[inspectCustomSymbol] = function () {
        return `BigNumber { value: "${this.toString()}" }`;
    };
};
registerCustomInspection(BN);

console.log(BN.from(123));
```

Output:

```ts
BigNumber { value: "123" }
```

## Network Provider

We use `hardhat` to run a local fork. This can be done with the following command from the root directory of the [Pendle SDK docs](https://github.com/pendle-finance/pendle-sdk-core-v2-docs).

```sh
yarn local-fork
```

The JSON-RPC url will be `http://localhost:8545`, which is also the default URL of [StaticJsonRpcProvider](https://docs.ethers.org/v5/api/providers/jsonrpc-provider/#StaticJsonRpcProvider).

See [hardhat documentation on forking networks](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks).

```ts
import { providers } from 'ethers';
export const provider = new providers.StaticJsonRpcProvider();
```

## Test Accounts

Default mnemonics used by Hardhat to generate accounts with 1000 ETH.

See [hardhat reference](https://hardhat.org/hardhat-network/docs/reference).

```ts
import { utils, Wallet } from 'ethers';
import { Address, toAddress } from '@pendle/sdk-v2';

const testMnemonic = 'test test test test test test test test test test test junk';
export const masterHDNode = utils.HDNode.fromMnemonic(testMnemonic);

function createTestAccount(id: number) {
    const path = `m/44'/60'/0'/0/${id}`;
    const derrivedNode = masterHDNode.derivePath(path);
    const address = toAddress(derrivedNode.address);
    const wallet = new Wallet(derrivedNode.privateKey, provider);
    return {
        address,
        wallet,
    };
}

export const testAccounts = Array.from({ length: 10 }, (_, id) => createTestAccount(id));
console.log(testAccounts.map(({ address }) => address));
```

Output:

```ts
[
  '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
  '0x90f79bf6eb2c4f870365e785982e1f101e93b906',
  '0x15d34aaf54267db7d7c367839aaf71a00a2c6a65',
  '0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc',
  '0x976ea74026e726554db657fa54763abd0c3a0aa9',
  '0x14dc79964da2c08b23698b3d3cc7ca32193d9955',
  '0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f',
  '0xa0ee7a142d267c1f36714e4a8f75612f20a79720'
]
```

We can test their balance as follows:

```ts
import { createERC20, NATIVE_ADDRESS_0xEE } from '@pendle/sdk-v2';
const nativeTokenERC20 = createERC20(NATIVE_ADDRESS_0xEE, { provider, chainId });
console.log(await nativeTokenERC20.balanceOf(testAccounts[0].address));
```

Output:

```ts
BigNumber { value: "9974800137514959330153" }
```

### Setting account balances for some tokens

To do this, we need to do some _hacking_. As we are using a local fork, we can directly set the user balance in the contract's memory by setting the storage value with the following function.

```ts
import { ethers } from 'ethers';

async function setRawERC20Balance(address: Address, user: Address, rawAmount: BN, slot: number, reverse = false) {
    const order = reverse ? [slot, user] : [user, slot];
    const index = ethers.utils.solidityKeccak256(['uint256', 'uint256'], order);
    await provider.send('hardhat_setStorageAt', [address, index, ethers.utils.hexZeroPad(rawAmount.toHexString(), 32)]);
}

async function setERC20BalanceForAllAccounts(tokenAddress: Address, amount: BN, slot: number, reverse = false) {
    const tokenDecimals = await createERC20(tokenAddress, { provider, chainId }).decimals();
    const rawAmount = BN.from(10).pow(tokenDecimals).mul(amount);
    await Promise.all(
        testAccounts.map(({ address: userAddress }) =>
            setRawERC20Balance(tokenAddress, userAddress, rawAmount, slot, reverse)
        )
    );
}
```

Here is how we set the balance for USDC.

```ts
const USDCAddress = toAddress('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48');
const USDCSlot = 9;
const usdcERC20 = createERC20(USDCAddress, { provider, chainId });
console.log('Balance before: ', await usdcERC20.balanceOf(testAccounts[0].address));
await setERC20BalanceForAllAccounts(USDCAddress, BN.from(1000), USDCSlot, false);
console.log('Balance after:', await usdcERC20.balanceOf(testAccounts[0].address));
```

Output:

```ts
Balance before:  BigNumber { value: "1100711387" }
Balance after: BigNumber { value: "1000000000" }
```

Here the slot number is found beforehand, we just hardcode it. We can also set the balance for some other interesting tokens.

```ts
const slotData: Record<string, [tokenAddress: Address, slot: number, reverse: boolean]> = {
    USDT: [toAddress('0xdac17f958d2ee523a2206206994597c13d831ec7'), 2, false],
    DAI: [toAddress('0x6b175474e89094c44da98b954eedeac495271d0f'), 2, false],
    // WETH: [toAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'), 3, false],
    FRAX: [toAddress('0x853d955acef822db058eb8505911ed77f175b99e'), 0, false],
    USDC: [toAddress('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'), 9, false],
};

for (const [tokenAddress, slot, reverse] of Object.values(slotData)) {
    setERC20BalanceForAllAccounts(tokenAddress, BN.from(1000), slot, reverse);
}
```
