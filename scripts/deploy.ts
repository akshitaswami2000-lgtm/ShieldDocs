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

  const address = await shieldDocs.getAddress();
  const deployment = {
    network: network.name,
    chainId: Number((await ethers.provider.getNetwork()).chainId),
    address,
    deployer: deployerAddress,
    deployedAt: new Date().toISOString()
  };

  const root = process.cwd();
  const deploymentsDir = path.join(root, "deployments");
  fs.mkdirSync(deploymentsDir, { recursive: true });
  fs.writeFileSync(path.join(deploymentsDir, `${network.name}.json`), JSON.stringify(deployment, null, 2), "utf8");

  const envPath = path.join(root, ".env.local");
  const existingEnv = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
  const nextEnv = upsertEnv(existingEnv, "NEXT_PUBLIC_SHIELDDOCS_ADDRESS", address);
  fs.writeFileSync(envPath, nextEnv, "utf8");

  console.log(`ShieldDocs deployed: ${address}`);
  console.log(`Wrote deployments/${network.name}.json and NEXT_PUBLIC_SHIELDDOCS_ADDRESS in .env.local`);
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
