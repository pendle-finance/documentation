---
sidebar_position: 2
---

# Methods

## Comptroller

### Instantiation

```ts
import { Comptroller } from '@pendle/sdk';

const address: string = '0x...';
const protocol: string = 'compound';

const comptroller: Comptroller = new Comptroller(address, protocol);
```

### `getSupplierAprs`
**Comptroller.getSupplierAprs( qiOrCToken: [Token](#token) ) ⇒ Promise<[AprInfo](types#aprinfo)[]>**<br />
&emsp;Fetch the APR of a given yield bearing protocol token.

## Market

### Instantiation

```ts
import { Market } from '@pendle/sdk';

const address: string = '0x...';

const market: Market = Market.find(address);
```

### `find`
**Market.find( address: string [, chainId: number ] ) ⇒ Market**<br />
&emsp;Find the Market given the address and creates an instance.

## OneClickWrapper

### Instantiation

```ts
import { OneClickWrapper, YieldContract, Token } from '@pendle/sdk';

const tokenAddress: string = '0x...';
const forgeId: string = '0x...';
const expiry: number: 1640995200;
const chainId: number: 1;

const underlyingAsset: Token = Token.find(tokenAddress, chainId, expiry);
const yieldContract: YieldContract = new YieldContract(forgeId, underlyingAsset, expiry, chainId);
const oneClickWrapper: OneClickWrapper = new OneClickWrapper(yieldContract);
```

### `apr`
**OneClickWrapper.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).apr( action: [Action](types#action) ) ⇒ Promise<[WrapperAPRInfo](types#wrapperaprinfo)>**<br />
&emsp;Fetches the APR for a particular zap function.

### `send`
**OneClickWrapper.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).send( action: [Action](types#action), sTxns: [Transaction](types#transaction)[], slippage: number ) ⇒ Promise<providers\.TransactionResponse>**<br />
&emsp;Performs the actual zap by broadcasting a tx.

### `simulate`
**OneClickWrapper.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).simulate( action: [Action](types#action), inputTokenAmount: [TokenAmount](#tokenamount), slippage: number [ , walletAddress: string ] ) ⇒ Promise<[SimulationDetails](types#simulationdetails)>**<br />
&emsp;Simulate a zap and fetch the details such as the resulting pool shares.

## OT

### Instantiation

```ts
import { Ot } from '@pendle/sdk';

const otAddress: string = '0x...';
const chainId: number = 1;

const ot: Ot = Ot.find(otAddress, chainId);
```

### `find`
**Ot.find( address: string [ , chainId: number ] ) ⇒ Ot**<br />
&emsp;Gets the OT (ownership token) and creates an instance.

### `fetchRewards`
**Ot.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).fetchRewards( userAddress: string ) ⇒ Promise<[OtReward](types#otreward)[]>**<br />
&emsp;Fetches the accrued rewards (such as stkAave, COMP) from the OT for a user.

### `hasRewardsByForgeId`
**Ot.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).hasRewardsByForgeId( forgeId: string ) ⇒ boolean**<br />
&emsp;Returns a bool indicating if a user has rewards by forgeId.

### `hasRewards`
**Ot.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).hasRewards() ⇒ boolean**<br />
&emsp;Returns a bool indicating if a user has rewards by forgeId for a particular instance of an OT.


### `yieldContract`
**Ot.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).yieldContract( [ chainId: number ] ) ⇒ [YieldContract](#yieldcontract)**<br />
&emsp;Gets an instance of the underlying yield token contract.

## PendleMarket

### Instantiation

```ts
import { PendleMarket } from '@pendle/sdk';

const address: string = '0x...';

const pendleMarket: PendleMarket = PendleMarket.find(address);
```

### `addDualDetails`
**PendleMarket.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).addDualDetails( tokenAmount: [TokenAmount](#tokenamount), _: number ) ⇒ Promise<[AddDualLiquidityDetails](types#adddualliquiditydetails)>**<br />
&emsp;Fetches the adding of liquidity details for 2 assets, such as token amount and share of pool. 2nd arg is unused as we only fetch details here.

### `addDual`
**PendleMarket.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).addDual( tokenAmounts: [TokenAmount](#tokenamount)[], slippage: number ) ⇒ Promise<providers\.TransactionResponse>**<br />
&emsp;Broadcasts a tx to add liquidity for 2 assets.

### `addSingleDetails`
**PendleMarket.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).addSingleDetails( tokenAmount: [TokenAmount](#tokenamount) ) ⇒ Promise<[AddSingleLiquidityDetails](types#addsingleliquiditydetails)>**<br />
&emsp;Fetches the adding of liquidity details for 1 asset of the pair, such as token amount and share of pool.

### `addSingle`
**PendleMarket.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).addSingle( tokenAmount: [TokenAmount](#tokenamount), slippage: number ) ⇒ Promise<providers\.TransactionResponse>**<br />
&emsp;Broadcasts a tx to add liquidity for 1 asset of the pair.

### `fetchInterests`
**PendleMarket.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).fetchInterests( userAddress: string ) ⇒ Promise<YtOrMarketInterest[]>**<br />
&emsp;Fetches the accrued interests from the YT in the market for a user.

### `find`
**PendleMarket.find( address: string [, chainId: number ] ) ⇒ PendleMarket**<br />
&emsp;Find the PendleMarket given the address and creates an instance.

### `getLiquidityTransactions`
**PendleMarket.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).getLiquidityTransactions( query: [PendleAmmQuery](types#pendleammquery) ) ⇒ Promise<[TRANSACTION](types#transaction)[]>**<br />
&emsp;Fetches the add/remove liquidity transactions of the signer in the market.

### `getLPPriceBigNumber`
**PendleMarket.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).getLPPriceBigNumber() ⇒ Promise<BigNumber\>**<br />
&emsp;Fetches the price of the LP token of a market.

### `getMarketFactoryId`
**PendleMarket.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).getMarketFactoryId() ⇒ Promise<string\>**<br />
&emsp;Fetches the market factory ID for a market.

### `getSwapFeeApr`
**PendleMarket.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).getSwapFeeApr() ⇒ Promise<string\>**<br />
&emsp;Fetches the swap fee APR for a market.

### `getYTPrice`
**PendleMarket.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).getYTPrice( marketReserves: [MarketReservesRaw](types#marketreservesraw) | undefined ) ⇒ Promise<string\>**<br />
&emsp;Fetches the YT price in a market.

### `getSwapTransactions`
**PendleMarket.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).getSwapTransactions( query: [PendleAmmQuery](types#pendleammquery) ) ⇒ Promise<[TRANSACTION](types#transaction)[]>**<br />
&emsp;Fetches the swap transactions of the signer in the market.

### `swapExactInDetails`
**PendleMarket.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).swapExactInDetails( inTokenAmount: [TokenAmount](#tokenamount), slippage: number ) ⇒ Promise<[SwapDetails](types#swapdetails)>**<br />
&emsp;Fetches the exact-in swapping details, such as the source and destination token, amounts, and price impact.

### `swapExactIn`
**PendleMarket.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).swapExactInDetails( inTokenAmount: [TokenAmount](#tokenamount), slippage: number ) ⇒ Promise<[SwapDetails](types#swapdetails)>**<br />
&emsp;Broadcasts a tx to perform an exact-in-amount swap.

### `swapExactOutDetails`
**PendleMarket.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).swapExactOutDetails( inTokenAmount: [TokenAmount](#tokenamount), slippage: number ) ⇒ Promise<[SwapDetails](types#swapdetails)>**<br />
&emsp;Fetches the exact-out swapping details, such as the source and destination token, amounts, and price impact.

### `swapExactOut`
**PendleMarket.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).swapExactOut( inTokenAmount: [TokenAmount](#tokenamount), slippage: number ) ⇒ Promise<[SwapDetails](types#swapdetails)>**<br />
&emsp;Broadcasts a tx to perform an exact-out-amount swap.

### `readMarketDetails`
**PendleMarket.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).readMarketDetails() ⇒ Promise<[MarketDetails](types#marketdetails)>**<br />
&emsp;Fetches market details such as reserves, liquidity, and volume.

### `removeDualDetails`
**PendleMarket.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).removeDualDetails( percentage: number, _: number ) ⇒ Promise<[RemoveDualLiquidityDetails](types#removedualliquiditydetails)>**<br />
&emsp;Fetches the removing of liquidity details for 2 assets, such as token amount and share of pool. 2nd arg is unused as we only fetch details here.

### `removeDual`
**PendleMarket.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).removeDual( tokenAmounts: [TokenAmount](#tokenamount)[], slippage: number ) ⇒ Promise<providers\.TransactionResponse>**<br />
&emsp;Broadcasts a tx to remove liquidity for 2 assets.

### `removeSingleDetails`
**PendleMarket.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).removeSingleDetails( percentage: number, outToken: Token, _: number ) ⇒ Promise<[RemoveSingleLiquidityDetails](types#removesingleliquiditydetails)>**<br />
&emsp;Fetches the removing of liquidity details for 1 asset of the pair, such as token amount. 3rd arg is unused as we only fetch details here.

### `removeSingle`
**PendleMarket.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).removeSingle( percentage: number, outToken: Token, slippage: number ) ⇒ Promise<providers\.TransactionResponse>**<br />
&emsp;Broadcasts a tx to remove liquidity for 1 asset of the pair.

### `yieldContract`
**PendleMarket.yieldContract( [ chainId: number ] ) ⇒ [YieldContract](#yieldcontract-1)**<br />
&emsp;Find the PendleMarket given the address and creates an instance.

## MasterChef

### Instantiation

```ts
import { MasterChef } from '@pendle/sdk';
```

### `getRewardsAprs`
**MasterChef.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).getRewardsAprs( pid: number ) ⇒ Promise<[AprInfo](types#aprinfo)[]>**<br />
&emsp;Gets the reward APRs for a given PID from the masterchef contracts (e.g. Sushi, TraderJoe).

## StakingPool

### Instantiation

```ts
import { StakingPool } from '@pendle/sdk';

const address: string = '0x...';
const inputTokenAddress: string = '0x...';
const chainId: number = 1;

const stakingPool: StakingPool = StakingPool.find(address, inputTokenAddress, chainid);
```

### `find`
**StakingPool.find( address: string, inputTokenAddress: string, chainId?: number ) ⇒ StakingPool**<br />
&emsp;Find the StakingPool given the address and input token address, then creates an instance.

### `balanceOf`
**StakingPool.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).balanceOf( address: string ) ⇒ Promise<[StakedAmount](types#stakedamount)>**<br />
&emsp;Gets the staked amount of a user in the masterchef.

### `rewardAprs`
**StakingPool.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).rewardAprs() ⇒ Promise<[AprInfo](types#aprinfo)[]>**<br />
&emsp;Gets the reward APRs from the masterchef.

### `stake`
**StakingPool.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).stake( amount: [TokenAmount](#tokenamount) ) ⇒ Promise<providers\.TransactionResponse>**<br />
&emsp;Broadcasts a tx to stake into the masterchef.

### `unstake`
**StakingPool.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).unstake( amount: [TokenAmount](#tokenamount) ) ⇒ Promise<providers\.TransactionResponse>**<br />
&emsp;Broadcasts a tx to unstake from the masterchef.

## Token

### Instantiation

```ts
import { Token } from '@pendle/sdk';

const address: string = '0x...';

const token: Token = Token.find(address);
```

### `find`
**Token.find( address: string [ , chainId: number ,  [, expiry: number ] ) ⇒ Token**<br />
&emsp;Find the Token given the params and creates an instance.

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
**tokenAmount.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).balancesOf( { user, tokens }: { user: string, tokens: [Token](#token)[] } ) ⇒ Promise<TokenAmount[]>**<br />
&emsp;Returns the token balance of the passed in user address.

## TokenDistributor

### Instantiation

```ts
import { TokenDistributor } from '@pendle/sdk';
```

### `fetchClaimableRewards`
**TokenDistributor.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).fetchClaimableRewards( tokens: Token[], userAddress: string} ) ⇒ Promise<[TokenAmount](#tokenamount)[]>**<br />
&emsp;Fetches the claimable reward amounts of the provider signer.

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
**yieldContract.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).getPrincipalPerYT() ⇒ Promise<TokenAmount\>**<br />
&emsp;Gets the amount of underlying principal tokens per amount of YT held.

### `getMintTransactions`
**yieldContract.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).getMintTransactions( query: [ForgeQuery](types#forgequery) ) ⇒ Promise<[TRANSACTION](types#transaction)[]>**<br />
&emsp;Fetches mint transactions for signer given passed query.

### `getRedeemTransactions`
**yieldContract.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).getRedeemTransactions( query: [ForgeQuery](types#forgequery) ) ⇒ Promise<[TRANSACTION](types#transaction)[]>**<br />
&emsp;Fetches redeem transactions for signer given passed query.

### `mint`
**yieldContract.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).mint( toMint: [TokenAmount](#tokenamount) ) ⇒ Promise<providers\.TransactionResponse>**<br />
&emsp;Broadcasts a tx that mints OT and YT based on toMint amount passed.

### `mintDetails`
**yieldContract.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).mintDetails( toMint: [TokenAmount](#tokenamount) ) ⇒ Promise<TokenAmount[]>**<br />
&emsp;Returns the static amount of the OT and YT to be minted based on toMint amount passed. Simulates a state transition through callStatic.

### `redeem`
**yieldContract.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).mint( toRedeem: [TokenAmount](#tokenamount) ) ⇒ Promise<providers\.TransactionResponse>**<br />
&emsp;Broadcasts a tx that redeems the OT rewards and interests.

### `redeemDetails`
**yieldContract.redeemDetails( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).mint( amountToRedeem: [TokenAmount](#tokenamount), userAddress: string ) ⇒ Promise<[RedeemDetails](types#redeemdetails)\>**<br />
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
**Yt.yieldContract( [ chainId: number ] ) ⇒ [YieldContract](#yieldcontract)**<br />
&emsp;Gets an instance of the underlying yield token contract.

### `fetchInterests`
**Yt.methods( chainSpecifics: [ChainSpecifics](types#chainspecifics) ).fetchInterests( userAddress: string ) ⇒ Promise<[YtOrMarketInterest](types#ytormarketinterest[]>**<br />
&emsp;Fetches the accrued interests from the YT for a user.
