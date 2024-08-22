---
hide_table_of_contents: true
---

# Fees

Pendle protocol has 2 revenue sources:

- **YT Fees**
    
Pendle collects a 3% fee from all yield accrued (including points) by all YT in existence, and all yields from the SYs of matured unredeemed PTs.

- **YT Fees on Points**

Fees on points are applied similarly as Pendle treats points as a form of yield. Since points are tracked off-chain, partner protocols deduct the 3% fee when allocating points to user wallets. The deducted points from fees are then re-allocated to the following Pendle-controlled wallets:

|   Chain   |              Fee Wallet Address              |
| :-------: | :------------------------------------------: |
| Ethereum  | `0x8270400d528c34e1596EF367eeDEc99080A1b592` |
| Arbitrum  | `0xCbcb48e22622a3778b6F14C2f5d258Ba026b05e6` |
|  Mantle   | `0x5C30d3578A4D07a340650a76B9Ae5dF20D5bdF55` |
| BNB Chain | `0xd77E9062c6DF3F2d1CB5Bf45855fa1E7712A059e` |

Once the token rewards are claimable, the fee wallets will claim the rewards which will later be forwarded to vePENDLE holders.

- **Swap Fees**
    
Pendle collects a percentage-based swap fee, scaled with maturity, from all PT swaps. Each fee tier will be displayed in the dApp and is decided by the pool deployer (currently only the Pendle team deploys pools on Pendle). 

Pendle taxes the yield-receivables of PT when swaps occur. This creates a fair fee for all pools and maturities as it is scaled to a pool’s maturity (less time to maturity -> less yield-receivables -> lower fees in $ terms). Since YT swaps are also routed through the PT AMM, its fees are calculated based on the PT swapped.

- **Fee Distribution**

Pendle distributes protocol revenue from **YT fees to vePENDLE holders** and all protocol revenue from **swap fees to vePENDLE voters** of the correspondent pools (e.g. vePENDLE holders who voted for pool X will receive all protocol revenue from swap fee of pool X).

At the moment, Pendle protocol distributed all protocol revenue to vePENDLE with no allocation to the Pendle treasury. In the future, a portion of protocol revenue may be redirected to the Pendle treasury.
