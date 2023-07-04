---
hide_table_of_contents: true
---

# Market Entity

## Overview

The Pendle SDK `MarketEntity` is a simple entity that wrap around [PendleMarket contract](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/core/Market/PendleMarket.sol). This entity allows the user to get the basic information about a `PendleMarket`.

`MarketEntity` is also a Pendle SDK `ERC20Entity`, because in reality, the `PendleMarket` contract is technically also an `ERC20` contract. Please checkout the [ERC20 Interaction tutorial with the Pendle SDK](./ERC20Interaction.md) for in-depth explanation of `ERC20Entity` in particular and of `PendleEntity` in general.

## `MarketEntity` Object Creation

Similar to `ERC20Entity`, `MarketEntity` requires:
- The contract address.
- Network Provider and/or a Signer

Additionally, `MarketEntity` requires the `chainId` to get the off-chain helper
for the corresponding chain.

Let's take a look at the [FRAX-USDC market](https://app.pendle.finance/pro/markets/0x7b246b8dbc2a640bf2d8221890cee8327fc23917/swap?view=yt)

```ts
import {
    toAddress,
    MarketEntity,
    ERC20Entity,
    Multicall,
} from '@pendle/sdk-v2';
import { provider } from './sdk-doc-playground.mjs';
const FRAX_USDCContractAddress = toAddress(
    '0x7b246b8dbc2a640bf2d8221890cee8327fc23917'
);

const FRAX_USDCMarket = new MarketEntity(FRAX_USDCContractAddress, {
    chainId: 1,
    provider,

    // This is optional. Including `Multicall` here will enable multicall for
    // subsequenct read-only calls.
    multicall: new Multicall({ chainId: 1, provider }),
});

async function getERC20MetaData(erc20: ERC20Entity) {
    const [name, symbol, totalSupply, decimals] = await Promise.all([
        erc20.name(),
        erc20.symbol(),
        erc20.totalSupply(),
        erc20.decimals(),
    ]);
    return { name, symbol, totalSupply, decimals };
}

console.log(await getERC20MetaData(FRAX_USDCMarket));
```

Output:

```ts
{
  name: 'Pendle Market',
  symbol: 'PENDLE-LPT',
  totalSupply: BigNumber { value: "865584995351942836127" },
  decimals: 18
}
```

## Querying `MarketEntity` Information

### Getting corresponding tokens of a `MarketEntity`

We can get the Market's `PT`, `YT` and `Sy` tokens' addresses using the the
method with the same name.

```ts
{
    const [ptAddress, ytAddress, syAddress] = await Promise.all([
        FRAX_USDCMarket.PT(),
        FRAX_USDCMarket.YT(),
        FRAX_USDCMarket.SY(),
    ]);
    console.log({ ptAddress, ytAddress, syAddress });
}
```

Output:

```ts
{
  ptAddress: '0x5fe30ac5cb1abb0e44cdffb2916c254aeb368650',
  ytAddress: '0xc5cd692e9b4622ab8cdb57c83a0f99f874a169cd',
  syAddress: '0xd393d1ddd6b8811a86d925f5e14014282581bc04'
}
```

The function name are all CAP to reflect the same functions of the contract. `MarketEntity` also includes the lowercase function as alias.

```ts
{
    const [ptAddress, ytAddress, syAddress] = await Promise.all([
        FRAX_USDCMarket.pt(),
        FRAX_USDCMarket.yt(),
        FRAX_USDCMarket.sy(),
    ]);
    console.log({ ptAddress, ytAddress, syAddress });
}
```

Output:

```ts
{
  ptAddress: '0x5fe30ac5cb1abb0e44cdffb2916c254aeb368650',
  ytAddress: '0xc5cd692e9b4622ab8cdb57c83a0f99f874a169cd',
  syAddress: '0xd393d1ddd6b8811a86d925f5e14014282581bc04'
}
```

### Getting the tokens as a `PendleEntity`

