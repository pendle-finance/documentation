---
hide_table_of_contents: true
---

# MerkleDistributor

**Contract:** [`PendleMultiTokenMerkleDistributor`](https://github.com/pendle-finance/pendle-core-v2-public/blob/main/contracts/LiquidityMining/PendleMultiTokenMerkleDistributor.sol)

## Overview

`PendleMultiTokenMerkleDistributor` distributes off-chain computed rewards (e.g. PENDLE voter incentives, partner point rewards) to users via a Merkle tree. The protocol owner periodically updates the Merkle root with a new snapshot of cumulative accruals per `(token, user)` pair. Users prove their entitlement on-chain and receive the delta since their last claim.

## When to Use This

- **Claiming voter incentives or partner point rewards** — these are computed off-chain and distributed through this contract
- **Building a claim UI** — fetch Merkle proofs from the Pendle API and submit them via `claim`
- **Relayer / gasless claim flows** — use `verify` + `claimVerified` to separate proof validation from token transfer

:::tip Use on-chain claim functions for LP/YT rewards
This contract is only for **off-chain computed rewards**. For on-chain rewards:
- **LP holders** → call `redeemRewards(user)` on [PendleMarket](../PendleMarket/PendleMarket)
- **YT holders** → call `redeemDueInterestAndRewards(user, false, true)` on PendleYieldToken (see [YieldTokenization](../YieldTokenization/YieldTokenization))
- **SY holders** → call `claimRewards(user)` on the SY contract (see [Rewards](./Rewards))

See [Rewards](./Rewards) for the full reward taxonomy.
:::

## Core Concepts

### How the Merkle Tree Works

Off-chain, the protocol computes a **cumulative** total accrued amount for every `(token, user)` pair and commits it into a Merkle tree. The root is stored on-chain.

To claim, a user provides:
- The list of reward tokens
- Their cumulative `totalAccrued` amount per token (as computed off-chain)
- A Merkle proof for each `(token, user, totalAccrued)` leaf

The contract verifies the proof, then transfers `totalAccrued - claimed[token][user]` to the receiver and records the new `claimed` amount. Because accruals are **cumulative**, claiming multiple times is safe — each call only pays out the delta.

### Storage

| Mapping | Description |
|---------|-------------|
| `merkleRoot` | The current Merkle root committing all `(token, user, totalAccrued)` entries. Updated by the owner on each reward cycle. |
| `claimed[token][user]` | Cumulative amount already transferred out to `user` for `token`. |
| `verified[token][user]` | Cumulative amount verified (proof checked) but not yet claimed, used by `claimVerified`. |

### Where to Get Merkle Proofs

Merkle proofs and `totalAccrued` values are available from the Pendle API. Query the API with the user's address to get the proof data needed for the `claim` call. See the [BFF API](../../Backend/ApiOverview#bff-api--httpsapi-v2pendlefinancebff) for endpoint details.

## Functions

### `claim`

Verifies proofs and transfers the unclaimed delta for each token to `receiver` in one transaction.

```solidity
function claim(
    address receiver,
    address[] calldata tokens,
    uint256[] calldata totalAccrueds,
    bytes32[][] calldata proofs
) external returns (uint256[] memory amountOuts);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `receiver` | `address` | Address to receive the claimed tokens (can differ from `msg.sender`) |
| `tokens` | `address[]` | Reward token addresses to claim |
| `totalAccrueds` | `uint256[]` | Cumulative accrued amount per token (from the Merkle tree) |
| `proofs` | `bytes32[][]` | Merkle proof per token |

| Return Value | Type | Description |
|--------------|------|-------------|
| `amountOuts` | `uint256[]` | Actual amount transferred per token (`totalAccrueds[i] - claimed[tokens[i]][msg.sender]`) |

- `msg.sender` is the user whose accruals are being claimed
- `receiver` can differ from `msg.sender` (useful for smart contract wallets)
- Reverts with `InvalidMerkleProof` if any proof is invalid

### `verify`

Validates proofs and records the verified amounts **without transferring tokens**. Allows a third party (e.g. a relayer) to pre-verify a user's entitlement so the user can later call `claimVerified` without needing to supply proofs again.

```solidity
function verify(
    address user,
    address[] calldata tokens,
    uint256[] calldata totalAccrueds,
    bytes32[][] calldata proofs
) external returns (uint256[] memory amountClaimable);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `user` | `address` | The user whose entitlements to verify |
| `tokens` | `address[]` | Reward token addresses |
| `totalAccrueds` | `uint256[]` | Cumulative accrued amounts |
| `proofs` | `bytes32[][]` | Merkle proofs |

| Return Value | Type | Description |
|--------------|------|-------------|
| `amountClaimable` | `uint256[]` | Amount claimable per token after verification |

Sets `verified[token][user] = totalAccrued` for each token. Does **not** transfer any tokens.

### `claimVerified`

Transfers all previously verified but unclaimed amounts to `receiver`. No proof required — relies on a prior `verify` call.

```solidity
function claimVerified(
    address receiver,
    address[] calldata tokens
) external returns (uint256[] memory amountOuts);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `receiver` | `address` | Address to receive the claimed tokens |
| `tokens` | `address[]` | Reward token addresses to claim |

| Return Value | Type | Description |
|--------------|------|-------------|
| `amountOuts` | `uint256[]` | Actual amount transferred per token (`verified[tokens[i]][msg.sender] - claimed[tokens[i]][msg.sender]`) |

No-ops silently for tokens where nothing new has been verified.

### `merkleRoot`

Returns the current Merkle root.

```solidity
function merkleRoot() external view returns (bytes32);
```

### `claimed`

Returns the total amount already paid out to `user` for `token`.

```solidity
function claimed(address token, address user) external view returns (uint256);
```

### `verified`

Returns the total amount verified (but not necessarily claimed) for `user` for `token`.

```solidity
function verified(address token, address user) external view returns (uint256);
```

### `setMerkleRoot`

Updates the Merkle root. Called by the owner at the start of each new reward cycle after computing off-chain accruals.

```solidity
function setMerkleRoot(bytes32 newMerkleRoot) external;
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `newMerkleRoot` | `bytes32` | New Merkle root committing updated cumulative accruals |

## Integration Examples

:::danger Example code only
The snippets below are simplified for illustration and **are not audited**.
**Do not** use them in production or with real funds. If you adapt any example,
conduct a full review, add comprehensive tests, and obtain an independent **security audit**.
:::

### Claiming rewards via the Pendle API

```typescript
import { ethers } from "ethers";

const distributor = new ethers.Contract(DISTRIBUTOR_ADDRESS, DISTRIBUTOR_ABI, signer);

// Step 1: Fetch totalAccrueds and proofs from the Pendle API
const { tokens, totalAccrueds, proofs } = await fetchMerkleData(userAddress);

// Step 2: Submit the claim transaction
const tx = await distributor.claim(
    userAddress,   // receiver
    tokens,
    totalAccrueds,
    proofs
);
await tx.wait();
```

### Off-chain claim flow diagram

```
Off-chain:
  1. Protocol computes cumulative totalAccrued per (token, user)
  2. Builds Merkle tree from leaves: keccak256(token, user, totalAccrued)
  3. Owner calls setMerkleRoot(root)

On-chain (user):
  4. Fetch totalAccrued and proof from Pendle API
  5. Call claim(receiver, tokens, totalAccrueds, proofs)
     → contract verifies proof, pays out delta, updates claimed[]
```

### Relayer flow (verify + claimVerified)

```typescript
// Step 1: Relayer pre-verifies on behalf of user (no tokens transferred)
const verifyTx = await distributor.verify(
    userAddress,
    tokens,
    totalAccrueds,
    proofs
);
await verifyTx.wait();

// Step 2: User claims later without needing proofs
const claimTx = await distributor.connect(userSigner).claimVerified(
    userAddress,   // receiver
    tokens
);
await claimTx.wait();
```

## FAQ

### Can I claim for another user?

No. `msg.sender` is always the user whose accruals are claimed. However, you can set a different `receiver` to send the tokens to another address. For gasless flows, use the `verify` + `claimVerified` pattern: a relayer calls `verify(user, ...)`, then the user calls `claimVerified` themselves.

### What happens if I claim twice?

Nothing bad. Because accruals are **cumulative**, calling `claim` again with the same `totalAccrued` results in `amountOut = 0` (the delta is zero). If a new Merkle root has been published with a higher `totalAccrued`, you receive only the new delta.

### What's the difference between `claim` and `verify` + `claimVerified`?

`claim` verifies proofs and transfers tokens in one step. The two-step flow (`verify` then `claimVerified`) is useful when a third party (relayer) submits proofs on behalf of users, but the users themselves should trigger the token transfer. `claimVerified` requires no proofs — it relies on the previously stored `verified` amounts.

## Further Reading

- [Rewards](./Rewards) — full taxonomy of Pendle rewards (SY-native, PENDLE incentives, off-chain)
- [GaugeController](./GaugeController) — on-chain PENDLE incentive distribution to markets
- [MiscFunctions — redeemDueInterestAndRewards](../PendleRouter/ApiReference/MiscFunctions#redeemdueinterestandrewards) — batch claiming via Router
