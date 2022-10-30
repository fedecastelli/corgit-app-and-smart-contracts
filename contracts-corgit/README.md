# CorGit

Tokenize your OpenSource project, to proportionally reward past, present and future contributors.

# How to Use this repo

Make sure to clone the repo and install all the dependencies with

```shell
yarn install
```

## Deploy and Testing

Project developed with [Hardhat development environment](https://hardhat.org/)

⚠️ MAke sure to create a correct `.secrets.json` file in the main folder.  You can find a `.secrets.example.json` file that you can copy.

To compile the contracts

```shell
npx hardhat compile
```

To run tests
```shell
npx hardhat test
```

To deploy
```shell
npx hardhat run scripts/Deployer/deploy.ts
```

More references to these commands: [hardhat docs](https://hardhat.org/docs).
