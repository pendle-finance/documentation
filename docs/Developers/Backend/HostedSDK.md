---
hide_table_of_contents: true
---

# Hosted SDK

**This Hosted SDK is currently under development (beta). We are actively working on improvements and welcome your feedback. If you have suggestions or feature requests, please reach out to us on Discord.**

The SDK is hosted at [https://api-v2.pendle.finance/sdk/](https://api-v2.pendle.finance/sdk/).

Pendle accommodates a vast array of assets, each characterized by its unique nuances and complexities. While the Pendle protocol remains immutable, the underlying assets don't share this feature, requiring our app and SDK to be updated frequently to align with changes in these assets.

To address this, Pendle has introduced a hosted version of our SDK. It ensures the output remains consistent with Pendle's UI and keeps up-to-date with the latest protocol changes. The API design prioritizes simplicity and stability, with a high rate limit to meet the needs of most users.

# Hosted SDK (external)

This SDK is hosted at [https://api-v2.pendle.finance/external/docs#/SDK](https://api-v2.pendle.finance/external/docs#/SDK).

## Swap
**Endpoint**: `GET /v1/sdk/{chainId}/markets/{market}/swap`

- `chainId`: chain id number (in decimals).
- `market`: the market address that will be doing the swap.

Allow users to swap between two tokens in a market, supported methods:
- swap from SY to PT/YT.
- swap from token to PT/YT.
- swap from PT to SY/YT/token.
- swap from YT to SY/PT/token.

**Query parameters**: 
- `receiver`: receiver wallet address.
- `slippage`: slippage number (from 0 to 1).
- `enableAggregator`: enable aggregator to do routing (default is `false`).
- `tokenIn`: token in address.
- `tokenOut`: token out address.
- `amountIn`: the amount of `tokenIn` to swap.

**Response**
```json
{
  "tx": {
    "data": "string",
    "to": "string",
    "from": "string",
    "value": "string"
  },
  "method": "string",
  "contractCallParamsName": [
    "string"
  ],
  "contractCallParams": [
    null
  ],
  "data": {
    "amountOut": "string",
    "priceImpact": 0
  }
}
```

- `tx`: The generated transaction data.
- `method`: The method name will be called in the transaction.
- `contractCallParamsName`: List of parameters' name of the contract method.
- `contractCallParams`: List of parameters' value of the contract method.
- `data`
    - `amountOut`: The amount of `tokenOut` when simulating the swap function.
    - `priceImpact`: The different valuation (in term of USD) between the output amount and the input amount.

**Example**

Swap **1 USDC** to **PT eETH** in **eETH (0x7d372819240d14fb477f17b964f95f33beb4c704)** with 1% slippage:

`GET https://api-v2.pendle.finance/external/v1/sdk/1/markets/0x7d372819240d14fb477f17b964f95f33beb4c704/swap?receiver=<RECEIVER_ADDRESS>&slippage=0.01&enableAggregator=true&tokenIn=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&tokenOut=0x6ee2b5e19ecba773a352e5b21415dc419a700d1d&amountIn=1000000`

## Add liquidity
**Endpoint**: `GET /v1/sdk/{chainId}/markets/{market}/add-liquidity`

- `chainId`: chain id number (in decimals).
- `market`: the market address to add liquidity.

Allow users to add liquidity to a market, supported methods:
- add liquidity single SY/token.
- add liquidity single SY/token (keep YT).
- add liquidity single PT.

**Query parameters**: 
- `receiver`: receiver wallet address.
- `slippage`: slippage number (from 0 to 1).
- `enableAggregator`: enable aggregator to do routing (default is `false`).
- `tokenIn`: token in address.
- `amountIn`: the amount of `tokenIn` to add liquidity.
- `zpi`: zero price impact mode (default is `false`).

**Response**
```json
{
  "tx": {
    "data": "string",
    "to": "string",
    "from": "string",
    "value": "string"
  },
  "method": "string",
  "contractCallParamsName": [
    "string"
  ],
  "contractCallParams": [
    null
  ],
  "data": {
    "amountLpOut": "string",
    "amountYtOut": "string",
    "priceImpact": 0
  }
}
```

- `tx`: The generated transaction data.
- `method`: The method name will be called in the transaction.
- `contractCallParamsName`: List of parameters' name of the contract method.
- `contractCallParams`: List of parameters' value of the contract method.
- `data`
    - `amountLpOut`: The amount of LP when simulating the add liquidity function.
    - `amountYtOut`: The amount of YT when simulating the add liquidity function, will be `0` if `zpi` is `false`.
    - `priceImpact`: The different valuation (in term of USD) between the output amount and the input amount.

**Example**

Use **1 USDC** to add liquidity (zero price impact mode) to **eETH (0x7d372819240d14fb477f17b964f95f33beb4c704)** pool with 1% slippage:

`GET https://api-v2.pendle.finance/external/v1/sdk/1/markets/0x7d372819240d14fb477f17b964f95f33beb4c704/add-liquidity?receiver=<RECEIVER_ADDRESS>&slippage=0.01&enableAggregator=true&tokenIn=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&amountIn=1000000&zpi=true`

## Remove liquidity
**Endpoint**: `GET /v1/sdk/{chainId}/markets/{market}/remove-liquidity`

- `chainId`: chain id number (in decimals).
- `market`: the market address to remove liquidity.

Allow users to remove liquidity from a market, supported methods:
- remove liquidity single SY/PT/token.

**Query parameters**: 
- `receiver`: receiver wallet address.
- `slippage`: slippage number (from 0 to 1).
- `enableAggregator`: enable aggregator to do routing (default is `false`).
- `amountIn`: the amount of LP to remove liquidity.
- `tokenOut`: token out address.

**Response**
```json
{
  "tx": {
    "data": "string",
    "to": "string",
    "from": "string",
    "value": "string"
  },
  "method": "string",
  "contractCallParamsName": [
    "string"
  ],
  "contractCallParams": [
    null
  ],
  "data": {
    "amountOut": "string",
    "priceImpact": 0
  }
}
```

- `tx`: The generated transaction data.
- `method`: The method name will be called in the transaction.
- `contractCallParamsName`: List of parameters' name of the contract method.
- `contractCallParams`: List of parameters' value of the contract method.
- `data`
    - `amountOut`: The amount of `tokenOut` when simulating the remove liquidity function.
    - `priceImpact`: The different valuation (in term of USD) between the output amount and the input amount.

**Example**

Remove **1 LP** from **eETH (0x7d372819240d14fb477f17b964f95f33beb4c704)** pool to **USDC** with 1% slippage:

`GET https://api-v2.pendle.finance/external/v1/sdk/1/markets/0x7d372819240d14fb477f17b964f95f33beb4c704/remove-liquidity?receiver=<RECEIVER_ADDRESS>&slippage=0.01&enableAggregator=true&amountIn=1000000000000000000&tokenOut=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`


## Mint PT & YT
**Endpoint**: `GET /v1/sdk/{chainId}/mint`

- `chainId`: chain id number (in decimals).

Allow users to mint PT and YT, supported methods:
- mint PT and YT from SY/token.

**Query parameters**: 
- `receiver`: receiver wallet address.
- `slippage`: slippage number (from 0 to 1).
- `enableAggregator`: enable aggregator to do routing (default is `false`).
- `yt`: YT address that will be minted.
- `tokenIn`: token in address.
- `amountIn`: the amount of `tokenIn`.

**Response**
```json
{
  "tx": {
    "data": "string",
    "to": "string",
    "from": "string",
    "value": "string"
  },
  "method": "string",
  "contractCallParamsName": [
    "string"
  ],
  "contractCallParams": [
    null
  ],
  "data": {
    "amountOut": "string",
    "priceImpact": 0
  }
}
```

- `tx`: The generated transaction data.
- `method`: The method name will be called in the transaction.
- `contractCallParamsName`: List of parameters' name of the contract method.
- `contractCallParams`: List of parameters' value of the contract method.
- `data`
    - `amountOut`: The amount of PT and YT when simulating the mint PT & YT function.
    - `priceImpact`: The different valuation (in term of USD) between the output amount and the input amount.

**Example**

Use **1 USDC** to mint **PT** and **YT eETH** with 1% slippage:

`GET https://api-v2.pendle.finance/external/v1/sdk/1/mint?receiver=<RECEIVER_ADDRESS>&slippage=0.01&enableAggregator=true&yt=0x129e6b5dbc0ecc12f9e486c5bc9cdf1a6a80bc6a&tokenIn=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&amountIn=1000000`


## Redeem PT & YT
**Endpoint**: `GET /v1/sdk/{chainId}/redeem`

- `chainId`: chain id number (in decimals).

Allow users to redeem PT and YT, supported methods:
- redeem PT and YT to SY/token.

**Query parameters**: 
- `receiver`: receiver wallet address.
- `slippage`: slippage number (from 0 to 1).
- `enableAggregator`: enable aggregator to do routing (default is `false`).
- `yt`: YT address that will be minted.
- `amountIn`: the amount of PT and YT.
- `tokenOut`: token out address.

**Response**
```json
{
  "tx": {
    "data": "string",
    "to": "string",
    "from": "string",
    "value": "string"
  },
  "method": "string",
  "contractCallParamsName": [
    "string"
  ],
  "contractCallParams": [
    null
  ],
  "data": {
    "amountOut": "string",
    "priceImpact": 0
  }
}
```

- `tx`: The generated transaction data.
- `method`: The method name will be called in the transaction.
- `contractCallParamsName`: List of parameters' name of the contract method.
- `contractCallParams`: List of parameters' value of the contract method.
- `data`
    - `amountOut`: The amount of `tokenOut` when simulating the redeem PT & YT function.
    - `priceImpact`: The different valuation (in term of USD) between the output amount and the input amount.

**Example**

Redeem **1 PT** and **1 YT eETH** to **USDC** with 1% slippage:

`GET https://api-v2.pendle.finance/external/v1/sdk/1/redeem?receiver=<RECEIVER_ADDRESS>&slippage=0.01&enableAggregator=true&yt=0x129e6b5dbc0ecc12f9e486c5bc9cdf1a6a80bc6a&amountIn=1000000000000000000&tokenOut=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`


## Transfer liquidity
**Endpoint**: `GET /v1/sdk/{chainId}/markets/{market}/transfer-liquidity`

- `chainId`: chain id number (in decimals).
- `market`: the market address to transfer liquidity.

Allow users to transfer liquidity from a market.

**Query parameters**: 
- `receiver`: receiver wallet address.
- `slippage`: slippage number (from 0 to 1).
- `enableAggregator`: enable aggregator to do routing (default is `false`).
- `dstMarket`: the market address to transfer liquidity to.
- `lpAmount`: the amount of LP to transfer.
- `ptAmount`: the amount of PT to transfer.
- `ytAmount`: the amount of YT to transfer.
- `redeemRewards`: redeem pool's rewards when transfer liqudity (default is `false`).
- `zpi`: zero price impact mode when zap in the new pool (default is `false`).

**Response**
```json
{
  "tx": {
    "data": "string",
    "to": "string",
    "from": "string",
    "value": "string"
  },
  "method": "string",
  "contractCallParamsName": [
    "string"
  ],
  "contractCallParams": [
    null
  ],
  "data": {
    "amountLpOut": "string",
    "amountYtOut": "string",
    "priceImpact": 0
  }
}
```

- `tx`: The generated transaction data.
- `method`: The method name will be called in the transaction.
- `contractCallParamsName`: List of parameters' name of the contract method.
- `contractCallParams`: List of parameters' value of the contract method.
- `data`
    - `amountLpOut`: The amount of LP when simulating the transfer liquidity function.
    - `amountYtOut`: The amount of YT when simulating the add liquidity function, will be `0` if `zpi` is `false`.
    - `priceImpact`: The different valuation (in term of USD) between the output amount and the input amount.

## Roll over PT
**Endpoint**: `GET /v1/sdk/{chainId}/markets/{market}/roll-over-pt`

- `chainId`: chain id number (in decimals).
- `market`: the market address to roll over PT.

Allow users to roll over PT.

**Query parameters**: 
- `receiver`: receiver wallet address.
- `slippage`: slippage number (from 0 to 1).
- `enableAggregator`: enable aggregator to do routing (default is `false`).
- `dstMarket`: the market address to roll over to.
- `ptAmount`: the amount of PT to roll over.

**Response**
```json
{
  "tx": {
    "data": "string",
    "to": "string",
    "from": "string",
    "value": "string"
  },
  "method": "string",
  "contractCallParamsName": [
    "string"
  ],
  "contractCallParams": [
    null
  ],
  "data": {
    "amountPtOut": "string",
    "priceImpact": 0
  }
}
```

- `tx`: The generated transaction data.
- `method`: The method name will be called in the transaction.
- `contractCallParamsName`: List of parameters' name of the contract method.
- `contractCallParams`: List of parameters' value of the contract method.
- `data`
    - `amountPtOut`: The amount of PT when simulating the roll over PT function.
    - `priceImpact`: The different valuation (in term of USD) between the output amount and the input amount.


## Add liquidity dual
**Endpoint**: `GET /v1/sdk/{chainId}/markets/{market}/add-liquidity-dual`

- `chainId`: chain id number (in decimals).
- `market`: the market address to add liquidity.

Allow users to add liquidity dual to a market, supported methods:
- add liquidity dual SY/token and PT.

**Query parameters**: 
- `receiver`: receiver wallet address.
- `slippage`: slippage number (from 0 to 1).
- `tokenIn`: token in address.
- `amountTokenIn`: the amount of `tokenIn` to add liquidity.
- `amountPtIn`: the amount of PT to add liquidity.

**Response**
```json
{
  "tx": {
    "data": "string",
    "to": "string",
    "from": "string",
    "value": "string"
  },
  "method": "string",
  "contractCallParamsName": [
    "string"
  ],
  "contractCallParams": [
    null
  ],
  "data": {
    "amountOut": "string",
    "priceImpact": 0
  }
}
```

- `tx`: The generated transaction data.
- `method`: The method name will be called in the transaction.
- `contractCallParamsName`: List of parameters' name of the contract method.
- `contractCallParams`: List of parameters' value of the contract method.
- `data`
    - `amountOut`: The amount of LP when simulating the add liquidity function.
    - `priceImpact`: The different valuation (in term of USD) between the output amount and the input amount.

## Remove liquidity dual
**Endpoint**: `GET /v1/sdk/{chainId}/markets/{market}/remove-liquidity-dual`

- `chainId`: chain id number (in decimals).
- `market`: the market address to remove liquidity.

Allow users to remove liquidity dual to a market, supported methods:
- remove liquidity dual to SY/token and PT.

**Query parameters**: 
- `receiver`: receiver wallet address.
- `slippage`: slippage number (from 0 to 1).
- `tokenOut`: token out address.
- `amountIn`: the amount of LP to remove liquidity.

**Response**
```json
{
  "tx": {
    "data": "string",
    "to": "string",
    "from": "string",
    "value": "string"
  },
  "method": "string",
  "contractCallParamsName": [
    "string"
  ],
  "contractCallParams": [
    null
  ],
  "data": {
    "amountTokenOut": "string",
    "amountPtOut": "string",
    "priceImpact": 0
  }
}
```

- `tx`: The generated transaction data.
- `method`: The method name will be called in the transaction.
- `contractCallParamsName`: List of parameters' name of the contract method.
- `contractCallParams`: List of parameters' value of the contract method.
- `data`
    - `amountTokenOut`: The amount of `tokenOut` when simulating the add liquidity function.
    - `amountPtOut`: The amount of PT when simulating the add liquidity function.
    - `priceImpact`: The different valuation (in term of USD) between the output amount and the input amount.