---
hide_table_of_contents: true
---

# StandardizedYield (SY)

**Contract:** [`IStandardizedYield`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/interfaces/IStandardizedYield.sol)

## Overview

StandardizedYield (SY) is Pendle's **adapter layer** for heterogeneous yield-bearing tokens. Every yield source integrated into Pendle — whether it's Aave aTokens, Lido wstETH, or GMX GLP — is wrapped into an SY contract that exposes a uniform interface for depositing, redeeming, querying exchange rates, and claiming rewards.

SY is the foundational token of the Pendle system. All other Pendle primitives build on top of it:

- **PT and YT** are minted by splitting SY (see [YieldTokenization](../YieldTokenization/YieldTokenization))
- **PendleMarket** trades PT against SY
- **PYLpOracle** prices PT, YT, and LP in SY or asset terms

Integrators interact with SY when wrapping/unwrapping yield tokens, querying supported deposit/withdrawal tokens, reading exchange rates for pricing, or claiming external protocol rewards.

## Core Concepts

### Exchange Rate Model

Every SY has an **exchange rate** that represents how much of the underlying asset one unit of SY is worth:

```
value_in_asset = amountSY × exchangeRate / 1e18
```

For appreciating yield tokens (e.g. wstETH, sDAI), the exchange rate increases over time as yield accrues. A 2× increase in exchange rate means 1 SY is now worth double the underlying asset.

The exchange rate is central to:
- **PT/YT pricing** — PT converges to `1 / exchangeRate` at expiry
- **Oracle rates** — `PYLpOracle` uses this to convert between SY and asset denominations
- **Reward share accounting** — YT reward shares are calculated using the SY exchange rate

### Asset Info and Pricing

`assetInfo()` returns metadata about what asset the SY appreciates against:

```solidity
(AssetType assetType, address assetAddress, uint8 assetDecimals) = sy.assetInfo();
```

| Field | Description |
|-------|-------------|
| `assetType` | `0` = TOKEN, `1` = LIQUIDITY |
| `assetAddress` | The reference asset the SY appreciates against. May not exist on the current chain (e.g. stETH address on Ethereum returned for SY-wstETH on Arbitrum). |
| `assetDecimals` | Decimal precision of the asset |

:::note
The asset address is a **best estimation** — it aims to enable rough on-chain valuation. For many SYs, a true 1:1 asset doesn't exist or isn't on the same chain.
:::

## Functions

### Mint / Redeem

#### `deposit`

Wraps `tokenIn` into SY and sends the minted shares to `receiver`.

```solidity
function deposit(
    address receiver,
    address tokenIn,
    uint256 amountTokenToDeposit,
    uint256 minSharesOut
) external payable returns (uint256 amountSharesOut);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `receiver` | `address` | Address to receive the minted SY |
| `tokenIn` | `address` | Token to deposit (must be in `getTokensIn()`) |
| `amountTokenToDeposit` | `uint256` | Amount of `tokenIn` to deposit |
| `minSharesOut` | `uint256` | Minimum SY to mint (reverts if output is less) |

**Returns:** `amountSharesOut` — the amount of SY minted.

:::note Minting quirks
SY wraps the underlying yield protocol, so minting/redeeming behavior varies by protocol:
- **GLP**: Caps on certain tokens (ETH, USDC) are frequently reached, preventing their use despite being listed in `getTokensIn()`
- **ankrBNB**: Minimum mint of 0.1 BNB — smaller amounts revert. Redemption may fail if the quick-withdrawal pool lacks liquidity
- **wstETH**: ETH is in `getTokensIn()` (stake ETH → wstETH), but not in `getTokensOut()` (no direct unstake)

The most reliable deposit token is the protocol's yield token itself, but hardcoding this is not recommended — always check `getTokensIn()`.
:::

#### `redeem`

Burns SY shares and sends the underlying `tokenOut` to `receiver`.

```solidity
function redeem(
    address receiver,
    uint256 amountSharesToRedeem,
    address tokenOut,
    uint256 minTokenOut,
    bool burnFromInternalBalance
) external returns (uint256 amountTokenOut);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `receiver` | `address` | Address to receive the redeemed tokens |
| `amountSharesToRedeem` | `uint256` | Amount of SY to burn |
| `tokenOut` | `address` | Token to receive (must be in `getTokensOut()`) |
| `minTokenOut` | `uint256` | Minimum output amount (reverts if less) |
| `burnFromInternalBalance` | `bool` | If `true`, burns from SY transferred to the contract; if `false`, burns from `msg.sender`'s balance |

