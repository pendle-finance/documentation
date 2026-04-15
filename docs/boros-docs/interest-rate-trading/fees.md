# Fees

Positions on Boros can have different fees based on their behavior. Refer to the info tab of each pool for more details.

![Market Info](/boros-docs/imgs/market_info.png "Market Info")

### 1. Swap Fees

Boros collects a flat fee on top of the implied APR for every swap. Swap fee will be deducted from the position’s collateral.

For example, in a market with a swap fee tier of 0.05%, the fee for opening a position equals 0.05% × YU amount × Years to Maturity. In other words, traders will pay 0.05% fee on the $ value of their position.

In this scenario, traders will profit if implied APR changes by more than 0.1% in their favor (assuming no yield settlement happens throughout the period), as traders will have to open and close the position, incurring 2x the swap fee.

### 2. Open Interest Fees

Boros collects a flat fee on the fixed APR side of every YU during settlement.

For example, positions at an 8% fixed rate with a fee tier of 0.1%:
- Long YU positions effectively pay 8.1% in fixed APR.
- Short YU positions effectively receive 7.9% in fixed APR.

### 3. Operation Fees

Boros charges a small fixed fee on your first transaction and then intermittently (approximately every \~50 transactions) thereafter. This fee, usually around \$1 during normal gas conditions, is used to cover the gas costs of executing trades from your address.
