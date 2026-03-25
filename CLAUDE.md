# Documentation Repo — Claude Instructions

## After editing files under docs/

When doc edits are **substantive** (new sections, new endpoints, new chains, changed API behaviour, new integration guides), regenerate and update all three of:

1. **`static/llms-full.txt`** — run `bash scripts/generate-llms-full.sh`
2. **`static/llms.txt`** — add/update entries if a new page or major section was added
3. **`docs/pendle-v2/Developers/Overview.md`** — add a link if a new integration guide or API section was added

Minor edits (typo fixes, wording tweaks, formatting) do **not** require regeneration.

## Git

**Never commit unless explicitly asked.** Make changes, leave them unstaged/staged as needed, and wait for the user to request a commit.

## Subagents

For tasks that are heavy or unrelated to the main context (e.g. deep code exploration, bulk file analysis, cross-repo inspection), launch subagents to keep the main context clean. Keep concurrent subagents to **4 or fewer**.

## Plans

For any multi-step plan or audit output, write it to a file inside `local-plans/` (which is gitignored via the `local-*` pattern in `.gitignore`). Refer back to that file throughout implementation — check off items as they are completed. Never keep a plan only in the conversation context.
