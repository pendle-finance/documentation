---
sidebar_position: 3
---

# Types

### `AddDualLiquidityDetails`

```ts
type AddDualLiquidityDetails = {
  otherTokenAmount: TokenAmount;
  lpMinted: string;
  shareOfPool: string;
};
```

### `AddSingleLiquidityDetails`

```ts
type AddSingleLiquidityDetails = {
  shareOfPool: string;
  rate: TokenAmount;
  priceImpact: string;
  swapFee: TokenAmount;
};
```

### `Address`

```ts
type Address = string;
```

### `AprInfo`

```ts
type AprInfo = {
	origin: string;
	apr: string;
};
```

### `ChainSpecifics`

```ts
type ChainSpecifics = {
  signer?: providers.JsonRpcSigner;
  provider: providers.JsonRpcProvider;
  chainId: number;
};
```

### `CurrencyAmount`

```ts
type CurrencyAmount = {
  currency: string;
  amount: string;
};
```

### `DataAddLiqOT`

```ts
type DataAddLiqOT = {
  baseToken: string;
  amountTokenDesired: string; // theoritical + slippage
  amountTokenMin: string; // theoritical - slippage
  deadline: number; // + 3hr
  liqMiningAddr: string;
};
```

### `DataAddLiqYT`

```ts
type DataAddLiqYT = {
  baseToken: string;
  amountTokenDesired: string; // theoritical + slippage
  amountTokenMin: string; // theoritical - slippagef
  marketFactoryId: string;
  liqMiningAddr: string;
};
```

### `DataAddLiqUniFork`

```ts
type DataAddLiqUniFork = {
  tokenA: string;
  tokenB: string;
  amountADesired: string; // input
  amountBDesired: string; // theoritical amount + slippage
  amountAMin: string; // input
  amountBMin: string; // theoritical amount - slippage
  deadline: number; // timestamp + 3 hr
  kyberPool: string;
  kybervReserveRatioBounds: number[];
};
```
### `DataAddLiqUniFork`

```ts
type DataAddLiqUniFork = {
  tokenA: string;
  tokenB: string;
  amountADesired: string; // input
  amountBDesired: string; // theoritical amount + slippage
  amountAMin: string; // input
  amountBMin: string; // theoritical amount - slippage
  deadline: number; // timestamp + 3 hr
  kyberPool: string;
  kybervReserveRatioBounds: number[];
};
```

### `DataTknz`

```ts
type DataTknz = {
  single: DataTknzSingle;
  double: DataAddLiqUniFork;
  forge: string; // address
  expiryYT: number;
};
```

### `DataTknzSingle`

```ts
type DataTknzSingle = {
  token: string;
  amount: string;
};
```

### `FutureEpochRewards`

```ts
type FutureEpochRewards = {
  epochId: number;
  rewards: TokenAmount[];
};
```

### `MarketDetails`

```ts
type MarketDetails = {
  tokenReserves: TokenReserveDetails[];
  otherDetails: { // from subgraph
    dailyVolume: CurrencyAmount;
    volume24hChange: string;
    liquidity: CurrencyAmount;
    liquidity24HChange: string;
    swapFeeApr: string;
    impliedYield: string;
    underlyingYieldRate: number;
    YTPrice: CurrencyAmount;
  }
};
```

### `MarketReservesRaw`

```ts
type MarketReservesRaw = {
  xytBalance: BN;
  xytWeight: BN;
  tokenBalance: BN;
  tokenWeight: BN;
  currentBlock: BN;
}
```

### `OtherMarketDetails`

```ts
type OtherMarketDetails = {
  tokenReserves: TokenAmount[];
  otherDetails: {
    rates: TokenAmount[];
    liquidity: CurrencyAmount;
    totalSupplyLP: string;
    otPrice?: CurrencyAmount;
    impliedDiscount?: string;
  }
}
```

### `PairTokens`

```ts
type PairTokens = { 
	tokenA: string; 
	tokenB: string;
	_confirmNoDuplication: boolean;
};
```

### `PairUints`

```ts
type PairUints = {
	uintA: BN;
	uintB: BN;
};
```

### `PendleFixture`

