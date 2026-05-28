import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "src", "lib", "contracts");
const contracts = [
  {
    name: "ShieldDocs",
    artifactPath: path.join(root, "artifacts", "contracts", "ShieldDocs.sol", "ShieldDocs.json"),
    outPath: path.join(outDir, "ShieldDocs.ts"),
    abiExport: "shieldDocsAbi",
    bytecodeExport: "shieldDocsBytecode"
  },
  {
    name: "ShieldDocsAttestations",
    artifactPath: path.join(root, "artifacts", "contracts", "ShieldDocsAttestations.sol", "ShieldDocsAttestations.json"),
    outPath: path.join(outDir, "ShieldDocsAttestations.ts"),
    abiExport: "shieldDocsAttestationsAbi",
    bytecodeExport: "shieldDocsAttestationsBytecode"
  }
];

fs.mkdirSync(outDir, { recursive: true });

for (const contract of contracts) {
  if (!fs.existsSync(contract.artifactPath)) {
    throw new Error(`${contract.name} artifact not found. Run \`npm run compile\` first.`);
  }

  const artifact = JSON.parse(fs.readFileSync(contract.artifactPath, "utf8")) as {
    abi: unknown;
    bytecode: string;
  };
  fs.writeFileSync(
    contract.outPath,
    `export const ${contract.abiExport} = ${JSON.stringify(artifact.abi, null, 2)} as const;\n\n` +
      `export const ${contract.bytecodeExport} = "${artifact.bytecode}" as const;\n`,
    "utf8"
  );

  console.log(`Exported ${contract.name} ABI to ${path.relative(root, contract.outPath)}`);
}
