---
sidebar_position: 3
---

# Fix Yield

Also known as 'Lock Yield' or 'Capture Yield'.

With variable yield assets, it's very common to see spikes in APY. Wonderland at 90K%? xJOE at 60%? These values are not uncommon, but they don't last for very long.

![Fix Yield](/img/pendle-guide/fix-yield.png)

Pendle enables users to fix your future yield at current rates, which is very useful if you are bearish on yield - you believe that current APY is unsustainable and will fall in the future.

To do this, you would want to convert all of the underlying asset to its OT equivalent. This can be achieved in two ways.

* If you already hold the underlying asset, deposit it into Pendle to mint YT and OT, sell the YT and buy more OT.
* If you don't have any underlying or wish to increase your exposure to the asset, you can simply buy OT outright. 

So you might be wondering, how does holding OT instead of the asset help you to capture high APY? Let's find out in the next section.

## Case Study

Dan notices that lending interest for $AVAX on Benqi, which usually sits around 8%, has spiked to **15%**. To take advantage of this, he wants to buy OT-qiAVAX with 1 year expiry, which is trading at ~87% the price of $AVAX. (Why 87%? [Click](../../dive-deeper/implied-yield.md) here to learn more about fair price.)

Let's say he has 100 $AVAX and buys ~115 OT-qiAVAX. After a year, when the contract expires, he will be able to redeem 115 OT-qiAVAX for 115 qiAVAX, giving an APY of **15%**.

If he instead deposited his 100 $AVAX in BenQI directly, the lending rates would have regressed to its average of 8%, and he would have only gotten 108 qiAVAX in a year, or **8%** APY.

By buying OT, he "locks in" the high prevailing APY, allowing him to take full advantage of the spike, even if the actual APY falls afterwards.
