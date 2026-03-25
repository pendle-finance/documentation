# Documentation Repo — Claude Instructions

## After editing files under docs/

When doc edits are **substantive** (new sections, new endpoints, new chains, changed API behaviour, new integration guides), regenerate and update all three of:

1. **`static/llms-full.txt`** — run `bash scripts/generate-llms-full.sh`
2. **`static/llms.txt`** — add/update entries if a new page or major section was added
3. **`docs/pendle-v2/Developers/Overview.md`** — add a link if a new integration guide or API section was added

Minor edits (typo fixes, wording tweaks, formatting) do **not** require regeneration.
