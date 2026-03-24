# Chapter 3 - Opening and Closing a Position

## Opening a Position

On Boros, traders can open either a Long or Short position on YU.

Prior to opening a position, a trader is required to have enough balance in their collateral to back the desired position size.

You can learn more about collateral in [Chapter 7](chapter-7-margin-and-liquidations.md).

### Long YU

<figure><img src="../.gitbook/assets/image (6).png" alt=""><figcaption></figcaption></figure>

If BTC is trading at $50,000 and you are bullish BTC, you will enter a long position on BTC. This is done by paying the current price to acquire BTC in the hopes of selling BTC for >$50,000 later.

Similarly on Boros, if you expect the funding rate to increase, you should enter a long position on YU. This is achieved by paying the current “price” or “Implied APR” of YU in exchange for the Underlying APR.

Essentially, you commit to paying a fixed rate in the hopes of receiving a higher rate.

Traders with a long YU position benefit when the Underlying APR increases relative to the Implied APR upon entry.

{% hint style="info" %}
**Long YU**

* Commits to paying a Fixed APR (i.e. Implied APR upon opening the position) to receive the Underlying APR.
* Expects Underlying APR > Implied APR
{% endhint %}

### Short YU

<figure><img src="../.gitbook/assets/image (7).png" alt=""><figcaption></figcaption></figure>

A short YU position is the opposite of a long YU position. If you expect a decline in the funding rate, you should enter a short position instead.

Traders in a short position pay the Underlying APR in exchange for receiving a Fixed Rate (i.e. the Implied APR upon entry). These traders benefit when the Underlying APR decline relative to the Implied APR.

In simple terms, when you short YU, you are betting that the Fixed Rate you lock in will end up being higher than the Underlying APR you will be paying.

{% hint style="info" %}
**Short YU**

* Commits to paying the Underlying APR to receive a Fixed APR (i.e. Implied APR upon opening the position).
* Expects Implied APR > Underlying APR
{% endhint %}

To close an open position, Boros automatically opens an opposite position of the same size.
