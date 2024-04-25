# Limit Order `fill` Callback Mechanism

### Function signature
```sol
function fill(
    FillOrderParams[] memory params,
    address receiver,
    uint256 maxTaking,
    bytes calldata optData,
    bytes calldata callback
) external returns (uint256 actualMaking, uint256 actualTaking, uint256 totalFee, bytes memory callbackReturn);
```

The `fill` function is a core component in a limit order contract, enabling takers to fill orders by transferring tokens. It supports a callback mechanism for executing additional logic during the filling process, making it versatile for arbitrage and other custom operations.

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

##### Parameters:

`actualMaking`: The amount of tokens received by the taker's contract from the fill operation. This amount is in SY if the orderType is `SY_FOR_PT` or `SY_FOR_YT`, in PT if it's `PT_FOR_SY`, and in YT if it's `YT_FOR_SY`.
`actualTaking`: The amount of tokens the taker's contract must send to the limit order router to complete the fill. This amount is in SY if `PT_FOR_SY` or `YT_FOR_SY`, in PT if it's `SY_FOR_PT`, and in YT if it's `SY_FOR_YT`.
`totalFee`: The total fee for the operation.
`data`: Additional data provided during the `fill` operation. This corresponds to the callback parameter in the `fill` function.

##### Returns:
`bytes`: Optional return data from the callback function.


### Callback Flow and Arbitrage Use Cases

The callback mechanism enables complex interactions and arbitrage opportunities. Here's a typical flow for using the callback feature:

1. Taker Contract Calls `fill`: The `fill` function is called with the specified parameters and the callback data.
2. Tokens Are Transferred: The `actualMaking` amount is transferred to the receiver (typically the taker's contract). 
3. Callback Function Is Invoked: the callback function (`limitRouterCallback`) is called with the actualMaking, actualTaking, and totalFee values, along with the callback parameter in fill.
4. Callback Logic Executes: The taker's contract can perform additional operations during the callback, such as arbitrage with Pendle's AMM or other limit orders. The goal is to use the actualMaking amount to generate more value than the actualTaking amount, creating a profit.
5. Send Tokens to Complete: The taker's contract must send back the actualTaking amount to ensure the fill operation completes successfully.
  
This flow allows for flexible and creative use of the fill function, providing opportunities for arbitrage and custom contract logic. Arbitrageurs can take advantage of this mechanism to execute strategies that generate profit by finding discrepancies in token values or other market inefficiencies.

### Off-chain calculate for `actualMaking` and `actualTaking`

To generate the callback data for custom logic in `limitRouterCallback`, you may need to calculate the actualMaking and actualTaking values off-chain before filling orders.

Use the API mentioned in [Fill a limit order](./Taker/FillALimitOrder.md). The backend API response includes `netToTaker` and `netFromTaker`, which are estimated `actualMaking` and `actualTaking` for the callback function.

Due to the potential time lag between backend calculation and transaction execution, it's recommended to buffer down the off-chain calculated `actualMaking` and buffer up the off-chain calculated `actualTaking` to ensure the transaction doesn't revert. A typical buffer of 0.1% for both should be enough.
