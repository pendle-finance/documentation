# Boros REST API Documentation

## Overview

Boros provides comprehensive REST APIs for interacting with the DeFi protocol, offering market data, trading operations, portfolio management, and automated transaction execution capabilities.

## Base URLs

### Core API

- **Production**: `https://api.boros.finance/core`
- **Swagger Documentation**: `https://api.boros.finance/core/docs`
- **OpenAPI JSON**: `https://api.boros.finance/core/docs-json`

### Send-Txs-Bot API

- **Production**: `https://api.boros.finance/send-txs-bot`
- **Swagger Documentation**: `https://api.boros.finance/send-txs-bot/docs`
- **OpenAPI JSON**: `https://api.boros.finance/send-txs-bot/docs-json`

## Authentication

The APIs are publicly accessible for read operations. Write operations require proper signatures and authentication.

---

# Core API Sections

## 1. Markets API

### List Markets

**Endpoint**: `GET /v1/markets`

Retrieve a list of all available markets with filtering and pagination support.

**Query Parameters**:

- `skip` (optional): Number of results to skip (default: 0)
- `limit` (optional): Maximum number of results (default: 10, max: 100)
- `isWhitelisted` (optional): Filter for whitelisted markets (default: true)

**Example Request**:

```bash
curl -X GET "https://api.boros.finance/core/v1/markets?skip=0&limit=5&isWhitelisted=true"
```

**Example Response**:

```json
{
  "results": [
    {
      "marketId": 2,
      "address": "0xd490dd635051d609887883d364368b223631653d",
      "tokenId": 1,
      "imData": {
        "name": "Binance BTCUSDT 26 Sep 2025",
        "symbol": "BINANCE-BTCUSDT-26SEP2025",
        "isIsolatedOnly": false,
        "maturity": 1758844800,
        "tickStep": 2
      },
      "metadata": {
        "name": "BTCUSDT",
        "platformName": "Binance",
        "maxLeverage": 20,
        "defaultLeverage": 10,
        "isWhitelisted": true
      }
    },
    {
      "marketId": 3,
      "address": "0x30c3cf7bfe1c694382c4901aae5c9d679ec8450d",
      "tokenId": 2,
      "imData": {
        "name": "Binance ETHUSDT 26 Sep 2025",
        "symbol": "BINANCE-ETHUSDT-26SEP2025",
        "isIsolatedOnly": false,
        "maturity": 1758844800,
        "tickStep": 2
      },
      "metadata": {
        "name": "ETHUSDT",
        "platformName": "Binance",
        "maxLeverage": 20,
        "defaultLeverage": 10,
        "isWhitelisted": true
      }
    }
  ],
  "total": 2,
  "skip": 0
}
```

### Get Market Information

**Endpoint**: `GET /v1/markets/{marketId}`

Retrieve detailed information about a specific market including configuration, metadata, and current data.

**Parameters**:

- `marketId` (path, required): The unique identifier of the market

**Example Request**:

```bash
# Get details for Binance BTCUSDT market
curl -X GET "https://api.boros.finance/core/v1/markets/2"
```

**Response Schema** (Real API Response):

```json
{
  "marketId": 2,
  "address": "0xd490dd635051d609887883d364368b223631653d",
  "tokenId": 1,
  "imData": {
    "name": "Binance BTCUSDT 26 Sep 2025",
    "symbol": "BINANCE-BTCUSDT-26SEP2025",
    "isIsolatedOnly": false,
    "maturity": 1758844800,
    "tickStep": 2,
    "iTickThresh": 583
  },
  "config": {
    "maxOpenOrders": 100,
    "markRateOracle": "0x0000000000000000000000000000000000000001",
    "fIndexOracle": "0x86a329b73db9de3a0a80af12ae3d9fb66910f366",
    "hardOICap": "150000000000000000000",
    "takerFee": "1000000000000000",
    "otcFee": "1000000000000000",
    "liqSettings": {
      "base": "100000000000000000",
      "slope": "0",
      "feeRate": "1000000000000000"
    },
    "kIM": "500000000000000000",
    "kMM": "250000000000000000",
    "tThresh": 583,
    "maxRateDeviationFactorBase1e4": 1000,
    "closingOrderBoundBase1e4": 100,
    "loUpperConstBase1e4": 7500,
    "loUpperSlopeBase1e4": 2500,
    "loLowerConstBase1e4": 2500,
    "loLowerSlopeBase1e4": 7500,
    "status": 1,
    "useImpliedAsMarkRate": true,
    "softOICap": 100000000000000000000
  },
  "extConfig": {
    "settleFeeRate": "1000000000000000",
    "paymentPeriod": 28800,
    "maxUpdateDelay": 300
  },
  "metadata": {
    "name": "BTCUSDT",
    "platformIcon": "https://storage.googleapis.com/pendle-v3/binance.svg",
    "platformName": "Binance",
    "maxLeverage": 20,
    "defaultLeverage": 10,
    "icon": "https://storage.googleapis.com/pendle-v3/BTCUSDT.svg",
    "isWhitelisted": true,
    "fundingRateSymbol": "BTCUSDT",
    "realtimeFundingRateLink": "https://api.binance.com/api/v1/premiumIndex?symbol=BTCUSDT",
    "isDevTest": false
  },
  "data": {
    "volume24h": 31.774597234944626,
    "notionalOI": 99.75860829556142,
    "markApr": 0.07004243605986377,
    "lastTradedApr": 0.07004243605986377,
    "midApr": 0.07004243605986377,
    "floatingApr": -0.00877095,
    "longYieldApr": -1.1252233716215074,
    "nextSettlementTime": 1755532800,
    "timeToMaturity": 3340800
  },
  "state": "Normal"
}
```

