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

## 3. Boros API specs — nothing to sync

The Boros specs are **not** committed here. `static/llms.txt` links them live:

- `https://api-boros.pendle.finance/apis/docs-json`
- `https://api-boros.pendle.finance/send-txs-bot/docs-json`

Both are publicly fetchable — checked against GPTBot, ClaudeBot, Googlebot and
curl, all 200. A committed copy only bought a snapshot that went stale: the last
one sat six months behind, at 41 paths against 77 live, and any refresh landed as
a five-figure diff nobody could review.

The Pendle V2 spec above stays committed because `scripts/fetch-knowledge-base.js`
syncs it automatically, so it cannot drift the same way.
