## Installation

```console
yarn install
git submodule update --init --recursive
```

## Local Development

```console
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```console
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

```console.
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

# AI Knowledge Bases

As many of us increasingly rely on AI tools to read and understand project documentation, we’ve organized supplemental knowledge for AI consumption across the repository.

### Supplemental Knowledge Base (for AI)
- **[Developer FAQ & Supplemental Knowledge Base](docs/pendle-v2/Developers/FAQ.md)**: The developer FAQ includes a "Supplemental Knowledge Base" section at the bottom containing partner technical insights, edge cases, and best practices gathered from real integrations. This content is intended to be searched and read by AI tools to provide more accurate answers about the Pendle protocol.

### For General Understanding:
- **[user-knowledge-base.txt](docs/Developers/user-knowledge-base.txt)**: User-facing Q&A for retail users covering app usage, claiming rewards, understanding yields, Berachain campaigns, and common troubleshooting (includes Chinese language support).

### llms.txt (AI discovery standard)
- **[static/llms.txt](static/llms.txt)**: Concise index of all Pendle V2 + Boros developer docs, following the [llms.txt standard](https://llmstxt.org/). Served at `docs.pendle.finance/llms.txt`. Update manually when docs sections are added or removed.
- **[static/llms-full.txt](static/llms-full.txt)**: All Pendle V2 + Boros developer documentation concatenated into one file for AI ingestion. **Generated file — do not edit directly.** Regenerate with the script below.
- **[static/pendle-v2/openapi/open-api.json](static/pendle-v2/openapi/open-api.json)**: The OpenAPI 3.0 specification for the Pendle V2 public API (non-deprecated endpoints only). Served at `docs.pendle.finance/pendle-v2/openapi/open-api.json`. Sync with the command in the update instructions.
- **[static/boros-dev/openapi/](static/boros-dev/openapi/)**: Static copies of Boros API specs (`open-api.json`, `send-txs-bot.json`, `stop-order.json`). Update manually from each service's `/docs-json` endpoint when the Boros API changes.

## Updating AI assets

See **[docs/Developers/updating-ai-assets.md](docs/Developers/updating-ai-assets.md)** for step-by-step instructions on regenerating `llms-full.txt` and syncing API specs.

## How to use the knowledge bases

Just clone this repo and ask your AI to index the whole repo. A prompt like this should work:

```
You are a helpful assistant that can answer questions about the Pendle protocol. Your goal is to answer the question based on the context provided.

The data source are files in the @docs folder. The developer FAQ at @docs/pendle-v2/Developers/FAQ.md contains a Supplemental Knowledge Base section with partner insights and edge cases. There is a file @static/pendle-v2/openapi/open-api.json that is the openAPI spec for Pendle public API, use it to recommend the best API endpoint to use for the question if needed.

```