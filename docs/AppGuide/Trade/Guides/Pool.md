---
hide_table_of_contents: true
---

# Pool

Pendle's liquidity pools can be found [here](https://app.pendle.finance/pro/pools). You can see the **Pools**, their **Maturity** date, the total **Liquidity** in the pool, and the current APY of liquidity provision. This **APY** is the base value, and can be boosted with vePENDLE. 

Liquidity providers receive returns from multiple avenues
* Fixed rate from PT
* Protocol rewards from underlying token
* Swap fees
* PENDLE incentives

## Tutorial

Provide liquidity in our trading pools and earn yield in return.
1. Go to [Pools](https://app.pendle.finance/pro/pools)
2. Select your desired pool to LP 
3. Choose your input asset to zap with
4. Enter your transaction amount 
5. Control your slippage tolerance with the Gear icon in the top right
6. Approve the transaction and Zap In! 

## Zapping In to LP

When liquidity is zapped in, a portion of the underlying asset is used to purchase PT from the PT/SY pool, and the rest is wrapped into SY:

1. Your assets are converted to the required assets and wrapped into SY
2. Some of the SY are minted into PT and YT
3. Minted YTs are sold into PT
4. PTs are paired with SY to provide liquidity

The selling of YT in the 3rd step above can cause a price impact. But, this can be avoided by toggling **Zero Price Impact Mode** (see below).

### Zero Price Impact Zap

On Pendle, users have the option to activate **Zero Price Impact Mode**, which allows them to provide liquidity to the PT/SY pool without affecting the price. Normally, when liquidity is added, a portion of the underlying asset is used to purchase PT from the PT/SY pool, and the rest is wrapped into SY. However, this purchase of PT can cause a price impact.

With **Zero Price Impact Mode** enabled, the underlying asset is fully wrapped into SY, a portion of which is used to mint PT and YT. The PT and remaining SY are then used for liquidity provision, with the YT returned to the user's wallet. This eliminates the step of purchasing PT, thereby avoiding any potential price impact.
