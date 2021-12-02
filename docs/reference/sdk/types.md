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
    otPrice?: CurrencyAmount;,
    impliedDiscount?: string;
  }
}
```

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
}
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

### `TokenReserveDetails`

```ts
type TokenReserveDetails = {
  reserves: TokenAmount;
  weights: string;
};
```

### `YtOrMarketInterest`

```ts
type YtOrMarketInterest = {
  address: string;
  interest: TokenAmount;
};
```