**Returns:** `amountTokenOut` — the amount of `tokenOut` received.

#### `previewDeposit`

Estimates the amount of SY that would be minted for a given deposit. Best-effort approximation — **not audited for on-chain use**.

```solidity
function previewDeposit(
    address tokenIn,
    uint256 amountTokenToDeposit
) external view returns (uint256 amountSharesOut);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `tokenIn` | `address` | Token to deposit |
| `amountTokenToDeposit` | `uint256` | Amount to deposit |

#### `previewRedeem`

Estimates the amount of `tokenOut` received for burning a given amount of SY. Best-effort approximation — **not audited for on-chain use**.

```solidity
function previewRedeem(
    address tokenOut,
    uint256 amountSharesToRedeem
) external view returns (uint256 amountTokenOut);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `tokenOut` | `address` | Token to receive |
| `amountSharesToRedeem` | `uint256` | Amount of SY to burn |

:::warning Preview functions — off-chain only
The underlying protocols often lack explicit preview functions. SY's `previewDeposit` and `previewRedeem` are best-effort approximations by the Pendle team. While verified through testing, they are **not audited** and should not be relied upon on-chain. Use them via `eth_call` / `staticCall` for off-chain estimation only.
:::

### Token Discovery

#### `getTokensIn`

Returns all tokens that can be used to mint this SY.

```solidity
function getTokensIn() external view returns (address[] memory res);
```

#### `getTokensOut`

Returns all tokens that can be received when redeeming this SY.

```solidity
function getTokensOut() external view returns (address[] memory res);
```

### Exchange Rate and Asset Info

#### `exchangeRate`

Returns the current exchange rate: how much asset 1 SY is worth (scaled by `1e18`).

```solidity
function exchangeRate() external view returns (uint256 res);
```

#### `assetInfo`

Returns the asset type, address, and decimals that the SY appreciates against.

```solidity
function assetInfo()
    external
    view
    returns (AssetType assetType, address assetAddress, uint8 assetDecimals);
```

