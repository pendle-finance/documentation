---
hide_table_of_contents: true
---

# PT and YT Trading

## Trading PT

Suppose that we want to buy PT in the [Stargate-USDT pool](https://app.pendle.finance/pro/markets/0x30e0dc9a1d33eac83211a1113de238b3ce826950/swap?view=pt&chain=ethereum) with 10 USDT.

```ts
import { toAddress, BN, ERC20Entity } from '@pendle/sdk-v2';
const marketAddress = toAddress('0x30e0dc9a1d33eac83211a1113de238b3ce826950');

const usdtContract = new ERC20Entity(toAddress('0xdAC17F958D2ee523a2206206994597C13D831ec7'), {
    provider,
    signer: testAccounts[0].wallet,
});
const USDT_DECIMALS = BN.from(10).pow(await usdtContract.decimals());
const amountUSDT = USDT_DECIMALS.mul(10);
```

Here is how we can do it:

#### Step 1. Verify your balances before zapping

```ts
import { MarketEntity } from '@pendle/sdk-v2';
const marketContact = new MarketEntity(marketAddress, {
    chainId: 1,
    provider,
    signer: testAccounts[0].wallet,
});
const ptContract = await marketContact.ptEntity();
```

```ts
{
    const ptBalance = await ptContract.balanceOf(testAccounts[0].address);
    const usdtBalance = await usdtContract.balanceOf(testAccounts[0].address);
    console.log('Balances before buying PT', { ptBalance, usdtBalance });
}
```

Output:
```ts
Balances before buying PT {
  ptBalance: BigNumber { value: "10376940" },
  usdtBalance: BigNumber { value: "1000000000" }
}
```

#### Step 2. Approve the router

```ts
await usdtContract.approve(router.address, amountUSDT).then((tx) => tx.wait());
console.log(
    'Approved amount:',
    await usdtContract.allowance(testAccounts[0].address, router.address)
);
```

Output:
```ts
Approved amount: BigNumber { value: "10000000" }
```

#### Step 3. Initiate a transaction

```ts
const slippage = 0.2 / 100;
const tokenInAddress = usdtContract.address;
const amountTokenInToSwap = amountUSDT;
```

```ts
const buyPtTx = await router.swapExactTokenForPt(
    marketAddress,
    tokenInAddress,
    amountTokenInToSwap,
    slippage
);

await buyPtTx.wait();
```

#### Step 4. Verify your balances after buying PT

```ts
{
    const ptBalance = await ptContract.balanceOf(testAccounts[0].address);
    const usdtBalance = await usdtContract.balanceOf(testAccounts[0].address);
    console.log('Balances after buying PT', { ptBalance, usdtBalance });
}
```

Output:
```ts
Balances after buying PT {
  ptBalance: BigNumber { value: "20754229" },
  usdtBalance: BigNumber { value: "990000000" }
}
```

## Trading YT
Suppose that we want to buy YT in the [Stragate-USDT pool](https://app.pendle.finance/pro/markets/0x30e0dc9a1d33eac83211a1113de238b3ce826950/swap?view=pt&chain=ethereum) with 10 USDT. That is, in the same market, with the same parameters.

Here is how we can do it:

#### Step 1. Verify your balances before zapping

```ts
const ytContract = await marketContact.ytEntity();
```

```ts
{
    const ytBalance = await ytContract.balanceOf(testAccounts[0].address);
    const usdtBalance = await usdtContract.balanceOf(testAccounts[0].address);
    console.log('Balances before buying YT', { ytBalance, usdtBalance });
}
```

Output:
```ts
Balances before buying YT {
  ytBalance: BigNumber { value: "260774790" },
  usdtBalance: BigNumber { value: "990000000" }
}
```

#### Step 2. Approve the router

```ts
await usdtContract.approve(router.address, amountUSDT).then((tx) => tx.wait());
console.log(
    'Approved amount:',
    await usdtContract.allowance(testAccounts[0].address, router.address)
);
```

Output:
```ts
Approved amount: BigNumber { value: "10000000" }
```

#### Step 3. Initiate a transaction

```ts
const buyYtTx = await router.swapExactTokenForYt(
    marketAddress,
    tokenInAddress,
    amountTokenInToSwap,
    slippage
);

await buyYtTx.wait();
```

#### Step 4. Verify your balances after buying YT

```ts
{
    const ytBalance = await ytContract.balanceOf(testAccounts[0].address);
    const usdtBalance = await usdtContract.balanceOf(testAccounts[0].address);
    console.log('Balances after buying YT', { ytBalance, usdtBalance });
}
```

Output:
```ts
Balances after buying YT {
  ytBalance: BigNumber { value: "521475959" },
  usdtBalance: BigNumber { value: "980000000" }
}
```
