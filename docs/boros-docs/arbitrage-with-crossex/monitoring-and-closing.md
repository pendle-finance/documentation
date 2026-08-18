import Hint from '@site/src/components/Hint';

# Monitoring & Closing Positions

## Closing the 4-leg arbitrage

First, close your YU positions on Boros. Once closed, a **"Close both"** button appears at the bottom right of the perp leg window — click and hold it to close both perp positions via market order.

![Close both perp legs](/boros-docs/imgs/arbitrage-with-crossex/close-both-perp-legs.png "Close both perp legs")

<Hint style="info">
Because of the leverage on the arbitrage's perp legs, you may receive Initial Margin Ratio (IMR) alert emails from Gate. As your positions are delta-neutral, liquidation risk stays very low barring price dislocation across multiple perp platforms.
</Hint>

## Using the order ticket (advanced)

To manually open a perp spread outside the guided Opportunities flow, use the **Order ticket** box:

1. Select the ticker you want to open a spread on
2. Load the notional amount per leg
3. Select order type (market order / limit)
4. Click and hold **"Execute pair"**

Your spread trade is now live. This is intended for traders who want to set up a perp spread before locking in fixed rates with Boros YUs, or who want specific limit orders for more advanced strategies. If you're new to funding rate arbitrage, use the guided Opportunities flow instead.

Next: [Risks & Security](./risks-and-security)
