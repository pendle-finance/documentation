---
hide_table_of_contents: true
---

# Roll Over

When a market matures, your PT stops appreciating and your LP stops earning fixed yield. The capital is still yours, but it sits idle until you move it. **Roll Over** moves a matured PT or LP position into a new market in a single transaction, without redeeming back to the underlying first.

## What Happens at Maturity

Your position is safe and fully redeemable, but it stops working:

* **PT** is redeemable 1:1 for the accounting asset. It no longer appreciates, so every day you leave it is a day of forgone yield.
* **LP** no longer earns fixed yield from PT. Accrued rewards remain claimable.
* **YT** has expired and is worth nothing.

> If you hold $10,000 of matured PT and the same asset's next market offers 8% fixed APY, waiting a week to roll over costs roughly $15 in forgone yield.

## Rolling Over After Maturity

Once a market matures, its position page shows two actions: **Roll Over** and **Redeem All**.

![Matured position](/pendle-docs/imgs/AppGuide/roll-over/position-matured.png "Matured position")

1. Go to [Dashboard](https://app.pendle.finance/trade/dashboard/overview/positions) and open the matured asset.
2. Click **Roll Over**. (**Redeem All** instead exits to a token of your choice.)
3. Pick a target market. Markets tagged **Similar Market** share the same underlying with a later maturity.

    ![Select a target market](/pendle-docs/imgs/AppGuide/roll-over/select-market.png "Select a target market")

4. Select which positions to roll (PT, LP, or both) and the amount of each. **Claim LP Rewards** bundles accrued rewards into the same transaction.
5. Choose whether to receive **PT** or **LP** in the target market.
6. Review the trade info, then approve and confirm.

<figure>
  <img src="/pendle-docs/imgs/AppGuide/roll-over/roll-over-form.png" alt="Roll Over form" />
  <figcaption>The Roll Over panel: source positions on top, target market below, and the trade preview at the bottom.</figcaption>
</figure>

## Rolling Over Before Maturity

You do not have to wait for maturity. Rolling early avoids the migration rush and keeps your capital continuously deployed.

There is no separate form for this. Go to the market you want to move into and place a normal swap, selecting your existing **PT** or **LP** as the input asset. The Roll Over button on the dashboard only appears once a market has matured.

*Rolling early sells your PT at the current market price rather than redeeming it at par, so the exit price depends on the source market's implied APY at that moment.*

## Reading the Trade Preview

* **Effective Fixed APY** is the rate you actually lock in, after price impact and fees. Judge the trade on this number, not the market's headline Fixed APY.
* **Implied APY Change** shows how far your own trade moves the target market's rate. A large move signals thin liquidity.
* **Min. Received** is the floor guaranteed by your slippage setting.

## Choosing a Target Market

* A **Similar Market** keeps your underlying asset and risk profile unchanged and simply extends your maturity. Moving to a different asset takes on that asset's risk.
* Check **Liquidity** before committing. A thin pool gives a worse Effective Fixed APY than its headline rate suggests.
* A longer maturity locks the rate for longer, which works against you if rates rise.
* Rolling into **LP** rather than PT re-enters at the new pool's PT/SY ratio and earns swap fees and incentives instead of a fixed rate.

## Fees

Rolling over costs the standard [PT trade fee](../ProtocolMechanics/Mechanisms/Fees) on entry into the target market, plus gas. There is no additional rollover fee. Redeeming a matured PT and buying into a new market separately incurs the same trade fee across more transactions.
