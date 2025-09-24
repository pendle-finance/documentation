---
hide_table_of_contents: true
---

# Choosing Linear Discount Parameters

In this documentation, we provide a Desmos graphic that let you fill in
parameters to help visualizing and choosing a good linear discount rate for the
linear discount oracle.

Desmos link: https://www.desmos.com/calculator/xmtoxy6lkt

The Desmos link contains the example for the [USDe 25 SEP 2025 market].

- PT linear discount rate can be chosen to be $18\%$.
- LP linear discount rate can be chosen to be $7\%$.

See this in the Desmos graphic by changing $r_{discount}$ in the corresponding folder.

## Parameters

### Market internal state

The Desmos graphic requires some internal state of the Pendle market. The following notebook can be used to get the market’s internal state: https://colab.research.google.com/drive/1CKltGGLWrdUoCVRpV1U9ZV2BqjMkN_OE?usp=sharing

For example, if the chosen market is [USDe 25 SEP 2025 market], the parameters can be obtained like the image on the left, and be filled as the image on the right.

| Running the notebook | Filling the parameters in Desmos |
|----------------------|----------------------------------|
| ![Params notebook](/img/Oracles/ChoosingLinearDiscountParams/params-notebook.png) | ![Params Desmos](/img/Oracles/ChoosingLinearDiscountParams/params-desmos.png) |

### Market yield range

These parameters are opinionated. Please choose a yield range that you think the market will be trading in until maturity. The lower the $\text{rateMax}$, the less underprice the oracle will be, and the more capital efficient for the users.

Pendle Market also allows trading within a pre-determined yield range. If you are not sure about the yield range, use this.

This yield range can be obtained from the Pendle DApp UI:

| Click the spec button | Getting the yield range |
|------------------------|----------------------------------|
| ![image.png](/img/Oracles/ChoosingLinearDiscountParams/ui-market-specs.png) | ![image.png](/img/Oracles/ChoosingLinearDiscountParams/ui-market-yield-range.png) |

And filled it as the following:

![image.png](/img/Oracles/ChoosingLinearDiscountParams/yield-range-desmos.png)

## Choosing between PT linear oracle and LP linear oracle

The Desmos graphic can help visualize both linear discount. The corresponding graphic can be toggled by clicking the corresponding folder

<video src="/img/Oracles/ChoosingLinearDiscountParams/desmos-toggle.webm" controls autoplay loop width="100%" />

### Choosing the linear discount rate

In both graphic:

- **The blue** lines are the maximum and minimum price of PT/LP (the price range).
- **The orange** line is the current price of PT/LP until maturity if there is no trade occurred.
- **The red** line is the discounted price of PT/LP with your discount rate.

Change $r_{discount}$ to adjust the discounted price (the **red line**) and see its relation between the price range and the current price.

### Base price (or the matured price)

For PT, since it can be redeem to asset 1:1 at maturity, the base price of PT is 1.

For LP, the base price is calculated in the Desmos graphic. It can be found in the *LP linear discount* Desmos folder:

![image.png](/img/Oracles/ChoosingLinearDiscountParams/lp-base-price-desmos.png)

### Recommendation

$r_{discount}$ should be set so that the price is *sub-optimal* compare to the market price at all the time until maturity. Therefore:

- The **discounted price** line should be below the **current price**.
- The closer the **discounted price** line to the **current price**, the riskier.
- Setting $r_{discount}$ so that the **discounted price** line is **under** the **lower price** line can make sure that the oracle price is always underpriced.

### Reference

- https://forum.sky.money/t/june-26-2025-proposed-changes-to-spark-for-upcoming-spell/26663 — Spark write up on linear discount rate for PT-syrupUSDC-28Aug2025, PT-USDe-25Sept2025, LP-USDS-14Aug2025.
- https://www.desmos.com/calculator/n7wfzslz8l — Desmos graphic for single trade on Pendle Market.

[USDe 25 SEP 2025 market]: https://app.pendle.finance/trade/markets/0x6d98a2b6cdbf44939362a3e99793339ba2016af4/swap?view=yt&chain=ethereum
