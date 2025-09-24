---
hide_table_of_contents: true
---

# Unit, Decimals and Scaled18

As Pendle supports a wide range of assets, it is important to understand how to handle units and decimals correctly.

## Definition

- **Decimals** of a token is the number of digits to the right of the decimal point in the token's smallest unit. It is given by the `decimals` method of the token contract. For example:
- **Raw unit** of a token X is the smallest indivisible unit of that token, often referred to as "wei" in the context of Ethereum-based tokens. This unit is used in smart contracts and calculations.
- **Natural unit** of a token X is the unit that is most commonly used by users, which is typically the token's decimal representation. For example:

Examples:
- ETH has decimals of 18, so the natural unit (1 ETH) is $10^{18}$ raw unit.
- USDC has decimals of 6, so the natural unit (1 USDC) is $10^{6}$ raw unit.
- BTC has decimals of 8, so the natural unit (1 BTC) is $10^{8}$ raw unit.

## Decimals of PT, YT, SY and LP

- PT decimals and YT decimals are **the same**, and they are **equal** to the decimals of the _underlying asset_.
- SY decimals equal to the decimals of the _yield token_.
- Pendle LP decimals is always 18, regardless of the underlying asset's decimals.

A reminder that the _underlying asset_ can be obtained using the function `SY.assetInfo()`, while the _yield token_ can be obtained using the function `SY.yieldToken()`.

## Scaled18 SY

As mentioned in the previous section, PT, YT and SY decimals are based on the underlying asset's decimals. However, for assets with small decimals (such as BTC), the margin for rounding error can be significant when performing calculations.

To mitigate this, we introduced a _decimal-wrapping_ mechanism. For assets with decimals less than 18, we will deploy an ERC20 wrapper, both for the the underlying asset and the yield token. The wrapper will scale the asset to 18 decimals, allowing for more precise calculations.

PT, YT and SY can then be of the wrapped asset, and they will have 18 decimals.

### Convention

For assets that are wrapped to have 18 decimals:
- The function `ERC20.decimals()` will return 18.
- The function `ERC20.name()` will the original asset's name, concatenated with the suffix `scaled18`.
- The function `ERC20.symbol()` will the original asset's symbol, concatenated with the suffix `-scaled18`.
- They will have an additional function `rawToken`, returning the address of the original asset.
- One **natural unit** of the **wrapped** asset will equal to one **natural unit** of the original asset.
    - This fact can be used to convert between the **raw unit** of the wrapped asset and the original one.

$$
\begin{array}{rrcl}
&
    10^{\mathrm{decimals}}\ \mathrm{original} & = & 10^{18}\ \mathrm{wrapped} \\
\Leftrightarrow &
    1\ \mathrm{original} & = & 10^{18 - decimals}\ \mathrm{wrapped}
\end{array}
$$

For SY of such wrapped assets:
- The contract name will have the suffix `Scaled18`, indicating that it is a scaled version of the original asset.
- The `SY.assetInfo()` function will return the **wrapped** asset address.
- The `SY.yieldToken()` function will return the **wrapped** yield token address.
- Each `SY` will provide custom functionalities to obtain the original asset address. But the uniform way to obtain the original asset address is by calling the `rawToken` function on of the **wrapped** asset/yield token.
- The `wrapped` yield token can be in the list of `tokensIn` and `tokensOut` (`SY.getTokensIn()` and `SY.getTokensOut()`).
- See next section for the note on the `exchangeRate()` function.

## Conversion rates

For on-chain purposes, there are ways to get conversion rates between 2 different tokens, such as:
- `SY.exchangeRate()` -  returns the exchange rate between SY and the underlying asset.
- Using on-chain [Oracle](../Oracles/HowToIntegratePtAndLpOracle.md), the conversion rate between PT/YT/LP to SY/underlying asset can be obtained.

An important fact about the conversion rate is that the number returned by these function **do NOT** operate on the _natural unit_, but on raw unit.

:::tip

Suppose that the function `SY.exchangeRate()` returns $\mathrm{rate}$. To convert from $x$ **raw unit** SY to the underlying asset, you can use the formula: $x \cdot \mathrm{rate} / 10^{18}$. Note that $10^{18}$ is a constant.

Conversion between PT/YT/LP to SY/underlying using the oracle rate is done similarly.
:::

:::tip

If you want to convert between **natural unit**, please convert the input into **raw unit** first, and convert the result back to **natural unit** after the calculation.
:::

### scaled18 SY `exchangeRate()`

For scaled18 SY, the `exchangeRate()` function will return the exchange rate between the the SY and the **wrapped** underlying asset.

To convert scaled SY of wrapped asset to the **original** underlying asset, we can multiply the `exchangeRate()` by $10^{18 - decimals}$ to get the conversion rate.
