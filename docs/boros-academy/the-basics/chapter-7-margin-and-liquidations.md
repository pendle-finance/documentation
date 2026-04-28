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

    Example: 100 YU-ETHUSDT-Binance = 100 YU notional size, indicating a yield from 100 ETH position in the ETHUSDT market on Binance

<figure><img src="/boros-academy/imgs/notional-size-ch7.png" alt="" /><figcaption></figcaption></figure>

(Note: for USDT collateral markets, 1YU = 1USDT worth of funding on the equivalent perp market)

## Liquidation

Liquidation is the automatic closure of your position by the system. When this happens, your position is closed at the current mark implied APR to prevent further losses and protect the platform from bad debt.

There are several different ways for you to monitor your liquidations:

1.  **Liquidation Implied APR**

    Similar to the "liquidation price" on perpetual exchanges, if YU’s implied APR reaches this rate, your position will be open for liquidation.

    Note that the liquidation implied APR can change since your collateral balance is affected by the periodic yield settlements from your currently open position.
2.  **Health Factor**

    The health factor is a metric that measures the safety of a position on Boros, it helps users visualize the “health” of a user’s position from liquidations.

    <Hint style="info">
    Health Factor = 1 - (Maintenance Margin / Net Balance)
    </Hint>

    Your position will be liquidated when health factor falls to 0. Maintaining a health factor above zero is crucial to avoid liquidation.
3.  **Rate Sensitivity / Daily Volatility**

    Rate Sensitivity tells you how much your net balance moves per 1% shift in Implied APR. Daily Volatility tells you how much Implied APR has been swinging day to day on average (7DMA). Together, they give you a forward-looking view of your liquidation risk.

    For example, you can cross-reference Liquidation Implied APR against Daily Volatility. If your position's buffer is smaller than a typical day's swing, your position is at elevated risk and you should consider topping up your collateral.

<Hint style="info">
**Monitor Rate Sensitivity to see how much Implied APR needs to move in order for your position to be liquidated, as well as your position’s health factor or liquidation Implied APR.**
</Hint>

In short, your position’s overall health is sensitive to certain changes, including the “price” of YU (Implied APR) and the amount of collateral you have, which can fluctuate after every settlement (see [Chapter 4](chapter-4-settlement)).

If Underlying APR goes against your position's direction heavily, it can rapidly reduce your collateral, increasing your liquidation risk.

Regular monitoring and timely collateral adjustments are crucial to maintain position health (health factor) and avoid liquidation.

You can learn more about Margin and Liquidations in detail from our docs [here](https://pendle.gitbook.io/boros/boros-docs/risk-parameters/margin-and-liquidations).