---
hide_table_of_contents: true
---

# SY

![SY](/img/ProtocolMechanics/sy.png "SY")

SY是一种用于封装生息代币的代币标准，实现了一种标准化的智能合约API。所有生息代币都可以封装成SY，从而为它们提供一个可建立的共同接口。SY将Pendle的收息率代币化机制开放给DeFi中的所有生息代币，创造了一个无需许可接入的生态系统。

> 例如，stETH、cDAI和yvUSDC可以被封装成SY-stETH、SY-cDAI和SY-yvUSDC，从而标准化它们的收益生成机制以获得Pendle系统支持。

由于所有SY都具有相同的机制，Pendle将SY作为与所有生息代币的主要接口进行交互。PT和YT是从SY铸造出来的，而Pendle的AMM池则进行PT与SY之间的交易。

虽然听起来复杂，但Pendle能自动将生息代币转换为SY，反之亦然。这个过程在幕后自动进行，用户体验像直接与生息代币进行交互一样，而不需要手动处理SY <－> 生息代币的转换。

虽然这个标准对Pendle有益，但我们对SY的愿景超越了我们自己的协议。SY旨在为整个DeFi中创造前所未有的可组合性，使开发人员能够在现有合约的基础上无缝地构建，而无需进行手动集成。

在[这里](https://eips.ethereum.org/EIPS/eip-5115/)了解有关SY和EIP-5115的更多信息。

## SY  封装解除器 (Unwrapper)

![SY Unwrapper](/img/ProtocolMechanics/sy-unwrapper.png "SY Unwrapper")

SY封装解除器，可在Pendle应用程序的右上角下拉菜单中找到，用户可将SY代币转换回其底层的生息代币，反之亦然。

**使用SY封装解除器:**

![SY Unwrapper Window](/img/ProtocolMechanics/sy-unwrapper-window.png "SY Unwrapper Window")

步骤1：选择 “解除封装 (Unwrap)” 或 “封装 (Wrap)” 模式

步骤2：在「输入 Input」选择要解除封装或要封装的代币

步骤3：检查汇率和输出。

步骤4：确认并批准交易。

