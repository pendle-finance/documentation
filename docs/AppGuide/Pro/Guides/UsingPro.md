---
hide_table_of_contents: true
---

# Using Pendle Pro

Pro gives users access to the full suite of Pendle’s functionality, allowing you to freely trade yield and execute any yield strategies.

Users can deposit yield-generating assets into Pendle and mint Principal Tokens (**PT**) and Yield Tokens (**YT**). PT represents the principal of the underlying yield-bearing token, while YT represents entitlement to **all** the yield of the asset. You can trade both PT and YT on Pendle.

![Yield splitting](/img/pendlepro/yield_splitting.png "Yield splitting")

In TradFi, what Pendle does is similar to bond stripping. The principal and interest of bonds are separated, so PTs are equivalent to [zero-coupon bonds](https://www.investopedia.com/terms/z/zero-couponbond.asp), while YTs are the detached [coupons](https://www.investopedia.com/terms/c/coupon.asp).

## Using Pendle Pro

To enable Pendle Pro, toggle the button in the top right corner of the app.

![Simple toggle](/img/pendlepro/simple_toggle.png "Simple toggle")
![Pro toggle](/img/pendlepro/pro_toggle.png "Pro toggle")

If you are new to Pendle or yield trading, we have a handy tutorial in this section to give you a tour of the Pro interface, and a simple guide in the next section for you to learn about the basics of yield trading.

## Strategies

### Buying PT

If you believe that the yield of the asset will fall, you would want to **hedge your yield**. You can achieve this by buying PT. Since you are guaranteed the underlying asset after maturity, you are effectively locking your APY at the current Implied Yield when you buy PT. Another way to look at it is that you are **fixing your yield** at the current Implied Yield.

For example, if you buy PT-aUSDC with a maturity period of 1 year at 5% implied yield, it means that for every USDC you spend on PT, you will get back 1.05 USDC upon maturity and redemption.

### Buying YT

On the other hand, if you believe that the yield of the asset will rise, you would want to **bet on your yield**. By buying YT, you are increasing your exposure to the yield of an asset by only buying the yield component, and your returns will be determined by the fluctuations in the underlying APY.

Furthermore, buying YT is much more capital efficient than buying the underlying asset, meaning that for the same amount of capital, you can purchase a much larger quantity of YT, therefore **compounding your exposure** to yield.

For example, if the price of YT is 5% the price of the underlying asset, any increase in underlying yield will result in a 20x increase in your returns, since you are able to purchase 20x units of YT.

### Liquidity Provision

If you believe that the yield of an asset will be unlikely to fluctuate significantly, you can simply provide liquidity in our pools to earn some extra yield from swap fees and incentives. 

There is no IL risk from fluctuations in the price of the underlying asset that most other yield protocols have, as the price of PT and YT are linked to the price of the underlying asset, in that PT + YT = underlying. The only IL risk comes from fluctuations in the demand for PT and YT, which are inherent in all liquidity pools. 

IL is capped and minimized if liquidity is provided to maturity. This is possible as both assets provided have the exact same value at maturity. This way, liquidity provision can also act as a hedge for any of your PT or YT positions.