### Get Market Trades

**Endpoint**: `GET /v1/markets/market-trades`

Retrieve recent trading activity for specific markets.

**Query Parameters**:

- `marketId` (required): Market identifier
- `skip` (optional): Results to skip (default: 0)
- `limit` (optional): Maximum results (default: 10, max: 100)

**Example Request**:

```bash
# Get recent trades for Binance BTCUSDT market
curl -X GET "https://api.boros.finance/core/v1/markets/market-trades?marketId=2&skip=0&limit=3"
```

**Example Response**:

```json
{
  "results": [
    {
      "size": -0.008675982713510604,
      "rate": 0.07004243605986377,
      "txHash": "0x1c642109a1e583e235e8c6f5372de1870bf75f363cf8a2cbdd9486a6c652e839",
      "blockTimestamp": 1755505047
    },
    {
      "size": -0.008667428827907858,
      "rate": 0.07004243605986377,
      "txHash": "0x95342be3594c658dc5bb860b2d26e46b16dd3bc4273b68cac8d685fa93b733d9",
      "blockTimestamp": 1755504687
    },
    {
      "size": -1.5,
      "rate": 0.07004243605986377,
      "txHash": "0x58852970391d65d83c3cb54409931920bccdb65b217a0a5798eb2aab29ba6afb",
      "blockTimestamp": 1755504443
    }
  ],
  "total": 3353,
  "skip": 0
}
```

### Get Market Chart Data

**Endpoint**: `GET /v1/markets/chart`

Retrieve OHLCV chart data for market analysis.

**Query Parameters**:

- `marketId` (required): Market identifier
- `timeFrame` (required): Chart interval (`5m`, `1h`, `1d`, `1w`)
- `startTimestamp` (optional): Start time in Unix timestamp
- `endTimestamp` (optional): End time in Unix timestamp

**Example Request**:

```bash
# Get 1-hour chart data for Binance BTCUSDT market
curl -X GET "https://api.boros.finance/core/v1/markets/chart?marketId=2&timeFrame=1h&startTimestamp=1755500000&endTimestamp=1755510000"
```

## 2. Order Books API

### Get Order Book Data

**Endpoint**: `GET /v1/order-books/{marketId}`

Retrieve current order book depth for a market with specified tick aggregation.

**Parameters**:

- `marketId` (path, required): The market identifier
- `tickSize` (query, required): Price aggregation level

**Supported Tick Sizes**:

- `0.00001` (1 basis point)
- `0.0001` (10 basis points)
- `0.001` (100 basis points)
- `0.01` (1000 basis points)
- `0.1` (10000 basis points)

**Example Request**:

```bash
# Get order book for Binance BTCUSDT market with 0.0001 tick size
curl -X GET "https://api.boros.finance/core/v1/order-books/2?tickSize=0.0001"
```

**Response Schema**:

```json
{
  "long": {
    "ia": [6950, 6900, 6850],
    "sz": ["58724227191248872", "58757442160557416", "58776533001426712"]
  },
  "short": {
    "ia": [7050, 7100, 7150],
    "sz": ["250306054222955776", "250044477691435296", "249723379463267488"]
  }
}
```

**Response Fields**:

- `ia`: Implied APR values (in basis points)
- `sz`: Size values (in wei, as strings for precision)
- `long`: Buy-side order book (expecting rates to increase)
- `short`: Sell-side order book (expecting rates to decrease)

## 3. AMM (Automated Market Maker) API

### Get All AMM Vault States

**Endpoint**: `GET /v1/amm/summary`

Retrieve comprehensive AMM vault data across all markets.

**Query Parameters**:

- `account` (optional): User account address to filter personal vault data

**Example Request**:

```bash
# Get all AMM vault states
curl -X GET "https://api.boros.finance/core/v1/amm/summary"

# Get AMM vault states for a specific user
curl -X GET "https://api.boros.finance/core/v1/amm/summary?account=0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903"
```

### Get AMM Chart Data

**Endpoint**: `GET /v2/amm/chart`

Retrieve AMM APY chart data for vault analysis.

**Query Parameters**:

- `marketId` (required): Market identifier
- `ammId` (required): AMM identifier
- `timeFrame` (required): Chart interval (`5m`, `1h`, `1d`, `1w`)
- `startTimestamp` (optional): Start time in Unix timestamp
- `endTimestamp` (optional): End time in Unix timestamp

**Example Request**:

```bash
# Get AMM chart data for a specific vault
curl -X GET "https://api.boros.finance/core/v2/amm/chart?marketId=2&ammId=1&timeFrame=1h"
```

### Get AMM Info by ID

