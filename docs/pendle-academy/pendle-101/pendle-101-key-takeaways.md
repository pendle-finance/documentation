import Hint from '@site/src/components/Hint';

# Pendle 101 - Key Takeaways

> Course level: **#beginner**

## 1. **Introduction to optimizing yields with Pendle**

* Yield-bearing tokens are tokens that generate yield from various DeFi protocols.
* Pendle is a platform that enables users to get better yields, through:
  * Yield Tokenization
  * Yield Trading
* A few examples of what you can do on Pendle to get better yields include:
  1. Earn fixed yield
  2. Earn extra yield without additional risks, using the same asset that you already own (liquidity provision)
  3. Increase yield exposure by purchasing more yield
  4. and more\~

## 2. **Yield Tokenization basics**

### Yield Tokenization

* It means splitting a yield-bearing asset into two parts: the **principal** and the **yield**.
* **Principal** + **Yield** = **Yield-bearing asset**
* Pendle is a marketplace where yield-bearing assets can be tokenized into separate principal and yield tokens and are traded separately.

### PT & YT

Pendle splits a yield-bearing token into two parts: **Principal Token (PT)** and **Yield Token (YT)**.

#### **Principal Token (PT)**

* **PT lets you redeem the underlying principal asset after the maturity date.**
* PT has a **lower entry cost** than the original asset. PT value grows over time and becomes 1:1 redeemable with the original asset at maturity.
* You [earn a fixed yield by buying and holding PT](../optimizing-yields-with-pendle/chapter-3.1-fixed-yield-on-pendle). The difference between the entry cost and the redemption value is your fixed yield.
* PT is similar to [zero-coupon bond](https://www.investopedia.com/terms/z/zero-couponbond.asp) in traditional finance.

#### Yield **Token (YT)**

* **YT lets you receive the yield of the underlying asset until its maturity date, claimable in real-time.**
* You can buy only the yield, or more yield, by buying YT, at a much lower price than the principal. You profit if the yield you receive is more than what you paid for the YT.
* You get [leveraged yield exposure](../yield-trading-deep-dives/chapter-8-long-yield-obtain-leveraged-yield-exposure) by buying YT, without liquidation or oracle risk.
* YT is similar to [detached coupons of bonds](https://www.investopedia.com/terms/c/coupon.asp) in traditional finance.

<Hint style="danger">
**You can sell PT and YT anytime** on the Pendle market prior to maturity, with _**no**_**&#x20;lock or penalty**, at market price. They are tradable 24/7.
</Hint>

Perhaps the most important takeaway from Pendle 101:

<Hint style="success">
💡 **PT Price + YT Price = Accounting Asset Price**\


For example: **1 PT-sUSDe (USDe) + 1 YT-sUSDe (USDe) = 1 USDe**
</Hint>
