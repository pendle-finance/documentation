import Hint from '@site/src/components/Hint';

# Chapter 7 - Margin and Liquidations

In order to open a position on Boros, you first need to deposit collateral.

<figure><img src="/boros-academy/imgs/image (25).png" alt="" /><figcaption></figcaption></figure>

## Margin

After depositing collateral, you will be able to open positions on Boros.

The app will show you key information for you to start your journey:

1.  **Available Margin**

    The total amount of collateral available to be used. As you open more positions, this number declines as the collateral is used to back the open positions (i.e. margin is consumed upon opening a position).
2.  **Margin Required**

    The amount of collateral that is needed to open this position.

    When you open a position, a certain amount of collateral will be “consumed” or “reserved”, reducing the total amount of collateral \<Available to Trade>.

    This consumed collateral cannot be withdrawn or used to open other positions.
3.  **Notional Size**

    The amount of underlying asset exposure in this position (i.e. How much YU are you longing or shorting).

    Example: 5 YU-BTCUSDT-Binance = 5 YU notional size, indicating a yield from 5 BTC position in the BTCUSDT market on Binance

<figure><img src="/boros-academy/imgs/image (27).png" alt="" /><figcaption></figcaption></figure>

## Leverage

Just like perpetual exchanges, Boros allows traders to open positions on leverage.

In a market with 2x leverage for instance, a trader with a 10 ETH collateral will be able to open a position worth up to 20 ETH, doubling their buying power.

In short, leverage allows traders to do more with the same amount of capital but watch out, a higher leverage also means a higher risk of liquidation.

<figure><img src="/boros-academy/imgs/image (28).png" alt="" /><figcaption></figcaption></figure>

## Liquidation

Liquidation occurs when the value of your position falls below a specified threshold, leading to an automatic closure by the system to prevent further losses.

There are 2 different ways for you to monitor your liquidations:

1.  **Liquidation Implied APR**

    Similar to the "liquidation price" on perpetual exchanges, if YU’s implied APR reaches this rate, your position will be open for liquidation.

    Note that the liquidation implied APR can change since your collateral balance is affected by the periodic yield settlements from your currently open position.
2. **Health Factor**\
   The health factor is a metric that measures the safety of a position on Boros, it helps users visualize the “health” of a user’s position from liquidations.\
   Your position will be liquidated when health factor falls to 0. Maintaining a health factor above zero is crucial to avoid liquidation.

<Hint style="danger">
Watch your position's health factor or liquidation implied APR to avoid getting liquidated.
</Hint>

In short, your position’s overall health is sensitive to certain changes, including the “price” of YU (Implied APR) and the amount of collateral you have, which can fluctuate after every settlement (see [Chapter 4](chapter-4-settlement)).

Regular monitoring and timely collateral adjustments are crucial to maintain position health (health factor) and avoid liquidation.

You can learn more about Margin and Liquidations in detail from our docs [here](https://pendle.gitbook.io/boros/boros-docs/risk-parameters/margin-and-liquidations).

***