**Endpoint**: `GET /v2/amm/{ammId}`

Retrieve detailed AMM information for a specific AMM ID.

**Parameters**:

- `ammId` (path, required): AMM identifier

**Example Request**:

```bash
# Get AMM info for AMM ID 1
curl -X GET "https://api.boros.finance/core/v2/amm/1"
```

## 4. Simulations API

### Simulate Deposit

**Endpoint**: `GET /v2/simulations/deposit`

Simulate the effects of depositing collateral to isolated/cross margin account.

**Query Parameters**:

- `userAddress` (required): User's wallet address
- `tokenId` (required): Token identifier (1 for BTCUSDT, 2 for ETHUSDT)
- `amount` (required): Amount to deposit (as bigint string)
- `accountId` (required): Account identifier (0 for cross-margin)
- `marketId` (required): Market identifier

**Example Request**:

```bash
# Simulate depositing 1000 tokens to cross margin for BTCUSDT
curl -X GET "https://api.boros.finance/core/v2/simulations/deposit?userAddress=0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903&tokenId=1&amount=1000000000000000000000&accountId=0&marketId=2"
```

### Simulate Withdrawal

**Endpoint**: `GET /v1/simulations/withdraw`

Simulate the effects of withdrawing collateral.

**Query Parameters**:

- `userAddress` (required): User's wallet address
- `tokenId` (required): Token identifier
- `amount` (required): Amount to withdraw (as bigint string)

**Example Request**:

```bash
# Simulate withdrawing 500 tokens
curl -X GET "https://api.boros.finance/core/v1/simulations/withdraw?userAddress=0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903&tokenId=1&amount=500000000000000000000"
```

### Simulate Place Order

**Endpoint**: `GET /v2/simulations/place-order`

Simulate the effects of placing a limit order.

**Query Parameters**:

- `marketId` (required): Market identifier
- `side` (required): Order side (0 = LONG, 1 = SHORT)
- `size` (required): Order size as bigint string
- `limitTick` (required): Price tick (-32768 to 32767 range)
- `tif` (required): Time in force (0 = GTC, 1 = IOC, 2 = FOK, 3 = POST_ONLY)
- `slippage` (optional): Maximum acceptable slippage
- `mockTransfer` (optional): Whether to simulate transfers

**Example Request**:

```bash
# Simulate placing a LONG order on Binance BTCUSDT market
curl -X GET "https://api.boros.finance/core/v2/simulations/place-order?marketId=2&side=0&size=1000000000000000000&limitTick=7000&tif=0&slippage=0.05"
```

### Simulate Cash Transfer

**Endpoint**: `GET /v1/simulations/cash-transfer`

Simulate transfers between cross-margin and isolated margin accounts.

**Query Parameters**:

- `userAddress` (required): User's wallet address
- `marketId` (required): Target market identifier
- `isDeposit` (required): Transfer direction (true = cross to isolated, false = isolated to cross)
- `amount` (required): Amount to transfer as bigint string

**Example Request**:

```bash
# Simulate transferring tokens from cross to isolated margin for BTCUSDT market
curl -X GET "https://api.boros.finance/core/v1/simulations/cash-transfer?userAddress=0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903&marketId=2&isDeposit=true&amount=1000000000000000000"
```

### Simulate Cancel Order

**Endpoint**: `GET /v1/simulations/cancel-order`

Simulate the effects of cancelling orders.

**Query Parameters**:

- `marketAcc` (required): Market account identifier
- `marketId` (required): Market identifier
- `cancelAll` (required): Whether to cancel all orders (boolean)
- `orderIds` (optional): Comma-separated order IDs to cancel

**Example Request**:

```bash
# Simulate cancelling specific orders
curl -X GET "https://api.boros.finance/core/v1/simulations/cancel-order?marketAcc=0x1eca053af93a7afaefcd2133a352f422c3c04903000002ffffff&marketId=2&cancelAll=false&orderIds=123456789,987654321"
```

### Simulate Close Position

**Endpoint**: `GET /v2/simulations/close-active-position`

Simulate closing an active market position.

**Query Parameters**:

- `marketId` (required): Market identifier
- `side` (required): Position side to close (0 = LONG, 1 = SHORT)
- `size` (required): Size to close as bigint string
- `limitTick` (required): Price tick for closing order
- `tif` (required): Time in force
- `slippage` (optional): Maximum acceptable slippage

**Example Request**:

```bash
# Simulate closing a LONG position
curl -X GET "https://api.boros.finance/core/v2/simulations/close-active-position?marketId=2&side=0&size=1000000000000000000&limitTick=6950&tif=0&slippage=0.05"
```

### Simulate Add Liquidity

**Endpoint**: `GET /v1/simulations/add-liquidity-single-cash`

Simulate adding liquidity to AMM with single cash input.

**Query Parameters**:

- `userAddress` (required): User's wallet address
- `accountId` (required): Account identifier
- `marketId` (required): Market identifier
- `netCashIn` (required): Net cash input as bigint string

**Example Request**:

```bash
# Simulate adding liquidity to AMM
curl -X GET "https://api.boros.finance/core/v1/simulations/add-liquidity-single-cash?userAddress=0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903&accountId=0&marketId=2&netCashIn=1000000000000000000"
```

