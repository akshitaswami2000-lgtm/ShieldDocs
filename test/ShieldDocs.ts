import { expect } from "chai";
import { Encryptable } from "@cofhe/sdk";
import hre from "hardhat";

const { ethers } = hre;

const payload = "0x1234567890abcdef";
const iv = "0x0102030405060708090a0b0c";
const ownerEnvelope = JSON.stringify({
  version: "x25519-xsalsa20-poly1305",
  nonce: "owner-nonce",
  ephemPublicKey: "owner-ephemeral",
  ciphertext: "owner-ciphertext"
});
const shareEnvelope = JSON.stringify({
  version: "x25519-xsalsa20-poly1305",
  nonce: "share-nonce",
  ephemPublicKey: "share-ephemeral",
  ciphertext: "share-ciphertext"
});

function documentInput(overrides: Record<string, unknown> = {}) {
  return {
    title: "Passport",
    category: "Identity",
    fileName: "passport.pdf",
    mimeType: "application/pdf",
    storageMode: 0,
    encryptedPayload: payload,
    storageUri: "",
    iv,
    payloadHash: ethers.keccak256(payload),
    ownerKeyEnvelope: ownerEnvelope,
    size: ethers.getBytes(payload).length,
    ...overrides
  };
}

async function futureTimestamp(offsetSeconds: number) {
  const block = await ethers.provider.getBlock("latest");
  if (!block) throw new Error("latest block not found");
  return BigInt(block.timestamp + offsetSeconds);
}

