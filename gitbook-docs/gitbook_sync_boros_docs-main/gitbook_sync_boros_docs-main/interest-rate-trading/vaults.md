# Vaults

Each YU pair on Boros has a corresponding **vault**, which provides an additional source of liquidity on top of the order book. When a trader places a market order, it can be matched with either the order book or the vault—effectively making the vault a counterparty to open positions, earning fees and PENDLE incentives.

> Boros' vault mechanism is advanced and is out of scope for most users. For those curious to dive deeper, you can read our whitepaper \[here] (\<link coming soon>).

### Risks

Boros vaults behave similarly to a **Uniswap V2 LP position** of “long YU” and “collateral”. This means vault depositors are effectively taking a **long-biased position on YU**, which benefits from high or rising implied APRs.

However, if the implied APR declines after you have deposited, your vault position may suffer **impermanent loss (IL)** —especially if it was opened at a high APR level.

Before depositing, consider the **current implied APR**. A high implied APR may result in a high historical vault performance, but could also make your entry more vulnerable to drawdowns and IL.

### Yields

Vaults generate returns through:

* **PENDLE incentives**
* **Swap fees from market order flow**
* **Favorable Implied APR movements**, which increase the value of your vault position.

{% hint style="danger" %}
Opening a Boros vault position is similar in risk profile to going **long YU**. If the implied APR drops after you enter, you may experience impermanent loss, which will be **realized when you exit** the vault.
{% endhint %}
