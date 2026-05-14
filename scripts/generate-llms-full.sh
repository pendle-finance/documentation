#!/usr/bin/env bash
# Regenerate llms-full.txt from all Pendle V2 and Boros documentation.
# Run this before deploying the docs site to keep llms-full.txt up to date.
#
# Usage: ./scripts/generate-llms-full.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$SCRIPT_DIR/.."
PENDLE_DOCS_DIR="$REPO_DIR/docs/pendle-docs"
DEV_DOCS_DIR="$REPO_DIR/docs/pendle-dev-docs"
BOROS_DOCS_DIR="$REPO_DIR/docs/boros-docs"
BOROS_DEV_DOCS_DIR="$REPO_DIR/docs/boros-dev-docs"
OUTPUT="$REPO_DIR/static/llms-full.txt"

# Pendle V2 docs in reading order (developer-relevant content)
V2_FILES=(
  # Getting started
  "$PENDLE_DOCS_DIR/Introduction.md"
  "$DEV_DOCS_DIR/Overview.md"
  "$DEV_DOCS_DIR/Quickstart.md"
  "$DEV_DOCS_DIR/HighLevelArchitecture.md"
  # Protocol concepts
  "$PENDLE_DOCS_DIR/ProtocolMechanics/Glossary.md"
  "$PENDLE_DOCS_DIR/ProtocolMechanics/YieldTokenization/SY.md"
  "$PENDLE_DOCS_DIR/ProtocolMechanics/YieldTokenization/PT.md"
  "$PENDLE_DOCS_DIR/ProtocolMechanics/YieldTokenization/YT.md"
  "$PENDLE_DOCS_DIR/ProtocolMechanics/YieldTokenization/Minting.md"
  "$PENDLE_DOCS_DIR/ProtocolMechanics/LiquidityEngines/AMM.md"
  "$PENDLE_DOCS_DIR/ProtocolMechanics/Mechanisms/Fees.md"
  # API integration
  "$DEV_DOCS_DIR/Backend/ApiOverview.mdx"
  "$DEV_DOCS_DIR/Backend/HostedSdk.mdx"
  "$DEV_DOCS_DIR/Backend/RouterStatic.md"
  # Limit orders
  "$DEV_DOCS_DIR/LimitOrder/Overview.md"
  "$DEV_DOCS_DIR/LimitOrder/CreateALimitOrder.md"
  "$DEV_DOCS_DIR/LimitOrder/FillALimitOrder.md"
  "$DEV_DOCS_DIR/LimitOrder/CancelOrders.mdx"
  "$DEV_DOCS_DIR/LimitOrder/LimitOrderContract.md"
  # Smart contracts
  "$DEV_DOCS_DIR/Contracts/YieldTokenization/YieldTokenization.md"
  "$DEV_DOCS_DIR/Contracts/StandardizedYield/StandardizedYield.md"
  "$DEV_DOCS_DIR/Contracts/PendleMarket/PendleMarket.md"
  "$DEV_DOCS_DIR/Contracts/PendleRouter/PendleRouterOverview.md"
  "$DEV_DOCS_DIR/Contracts/PendleRouter/ContractIntegrationGuide.md"
  "$DEV_DOCS_DIR/Contracts/PendleRouter/ApiReference/Types.md"
  "$DEV_DOCS_DIR/Contracts/PendleRouter/ApiReference/SimpleFunctions.md"
  "$DEV_DOCS_DIR/Contracts/PendleRouter/ApiReference/LiquidityFunctions.md"
  "$DEV_DOCS_DIR/Contracts/PendleRouter/ApiReference/PtFunctions.md"
  "$DEV_DOCS_DIR/Contracts/PendleRouter/ApiReference/YtFunctions.md"
  "$DEV_DOCS_DIR/Contracts/PendleRouter/ApiReference/MiscFunctions.md"
  "$DEV_DOCS_DIR/Contracts/sPENDLE.md"
  "$DEV_DOCS_DIR/Contracts/UnitAndDecimals.md"
  # Oracles
  "$DEV_DOCS_DIR/Oracles/OracleOverview.md"
  "$DEV_DOCS_DIR/Oracles/HowToIntegratePtAndLpOracle.md"
  "$DEV_DOCS_DIR/Oracles/PTAsCollateral.md"
  "$DEV_DOCS_DIR/Oracles/LPAsCollateral.md"
  "$DEV_DOCS_DIR/Oracles/PTSanityChecks.md"
  "$DEV_DOCS_DIR/Oracles/DeterministicOracles/LinearDiscountOracle.md"
  "$DEV_DOCS_DIR/Oracles/DeterministicOracles/ChoosingLinearDiscountParams.md"
  "$DEV_DOCS_DIR/Oracles/DeterministicOracles/LPLinearDiscountOracle.md"
  # Integration guides
  "$DEV_DOCS_DIR/Integration/PointsTracking.md"
  # Reference
  "$DEV_DOCS_DIR/Deployments.md"
  "$DEV_DOCS_DIR/FAQ.md"
  "$DEV_DOCS_DIR/Troubleshooting.md"
)

