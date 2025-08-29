# Boros SDK

The `Exchange` class provides an interface for interacting with the Boros trading platform. It handles operations such as placing orders, modifying orders, managing positions, and interacting with the blockchain.

## Installation

```bash
yarn add @pendle/sdk-boros
```

## Initialization

```typescript
constructor(walletClient: WalletClient, root: Address, accountId: number)
```

The Exchange class requires three parameters for initialization:

- `walletClient`: A viem WalletClient instance for signing transactions
- `root`: The wallet address (Address type from viem)
- `accountId`: The numerical ID of the account to interact with

Example:

```typescript
import { createWalletClient, http } from 'viem';
import { Exchange } from 'pendle-sdk-boros';

const account = privateKeyToAccount(PRIVATE_KEY);

const walletClient = createWalletClient({
  transport: http(RPC_URL),
  account: account
});

const exchange = new Exchange(
  walletClient,
  '0xYourWalletAddress',
  0 // accountId
);
```

## Example Flow: Creating an Agent and Placing an Order

Below is a complete example showing how to pay gas to treasury, create an agent, approve it, and place an order:

```typescript
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import {
  Exchange,
  Agent,
  Side,
  TimeInForce,
  MarketAccLib,
  setEnv
} from 'pendle-sdk-boros';

setEnv('production');
// Setup wallet client
const PRIVATE_KEY = '0xYourPrivateKey';
const RPC_URL = 'https://your-rpc-endpoint.com';
const account = privateKeyToAccount(PRIVATE_KEY);
const accountId = 0;

const walletClient = createWalletClient({
  transport: http(RPC_URL),
  account: account
});

async function placeOrderExample() {
  const exchange = new Exchange(walletClient, account.address, accountId);

  const agent = await Agent.create(walletClient);

  const approvalTx = await exchange.approveAgent(agent);
  console.log('Agent approved:', approvalTx);
  const tokenId = 0;
  const marketId = 0;

  const gasBalance = await exchange.getGasBalance();
  console.log('gasBalance', gasBalance);

  const payTreasuryRes = await exchange.payTreasury({
    isCross: true,
    marketId: 2,
    usdAmount: 1
  });
  console.log(payTreasuryRes);

  const marketAcc = MarketAccLib.pack(
    account.address,
    accountId,
    tokenId,
    marketId
  );

  const orderParams: PlaceOrderParams = {
    marketAcc,
    marketId,
    side: Side.LONG,
    size: BigInt('1000000000000000000'),
    limitTick: Number(getTickAtInterest(interestRate, Side.LONG)),
    tif: TimeInForce.GOOD_TIL_CANCELLED
  };

  const orderResult = await exchange.placeOrder(orderParams);

  console.log('Order placed:', orderResult);

  const bulkOrderResult = await exchange.bulkPlaceOrders({
    marketAcc: '0x1eca053af93a7afaefcd2133a352f422c3c04903000001ffffff',
    marketId: 2,
    orders: {
      sides: [0, 1],
      sizes: [1000000000000000000n, 2000000000000000000n],
      limitTicks: [69, 89],
      tif: TimeInForce.GOOD_TIL_CANCELLED
    },
    cancels: {
      ids: [],
      isAll: false,
      isStrict: false
    }
  });
  const {
    executeResponse: bulkOrderExecuteResponse,
    result: { orders }
  } = bulkOrderResult;
  console.log('Bulk order result:', bulkOrderResult);

  return orderResult;
}

placeOrderExample()
  .then((result) => console.log('Example completed successfully'))
  .catch((error) => console.error('Error in example:', error));
```

This example demonstrates the complete flow from initializing the Exchange class to successfully placing an order. The agent creation and approval steps are required before you can place orders on the platform.

## Order Management

### Get Tick at Interest

```typescript
estimateTickForRate(rate: FixedX18, step: bigint, roundDown: boolean): bigint;
```

Returns the tick price limit for a given interest rate and side.

Parameters:

- `rate`: The interest rate
- `step`: tickstep (in market.imData)

Example:

```typescript
const tick = estimateTickForRate(
  FixedX18.fromNumber(interestRate),
  BigInt(market.imData.tickStep),
  true
);
console.log('Tick:', tick);
```

### Pay gas to treasury

```typescript
const gasBalance = await exchange.getGasBalance();
console.log('gasBalance', gasBalance);

const payTreasuryRes = await exchange.payTreasury({
  isCross: true,
  marketId: 2,
  usdAmount: 1
});
console.log(payTreasuryRes);
```

Pay to treasury to increase gas balance so that we can send transaction for you

### Place Order

```typescript
async placeOrder(params: PlaceOrderParams): Promise<{
  executeResponse: any;
  result: { order: any };
}>
```

Places a new order on the exchange.

Parameters:

- `marketAcc`: Use MarketAccLib to pack
- `marketId`: Id of the market
- `side`: Trade side (Enum: Side)
- `size`: Order size as bigint
- `limitTick`: The tick price limit
- `tif`: Time-in-force setting enum (GOOD_TIL_CANCELLED = 0, IMMEDIATE_OR_CANCEL = 1, FILL_OR_KILL = 2, POST_ONLY = 3)

