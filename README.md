# ShieldDocs

ShieldDocs is a privacy-first, on-chain document vault. It lets a wallet owner encrypt a document in the browser, store small ciphertexts directly on chain, pin larger ciphertexts to Pinata IPFS, share temporary access with another wallet, revoke that access, and create selective-disclosure proofs with CoFHE.

The app is built for the kind of documents people normally do not want to upload to a normal database: identity files, legal records, medical records, education certificates, financial paperwork, and compliance documents. The important idea is simple: the chain stores proof, permissions, audit history, hashes, and storage references, while plaintext stays local to the user wallet flow.

Live app:

```text
https://shielddocs-three.vercel.app
```

Sepolia contract:

```text
0x7B12e2BDc1966978dc4b87Cbff24d96e7B900D47
```

## What The App Does

- Creates a wallet-owned document vault.
- Encrypts files locally with AES-GCM before anything touches the chain.
- Seals real document title, category, filename, and MIME type inside the encrypted payload for new uploads.
- Stores small encrypted document payloads directly on chain.
- Pins larger encrypted document payloads to Pinata IPFS.
- Stores a keccak hash for ciphertext integrity checking.
- Seals the document AES key to the owner's wallet encryption public key.
- Lets owners decrypt and download their own files through wallet approval.
- Lets owners rotate the encrypted payload and owner key envelope after revoking access.
- Lets another wallet request access to a document.
- Lets verifiers discover requestable document IDs from on-chain create/archive events.
- Lets the owner approve or deny that request on chain.
- Creates expiring permissions for view/download/scoped access.
- Keeps encrypted payload keys out of scoped verifier permissions unless the grant includes download/file access.
- Re-seals the document key to a recipient wallet for approved sharing.
- Lets owners revoke permissions on chain.
- Records uploads, requests, approvals, revokes, access use, proof creation, and proof views in an on-chain audit trail.
- Creates a CoFHE encrypted age-threshold proof, such as `age >= 18`, without putting the raw age on chain.
- Rebuilds proof history from on-chain `AgeProofCreated` events while keeping the latest proof available through contract reads.
- Provides separate pages for overview, vault, upload, sharing, requests, verification, audit, shared links, and roadmap.

## How It Works

1. The user connects a wallet.
2. The user chooses a file on the upload page.
3. The browser generates a random AES-GCM key and IV.
4. The browser encrypts the file locally.
5. The wallet provides an encryption public key through `eth_getEncryptionPublicKey`.
6. The app encrypts the AES key into a wallet-sealed key envelope.
7. If the encrypted payload is small, the contract stores it directly.
8. If the encrypted payload is large, the app gets a server-signed Pinata upload URL, uploads the encrypted bytes directly to Pinata IPFS, and stores the `ipfs://` URI on chain.
9. If the encrypted payload is above Pinata's direct-upload threshold, the browser uses TUS resumable upload with a signed Pinata URL and precomputes the IPFS CID from the encrypted bytes.
10. The contract stores the IV, hash, metadata, storage mode, storage reference, and owner key envelope.
11. When the owner downloads the file, the app fetches the ciphertext from chain or IPFS, checks it against the on-chain hash, and the wallet decrypts the key envelope through `eth_decrypt`.
12. For sharing, the owner unseals the AES key locally, re-seals it to the recipient encryption public key, and writes an expiring permission on chain.
13. If the owner revokes access, they can rotate the document key: the browser decrypts locally, generates a new AES key, re-encrypts the payload, and updates the on-chain hash/reference.
14. The recipient opens the shared permission page, reads only their active shared document record, unseals their key envelope, fetches chain/IPFS ciphertext, checks the hash, and decrypts locally.
15. For selective disclosure, CoFHE encrypts a private input and the contract compares it against a threshold with `FHE.gte`.

## Main User Flows

### Vault Owner

- Upload a document.
- View all owned documents.
- Decrypt and download a selected file.
- Archive a document.
- Share a document with a recipient wallet.
- Revoke active permissions.
- Rotate a document key and encrypted payload after revocation.
- Review document activity in the audit page.

### Requester Or Verifier

- Load their wallet encryption public key.
- Discover published request cards.
- Request access to a document ID.
- Wait for the owner to approve or deny the request.
- Open a shared permission link when access is granted.
- Decrypt the shared payload if the permission is active.

### Selective Disclosure

- Owner chooses a document.
- Owner enters a private age value and threshold.
- CoFHE encrypts the private value.
- The contract stores the encrypted comparison result.
- Owner or verifier decrypts the proof result with a CoFHE permit.

## Tech Stack

- Next.js App Router
- React
- Tailwind CSS
- wagmi
- viem
- Solidity
- Hardhat
- CoFHE SDK
- `@fhenixprotocol/cofhe-contracts`
- Pinata IPFS
- MetaMask wallet encryption APIs
- Vercel

