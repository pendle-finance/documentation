---
pagination_label: "设置 CrossEx 与 API Key"
title: "设置 CrossEx 与 API Key"
---

import Hint from '@site/src/components/Hint';

# 设置 CrossEx 与 API Key

## 1. 开启 CrossEx

如果还没有 Gate 账户，先在 [gate.com](https://www.gate.com/signup) 注册，然后在 [gate.com/crossex](https://www.gate.com/crossex) 开启 **CrossEx** 功能。这一步必须先完成，之后才能设置下方的 API 权限，也才能将资金划转到你的 CrossEx 账户。

## 2. 创建 API Key

前往 Gate 账户设置中的 [API Management](https://www.gate.com/myaccount/api_key_manage)，创建一个 **APIv4** 密钥。

- **账户类型：** 选择 **Trading account（交易账户）**。
- **权限：** 仅勾选 **Cross-Exchange**，设置为 **Read and Write（读写）**。
- **提现权限：** 保持**关闭**。交易机器人不需要提现权限，关闭后应用完全无法从你的账户转出资金。
- **IP 权限：** 选择 **"Later"（稍后设置）**，除非你的机器有固定 IP——如果有，绑定 IP 可以增加一层保护。家庭网络的 IP 通常会变化（例如路由器重启后），届时密钥会失效，需要重新绑定。

![API Trading Account](/boros-docs/imgs/arbitrage-with-crossex/api-trading-account.png "API Trading Account")

![API Key Read and Write](/boros-docs/imgs/arbitrage-with-crossex/api-key-read-write.png "API Key Read and Write")

<Hint style="warning">
请立即妥善保存 API key 和 API secret key —— 这是你唯一能看到 secret 的机会。
</Hint>

下一步：[将 API 与钱包接入](./connecting-terminal)
