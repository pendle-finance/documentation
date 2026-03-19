---
hide_table_of_contents: true
---

# MerkleDistributor

`PendleMultiTokenMerkleDistributor` distributes off-chain computed rewards (e.g. PENDLE voter incentives, partner point rewards) to users via a Merkle tree. The protocol owner periodically updates the Merkle root with a new snapshot of cumulative accruals per `(token, user)` pair. Users prove their entitlement on-chain and receive the delta since their last claim.

---

## How It Works

Off-chain, the protocol computes a cumulative total accrued amount for every `(token, user)` pair and commits it into a Merkle tree. The root of that tree is stored on-chain.

To claim, a user provides:
- The list of reward tokens
- Their cumulative `totalAccrued` amount per token (as computed off-chain)
- A Merkle proof for each `(token, user, totalAccrued)` leaf

The contract verifies the proof, then transfers `totalAccrued - claimed[token][user]` to the receiver and records the new `claimed` amount. Because accruals are **cumulative**, claiming multiple times is safe — each call only pays out the delta.

---

## Storage

| Mapping | Description |
|---------|-------------|
| `merkleRoot` | The current Merkle root committing all `(token, user, totalAccrued)` entries. Updated by the owner on each reward cycle. |
| `claimed[token][user]` | Cumulative amount already transferred out to `user` for `token`. |
| `verified[token][user]` | Cumulative amount verified (proof checked) but not yet claimed, used by `claimVerified`. |

---

## Functions

### `claim`

Verifies proofs and transfers the unclaimed delta for each token to `receiver` in one transaction.

```solidity
uint256[] memory amountOuts = distributor.claim(
    receiver,
    tokens,
    totalAccrueds,
    proofs
);
```

- `msg.sender` is the user whose accruals are being claimed
- `receiver` can differ from `msg.sender` (useful for smart contract wallets)
- `amountOuts[i] = totalAccrueds[i] - claimed[tokens[i]][user]`
- Reverts with `InvalidMerkleProof` if any proof is invalid

### `verify`

Validates proofs and records the verified amounts without transferring tokens. Allows a third party (e.g. a relayer) to pre-verify a user's entitlement so the user can later call `claimVerified` without needing to supply proofs again.

```solidity
uint256[] memory amountClaimable = distributor.verify(
    user,
    tokens,
    totalAccrueds,
    proofs
);
```

- Sets `verified[token][user] = totalAccrued` for each token
- Does **not** transfer any tokens

### `claimVerified`

Transfers all previously verified but unclaimed amounts to `receiver`. No proof required — relies on a prior `verify` call.

```solidity
uint256[] memory amountOuts = distributor.claimVerified(receiver, tokens);
```

- `amountOuts[i] = verified[tokens[i]][user] - claimed[tokens[i]][user]`
- No-ops silently for tokens where nothing new has been verified

### `merkleRoot`

Returns the current Merkle root.

### `claimed`

Returns the total amount already paid out to `user` for `token`.

### `verified`

Returns the total amount verified (but not necessarily claimed) for `user` for `token`.

---

## Owner Functions

### `setMerkleRoot`

Updates the Merkle root. Called by the owner at the start of each new reward cycle after computing off-chain accruals.

```solidity
distributor.setMerkleRoot(newMerkleRoot);
```

---

## Off-Chain Claim Flow

```
Off-chain:
  1. Protocol computes cumulative totalAccrued per (token, user)
  2. Builds Merkle tree from leaves: keccak256(token, user, totalAccrued)
  3. Owner calls setMerkleRoot(root)

On-chain (user):
  4. Fetch totalAccrued and proof from API
  5. Call claim(receiver, tokens, totalAccrueds, proofs)
     → contract verifies proof, pays out delta, updates claimed[]
```

### Example

```typescript
import { ethers } from "ethers";

const distributor = new ethers.Contract(DISTRIBUTOR_ADDRESS, DISTRIBUTOR_ABI, signer);

// Fetch from Pendle API: totalAccrueds and proofs per token for msg.sender
const { tokens, totalAccrueds, proofs } = await fetchMerkleData(userAddress);

const tx = await distributor.claim(
    userAddress,   // receiver
    tokens,
    totalAccrueds,
    proofs
);
await tx.wait();
```
