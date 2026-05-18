import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const artifactPath = path.join(root, "artifacts", "contracts", "ShieldDocs.sol", "ShieldDocs.json");
const outDir = path.join(root, "src", "lib", "contracts");
const outPath = path.join(outDir, "ShieldDocs.ts");

if (!fs.existsSync(artifactPath)) {
  throw new Error("ShieldDocs artifact not found. Run `npm run compile` first.");
}

const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8")) as {
  abi: unknown;
  bytecode: string;
};

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  outPath,
  `export const shieldDocsAbi = ${JSON.stringify(artifact.abi, null, 2)} as const;\n\n` +
    `export const shieldDocsBytecode = "${artifact.bytecode}" as const;\n`,
  "utf8"
);

console.log(`Exported ShieldDocs ABI to ${path.relative(root, outPath)}`);