```ts
type PendleFixture = {
  yieldContract: YieldContract;
  ot: Ot;
  yt: Yt;
  forge: Contract;
  data: Contract;
  ytMarket: PendleMarket;
  otMarket: Market;
  otStakingPool: StakingPool
  ytStakingPool: StakingPool;
}
```

### `PoolAccruingRewards`

```ts
type PoolAccruingRewards = {
  address: string;
  inputToken: Token;
  accruingRewards: FutureEpochRewards[];
};
```

### `PoolYields`

```ts
type PoolYields = {
  address: string; // pool
  inputToken: Token;
  yields: YieldInfo[];
};
```

### `RedeemDetails`

```ts
type RedeemDetails = {
  redeemableAmount: TokenAmount;
  interestAmount: TokenAmount;
};
```

### `RemoveDualLiquidityDetails`

```ts
type RemoveDualLiquidityDetails = {
  tokenAmounts: TokenAmount[];
};
```

### `RemoveSingleLiquidityDetails`

```ts
type RemoveSingleLiquidityDetails = {
  outAmount: TokenAmount;
  rate: TokenAmount;
  priceImpact?: string;
  swapFee?: TokenAmount;
};
```

### `SimulationDetails`

```ts
type SimulationDetails = {
  tokenAmounts: TokenAmount[];
  transactions: Transaction[];
  poolShares: {
    otPoolShare: string;
    ytPoolShare: string;
  };
};
```

### `SwapDetails`

```ts
type SwapDetails = {
  inAmount: TokenAmount;
  outAmount: TokenAmount;
  minReceived?: TokenAmount;
  maxInput?: TokenAmount;
  priceImpact: string;
  swapFee: TokenAmount;
};
```

### `StakedAmount`

```ts
type StakedAmount = {
  amount: TokenAmount;
  valuation: CurrencyAmount;
}
```

### `Transaction`

```ts
type Transaction = {
  action: TransactionAction;
  user?: string;
  paid: TokenAmount[];
  maxPaid: TokenAmount[];
  received: TokenAmount[];
  protocol: 'pendle' | 'external';
}
```

### `TokenReserveDetails`

```ts
type TokenReserveDetails = {
  reserves: TokenAmount;
  weights: string;
};
```

### `TRANSACTION`

```ts
type TRANSACTION = {
  action: 'Mint' | 'Redeem' | 'Swap';
  hash: Address;
  user: Address;
  amount: CurrencyAmount;
  paid: [TokenAmount; TokenAmount];
  received: [TokenAmount; TokenAmount];
  network: 'mainnet';
  timestamp?: number;
};
```

### `WrapperAPRInfo`

```ts
type WrapperAPRInfo = {
  totalApr: string;
  composition: {
    otPoolApr: AprInfo[];
    ytPoolApr: AprInfo[];
  };
};
```

### `YieldInfo`

```ts
type YieldInfo = {
  yield: TokenAmount;
  yieldType: YieldType;
};
```

### `YtOrMarketInterest`

```ts
type YtOrMarketInterest = {
  address: string;
  interest: TokenAmount;
};
```

# Enums

### `Action`

```ts
enum Action {
  stakeOT;
  stakeYT;
  stakeOTYT;
}
```

### `TransactionAction`

```ts
enum TransactionAction {
  preMint;
  mint;
  redeem;
  addLiquidity;
  removeLiquidity;
  swap;
  stake;
  unstake;
}
```

### `YieldType`

```ts
enum YieldType {
  INTEREST = "interest";
  REWARDS = "reward";
};
```

# Interfaces

### `ForgeQuery`

```ts
type SubgraphQuery = {
  page: number;
  limit: number;
};

interface ForgeQuery extends SubgraphQuery {
  forgeId: string;
  expiry: number;
  underlyingTokenAddress: Address;
};
```

### `PendleAmmQuery`

```ts
type SubgraphQuery = {
  page: number;
  limit: number;
};

interface PendleAmmQuery extends SubgraphQuery {
  marketAddress: Address;
};
```

### `StakingPoolId`

```ts
interface StakingPoolId {
  address: string;
  inputTokenAddress: string;
  contractType: string;
};
```