### Simulate Remove Liquidity

**Endpoint**: `GET /v1/simulations/remove-liquidity-single-cash`

Simulate removing liquidity from AMM for single cash output.

**Query Parameters**:

- `userAddress` (required): User's wallet address
- `accountId` (required): Account identifier
- `marketId` (required): Market identifier
- `lpToRemove` (required): LP tokens to remove as bigint string

**Example Request**:

```bash
# Simulate removing liquidity from AMM
curl -X GET "https://api.boros.finance/core/v1/simulations/remove-liquidity-single-cash?userAddress=0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903&accountId=0&marketId=2&lpToRemove=500000000000000000"
```

## 5. Calldata Generation API

### Generate Deposit Calldata

**Endpoint**: `GET /v2/calldata/deposit` (Current Version)

Generate transaction calldata for depositing from wallet to margin account.

**Query Parameters**:

- `userAddress` (required): User's wallet address
- `tokenId` (required): Token identifier (1 for BTCUSDT, 2 for ETHUSDT)
- `amount` (required): Amount to deposit as bigint string
- `accountId` (required): Account identifier (0 for cross-margin)
- `marketId` (required): Market identifier

**Example Request**:

```bash
# Generate calldata for depositing 1000 tokens to cross margin
curl -X GET "https://api.boros.finance/core/v2/calldata/deposit?userAddress=0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903&tokenId=1&amount=1000000000000000000000&accountId=0&marketId=2"
```

### Generate Withdraw Request Calldata

**Endpoint**: `GET /v1/calldata/withdraw/request`

Generate transaction calldata for requesting withdrawal.

**Query Parameters**:

- `userAddress` (required): User's wallet address
- `tokenId` (required): Token identifier
- `amount` (required): Amount to withdraw as bigint string

**Example Request**:

```bash
# Generate calldata for withdraw request
curl -X GET "https://api.boros.finance/core/v1/calldata/withdraw/request?userAddress=0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903&tokenId=1&amount=500000000000000000000"
```

### Generate Cash Transfer Calldata

**Endpoint**: `GET /v3/calldata/cash-transfer` (Current Version)

Generate transaction calldata for cash transfers between accounts.

**Query Parameters**:

- `payTreasuryAmount` (optional): Amount to pay treasury as bigint string
- `marketId` (required): Market identifier
- `isDeposit` (required): Transfer direction (true = cross to isolated)
- `amount` (required): Transfer amount as bigint string

**Example Request**:

```bash
# Generate calldata for cash transfer
curl -X GET "https://api.boros.finance/core/v3/calldata/cash-transfer?marketId=2&isDeposit=true&amount=1000000000000000000"
```

### Generate Place Order Calldata

**Endpoint**: `GET /v4/calldata/place-order` (Current Single Order Version)

Generate transaction calldata for placing a single limit order.

**Query Parameters**:

- `marketId` (required): Market identifier
- `side` (required): Order side (0 = LONG, 1 = SHORT)
- `size` (required): Order size as bigint string
- `limitTick` (required): Price tick (-32768 to 32767 range)
- `tif` (required): Time in force
- `slippage` (optional): Maximum acceptable slippage
- `payTreasuryAmount` (optional): Amount to pay treasury

**Example Request**:

```bash
# Generate calldata for placing a LONG order
curl -X GET "https://api.boros.finance/core/v4/calldata/place-order?marketId=2&side=0&size=1000000000000000000&limitTick=7000&tif=0&slippage=0.05"
```

### Generate Bulk Place Orders Calldata

**Endpoint**: `POST /v7/calldata/place-orders` (Latest Bulk Version)

Generate transaction calldata for placing multiple orders in a single transaction.

**Available Versions**: `/v2/calldata/place-orders` through `/v7/calldata/place-orders`

**Request Body** (varies by version, v7 shown):

```json
{
  "orders": [
    {
      "marketId": 2,
      "side": 0,
      "size": "1000000000000000000",
      "limitTick": 7000,
      "tif": 0
    }
  ],
  "slippage": 0.05,
  "payTreasuryAmount": "0"
}
```

**Example Request**:

```bash
# Generate calldata for placing multiple orders (v7)
curl -X POST "https://api.boros.finance/core/v7/calldata/place-orders" \
  -H "Content-Type: application/json" \
  -d '{"orders":[{"marketId":2,"side":0,"size":"1000000000000000000","limitTick":7000,"tif":0}],"slippage":0.05}'
```

### Generate Cancel Order Calldata

**Endpoint**: `GET /v3/calldata/cancel-order` (Current Version)

Generate transaction calldata for cancelling orders.

**Query Parameters**:

- `payTreasuryAmount` (optional): Amount to pay treasury as bigint string
- `marketAcc` (required): Market account identifier
- `marketId` (required): Market identifier
- `cancelAll` (required): Whether to cancel all orders (boolean)
- `orderIds` (optional): Comma-separated order IDs to cancel

**Example Request**:

```bash
# Generate calldata for cancelling specific orders
curl -X GET "https://api.boros.finance/core/v3/calldata/cancel-order?marketAcc=0x1eca053af93a7afaefcd2133a352f422c3c04903000002ffffff&marketId=2&cancelAll=false&orderIds=123456789,987654321"
```

