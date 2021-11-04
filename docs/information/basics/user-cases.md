---
sidebar_position: 3
---

# Use Cases

## Lock Future Yield

Pendle allows users to lock in yield at the current interest rate and receive cash upfront. Users can utilize this function if they foresee that interest rates will drop in the future. By locking in the yield, users are "betting" that the interest rate may fall in the future and wants to secure the current interest rate.

For example, Abigail decided to lend USDC on Aave, receiving aUSDC. However, she forecasts that the lending rate on Aave is high and may not be sustained in the coming months, so she wants to capitalize on that and lock in the current lending rate on Pendle. To do so, she uses Pendle to mint Ownership Token (OT) and Yield Token (YT), then sells YT on the Pendle AMM to lock in the yield. The remaining OT can be redeemed for an equivalent amount of USDC upon expiry.

Assuming she lent some USDC and obtained aUSDC in return. She now wishes to lock in the current lending rate up till 29th Dec 2022.

Steps:

1. On the Pendle minting interface, Abigail must
   * Select underlying token
   * Select 29th Dec 2022 expiry
   * Input and approve underlying token as the minting amount
   * Mint and receive OT and YT expiring on 29th Dec 2021
2. Then, moving on to the swap interface, Abigail must
   * Select YT as the input
   * Input and approve YT to be swapped into USDC

## Leverage on Yield Exposure

Pendle gives users a capital-efficient way of gaining yield exposure. Buyers could increase their leverage by purchasing Yield Tokens (YT) on Pendle to speculate on yield.

Benson, a savvy trader, speculates that the aUSDC rate will continuously increase over the next 2 months due to high demand across farms for USDC. Assuming that Benson has 1,000 USDC of capital and wants to maximize potential gains, he has two options:

1. Use Aave to gain lending rate exposure via holding aUSDC
2. Use Pendle to buy exposure to interest rates

If the current APR for aUSDC is 10% and he lent the USDC on Aave, he would earn 100 aUSDC as yield after one year. In the event that the yield increases to 20%, he would earn 200 aUSDC as yield instead.

Option 2 creates better leverage in the trade as Benson could be exposed to the yield of the underlying token without owning the token itself. With that, YT-aUSDC theoretical price would be 0.10 USDC per token. He could leverage on this and purchase 10,000 YT-aUSDC tokens. In the event that the yield increases to 20% which he would like to sell YT-aUSDC, he would be able to sell it for 0.20 USDC per token and earn 1,000 USDC instead.

Steps:

1. On Pendle's swap interface, Benson must
   * Swap USDC for YT
   * Hold YT and swap back to USDC at any point in time