Example:

```typescript
const result = await exchange.placeOrder({
  marketAcc: '0xMarketAccHex',
  marketId: 0,
  side: Side.LONG,
  size: 100000000000000000000n, // 100 tokens with 18 decimals
  limitTick: Number(getTickAtInterest(interestRate, Side.LONG)),
  tif: TimeInForce.GOOD_TIL_CANCELLED
});
```

### Bulk Place Orders

```typescript
async bulkPlaceOrders(orderRequests: PlaceOrderParams[]): Promise<Array<{
  executeResponse: any;
  result: { order: any };
}>>
```

Places multiple orders in a single transaction.

Parameters:

- `orderRequests`: Array of PlaceOrderParams objects

Example:

```typescript
const bulkOrderParams: BulkPlaceOrderParams = {
  marketAcc,
  marketId,
  side: Side.LONG,
  sizes: [BigInt('1000000000000000000'), BigInt('2000000000000000000')],
  limitTicks: [
    Number(getTickAtInterest(interestRate, Side.LONG)),
    Number(getTickAtInterest(interestRate, Side.LONG))
  ],
  tif: TimeInForce.GOOD_TIL_CANCELLED
};

const results = await exchange.bulkPlaceOrders(bulkOrderParams);
```

### Modify Order

```typescript
async modifyOrder(params: ModifyOrderParams): Promise<{
  executeResponse: any;
  result: { order: any };
}>
```

Modifies an existing order.

Parameters:

- `orderId`: ID of the order to modify
- `marketAcc`: Hexadecimal market account identifier
- `marketId`: Id of the market
- `size`: New order size as bigint
- `limitTick`: New tick price limit
- `tif`: New time-in-force setting

Example:

```typescript
const result = await exchange.modifyOrder({
  orderId: '123456789',
  marketAcc: '0xMarketAccHex',
  marketId: 0,
  size: 150000000000000000000n, // 150 tokens with 18 decimals
  limitTick: 1050,
  tif: TimeInForce.GOOD_TIL_CANCELLED
});
```

### Bulk Modify Orders

```typescript
async bulkModifyOrder(orderRequests: ModifyOrderParams[]): Promise<Array<{
  executeResponse: any;
  result: { order: any };
}>>
```

Modifies multiple orders.

Parameters:

- `orderRequests`: Array of ModifyOrderParams objects

### Cancel Orders

```typescript
async cancelOrders(params: CancelOrdersParams): Promise<{
  executeResponse: any;
  result: { cancelledOrders: any };
}>
```

Cancels one or more orders.

Parameters:

- `marketAcc`: Use MarketAccLib to get
- `marketId`: Id of the market
- `cancelAll`: Boolean indicating whether to cancel all orders
- `orderIds`: Array of order IDs to cancel (used when cancelAll is false)

Example:

```typescript
// Cancel specific orders
const result = await exchange.cancelOrders({
  marketAcc: '0xMarketAccHex',
  marketId: 0,
  cancelAll: false,
  orderIds: ['123456789', '987654321']
});

// Cancel all orders
const result = await exchange.cancelOrders({
  marketAcc: '0xMarketAccHex',
  marketId: 0,
  cancelAll: true,
  orderIds: []
});
```

### Bulk Cancel Orders

```typescript
async bulkCancelOrders(cancelOrderRequests: CancelOrdersParams[]): Promise<Array<{
  executeResponse: any;
  result: { cancelledOrders: any };
}>>
```

Cancels multiple orders from different markets.

Parameters:

- `cancelOrderRequests`: Array of CancelOrdersParams objects

## Agent Management

### Approve Agent

```typescript
async approveAgent(agent?: Agent): Promise<any>
```

Approves an agent for transaction signing.

Parameters:

- `agent`: Optional Agent instance. If not provided, a new agent will be created.

Example:

```typescript
// Approve a new agent
const agentApproval = await exchange.approveAgent();

// Approve a specific agent
import { Agent } from 'pendle-sdk-boros';
const customAgent = await Agent.create(walletClient);
const agentApproval = await exchange.approveAgent(customAgent.agent);
```

## Funds Management

### Deposit

```typescript
async deposit(params: DepositParams): Promise<any>
```

Deposits funds into the exchange.

Parameters:

- `userAddress`: Address of the user
- `collateralAddress`: Address of the collateral token
- `amount`: Amount to deposit as bigint

Example:

```typescript
const receipt = await exchange.deposit({
  userAddress: '0xYourWalletAddress',
  collateralAddress: '0xTokenAddress',
  amount: 1000000000000000000n // 1 token with 18 decimals
});
```

### Withdraw

```typescript
async withdraw(params: WithdrawParams): Promise<any>
```

Withdraws funds from the exchange.

Parameters:

- `userAddress`: Address of the user
- `collateralAddress`: Address of the collateral token
- `amount`: Amount to withdraw as bigint

Example:

