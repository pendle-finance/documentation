---
hide_table_of_contents: true
---

# Mint & Redeem Simulation Functions

These functions come from the `IPActionMintRedeemStatic` facet. They simulate every mint and redeem operation supported by the live Router, plus two view helpers for reading the current PY index.

---

## SY Mint / Redeem

### mintSyFromTokenStatic

Simulates minting SY from an input token.

```solidity
function mintSyFromTokenStatic(address SY, address tokenIn, uint256 netTokenIn)
    external
    view
    returns (uint256 netSyOut)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| SY | `address` | SY contract address |
| tokenIn | `address` | Input token address |
| netTokenIn | `uint256` | Exact token amount to mint with |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netSyOut | `uint256` | SY received |

---

### getAmountTokenToMintSy

Inverse of `mintSyFromTokenStatic` — returns how many tokens are required to mint a target amount of SY.

```solidity
function getAmountTokenToMintSy(address SY, address tokenIn, uint256 netSyOut)
    external
    view
    returns (uint256 netTokenIn)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| SY | `address` | SY contract address |
| tokenIn | `address` | Input token address |
| netSyOut | `uint256` | Target SY amount to receive |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netTokenIn | `uint256` | Token amount required to mint `netSyOut` SY |

**Use Case**
Useful for constructing "exact SY out" flows — e.g. when you need a precise SY amount before adding dual-sided liquidity.

---

### redeemSyToTokenStatic

Simulates redeeming SY for an output token.

```solidity
function redeemSyToTokenStatic(address SY, address tokenOut, uint256 netSyIn)
    external
    view
    returns (uint256 netTokenOut)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| SY | `address` | SY contract address |
| tokenOut | `address` | Desired output token address |
| netSyIn | `uint256` | SY amount to redeem |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netTokenOut | `uint256` | Token received |

---

## PY Mint / Redeem

### mintPyFromSyStatic

Simulates minting PT and YT from SY.

```solidity
function mintPyFromSyStatic(address YT, uint256 netSyToMint)
    external
    view
    returns (uint256 netPYOut)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| YT | `address` | YT contract address |
| netSyToMint | `uint256` | SY amount to mint from |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netPYOut | `uint256` | PT and YT received (equal amounts of each) |

---

### mintPyFromTokenStatic

Simulates minting PT and YT directly from an input token (token → SY → PT+YT).

```solidity
function mintPyFromTokenStatic(address YT, address tokenIn, uint256 netTokenIn)
    external
    view
    returns (uint256 netPyOut)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| YT | `address` | YT contract address |
| tokenIn | `address` | Input token address |
| netTokenIn | `uint256` | Token amount to mint from |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netPyOut | `uint256` | PT and YT received |

---

### redeemPyToSyStatic

Simulates redeeming PT and YT back to SY. Equal amounts of PT and YT must be provided.

```solidity
function redeemPyToSyStatic(address YT, uint256 netPYToRedeem)
    external
    view
    returns (uint256 netSyOut)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| YT | `address` | YT contract address |
| netPYToRedeem | `uint256` | Amount of PT (and YT) to redeem |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netSyOut | `uint256` | SY received |

---

### redeemPyToTokenStatic

Simulates redeeming PT and YT directly to an output token (PT+YT → SY → token).

```solidity
function redeemPyToTokenStatic(address YT, uint256 netPYToRedeem, address tokenOut)
    external
    view
    returns (uint256 netTokenOut)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| YT | `address` | YT contract address |
| netPYToRedeem | `uint256` | Amount of PT (and YT) to redeem |
| tokenOut | `address` | Desired output token address |

**Return Values**

| Name | Type | Description |
|------|------|-------------|
| netTokenOut | `uint256` | Token received |

---

## PY Index Views

The PY index is the exchange rate between SY and PT/YT. It is used internally to price minting and redemption. These helpers let you read it without triggering a state-write (unlike the real `pyIndexCurrent` which may update the index on-chain).

### pyIndexCurrentViewMarket

Returns the current PY index for a market without writing state.

```solidity
function pyIndexCurrentViewMarket(address market) external view returns (uint256)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| market | `address` | Pendle market address |

**Return Values**

| Type | Description |
|------|-------------|
| `uint256` | Current PY index (18 decimals) |

