import Hint from '@site/src/components/Hint';

# Installation

The app runs on your own machine — **macOS or Windows**. See [boros.pendle.finance/arbitrage-crossex](https://boros.pendle.finance/arbitrage-crossex) for an overview, or GitHub for full instructions and source: [github.com/pendle-finance/arbitrage-with-crossex](https://github.com/pendle-finance/arbitrage-with-crossex).

<Hint style="warning">
The installer downloads a private copy of Node.js and the app — it does not touch anything else on your system, and never asks for your exchange keys during install. Read the script before running it, or have an AI [audit the repo for you](https://github.com/pendle-finance/arbitrage-with-crossex#verify-this-project-yourself-with-ai) first.
</Hint>

## macOS

Paste this into the **Terminal** app (Finder → Applications → Utilities → Terminal) and press Return:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/pendle-finance/arbitrage-with-crossex/main/install.sh)"
```

When it finishes (a few minutes the first time), the app opens in your browser at [http://localhost:6688](http://localhost:6688) — bookmark it. From then on, the app runs in the background even after you restart your Mac, and you'll find an **"Arbitrage with CrossEx"** launcher in your `~/Applications` folder.

Everything lands in one folder: `~/.boros-crossex`.

## Windows

Requires **Windows 10 or 11**, and PowerShell 5 or newer (the built-in Windows PowerShell is fine). Press `Win`, type `PowerShell`, open it, then paste:

```powershell
irm https://raw.githubusercontent.com/pendle-finance/arbitrage-with-crossex/main/install.ps1 | iex
```

When it finishes, the app opens in your browser at [http://localhost:6688](http://localhost:6688) — bookmark it. The app starts on its own every time you sign in, and you'll find an **"Arbitrage with CrossEx"** shortcut in your Start Menu.

Everything lands in one folder: `%LOCALAPPDATA%\CrossEx-Boros`.

<Hint style="info">
Do **not** run this from an Administrator prompt — it doesn't need one.
</Hint>

## What the installer does

- Downloads a private, checksum-verified copy of [Node.js](https://nodejs.org) and the app into a single folder — nothing else on your system is touched, no admin password, no PATH changes.
- Registers a background service that keeps the app running and restarts it after crashes or reboots (a **LaunchAgent** on macOS, a per-user **Scheduled Task** on Windows).
- Opens the app in your browser and creates the launcher.
- Never asks for exchange keys during install — those are entered later, in the app itself.

## Updating

Re-run the same install command for your platform. It stops the previous version first, so an old copy never lingers; your keys and trade history are untouched. When a new version is published, the app shows an amber **Update** pill in the header.

## Uninstalling

**macOS**

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/pendle-finance/arbitrage-with-crossex/main/uninstall.sh)"
```

**Windows**

```powershell
irm https://raw.githubusercontent.com/pendle-finance/arbitrage-with-crossex/main/uninstall.ps1 | iex
```

Keys and trade history are kept by default. To remove everything (macOS: append `-- --purge`, or `rm -rf ~/.boros-crossex`; Windows: add `-Purge` when invoking the script block). If the trading engine is still running and can't be stopped, the uninstaller removes nothing rather than deleting the app out from under a live process.

<Hint style="warning">
Leave the machine on while a trade is open. The app's reconcile loop is what places the hedge leg once a maker order fills, requotes, and retries — there is no server-side backstop on the exchange. If the machine sleeps or shuts down mid-trade, a half-filled leg stays unhedged until the server is back up. Nothing is lost, the app picks up exactly where it left off on restart — but don't start a trade you can't leave the machine running for.
</Hint>

Next: [Setting up CrossEx & API Key](./setup-api-key)
