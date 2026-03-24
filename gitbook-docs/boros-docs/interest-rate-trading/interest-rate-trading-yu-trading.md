# Interest Rate Trading (YU Trading)

## Implied APR and Fixed APR

**Implied APR is the price of YU, denoted in percentage terms**. It can also be referred to as the market consensus of the future APR of an asset. It is used in conjunction with the underlying APR to make decisions on whether to long / short YU.

When a user opens a long / short position on YU for the first time at the current implied APR, that implied APR becomes the fixed APR payable / receivable until maturity.

Note that implied APR is the “price” of YU, which means it is directly correlated to your position value. Upon opening a position, the “value” of the position is affected by implied APR changes. In other words, if implied APR goes up, traders with a long position will see an increase in their position value and traders with a short position will see a decrease in their position value.

In other words, a high implied APR can mean that the YU is “expensive”, and a low implied APR can mean that the YU is “cheap”. For yield traders with a shorter time horizon, the concept of “buy-low-sell-high” is totally applicable here, where they can enter a long position when implied APR is low, and close the position when it goes up.

### Long YU

{% hint style="info" %}
Pay fixed APR, receive underlying APR.
{% endhint %}

A long YU position pays a fixed APR to receive the underlying APR. Essentially, it is a long position on the underlying APR, betting that receiving underlying APR outperforms the fixed APR payables.

**Upon opening a new long position on YU, the current implied APR becomes the fixed APR payable until maturity.**

Since implied APR is the “price” of the yield rate, the current implied APR directly affects your total position value. If implied APR goes up, the total position value on a long position goes up, and vice versa (i.e. price go up, your long position value go up).

{% hint style="info" %}
Long YU positions bet on:

1. Underlying rate > fixed rate, or
2. Implied APR going up (i.e. YU price going up)
{% endhint %}

### Short YU

{% hint style="info" %}
Pay underlying APR, receive fixed APR.
{% endhint %}

A short YU position pays the underlying APR to receive a fixed APR. Essentially, it is a short position on the underlying APR, betting that underlying APR payable is less the fixed rate received.

**Upon opening a new short position, the current implied APR becomes the fixed APR receivable until maturity.**

Since implied APR is the “price” of the yield rate, the current implied APR directly affects your total position value. If implied APR goes up, the total position value on a short position goes down, and vice versa.

{% hint style="info" %}
Short YU positions bet on:

1. Underlying rate < fixed rate, or
2. Implied APR going down (i.e. YU price going down)
{% endhint %}

## Opening a Position

1. To open a position on Boros, select the desired market.
2. Deposit the collateral of the desired market or zone.
3. Enter the desired size of the position (either long / short position)
4. Execute a market order or place your order on the order book.
5. Position will be opened when the order is filled.

## Closing a Position

You can close a position by clicking the “close position” button, which works by opening the opposite of the currently open position. If you have a long position open, the position will be closed by opening an equivalent short position, and vice versa.

<figure><img src="../.gitbook/assets/image (5).png" alt=""><figcaption></figcaption></figure>

This is because the underlying APR payment / receivables from opposite positions cancels each other out, leaving the position with an aggregate fixed APR payment / receivables. Since a fixed APR payment / receivables to maturity is deterministic, Boros can immediately settle the position into your collateral.
