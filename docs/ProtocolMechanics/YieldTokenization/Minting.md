---
hide_table_of_contents: true
---

# Minting

Users receive yield-bearing assets when they deposit funds into a yield-source. For example, DAI staked in Compound is represented as *cDAI*. ETH staked in Lido is represented as *stETH*. 

*cDAI* and *stETH* are examples of **yield-bearing assets**.

In Pendle, yield-bearing assets are split into two components: Principal Tokens (**PT**) and Yield Tokens (**YT**). PT represents the principal of the underlying yield-bearing token, while YT represents entitlement to all the yield of the asset. YT and PT can be traded on Pendle.

![Yield Splitting](/img/ProtocolMechanics/yield-splitting.png "Yield Splitting")

What Pendle does is similar to bond stripping in traditional finance, where the principal and interest of bonds are separated. In this, PTs are equivalent to [zero-coupon bonds](https://www.investopedia.com/terms/z/zero-couponbond.asp), while YTs are the detached [coupon](https://www.investopedia.com/terms/c/coupon.asp) payments.

Users can mint PT and YT by depositing the yield-bearing asset (e.g. stETH) into Pendle. Base assets (e.g. ETH) will be auto-converted into the yield-bearing asset before PT and YT are minted.

e.g. ETH → stETH → SY-stETH → PT-stETH + YT-stETH. This function can be found in the Pro UI after selecting one of the assets.

![Yield Splitting UI](/img/ProtocolMechanics/yield-splitting-ui.png "Yield Splitting UI")
