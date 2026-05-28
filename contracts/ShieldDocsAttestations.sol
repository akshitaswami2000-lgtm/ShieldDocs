// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

interface IShieldDocsOwnerLookup {
    function documentOwner(uint256 documentId) external view returns (address);
}

contract ShieldDocsAttestations {
    uint256 private constant MAX_SIGNATURE_BYTES = 65;

    struct AttestedAgeProof {
        bool exists;
        uint256 documentId;
        address subject;
        address verifier;
        address issuer;
        uint16 threshold;
        bool result;
        bytes32 attestationHash;
        uint64 issuedAt;
        uint64 expiresAt;
        uint256 updatedAt;
    }

    address public immutable admin;
    IShieldDocsOwnerLookup public immutable shieldDocs;
    mapping(address => bool) public trustedIssuers;
    mapping(uint256 => AttestedAgeProof) private _ageProofs;

    event TrustedIssuerUpdated(address indexed issuer, bool trusted);
    event AttestedAgeProofCreated(
        uint256 indexed documentId,
        address indexed verifier,
        address indexed issuer,
        uint16 threshold,
        bool result,
        bytes32 attestationHash
    );

    error InvalidAddress();
    error InvalidSignature();
    error UntrustedIssuer();
    error AttestationExpired();
    error NotAdmin();
    error NotDocumentOwner();
    error NotAuthorized();

    constructor(address shieldDocsAddress) {
        if (shieldDocsAddress == address(0)) revert InvalidAddress();
        admin = msg.sender;
        shieldDocs = IShieldDocsOwnerLookup(shieldDocsAddress);
        trustedIssuers[msg.sender] = true;
        emit TrustedIssuerUpdated(msg.sender, true);
    }

    function setTrustedIssuer(address issuer, bool trusted) external {
        if (msg.sender != admin) revert NotAdmin();
        if (issuer == address(0)) revert InvalidAddress();
        trustedIssuers[issuer] = trusted;
        emit TrustedIssuerUpdated(issuer, trusted);
    }

    function createAttestedAgeProof(
        uint256 documentId,
        uint16 threshold,
        address verifier,
        address issuer,
        uint64 issuedAt,
        uint64 expiresAt,
        bool result,
        bytes calldata signature
    ) external returns (bytes32 attestationHash) {
        address subject = shieldDocs.documentOwner(documentId);
        if (subject != msg.sender) revert NotDocumentOwner();
        if (verifier == address(0) || issuer == address(0)) revert InvalidAddress();
        if (!trustedIssuers[issuer]) revert UntrustedIssuer();
        if (issuedAt > block.timestamp || expiresAt <= block.timestamp) revert AttestationExpired();
        if (signature.length != MAX_SIGNATURE_BYTES) revert InvalidSignature();

        attestationHash = ageAttestationMessageHash(
            documentId,
            subject,
            threshold,
            verifier,
            issuer,
            issuedAt,
            expiresAt,
            result
        );
        if (_recoverSignedHash(attestationHash, signature) != issuer) revert InvalidSignature();

        _ageProofs[documentId] = AttestedAgeProof({
            exists: true,
            documentId: documentId,
            subject: subject,
            verifier: verifier,
            issuer: issuer,
            threshold: threshold,
            result: result,
            attestationHash: attestationHash,
            issuedAt: issuedAt,
            expiresAt: expiresAt,
            updatedAt: block.timestamp
        });

        emit AttestedAgeProofCreated(documentId, verifier, issuer, threshold, result, attestationHash);
    }

    function getAttestedAgeProof(uint256 documentId) external view returns (AttestedAgeProof memory proof) {
        proof = _ageProofs[documentId];
        if (!proof.exists || (msg.sender != proof.subject && msg.sender != proof.verifier)) revert NotAuthorized();
    }

    function ageAttestationMessageHash(
        uint256 documentId,
        address subject,
        uint16 threshold,
        address verifier,
        address issuer,
        uint64 issuedAt,
        uint64 expiresAt,
        bool result
    ) public view returns (bytes32) {
        return keccak256(
            abi.encode(
                "ShieldDocsAgeAttestation",
                address(this),
                address(shieldDocs),
                block.chainid,
                documentId,
                subject,
                threshold,
                verifier,
                issuer,
                issuedAt,
                expiresAt,
                result
            )
        );
    }

    function _recoverSignedHash(bytes32 messageHash, bytes calldata signature) private pure returns (address signer) {
        bytes32 r;
        bytes32 s;
        uint8 v;
        assembly {
            r := calldataload(signature.offset)
            s := calldataload(add(signature.offset, 32))
            v := byte(0, calldataload(add(signature.offset, 64)))
        }
        if (v < 27) v += 27;
        if (v != 27 && v != 28) return address(0);
        bytes32 digest = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash));
        signer = ecrecover(digest, v, r, s);
    }
}
