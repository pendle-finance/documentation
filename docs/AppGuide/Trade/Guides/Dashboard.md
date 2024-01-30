---
hide_table_of_contents: true
---

# Dashboard

The dashboard is designed to help Pendle users manage all of your positions. It offers a comprehensive view of your portfolio, allowing you to easily track all of your historical and current performance on Pendle itself.

Yield and rewards accrued from any Yield Tokens (YT) and Liquidity Provision (LP) positions can also be directly monitored and claimed here.

## Overview

<figure>
  <img src="/img/AppGuide/dashboard.png" alt="Dashboard" />
  <figcaption>The upper part of the dashboard provides an overview of your positions.</figcaption>
</figure>

#### My Total Balance

Total current, *active* positions on the selected chain in dollar terms

#### My Claimable Yield & Rewards

All of the accrued yield and rewards from YT and LP that can be [claimed](https://docs.pendle.finance/AppGuide/Trade/Guides/Claim) on the selected chain

#### Leaderboard

Shows your P&L ranking compared to other yield traders on the Seasonal Leaderboard. Note that only rankings ≥1000 will be shown. You can access the Leaderboard by clicking the button [here](https://app.pendle.finance/trade/dashboard/leaderboard/valuation).

#### Transfer Events

Asset Transfers to and from external parties or wallets, including deposit to liquid staking and money markets, are not synced in real time; instead, a global sync takes place periodically. 
You can manually trigger a sync event on your own wallet using the `Sync Transfers` button, with usage limited to once every hour. 

## All My Positions

The lower part of the Dashboard breaks down your Pendle positions by Assets, including which active positions you hold for that particular asset (i.e. PT, YT or LP), its Total Position Value as well as P&L.

![All My Positions](/img/AppGuide/all_my_positions.png "All My Positions")

You can click on “Details” for an even more comprehensive view of the asset position, which will show you a further breakdown of your position by PT, YT and LP, alongside a dynamic P&L chart (coming soon).

![My Position](/img/AppGuide/my_position.png "My Position")

The “Transactions” tab shows all the transactions related to the asset, including realized profit by transactions. Clicking on the actions (e.g. “Claim Yield” or “LP Transferred Out”) under the column will bring you to the transaction page on the blockchain explorer.

![My Transactions](/img/AppGuide/my_transactions.png "My Transactions")

## Eligibility for Seasonal Trading Competition

- **Total Position Value:** Position must reach $1,000 at some throughout the season
- **Total Transaction Value:** $1000 total transaction value within the season (Season 2 onwards)

## P&L Calculation Basics

- **Eligible Assets:** Only PT, YT, and LP assets in your wallet contribute to your Profit and Loss (P&L).
- **Personal Dashboard**: Dashboard accessible by connecting your wallet. Data is updated live.
- **Global Dashboard**: Dashboard accessible through leaderboard or URL sharing. No wallet connection required and allows access to other people’s dashboards. Data is updated daily.
- **Total Capital**
    - The theoretical maximum capital used on Pendle (Exiting a position reduces the capital and entering a position increases the capital). The highest capital amount throughout the duration is taken as the total capital.
    - Capital is tracked in accounting asset terms for each pool and consolidated as $ amount displayed on top of the dashboard
- **Calculation Methodology:**
    - P&L is calculated by individual pools in accounting asset terms (stETH in wstETH pool, DAI in sDAI pool, etc).
    - P&L numbers obtained above are then converted to $ using the latest accounting asset price and displayed on the UI
    - P&L from each pool is then aggregated to show overall P&L on top of the main dashboard
    - This means that P&L will be positive as long as you are up in terms of accounting asset even though you have less in $ amount due to accounting asset price going down
    - **P&L Calculation**
        - On entering a position (PT, YT or LP), the `average buy price` of the asset is tracked and updated after taking swap fee and price impact into account.
        - On exiting a position, the difference between the `output amount` and the `average buy price` is taken to calculate the realized P&L from the transaction.
    - **P&L types**
        - **Realized P&L:**
            - Obtained from claiming rewards, yield, or exiting a position (PT/YT/LP).
            - All amounts are calculated and fixed in terms of $ amount at the time of transaction.
        - **Unrealized P&L:**
            - Obtained from unclaimed rewards, unclaimed yield, and difference between current market prices of active positions (PT/YT/LP) and average buy.
            - All amounts are calculated in terms of accounting assets and converted to $ amount using the prevailing accounting asset price on the UI.
        - Net P&L is the sum of realized P&L and unrealized P&L
- **Price and Data Update Frequency**
    - Personal dashboard viewed through connecting wallet is updated live, albeit with a 1 to 5 minutes delay from the time transaction is made
    - Live update extends to the transaction entries, position value, capital and prices of assets (accounting asset and reward tokens) relevant to the P&L calculation
    - Global dashboard (other people’s dashboards) accessible through leaderboard is updated daily
    - The delayed update extends to transaction entries, position value, capital and prices of assets (accounting asset and reward tokens) relevant to P&L calculation
- **Implications:**
    - Realized P&L is fixed in accounting asset and $ terms
    - Unrealized profit/loss from unclaimed rewards is influenced by reward asset price fluctuations until the rewards are claimed (which realizes the profit/loss).
    - Transactions on the global dashboard and leaderboard will only be updated the next day
    - External incentives such as trading incentives, leaderboard rewards, etc do not count towards P&L calculation

## Seasonal P&L Calculation
- **Calculation Methodology:**
    - Calculation mirrors all-time P&L.
    - At the season start, a snapshot of all positions and unclaimed rewards in accounting asset terms is taken.
    - This snapshot recalculates a new `average buy price` for each held asset using the market price when snapshot is taken. The newly calculated `average buy price` will only be used for current season’s P&L.
    - P&L is reset to 0. Only balance changes, rewards and yield after the snapshot will be taken into consideration in seasonal P&L.
- **Implications:**
    - Seasonal P&L can be positive even if all-time P&L remains negative (if the season starts with a lower asset price that later increases)
    - Past realized and unrealized profits do not contribute to seasonal P&L.
    - This process is akin to closing all positions and reopening them at the start of the season.

## Pendle Transaction Events and Implications

| Events | Description | P&L impact and explanation | Position and status updates |
| :---: | :---: | :---: | :---: |
| Mint | Mint PT and YT from the underlying asset | No Impact | — Average Buy price of PT and YT updated <br /> — PT and YT positions increase |
| Redeem | Redeem PT and YT into the underlying asset | Incur P&L based on current price and average buy price of PT and YT | — PT and YT positions decrease <br /> — Unrealized gain/loss of PT → Realized gain/loss <br /> — Unrealized gain/loss of YT → Realized gain/loss |
| Buy PT  | Buy PT | No Impact | — Average Buy Price of PT updated <br /> — PT position increases |
| Sell PT | Sell PT | — Incur P&L based on current price and average buy price of PT  <br /> — Update Realized  | — PT position decreases <br /> — Unrealized gain/loss of PT → Realized gain/loss |
| Buy YT | Buy YT | No Impact | — Average Buy Price of YT updated <br /> — YT position increases |
| Sell YT | Sell YT | Incur P&L based on current price and average buy price of YT | — YT position decreases <br /> — Unrealized gain/loss of YT → Realized gain/loss |
| Zap in | Liquidity provision to the pool with single token input | No Impact | — Average Buy Price of LP updated <br /> — LP position increases |
| Zap out | Liquidity removal from the pool with single token output | Incur P&L based on current price and average buy price of LP | — LP position decreases <br /> — Unrealized gain/loss of LP → Realized gain/loss |
| ZPI Zap in | Zero price impact liquidity addition to the pool with single token input | No Impact | — Average Buy Price of LP updated <br /> — Average Buy Price of YT updated <br /> — LP and YT position increases |
| Add Dual Liquidity | Liquidity provision to pool with dual tokens input (PT + underlying) | Incur P&L based on current price and average buy price of PT | — Average buy price of LP updated <br /> — LP position increases <br /> — PT position decreases <br /> — unrealized gain/loss of PT → Realized gain/loss |
| Remove Dual Liquidity | Liquidity removal from pool with dual tokens output (PT + underlying) | Incur P&L based on current price and average buy price of LP | — LP position decreases <br /> — PT position increases <br /> — Average Buy price of PT updated <br /> — Unrealized gain/loss of LP → Realized gain/loss |
| Swap YT to PT | Swap YT to PT | Incur P&L based on current price and average buy price of YT | — Average Buy Price of PT updated <br /> <br /> — PT position increases <br /> — YT position decreases <br /> — Unrealized gain/loss of YT → Realized gain/loss |
| Swap PT to YT | Swap PT to YT | Incur P&L based on current price and average buy price of PT | — Average Buy Price of YT updated <br /> — YT position increases <br /> — PT position decreases <br /> — Unrealized gain/loss of PT → Realized gain/loss |
| Claim Rewards | Claim accrued Rewards from LP and YT | Incur P&L based on reward amount in terms of accounting asset | Rewards accrued becomes realized gain |
| Claim Yield | Claim accrued interest from YT | - Incur P&L based on yield amount in terms of accounting asset | - Yield accrued becomes realized gain |
| PT Transfer Out | PT transferred out of the wallet (including transferring to a Money Market to be used as collateral) | Incur P&L based on current price and average buy price of PT | — PT position decreases <br /> — Unrealized gain/loss of PT → Realized gain/loss <br /> — Treated as market sell PT <br /> — Price used is that of when the transaction is synced NOT when the transaction is made |
| PT Transfer In | PT transferred into the wallet (including from withdrawal from a Money Market) | No Impact | — Average Buy Price of PT updated <br /> — PT position increases <br /> — Treated as market buy PT <br /> — Price used is that of when the transaction is synced NOT when the transaction is made |
| YT Transfer Out | YT transferred out of the wallet | Incur P&L based on current price and average buy price of YT | — YT position decreases <br /> — Unrealized gain/loss of YT → Realized gain/loss <br /> — Treated as market sell YT <br /> — Price used is that of when the transaction is synced NOT when the transaction is made |
| YT Transfer In | YT transferred into the wallet | No Impact | — Average Buy Price of YT updated <br /> — YT position increases <br /> — Treated as market buy YT <br /> — Price used is that of when the transaction is synced NOT when the transaction is made |
| LP Transfer Out | LP transferred out of the wallet (including depositing into liquid lockers) | Incur P&L based on current price and average buy price of LP | — LP position decreases <br /> — Unrealized gain/loss of LP → Realized gain/loss <br /> — Treated as market sell LP <br /> — Price used is that of when the transaction is synced NOT when the transaction is made |
| LP Transfer In | LP transferred into the wallet (including withdrawing from liquid lockers) | No Impact | — Average Buy Price of LP updated <br /> — LP position increases <br /> — Treated as market buy LP <br /> — Price used is that of when the transaction is synced NOT when the transaction is made |

:::note
* Current price > average buy price → profit
* Current price < average buy price → loss
* All prices are in terms of accounting asset (ETH for wstETH pool, DAI for sDAI pool, etc) for calculation purposes
:::

## External Events and Implications

| Event | Implications |
| :---: | :---: |
| Accounting asset price changes | — $ amount of P&L will change <br /> — Unrealized P&L from unclaimed yields and rewards will change depending on the new exchange rate between reward assets and accounting assets |
| Reward asset price changes | — Unrealized P&L from unclaimed yields and rewards will change depending on the new exchange rate between reward assets and accounting assets |
