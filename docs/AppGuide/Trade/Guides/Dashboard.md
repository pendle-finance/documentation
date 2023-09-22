---
hide_table_of_contents: true
---

# Dashboard (Beta)

The dashboard is designed to help Pendle users manage all of your positions. It offers a comprehensive view of your portfolio, allowing you to easily track all of your historical and current performance on Pendle itself.

Yield and rewards accrued from any Yield Tokens (YT) and Liquidity Provision (LP) positions can also be directly monitored and claimed here.

## Overview

<figure>
  <img src="/img/AppGuide/dashboard.png" alt="Dashboard" />
  <figcaption>The upper part of the dashboard provides an overview of your positions.</figcaption>
</figure>

#### My Total Balance

Total current, *active* positions on the selected chain in dollar terms

#### My Net Seasonal P&L

Total realized P&L on the selected chain in the season (the current Beta season spans from Nov 2022 till now). Do note that the P&L here will be counted in underlying terms. For example:

Buy 1 PT-stETH with 0.9 ETH ($1000), *1 month later….*

Sell 1 PT-stETH for 0.8 ETH ($1200)

The buy-and-sell transactions above will be logged as a *loss* of 0.1 ETH, converted to dollar terms ($150) based on ETH price at the point of sale, despite there being a net profit in dollar terms from ETH price appreciation.

The P&L figure only includes realized positions. Unclaimed yield and rewards *will not* count towards this P&L figure. You will have to claim the unclaimed positions for them to be included in the P&L and the overall leaderboard number.

For more information on how Pendle transactions are logged as P&L, you can look at the table below.

#### My Claimable Yield & Rewards

All of the accrued yield and rewards from YT and LP that can be [claimed](https://docs.pendle.finance/AppGuide/Trade/Guides/Claim) on the selected chain

#### Leaderboard

Shows your P&L ranking compared to other yield traders on the Seasonal Leaderboard. Note that only rankings ≥1000 will be shown. You can access the Leaderboard by clicking the button [here](https://app.pendle.finance/trade/dashboard/leaderboard/valuation).

All of the figures shown are applicable to the selected chain only. You can switch the display by simply connecting to a different network (e.g. switching from Ethereum → Arbitrum) on the app.

## All My Positions

The lower part of the Dashboard breaks down your Pendle positions by Assets, including which active positions you hold for that particular asset (i.e. PT, YT or LP), its Total Position Value as well as P&L.

![All My Positions](/img/AppGuide/all_my_positions.png "All My Positions")

You can click on “Details” for an even more comprehensive view of the asset position, which will show you a further breakdown of your position by PT, YT and LP, alongside a dynamic P&L chart (coming soon).

![My Position](/img/AppGuide/my_position.png "My Position")

The “Transactions” tab shows all the transactions related to the asset, including realized profit by transactions. Clicking on the actions (e.g. “Claim Yield” or “LP Transferred Out”) under the column will bring you to the transaction page on the blockchain explorer.

![My Transactions](/img/AppGuide/my_transactions.png "My Transactions")

## P&L - Actions and Impact

| Actions               | Description                                                                       | P&L Impact                                                                                                                                | Position Changes                              |
| --------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Add Dual Liquidity    | Liquidity provision to pool with dual tokens input                                | Involves selling of PT. The average buying price of LP will be adjusted, which will incur P&L.                                            | PT position decreases, LP position increases  |
| Zap in                | Liquidity provision to pool with single token input                               | The average buying price of LP will be adjusted. No impact on P&L.                                                                        | LP position increases.                        |
| Zap in (ZPI)          | Zero price impact liquidity addition to pool with single token input              | The average buying price of YT and LP will be adjusted. No impact on P&L.                                                                 | YT and LP positions increase.                 |
| Remove Dual Liquidity | Liquidity removal from pool with dual tokens output                               | P&L will be incurred with LP sale (if price is higher than the average LP buying price). The average buying price of PT will be adjusted. | LP position decreases, PT position increases. |
| Zap Out               | Liquidity removal from pool with single token output                              | P&L will be incurred with LP sale (if price is higher than the average LP buying price).                                                  | LP position decreases.                        |
| Mint                  | Minting of PT and YT from underlying                                              | The average buying price of PT and YT will be adjusted. No impact on P&L.                                                                 | PT and YT positions increase.                 |
| Redeem                | Redemption of underlying from PT and YT                                           | P&L will be incurred from PT and YT sale (depending on the average buying price of both).                                                 | PT and YT positions decrease.                 |
| Swap YT to PT         | Swap YT to PT                                                                     | P&L will be incurred from YT sale. The average buying price of PT will be adjusted.                                                       | YT position decreases, PT position increases. |
| Swap PT to YT         | Swap PT to YT                                                                     | P&L will be incurred from PT sale. The average buying price of YT will be adjusted.                                                       | PT position decreases, YT position increases. |
| Claim Yield           | Claim YT accrued yield                                                            | Positive P&L                                                                                                                              | No change(s) in positions.                    |
| Claim Rewards         | Claim LP accrued rewards                                                          | Positive P&L.                                                                                                                             | No change(s) in positions.                    |
| LP Transferred In     | Receipt of LP in wallet, includes LP withdrawal from liquid lockers               | Considered as an LP buy. The average buying price of LP will be adjusted. No impact on P&L.                                               | LP position increases.                        |
| LP Transferred Out    | Sending LP out of wallet, includes LP deposit into liquid lockers                 | Considered as an LP sale. P&L will be incurred.                                                                                           | LP position decreases.                        |
| Buy PT                | Buy PT                                                                            | No impact on P&L. The average PT buying price will be adjusted.                                                                           | PT position increases.                        |
| Sell PT               | Sell PT                                                                           | Depends on the Implied APY sold at. If Implied APY during sale is lower than the average buying price, P&L will be positive.              | PT position decreases.                        |
| Buy YT                | Buy YT                                                                            | No impact on P&L. The average YT buying price will be adjusted.                                                                           | YT position increases.                        |
| Sell YT               | Sell YT                                                                           | Depends on the Implied APY sold at. If Implied APY during sale is higher than the average buying price, P&L will be positive.             | YT position decreases.                        |
| YT Transferred In     | Receipt of YT in wallet                                                           | Considered as Buy YT                                                                                                                      | YT position increases.                        |
| YT Transferred Out    | Sending YT out of wallet                                                          | Considered as Sell YT                                                                                                                     | YT position decreases.                        |
| PT Transferred In     | Receipt of PT in wallet, includes withdrawal of PT collateral from money markets  | Considered as Buy PT                                                                                                                      | PT position increases.                        |
| PT Transferred Out    | Sending PT out of wallet, includes depositing PT as collateral into money markets | Considered as Sell PT                                                                                                                     | PT position decreases.                        |
