---
hide_table_of_contents: true
---

# Adding and Removing Liquidity

## Add liquidity

Suppose that we want to add liquidity to the [PT stETH Pool](https://app.pendle.finance/pro/pools/0xc374f7ec85f8c7de3207a10bb1978ba104bda3b2/zap/in?chain=ethereum) with 10 ETH.

```ts
import { toAddress, BN, createERC20, NATIVE_ADDRESS_0x00 } from '@pendle/sdk-v2';
const marketAddress = toAddress('0xc374f7ec85f8c7de3207a10bb1978ba104bda3b2');

// Pendle SDK `createERC20` can provide the same functionality of an ERC20
// to native token (ETH).
const ethWrappedERC20 = createERC20(NATIVE_ADDRESS_0x00, {
    chainId: 1, // ethereum chain
    provider,
    signer: testAccounts[0].wallet,
});
const ETH_DECIMALS = BN.from(10).pow(await ethWrappedERC20.decimals());
const amountETHToZapIn = ETH_DECIMALS.mul(10);
```

Here is how we can do it:

#### Step 1. Verify your balances before zap

```ts
import { MarketEntity } from '@pendle/sdk-v2';
const marketContract = new MarketEntity(marketAddress, {
    chainId: 1,
    provider,
    signer: testAccounts[0].wallet,
});
```

```ts
{
    const lpBalance = await marketContract.balanceOf(testAccounts[0].address);
    const ethBalance = await ethWrappedERC20.balanceOf(testAccounts[0].address);
    console.log('Balances before zap', { lpBalance, ethBalance });
}
```

Output:
```ts
Balances before zap: {
  lpBalance: BigNumber { value: "7415056052395711065" },
  ethBalance: BigNumber { value: "9959796037708252906401" }
}
```

#### Step 2. Approve the router

Since we are using ETH, we **do not** actually need to approve. However, since `createERC20` wraps native tokens the same way as a normal ERC20, we can still do as follows:

```ts
await ethWrappedERC20.approve(router.address, amountETHToZapIn).then((tx) => tx?.wait());
console.log(
    'Approved amount:',
    await ethWrappedERC20.allowance(testAccounts[0].address, router.address)
);
```

Output:
```ts
Approved amount: BigNumber {
    value: "115792089237316195423570985008687907853269984665640564039457584007913129639935"
}
```

The result is `2^256 - 1`. As stated above, this is a _wrapped_ process.

For the other ERC20 tokens, the process is similar.

#### Step 3. Make a transaction

```ts
const slippage = 0.2 / 100;
const tokenInAddress = NATIVE_ADDRESS_0x00;
const amountTokenIn = amountETHToZapIn;
```

```ts
const zapInTx = await router.addLiquiditySingleToken(
    marketAddress,
    tokenInAddress,
    amountTokenIn,
    slippage
);

await zapInTx.wait();
```

#### Step 4. Verify your balances after zap

```ts
{
    const lpBalance = await marketContract.balanceOf(testAccounts[0].address);
    const ethBalance = await testAccounts[0].wallet.getBalance();
    console.log('Balances after zap', { lpBalance, ethBalance });
}
```

Output:
```ts
Balances after zap {
  lpBalance: BigNumber { value: "12358477257712936422" },
  ethBalance: BigNumber { value: "9949795341003257331395" }
}
```

## Remove liquidity

Now suppose we want to remove the liquidity and exit to [stETH](https://etherscan.io/address/0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84).

Here is how to do it:

#### Step 1. Verify your balances before exit

```ts
const stEthContract = createERC20(toAddress('0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84'), {
    chainId: 1,
    provider,
    signer: testAccounts[0].wallet,
});

// we remove all LP to stEth.
const lpToRemove = await marketContract.balanceOf(testAccounts[0].address);
```

```ts
{
    const lpBalance = lpToRemove;
    const stEthBalance = await stEthContract.balanceOf(testAccounts[0].address);
    console.log('Balances before exit', { lpBalance, stEthBalance });
}
```

Output:
```ts
Balances before exit {
  lpBalance: BigNumber { value: "12358477257712936422" },
  stEthBalance: BigNumber { value: "24974694703001963936" }
}
```

#### Step 2. Approve the router

Note that we need to approve with the PENDLE-LPT market contract, not the stETH contract.

```ts
const zapOutApproval = await marketContract.approve(router.address, lpToRemove);
await zapOutApproval.wait();
console.log('Approved amount:', marketContract.allowance(testAccounts[0].address, router.address));
```

Output:
```ts
Approved amount: Promise { <pending> }
```

#### Step 3. Initiate a transaction

```ts
const tokenOutAddress = stEthContract.address;
const zapOutTx = await router.removeLiquiditySingleToken(
    marketAddress,
    lpToRemove,
    tokenOutAddress,
    slippage
);

await zapOutTx.wait();
```

#### Step 4. Verify your balances after exit

```ts
{
    const lpBalance = await marketContract.balanceOf(testAccounts[0].address);
    const stEthBalance = await stEthContract.balanceOf(testAccounts[0].address);
    console.log('Balances after exit', { lpBalance, stEthBalance });
}
```

Output:
```ts
Balances after exit {
  lpBalance: BigNumber { value: "0" },
  stEthBalance: BigNumber { value: "49949397129142156720" }
}
```
