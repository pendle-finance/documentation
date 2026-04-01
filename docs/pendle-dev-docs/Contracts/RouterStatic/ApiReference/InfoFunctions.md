---
hide_table_of_contents: true
---

# User & Position Info Functions

These functions come from the `IPActionInfoStatic` facet and return position-level information for a given user. They are non-pure (they trigger a reward index update internally) but are entirely read-only from the caller's perspective — call them with `eth_call`.

---

## getPY

Resolves either a PT or YT address to the canonical pair.

```solidity
function getPY(address py) external view returns (address pt, address yt)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| py | `address` | Address of either the PT or YT token |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| pt | `address` | Principal Token address |
| yt | `address` | Yield Token address |

**Use Case**
Useful when you have one token of the pair and need both addresses to call other functions.

---

## getTokensInOut

Returns the lists of tokens that can be used as input or output for a given SY, PT/YT, or Market address.

```solidity
function getTokensInOut(address token)
    external
    view
    returns (address[] memory tokensIn, address[] memory tokensOut)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| token | `address` | Address of an SY, PT, YT, or Market contract |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| tokensIn | `address[]` | Tokens accepted as input (for minting / swapping in) |
| tokensOut | `address[]` | Tokens accepted as output (for redeeming / swapping out) |

**Use Case**
Use to populate token-selection UI or to validate that a given token is supported before building a swap.

---

## getUserSYInfo

Returns a user's SY balance and unclaimed SY rewards.

```solidity
function getUserSYInfo(address sy, address user)
    external
    returns (UserSYInfo memory res)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| sy | `address` | SY contract address |
| user | `address` | User wallet address |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| res | [`UserSYInfo`](../RouterStaticOverview#usersyinfo) | SY balance + unclaimed rewards |

**Use Case**
Use before calling `claimRewards` to preview how much the user will receive, or to display reward accrual in a dashboard.

---

## getUserPYInfo

Returns a user's PT balance, YT balance, unclaimed accrued interest, and unclaimed rewards.

```solidity
function getUserPYInfo(address py, address user)
    external
    returns (UserPYInfo memory res)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| py | `address` | PT or YT address (both are resolved to the same pair) |
| user | `address` | User wallet address |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| res | [`UserPYInfo`](../RouterStaticOverview#userpyinfo) | PT/YT balances, unclaimed interest, and unclaimed rewards |

**Use Case**
Use to show users their outstanding interest and reward positions, or to preflight a `redeemDueInterestAndRewards` call.

---

## getUserMarketInfo

Returns a user's LP balance and the equivalent PT and SY values, plus any unclaimed LP rewards.

```solidity
function getUserMarketInfo(address market, address user)
    external
    returns (UserMarketInfo memory res)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |
| user | `address` | User wallet address |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| res | [`UserMarketInfo`](../RouterStaticOverview#usermarketinfo) | LP balance, underlying PT + SY value, and unclaimed rewards |

**Use Case**
Use to display a user's liquidity position, including the breakdown of assets locked in LP and any pending reward claims.

---

## Examples

:::tip Recommended: Use the Pendle API
The examples below show direct RouterStatic usage. For most integrations, the [Pendle Hosted SDK / API](../../../Backend/HostedSdk) is the better choice — it handles approximation, limit-order filling, and zap routing automatically.
:::

### Resolve a PT/YT address and get supported tokens

```typescript
// You only have one token from the pair — get both
const [ptAddress, ytAddress] = await routerStatic.getPY(knownPtOrYtAddress);

// Find out what tokens are accepted for swapping/minting
const [tokensIn, tokensOut] = await routerStatic.getTokensInOut(MARKET_ADDRESS);
console.log("Accepted input tokens:", tokensIn);
console.log("Accepted output tokens:", tokensOut);
```

### Display a user's full Pendle position

```typescript
const [syInfo, pyInfo, marketInfo] = await Promise.all([
    routerStatic.getUserSYInfo(SY_ADDRESS, userAddress),
    routerStatic.getUserPYInfo(YT_ADDRESS, userAddress),
    routerStatic.getUserMarketInfo(MARKET_ADDRESS, userAddress),
]);

console.log("--- SY Position ---");
console.log(`SY balance: ${ethers.formatEther(syInfo.syBalance.amount)}`);
for (const r of syInfo.unclaimedRewards) {
    console.log(`  Reward ${r.token}: ${ethers.formatEther(r.amount)}`);
}

console.log("--- PY Position ---");
console.log(`PT balance: ${ethers.formatEther(pyInfo.ptBalance.amount)}`);
console.log(`YT balance: ${ethers.formatEther(pyInfo.ytBalance.amount)}`);
console.log(`Unclaimed interest: ${ethers.formatEther(pyInfo.unclaimedInterest.amount)} (${pyInfo.unclaimedInterest.token})`);
for (const r of pyInfo.unclaimedRewards) {
    console.log(`  Reward ${r.token}: ${ethers.formatEther(r.amount)}`);
}

console.log("--- LP Position ---");
console.log(`LP balance: ${ethers.formatEther(marketInfo.lpBalance.amount)}`);
console.log(`PT value in LP: ${ethers.formatEther(marketInfo.ptBalance.amount)}`);
console.log(`SY value in LP: ${ethers.formatEther(marketInfo.syBalance.amount)}`);
for (const r of marketInfo.unclaimedRewards) {
    console.log(`  Reward ${r.token}: ${ethers.formatEther(r.amount)}`);
}
```

### Preview pending rewards before deciding to claim

```typescript
const marketInfo = await routerStatic.getUserMarketInfo(MARKET_ADDRESS, userAddress);
const pyInfo     = await routerStatic.getUserPYInfo(YT_ADDRESS, userAddress);

const allRewards = [...marketInfo.unclaimedRewards, ...pyInfo.unclaimedRewards];
const totalRewardUsd = await estimateRewardValueUsd(allRewards); // your price feed

console.log(`Total claimable rewards ≈ $${totalRewardUsd.toFixed(2)}`);

if (totalRewardUsd > MIN_CLAIM_USD) {
    await router.redeemDueInterestAndRewards(
        userAddress,
        [],               // SY addresses to claim from
        [YT_ADDRESS],     // YT addresses to claim interest + rewards from
        [MARKET_ADDRESS]  // markets to claim LP rewards from
    );
}
```