## Project Structure

```text
contracts/ShieldDocs.sol        Main on-chain vault, permission, audit, and proof contract
scripts/deploy.ts               Hardhat deployment script
scripts/export-abi.ts           ABI/bytecode export for the frontend
src/app                         App Router pages
src/app/api/pinata/sign         Server route that creates short-lived Pinata upload URLs
src/components                  Shared UI components
src/hooks/useShieldDocs.ts      Contract read hooks
src/lib/crypto.ts               Browser encryption and wallet key envelope helpers
src/lib/ipfs.ts                 Pinata signed upload and IPFS fetch helpers
src/lib/cofhe.ts                CoFHE browser client helpers
src/lib/contract.ts             Contract address, ABI, enum labels, constants
src/lib/wagmi.ts                Wallet and chain configuration
test/ShieldDocs.ts              Contract and CoFHE mock tests
```

## Implemented Pages

- `/` overview and current vault health
- `/vault` owned encrypted document list, decrypt download, archive
- `/vault/upload` local encryption and on-chain or Pinata IPFS upload
- `/sharing` direct grants and permission revocation
- `/requests` requester flow and owner approval flow
- `/verify` CoFHE encrypted age proof
- `/audit` document activity trail
- `/share/[permissionId]` recipient shared document page
- `/roadmap` shipped scope and hardening plan

## On-Chain Contract Features

`contracts/ShieldDocs.sol` stores and controls:

- Wallet vault creation
- Encrypted document records
- On-chain and IPFS storage modes
- IPFS URI storage with ciphertext hash verification
- Owner-only full document reads
- Active shared document reads for grantees
- Request creation, approval, denial, and cancellation
- Direct access grants
- Permission expiry and revocation
- Key-envelope clearing on revoke
- Document archiving
- Per-document audit logs
- CoFHE encrypted age proof creation
- CoFHE proof viewer grants
- Event-backed document discovery from create/archive logs
- Event-backed proof history

The contract intentionally separates `getDocument` and `getSharedDocument` so a shared recipient does not receive the owner's key envelope.

## Current Deployments

Sepolia:

```text
0x7B12e2BDc1966978dc4b87Cbff24d96e7B900D47
deployment block: 10939963
```

Local Hardhat:

```text
0xa513E6E4b8f2a923D98304ec87F64353C4D5C853
```

Vercel production:

```text
https://shielddocs-three.vercel.app
```

Vercel production env:

```text
NEXT_PUBLIC_SHIELDDOCS_ADDRESS=0x7B12e2BDc1966978dc4b87Cbff24d96e7B900D47
NEXT_PUBLIC_SHIELDDOCS_CHAIN_ID=11155111
NEXT_PUBLIC_SHIELDDOCS_DEPLOYMENT_BLOCK=10939963
NEXT_PUBLIC_DISCOVERY_FROM_BLOCK=10939963
NEXT_PUBLIC_PROOF_HISTORY_FROM_BLOCK=10939963
PINATA_JWT=<server-only secret>
PINATA_MAX_UPLOAD_BYTES=1073741824
NEXT_PUBLIC_PINATA_MAX_UPLOAD_BYTES=1073741824
NEXT_PUBLIC_PINATA_GATEWAY_URL=https://gateway.pinata.cloud
```

## Local Run

Install and verify:

```powershell
npm install
npm run compile
npm run export:abi
npm test
npm run build
```

Run a local CoFHE-mocked chain:

```powershell
npx hardhat node
```

In a second terminal:

```powershell
npm run deploy:local
npm run dev -- -p 3001
```

Open:

```text
http://localhost:3001
```

## Testnet Deploy

The app is configured for Base Sepolia, Ethereum Sepolia, Arbitrum Sepolia, and local Hardhat. The current live contract is deployed on Ethereum Sepolia.

```powershell
$env:PRIVATE_KEY="YOUR_TESTNET_PRIVATE_KEY"
npm run deploy:sepolia
Remove-Item Env:PRIVATE_KEY
```

Deployment writes:

- `deployments/<network>.json`
- `.env.local` with `NEXT_PUBLIC_SHIELDDOCS_ADDRESS`, chain ID, deployment block, discovery block, and proof-history block

Keep `.env.local`, `.env`, private keys, RPC secrets, and Vercel tokens out of source control.

For Pinata uploads, set these env vars locally and in Vercel:

```text
PINATA_JWT=<server-only Pinata JWT>
PINATA_MAX_UPLOAD_BYTES=1073741824
NEXT_PUBLIC_PINATA_MAX_UPLOAD_BYTES=1073741824
NEXT_PUBLIC_PINATA_GATEWAY_URL=https://gateway.pinata.cloud
```

## Verification Status

Last full verification completed:

- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`
- `npm audit --audit-level=high`
- Browser route smoke checks for all major pages
- Sepolia bytecode check for the live contract
- Vercel production deploy check

The contract test suite covers:

- Document creation
- Owner access control
- Unauthorized read blocking
- Request approval
- Permission expiry
- Permission revocation
- Shared document reads
- Verify-only scoped requests withholding document payload/key material
- IPFS storage mode creation
- Audit restrictions
- CoFHE age proof creation
- Payload size rejection
- Event-backed request discovery
- Event-backed proof history

## Security Notes

- Files are encrypted before upload, but encrypted blobs stored on a public chain or public IPFS are still public ciphertext.
- Revocation blocks future contract reads and clears the active key envelope, but it cannot erase a key or plaintext that a recipient already decrypted or copied.
- True post-share revocation for already-disclosed files needs key rotation, re-encryption, or a stronger custody/proxy-re-encryption design.
- ShieldDocs now includes owner-triggered key rotation and re-encryption, which protects future access after rotation; it still cannot erase plaintext or old keys already copied by a recipient.
- CoFHE proof ACL grants are not the same thing as perfect future revocation of old proof handles.
- The current app stores small encrypted payloads on chain, and larger encrypted payloads on Pinata IPFS through a server-signed upload URL.
- Direct Pinata uploads switch to resumable TUS for encrypted payloads above 100 MB, capped by `PINATA_MAX_UPLOAD_BYTES`.
- The Pinata signing route requires a fresh wallet-signed upload intent and applies a per-wallet rate limit before issuing a signed upload URL.
- Use test data until the contract, wallet encryption flow, and frontend are formally reviewed.

## Audit Note

`npm audit --audit-level=high` passes after package updates and overrides for patched transitive dependencies. Remaining low/moderate advisories are tied to the Hardhat 2 / wallet connector dependency stack; the automatic force fixes would introduce breaking Hardhat or wallet dependency changes, so revisit them when CoFHE and wagmi publish compatible upgrade paths.

## Wave 5: Final Hardening Shipped

Wave 5 closes the main production-hardening gaps that were still visible in the prior README:

- Resumable TUS uploads for encrypted payloads above Pinata's direct-upload threshold.
- Owner key rotation and full local re-encryption using `updateDocumentPayload`.
- Event-backed document discovery for verifier request flows using create/archive logs.
- Event-backed proof history for repeated CoFHE selective disclosures.
- Vault search and category filtering.
- Request discovery UI, proof-history UI, upload progress, and key-rotation progress.
- Owner-side request approval toggle for verifier-only access versus file access.
- Wallet-signed Pinata upload authorization and rate limiting before server-side signed URL creation.
- Sepolia chain targeting, deployment block discovery defaults, and shared permission links.
- CoFHE SDK and Hardhat plugin updated to the current 0.5.2 path.

## Wave 6: Production Polish Shipped

- New uploads keep real document metadata inside the encrypted payload and publish only generic labels on chain.
- Contract input validation now caps metadata, storage URI, key envelope, request reason, and audit note sizes.
- Contract rejects zero payload hashes and zero IVs before storage.
- Requesters can cancel pending requests from the UI.
- Shared permission access is recorded after successful decrypt/download instead of before.
- Pinata upload authorization uses EIP-712 typed-data signatures with chain binding and replay tracking.
- Home/vault CTA markup no longer nests buttons inside links.
- Mobile users can see the network switch action.
- Public key and permission-link copy buttons were added.
- Security headers were added through Next.js.
- Sepolia and Vercel production were redeployed with the hardened contract.

Remaining hardening before real user documents:

- Explorer verification for the final testnet deployment.
- More CoFHE proof templates, such as income range, credential validity, membership, residency, score threshold, and document freshness.
- Notification/indexer service for new requests, approvals, expiries, revokes, and proof views.
- Durable Redis/KV-backed upload nonce and rate-limit storage for multi-instance/serverless scale.
- Production e2e tests with wallet automation for upload, share, decrypt, revoke, request, rotate, and proof flows.
- Formal smart-contract security review before using real documents.
- Account abstraction or gas sponsorship for smoother non-technical user onboarding.

## Docs Used

- CoFHE Client SDK overview: https://cofhe-docs.fhenix.zone/client-sdk/introduction/overview
- CoFHE Hardhat quick start: https://cofhe-docs.fhenix.zone/client-sdk/quick-start/hardhat
- FHE.sol overview: https://cofhe-docs.fhenix.zone/fhe-library/reference/fhe-sol/overview
- FHE access control: https://cofhe-docs.fhenix.zone/fhe-library/core-concepts/access-control
- Pinata upload endpoint: https://docs.pinata.cloud/api-reference/endpoint/upload-a-file
- Pinata presigned URLs: https://docs.pinata.cloud/files/presigned-urls
