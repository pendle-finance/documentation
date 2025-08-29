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

## Risks of yield going negative

All markets on Pendle carry some risk of yields turning negative. The most common risks include:
- Insolvency Risk:  If the underlying protocol becomes insolvent, the underlying asset may depeg, causing PTs to lose value.
- Operational Risk: The underlying protocol may experience operational or security mishaps, resulting in misdistribution of yield and/or capital loss
- Vault Risk: Yields from vault assets depend on the underlying protocol’s performance. Extreme market conditions may reduce yields or turn them negative.

In addition to these general risks, certain protocols may present higher risks due to their design or yield-bearing mechanics. Any protocol-specific risks will be detailed in the Market Info section of each market.
