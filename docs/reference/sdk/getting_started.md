---
sidebar_position: 1
---

# Getting Started

The Pendle SDK designed to run in any environment that can execute JavaScript (e.g. websites, node scripts, etc.). It is separate from the Pendle protocol. With the SDK, instead of directly interacting directly with the Pendle smart contracts, all these interfaces are abstracted from the developer. Functions such as querying rates, executing trades, or finding any other information is available in the SDK.

The following guides will help you use the Pendle SDK.

## Features

* Complete functionality for all your Pendle needs
* Extensive documentation
* Fully TypeScript ready, with definition files and full TypeScript source
* MIT License (including ALL dependencies)

## Disclaimer

The latest version of the SDK is used in production in the Pendle interface. However, the SDK itself should be considered alpha software and may contain bugs or may even contain significant changes between released versions.

## Installation

```sh
yarn add @pendle/sdk
```

## Usage

To start using the SDK in your application, use an `import` or `require` statement, depending on what your environment supports.

### ES6

```js
import { Yt, Market, StakingPool, Token, TokenAmount } from '@pendle/sdk';
```

### CommonJS

```js
const { Yt, Market, StakingPool, Token, TokenAmount } = require('@pendle/sdk');
```