### Generate Close Position Calldata

**Endpoint**: `GET /v4/calldata/close-active-position` (Current Version)

Generate transaction calldata for closing active positions.

**Query Parameters**:

- `marketId` (required): Market identifier
- `side` (required): Position side (0 = LONG, 1 = SHORT)
- `size` (required): Size to close as bigint string
- `limitTick` (required): Price tick
- `tif` (required): Time in force
- `slippage` (optional): Maximum acceptable slippage
- `payTreasuryAmount` (optional): Amount to pay treasury

**Example Request**:

```bash
# Generate calldata for closing a position
curl -X GET "https://api.boros.finance/core/v4/calldata/close-active-position?marketId=2&side=0&size=1000000000000000000&limitTick=6950&tif=0&slippage=0.05"
```

### Generate Add Liquidity Calldata

**Endpoint**: `GET /v4/calldata/add-liquidity-single-cash-to-amm` (Current Version)

Generate transaction calldata for adding liquidity to AMM.

**Query Parameters**:

- `payTreasuryAmount` (optional): Amount to pay treasury as bigint string
- `userAddress` (required): User's wallet address
- `accountId` (required): Account identifier
- `marketId` (required): Market identifier
- `netCashIn` (required): Net cash input as bigint string
- `minLpOut` (required): Minimum LP tokens expected as bigint string

**Example Request**:

```bash
# Generate calldata for adding liquidity
curl -X GET "https://api.boros.finance/core/v4/calldata/add-liquidity-single-cash-to-amm?userAddress=0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903&accountId=0&marketId=2&netCashIn=1000000000000000000&minLpOut=950000000000000000"
```

### Generate Remove Liquidity Calldata

**Endpoint**: `GET /v4/calldata/remove-liquidity-single-cash-from-amm` (Current Version)

Generate transaction calldata for removing liquidity from AMM.

**Query Parameters**:

- `payTreasuryAmount` (optional): Amount to pay treasury as bigint string
- `marketId` (required): Market identifier
- `lpToRemove` (required): LP tokens to remove as bigint string
- `minCashOut` (required): Minimum cash expected as bigint string

**Example Request**:

```bash
# Generate calldata for removing liquidity
curl -X GET "https://api.boros.finance/core/v4/calldata/remove-liquidity-single-cash-from-amm?marketId=2&lpToRemove=500000000000000000&minCashOut=480000000000000000"
```

**Response Schema** (All calldata endpoints):

```json
{
  "data": "0x4af92423000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000003e8",
  "from": "0x1eca053af93a7afaefcd2133a352f422c3c04903",
  "to": "0x664370dda3501dfb830cfacf947d4457b38d76fe",
  "gas": "116207"
}
```

## 5. Accounts API

### Get Account Settings

**Endpoint**: `GET /v1/accounts/settings`

Retrieve account configuration and settings.

**Query Parameters**:

- `userAddress` (required): User's wallet address

**Example Request**:

```bash
curl -X GET "https://api.boros.finance/core/v1/accounts/settings?userAddress=0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903"
```

### Get Gas Balance

**Endpoint**: `GET /v1/accounts/gas-balance`

Check the gas balance for transaction execution.

**Query Parameters**:

- `userAddress` (required): User's wallet address

**Example Request**:

```bash
curl -X GET "https://api.boros.finance/core/v1/accounts/gas-balance?userAddress=0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903"
```

### Set Agent Session

**Endpoint**: `POST /v1/accounts/set-agent-session`

Configure an agent session for automated trading.

**Request Body**:

```json
{
  "userAddress": "0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903",
  "agentAddress": "0xc11305458070b1cf122C9fc64C33f6c8f85e9639",
  "sessionConfig": {
    "expiryTime": 1746432000,
    "permissions": ["trade", "deposit", "withdraw"]
  }
}
```

**Example Request**:

```bash
curl -X POST "https://api.boros.finance/core/v1/accounts/set-agent-session" \
  -H "Content-Type: application/json" \
  -d '{"userAddress":"0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903","agentAddress":"0xc11305458070b1cf122C9fc64C33f6c8f85e9639"}'
```

## 6. PnL (Profit and Loss) API

### Get Active Positions

**Endpoint**: `GET /v1/pnl/positions/active`

Retrieve all active positions for a user account.

**Query Parameters**:

- `userAddress` (required): User's wallet address
- `accountId` (required): Account identifier (0 for cross-margin)

**Example Request**:

```bash
curl -X GET "https://api.boros.finance/core/v1/pnl/positions/active?userAddress=0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903&accountId=0"
```

### Get Closed Positions

**Endpoint**: `GET /v1/pnl/positions/closed`

Retrieve historical closed positions with PnL data.

**Query Parameters**:

- `userAddress` (required): User's wallet address
- `accountId` (required): Account identifier
- `limit` (optional): Maximum results (default: 10)
- `skip` (optional): Results to skip (default: 0)
- `orderBy` (optional): Sort order (e.g., "timeClosed:-1")

**Example Request**:

