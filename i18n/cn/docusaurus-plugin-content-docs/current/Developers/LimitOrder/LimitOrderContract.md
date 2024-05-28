# Limit Order Contract

The Limit Order contract is where limit orders are settled, allowing orders to be generated off-chain and settled on-chain.

The Limit Order contract provides methods to support:
1. Makers canceling their orders.
2. Takers filling orders.
3. A callback function to support arbitrageurs arbitraging limit orders.

You can find the contract's implementation [here](https://github.com/pendle-finance/pendle-core-v2/tree/main/contracts/limit).

## Order Struct Definition

```sol
interface IPLimitOrderType {
    enum OrderType {
        SY_FOR_PT,
        PT_FOR_SY,
        SY_FOR_YT,
        YT_FOR_SY
    }
}

struct Order {
    uint256 salt;
    uint256 expiry;
    uint256 nonce;
    IPLimitOrderType.OrderType orderType;
    address token;
    address YT;
    address maker;
    address receiver;
    uint256 makingAmount;
    uint256 lnImpliedRate;
    uint256 failSafeRate;
    bytes permit;
}
```

You can find the contract's implementation [here](https://github.com/pendle-finance/pendle-core-v2/tree/main/contracts/limit).

## Field Explanations

- `salt`: A randomly generated number that differentiates between orders.
- `expiry`: The expiration timestamp of the order. Orders cannot be settled on-chain after this point.
- `nonce`: This field allows makers to cancel all their created orders by simply increasing the nonce. All orders with a nonce less than the current nonce will be invalid. Orders are typically created with a nonce equal to the current nonce at the time of creation.
- `orderType`: Indicates the type of trade. There are four types of limit orders:
  1. `SY_FOR_PT`: Swap SY (or another SY's token in) for PT.
  2. `PT_FOR_SY`: Swap PT for SY (or another SY's token out).
  3. `SY_FOR_YT`: Swap SY (or another SY's token in) for YT.
  4. `YT_FOR_SY`: Swap YT for SY (or another SY's token out).
- `token`: Specifies which token to use for the order. If the orderType is SY_FOR_PT or SY_FOR_YT, this is the token-in address. Otherwise, it's the token-out address.
- `YT`: The YT address for this limit order. From this address, you can derive the SY and PT addresses.
- `maker`: The address of the maker who created the order.
- `receiver`: The address of the receiver, who will get the output amount if the order is settled.
- `makingAmount`: The amount of input token used to create the order. If the orderType is SY_FOR_PT or SY_FOR_YT, the makingAmount is the SY amount. If PT_FOR_SY or YT_FOR_SY, it refers to the PT or YT amount, respectively.
- `lnImpliedRate`: The natural logarithm of the implied rate, formatted as a uint256 by multiplying by 10^18 and then rounding to an integer. You can find the actual implied APY with the formula: $exp(lnImpliedRate/10^{18}) - 1$.
- `failSafeRate`: If at the time the limit order is settled, the rate of converting input token to SY or converting from SY to output token (based on the type of order) is lower than this failSafeRate, the order will not be settled.
- `permit`: Reserved for future use.

## Method Definitions

### hashOrder

This function returns a unique hash for a given order, allowing you to get the order's status later.

```sol
function hashOrder(Order memory order) external view returns (bytes32);
```

#### Parameters:
- `order`: The order to be hashed.

#### Returns:
- The unique hash of the order.

### cancelSingle

This method cancels a specific limit order. Once canceled, the order cannot be filled or settled.

```sol
function cancelSingle(Order calldata order) external;
```

#### Parameters:
- `order`: The limit order to be canceled.

### cancelBatch

This method allows you to cancel multiple limit orders in a single transaction.

```sol
function cancelBatch(Order[] calldata orders) external;
```

#### Parameters:
- `orders`: An array of limit orders to be canceled.

### orderStatusesRaw

This method retrieves raw remaining and filled amounts for specified orders.

```sol
function orderStatusesRaw(
    bytes32[] memory orderHashes
) external view returns (uint256[] memory remainingsRaw, uint256[] memory filledAmounts);
```

#### Parameters:
- `orderHashes`: An array of hashes identifying the orders for which statuses are requested.

#### Returns:
- `remainingsRaw`: The raw remaining amounts for each order. If `remainingsRaw` is zero, the order is unknown to the contract. To distinguish between unknown orders and fully filled orders, known orders have `remainingsRaw` increased by one. For example, if an order has a real remaining of `100`, its `remainingsRaw` will be `101`. Fully filled or canceled orders will have `remainingsRaw` set to one.
- `filledAmounts`: The filled amounts for each order.

### fill

The `fill` function allows you to fill one or more limit orders. This is a key operation in a limit order system, where takers fill the orders submitted by makers. It has several parameters and returns multiple values, indicating the outcome of the fill operation.

```sol
function fill(
        FillOrderParams[] memory params,
        address receiver,
        uint256 maxTaking,
        bytes calldata optData,
        bytes calldata callback
    ) external returns (uint256 actualMaking, uint256 actualTaking, uint256 totalFee, bytes memory callbackReturn);
```

#### Parameters:
- `params`: An array of `FillOrderParams`, specifying the orders to be filled, including order data, signatures, and the amount the taker intends to fill.
- `receiver`: The address that receives the output tokens when the orders are filled, typically the taker's address.
- `maxTaking`: The maximum amount of tokens that can be taken from the taker.
- `optData`: Reserved for future use. Pass empty bytes (`'0x'`).
- `callback`: Optional callback data for executing additional logic. For most cases, you can pass empty bytes. See the callback part below for more details.

#### Returns:
- `actualMaking`: The total amount of tokens received by the taker from the fill operation.
- `actualTaking`: The total amount of tokens taken from the taker to complete the fill operation.
- `totalFee`: The total fee incurred during the fill operation.
- `callbackReturn`: Data returned from the callback function, if used.

## Callback Mechanism

The `fill` function supports a callback mechanism for executing additional logic during the filling process, making it versatile for arbitrage and other custom operations.

### Callback Interface

The callback mechanism allows additional logic to be executed during the fill operation. Here's the interface for the callback function:

```sol
interface IPLimitRouterCallback {
    function limitRouterCallback(
        uint256 actualMaking,
        uint256 actualTaking,
        uint256 totalFee,
        bytes memory data
    ) external returns (bytes memory);
}
```

#### Parameters:

- `actualMaking`: The amount of tokens received by the taker's contract from the fill operation. This amount is in SY if the orderType is `SY_FOR_PT` or `SY_FOR_YT`, in PT if it's `PT_FOR_SY`, and in YT if it's `YT_FOR_SY`.
- `actualTaking`: The amount of tokens the taker's contract must send to the limit order router to complete the fill. This amount is in SY if `PT_FOR_SY` or `YT_FOR_SY`, in PT if it's `SY_FOR_PT`, and in YT if it's `SY_FOR_YT`.
- `totalFee`: The total fee for the operation.
- `data`: Additional data provided during the `fill` operation. This corresponds to the callback parameter in the `fill` function.

#### Returns:
- `bytes`: Optional return data from the callback function.

### Callback Flow and Arbitrage Use Cases

The callback mechanism enables complex interactions and arbitrage opportunities. Here's a simplified flow for using the callback feature:

1. **Taker Contract Calls `fill`**: The `fill` function is called with the specified parameters and the callback data.
2. **Tokens Are Transferred**: The `actualMaking` amount is transferred to the receiver (typically the taker's contract).
3. **Callback Function Is Invoked**: The callback function (`limitRouterCallback`) is called with the `actualMaking`, `actualTaking`, and `totalFee` values, along with the callback parameter in `fill`.
4. **Callback Logic Executes**: The taker's contract can perform additional operations during the callback, such as arbitrage with Pendle's AMM or other limit orders. The goal is to use the `actualMaking` amount to generate more value than the `actualTaking` amount, creating a profit.
5. **Send Tokens to Complete**: The taker's contract must send back the `actualTaking` amount to ensure the fill operation completes successfully.
6. **Limit Order Contract Sends Output**: Once the taker's contract sends the required tokens, the limit order contract transfers the agreed output to the limit order receivers.

![Limit Order Callback Flow](/img/Developers/limit_order_callback_flow.png "Limit Order Callback Flow")

This flow allows for flexible and creative use of the `fill` function, providing opportunities for arbitrage and custom contract logic. Arbitrageurs can take advantage of this mechanism to execute strategies that generate profit by finding discrepancies in token values or other