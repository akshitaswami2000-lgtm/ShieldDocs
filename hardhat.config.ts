import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-verify";
import "@cofhe/hardhat-plugin";
import "dotenv/config";
import type { HardhatUserConfig } from "hardhat/config";

const privateKey = process.env.PRIVATE_KEY;
const accounts = privateKey ? [privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`] : [];

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.26",
    settings: {
      evmVersion: "cancun",
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 1
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 31337
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    },
    baseSepolia: {
      url: process.env.BASE_SEPOLIA_RPC_URL ?? "https://sepolia.base.org",
      accounts
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL ?? "https://ethereum-sepolia-rpc.publicnode.com",
      accounts
    },
    arbitrumSepolia: {
      url: process.env.ARBITRUM_SEPOLIA_RPC_URL ?? "https://sepolia-rollup.arbitrum.io/rpc",
      accounts
    }
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY ?? "",
      baseSepolia: process.env.BASESCAN_API_KEY ?? "",
      arbitrumSepolia: process.env.ARBISCAN_API_KEY ?? ""
    }
  }
};

export default config;