```bash
curl -X GET "https://api.boros.finance/core/v1/pnl/positions/closed?userAddress=0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903&accountId=0&limit=10&orderBy=timeClosed:-1"
```

### Get Limit Orders

**Endpoint**: `GET /v1/pnl/limit-orders`

Retrieve active and historical limit orders with PnL tracking.

**Query Parameters**:

- `userAddress` (required): User's wallet address
- `accountId` (required): Account identifier
- `limit` (optional): Maximum results
- `skip` (optional): Results to skip
- `orderBy` (optional): Sort order

**Example Request**:

```bash
curl -X GET "https://api.boros.finance/core/v1/pnl/limit-orders?userAddress=0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903&accountId=0&limit=10"
```

## 7. Settlement API

### Settlement Operations

The Settlement API provides endpoints for handling position settlement operations, including:

- Settlement calculations
- Settlement execution
- Settlement history tracking
- Settlement fee management

## 8. Collaterals API

### Get Collateral Summary

**Endpoint**: `GET /v1/collaterals/summary`

Retrieve comprehensive collateral and position summary for a user.

**Query Parameters**:

- `userAddress` (required): User's wallet address
- `accountId` (required): Account identifier

**Example Request**:

```bash
curl -X GET "https://api.boros.finance/core/v1/collaterals/summary?userAddress=0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903&accountId=0"
```

**Response Schema**:

```json
{
  "collaterals": [
    {
      "collateralAddress": "0x70a5cc7c683e7431a7f0a596305b870161fc515d",
      "isolatedPositions": [
        {
          "marketAcc": "0x1eca053af93a7afaefcd2133a352f422c3c04903000001000002",
          "marketPositions": [
            {
              "marketId": 1,
              "markApr": 0.049904053673639856,
              "lastTradedApr": 0.049904053673639856,
              "impliedApr": 0.06498225046172433,
              "liquidationApr": 0.1289540538218904,
              "fixedApr": 0.0499040536736398,
              "positionValue": {
                "settledPosition": "5013192606484",
                "remainingPosition": "-94339169958387"
              },
              "pnl": {
                "rateSettlementPnl": "251535985480",
                "unrealisedPnl": "-1990867579908"
              },
              "maintMargin": "47260273972602",
              "side": 1,
              "notionalSize": "-10000000000000000",
              "initialMargin": "190441079084220",
              "profit25PercentApr": 0.03992324293891184
            }
          ],
          "isCross": false,
          "netBalance": "196697260554227",
          "availableBalance": "6256181470007",
          "initialMargin": "190441079084220",
          "maintMargin": "47260273972602",
          "marginRatio": 0.24026910105122143
        }
      ],
      "crossPosition": {
        "marketAcc": "0x1eca053af93a7afaefcd2133a352f422c3c04903000001ffffff",
        "marketPositions": [],
        "isCross": true,
        "netBalance": "10545911945998409798",
        "availableBalance": "9391276740235291454",
        "initialMargin": "1154635205763118344",
        "maintMargin": "281425171594106459",
        "marginRatio": 0.026685712248990637
      },
      "totalNetBalance": "10546108643258964025",
      "startDayNetBalance": "10570916400102764922",
      "oneMonthAgoNetBalance": "0",
      "oneMonthAgoAggregatedVaultTransfer": "9800000000000000000"
    }
  ]
}
```
---

# Send-Txs-Bot API

## Agent Operations

### Agent Direct Call (v2)

**Endpoint**: `POST /v2/agent/direct-call`

Execute a single transaction through an authorized agent.

**Request Body**:

```json
{
  "agent": "0xc11305458070b1cf122C9fc64C33f6c8f85e9639",
  "message": {
    "account": "0x1eca053af93a7afaefcd2133a352f422c3c0490300",
    "connectionId": "0x3a2750b3c8c8e16e8840ce5d5bf1617b4437c032557475d3aedd3c716f49babf",
    "nonce": "1755505047"
  },
  "signature": "0x78f0a650b3fbfc1dfc0781888f19cfec623126e019d64954917a20400fbd4bbc5ed03c3602435a8a08a1be8df77af21aaa1c0bfe82536c407c5553f4166c3b7c1c",
  "calldata": "0x19271149000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001b8"
}
```

**Response Schema**:

```json
{
  "status": "success",
  "txHash": "0xfcaf03ba9c04aa881937136eb943c1e4bd569c084adabc23761474ae287670c5",
  "index": 0
}
```

**Example Request**:

```bash
# Execute a transaction through an authorized agent
curl -X POST "https://api.boros.finance/send-txs-bot/v2/agent/direct-call" \
  -H "Content-Type: application/json" \
  -d '{"agent":"0xc11305458070b1cf122C9fc64C33f6c8f85e9639","message":{"account":"0x1eca053af93a7afaefcd2133a352f422c3c0490300","connectionId":"0x3a2750b3c8c8e16e8840ce5d5bf1617b4437c032557475d3aedd3c716f49babf","nonce":"1755505047"},"signature":"0x78f0a650b3fbfc1dfc0781888f19cfec623126e019d64954917a20400fbd4bbc5ed03c3602435a8a08a1be8df77af21aaa1c0bfe82536c407c5553f4166c3b7c1c","calldata":"0x19271149000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001b8000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001B58"}'
```

