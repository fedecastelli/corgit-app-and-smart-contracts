import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import secrets from './.secrets.json';

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      viaIR: false,
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      chainId: 1337,
      forking: {
        url: secrets.nodeUrls.goerli,
        blockNumber: 7334900
      },
    },
    goerli: {
      url: secrets.nodeUrls.goerli,
      accounts: [secrets.privateKeys.goerli.deployer],
      gasPrice: "auto"
    }
  },
  etherscan: {
    apiKey: {
      goerli: secrets.etherscanAPI
    }
  }
};

export default config;
