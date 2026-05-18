import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  {
    ignores: [
      ".next/**",
      "artifacts/**",
      "cache/**",
      "node_modules/**",
      "src/lib/contracts/ShieldDocs.ts"
    ]
  }
];

export default eslintConfig;
