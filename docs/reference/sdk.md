---
sidebar_position: 3
---

# SDK

The SDK designed to run in any environment that can execute JavaScript (eg. websites, node scripts, etc.).

## Installation

Create and initialize a project directory and install the Pendle SDK by running

```sh
yarn add @pendle/sdk
```

To start using the SDK in your application, use an `import` or `require` statement, depending on what your environment supports.

### ES6

```js
import { Yt, Market, StakingPool, Token, TokenAmount } from '@pendle/sdk';
```

### CommonJS

```js
const { Yt, Market, StakingPool, Token, TokenAmount } = require('@pendle/sdk');
```

## Fetching Data

### `YT.fetchInterests()`

```js
export type YtOrMarketInterest = {
  address: string;
  interest: TokenAmount;
};

const fetchInterests = async (
  userAddress: string
): Promise<YtOrMarketInterest[]>

// example
// signer is a ethers.providers.JsonRpcSigner
const userInterests = await Yt.methods(signer).fetchInterests(
  dummyUser
);
```

### `Market.fetchInterests()`

```js
const fetchInterests = async (
  userAddress: string
): Promise<YtOrMarketInterest[]>

// example
// signer is a ethers.providers.JsonRpcSigner
const userInterests = await Market.methods(signer).fetchInterests(
  dummyUser
);
```

### `StakingPool.fetchInterestsAndRewards`

```js
export type PoolInterestAndRewards = {
  address: string;
  inputToken: Token;
  interest: TokenAmount;
  claimableRewards: TokenAmount[];
};

const fetchInterestsAndRewards = async (
  userAddress: string
): Promise<PoolInterestAndRewards[]>

// example
const interestsAndRewards = await StakingPool.methods(
  signer
).fetchInterestsAndRewards(dummyUser);
```

### `StakingPool.fetchAccruingRewards()`

```js
export type PoolAccruingRewards = {
  address: string;
  inputToken: Token;
  accruingRewards: TokenAmount[];
};

const fetchAccruingRewards = async (
  userAddress: string
): Promise<PoolAccruingRewards[]>
```

### `StakingPool.fetchVestedRewards()`

```js
export type PoolVestedRewards = {
  address: string;
  inputToken: Token;
  vestedRewards: FutureEpochRewards[];
};

const fetchVestedRewards = async (
  userAddress: string
): Promise<PoolVestedRewards[]>
```
