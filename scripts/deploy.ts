import fs from "node:fs";
import path from "node:path";
import hre from "hardhat";

const { ethers, network } = hre;

async function main() {
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  const balance = await ethers.provider.getBalance(deployerAddress);

  console.log(`Deploying ShieldDocs to ${network.name}`);
  console.log(`Deployer: ${deployerAddress}`);
  console.log(`Balance: ${ethers.formatEther(balance)} ETH`);

  const ShieldDocs = await ethers.getContractFactory("ShieldDocs");
  const shieldDocs = await ShieldDocs.deploy();
  await shieldDocs.waitForDeployment();
  const deployReceipt = await shieldDocs.deploymentTransaction()?.wait();

  const address = await shieldDocs.getAddress();
  const ShieldDocsAttestations = await ethers.getContractFactory("ShieldDocsAttestations");
  const attestations = await ShieldDocsAttestations.deploy(address);
  await attestations.waitForDeployment();
  const attestationsReceipt = await attestations.deploymentTransaction()?.wait();
  const attestationsAddress = await attestations.getAddress();
  const chainId = Number((await ethers.provider.getNetwork()).chainId);
  const deploymentBlock = Math.min(
    deployReceipt?.blockNumber ?? Number.MAX_SAFE_INTEGER,
    attestationsReceipt?.blockNumber ?? Number.MAX_SAFE_INTEGER
  );
  const deployment = {
    network: network.name,
    chainId,
    address,
    attestationsAddress,
    deployer: deployerAddress,
    deploymentBlock,
    transactionHash: deployReceipt?.hash,
    attestationsTransactionHash: attestationsReceipt?.hash,
    deployedAt: new Date().toISOString()
  };

  const root = process.cwd();
  const deploymentsDir = path.join(root, "deployments");
  fs.mkdirSync(deploymentsDir, { recursive: true });
  fs.writeFileSync(path.join(deploymentsDir, `${network.name}.json`), JSON.stringify(deployment, null, 2), "utf8");

  const envPath = path.join(root, ".env.local");
  const existingEnv = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
  const nextEnv = [
    ["NEXT_PUBLIC_SHIELDDOCS_ADDRESS", address],
    ["NEXT_PUBLIC_SHIELDDOCS_ATTESTATIONS_ADDRESS", attestationsAddress],
    ["NEXT_PUBLIC_SHIELDDOCS_CHAIN_ID", chainId.toString()],
    ["NEXT_PUBLIC_SHIELDDOCS_DEPLOYMENT_BLOCK", deploymentBlock.toString()],
    ["NEXT_PUBLIC_DISCOVERY_FROM_BLOCK", deploymentBlock.toString()],
    ["NEXT_PUBLIC_PROOF_HISTORY_FROM_BLOCK", deploymentBlock.toString()]
  ].reduce((env, [key, value]) => upsertEnv(env, key, value), existingEnv);
  fs.writeFileSync(envPath, nextEnv, "utf8");

  console.log(`ShieldDocs deployed: ${address}`);
  console.log(`ShieldDocsAttestations deployed: ${attestationsAddress}`);
  console.log(`Wrote deployments/${network.name}.json and frontend contract env in .env.local`);
}

function upsertEnv(input: string, key: string, value: string) {
  const line = `${key}=${value}`;
  const lines = input.split(/\r?\n/).filter(Boolean);
  const index = lines.findIndex((entry) => entry.startsWith(`${key}=`));

  if (index >= 0) {
    lines[index] = line;
  } else {
    lines.push(line);
  }

  return `${lines.join("\n")}\n`;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
