import Hint from '@site/src/components/Hint';

# Chapter 3.2 - More Yield via Liquidity Provision

## Liquidity Provision on Pendle

<iframe height="400" width="100%" src="https://www.youtube.com/embed/AWceGmkv2pc" title="Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

Similar to many other DeFi protocols, you can also deposit your asset to provide liquidity to Pendle pools. Pendle pools facilitate all other yield strategies discussed in this Academy.

<Hint style="info">
💡 Liquidity provision on Pendle has no impermanent loss risk at maturity.
</Hint>

#### Earn extra yields on top of your otherwise idle yield-bearing assets

Liquidity providers receive returns from multiple avenues:

* Native yields
  * Protocol yields/rewards from the underlying asset (e.g. yield from stETH, or ETH rewards distributed from GMX’s GLP)
  * Fixed yield from the PT component of the pool
* Swap fees
*   \$PENDLE incentives

    <figure><img src="/pendle-academy/imgs/image (3).png" alt="" /><figcaption></figcaption></figure>

<Hint style="warning">
**Obtain vePENDLE to boost rewards further** \
On top of all these rewards, vePENDLE holders can also boost their Liquidity Provision APY up to 2.5X! Click [here](https://docs.pendle.finance/ProtocolMechanics/Mechanisms/vePENDLE) to learn more.
</Hint>

<figure><img src="/pendle-academy/imgs/image (6).png" alt="" /><figcaption><p>vePENDLE lock</p></figcaption></figure>

### Why provide liquidity to Pendle pools?

1. You **earn extra “free” yields**, including swap fees and \$PENDLE incentives, on top of your otherwise idle asset
2. No impermanent loss (IL) at maturity. Pendle pools are denominated in your selected underlying asset _only_ (e.g. consists of the native stETH plus PT-stETH only in the stETH pools), which results in a single asset price exposure.
3. You are _**not**_ locked and can exit at any time.

### How to start earning

Providing liquidity on Pendle can be as simple as just a one-click transaction, allowing you to swap any assets you hold (e.g. USDC) into Pendle LP positions (e.g. Pendle LP-stETH). Similarly, you can even use other Pendle assets like [PT or YT](../pendle-101/chapter-2-yield-tokenization-basics) to deposit into a Pendle LP.

1. Go to the **Pools** page: [https://app.pendle.finance/trade/pools](https://app.pendle.finance/trade/pools) .
2. Deposit and start earning
   1. Select an asset pool and a maturity date to provide liquidity to. You can also sort the list by the “Highest APY”.
   2. Select your input asset and amount (which will be swapped to the pool’s asset, if necessary). This can be a different token to the underlying asset and we will find the best route to swap your asset.
   3. Review output, approve and confirm the transaction.
3. If you have an open position:
   1. Click “Dashboard” on the top menu to see your current LP positions.
   2. You can return to the “Claim” button in “Dashboard” to claim your LP rewards (note that not all rewards are claimable, see FAQ).
   3.

       <figure><img src="/pendle-academy/imgs/image (8).png" alt="" /><figcaption></figcaption></figure>
4. Lock PENDLE for vePENDLE to boost LP incentives (optional). Buy \$PENDLE and click “vePENDLE” on the top menu and click the “Lock PENDLE” button, or go to [this page](https://app.pendle.finance/vependle/lock/update). Learn more [here](https://docs.pendle.finance/Governance/vePENDLE).

**Am I locked until the maturity date? Can I exit early?**

> You are _not_ locked at all, you can remove LP and exit at any time.

**Do I have to hold until the maturity date to earn the advertised APY?**

> No, the APY you earn from liquidity provision is independent of the maturity date. The PENDLE or native rewards are streamed to LPs all the time, exiting the pool before its maturity date does not change the amount of rewards streamed to you.

**What tokens am I really exposed to in the LP pool?**

> We will explain in more detail in[chapter-7-providing-liquidity-while-trading-yield.md](../yield-trading-deep-dives/chapter-7-providing-liquidity-while-trading-yield.md "mention"). In a nutshell, a Pendle pool consists of 2 components: (1) (a wrapped version of) the underlying asset, and (2) the PT version of it (usually in a smaller proportion). You can review the concept of PT in [chapter-2-yield-tokenization-basics.md](../pendle-101/chapter-2-yield-tokenization-basics.md "mention").

**How is there no impermanent-loss (IL) at maturity?**

> The main idea is that a Pendle pool only contains tokens that are highly correlated and denominated in the same asset you choose, so the price ratio between them does not change much. This means that IL is minimal and **guaranteed to be zero or none at maturity**.

**How to claim LP rewards?**

> You can claim your LP rewards by clicking the “Claim” button within “Dashboard” on the top menu.

**Why don’t I see the underlying yield being claimable sometimes?**

> Some assets, like stETH, wstETH, rETH, and gDAI, do not distribute yields explicitly, but rather increase their token value over time. Their yields are baked into their rising token price. Pendle pool swap fees also increase the pool value and do not need to be claimed.
>
> On the other hand, some assets, like GLP and Stargate-USDT, distribute yields to holders periodically. You will need to claim these yields manually.
>
> \$PENDLE incentives are always claimable using the “Claim” button.

**What is the “Zero Price Impact Mode” in the “Zap” interface in “Pendle Trade”?**

> Please check out [#2-how-to-be-yield-neutral-with-zero-price-impact-mode](../yield-trading-deep-dives/chapter-7-providing-liquidity-while-trading-yield#2-how-to-be-yield-neutral-with-zero-price-impact-mode "mention")

### LP as part of your yield-trading strategy

Providing liquidity can also be part of your yield optimization or trading strategies because an LP position has a slightly bearish outlook on the underlying asset yield. This will be discussed in depth in [chapter-7-providing-liquidity-while-trading-yield.md](../yield-trading-deep-dives/chapter-7-providing-liquidity-while-trading-yield.md "mention")
