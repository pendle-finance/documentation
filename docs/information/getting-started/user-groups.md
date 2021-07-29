---
sidebar_position: 2
---

# User Groups


## Sellers: Lock Future Yield

Pendle allows sellers to lock in yield at the current interest rate and receive cash upfront.

Abigail has received aUSDC after lending USDC on Aave. She thinks that the lending rate on Aave is high and may not be sustained in the coming months, so she wants to lock in the current lending rate on Pendle. To do so, she has to mint OT and YT, then sell YT on the Pendle AMM.

Assuming she has 1000 aUSDC and she wants to lock in the current lending rate up till 30th June 2021.
1. On the minting interface, Abigail must
      * Select aUSDC underlying
      * Select 30 June 2021 expiry
      * Input and approve 1000 aUSDC as the minting amount
      * Mint and receive 1000 OT and 1000 YT expiring on 30th June 2021
2. Then, moving on to the swap interface, Abigail must
      * Select YT as the input
      * Select USDT as the output
      * Input 1000 YT and swap

She will receive the prompted amount of USDT from the swap interface. She has locked in her future yield at the current rate for upfront cash.


## Buyers: Leverage Long Yield Exposure

Pendle gives buyers a capital-efficient way of gaining yield exposure.

Benson, a savvy trader, speculates that the aUSDC rate will continuously increase over the next 2 months due to high demand across farms for USDC. Assuming that Benson has 1000 USDC of capital and wants to maximize potential gains, he has two options: 

1. Use Aave to gain lending rate exposure via holding aUSDC
2. Use Pendle to buy pure exposure to interest rates

Utilizing Pendle will maximize Benson's capital efficiency. To illustrate this, assume that the current lending rate on Aave is 24% for USDC. This will make 2 months of lending yield worth roughly 0.04 USDC.

Locking up 1000 USDC on Aave gains Benson 1000 units of lending rate exposure.

On Pendle, with the same 1000 USDC, Benson can purchase exposure to 2 months of aUSDC lending yield for 0.04 USDC per YT, gaining 25,000 units of lending rate exposure instead.


## Arbitrageurs: New Avenues for Profit

Pendle provides arbitrageurs more opportunities to generate profit with low risk.

Chris found an arbitrage opportunity between Aave's USDC stable borrowing rate of 8% and Harvest finance USDC vaults with 23% variable rate. Utilizing Pendle, Chris will be able to fix the Harvest finance USDC rate, eliminating the risk in this arbitrage opportunity.

To do this, Chris borrows 1000 USDC on Aave at 8% stable borrowing rate, incurring a cost of 80 USDC for 1 year. She then deposits the 1000 USDC into Harvest USDC vault, getting 1000 fUSDC in return. On Pendle, Chris mints OT and YT with fUSDC as the underlying. Assuming the YT-fUSDC now trades at a discounted price of 0.20 USDC for YT expiring in 1 year, selling all 1000 YT-fUSDC will net Chris an overall profit of 200 - 80 USDC.

There are numerous arbitrage opportunities and we look forward to seeing these occur in the wild. Another example would be on-chain and off-chain lending arbitrage to those in the position to do so.

Trading desks who take deposits from clients at fixed annual interest rates can hedge off their risks in a similar manner as Chris did so above.
