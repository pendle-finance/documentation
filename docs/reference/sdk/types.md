---
sidebar_position: 3
---

# Types

### `RedeemDetails`

```ts
type RedeemDetails = {
    redeemableAmount: TokenAmount;
    interestAmount: TokenAmount;
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
}
```

### `TRANSACTION`

```ts
type TRANSACTION = {
    action: 'Mint' | 'Redeem' | 'Swap',
	hash: Address,
	user: Address,
    amount: CurrencyAmount,
    paid: [TokenAmount, TokenAmount],
    received: [TokenAmount, TokenAmount],
	network: 'mainnet',
    timestamp?: number
}
```

### `YtOrMarketInterest`

```ts
type YtOrMarketInterest = {
  address: string;
  interest: TokenAmount;
};
```
