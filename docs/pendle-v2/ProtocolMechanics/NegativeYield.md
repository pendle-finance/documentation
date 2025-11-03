---
hide_table_of_contents: true
---


# Understanding Negative Yield Risk on Interest-Bearing Tokens (IBT)

Interest-bearing tokens (IBTs) typically increase in value over time as they accrue rewards and yield. This leads to a rising [exchange rate](./Glossary#exchange-rate) between the IBT and its accounting asset. For example, 1 sUSDe (IBT) can be exchanged for more USDe over time.

However, in scenarios where yield turns negative, the IBT’s value may decline instead. This can impact both PT and YT performance, especially if the exchange rate falls.

## What is the Watermark Rate?

The [Watermark Rate](./Glossary#watermark-rate) is the highest recorded exchange rate between the IBT and its accounting asset. In prolonged periods of negative yield, the Exchange Rate may fall below this level.

When this happens:

- **PT** will redeem below its actual value at maturity, leading to potential losses. For example, 1 PT-RLP (USDC) is expected to be redeemed for 1 USDC at maturity in normal conditions. However, when the Exchange Rate falls below the Watermark Rate, PT-RLP will redeem for less than 1 USDC at maturity.
- **YT** will stop earning yield until the Exchange Rate recovers to the Watermark Rate

![Watermark Chart](/img/ProtocolMechanics/watermark_chart.png "Watermark Chart")

You can track the Watermark Rate and current Exchange Rate by switching to the **Watermark Rate** view on any asset’s market page.

The Watermark Rate can become artificially elevated due to factors such as oracle mispricing or temporary spikes in the IBT’s share price. When this occurs, a new inflated Watermark Rate is recorded and remains in effect even after the Exchange Rate normalizes to reflect the asset’s true value. During this period, the pool may appear to be generating negative yield until the Exchange Rate catches up with the inflated Watermark Rate.
