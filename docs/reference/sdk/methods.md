---
sidebar_position: 2
---

# Methods

## Token

### Instantiation

```ts
import { Token } from '@pendle/sdk';

const address: string = '0x...';

const token: Token = Token.find(address);
```

### `find`
**Token.find( address: string [ , chainId: number ,  [, expiry: number ] ) ⇒ Token**<br />
&emsp;Find the Token and creates an instance.

## TokenAmount

### Instantiation

```ts
import { Token, TokenAmount } from '@pendle/sdk';

const tokenAddress: string = '0x...';
const token: Token = Token.find(tokenAddress);
const amount: string = '100';

const tokenAmount: TokenAmount = new TokenAmount(token, amount);
```

### `formattedAmount`
**tokenAmount.formattedAmount() ⇒ string**<br />
&emsp;Formats the token wei amount to human readable format.

### `rawAmount`
**tokenAmount.rawAmount() ⇒ string**<br />
&emsp;Returns the token wei amount of the token.

### `balancesOf`
**tokenAmount.methods( signer ).balancesOf( { user, tokens }: { user: string, tokens: [Token](#token)[] } ) ⇒ Promise<TokenAmount[]>**<br />
&emsp;Returns the token balance of the passed in user address.

## YieldContract

### Instantiation

```ts
import { YieldContract } from '@pendle/sdk';

const ytAddress: string = '0x...';
const chainId: number = 1;

const yt: Yt = Yt.find(ytAddress, chainId);
const yieldContract: YieldContract = Yt.yieldContract();
```

### `getPrincipalPerYT`
**yieldContract.methods( signer ).getPrincipalPerYT() ⇒ Promise<TokenAmount\>**<br />
&emsp;Gets the amount of underlying principal tokens per amount of YT held.

### `getMintTransactions`
**yieldContract.methods( signer ).getMintTransactions( query: [ForgeQuery](types#forgequery) ) ⇒ Promise<[TRANSACTION](types#transaction)[]>**<br />
&emsp;Fetches mint transactions for signer given passed query.

### `getRedeemTransactions`
**yieldContract.methods( signer ).getRedeemTransactions( query: [ForgeQuery](types#forgequery) ) ⇒ Promise<[TRANSACTION](types#transaction)[]>**<br />
&emsp;Fetches redeem transactions for signer given passed query.

### `mint`
**yieldContract.methods( signer ).mint( toMint: [TokenAmount](#tokenamount) ) ⇒ Promise<providers\.TransactionResponse>**<br />
&emsp;Broadcasts a tx that mints OT and YT based on toMint amount passed.

### `mintDetails`
**yieldContract.methods( signer ).mintDetails( toMint: [TokenAmount](#tokenamount) ) ⇒ Promise<TokenAmount[]>**<br />
&emsp;Returns the static amount of the OT and YT to be minted based on toMint amount passed. Simulates a state transition through callStatic.

### `redeem`
**yieldContract.methods( signer ).mint( toRedeem: [TokenAmount](#tokenamount) ) ⇒ Promise<providers\.TransactionResponse>**<br />
&emsp;Broadcasts a tx that redeems the OT rewards and interests.

### `redeemDetails`
**yieldContract.redeemDetails( signer ).mint( amountToRedeem: [TokenAmount](#tokenamount), userAddress: string ) ⇒ Promise<[RedeemDetails](types#redeemdetails)\>**<br />
&emsp;Returns the static redeem amounts from OT rewards and interests.

### `useCompoundMath`
**yieldContract.useCompoundMath() ⇒ boolean**<br />
&emsp;Returns true if using Compound Math, otherwise false.

## YT

### Instantiation

```ts
import { Yt } from '@pendle/sdk';

const ytAddress: string = '0x...';
const chainId: number = 1;

const yt: Yt = Yt.find(ytAddress, chainId);
```

### `find`
**Yt.find( address: string [ , chainId: number ] ) ⇒ Yt**<br />
&emsp;Gets the YT (yield token) and creates an instance.


### `yieldContract`
**Yt.yieldContract( [ chainId: number ] ) ⇒ [YieldContract](#YieldContract)**<br />
&emsp; Gets an instance of the underlying yield token contract.

### `fetchInterests`
**Yt.methods( signer ).fetchInterests( userAddress: string ) ⇒ Promise<YtOrMarketInterest[]>**<br />
&emsp;Fetches the interest rate from the yield token for a user.
