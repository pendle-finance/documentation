---
sidebar_position: 2
---

# Implied Yield

Implied yield is the annual yield on the underlying asset that the market is implying, by trading YT at the current price. 

YT price fluctuates with market demand and can serve as an indication of market sentiment on yields. However, YT price decays through time and it can be difficult to gauge the yield that it is trading at from the price. Implied yield allows for quick comparisons of YT price against the current yield of the underlying.

$$$
\text{Implied Yield} = [(1 + \cfrac{\text{YT Price}}{\text{Value of underlying amount YT represents} - \text{YT Price}})^\cfrac{365}{\text{Days to expiry}}] - 1
$$$

For example, if YT-aUSDC-1.5Year is trading at an implied yield of 13.2%, the market is collectively saying that USDC's yield on Aave for the 1.5-year duration is 13.2% per year.
