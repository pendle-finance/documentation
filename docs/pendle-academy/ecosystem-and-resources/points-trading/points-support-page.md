import Hint from '@site/src/components/Hint';
import CardGrid, { Card } from '@site/src/components/CardGrid';

# Points Support Page

## Self-service

<CardGrid type="selfService">
  <Card
    title="YT / PT / LP" link="points-support-page#yt-pt-lp"
  />
  <Card
    title="Risks" link="points-support-page#risks"
  />
  <Card
    title="Balance is Down" link="points-support-page#balance-is-down"
  />
  <Card
    title="Points Related" link="points-support-page#points-related"
  />
  <Card
    title="Zero Price Impact LP" link="points-support-page#zero-price-impact-lp"
  />
  <Card
    title="LRT on Arbitrum" link="points-support-page#lrt-on-arbitrum"
  />
  <Card
    title="Capped Assets" link="points-support-page#usde-cap"
  />
  <Card
    title="Others" link="points-support-page#others"
  />
</CardGrid>

## FAQ

### YT / PT / LP

#### 1. What are the differences between YT, PT and LP?

Pendle splits a yield-bearing asset (eETH, stETH, GLP, etc) into 2 parts, **YT** (Yield Token) and **PT** (Principal Token). These 2 components can be traded on Pendle and trading is facilitated by **LP**s (Liquidity Providers).&#x20;

YT and PT are the 2 fundamental concepts in Pendle. To learn more about them in LRT's context, check out [#definition](./#definition "mention").

#### 2. Can I swap between PT and YT?

Yes.

#### 3. Why does YT have a negative long-yield APY?

The negative long-yield APY is because you are paying more vs what you're getting in yield. But note that in LRT's case, YT receives points, which have unknown values (Pendle assumes 0 value for points). Since YT’s cost is higher than the estimated yield-receivables from the current underlying APY, long-yield APY is displaying a negative value.

