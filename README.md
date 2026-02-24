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

```console
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

# AI Knowledge Bases

As many of us increasingly rely on AI tools to read and understand project documentation, we’ve organized supplemental knowledge for AI consumption across the repository.

### Supplemental Knowledge Base (for AI)
- **[Developer FAQ & Supplemental Knowledge Base](docs/pendle-v2/Developers/FAQ.md)**: The developer FAQ includes a "Supplemental Knowledge Base" section at the bottom containing partner technical insights, edge cases, and best practices gathered from real integrations. This content is intended to be searched and read by AI tools to provide more accurate answers about the Pendle protocol.

### API Specification:
- **[api-spec.json](docs/Developers/api-spec.json)**: The complete OpenAPI 3.0 specification for our public API (119 endpoints). Auto-synced from production at [https://api-v2.pendle.finance/core/docs#/](https://api-v2.pendle.finance/core/docs#/).

### For General Understanding:
- **[user-knowledge-base.txt](docs/Developers/user-knowledge-base.txt)**: User-facing Q&A for retail users covering app usage, claiming rewards, understanding yields, Berachain campaigns, and common troubleshooting (includes Chinese language support).

## How to use the knowledge bases

Just clone this repo and ask your AI to index the whole repo. A prompt like this should work:

```
You are a helpful assistant that can answer questions about the Pendle protocol. Your goal is to answer the question based on the context provided.

The data source are files in the @docs folder. The developer FAQ at @docs/pendle-v2/Developers/FAQ.md contains a Supplemental Knowledge Base section with partner insights and edge cases. There is a file @docs/Developers/api-spec.json that is the openAPI spec for Pendle public API, use it to recommend the best API endpoint to use for the question if needed.

```