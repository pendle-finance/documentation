---
pagination_label: "将 API 与钱包接入"
title: "将 API 与钱包接入"
---

import Hint from '@site/src/components/Hint';

# 将 API 与钱包接入

打开 [http://localhost:6688](http://localhost:6688)，在你的设备上加载 Arbitrage with CrossEx。

接入分为两部分：**Gate API key**，让应用可以通过 CrossEx 交易永续腿；以及 **Boros 钱包**，让应用可以交易并追踪利率腿。你可以先完成前者并立即开始对冲永续腿——但只有两者都完成，才能在应用内运行完整的四腿仓位。

## 1. Gate API key

点击页首右侧的设置齿轮图标打开设置窗口，然后在 **Replace credentials（更换凭证）** 下输入你的 Gate **API key** 和 **API secret**。

![Settings panel](/boros-docs/imgs/arbitrage-with-crossex/settings-panel.png "Settings panel")

保存前，应用会通过一次只读的实时调用向 Gate 验证你的密钥。你的密钥和 secret 仅保存在你自己的机器上，位于 `~/.boros-crossex/config/.env`（macOS）或 `%LOCALAPPDATA%\CrossEx-Boros\config\.env`（Windows）——除了签名后发往 Gate 官方 API 的请求外，不会发往任何其他地方。

## 2. 追踪 Boros 地址（Tracked Boros address）

同样在设置中，将持有你 Boros 腿的 EVM 地址粘贴到 **Tracked Boros address** 一栏，然后点击 **Track**。

这是只读的：终端会将你的 Boros 仓位与 Gate 永续腿匹配起来，使 Positions 标签页能够展示锁定利率以及扣除全部成本后的回报。若不填写，应用仍可开仓并对冲永续腿，但只能看到交易的一半。

## 3. Boros 代理密钥（Agent key）

若要直接从终端下达 Boros 订单，请将订单面板切换到 **Boros rates** 标签页，并接入一个**委托代理密钥（delegated agent key）**。

![Boros rates ticket](/boros-docs/imgs/arbitrage-with-crossex/boros-rates-ticket.png "Boros rates ticket")

代理密钥用于签署你的 Boros 订单。接入后，该标签页会显示 **trading enabled** 标识、代理地址，以及授权到期日期。点击 **Remove key** 可撤销该密钥。

<Hint style="info">
委托代理密钥可以交易该账户，但**无法存入或提取资金**——资金划转始终需要你本人的钱包。这与 Boros 官方前端所使用的代理密钥机制相同。
</Hint>

当 API key、追踪地址和代理密钥全部设置完成后，你就可以开始交易了。

下一步：[开仓](./opening-a-position)