### Bulk Agent Direct Call (v3)

**Endpoint**: `POST /v3/agent/bulk-direct-call`

Execute multiple transactions through an authorized agent in a single batch.

**Request Body**:

```json
{
  "datas": [
    {
      "agent": "0xc11305458070b1cf122C9fc64C33f6c8f85e9639",
      "message": {
        "account": "0x1eca053af93a7afaefcd2133a352f422c3c0490300",
        "connectionId": "0x3a2750b3c8c8e16e8840ce5d5bf1617b4437c032557475d3aedd3c716f49babf",
        "nonce": "1755505047"
      },
      "signature": "0x78f0a650b3fbfc1dfc0781888f19cfec623126e019d64954917a20400fbd4bbc5ed03c3602435a8a08a1be8df77af21aaa1c0bfe82536c407c5553f4166c3b7c1c",
      "calldata": "0x19271149000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001b8"
    }
  ],
  "agentSession": {
    "root": "0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903",
    "agent": "0xc11305458070b1cf122C9fc64C33f6c8f85e9639",
    "timestamp": 1755505047,
    "signature": "0x78f0a650b3fbfc1dfc0781888f19cfec623126e019d64954917a20400fbd4bbc5ed03c3602435a8a08a1be8df77af21aaa1c0bfe82536c407c5553f4166c3b7c1c"
  },
  "skipReceipt": false
}
```

**Example Request**:

```bash
# Execute multiple transactions through an authorized agent
curl -X POST "https://api.boros.finance/send-txs-bot/v3/agent/bulk-direct-call" \
  -H "Content-Type: application/json" \
  -d '{"datas":[{"agent":"0xc11305458070b1cf122C9fc64C33f6c8f85e9639","message":{"account":"0x1eca053af93a7afaefcd2133a352f422c3c0490300","connectionId":"0x3a2750b3c8c8e16e8840ce5d5bf1617b4437c032557475d3aedd3c716f49babf","nonce":"1755505047"},"signature":"0x78f0a650b3fbfc1dfc0781888f19cfec623126e019d64954917a20400fbd4bbc5ed03c3602435a8a08a1be8df77af21aaa1c0bfe82536c407c5553f4166c3b7c1c","calldata":"0x19271149000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001b8"}],"agentSession":{"root":"0x1eCa053Af93A7AFaeFCD2133A352f422c3C04903","agent":"0xc11305458070b1cf122C9fc64C33f6c8f85e9639","timestamp":1755505047,"signature":"0x78f0a650b3fbfc1dfc0781888f19cfec623126e019d64954917a20400fbd4bbc5ed03c3602435a8a08a1be8df77af21aaa1c0bfe82536c407c5553f4166c3b7c1c"},"skipReceipt":false}'
```

### Approve Agent

**Endpoint**: `POST /v1/agent/approve`

Approve an agent for transaction execution on behalf of a user.

**Request Body**:

```json
{
  "approveAgentCalldata": "0x2b6e83631eca053af93a7afaefcd2133a352f422c3c04903000000000000000000000000000000000000000000000000c11305458070b1cf122c9fc64c33f6c8f85e963900000000000000000000000000000000000000000000000000000002540be4000000000000000000000000000000000000000000000000000000019623040eab00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000004121d777e303c7e27a101f44f9a4d5a8eb416933ffb260db2eb14ec4db9af8a2ec5660ffaf95cc516890d195ea1e0d10a09edd9dad6c6f992d19ceae5d32ada2131b00000000000000000000000000000000000000000000000000000000000000",
  "skipReceipt": false
}
```

**Response Schema**:

```json
{
  "approveAgentResult": {
    "status": "success",
    "txHash": "0xe99bf4df343130bc51454f95f610bea19c23e54cba992be765f2151d429bfd6e",
    "index": 0
  }
}
```

**Example Request**:

```bash
# Approve an agent for transaction execution
curl -X POST "https://api.boros.finance/send-txs-bot/v1/agent/approve" \
  -H "Content-Type: application/json" \
  -d '{"approveAgentCalldata":"0x2b6e83631eca053af93a7afaefcd2133a352f422c3c04903000000000000000000000000000000000000000000000000c11305458070b1cf122c9fc64c33f6c8f85e963900000000000000000000000000000000000000000000000000000002540be4000000000000000000000000000000000000000000000000000000019623040eab00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000004121d777e303c7e27a101f44f9a4d5a8eb416933ffb260db2eb14ec4db9af8a2ec5660ffaf95cc516890d195ea1e0d10a09edd9dad6c6f992d19ceae5d32ada2131b00000000000000000000000000000000000000000000000000000000000000","skipReceipt":false}'
```

---

# Data Types and Schemas

## Core API Schemas

### Market Response

