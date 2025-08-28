# MarketHub View Functions

### `getEnteredMarkets()`

```solidity
MarketAcc userAccount = AccountLib.toMainCross(userAddress, tokenId);
MarketId[] memory markets = marketHub.getEnteredMarkets(userAccount);
```

### `hasEnteredMarketBefore()`

Returns whether the account has entered the specified market before. This is used to determine if the account needs to pay a market entrance fee. When entering a market for the first time, users pay a one-time entrance fee that goes to the protocol treasury. Subsequent entries to the same market don't incur this fee.

```solidity
MarketAcc userAccount = AccountLib.toCross(userAddress, tokenId);
MarketId marketId = MarketId.wrap(2);

bool hasEnteredBefore = marketHub.hasEnteredMarketBefore(userAccount, marketId);
```

### `tokenIdToAddress()`

```solidity
TokenId btcTokenId = TokenId.wrap(1);
address btcAddress = marketHub.tokenIdToAddress(btcTokenId);
```

### `marketIdToAddress()`

```solidity
MarketId btcMarketId = MarketId.wrap(456);
address btcMarketAddress = marketHub.marketIdToAddress(marketId);
```

### `tokenData()`

Returns the token configuration data for the specified token ID. The `TokenData` struct contains:

- `token`: The ERC20 token contract address
- `scalingFactor`: Used to normalize token decimals to 18-decimal precision for internal calculations. Calculated as `10^(18 - tokenDecimals)` during token registration

```solidity
TokenId btcTokenId = TokenId.wrap(1);
TokenData memory data = marketHub.tokenData(tokenId);
```

## Cash and Balance Functions

### `accCash()`

Returns the account's cash balance in scaled units. The cash balance can be negative, which represents upfront borrowing (borrowed funds that need to be repaid).

**Important caveats:**

- Similar to `NoSettle` functions in Market contracts, this returns unsettled data that may be outdated
- Due to Boros's [lazy settlement](../Mechanics/Settlement.md) mechanism, positions and cash balances are only updated when users interact with the protocol
- To get up-to-date cash balance, you must settle first using `settleAllAndGet()` or trigger settlement through other interactions

```solidity
// Check cross-margin cash balance
MarketAcc crossAccount = AccountLib.toMainCross(userAddress, tokenId);
int256 crossCash = marketHub.accCash(crossAccount);
```

### `getCashFeeData()`

Returns fee configuration and treasury data for the specified token.

```solidity
TokenId tokenId = TokenId.wrap(1);
CashFeeData memory feeData = marketHub.getCashFeeData(tokenId);

uint128 treasuryCash = feeData.treasuryCash;          // Protocol treasury balance
uint128 entranceFee = feeData.marketEntranceFee;      // Fee to enter markets
uint128 minCashCross = feeData.minCashCross;          // Min cash for cross-margin
uint128 minCashIsolated = feeData.minCashIsolated;    // Min cash for isolated
```

### `getUserWithdrawalStatus()`

Returns the user's pending withdrawal status.

**Important caveats:**

- The `amount` field (`unscaled`) is in the token's native decimal precision, not Boros's internal 18-decimal scaling
- To finalize the withdrawal, the condition `start + cooldown <= block.timestamp` must be satisfied
- Cash is deducted immediately when withdrawal is requested, but tokens are only transferred after the cooldown period

```solidity
address userAddress = 0x123...;
TokenId tokenId = TokenId.wrap(1);

Withdrawal memory withdrawal = marketHub.getUserWithdrawalStatus(userAddress, tokenId);

uint32 startTime = withdrawal.start;      // Withdrawal request timestamp
uint224 amount = withdrawal.unscaled;     // Unscaled withdrawal amount

if (amount) {
    uint32 cooldown = marketHub.getPersonalCooldown(userAddress);
    uint32 finalizationTime = startTime + cooldown;

    if (block.timestamp >= finalizationTime) {
        console.log("Withdrawal ready for finalization");
        console.log("Amount: %s", amount);
    } else {
        uint32 remaining = finalizationTime - uint32(block.timestamp);
        console.log("Withdrawal pending, %s seconds remaining", remaining);
    }
} else {
    console.log("No pending withdrawal");
}
```

### `settleAllAndGet()`

```solidity
MarketAcc userAccount = AccountLib.toMainCross(userAddress, tokenId);
MarketId marketId = MarketId.wrap(123);

// Get all settlement data and margin requirements
(
    int256 totalCash,
    VMResult totalMarginData,
) = marketHub.settleAllAndGet(userAccount, GetRequest.MM, MarketIdLib.ZERO);

// Parse margin data
(int256 totalPositionValue, uint256 totalMaintenanceMargin) = totalMarginData.unpack();

console.log("Total value: %s", totalCash + totalPositionValue);
console.log("Total Maintenance Margin: %s", totalMaintenanceMargin);

// Calculate health ratio
int256 healthRatio = (totalCash + totalPositionValue) * 1e18 / int256(marginRequired);
console.log("Health ratio: %s", healthRatio);
```

### `simulateTransfer()`

Used for off-chain simulation only. This function allows simulating cash transfers to test scenarios like margin requirements or health ratios without affecting the actual blockchain state.

**Requirement:** This function can only be executed when faking `tx.origin = address(0)` (using `eth_call` state overrides).

```solidity
MarketAcc fromAccount = AccountLib.toMainCross(userAddress, tokenId);
int256 transferAmount = 1 ether;

marketHub.simulateTransfer(fromAccount, transferAmount);
```
