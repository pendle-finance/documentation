---
hide_table_of_contents: true
---

The Market page displays information about all yield markets on Pendle. The most popular assets will be displayed by default, while assets that are not whitelisted on the UI can be found by pasting the address in the search bar.

Furthermore, you can toggle between Active and Matured assets. Active assets are those that have not matured and are still accruing yield, while Matured assets are those that are no longer accruing yield and can be redeemed for the underlying assets. 

**Maturity** is the date at which PT becomes fully redeemable for the underlying asset and YT stops accruing yield. One asset can have multiple maturity dates, and there is an independent market for each maturity date, and as such the implied yield of an asset can differ across different maturities.

**Underlying APY** is the prevailing yield rate of the underlying asset. This APY is determined by the protocol that created the asset. Underlying Value is the current market value of the asset in USD.

**Implied APY** is the market consensus of the future APY of an asset. This value is calculated based on the ratio of the price of YT to PT and the formula is shown below. This is the tool, when used in conjunction with the Underlying APY, that most traders use to determine their trading strategies.

$$$
\text{Implied Yield} = \left[\left(1 + \cfrac{\text{YT Price}}{\text{Value of underlying amount YT represents} - \text{YT Price}}\right)^\cfrac{365}{\text{Days to expiry}}\right] - 1
$$$

**Floating APY** is the extrapolated APY of buying YT at the current price, assuming underlying APY remains constant. This value can be negative, meaning that the current underlying APY will be less than the cost of buying YT.

**Fixed APY** is the guaranteed yield you will receive by holding PT. This value is numerically equivalent to the Implied APY.

### Strategies

#### Buying PT

If you believe that the yield of the asset will fall, you would want to **hedge your yield**. You can achieve this by buying PT. Since you are guaranteed the underlying asset after maturity, you are effectively locking your APY at the current Implied Yield when you buy PT. Another way to look at it is that you are **fixing your yield** at the current Implied Yield. 

For example, if you buy PT-aUSDC with a maturity period of 1 year at 5% implied yield, it means that for every USDC you spend on PT, you will get back 1.05 USDC upon maturity and redemption.

#### Buying YT

On the other hand, if you believe that the yield of the asset will rise, you would want to **bet on your yield**. By buying YT, you are increasing your exposure to the yield of an asset by only buying the yield component, and your returns will be determined by the fluctuations in the underlying APY.

Furthermore, buying YT is much more capital efficient than buying the underlying asset, meaning that for the same amount of capital, you can purchase a much larger quantity of YT, therefore **compounding your exposure** to yield.

For example, if the price of YT is 5% the price of the underlying asset, any increase in underlying yield will result in a 20x increase in your returns, since you are able to purchase 20x units of YT.

#### Liquidity Provision

If you believe that the yield of an asset will be unlikely to fluctuate significantly, you can simply provide liquidity in our pools to earn some extra yield from swap fees and incentives. 

There is no IL risk from fluctuations in the price of the underlying asset that most other yield protocols have, as the price of PT and YT are linked to the price of the underlying asset, in that PT + YT = underlying. The only IL risk comes from fluctuations in the demand for PT and YT, which are inherent in all liquidity pools. 

IL is capped and minimized if liquidity is provided to maturity. This is possible as both assets provided have the exact same value at maturity. This way, liquidity provision can also act as a hedge for any of your PT or YT positions. 