Use `ptEntity`, `ytEntity` and `syEntity` to get the coressponding `PendleEntity` of `PT`, `YT` and `SY` with the same configuration as the `MarketEntity.

```ts
{
    const [ptEntity, ytEntity, syEntity] = await Promise.all([
        FRAX_USDCMarket.ptEntity(),
        FRAX_USDCMarket.ytEntity(),
        FRAX_USDCMarket.syEntity(),
    ]);

    console.log({
        ptInfo: await getERC20MetaData(ptEntity),
        ytInfo: await getERC20MetaData(ytEntity),
        syInfo: await getERC20MetaData(syEntity),
    });
}
```

Output:

```ts
{
  ptInfo: {
    name: 'PT FRAXUSDC_CurveLP Convex 30MAR2023',
    symbol: 'PT-FRAXUSDC_CurveLP Convex-30MAR2023',
    totalSupply: BigNumber { value: "900103365617348713482" },
    decimals: 18
  },
  ytInfo: {
    name: 'YT FRAXUSDC_CurveLP Convex 30MAR2023',
    symbol: 'YT-FRAXUSDC_CurveLP Convex-30MAR2023',
    totalSupply: BigNumber { value: "695041199422804112579898" },
    decimals: 18
  },
  syInfo: {
    name: 'SY FRAXUSDC_CurveLP Convex',
    symbol: 'SY-FRAXUSDC_CurveLP Convex',
    totalSupply: BigNumber { value: "2571505102143705367580" },
    decimals: 18
  }
}
```

### Getting the reward tokens

```ts
console.log(await FRAX_USDCMarket.getRewardTokens());
```

Output:

```ts
[
  '0xd533a949740bb3306d119cc777fa900ba034cd52',
  '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b',
  '0x808507121b80c02388fad14726482e061b8da827'
]
```

### Getting market information

To get the [PendleMarket contract state](https://github.com/pendle-finance/pendle-core-v2-public/blob/38347af3b08ffc6cbf6ab5c70f4aee0b29ef4be6/contracts/core/Market/MarketMathCore.sol#L11), we can use `MarketEntity#readState` function.

```ts
console.log(await FRAX_USDCMarket.readState());
```

Output:

```ts
{
  '0': BigNumber { value: "827166031270122365344" },
  '1': BigNumber { value: "916277796433343523026" },
  '2': BigNumber { value: "865584995351942836127" },
  '3': '0x8270400d528c34e1596EF367eeDEc99080A1b592',
  '4': BigNumber { value: "27800000000000000000" },
  '5': BigNumber { value: "1680134400" },
  '6': BigNumber { value: "999500333083533" },
  '7': BigNumber { value: "80" },
  '8': BigNumber { value: "27025149854298173" },
  totalPt: BigNumber { value: "827166031270122365344" },
  totalSy: BigNumber { value: "916277796433343523026" },
  totalLp: BigNumber { value: "865584995351942836127" },
  treasury: '0x8270400d528c34e1596ef367eedec99080a1b592',
  scalarRoot: BigNumber { value: "27800000000000000000" },
  expiry: BigNumber { value: "1680134400" },
  lnFeeRateRoot: BigNumber { value: "999500333083533" },
  reserveFeePercent: BigNumber { value: "80" },
  lastLnImpliedRate: BigNumber { value: "27025149854298173" }
}
```

We also provides a higher-level function called `MarketEntity#getMarketInfo`. This functions also returns the market state, as well as two other fields: `marketExchangeRateExcludeFee` and `impliedYield`.

```ts
console.log(await FRAX_USDCMarket.getMarketInfo());
```

Output:

