---
hide_table_of_contents: true
---

# PT Looping

PT Looping lets you amplify your fixed yield exposure on a PT by borrowing against it and buying more PT with the borrowed funds — repeating this cycle automatically to reach a target leverage, all from a single form.

:::info Beta
PT Looping is currently in **Beta** and is only available for PT markets that Pendle has paired with a supported money market. Not every PT market supports looping.
:::

## How It Works

![PT Looping cycle](/pendle-docs/imgs/AppGuide/pt-looping/loop-diagram.png)

A loop position is built by repeating three steps:

1. **Supply PT as collateral** to a money market (e.g. Aave, Morpho).
2. **Borrow** the market's debt asset against that collateral.
3. **Buy more PT** with the borrowed funds via Pendle, then supply the new PT back as collateral.

Steps 1–3 repeat automatically, within a single transaction flow, until your chosen **Target Leverage** is reached — you don't perform each loop manually.

### Estimates vs. what's guaranteed

Because each iteration borrows against the PT bought in the previous iteration, the step-by-step breakdown shown in the trade preview is always an **estimate** (`~`) — the exact amount at each step depends on live prices at execution time.

What the contract actually guarantees is a **minimum PT-per-debt-token exchange rate**, fixed the moment you sign the transaction. Every swap in the loop — whether you're opening a position or withdrawing from one — must clear this rate or it reverts. If the market moves enough during execution that the rate can no longer be met, the transaction stops at that step rather than completing the remaining iterations, so you may end up with fewer iterations (and therefore lower leverage) than originally projected.

### Money markets

PT Looping supports a growing list of whitelisted (PT, money market) pairs. Each pairing has its own:

- **LLTV** (Liquidation Loan-to-Value) — the loan-to-value at which the position becomes liquidatable
- **Max Leverage** — the highest leverage the pairing supports, derived from its LLTV
- **Max Looping APY** — the best available looping APY for that pairing at max leverage

### Fee cashback

Opening a PT Loop position returns **50% of the fee you pay in $PENDLE**. Cashback is distributed weekly (every Saturday) and can be claimed from your [Dashboard](https://app.pendle.finance/pro/dashboard).

## Finding a Looping Opportunity

![PT Looping overview](/pendle-docs/imgs/AppGuide/pt-looping/overview-page.png)

The [PT Looping overview page](https://app.pendle.finance/trade/pt-looping) lists every PT eligible for looping. Expand a PT to see all of its available money market pairings side by side, with:

- **Money Market** — the protocol and debt asset (e.g. `Aave / USDC`, `Morpho / USDT`)
- **Total Supply / Cap** — how much has been supplied to that market, and its supply cap if any
- **PT Fixed APY**, **Borrow APY**, and **Max Looping APY**
- **Available Liquidity** — how much debt asset is available to borrow

Use the filter tabs (**Favourites**, **New**, or by money market) and chain selector to narrow the list, or search by name/address. Sort by any column, including **Max Looping APY**, which is the default.

## Opening a Loop Position

1. From the overview page, click a (PT, money market) pairing — or go directly to a market page and select the **Loop** tab.
2. Confirm or change the **Money Market** for that PT using the selector, which shows each option's LLTV and Max Loop APY.
3. Choose your input asset and enter the amount you want to deposit.
4. Set your **Target Leverage** with the slider.
5. Review the trading info — **Est. Looping APY**, **Est. Return**, and **Health Factor** — using the tooltips if you need details on how each is calculated.
6. Click **Create Loop**, then approve and confirm the transaction in your wallet.

![Open a loop position](/pendle-docs/imgs/AppGuide/pt-looping/open-form.png)

Once submitted, a progress indicator tracks the loop as it executes, showing how many iterations have completed and an estimated time remaining. You can abort at any point before it finishes — for example, by declining the wallet signature or clicking cancel — without affecting funds beyond what has already executed on-chain.

## Managing an Existing Position

Once you hold a loop position on a given (PT, money market) pairing, the action panel switches to three tabs: **Add Position**, **Withdraw**, and **Adjust Leverage**. Each shows your current Looping APY, Position Value, and Health Factor above the tabs.

![Manage a loop position](/pendle-docs/imgs/AppGuide/pt-looping/manage-tabs.png)

### Add Position / Add Collateral

Use the dropdown on this tab to choose how you want to add funds:

- **Add Position** (default) — deposits more funds and loops them at your target leverage, growing your position while keeping leverage roughly the same.
- **Add Collateral** — deposits funds as collateral only, without looping further. This lowers your leverage and improves your Health Factor.

### Withdraw

Use the slider to choose what percentage of your position to withdraw, and select your output asset. The preview shows your expected leverage, Health Factor, and net equity after the withdrawal.

![Withdraw from a loop position](/pendle-docs/imgs/AppGuide/pt-looping/withdraw-form.png)

### Adjust Leverage

Move the slider up to loop further and increase leverage, or down to unwind part of the position and reduce it — without depositing or withdrawing funds.

## Health Factor & Liquidation Risk

Your **Health Factor** reflects how close a position is to liquidation, calculated from your current LTV against the money market's LLTV. It's shown as a percentage with a colored bar wherever your position appears — in the trade form, on the Dashboard, and in the risk info popup.

Because PT Looping pairs a PT (priced via oracle) with a debt asset, two independent risk signals feed into your overall risk color:

- **PT price** — only affects your risk coloring if the money market's oracle is *not* a linear-discount oracle. With a linear-discount oracle, PT price moves in a predictable, bounded way and won't itself trigger a risk warning.
- **Underlying price** — independent of the PT price signal. If the oracle uses a hardcoded underlying price, underlying price moves don't affect your risk color at all. Otherwise, a warning appears immediately if the underlying asset depegs by more than 10%.

Open the **Risk Info** popup from the Money Market selector for a plain-language explanation of the specific oracle mechanics behind the pairing you're using.

## Monitoring Your Positions

Your looping positions appear under **My Looped PT** on both the main [Dashboard](https://app.pendle.finance/pro/dashboard) and the dashboard section of each market page.

![My Looped PT dashboard](/pendle-docs/imgs/AppGuide/pt-looping/dashboard.png)

Each row shows the Strategy (PT + money market), Looping APY, Position Value, Supplied/Borrowed amounts with their respective APYs, and Health Factor. A position can be in one of three states:

- **Active** — currently open and accruing.
- **Matured** — the PT has matured. You'll see a banner prompting you to withdraw, since holding a matured looping position keeps incurring borrowing costs without further PT upside.
- **Liquidated** — the position was closed by the money market after crossing its LLTV.

Use the **My PT Looping History** tab to see past transactions, including the individual loop iterations executed for each.

### Dust positions

Positions with a net value below **$1** are grouped separately under **Dust Positions**, since they're generally too small to be worth the gas cost of withdrawing. Use the **Hide dust** toggle to show or hide this section — even when hidden, the balance still exists and is never lost.

## Minimum Amounts

Because opening or adjusting a loop position can involve multiple on-chain iterations, there is a **minimum deposit amount** to open a new position and a **minimum withdrawal amount** for partial withdrawals, so that gas costs don't outweigh the transaction itself. These minimums are shown directly in the form and may vary by chain and money market.