```typescript
const receipt = await exchange.withdraw({
  userAddress: '0xYourWalletAddress',
  collateralAddress: '0xTokenAddress',
  amount: 1000000000000000000n // 1 token with 18 decimals
});
```

### Cash Transfer

```typescript
async cashTransfer(params: CashTransferParams): Promise<any>
```

Transfers cash between markets.

Parameters:

- `marketId`: ID of the market
- `isDeposit`: true if transferring from vault to marketId
- `amount`: Amount to transfer as bigint

Example:

```typescript
const response = await exchange.cashTransfer({
  marketId: 1,
  isDeposit: true,
  amount: 1000000000000000000n // 1 token with 18 decimals
});
```

## Position Management

### Close Active Positions

```typescript
async closeActivePositions(params: CloseActivePositionsParams): Promise<any>
```

Closes active positions.

Parameters:

- `marketAcc`: Hexadecimal market account identifier
- `marketId`: Id of the market
- `type`: Type of closing ("market" or "limit")
- `size`: Size to close as bigint
- `rate`: Optional rate for limit closings

Example:

```typescript
// Close with market order
const response = await exchange.closeActivePositions({
  marketAcc: '0xMarketAccHex',
  marketId: 0,
  type: 'market',
  size: 100000000000000000000n // 100 tokens with 18 decimals
});

// Close with limit order
const response = await exchange.closeActivePositions({
  marketAcc: '0xMarketAccHex',
  marketId: 0,
  type: 'limit',
  size: 100000000000000000000n,
  rate: 0.05 // 5% rate
});
```

## Settings Management

### Update Settings

```typescript
async updateSettings(params: UpdateSettingsParams): Promise<any>
```

Updates account settings.

Parameters:

- `marketAcc`: Hexadecimal market account identifier
- `marketId`: Id of the market
- `leverage`: Leverage value
- `signature`: Signature as hexadecimal
- `agent`: Agent address as hexadecimal
- `timestamp`: Timestamp

Example:

```typescript
const response = await exchange.updateSettings({
  marketAcc: '0xMarketAccHex',
  marketId: 0,
  leverage: 5, // 5x leverage
  signature: '0xSignatureHex',
  agent: '0xAgentAddress',
  timestamp: Math.floor(Date.now() / 1000)
});
```

## Data Retrieval

### Get Markets

```typescript
async getMarkets(params: GetMarketsParams): Promise<any>
```

Retrieves market data.

Parameters:

- `skip`: Optional number of records to skip
- `limit`: Optional limit on the number of records
- `isWhitelisted`: Optional filter for whitelisted markets

Example:

```typescript
const markets = await exchange.getMarkets({
  skip: 0,
  limit: 10,
  isWhitelisted: true
});
```

### Get Order Book

```typescript
async getOrderBook(params: GetOrderBookParams): Promise<any>
```

Retrieves the order book for a market.

Parameters:

- `marketId`: Id of the market
- `tickSize`: Tick size (0.00001, 0.0001, 0.001, 0.01, or 0.1)

Example:

```typescript
const orderBook = await exchange.getOrderBook({
  marketId: 0,
  tickSize: 0.001
});
```

### Get PnL Limit Orders

```typescript
async getPnlLimitOrders(params: GetPnlLimitOrdersParams): Promise<any>
```

Retrieves PnL (Profit and Loss) limit orders.

Parameters:

- `skip`: Optional number of records to skip
- `limit`: Optional limit on the number of records
- `isActive`: Optional filter for active orders
- `marketId`: Id of the market
- `orderBy`: Optional field to order by ('timeClosed', 'positionSize', 'avgFixedApr', 'avgUnderlyingApr', 'pnl')

Example:

```typescript
const pnlOrders = await exchange.getPnlLimitOrders({
  skip: 0,
  limit: 10,
  isActive: true,
  marketId: 0,
  orderBy: 'pnl'
});
```

### Get Collaterals

```typescript
async getCollaterals(): Promise<any>
```

Retrieves collateral information for the current user and account.

Example:

```typescript
const collaterals = await exchange.getCollaterals();
```

### Get Active Positions

```typescript
async getActivePositions(params: GetActivePositionsParams): Promise<any>
```

Retrieves active positions.

Parameters:

- `marketId`: Id of the market

Example:

```typescript
// Get all active positions
const allPositions = await exchange.getActivePositions({});

// Get active positions for a specific market
const marketPositions = await exchange.getActivePositions({
  marketId: 0
});
```

### Get Closed Positions

```typescript
async getClosedPositions(params: GetClosedPositionsParams): Promise<any>
```

Retrieves closed positions.

Parameters:

- `marketId`: Id of the market
- `skip`: Optional number of records to skip
- `limit`: Optional limit on the number of records
- `orderBy`: Optional field to order by ('timeClosed', 'positionSize', 'avgFixedApr', 'avgUnderlyingApr', 'pnl')

Example:

```typescript
const closedPositions = await exchange.getClosedPositions({
  marketId: 0,
  skip: 0,
  limit: 10,
  orderBy: 'timeClosed'
});
```
