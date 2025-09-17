import Hint from '@site/src/components/Hint';

# PT / YT / LP Cheatsheet

## What is Pendle

Pendle lets you earn better yields. We help you secure better certainty and better returns (i.e. higher APY 🔥).

1. Earn fixed yield (with PT)
2. Provide liquidity (LP) to earn extra yield with minimal or zero impermanent loss (IL)
3. Long yield (with YT)

### PT & YT — a quick round-up

Imagine Pendle being a marketplace where property owners can split and trade their principal (rights to the ownership of the property) and yield (rights to rental payments) separately. You can then sell or trade the yield portion even before maturity. This creates new ways to manage and even speculate on yield.

<Hint style="info">
💡 Using stETH as an example: **Principal** (Right to Principal of stETH) + **Yield** (Rights to stETH yield) = **Yield-bearing asset** (stETH)
</Hint>

#### **Principal Token (PT)**

* 1 PT lets you redeem 1 unit of the original asset at maturity date.
* PT is similar to [zero-coupon bond](https://www.investopedia.com/terms/z/zero-couponbond.asp) in traditional finance.

#### Yield **Token (YT)**

* 1 YT lets you receive the yield of 1 unit of the original asset until the maturity date, claimable in real-time.
* YT is similar to [detached coupons of bonds](https://www.investopedia.com/terms/c/coupon.asp) in traditional finance.

<Hint style="danger">
**You can sell PT and YT anytime** on Pendle market, with _**no**_**&#x20;lock or penalty**, at market price. They are traded 24/7.
</Hint>

Perhaps the most important takeaway about PT & YT:

<Hint style="success">
💡 PT Price + YT Price = Underlying Asset Price
</Hint>

***

## PT Cheatsheet — Earn fixed yield

<table data-header-hidden><thead><tr><th width="218"></th><th></th></tr></thead><tbody><tr><td>TL;DR</td><td><strong>Earn</strong> <strong>guaranteed amount of your chosen asset</strong> if you hold the position until the maturity date.</td></tr><tr><td>Yield source</td><td>PT has <a href="../pendle-101/chapter-2-yield-tokenization-basics">a lower entry cost compared to underlying asset</a>, its value grows over time and becomes 1:1 redeemable to the original asset at maturity date. Your realised discount becomes your fixed yield.</td></tr><tr><td>Volatility</td><td>Low</td></tr><tr><td>Investment profile</td><td>Long term</td></tr><tr><td></td><td>Beginners friendly</td></tr><tr><td>Guaranteed</td><td>Both capital and return are guaranteed, if you hold until maturity</td></tr><tr><td>Underlying asset yield outlook</td><td>Bearish</td></tr><tr><td>Price changes</td><td><p>Price rises <em>in the short term</em> with… </p><ol><li>time </li><li>Falling <a href="../optimizing-yields-with-pendle/chapter-5-important-concepts-in-yield-trading#implied-apy">implied APY</a> </li><li>Rising underlying asset price (and vice versa) Note that PT is always 1:1 redeemable to underlying asset at maturity date.</li></ol></td></tr><tr><td>Valuation</td><td>PT is cheap when <a href="../optimizing-yields-with-pendle/chapter-5-important-concepts-in-yield-trading#implied-apy"><em>Implied APY</em></a> is much higher than the <a href="../optimizing-yields-with-pendle/chapter-5-important-concepts-in-yield-trading#underlying-apy"><em>Underlying APY</em></a></td></tr><tr><td>Time to enter</td><td><ol><li>If you believe the asset will generate less APY in the future, </li><li>If you want to hedge against falling yields, </li><li>If you feel satisfied enough with the advertised APY, </li><li>If you believe PT is too undervalued</li></ol></td></tr><tr><td>Early exit</td><td><strong>Anytime</strong>, there’s <strong>no lock or penalty</strong>. PT always has a market price in Pendle’s AMM.</td></tr><tr><td>Capital efficiency</td><td>No leverage by itself. However, there are <a href="broken-reference">lending platforms</a> that allow you to deposit PTs as collateral to borrow assets, or even loop-leveraging.</td></tr><tr><td>Other comments</td><td>PT can be a viable alternative to spot, with similar risk exposure, and the benefit of downside cushion thanks to the fixed yield realized upon redemption. PT can also be a <a href="../yield-trading-deep-dives/chapter-6-shorting-yield">short-yield strategy</a>, you may profit in short-term if underlying yield goes down.</td></tr></tbody></table>

<details>

<summary>Can I profit if I early exit my PT?</summary>

When you exit early, your earnings will depend on the PT’s market price at exit. You may earn higher or lower (in extreme cases, at a loss) than the advertised APY at entry. Note that, however, PT is always 1:1 redeemable to the underlying asset at the maturity date, you do not necessarily need to sell under unfavorable short-term price moves.

</details>

## YT Cheatsheet — Increase yield exposure (Long yield)

<table data-header-hidden><thead><tr><th width="220"></th><th></th></tr></thead><tbody><tr><td>TL;DR</td><td><p><strong>Increase your yield exposure (long yield)</strong>. Either hold it until maturity, or buy low and sell high to turn a quick profit. You profit when either or both… </p><ol><li>the price of YT rises, </li><li>the yield produced by the YT becomes bigger than your cost buying the YT</li></ol></td></tr><tr><td>Yield source</td><td>YT <a href="../pendle-101/chapter-2-yield-tokenization-basics">receives all yield produced by the underlying asset</a> until maturity date, claimable in real time.</td></tr><tr><td>Volatility</td><td>Higher</td></tr><tr><td>Investment profile</td><td>Short or Long term</td></tr><tr><td></td><td>Intermediate to Advanced investors</td></tr><tr><td>Guaranteed</td><td>N/A</td></tr><tr><td>Underlying asset yield outlook</td><td>Bullish</td></tr><tr><td>Price changes</td><td><p>Price rises with… </p><ol><li>Rising <a href="../optimizing-yields-with-pendle/chapter-5-important-concepts-in-yield-trading#implied-apy">implied APY</a> </li><li>Rising underlying asset price </li><li>Rising yield/reward token asset price (if applicable to that asset) (and vice versa) Note that <strong>time</strong> works <em>against</em> YT — YT price gradually falls over time to zero at maturity.</li></ol></td></tr><tr><td>Valuation</td><td>YT is cheap when <a href="../optimizing-yields-with-pendle/chapter-5-important-concepts-in-yield-trading#implied-apy"><em>Implied APY</em></a> is much lower than the <a href="../optimizing-yields-with-pendle/chapter-5-important-concepts-in-yield-trading#underlying-apy"><em>Underlying APY</em></a></td></tr><tr><td>Time to enter</td><td><ol><li>If you believe the asset will generate more APY in the future, </li><li>If you want to hedge against rising yield, </li><li>If you want to speculate on short-term rise of yield % or yield token prices </li><li>If you believe YT is too undervalued</li></ol></td></tr><tr><td>Early exit</td><td><strong>Anytime</strong>, there’s <strong>no lock or penalty</strong>. YT always has a market price in Pendle’s AMM.</td></tr><tr><td>Capital efficiency</td><td>Since <a href="../pendle-101/chapter-2-yield-tokenization-basics">YT is much cheaper than the underlying asset</a>, you <em>effectively</em> get a <strong>leveraged yield exposure</strong> (typically 20x or more), with no actual borrowing involved. So there’s <strong>no liquidation or oracle error risks</strong>.</td></tr></tbody></table>



## LP Cheatsheet — Earn passive extra yields providing liquidity

<table data-header-hidden><thead><tr><th width="220"></th><th></th></tr></thead><tbody><tr><td>TL;DR</td><td><strong>Earn extra “free” yields on top of your otherwise idle yield-bearing assets.</strong> A Pendle pool is denominated in your selected underlying asset <em>only</em> (PT + SY) (SY = wrapped underlying asset). There’s also <strong>no impermanent-loss (IL) concern at maturity</strong>.</td></tr><tr><td>Yield source</td><td><p>Multiple avenues: </p><ol><li>Native yields — asset’s underlying yield + PT’s fixed yield </li><li>Swap fees 3. \$PENDLE incentives (Optional) You can boost your APY by locking PENDLE for <a href="https://docs.pendle.finance/ProtocolMechanics/Mechanisms/vePENDLE">vePENDLE</a>. vePENDLE holders can also boost their Liquidity Provision APY up to 2.5X.</li></ol></td></tr><tr><td>Volatility</td><td>Low IL is minimal (pool consists of highly correlated tokens only) before maturity date. No IL at maturity date because PT in the pool will become 1:1 redeemable to underlying asset.</td></tr><tr><td>Investment profile</td><td>Short or Long term</td></tr><tr><td></td><td>Beginners friendly</td></tr><tr><td>Guaranteed</td><td>APY not guaranteed but capital is guaranteed if you hold until maturity</td></tr><tr><td>Underlying asset yield outlook</td><td>Slightly bearish, due to some presence of PT in the pool</td></tr><tr><td>Price changes</td><td>Short term price change behavior is similar to PT due to some presence of PT in the pool. Note that the PT in the pool is always 1:1 redeemable to underlying asset at maturity date.</td></tr><tr><td>Time to enter</td><td>Anytime. Timing or underlying yield outlook aren’t very important. When implied APY is low, it is more favorable to enter with the “<a href="../yield-trading-deep-dives/chapter-7-providing-liquidity-while-trading-yield#what-is-zero-price-impact-mode">Zero Price Impact Mode</a>” enabled, and vice versa.</td></tr><tr><td>Early exit</td><td><strong>Anytime</strong>, there’s <strong>no lock or penalty</strong>. Your APY is also not affected if you exit early.</td></tr><tr><td>Comment</td><td>Can be used to hedge against falling underlying yield due to some presence of PT in the pool. Learn more about using <a href="../yield-trading-deep-dives/chapter-7-providing-liquidity-while-trading-yield">LP as part of your yield trade</a>.</td></tr></tbody></table>

<Hint style="info">
Learn more on [chapter-9-identifying-opportunities-to-long-short-yield.md](../yield-trading-deep-dives/chapter-9-identifying-opportunities-to-long-short-yield.md "mention")
</Hint>