```typescript
interface MarketResponse {
  marketId: number;
  address: string;
  tokenId: number;
  imData: MarketIMDataResponse;
  config: MarketConfigResponse;
  extConfig: MarketExtendedConfigResponse;
  metadata: MarketMetadataResponse;
  data: MarketDataResponse;
}

interface MarketIMDataResponse {
  name: string;
  symbol: string;
  isIsolatedOnly: boolean;
  maturity: number;
  tickStep: number;
  iTickThresh: number;
}

interface MarketConfigResponse {
  maxOpenOrders: number;
  markRateOracle: string;
  fIndexOracle: string;
  hardOICap: string;
  takerFee: string;
  otcFee: string;
  liqSettings: LiqSettingsResponse;
  kIM: string;
  kMM: string;
  tThresh: number;
  maxRateDeviationFactorBase1e4: number;
  closingOrderBoundBase1e4: number;
  loUpperConstBase1e4: number;
  loUpperSlopeBase1e4: number;
  loLowerConstBase1e4: number;
  loLowerSlopeBase1e4: number;
  status: number;
  useImpliedAsMarkRate: boolean;
  softOICap?: number;
}

interface LiqSettingsResponse {
  base: string;
  slope: string;
  feeRate: string;
}
```

### Position Response

```typescript
interface PositionResponse {
  id: string;
  marketId: number;
  side: number; // 0 = LONG, 1 = SHORT
  notionalSize: string;
  positionValue: {
    settledPosition: string;
    remainingPosition: string;
  };
  underlyingApy: number;
  fixedApr: number;
  impliedApr: number;
  liquidationApr: number;
  pnl: {
    rateSettlementPnl: string;
    unrealisedPnl: string;
  };
  initialMargin: string;
  marketAcc: string;
  accountId: number;
  profit25PercentApr: number;
}
```

## Send-Txs-Bot API Schemas

### Agent Execute DTO

```typescript
interface AgentExecuteDto {
  agent: string;
  message: PendleSignTxDto;
  signature: string;
  calldata: string;
}

interface PendleSignTxDto {
  account: string;
  connectionId: string;
  nonce: string;
}

interface TxResponse {
  status?: string;
  txHash?: string;
  index?: number;
  error?: string;
}
```

### Bulk Agent Execute DTO

```typescript
interface BulkAgentExecuteV2Dto {
  datas: AgentExecuteDto[];
  agentSession: AgentSessionQueryDto;
  skipReceipt?: boolean;
}

interface AgentSessionQueryDto {
  root: string;
  agent: string;
  timestamp: number;
  signature: string;
}
```

## Constants and Enums

### Market Sides

- `LONG = 0`: Expecting rates to increase
- `SHORT = 1`: Expecting rates to decrease

### Order Types

- `LIMIT = 0`: Limit order
- `MARKET = 1`: Market order

### Time in Force

- `GOOD_TIL_CANCELLED = 0`: Order remains until cancelled
- `IMMEDIATE_OR_CANCEL = 1`: Fill immediately or cancel
- `FILL_OR_KILL = 2`: Fill completely or cancel
- `POST_ONLY = 3`: Add to order book, don't match immediately

### Order Status

- `FILLING = 0`: Order is being filled
- `CANCELLED = 1`: Order was cancelled
- `FULLY_FILLED = 2`: Order completely filled

### Chart Time Frames

- `5m`: 5-minute intervals
- `1h`: 1-hour intervals
- `1d`: 1-day intervals
- `1w`: 1-week intervals

## Error Handling

### HTTP Status Codes

- `200`: Success
- `400`: Bad Request - Invalid parameters
- `404`: Not Found - Resource doesn't exist
- `429`: Too Many Requests - Rate limit exceeded
- `500`: Internal Server Error

### Error Response Schema

```json
{
  "error": {
    "code": "INVALID_MARKET_ID",
    "message": "The specified market ID does not exist",
    "details": {}
  }
}
```

## Best Practices

### Data Handling

1. **BigInt Values**: Many numerical values are returned as strings to preserve precision. Parse these carefully in your application.

2. **Pagination**: Use `skip` and `limit` parameters for endpoints that return lists. Maximum `limit` is typically 100.

3. **Rate Limiting**: Implement exponential backoff for rate-limited requests.

4. **Simulation First**: Always use simulation endpoints before executing actual transactions.

### Performance Optimization

1. **Batch Requests**: Use bulk operations where available, especially for the Send-Txs-Bot API.

2. **Caching**: Cache market metadata and configuration data that changes infrequently.

3. **Efficient Polling**: For real-time data, implement efficient polling strategies or consider WebSocket connections where available.

### Security Considerations

1. **Signature Validation**: Always verify signatures before submitting transactions.

2. **Agent Permissions**: Carefully manage agent approvals and session configurations.

3. **Transaction Verification**: Always simulate transactions before execution.

4. **Slippage Protection**: Specify appropriate slippage limits for trading operations.

## Rate Limits

The APIs implement rate limiting to ensure fair usage:

- **Default**: 100 requests per minute per IP
- **Authenticated**: Higher limits may apply based on authentication
- **Burst**: Short bursts allowed within overall limits

Implement proper error handling and retry logic with exponential backoff when rate limits are encountered.

## SDK Integration

For TypeScript/JavaScript projects, consider using the auto-generated SDK clients:

- `BorosCoreSDK.ts` - For Core API operations
- `BorosSendTxsBotSDK.ts` - For agent-based transaction execution

These SDKs provide type-safe interfaces and handle authentication, serialization, and error handling automatically.
