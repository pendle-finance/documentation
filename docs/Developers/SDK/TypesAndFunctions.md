---
hide_table_of_contents: true
---

# Types and Functions

## Overview

Here are some small but useful types and functions used across places in the Pendle SDK.

## External Types and Functions

We use some external packages, mainly `Ethers.js`. So before reading further, please be sure that you are familiar with them first.

```ts
import type { providers, Signer } from 'ethers';

type Provider = providers.Provider;

// these are exported to @pendle/sdk-v2
// export { BigNumber as BN, BigNumberish } from 'ethers';
```

## Types

### type `Address`

```ts
import { Address } from '@pendle/sdk-v2';
```

Please refer to [Address API reference][pendle-sdk-Address].

This type is defined to avoid using raw string as address. The address returned by a contract call often have mixed cases, which sometimes causes bug in comparison.

This type is an [Opaque](https://en.wikipedia.org/wiki/Opaque_data_type) type with the help of a private unique symbol. Similar implementation can be found in popular libraries such as [ts-essentials](https://github.com/ts-essentials/ts-essentials/tree/master/lib/opaque). We implemented our own, as the generated documentation and the IDE intellisense are nicer than using the library.

### type `ChainId`

```ts
import { ChainId } from '@pendle/sdk-v2';

type ChainId = 1 | 43113 | 80001 | 43114;
```

This type is a union of the chains’ IDs that are supported by Pendle.

### type `MainchainId`

```ts
import { MainchainId } from '@pendle/sdk-v2';

type MainchainId = 1 | 43113;
```

This type is a union of the main chains’ IDs that are supported by Pendle.

### type `NetworkConnection`

```ts
import { NetworkConnection } from '@pendle/sdk-v2';

export type NetworkConnection =
    | { provider: Provider; signer?: undefined }
    | { provider?: undefined; signer: Signer }
    | { provider: Provider; signer: Signer };
```

This type looks complicated, but it actually has only two fields:
- `provider: Provider`
- `signer: Signer`

It is written in such way so that one of the fields can be omitted, **but not both!** Also, we strongly recommend using `tsc` with `strict` mode.

Example:

```ts
import { Wallet } from 'ethers';
import { provider } from './sdk-doc-playground.mjs';

const signer = Wallet.createRandom();

// ok examples
const nc1: NetworkConnection = { provider };
const nc2: NetworkConnection = { signer };
const nc3: NetworkConnection = { provider, signer };

// not ok example
// const nc4: NetworkConnection = {};
```

### function `copyNetworkConnection(..)`

```ts
import { copyNetworkConnection } from '@pendle/sdk-v2';

export function copyNetworkConnection(networkConnection: NetworkConnection): NetworkConnection;
```

This function **only** copies the `provide` and the `signer` fields of the input object.

Example:

```ts
const nc5 = { provider, aRandomField: 'foo' };
const nc6 = copyNetworkConnection(nc5);
// Print the keys of nc2
console.log(Object.keys(nc6));
```

Output:

```ts
[ 'provider', 'signer' ]
```

## Functions

### function `toAddress(...)`

```ts
import { toAddress } from '@pendle/sdk-v2';

function toAddress(rawAddress: string): Address
```

Cast a rawAddress to the `Address` type. This function **does not** validate the `rawAddress` string. The resulting `Address` will be transformed to lowercase.

### function `areSameAddresses(...)`

```ts
import { areSameAddresses } from '@pendle/sdk-v2';

function areSameAddresses(address1: Address, address2: Address): boolean;
```

Check if two addresses are the same, by comparing them in **lowercase**.

With the current `Address` type, addresses can also be compared directly with the `===` operator. This function was used before having the `Address` type, but it is still nice to have.

### function `isMainchain(...)`

```ts
import { isMainchain } from '@pendle/sdk-v2';

export function isMainchain(chainId: ChainId): chainId is MainchainId;
```

Check if a `ChainId` is a `MainchainId`.

Example:

```ts
console.log(isMainchain(1));

console.log(isMainchain(43113));
```

Output:

```ts
true
true
```

[pendle-sdk-Address]: https://github.com/pendle-finance/pendle-sdk-core-v2-public/blob/main/src/common/Address.ts
