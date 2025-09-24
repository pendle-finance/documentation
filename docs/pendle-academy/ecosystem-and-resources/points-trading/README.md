import Hint from '@site/src/components/Hint';

# Points Trading

<Hint style="info">
Facing problems? Head to our [Support](points-support-page) page!
</Hint>

Assets with Points on Pendle are consolidated into our Points UI: [https://app.pendle.finance/points](https://app.pendle.finance/points)

Get leveraged points, yields or get the highest fixed yields on Pendle supercharged by points trading!

## Definition

Points trading on Pendle works the same way as yield-trading where:

* YT buyers receive underlying floating yields and points
* PT buyers receive a fixed yield in exchange for foregoing all floating yields and points
* Liquidity Providers receive additional yields from swap fees and Pendle incentives while retaining points exposure (with zero price impact enabled)

<Hint style="info">
In other words, underlying points are treated the same way as the underlying yields. This includes 3% YT fees incurred on underlying yields and points.
</Hint>

## YT

Where to buy YT: [https://app.pendle.finance/points](https://app.pendle.finance/points)

**Each YT lets you receive the yield and points of 1 unit of the underlying asset until maturity. (1 ETH, 1 USDC, etc)**

<Hint style="warning">
YT is worth **ZERO at maturity** as it no longer generates any yield and points.
</Hint>

<div align="left"><figure><img src="..//pendle-academy/imgs/image (16).png" alt="" width="375" /><figcaption></figcaption></figure></div>

In the image above, 1 ETH enables you to purchase 13.2 YT. In other words, you’re using 1 ETH to purchase 13.2 ETH worth of ezETH yield and points until maturity.

Note that positions on Pendle are not locked and **you can sell YT anytime at market rate**. Click on the arrows below the input box to switch the input and output assets.

## PT

Where to buy PT: [https://app.pendle.finance/points](https://app.pendle.finance/points)

**Each PT will be redeemable for 1 unit worth of the underlying asset deposited into the underlying protocol at maturity (e.g. 1 ETH worth of ezETH, 1 USDe worth of sUSDe, 1 DAI worth of sDAI, etc).**

<Hint style="info">
As the final value of PT is known, the difference between its current price and its value at maturity, is PT’s fixed yield.
</Hint>

Since PT holders forego all its underlying yields and points to its YT counterpart, PT’s value trades at a discount. At maturity when YT stops accruing yields and points, PT is made whole again, redeemable for the full value of its underlying (1 ETH, 1 USD, etc).

<div align="left"><figure><img src="..//pendle-academy/imgs/image (19).png" alt="" width="375" /><figcaption></figcaption></figure></div>

In the image above, 1 ETH enables you to purchase 1.15 PT. In other words, you’re foregoing points for a guaranteed 11.5% return until maturity. At the time of writing, that translates to \~30% APY.

Note that positions on Pendle are not locked and **you can sell PT anytime at market rate**. Click on the arrows below the input box to switch the input and output assets.

## LP

Where to provide liquidity: [https://app.pendle.finance/points](https://app.pendle.finance/points)

Liquidity Providers on Pendle retain all points exposure while earning additional yield from Pendle.&#x20;

<Hint style="warning">
**Turn on Zero price impact mode to retain the majority of your points exposure**.
</Hint>

<div align="left"><figure><img src="..//pendle-academy/imgs/image (20).png" alt="" width="375" /><figcaption></figcaption></figure></div>

LP position on Pendle consists of PT and a wrapped version of its underlying, e.g.  PT-eETH/SY-eETH, PT-USDe/SY-USDe (SY is simply a wrapped version of its underlying to be compatible with Pendle's architecture).

If Zero Price Impact mode is turned off, your YT position will be sold for a bigger LP position (hence incurring some price impact). This gives more yield but sacrifices points as the PTs in the LP position do not earn points.

To retain most of your points exposure, toggle Zero Price Impact Mode to retain your YT position. While YT goes to zero at maturity, its value is offset by PT’s price gain inside the LP position. Note that points are affected by vePENDLE boosts too (i.e. Those that are unboosted might earn slightly less than those that are max boosted).

In conclusion: LPs on Pendle retain all yield exposure and points while earning additional yields from swap fees and \$PENDLE incentives.

For maximum yield and points, boost your yields by locking vePENDLE or use liquid lockers such as Penpie and Equilibria.

## Point Multipliers on Pendle

Some assets on Pendle earn higher points than simply holding the underlying asset. This multiplier is given by the underlying protocol and is subject to change at any given notice.

Refer to [this page](https://app.pendle.finance/trade/points) for the list of point-multipliers for the various assets on Pendle.

> Holding naked SYs (i.e. SYs that are not in LP) DO NOT earn any Sats.\
> This is to discourage users from simply holding SY without providing any utility while negatively contributing towards the cap. SY in LP positions and YT will continue to earn Sats as per their multipliers.

<Hint style="danger">
The point multipliers are given by the respective protocols. Disputes should be forwarded to the respective teams, not Pendle.
</Hint>

<figure><img src="..//pendle-academy/imgs/image (21).png" alt="" width="375" /><figcaption></figcaption></figure>

In the image above, 1 ETH enables you to purchase 9.3 ETH exposure of yields and points. Coupled with a 2x rsETH multiplier, 1 ETH purchases:

* **9.35x** EigenLayer points
* **18.7x** Kelp Miles
* Yield from 9.35 rsETH

## FAQ

See [points-support-page.md](points-support-page.md "mention")for the full FAQ. Please read through this page and the support page before asking the team questions.

The information in this docs is correct. You do not have to ask the team for confirmation again. Happy yield (and points) trading. :relaxed:
