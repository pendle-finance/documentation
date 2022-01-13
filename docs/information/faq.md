---
sidebar_position: 2
---

# FAQ

## General

### What are the fees for using Pendle?

There are two different fees on Pendle:

* Forge Fees: 3% of the interest accrued from YT will be directed to the Pendle Treasury;
* Swap Fees: The AMM charges a 1% swap fee on trades. 0.85% is distributed to LPs and 0.15% to the treasury.

These numbers are adjustable by governance.

### Will new underlyings and/or pairs be added in the future? 

We are working hard to integrate widely-used yield-bearing platforms in the DeFi ecosystem. While this decision will eventually be passed on to community governance, there are considerations that should be taken into account during decision-making. These considerations will be elaborated on in the future.


## Contract Expiry

### What happens to YT and OT after contract expiry?

YT will no longer accrue interest and its value will be 0. Holders of expired OTs can redeem the underlying, or roll the contract forward and receive OT and YT with the new expiry.

### What happens to the liquidity pool after contract expiry?

LPs will be able to withdraw their expired YT and USDC from the liquidity pool. Selling expired YT to the liquidity pool will not yield any USDC. 

### Can I set up a pool to trade YT on other AMMs like Uniswap or Sushiswap?

As YT is ERC-20 compliant, it is technically possible to set up a pool on other AMMs. However, on top of the usual market risk impermanent loss, the LP will also suffer time-dependent impermanent loss. As such, it is not advisable to set up a pool to trade YT on other AMMs.

### Can I redeem the underlying before contract expiry?

Yes. As long as you hold an equal amount of OT and YT, you’ll be able to redeem the underlying.

### What happens to the accrued interest if left unclaimed after the contract has expired?

The interest will be held in the contract until you claim it.


## Interest Accrual (Yield Accrual)

### What is interest accrual?

YT represents the right to future yield. Interest/yield will be accrued over time, and holders of YT will be able to claim this accrued interest on the dashboard.

### Will I be entitled to the accrued interest on YT after LP-ing to the Pendle market?

Yes. Those who provide liquidity with YT pairs are still entitled to the accrued interest on the deposited YT. Additionally, they are entitled to the swap fees generated through liquidity provision. The accrued interest can be claimed at the Dashboard page.

### How are liquidity incentives from the base protocols distributed?

OT holders are entitled to these incentives. They can claim the liquidity incentives directly from the underlying protocols, such as COMP rewards from Compound and stkAAVE from Aave V2.


## Liquidity incentives

### What liquidity incentives are available on Pendle?

There are three types of incentives:

1. Liquidity provision to the YT / baseToken pools (staking of the LP token is required to be eligible for the incentives)
2. Liquidity provision to the PENDLE / ETH pool on [SushiSwap](https://app.sushi.com/add/0x808507121b80c02388fad14726482e061b8da827/ETH)
3. PENDLE token staking (auto-compounding)

### What vesting schedules apply to incentives?

Incentives accrued from LPing YT / baseToken pools have a vesting schedule of 5 epochs with a linear release (20% released at the end of each epoch).

Incentives accrued through PENDLE/ETH on Sushiswap and PENDLE single-sided staking are not vested.

### When can I collect my incentives?

You can collect them at any time via the Dashboard. Incentives never expire, and there is no time limit to collecting incentives.

### How long is an epoch?

7 days.


## Applicable concepts

### What is a token with time decay?

Tokens with time decay are tokens that decrease in value over time.

OT and YT are minted with specific expiry dates. YT represents the rights to future yield, and this yield will be actualized with time. Holders of YT can then claim this yield.

The gradual actualization of yield reduces the remaining portion of YT with time. This causes the value, and thus price, of YT to gradually decrease as the contract matures. This behavior closely resembles that of options contracts.

### What is time-dependent impermanent loss?

Time-dependent impermanent loss describes the phenomenon that occurs due to the time-decaying properties of our YT.

![Time-dependent Impermanent Loss](/img/time-dependent-impermanent-loss.png)

Impermanent loss is the difference between holding tokens in an AMM and holding them in a wallet. It occurs when the price of tokens inside an AMM diverges in any direction. The greater the divergence, the greater the impermanent loss.

As the value of YT gradually depreciates to 0, it can be described as time-decaying. Not taking into account price volatility due to market movements, there would not be any impermanent loss for the LP if the LP is to stake through the entirety of the contract duration.


## Security

### Has Pendle been audited?

Yes, Pendle smart contracts were [audited](https://github.com/pendle-finance/pendle-core/tree/master/docs/audits) by Least Authority and reviewed by independent whitehats but it’s worth noting that audits don’t eliminate risks entirely.

[Report 1](https://github.com/pendle-finance/pendle-core/blob/master/docs/audits/Least%20Authority%20-%20Pendle%20Protocol%20Smart%20Contracts%20-%20Final%20Audit%20Report%20(v3).pdf) <br />
[Report 2](https://github.com/pendle-finance/pendle-core/blob/master/docs/audits/Pendle%20Contract%20Security%20Audit.pdf) <br />
[Report 3](https://github.com/pendle-finance/pendle-core/blob/master/docs/audits/Pendle_Security_Analysis_Public_Report.pdf)


## Pausing admins

The PausingManager contract designates pausing admins capable of pausing protocol functionality. The pausing admins have only one ability, during the event of unforeseen vulnerability, the pausing admins are able to ‘pause’ the mint, swap, add and remove liquidity functions. The pausing admins cannot unpause a paused state.

Governance will have the power to:

* Assign or remove pausing admin roles;
* Unpause paused contracts;
* Trigger an Emergency mode, which will only allow users to withdraw funds from the affected contracts; and
* Remove the pausing and emergency mode feature forever.
