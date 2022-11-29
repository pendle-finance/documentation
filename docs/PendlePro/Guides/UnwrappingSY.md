---
hide_table_of_contents: true
---

# Unwrapping SY

At the moment, the interface at https://app.pendle.finance does not support the unwrapping of SY back to underlying at launch. This feature is still being developed and will be launched at a later date.

For now, you can unwrap your SY to the underlying yield-bearing asset using Etherscan:

1. Visit the specific SY you'd want to unwrap on Etherscan.

|             SY             |                                                              Etherscan Link                                                              |
| :------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: |
|          SY-stETH          |        [`0xcbC72d92b2dc8187414F6734718563898740C0BC`](https://etherscan.io/address/0xcbC72d92b2dc8187414F6734718563898740C0BC#F7)        |
| SY-FRAXUSDC CurveLP Convex |        [`0xD393D1dDd6B8811A86D925F5E14014282581bC04`](https://etherscan.io/address/0xD393D1dDd6B8811A86D925F5E14014282581bC04#F7)        |
|      SY-LOOKS Staking      | [`0x35C16314D6Ee4753289E5cC15A5C5E1Dd4eaD345`](https://etherscan.io/address/0x35C16314D6Ee4753289E5cC15A5C5E1Dd4eaD345#writeContract#F7) |

2. Make sure you have approved the SY token contract to burn the SY shares from your address. On the **Write Contract* tab in Etherscan, navigate to Function #1, `approve (0x095ea7b3)`.

![Approve](/img/pendlepro/etherscan_approve.png "Approve")

For `spender,` enter the same SY contract address, e.g. `0xcbC72d92b2dc8187414F6734718563898740C0BC` if you are doing `SY-stETH`.

For `amount`, enter a very large number such as `1000000000000000000000000000000000`, which is the allowance you allow for the SY contract to spend from your address.

3. On the **Write Contract** tab in Etherscan, navigate to Function #7, `redeem (0x769f8e5d)`.

![Redeem](/img/pendlepro/etherscan_redeem.png "Redeem")

Enter the required details for each parameter in the function:

|            Function            |                                                             Description                                                              |                  Example                   |
| :----------------------------: | :----------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------: |
|       receiver (address)       |                                 The address receiving the unwrapped underlying (e.g. your address).                                  | 0x1FcCC097db89A86Bfc474A1028F93958295b1Fb7 |
| amountSharesToRedeem (uint256)** |                     The amount of SY tokens you'd want to redeem scaled to the decimals of the underlying token.                     |             91057522291602163              |
|       tokenOut (address)***       |               *The exit token you'd want to get back. The supported tokens are found in the `getTokensOut()` function.                | 0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84 |
|     minTokenOut (uint256)      | The minimum amount of token out you'd expect to receive back. This specifies the slippage. Input 0 if you don't care about slippage. |                     0                      |
| burnFromInternalBalance (bool) |                                                         Set this to `false`.                                                         |                   false                    |

Here's a [sample tx](https://etherscan.io/tx/0x19360b2571f45cd41619f28cf38ab018f575edd009332da1cd9eef7776c3f0ef).

NOTE: 

** To get `amountSharesToRedeem`, you can visit the `Read Contract` tab of the SY contract, look for Function #5, `balanceOf`, and enter your address. The amount that it returns is the total SY balance you are holding. Enter this amount to `amountSharesToRedeem` in the write tab to redeem the entire SY balance.

*** To find an eligible `tokenOut` address, visit the `Read Contract` tab of the SY contract, and look for Function #10, `getTokensOut`. The addresses that it returns in the list are the only valid addresses you can enter when redeeming. e.g. for SY-steETH, the valid `tokenOut` addresses are `0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84` (stETH), `0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0` (wstETH).

4. Click the **Write** button to submit a transaction to the blockchain!
