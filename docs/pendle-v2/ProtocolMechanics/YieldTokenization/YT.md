---
hide_table_of_contents: true
---

# YT

<iframe width="860" height="615" src="https://www.youtube.com/embed/RHuqNScvrnw" title="Chapter 5: What is Yield Token (YT)" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

Yield Token (YT) represents the yield component of an underlying yield-bearing asset.

By holding YT, yield from the underlying asset will be streamed to the users, up until maturity. This rate of yield production is represented as “[Underlying APY](https://docs.pendle.finance/ProtocolMechanics/Glossary)” in the Pendle app.

For example, buying 10 YT-wstETH (stETH) and holding them for 5 days lets you receive all of the yield equivalent to a 10 stETH within the same period of time.

### Leveraged Yield Exposure

Because YTs are purchased for a fraction of the underlying asset's price, they offer **leveraged exposure** to its yield. A small change in the underlying APY can result in a significant percentage change in the YT's return. This makes YT a powerful instrument for yield speculation and points farming.

### Value Decay

The value of YT trends towards $0 as it approaches maturity (*ceteris paribus*), becoming $0 upon maturity. If the implied yield remains constant, the YT's price decreases linearly with the time remaining — a YT with 15 days left to maturity will be worth roughly half the price it was when it had 30 days left. Users profit when the total yield collected up to that point ends up being higher than the cost of YT acquisition.

You can think of [Implied APY](https://docs.pendle.finance/ProtocolMechanics/Glossary) as the “rate” at which YT is priced by the market. If the average Underlying APY ends up being higher than the “rate” or Implied APY that you paid for, you will profit.

As such, buying YT can be treated as “longing the yield” of an asset.

### Points Farming

YTs are a popular instrument for farming points from airdrop campaigns, as they capture all points from the underlying asset, often with significant leverage. Since 1 YT earns the same points as 1 unit of the underlying asset, and YTs cost only a fraction of the underlying, users can achieve multiplied points exposure.

You can learn more about yield trading on Pendle [here](https://app.pendle.finance/trade/education/learn).

Note: YT yields are distributed as SY, which can be unwrapped back into the underlying asset using [SY Unwrapper](https://docs.pendle.finance/ProtocolMechanics/YieldTokenization/SY).


# Claiming YT Yield

![Claiming YT Yield](/img/ProtocolMechanics/claiming-yt-yield.png "Claiming YT Yield")

You can claim any earned YT (and LP) yield and rewards from the [Pendle Dashboard](https://app.pendle.finance/trade/dashboard/overview?timeframe=allTime&inUsd=false) anytime, even before maturity.

Since YT = $0 upon maturity, no further action (aside from claiming yield) is required.
