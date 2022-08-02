# Documentation system for Certify The Web
Documentation Site for the Certify Certificate Manager.

Contributions are welcome and all content can be found in the `docs` folder. Please submit a PR.

This uses markdown syntax document files and the [Docusaurus](https://docusaurus.io) build system.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Github Actions are configured so that commits to master are built and the gh-pages branch is updated and published automatically.