# Boros user-facing docs in reading order
BOROS_USER_FILES=(
  "$BOROS_DOCS_DIR/Introduction.md"
  "$BOROS_DOCS_DIR/about-boros/glossary.md"
  "$BOROS_DOCS_DIR/interest-rate-trading/interest-rate-trading-yu-trading.md"
  "$BOROS_DOCS_DIR/interest-rate-trading/order-book.md"
  "$BOROS_DOCS_DIR/interest-rate-trading/vaults.md"
  "$BOROS_DOCS_DIR/interest-rate-trading/fees.md"
  "$BOROS_DOCS_DIR/interest-rate-accounting/interest-rate-accounting-and-settlement.md"
  "$BOROS_DOCS_DIR/risk-parameters/margin-and-liquidations/README.md"
  "$BOROS_DOCS_DIR/risk-parameters/margin-and-liquidations/detailed-calculations-on-margin-and-liquidations.md"
  "$BOROS_DOCS_DIR/risk-parameters/margin-and-liquidations/protective-mechanisms.md"
  "$BOROS_DOCS_DIR/others/boros-referral-program.md"
)

# Boros developer docs in reading order
BOROS_DEV_FILES=(
  "$BOROS_DEV_DOCS_DIR/Introduction.mdx"
  "$BOROS_DEV_DOCS_DIR/LitePaper.mdx"
  "$BOROS_DEV_DOCS_DIR/HighLevelArchitecture.mdx"
  "$BOROS_DEV_DOCS_DIR/Mechanics/OrderBook.mdx"
  "$BOROS_DEV_DOCS_DIR/Mechanics/Margin.mdx"
  "$BOROS_DEV_DOCS_DIR/Mechanics/Settlement.mdx"
  "$BOROS_DEV_DOCS_DIR/Mechanics/Fees.mdx"
  "$BOROS_DEV_DOCS_DIR/Contracts/CustomTypes.mdx"
  "$BOROS_DEV_DOCS_DIR/Contracts/Router.mdx"
  "$BOROS_DEV_DOCS_DIR/Contracts/Market.mdx"
  "$BOROS_DEV_DOCS_DIR/Contracts/MarketHub.mdx"
  "$BOROS_DEV_DOCS_DIR/Backend/0. overview.mdx"
  "$BOROS_DEV_DOCS_DIR/Backend/1. glossary.mdx"
  "$BOROS_DEV_DOCS_DIR/Backend/2. agent.mdx"
  "$BOROS_DEV_DOCS_DIR/Backend/3. sdk.mdx"
  "$BOROS_DEV_DOCS_DIR/Backend/4. api.mdx"
  "$BOROS_DEV_DOCS_DIR/Backend/5. websocket.mdx"
  "$BOROS_DEV_DOCS_DIR/Backend/6. best-practices.mdx"
  "$BOROS_DEV_DOCS_DIR/Backend/7. stop-orders.mdx"
  "$BOROS_DEV_DOCS_DIR/Backend/8. historical-data.mdx"
  "$BOROS_DEV_DOCS_DIR/Backend/9. indicators.mdx"
  "$BOROS_DEV_DOCS_DIR/Backend/10. computing-units.mdx"
  "$BOROS_DEV_DOCS_DIR/Backend/11. bot-quickstart.mdx"
  "$BOROS_DEV_DOCS_DIR/FAQ.mdx"
)

emit_files() {
  local files=("$@")
  for file in "${files[@]}"; do
    if [ -f "$file" ]; then
      # Strip YAML frontmatter (--- delimited block at start of file)
      sed '/^---$/,/^---$/d' "$file"
      echo ""
      echo "---"
      echo ""
    else
      echo "WARNING: $file not found" >&2
    fi
  done
}

{
  echo "# Pendle Developer Documentation — Full Reference"
  echo ""
  echo "> This file contains all Pendle V2 and Boros documentation concatenated for AI consumption."
  echo "> Sources: https://docs.pendle.finance/pendle-v2 | https://docs.pendle.finance/pendle-v2-dev | https://docs.pendle.finance/boros-docs | https://docs.pendle.finance/boros-dev"
  echo "> Generated: $(date -u +%Y-%m-%d)"
  echo ""
  echo "---"
  echo ""

  echo "# Part 1: Pendle V2 — Yield Tokenization Protocol"
  echo ""
  emit_files "${V2_FILES[@]}"

  echo "# Part 2: Boros — Interest Rate Trading (User Docs)"
  echo ""
  emit_files "${BOROS_USER_FILES[@]}"

  echo "# Part 3: Boros — Interest Rate Swap DEX (Developer Docs)"
  echo ""
  emit_files "${BOROS_DEV_FILES[@]}"
} > "$OUTPUT"

echo "Generated $OUTPUT ($(wc -l < "$OUTPUT") lines)"
