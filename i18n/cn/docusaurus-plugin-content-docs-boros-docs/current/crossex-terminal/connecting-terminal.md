---
pagination_label: "将 API 与钱包接入终端"
title: "将 API 与钱包接入终端"
---

# 将 API 与钱包接入终端

打开 [http://localhost:6688](http://localhost:6688)，在你的设备上加载 CrossEx-Boros Terminal。

点击主页右侧的设置齿轮图标，打开设置窗口，然后输入：

- 你的 Gate **API key** 和 **API secret**
- 你的 **Boros 钱包地址**，以便在面板中追踪你的 Boros 仓位

![API Key Settings](/boros-docs/imgs/crossex-terminal/api-key-settings.png "API Key Settings")

保存前，应用会通过一次只读的实时调用来验证你的密钥是否有效。你的密钥和 secret 仅保存在你自己的机器上，位于 `~/.boros-crossex/config/.env`（macOS）或 `%LOCALAPPDATA%\CrossEx-Boros\config\.env`（Windows）——除了签名后发往 Gate 官方 API 的请求外，不会发往任何其他地方。

完成 API 密钥和 Boros 钱包的接入后，你就可以开始交易了。

下一步：[开仓](./opening-a-position)