describe("ShieldDocs", function () {
  async function deployFixture() {
    const [owner, verifier, stranger] = await ethers.getSigners();
    const shieldDocs = (await ethers.deployContract("ShieldDocs")) as any;
    await shieldDocs.waitForDeployment();

    return { shieldDocs, owner, verifier, stranger };
  }

  it("creates a vault automatically and stores an encrypted document on chain", async function () {
    const { shieldDocs, owner, verifier } = await deployFixture();

    await expect(shieldDocs.connect(owner).createDocument(documentInput()))
      .to.emit(shieldDocs, "DocumentCreated")
      .withArgs(1, owner.address, "Passport", ethers.keccak256(payload));

    expect(await shieldDocs.hasVault(owner.address)).to.equal(true);
    expect(await shieldDocs.getOwnedDocuments(owner.address)).to.deep.equal([1n]);
    await expect(shieldDocs.connect(verifier).getOwnedDocuments(owner.address)).to.be.revertedWithCustomError(
      shieldDocs,
      "NotAuthorized"
    );

    const record = await shieldDocs.connect(owner).getDocument(1);
    expect(record.owner).to.equal(owner.address);
    expect(record.title).to.equal("Passport");
    expect(record.storageMode).to.equal(0);
    expect(record.encryptedPayload).to.equal(payload);
    expect(record.storageUri).to.equal("");
    expect(record.ownerKeyEnvelope).to.equal(ownerEnvelope);
  });

  it("stores large encrypted files by IPFS reference while keeping the hash on chain", async function () {
    const { shieldDocs, owner } = await deployFixture();
    const max = await shieldDocs.MAX_PAYLOAD_BYTES();
    const ipfsInput = documentInput({
      storageMode: 1,
      encryptedPayload: "0x",
      storageUri: "ipfs://bafkreicidshielddocslargefile",
      payloadHash: ethers.keccak256("0x1234"),
      size: max + 1000n
    });

    await shieldDocs.connect(owner).createDocument(ipfsInput);

    const record = await shieldDocs.connect(owner).getDocument(1);
    expect(record.storageMode).to.equal(1);
    expect(record.encryptedPayload).to.equal("0x");
    expect(record.storageUri).to.equal("ipfs://bafkreicidshielddocslargefile");
    expect(record.size).to.equal(max + 1000n);
  });

  it("supports request, approval, access logging, expiry, and revocation", async function () {
    const { shieldDocs, owner, verifier } = await deployFixture();

    await shieldDocs.connect(owner).createDocument(documentInput());

    await expect(shieldDocs.connect(verifier).requestAccess(1, 2, "Need over-18 proof for onboarding", "verifier-key"))
      .to.emit(shieldDocs, "AccessRequested")
      .withArgs(1, 1, verifier.address, 2);

    const expiresAt = await futureTimestamp(3600);
    await expect(shieldDocs.connect(owner).approveRequest(1, expiresAt, false, shareEnvelope))
      .to.emit(shieldDocs, "AccessApproved")
      .withArgs(1, 1, 1, verifier.address);

    expect(await shieldDocs.hasActiveAccess(1, verifier.address)).to.equal(true);
    const permission = await shieldDocs.connect(verifier).getPermission(1);
    expect(permission.grantee).to.equal(verifier.address);
    expect(permission.keyEnvelope).to.equal(shareEnvelope);

    await expect(shieldDocs.connect(verifier).getDocument(1)).to.be.revertedWithCustomError(
      shieldDocs,
      "NotDocumentOwner"
    );
    const sharedDocument = await shieldDocs.connect(verifier).getSharedDocument(1);
    expect(sharedDocument.encryptedPayload).to.equal(payload);
    expect(sharedDocument.storageMode).to.equal(0);
    expect(sharedDocument.keyEnvelope).to.equal(shareEnvelope);
    expect(sharedDocument.permissionId).to.equal(1n);

    await expect(shieldDocs.connect(verifier).recordAccess(1, "Verifier opened the encrypted file"))
      .to.emit(shieldDocs, "AccessUsed")
      .withArgs(1, 1, verifier.address);

    const audit = await shieldDocs.connect(owner).getAuditLog(1);
    expect(audit.map((entry: { action: bigint }) => entry.action)).to.include.members([1n, 3n, 4n, 7n]);
    await expect(shieldDocs.connect(verifier).getAuditLog(1)).to.be.revertedWithCustomError(
      shieldDocs,
      "NotDocumentOwner"
    );

    await shieldDocs.connect(owner).revokeAccess(1);
    expect(await shieldDocs.isPermissionActive(1)).to.equal(false);
    const revokedPermission = await shieldDocs.connect(verifier).getPermission(1);
    expect(revokedPermission.keyEnvelope).to.equal("");
    await expect(shieldDocs.connect(verifier).getSharedDocument(1)).to.be.revertedWithCustomError(
      shieldDocs,
      "PermissionInactive"
    );
  });

  it("keeps unauthorized users away from encrypted payloads", async function () {
    const { shieldDocs, owner, stranger } = await deployFixture();

    await shieldDocs.connect(owner).createDocument(documentInput());
    await expect(shieldDocs.connect(stranger).getDocument(1)).to.be.revertedWithCustomError(
      shieldDocs,
      "NotDocumentOwner"
    );
    await expect(shieldDocs.connect(stranger).getDocumentPublic(1)).to.be.revertedWithCustomError(
      shieldDocs,
      "NotAuthorized"
    );
    await expect(shieldDocs.connect(stranger).getSharedDocument(1)).to.be.revertedWithCustomError(
      shieldDocs,
      "PermissionMissing"
    );
  });

  it("hides shared key envelopes after expiry", async function () {
    const { shieldDocs, owner, verifier } = await deployFixture();

    await shieldDocs.connect(owner).createDocument(documentInput());
    const expiresAt = await futureTimestamp(60);
    await shieldDocs.connect(owner).grantAccess(1, verifier.address, 0, false, expiresAt, shareEnvelope);

    expect((await shieldDocs.connect(verifier).getPermission(1)).keyEnvelope).to.equal(shareEnvelope);
    await ethers.provider.send("evm_increaseTime", [61]);
    await ethers.provider.send("evm_mine", []);

    expect(await shieldDocs.isPermissionActive(1)).to.equal(false);
    expect((await shieldDocs.connect(verifier).getPermission(1)).keyEnvelope).to.equal("");
    await expect(shieldDocs.connect(verifier).recordAccess(1, "late access")).to.be.revertedWithCustomError(
      shieldDocs,
      "PermissionInactive"
    );
    await expect(shieldDocs.connect(verifier).getSharedDocument(1)).to.be.revertedWithCustomError(
      shieldDocs,
      "PermissionInactive"
    );
  });

  it("creates an encrypted age proof with CoFHE and grants verifier ACL access", async function () {
    const { shieldDocs, owner, verifier } = await deployFixture();

    await shieldDocs.connect(owner).createDocument(documentInput());

    const cofheClient = await hre.cofhe.createClientWithBatteries(owner);
    const [encryptedAge] = await cofheClient.encryptInputs([Encryptable.uint16(22n)]).execute();

    await expect(shieldDocs.connect(owner).createAgeProof(1, encryptedAge, 18, verifier.address))
      .to.emit(shieldDocs, "AgeProofCreated")
      .withArgs(1, verifier.address, 18, (value: string) => /^0x[0-9a-fA-F]{64}$/.test(value));

    const [proofHandle, threshold, proofVerifier, exists] = await shieldDocs.connect(verifier).getAgeProof(1);
    expect(threshold).to.equal(18);
    expect(proofVerifier).to.equal(verifier.address);
    expect(exists).to.equal(true);
    await hre.cofhe.mocks.expectPlaintext(proofHandle, 1n);
  });

  it("blocks payloads above the on-chain safety limit", async function () {
    const { shieldDocs, owner } = await deployFixture();
    const max = await shieldDocs.MAX_PAYLOAD_BYTES();
    const tooLarge = `0x${"aa".repeat(Number(max) + 1)}`;

    await expect(
      shieldDocs.connect(owner).createDocument(documentInput({ encryptedPayload: tooLarge }))
    ).to.be.revertedWithCustomError(shieldDocs, "PayloadTooLarge");
  });
});