See [Core Concepts — Asset Info and Pricing](#asset-info-and-pricing) above for field descriptions.

### Rewards

#### `claimRewards`

Claims all accrued external protocol rewards for `user` and transfers them.

```solidity
function claimRewards(address user) external returns (uint256[] memory rewardAmounts);
```

#### `accruedRewards`

Returns the currently credited reward amounts for `user` **without** triggering a state update. To get the latest results, simulate `claimRewards(user)` via `eth_call` or `staticCall`.

```solidity
function accruedRewards(address user) external view returns (uint256[] memory rewardAmounts);
```

:::note
`accruedRewards` only reflects rewards credited as of the last on-chain interaction. It does **not** include rewards pending since the last block update. For accurate off-chain reads, simulate `claimRewards` instead.
:::

### Extended: `pricingInfo()`

```solidity
function pricingInfo() external view returns (address refToken, bool refStrictlyEqual);
```

This optional function (defined in `IStandardizedYieldExtended`) describes the recommended pricing method for this SY:

| Return Value | Description |
|--------------|-------------|
| `refToken` | The reference token to use when pricing this SY |
| `refStrictlyEqual` | Whether `1 natural unit of SY == 1 natural unit of refToken` |

**How to use for pricing PT & YT:**
- `refStrictlyEqual = true`: use `PYLpOracle.get{Token}ToSyRate()` and multiply by `refToken`'s price. _Note: SY and refToken may have different decimals — see [Unit and Decimals](../UnitAndDecimals)._
- `refStrictlyEqual = false`: use `PYLpOracle.get{Token}ToAssetRate()` and multiply by `refToken`'s price.

Not all SYs implement `pricingInfo()`. Two common cases where it is overridden:

**Rebasing yield tokens** — Rebasing tokens (e.g. stETH, stHYPE) adjust holder balances on every rebase, so the SY's `exchangeRate` does not track 1:1 with the yield token in raw-unit terms. In this case `refStrictlyEqual = false`.

```solidity
// PendleStakedHYPESY — yieldToken = stHYPE (rebasing)
function pricingInfo() external view override returns (address refToken, bool refStrictlyEqual) {
    return (yieldToken, false);
}
```

**Scaled18 SY** — For assets with fewer than 18 decimals (e.g. LBTC at 8 decimals), Pendle deploys a decimal-wrapping contract and a corresponding `Scaled18` SY. Because 1 natural unit of the SY equals 1 natural unit of the original token, `refStrictlyEqual = true`.

```solidity
// PendleLBTCBaseSYScaled18
address public constant LBTC = 0xecAc9C5F704e954931349Da37F60E39f515c11c1;

function pricingInfo() external pure returns (address refToken, bool refStrictlyEqual) {
    return (LBTC, true);  // original LBTC (8 decimals), not the scaled18 wrapper
}
```

:::tip
If you're building a money market or lending protocol, check whether the SY implements `pricingInfo()` before choosing your oracle path. Contact the Pendle team for discussion when integrating a new token type.
:::

## Pricing Guide

When pricing PT/YT/LP positions, the choice between `getPtToSy` and `getPtToAsset` depends on the SY type.

### Standard SYs

Most SYs are a 1:1 wrap of the yield token. **Value PT/YT/LP by yield token** (`getPtToSy` / `getLpToSy`). If not possible, value by asset but account for the withdrawal risk from yield token to asset (`getPtToAsset` / `getLpToAsset`).

| Market          | Recommended way to get price | Unit of price | yieldToken of SY (1-1 wrap) | Note                             | Asset of SY                      |
| --------------- | ---------------------------- | ------------- | --------------------------- | -------------------------------- | -------------------------------- |
| LBTC            | getPtToSy                    | LBTC          | LBTC                        | -                                | BTC staked on  Lombard           |
| sUSDe           | getPtToSy                    | sUSDe         | sUSDe                       | -                                | USDe                             |
| USDe            | getPtToSy                    | USDe          | USDe                        | -                                | USDe                             |
| eBTC            | getPtToSy                    | eBTC          | eBTC                        | -                                | eBTC (constant exchange rate)    |
| USD0++          | getPtToSy                    | USD0++        | USD0++                      | -                                | USD0++ (constant exchange rate)  |
| sENA            | getPtToSy                    | sENA          | sENA                        | -                                | ENA staked on Ethena             |
| SolvBTC.BBN     | getPtToSy                    | SolvBTC.BBN   | SolvBTC.BBN                 | -                                | BTC staked on Solv               |
| PumpBTC         | getPtToSy                    | PumpBTC       | PumpBTC                     | -                                | BTC staked on Pump               |
| weETH           | getPtToSy                    | weETH         | weETH                       | -                                | eETH                             |
| weETHs          | getPtToSy                    | weETHs        | weETHs                      | limited liquidity to market sell | weETHs (constant exchange rate)  |
| weETHk          | getPtToSy                    | weETHk        | weETHk                      | limited liquidity to market sell | weETHk (constant exchange rate)  |
| weETH (Karak)   | getPtToSy                    | weETH (Karak) | weETHk (Karak)              | can't market sell                | eETH                             |
| pufETH          | getPtToSy                    | pufETH        | pufETH                      | -                                | ETH staked on Puffer             |
| pzETH           | getPtToSy                    | pzETH         | pzETH                       | limited liquidity to market sell | pzETH (constant exchange rate)   |
| wstETH          | getPtToSy                    | wstETH        | wstETH                      | -                                | stETH                            |
| GLP             | getPtToSy                    | GLP           | GLP                         | -                                | GLP                              |
| MUXLP           | getPtToSy                    | MUXLP         | MUXLP                       | can't market sell                | MUXLP                            |
| HLP             | getPtToSy                    | HLP           | HLP                         | can't market sell                | HLP                              |
| ezETH           | getPtToSy                    | ezETH         | ezETH                       | -                                | ETH staked on Renzo              |
| rETH            | getPtToSy                    | rETH          | rETH                        | -                                | ETH staked on Rocket             |
| ezETH (Zircuit) | getPtToSy                    | ezETH         | ezETH                       | -                                | ETH staked on Renzo then Zircuit |
| uniETH          | getPtToSy                    | uniETH        | uniETH                      | -                                | ETH staked on Bedrock            |
| rswETH          | getPtToSy                    | rswETH        | rswETH                      | -                                | ETH staked on Swell              |
| rswETH Swell L2 | getPtToSy                    | rswETH        | rswETH                      | -                                | ETH staked on Swell              |
| swETH           | getPtToSy                    | swETH         | swETH                       | -                                | ETH staked on Swell              |
| ETHx            | getPtToSy                    | ETHx          | ETHx                        | -                                | ETH staked on Stadler            |
| rsETH           | getPtToSy                    | rsETH         | rsETH                       | -                                | ETH staked on Kelp               |
| sDAI            | **getPtToAsset**             | DAI           | sDAI                        | -                                | DAI                              |
| crvUSD Silo     | **getPtToAsset**             | crvUSD        | scrvUSD                     | -                                | crvUSD                           |
| gDAI            | **getPtToAsset**             | DAI           | gDAI                        | can't market sell                | DAI staked in Gains              |

**Notes on Assets of SYs:**
- All Liquid Staking Tokens (LRTs) except for weETH have assets listed as "ETH staked in xyz." This is different from ETH, as it takes 7 days or more to withdraw, and these staked ETH are subject to slashing if it occurs. As a result, LRT always trades at a slight depeg compared to the amount of ETH withdrawable from it. Hence, it's not safe to value these markets directly in ETH (which would not account for this depeg). Always value these in the original LRT form.
- sDAI, scrvUSD, and gDAI tokens are not tradable, so they must be valued directly in their underlying asset. Similar to LRT, valuing them directly in the underlying asset will skip the protocol's risk of not being able to withdraw from yieldToken to Asset. Please keep that in mind!
- All in all, it's safe to value tokens in yieldToken, whereas valuing them in assets carries additional conversion risk that you should be aware of.

### Non-standard SYs

Other SYs that are not 1-1 wrap of yieldToken:

| Market  | Recommended way to get price | Unit of price | yieldToken of SY (NOT 1-1 Wrap) | Asset of SY |
| ------- | ---------------------------- | ------------- | ------------------------------- | ----------- |
| aUSDT   | getPtToAsset                 | USDT          | -                               | USDT        |
| aUSDC   | getPtToAsset                 | USDC          | -                               | USDC        |
| ePENDLE | getPtToAsset                 | ePENDLE       | -                               | ePENDLE     |
| mPENDLE | getPtToAsset                 | mPENDLE       | -                               | mPENDLE     |

For aUSDT and aUSDC, similar considerations apply as for sDAI, scrvUSD, and gDAI. Value them directly in their underlying asset.

## FAQ

### What does `exchangeRate()` represent?

It returns the amount of the underlying asset that 1 SY is worth, scaled by `1e18`. For example, if `exchangeRate()` returns `1.05e18`, then 1 SY = 1.05 units of the asset. The rate increases over time as yield accrues.

### Why can't I always deposit with any token listed in `getTokensIn()`?

`getTokensIn()` lists tokens that the SY *can* accept, but the underlying protocol may have dynamic constraints — capacity caps (GLP), minimum amounts (ankrBNB), or liquidity limits — that cause deposits to revert at any given time. Always handle reverts gracefully.

### How do I price PT/YT if my SY is non-standard?

For non-standard SYs (not a 1:1 wrap of the yield token), use `getPtToAsset` / `getLpToAsset` instead of the SY-denominated variants. Check the [Pricing Guide](#pricing-guide) tables above. If the SY implements `pricingInfo()`, follow the `refStrictlyEqual` flag to choose the correct oracle path.

### Should I use `getPtToSy` or `getPtToAsset`?

Prefer `getPtToSy` for maximum trustlessness — the PT→SY rate is natively guaranteed by the Pendle AMM. Use `getPtToAsset` only when your protocol explicitly needs asset-denominated pricing and you understand the additional SY→asset conversion risk (exchange rate dependency, potential depegs). See [PYLpOracle](../Oracle/PYLpOracle) for details.

## Further Reading

- [CommonSY](./CommonSY) — deployed SY addresses per chain
- [DecimalsWrapper](./DecimalsWrapper) — how Pendle handles tokens with non-18 decimals
- [Unit and Decimals](../UnitAndDecimals) — decimal handling across PT, YT, SY, and asset
- [YieldTokenization](../YieldTokenization/YieldTokenization) — how SY is split into PT and YT
- [PYLpOracle](../Oracle/PYLpOracle) — TWAP oracle for pricing PT, YT, and LP
- [Rewards](../LiquidityMining/Rewards) — full reward accounting model for SY, YT, and LP holders
