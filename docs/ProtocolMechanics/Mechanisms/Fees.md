---
hide_table_of_contents: true
---

# Fees

Pendle protocol has 2 revenue sources:

- **YT Fees**
    
Pendle collects a 3% fee from all yield accrued by all YT in existence, and all yields from the SYs of matured unredeemed PTs.

- **Swap Fees**
    
Pendle collects a % swap fee from the "implied yield" of all PT swaps. Each fee tier will be displayed in the dApp and is decided by the pool deployer (currently only the Pendle team deploys pools on Pendle).

In essence, Pendle taxes the yield-receivables of PT when swaps occur. This creates a fair fee for all pools and maturities as it is scaled to a pool’s maturity (less time to maturity -> less yield-receivables -> lower fees in $ terms). Since YT swaps are also routed through the PT AMM, its fees are calculated based on the PT swapped.

- **Fee Distribution**

Pendle distributes protocol revenue from **YT fees to vePENDLE holders** and all protocol revenue from **swap fees to vePENDLE voters** of the correspondent pools (e.g. vePENDLE holders who voted for pool X will receive all protocol revenue from swap fee of pool X).

At the moment, Pendle protocol distributed all protocol revenue to vePENDLE with no allocation to the Pendle treasury. In the future, a portion of protocol revenue may be redirected to the Pendle treasury.
