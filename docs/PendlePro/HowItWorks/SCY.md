# SCY

## Header 2
<!-- <p id="gdcalert8" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image8.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert9">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

![alt_text](images/image8.png "image_tooltip") -->

SCY (EIP-5115) is a token standard that implements a standardized API for wrapped ibTokens within smart contracts. All ibTokens can be wrapped into SCY, giving them a common interface that can be built upon. SCY opens up Pendle’s yield-tokenization mechanism to all ibTokens in DeFi, creating a permissionless ecosystem.

For example, stETH, cDAI and yvUSDC can be wrapped into SCY-stETH, SCY-cDAI and SCY-yvUSDC, standardising their yield-generating mechanics to be supported on Pendle._

As all SCYs have the same mechanism, Pendle interacts with SCY as the main interface to all ibTokens. PT and YT are minted from SCY and Pendle AMM pools trade PT against SCY.

While this might seem daunting, Pendle automatically converts ibTokens into SCY and vice versa. This process happens automatically behind the scenes, making users feel as if they’re interacting directly with their ibTokens instead of having to manually deal with SCY &lt;> ibToken conversion.

While this standard benefits Pendle, our vision for SCY extends beyond just our own protocol. SCY aims to create unprecedented composability across all of DeFi, enabling developers to seamlessly build on top of existing contracts without the need for manual integration.

Read more about SCY and EIP-5115 [here](https://ethereum-magicians.org/t/eip-5115-super-composable-yield-token/9423)