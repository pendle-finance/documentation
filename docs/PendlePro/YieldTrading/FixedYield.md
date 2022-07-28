---
hide_table_of_contents: true
---

# Fixed Yield

Also known as 'Lock Yield' or 'Capture Yield'.

With variable yield assets, APYs can spike to unusually high values. These spikes are not uncommon, but they don't last for very long.

Pendle enables users to fix your future yield at current rates, which is very useful if you are bearish on yield - you believe that current APY is unsustainable and will fall in the future.

To do this, you would want to convert all of the underlying asset to its PT equivalent. This can be achieved in two ways.

* If you already hold the underlying asset, deposit it into Pendle to mint YT and PT, sell the YT and buy more PT.
* If you don't have any underlying tokens or wish to increase your exposure to the asset, you can simply buy PT outright.

So you might be wondering, how does holding PT instead of the asset help you to capture high APY? Let's find out in the next section.

## Case Study

Dan notices that lending interest for $AVAX on Benqi, which usually sits around 8%, has spiked to **15%**. To take advantage of this, he wants to buy PT-qiAVAX with 1 year expiry, which is trading at ~87% the price of $AVAX. (Why 87%?[Click](https://docs.pendle.finance/docs/information/dive-deeper/implied-yield) here to learn more about the fair price.)

Let's say he has 100 $AVAX and buys ~115 PT-qiAVAX. After a year, when the contract expires, he will be able to redeem 115 PT-qiAVAX for 115 qiAVAX, giving an APY of **15%**.

If he instead deposited his 100 $AVAX in BenQI directly, the lending rates would have regressed to its average of 8%, and he would have only gotten 108 qiAVAX in a year, or **8%** APY.

By buying PT, he "locks in" the high prevailing APY, allowing him to take full advantage of the spike, even if the actual APY falls afterwards.