```ts
{
  '0': '0x5fe30Ac5cb1aBB0e44CdffB2916c254AEb368650',
  '1': '0xC5Cd692e9b4622ab8Cdb57C83A0f99f874A169Cd',
  '2': '0xD393D1dDd6B8811A86D925F5E14014282581bC04',
  '3': BigNumber { value: "1027393641238955112" },
  '4': BigNumber { value: "1000000000000000000" },
  '5': [
    BigNumber { value: "827166031270122365344" },
    BigNumber { value: "916277796433343523026" },
    BigNumber { value: "865584995351942836127" },
    '0x8270400d528c34e1596EF367eeDEc99080A1b592',
    BigNumber { value: "27800000000000000000" },
    BigNumber { value: "1680134400" },
    BigNumber { value: "999500333083533" },
    BigNumber { value: "80" },
    BigNumber { value: "27025149854298173" },
    totalPt: BigNumber { value: "827166031270122365344" },
    totalSy: BigNumber { value: "916277796433343523026" },
    totalLp: BigNumber { value: "865584995351942836127" },
    treasury: '0x8270400d528c34e1596EF367eeDEc99080A1b592',
    scalarRoot: BigNumber { value: "27800000000000000000" },
    expiry: BigNumber { value: "1680134400" },
    lnFeeRateRoot: BigNumber { value: "999500333083533" },
    reserveFeePercent: BigNumber { value: "80" },
    lastLnImpliedRate: BigNumber { value: "27025149854298173" }
  ],
  pt: '0x5fe30ac5cb1abb0e44cdffb2916c254aeb368650',
  yt: '0xc5cd692e9b4622ab8cdb57c83a0f99f874a169cd',
  sy: '0xd393d1ddd6b8811a86d925f5e14014282581bc04',
  impliedYield: BigNumber { value: "1027393641238955112" },
  marketExchangeRateExcludeFee: BigNumber { value: "1000000000000000000" },
  state: {
    '0': BigNumber { value: "827166031270122365344" },
    '1': BigNumber { value: "916277796433343523026" },
    '2': BigNumber { value: "865584995351942836127" },
    '3': '0x8270400d528c34e1596EF367eeDEc99080A1b592',
    '4': BigNumber { value: "27800000000000000000" },
    '5': BigNumber { value: "1680134400" },
    '6': BigNumber { value: "999500333083533" },
    '7': BigNumber { value: "80" },
    '8': BigNumber { value: "27025149854298173" },
    totalPt: BigNumber { value: "827166031270122365344" },
    totalSy: BigNumber { value: "916277796433343523026" },
    totalLp: BigNumber { value: "865584995351942836127" },
    treasury: '0x8270400d528c34e1596ef367eedec99080a1b592',
    scalarRoot: BigNumber { value: "27800000000000000000" },
    expiry: BigNumber { value: "1680134400" },
    lnFeeRateRoot: BigNumber { value: "999500333083533" },
    reserveFeePercent: BigNumber { value: "80" },
    lastLnImpliedRate: BigNumber { value: "27025149854298173" }
  }
}
```

### Getting user information

To demonstrate the usage of these functions, we should have a user address that already had balance in this market. Let's consider the user `0xbD525dfF925DF9c063C77B29d5Eec8f977B79476`.

```ts
const userAddress = toAddress('0xbD525dfF925DF9c063C77B29d5Eec8f977B79476');
```

## Getting user's balance and user's active balance.

```ts
console.log({
    userBalance: await FRAX_USDCMarket.balanceOf(userAddress),
    userActiveBalance: await FRAX_USDCMarket.activeBalance(userAddress),
});
```

Output:

```ts
{
  userBalance: BigNumber { value: "2381607113073137129" },
  userActiveBalance: BigNumber { value: "952645870769841273" }
}
```

### Getting user's balances and unclaimed rewards

```ts
console.log(await FRAX_USDCMarket.getUserMarketInfo(userAddress));
```

Output:

```ts
{
  lpBalance: {
    token: '0x7b246b8dbc2a640bf2d8221890cee8327fc23917',
    amount: BigNumber { value: "2381607113073137129" }
  },
  ptBalance: {
    token: '0x5fe30ac5cb1abb0e44cdffb2916c254aeb368650',
    amount: BigNumber { value: "2275899552723200631" }
  },
  syBalance: {
    token: '0xd393d1ddd6b8811a86d925f5e14014282581bc04',
    amount: BigNumber { value: "2521085426913336150" }
  },
  unclaimedRewards: [
    {
      token: '0xd533a949740bb3306d119cc777fa900ba034cd52',
      amount: BigNumber { value: "1110427423923" }
    },
    {
      token: '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b',
      amount: BigNumber { value: "17766838782" }
    },
    {
      token: '0x808507121b80c02388fad14726482e061b8da827',
      amount: BigNumber { value: "0" }
    }
  ]
}
```

