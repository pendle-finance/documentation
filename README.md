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

As many of us increasingly rely on AI tools to read and understand project documentation, we’ve added a new folder to the repository: [docs/Developers/](docs/Developers/).

This folder contains list of questions and answers that helps AI better understand our system and provide more accurate answers when you query them. Our in-house AI is using these knowledge bases!

The knowledge bases are stored in the following files:
- [Knowledge-base.md](docs/Developers/Knowledge-base.md): conversation excerpts with different Pendle partners, useful for answering questions.
- [dev-knowledge-base.txt](docs/Developers/dev-knowledge-base.txt): Questions and answers for developers, they contains context about our contract system and our API.
- [user-knowledge-base.txt](docs/Developers/user-knowledge-base.txt): General questions and answers for retail users
- [api-spec.json](docs/Developers/api-spec.json): the openAPI spec for our public API, at: [https://api-v2.pendle.finance/core/docs#/](https://api-v2.pendle.finance/core/docs#/).
- [general-knowledge-base.md](docs/Developers/general-knowledge-base.md): general knowledge about the Pendle protocol. Summary from tons of our conversations with partners and users.

## How to use the knowledge bases

- Just clone this repo and ask your AI to index the whole repo, including the knowledge bases folder. A prompt like this should work:

```
You are a helpful assistant that can answer questions about the Pendle protocol. Your goal is to answer the question based on the context provided.

The data source are files in @docs folder, especially the ones in @docs/Developers/ folder are list of questions and answers that helps you better understand the Pendle protocol. There is a file @docs/Developers/api-spec.json that is the openAPI spec for Pendle public API, use it to recommend the best API endpoint to use for the question if needed.

```