import Hint from '@site/src/components/Hint';

# Monitoring & Closing Positions

## The Positions tab

Once open, a 4-leg position needs little maintenance — the main decision is what to do with the perp legs at maturity. The **Positions** tab groups each hedge into its own box, showing the legs, their sizes and notionals, unrealised PnL, and whether the hedge is currently balanced.

![Positions tab](/boros-docs/imgs/arbitrage-with-crossex/positions-tab.png "Positions tab")

A `neutral ✓` chip means the two legs offset. If you haven't set a tracked Boros address yet, the box prompts you to add one — without it the terminal sees only the perp half of the trade.

For how the returns are calculated and how to read the cost breakdown, see [Understanding Position PnL](./position-pnl).

## Closing the 4-leg position

Close the Boros rate legs first, then the perps — the reverse of opening.

**Boros legs.** In the **Boros rates** ticket, switch the mode to **Close** (reduce-only), select the legs, and confirm. You can also close them from the Boros app directly.

**Perp legs.** Once the rate legs are closed, a **Close both** button on the position box closes both perp legs at market. Click and hold it to confirm.

![Close both perp legs](/boros-docs/imgs/arbitrage-with-crossex/close-both-perp-legs.png "Close both perp legs")

<Hint style="info">
Because of the leverage on the perp legs, you may receive Initial Margin Ratio (IMR) alert emails from Gate. As the positions are delta-neutral, liquidation risk stays very low barring price dislocation across venues.
</Hint>

## Rolling over instead of closing

If you can lock a decent spread on the same perp pair at the next maturity, rolling over is usually better than closing. The existing position escapes its perp closing fees and the new one escapes its perp opening fees — keep rolling and a position pays no perp fees at all, which is one of the largest boosts available to this strategy.

To roll over: close only the Boros legs at maturity, open new Boros legs at the next maturity, and leave the perp legs untouched. Then set the old position's **Perp exit cost** to *Omit (rolling over)*, and on the new position untick the inherited executions under **Perp entry cost** — those legs already paid. See [Understanding Position PnL](./position-pnl) for both toggles.

## Using the order ticket directly

Both tickets can be driven manually, outside the guided Opportunities flow:

- **CrossEx perps** — pick a coin, set size per leg, choose market or limit + hedge, and **Execute pair**. The **Single** tab opens one leg on its own.
- **Boros rates** — pick two markets sharing a collateral and maturity, set sides, size, and max slippage, and confirm.

This suits traders who want to set up a perp spread before locking rates, or who want specific limit orders for more advanced execution. If you're new to funding rate arbitrage, use the guided Opportunities flow instead.

Next: [Understanding Position PnL](./position-pnl)
