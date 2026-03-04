#!/usr/bin/env bash
# Regenerate llms-full.txt from all Pendle V2 and Boros developer documentation.
# Run this before deploying the docs site to keep llms-full.txt up to date.
#
# Usage: ./scripts/generate-llms-full.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$SCRIPT_DIR/.."
V2_DOCS_DIR="$REPO_DIR/docs/pendle-v2"
BOROS_DOCS_DIR="$REPO_DIR/docs/boros-dev-docs"
OUTPUT="$REPO_DIR/static/llms-full.txt"

# Pendle V2 docs in reading order (developer-relevant content)
V2_FILES=(
  # Getting started
  "$V2_DOCS_DIR/Introduction.md"
  "$V2_DOCS_DIR/Developers/Overview.md"
  "$V2_DOCS_DIR/Developers/HighLevelArchitecture.md"
  # Protocol concepts
  "$V2_DOCS_DIR/ProtocolMechanics/Glossary.md"
  "$V2_DOCS_DIR/ProtocolMechanics/YieldTokenization/SY.md"
  "$V2_DOCS_DIR/ProtocolMechanics/YieldTokenization/PT.md"
  "$V2_DOCS_DIR/ProtocolMechanics/YieldTokenization/YT.md"
  "$V2_DOCS_DIR/ProtocolMechanics/YieldTokenization/Minting.md"
  "$V2_DOCS_DIR/ProtocolMechanics/LiquidityEngines/AMM.md"
  "$V2_DOCS_DIR/ProtocolMechanics/Mechanisms/Fees.md"
  # API integration
  "$V2_DOCS_DIR/Developers/Backend/ApiOverview.mdx"
  "$V2_DOCS_DIR/Developers/Backend/HostedSdk.mdx"
  "$V2_DOCS_DIR/Developers/Backend/RouterStatic.md"
  # Limit orders
  "$V2_DOCS_DIR/Developers/LimitOrder/Overview.md"
  "$V2_DOCS_DIR/Developers/LimitOrder/CreateALimitOrder.md"
  "$V2_DOCS_DIR/Developers/LimitOrder/FillALimitOrder.md"
  "$V2_DOCS_DIR/Developers/LimitOrder/CancelOrders.mdx"
  "$V2_DOCS_DIR/Developers/LimitOrder/LimitOrderContract.md"
  # Smart contracts
  "$V2_DOCS_DIR/Developers/Contracts/YieldTokenization.md"
  "$V2_DOCS_DIR/Developers/Contracts/StandardizedYield.md"
  "$V2_DOCS_DIR/Developers/Contracts/PendleMarket.md"
  "$V2_DOCS_DIR/Developers/Contracts/PendleRouter/PendleRouterOverview.md"
  "$V2_DOCS_DIR/Developers/Contracts/PendleRouter/ContractIntegrationGuide.md"
  "$V2_DOCS_DIR/Developers/Contracts/PendleRouter/ApiReference/Types.md"
  "$V2_DOCS_DIR/Developers/Contracts/PendleRouter/ApiReference/SimpleFunctions.md"
  "$V2_DOCS_DIR/Developers/Contracts/PendleRouter/ApiReference/LiquidityFunctions.md"
  "$V2_DOCS_DIR/Developers/Contracts/PendleRouter/ApiReference/PtFunctions.md"
  "$V2_DOCS_DIR/Developers/Contracts/PendleRouter/ApiReference/YtFunctions.md"
  "$V2_DOCS_DIR/Developers/Contracts/PendleRouter/ApiReference/MiscFunctions.md"
  "$V2_DOCS_DIR/Developers/Contracts/sPENDLE.md"
  "$V2_DOCS_DIR/Developers/Contracts/UnitAndDecimals.md"
  # Oracles
  "$V2_DOCS_DIR/Developers/Oracles/IntroductionOfPtOracle.md"
  "$V2_DOCS_DIR/Developers/Oracles/IntroductionOfLpOracle.md"
  "$V2_DOCS_DIR/Developers/Oracles/HowToIntegratePtAndLpOracle.md"
  "$V2_DOCS_DIR/Developers/Oracles/PTAsCollateral.md"
  "$V2_DOCS_DIR/Developers/Oracles/LPAsCollateral.md"
  "$V2_DOCS_DIR/Developers/Oracles/PTSanityChecks.md"
  "$V2_DOCS_DIR/Developers/Oracles/DeterministicOracles/LinearDiscountOracle.md"
  "$V2_DOCS_DIR/Developers/Oracles/DeterministicOracles/ChoosingLinearDiscountParams.md"
  "$V2_DOCS_DIR/Developers/Oracles/DeterministicOracles/LPLinearDiscountOracle.md"
  # Integration guides
  "$V2_DOCS_DIR/Developers/Integration/PointsTracking.md"
  # Reference
  "$V2_DOCS_DIR/Developers/Deployments.md"
  "$V2_DOCS_DIR/Developers/FAQ.md"
  "$V2_DOCS_DIR/Developers/Troubleshooting.md"
)

# Boros docs in reading order
BOROS_FILES=(
  "$BOROS_DOCS_DIR/Introduction.mdx"
  "$BOROS_DOCS_DIR/LitePaper.mdx"
  "$BOROS_DOCS_DIR/HighLevelArchitecture.mdx"
  "$BOROS_DOCS_DIR/Mechanics/OrderBook.mdx"
  "$BOROS_DOCS_DIR/Mechanics/Margin.mdx"
  "$BOROS_DOCS_DIR/Mechanics/Settlement.mdx"
  "$BOROS_DOCS_DIR/Mechanics/Fees.mdx"
  "$BOROS_DOCS_DIR/Contracts/CustomTypes.mdx"
  "$BOROS_DOCS_DIR/Contracts/Router.mdx"
  "$BOROS_DOCS_DIR/Contracts/Market.mdx"
  "$BOROS_DOCS_DIR/Contracts/MarketHub.mdx"
  "$BOROS_DOCS_DIR/Backend/0. overview.mdx"
  "$BOROS_DOCS_DIR/Backend/1. glossary.mdx"
  "$BOROS_DOCS_DIR/Backend/2. agent.mdx"
  "$BOROS_DOCS_DIR/Backend/3. api.mdx"
  "$BOROS_DOCS_DIR/Backend/4. websocket.mdx"
  "$BOROS_DOCS_DIR/Backend/5. best-practices.mdx"
  "$BOROS_DOCS_DIR/Backend/6. stop-orders.mdx"
  "$BOROS_DOCS_DIR/FAQ.mdx"
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
  echo "> This file contains all Pendle V2 and Boros developer documentation concatenated for AI consumption."
  echo "> Sources: https://docs.pendle.finance/pendle-v2/Developers | https://docs.pendle.finance/boros-dev"
  echo "> Generated: $(date -u +%Y-%m-%d)"
  echo ""
  echo "---"
  echo ""

  echo "# Part 1: Pendle V2 — Yield Tokenization Protocol"
  echo ""
  emit_files "${V2_FILES[@]}"

  echo "# Part 2: Pendle Boros — Interest Rate Swap DEX"
  echo ""
  emit_files "${BOROS_FILES[@]}"
} > "$OUTPUT"

echo "Generated $OUTPUT ($(wc -l < "$OUTPUT") lines)"
