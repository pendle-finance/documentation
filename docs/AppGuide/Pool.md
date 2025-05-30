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

The selling of YT in the 3rd step above can cause a price impact. But, this can be avoided by toggling **Keep YT Mode** (see below).

### Keep YT Mode

!["Keep YT Mode"](/img/AppGuide/keep_yt_mode.png "Keep YT Mode")

On Pendle, users have the option to activate **Keep YT Mode**, which allows them to provide liquidity to the PT/SY pool without affecting the price. Normally, when liquidity is added, a portion of the underlying asset is used to purchase PT from the pool (causing price impact), and the rest is wrapped into SY.

With **Keep YT Mode** enabled, the underlying asset is fully wrapped into SY, a portion of which is used to **mint PT and YT**. The PT and remaining SY are then used for liquidity provision, with the YT returned to the user's wallet. While this method prevents price impact, it results in a portion of the user's capital becoming YT, which doesn't earn LP yield. YT value goes to 0 at maturity but entitles holders to the underlying yield or points. This approach offers a trade-off between **avoiding price impact in the initial zap** in and having a **separate YT component** with different earning potential

## Transfer Liquidity

![Transfer Liqudiity](/img/AppGuide/transfer-liquidity.png "Transfer Liquidity")

Pendle allows users to directly transfer liquidity from one LP pool to another in a single transaction. This feature simplifies the process of exiting and entering different liquidity pools, ensuring optimal transitions and minimizing complexities.

## Redeem Rewards Bundle

!["Redeem Rewards Bundle"](/img/AppGuide/redeem-rewards-bundle.png "Redeem Rewards Bundle")

By toggling “Claim All Pool Rewards” on the Zap Out page, Pendle App users can save on gas by claiming rewards AND removing liquidity/zapping out at the same time - in just one single transaction.

### Key Features

1. Seamless LP Pool Transfers

    Swap LP tokens from one pool to another effortlessly with automated processes.

2. Optimal Path Optimization

    Pendle calculates the most efficient route, maximizing returns and minimizing price impact.

3. Flexible Transfer Options

    - LP Only: Transfers only your LP tokens.
    - All Positions: Includes LP, PT, and YT positions. Pendle handles the redemption of dual liquidity and the combination of PT and YT for you.

4. Target Pool information display
    
    You can check out Pool and APY information of the target Pool at the **Target Pool Info** segment at the top right part of the page 
    
### How to use

1. Navigate to the Transfer Liquidity Page

    Access the feature from the Transfer Liquidity tab in the Pools Action page of an asset

2. Select Your Transfer Mode

    Choose between LP Only and All Positions based on your needs.
    - LP Only: Transfers only LP tokens.
    - All Positions: Transfers all positions (LP, PT, YT).

3. Choose your Params

    Enable Zero Price Impact Mode to avoid any price impact but you will receive some YT as a result. Or disable the mode to purely receive LP tokens but at the risk of some price impact from swapping. Refer to the docs for Zero Price Impact mode above.

4. Approve and Execute

    Approve the transaction and let Pendle handle the rest. The system will automatically execute the optimal path for your transfer.