### Simulating rewards redemption

To simulate the rewards redeeming process, use `MarketEntity#simulateRewards` function.

```ts
console.log(await FRAX_USDCMarket.getRewardTokens());
console.log(await FRAX_USDCMarket.simulateRedeemRewards(userAddress));
```

Output:

```ts
[
  '0xd533a949740bb3306d119cc777fa900ba034cd52',
  '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b',
  '0x808507121b80c02388fad14726482e061b8da827'
]
[
  BigNumber { value: "1110427423923" },
  BigNumber { value: "17766838782" },
  BigNumber { value: "0" }
]
```

To pair the rewards with the corresponding tokens, use `MarketEntity#simulateRedeemRewardsWithTokens` function.

```ts
console.log(await FRAX_USDCMarket.simulateRedeemRewardsWithTokens(userAddress));
```

Output:

```ts
[
  {
    token: '0xd533a949740bb3306d119cc777fa900ba034cd52',
    amount: BigNumber { value: "1110427423923" }
  },
  {
    token: '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b',
    amount: BigNumber { value: "17766838782" }
  },
  {
    token: '0x808507121b80c02388fad14726482e061b8da827',
    amount: BigNumber { value: "0" }
  }
]
```

### Redeeming rewards for a user

Use `MarketEntity#redeemRewards` to perform the reward redeeming transaction
for a given user. As this is a write contract, a signer is require.

```ts
import { testAccounts } from './sdk-doc-playground.mjs';

{
    const writeContract = new MarketEntity(FRAX_USDCContractAddress, {
        chainId: 1,
        signer: testAccounts[0].wallet,
    });

    console.log('Before:');
    console.log(await writeContract.getUserMarketInfo(userAddress));

    const transaction = await writeContract.redeemRewards(userAddress);
    await transaction.wait(/* confirmation= */ 1);

    console.log('After:');
    console.log(await writeContract.getUserMarketInfo(userAddress));
}
```

Output:

```ts
Before:
{
  lpBalance: {
    token: '0x7b246b8dbc2a640bf2d8221890cee8327fc23917',
    amount: BigNumber { value: "2381607113073137129" }
  },
  ptBalance: {
    token: '0x5fe30ac5cb1abb0e44cdffb2916c254aeb368650',
    amount: BigNumber { value: "2275899552723200631" }
  },
  syBalance: {
    token: '0xd393d1ddd6b8811a86d925f5e14014282581bc04',
    amount: BigNumber { value: "2521085426913336150" }
  },
  unclaimedRewards: [
    {
      token: '0xd533a949740bb3306d119cc777fa900ba034cd52',
      amount: BigNumber { value: "1110427423923" }
    },
    {
      token: '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b',
      amount: BigNumber { value: "17766838782" }
    },
    {
      token: '0x808507121b80c02388fad14726482e061b8da827',
      amount: BigNumber { value: "0" }
    }
  ]
}
After:
{
  lpBalance: {
    token: '0x7b246b8dbc2a640bf2d8221890cee8327fc23917',
    amount: BigNumber { value: "2381607113073137129" }
  },
  ptBalance: {
    token: '0x5fe30ac5cb1abb0e44cdffb2916c254aeb368650',
    amount: BigNumber { value: "2275899552723200631" }
  },
  syBalance: {
    token: '0xd393d1ddd6b8811a86d925f5e14014282581bc04',
    amount: BigNumber { value: "2521085426913336150" }
  },
  unclaimedRewards: [
    {
      token: '0xd533a949740bb3306d119cc777fa900ba034cd52',
      amount: BigNumber { value: "0" }
    },
    {
      token: '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b',
      amount: BigNumber { value: "0" }
    },
    {
      token: '0x808507121b80c02388fad14726482e061b8da827',
      amount: BigNumber { value: "0" }
    }
  ]
}
```
