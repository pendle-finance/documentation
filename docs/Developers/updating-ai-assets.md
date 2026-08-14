# Updating AI Assets

Run these commands from the repo root whenever docs content or APIs change.

## 1. Regenerate llms-full.txt

Run after any doc page is added, removed, or significantly changed:

```bash
./scripts/generate-llms-full.sh
```

If you add a new doc page that should be included in AI consumption:
1. Add its path to the appropriate `V2_FILES` or `BOROS_FILES` array in `scripts/generate-llms-full.sh`
2. Add a corresponding entry to the relevant section in `static/llms.txt`
3. Re-run the script

## 2. Sync the Pendle V2 API spec

Run after any backend deployment that adds or changes endpoints:

```bash
curl -s https://api-v2.pendle.finance/core/docs-json \
  | python3 -c "import json,sys; print(json.dumps(json.load(sys.stdin), indent=2))" \
  > static/pendle-v2/openapi/open-api.json
```

Then verify the endpoint description in `static/llms.txt` (search for `V2 API Spec`) is still accurate.

## 3. Sync Boros API specs

Run after any Boros backend deployment.

```bash
# Main Boros API
curl -s https://api-boros.pendle.finance/apis/docs-json \
  | python3 -c "import json,sys; print(json.dumps(json.load(sys.stdin), indent=4))" \
  > static/boros-dev/openapi/open-api.json

# Send-txs bot
curl -s https://api-boros.pendle.finance/send-txs-bot/docs-json \
  | python3 -c "import json,sys; print(json.dumps(json.load(sys.stdin), indent=4))" \
  > static/boros-dev/openapi/send-txs-bot.json
```

`indent=4` matches how both files are already committed. Using a different width
reindents every line, which turns a small endpoint change into a whole-file diff.