---

### pyIndexCurrentViewYt

Returns the current PY index for a given YT without writing state.

```solidity
function pyIndexCurrentViewYt(address yt) external view returns (uint256)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| yt | `address` | YT contract address |

**Return Values**

| Type | Description |
|------|-------------|
| `uint256` | Current PY index (18 decimals) |

**Use Case**
Use either index view to manually calculate the SY ↔ PT/YT conversion rate. For example, `netSyOut = netPYToRedeem * pyIndex / 1e18`.

---

## Examples

:::tip Recommended: Use the Pendle API
The examples below show direct RouterStatic usage. For most integrations, the [Pendle Hosted SDK / API](../../../Backend/HostedSdk) is the better choice — it handles approximation, limit-order filling, and zap routing automatically.
:::

### Mint PT & YT from token — simulate then execute

```typescript
const tokenIn  = WSTETH_ADDRESS;
const amountIn = ethers.parseEther("1");

// 1. Simulate
const netPyOut = await routerStatic.mintPyFromTokenStatic(YT_ADDRESS, tokenIn, amountIn);

console.log(`Expected PT+YT out: ${ethers.formatEther(netPyOut)} each`);

// 2. Execute
await IERC20(tokenIn).approve(ROUTER_ADDRESS, amountIn);
await router.mintPyFromToken(
    signer.address,
    YT_ADDRESS,
    (netPyOut * 995n) / 1000n,  // minPyOut (0.5% slippage)
    createTokenInputStruct(tokenIn, amountIn)
);
```

### Redeem PT & YT to token — simulate then execute

```typescript
const tokenOut = WSTETH_ADDRESS;
const pyAmount = ethers.parseEther("1");

// 1. Simulate
const netTokenOut = await routerStatic.redeemPyToTokenStatic(YT_ADDRESS, pyAmount, tokenOut);

console.log(`Expected token out: ${ethers.formatEther(netTokenOut)}`);

// 2. Execute (both PT and YT must be approved in equal amounts)
await IERC20(PT_ADDRESS).approve(ROUTER_ADDRESS, pyAmount);
await IERC20(YT_ADDRESS).approve(ROUTER_ADDRESS, pyAmount);
await router.redeemPyToToken(
    signer.address,
    YT_ADDRESS,
    pyAmount,
    createTokenOutputStruct(tokenOut, (netTokenOut * 995n) / 1000n)
);
```

### Determine how much token to spend for a target SY amount

Use `getAmountTokenToMintSy` when you have a downstream requirement for a fixed SY quantity (e.g. dual-asset liquidity add).

```typescript
const targetSyOut = ethers.parseEther("1.5");

// 1. How many tokens do I need?
const netTokenIn = await routerStatic.getAmountTokenToMintSy(SY_ADDRESS, WSTETH_ADDRESS, targetSyOut);

console.log(`Need ${ethers.formatEther(netTokenIn)} wstETH to mint ${ethers.formatEther(targetSyOut)} SY`);

// Sanity-check by simulating the forward direction
const syOutCheck = await routerStatic.mintSyFromTokenStatic(SY_ADDRESS, WSTETH_ADDRESS, netTokenIn);
console.log(`Forward check: ${ethers.formatEther(syOutCheck)} SY`); // should ≈ targetSyOut

// 2. Execute
await IERC20(WSTETH_ADDRESS).approve(ROUTER_ADDRESS, netTokenIn);
await router.mintSyFromToken(
    signer.address,
    SY_ADDRESS,
    (targetSyOut * 995n) / 1000n,           // minSyOut
    createTokenInputStruct(WSTETH_ADDRESS, netTokenIn)
);
```

### Use pyIndex to value a PT/YT position

```typescript
// Read current PY index (no state write)
const pyIndex = await routerStatic.pyIndexCurrentViewMarket(MARKET_ADDRESS);
// pyIndex is an 18-decimal exchange rate: 1 SY = pyIndex PY units

// Value 100 PT in SY terms
const ptBalance = ethers.parseEther("100");
const syValue = (ptBalance * ethers.parseEther("1")) / pyIndex;
console.log(`100 PT ≈ ${ethers.formatEther(syValue)} SY at current index`);
```