Check out [#long-yield-apy](../../optimizing-yields-with-pendle/chapter-5-important-concepts-in-yield-trading#long-yield-apy "mention") to learn more about long-yield APY.

#### 4. Do I have to hold until maturity?

No. But see [#risks](points-support-page#risks "mention"), might be relevant for you.

#### 5. Does 1 PT-weETH redeem 1 weETH or 1 eETH at maturity?

1 PT-weETH represents the principal of 1 eETH (which is pegged to ETH). So at maturity, 1 PT-weETH redeems 1 eETH, but is given in weETH (whatever the exchange rate between weETH and eETH is then). One way to easily visualize it is that **1 PT-LRT will be redeemable for 1 ETH** at maturity, given in its yield-bearing form (weETH, rsETH, ezETH, etc).

#### 6. What exactly does 1 PT / YT represent?

It might differ by assets, refer to the asset description in the app (above its price chart) for its exact representation. See below for an example with Ethena's sUSDe.

<figure><img src="..//pendle-academy/imgs/image (123).png" alt="" width="375" /><figcaption></figcaption></figure>

### Risks

#### 1. What are the risks?

**Smart contract risks are to be expected in any DeFi protocol.**

**YT**: The value of the received points and yield might not offset the cost you paid to buy YT.

**PT**: Holding to maturity has no price risk, where you will be able to redeem for the full underlying asset. Exiting before maturity may expose you to price risk (i.e. YT and PT's implied yield fluctuates, which may lead to a difference in value when exiting your position). However, you are still exposed to underlying price risk, i.e. underlying depegs, extreme price movements, etc.

**LP**: Holding to maturity has no price risk, where you will be able to redeem for the full underlying asset. Exiting before maturity may expose you to price risk (i.e. YT and PT's implied yield fluctuates, which may lead to a difference in value when exiting your position). However, you are still exposed to underlying price risk, i.e. underlying depegs, extreme price movements, etc.

#### 2. What happens if EigenLayer (or the LRT projects) stops distributing points?

Pendle still functions as normal. In a nutshell, Pendle streams the points and yields to YT holders. If the underlying projects stop distributing points, YT holders (and LPs) stop earning points too.

In a rational market, we would expect:

* YT's value to decline as it is now worth less (no more points to receive).&#x20;
* PT's value to rise, as YT's value declines (note that PT+YT = underlying)

#### 3. Are Points guaranteed to translate to airdrops?

No. It depends on the underlying protocols to decide what to grant the points for. Pendle is simply a tool to manage your points exposure.

***

### Balance is down

#### 1. My YT balance is down, what is going on?

That means YT's price is down. See [#id-1.-what-are-the-risks](points-support-page#id-1.-what-are-the-risks "mention") for a list of risks.

YT's price fluctuates based on market valuation. YT's value is derived from its yields and points receivables. If the market thinks its future yields and points are worth more than what YT is trading at, YT should see demand, driving its price up, and vice-versa.

That said, YT price naturally declines to zero at maturity while it earns yields and points from the underlying LRT. Because the \$ value of points is unknown, Pendle assumes 0 value, hence your YT PnL will be deep in the negatives in the Pendle dashboard. Learn more at [#id-3.-why-does-yt-have-a-negative-long-yield-apy](points-support-page#id-3.-why-does-yt-have-a-negative-long-yield-apy "mention")

#### 2. My PT balance is down, what is going on?

That means PT's price is down. See [#id-1.-what-are-the-risks](points-support-page#id-1.-what-are-the-risks "mention") for a list of risks.

PT's price fluctuates based on market valuation. **However, at maturity PTs will be worth its guaranteed value**. This means that over time, each PT will appreciate toward that value, with some fluctuations in between. PT price gain is guaranteed at maturity, barring any smart contract risk.

#### 3. My LP balance is down, what is going on?

First of all, DYOR, you should know what you're providing liquidity for. Learn more about liquidity provision at [chapter-7-providing-liquidity-while-trading-yield.md](../../yield-trading-deep-dives/chapter-7-providing-liquidity-while-trading-yield.md "mention").

In short, liquidity provision is done in SY and PT. (e.g SY-eETH and PT-eETH, where SY is simply a wrapped version of the yield-bearing asset to be compatible with Pendle).  LP's value can have a temporary decline because of impermanent loss (IL), but there will be no IL at maturity. How?&#x20;

If PT's value declines, LP's balance declines alongside it as well as it comprises of partly PT. But note that PT's final value is known as it is a fixed yield position (See [here](points-support-page#yt-pt-lp) and [here](../../cheatsheet-for-the-impatient/pt-yt-lp-cheatsheet) to learn what PT is). This means **at maturity, there will be NO IL for LPs on Pendle**. There will be short-term fluctuations, but a long enough timeframe should result in a net-positive position.

***

### Points Related

#### 1. Do I get points when I deposit my LP tokens to Penpie and Equilibria?

Yes. Points are boosted as well if you deposit to liquid lockers like Penpie and Equilibria.

#### 2. Where can I see my points? How do I know it is accruing?

You can track your EigenLayer and native protocol points over at the respective protocol's dashboard:

* eETH Ether.fi (ETH network): [https://app.ether.fi/portfolio](https://app.ether.fi/portfolio)
* rsETH - KelpDAO: [https://kelpdao.xyz/dashboard/](https://kelpdao.xyz/dashboard/)
* ezETH - Renzo [https://app.renzoprotocol.com/portfolio](https://app.renzoprotocol.com/portfolio)

New pool launches might take a while for the respective teams to build the dashboard. Please be patient, your points are accruing in the meantime, just not showing in the dashboard at the moment.

Any dispute should be done in the respective protocol's channel. Pendle is simply a protocol to trade yields (and points). The points tracking is eventually at the underlying protocol's discretion.

#### 3. How does Pendle enable leveraged points for YT?

Note that Pendle does NOT give nor generate additional points to enable YT's leverage. Pendle simply streams points from the underlying to YT holders. To learn more, see [here](./) and [here](../../yield-trading-deep-dives/chapter-8-long-yield-obtain-leveraged-yield-exposure).

#### 4. How often do points accrue?&#x20;

It varies by protocol, check again after 1 day.&#x20;

For newer markets, it might take a while for the respective teams to build the dashboard. Please be patient, your points are accruing in the meantime, just not showing in the dashboard at the moment.

#### 5. My points are not showing, what do I do?

If you purchased PT, you are not getting points.&#x20;

If you purchased YT or provided liquidity, you ARE earning points. Do give it a while for the respective dashboard to show. For newer markets, it might take a while for the respective teams to build the dashboard. Please be patient.

#### 6. Do I earn Eigenlayer points when I deposit my LRTs on Pendle on Arbitrum?

Yes. However, it is up to the underlying protocol to continue streaming rewards and points on Arbitrum.

***

### Zero Price Impact LP

#### 1. What is the difference between when I provide liquidity with Zero Price Impact on vs off?

Learn more on how liquidity provision works: [https://docs.pendle.finance/AppGuide/Trade/Guides/Pool](https://docs.pendle.finance/AppGuide/Trade/Guides/Pool)

Without ZPI, you are providing liquidity with 100% of your capital. LPs consist of PT and its underlying (wrapped in [SY](https://docs.pendle.finance/ProtocolMechanics/YieldTokenization/SY)). Note that PT does not earn points.&#x20;

With ZPI toggled on, Pendle retains your YT exposure in your LP process. (i.e. YT is not sold for additional LP -> hence no price impact). This results in less yield as you have less position in LP (since some capital is retained in YT). The amount of YTs that is retained in this process is equivalent to the amount of PTs in your LP position. **This means that ZPI mode retains most of your points exposure while earning yields from swap fees and Pendle incentives.** Note that PT's fixed yield is offset by YT's price decay at maturity.

#### 2. I forgot to turn on ZPI when I provide liquidity, how do I earn the full points exposure?

See FAQ #4, If you did not turn on ZPI, your YT is sold for more LPs. In this case, the most efficient way to obtain back your points exposure is to **buy more YT**.

You can buy an equivalent amount of YT to the PT in your LP position.&#x20;

You can find the LP composition in the Pool page (eETH example: [https://app.pendle.finance/trade/pools/0xf32e58f92e60f4b0a37a69b95d642a471365eae8/zap/in?chain=ethereum](https://app.pendle.finance/trade/pools/0xf32e58f92e60f4b0a37a69b95d642a471365eae8/zap/in?chain=ethereum))

<figure><img src="..//pendle-academy/imgs/image (122).png" alt="" width="375" /><figcaption></figcaption></figure>

With basic math, you can calculate the amount of PT in your LP holdings and purchase an equivalent amount of YT to regain full points exposure.

#### 3. This is all so confusing! Where can I learn more?

Check out [chapter-7-providing-liquidity-while-trading-yield.md](../../yield-trading-deep-dives/chapter-7-providing-liquidity-while-trading-yield.md "mention")for all you need to know about liquidity provision.

***

### LRT on Arbitrum

#### 1. How do I bridge LRTs to Arbitrum?

<Hint style="danger">
Only use the bridges for the respective assets
</Hint>

**Bridging weETH:** Use Arbitrum's native bridge ([https://bridge.arbitrum.io/](https://bridge.arbitrum.io/)) to bridge weETH from Ethereum to Arbitrum. \
_&#x4F;NLY BRIDGE weETH, NOT eETH. Wrap your eETH to weETH at_ [_https://app.ether.fi/eeth/wrap_](https://app.ether.fi/eeth/wrap)

**Bridging rsETH:** Use Kelp's bridge, powered by LayerZero ([https://bridge.kelpdao.xyz/](https://bridge.kelpdao.xyz/)) to bridge rsETH from Ethereum to Arbitrum. \
_&#x49;f you used the native Arbitrum bridge, you have to bridge it back to Ethereum, which takes 7 days._

Bridging ezETH: Use connext ([https://bridge.connext.network/EZETH-from-ethereum-to-arbitrum?symbol=ezETH](https://bridge.connext.network/EZETH-from-ethereum-to-arbitrum?symbol=ezETH)) to bridge ezETH from Ethereum to Arbitrum.\
_&#x49;f you used the native Arbitrum bridge, you have to bridge it back to Ethereum, which takes 7 days._

#### 2. Do I earn EigenLayer points on Arbitrum?

Yes. If the underlying LRT gives points on Ethereum, it will behave the same way on Arbitrum.

***

### Capped Assets

#### 1. What happens if the asset reaches cap on Pendle?

You will not be able to purchase YT/PT/LP with assets from outside of Pendle. You can still exit YT/PT/LP position into other assets but re-entering will not be possible if the cap fills after you exit.

#### 2. Why are some assets capped on Pendle?

The caps are enforced by the underlying protocols.&#x20;

***

### Others

#### 1. Do I have to stake anything?

No. If you're holding YT, PT, or provided liquidity, you will receive whatever the assets give you without the need to stake anything.

#### 2. My question is not answered here, what do I do?

Use the search function Pendle's discord. Your questions have very likely been asked and answered before. If not, we appreciate questions from a new angle!

#### 3. Is Ether.fi / Renzo affected by EigenLayer caps?&#x20;

No, ezETH & eETH are natively restaked, there are no caps.
