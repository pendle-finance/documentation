---
pagination_label: "安装"
title: "安装"
---

import Hint from '@site/src/components/Hint';

# 安装

该应用运行在你自己的机器上——支持 **macOS 或 Windows**。产品介绍见 [boros.pendle.finance/arbitrage-crossex](https://boros.pendle.finance/arbitrage-crossex)，完整说明和源代码见 GitHub：[github.com/pendle-finance/arbitrage-with-crossex](https://github.com/pendle-finance/arbitrage-with-crossex)。

<Hint style="warning">
安装脚本会下载一份私有的 Node.js 副本和应用本身——不会触碰系统上的其他任何内容，安装过程中也绝不会要求你提供交易所密钥。运行前请先阅读脚本内容，或者让 AI 帮你[审计整个仓库](https://github.com/pendle-finance/arbitrage-with-crossex#verify-this-project-yourself-with-ai)。
</Hint>

## macOS

将以下内容粘贴到 **终端（Terminal）** 应用中（Finder → 应用程序 → 实用工具 → 终端），然后按回车：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/pendle-finance/arbitrage-with-crossex/main/install.sh)"
```

安装完成后（首次可能需要几分钟），应用会在浏览器中打开 [http://localhost:6688](http://localhost:6688) —— 请收藏此地址。此后应用会一直在后台运行，即使你重启 Mac 也不例外，你还会在 `~/Applications` 文件夹中看到一个 **"Arbitrage with CrossEx"** 启动器。

所有文件都在同一个文件夹中：`~/.boros-crossex`。

## Windows

需要 **Windows 10 或 11**，以及 PowerShell 5 或更高版本（系统自带的 Windows PowerShell 即可）。按 `Win` 键，输入 `PowerShell`，打开后粘贴：

```powershell
irm https://raw.githubusercontent.com/pendle-finance/arbitrage-with-crossex/main/install.ps1 | iex
```

安装完成后，应用会在浏览器中打开 [http://localhost:6688](http://localhost:6688) —— 请收藏此地址。此后应用会在每次登录时自动启动，你还会在开始菜单中看到 **"Arbitrage with CrossEx"** 快捷方式。

所有文件都在同一个文件夹中：`%LOCALAPPDATA%\CrossEx-Boros`。

<Hint style="info">
**不要**以管理员身份运行——完全不需要。
</Hint>

## 安装脚本做了什么

- 下载一份经过校验和验证的 [Node.js](https://nodejs.org) 私有副本以及应用本身，全部放在同一个文件夹中——不会触碰系统上的其他任何内容，无需管理员密码，也不会修改 PATH。
- 注册一个后台服务，保持应用持续运行，并在崩溃或重启后自动恢复（macOS 上是标准的 **LaunchAgent**，Windows 上是按用户注册的**计划任务**）。
- 在浏览器中打开应用，并创建启动器。
- 安装过程中绝不要求提供交易所密钥——密钥是之后在应用内输入的。

## 更新

对你的平台重新运行相同的安装命令即可。脚本会先停止旧版本再安装，因此不会有旧副本残留；你的密钥和交易记录不会受到影响。当有新版本发布时，应用页眉会显示琥珀色的**更新（Update）**提示。

## 卸载

**macOS**

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/pendle-finance/arbitrage-with-crossex/main/uninstall.sh)"
```

**Windows**

```powershell
irm https://raw.githubusercontent.com/pendle-finance/arbitrage-with-crossex/main/uninstall.ps1 | iex
```

默认会保留密钥和交易记录。如需一并删除（macOS：追加 `-- --purge`，或直接 `rm -rf ~/.boros-crossex`；Windows：调用脚本块时加上 `-Purge`）。如果交易引擎仍在运行且无法停止，卸载脚本不会删除任何内容，以避免从正在下单的进程手中删掉应用。

<Hint style="warning">
交易进行期间请让机器保持开机。应用的对账循环（reconcile loop）负责在挂单腿成交后立即下达对冲腿、重新报价并重试——交易所端没有服务器端的兜底机制。如果机器休眠或关机，未对冲的一条腿会一直保持敞口，直到服务重新上线。不会丢失任何数据，应用重启后会从中断处继续——但不要在无法让机器持续运行的情况下开启交易。
</Hint>

下一步：[设置 CrossEx 与 API Key](./setup-api-key)
