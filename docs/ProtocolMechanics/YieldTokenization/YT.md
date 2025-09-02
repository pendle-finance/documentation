---
hide_table_of_contents: true
---

# YT

<iframe width="860" height="615" src="https://www.youtube.com/embed/RHuqNScvrnw" title="Chapter 5: What is Yield Token (YT)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Yield Token (YT) represents the yield component of an underlying yield-bearing asset.

By holding YT, yield from the underlying asset will be streamed to the users, up until maturity. This rate of yield production is represented as “[Underlying APY](https://docs.pendle.finance/ProtocolMechanics/Glossary)” in the Pendle app.

For example, buying 10 YT-wstETH (stETH) and holding them for 5 days lets you receive all of the yield equivalent to a 10 stETH within the same period of time.

The value of YT trends towards $0 as it approaches maturity (*ceteris paribus*), becoming $0 upon maturity. Users profit when the total yield collected up to that point ends up being higher than the cost of YT acquisition.

You can think of [Implied APY](https://docs.pendle.finance/ProtocolMechanics/Glossary) as the “rate” at which YT is priced by the market. If the average Underlying APY ends up being higher than the “rate” or Implied APY that you paid for, you will profit. 

As such, buying YT can be treated as “longing the yield” of an asset.

You can learn more about yield trading on Pendle [here](https://app.pendle.finance/trade/education/learn).

Note: YT yields are distributed as SY, which can be unwrapped back into the underlying asset using [SY Unwrapper](https://docs.pendle.finance/ProtocolMechanics/YieldTokenization/SY).


# Claiming YT Yield

![Claiming YT Yield](/img/ProtocolMechanics/claiming-yt-yield.png "Claiming YT Yield")

You can claim any earned YT (and LP) yield and rewards from the [Pendle Dashboard](https://app.pendle.finance/trade/dashboard/overview?timeframe=allTime&inUsd=false) anytime, even before maturity.

Since YT = $0 upon maturity, no further action (aside from claiming yield) is required.