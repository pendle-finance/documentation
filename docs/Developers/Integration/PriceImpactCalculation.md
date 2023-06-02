---
hide_table_of_contents: true
---

# Price impact calculation for liquidating PT and LP

The best way to calculate price impact for selling a hypothetical amount of PT or LP is to use the Pendle SDK

You can install the Pendle SDK at `@pendle/sdk-v2`, version `2.3.4`

To calculate the price impact for selling an amount of PT: use the `swapExactPtForSy` function.

To calculate the price impact for selling an amount of LP: use the `removeLiquiditySingleSy` function.

It can be done as follows:

```typescript
import { Router, toAddress } from "@pendle/sdk-v2";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import hre from "hardhat";
import { BigNumber } from "ethers";

async function main() {
  const [deployer]: SignerWithAddress[] = await hre.ethers.getSigners();

  let stETH2027 = toAddress("0x34280882267ffa6383b363e278b027be083bbe3b");
  let _1E18 = BigNumber.from(10).pow(18);
  let slippage = 0.2 / 100; // 0.2%, not important if it's purely to get priceImpact

  const router = Router.getRouter({
    chainId: 1,
    provider: deployer.provider!
  });

  const removeLiquidity = await router.removeLiquiditySingleSy(
    stETH2027,
    _1E18,
    slippage,
    { method: "meta-method" }
  );

  const sellPt = await router.swapExactPtForSy(
    stETH2027,
    _1E18,
    slippage,
    { method: "meta-method" }
  );

  console.log(Number(removeLiquidity.data.priceImpact.toString()) / 1e18); 
  console.log(Number(sellPt.data.priceImpact.toString()) / 1e18);
	// multiply by 100 to get percentages 
}

main();
```