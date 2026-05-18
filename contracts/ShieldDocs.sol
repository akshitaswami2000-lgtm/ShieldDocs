// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {FHE, ebool, euint16, InEuint16} from "@fhenixprotocol/cofhe-contracts/FHE.sol";

contract ShieldDocs {
    uint256 public constant MAX_PAYLOAD_BYTES = 96 * 1024;

    enum Scope {
        View,
        Download,
        VerifyAge,
        MedicalEmergency,
        LegalReview
    }

    enum StorageMode {
        OnChain,
        Ipfs
    }

    enum RequestStatus {
        Pending,
        Approved,
        Denied,
        Cancelled
    }

    enum AuditAction {
        VaultCreated,
        DocumentCreated,
        DocumentUpdated,
        AccessRequested,
        AccessApproved,
        AccessDenied,
        AccessRevoked,
        AccessUsed,
        ProofCreated,
        ProofViewed,
        DocumentArchived
    }

    struct DocumentRecord {
        uint256 id;
        address owner;
        string title;
        string category;
        string fileName;
        string mimeType;
        StorageMode storageMode;
        bytes encryptedPayload;
        string storageUri;
        bytes12 iv;
        bytes32 payloadHash;
        string ownerKeyEnvelope;
        uint256 size;
        uint256 createdAt;
        uint256 updatedAt;
        bool archived;
    }

    struct DocumentInput {
        string title;
        string category;
        string fileName;
        string mimeType;
        StorageMode storageMode;
        bytes encryptedPayload;
        string storageUri;
        bytes12 iv;
        bytes32 payloadHash;
        string ownerKeyEnvelope;
        uint256 size;
    }

    struct SharedDocument {
        uint256 id;
        address owner;
        string title;
        string category;
        string fileName;
        string mimeType;
        StorageMode storageMode;
        bytes encryptedPayload;
        string storageUri;
        bytes12 iv;
        bytes32 payloadHash;
        string keyEnvelope;
        uint256 size;
        uint256 createdAt;
        uint256 updatedAt;
        bool archived;
        uint256 permissionId;
        Scope scope;
        bool canDownload;
        uint64 expiresAt;
    }

    struct Permission {
        uint256 id;
        uint256 documentId;
        address owner;
        address grantee;
        Scope scope;
        bool canDownload;
        uint64 expiresAt;
        bool revoked;
        string keyEnvelope;
        uint256 createdAt;
        uint256 revokedAt;
    }

    struct AccessRequest {
        uint256 id;
        uint256 documentId;
        address owner;
        address requester;
        Scope scope;
        string reason;
        string requesterPublicKey;
        RequestStatus status;
        uint256 createdAt;
        uint256 respondedAt;
        uint256 permissionId;
    }

    struct AuditEntry {
        uint256 id;
        uint256 documentId;
        uint256 permissionId;
        address actor;
        AuditAction action;
        string note;
        uint256 timestamp;
    }

    struct ProofRecord {
        bool exists;
        uint16 threshold;
        address verifier;
        uint256 updatedAt;
    }

    uint256 private _nextDocumentId = 1;
    uint256 private _nextPermissionId = 1;
    uint256 private _nextRequestId = 1;
    uint256 private _nextAuditId = 1;

    mapping(address => bool) public hasVault;
    mapping(address => uint256[]) private _ownerDocuments;
    mapping(address => uint256[]) private _sharedPermissionIds;
    mapping(address => uint256[]) private _requestIdsByOwner;
    mapping(address => uint256[]) private _requestIdsByRequester;
    mapping(uint256 => uint256[]) private _documentPermissionIds;
    mapping(uint256 => uint256[]) private _documentRequestIds;
    mapping(uint256 => uint256[]) private _documentAuditIds;

    mapping(uint256 => DocumentRecord) private _documents;
    mapping(uint256 => Permission) private _permissions;
    mapping(uint256 => AccessRequest) private _requests;
    mapping(uint256 => AuditEntry) private _auditEntries;
    mapping(uint256 => ProofRecord) private _proofs;
    mapping(uint256 => euint16) private _encryptedAges;
    mapping(uint256 => ebool) private _ageProofs;

    event VaultCreated(address indexed owner, uint256 timestamp);
    event DocumentCreated(uint256 indexed documentId, address indexed owner, string title, bytes32 payloadHash);
    event DocumentUpdated(uint256 indexed documentId, address indexed owner, bytes32 payloadHash);
    event DocumentArchived(uint256 indexed documentId, address indexed owner);
    event AccessRequested(uint256 indexed requestId, uint256 indexed documentId, address indexed requester, Scope scope);
    event AccessApproved(
        uint256 indexed requestId,
        uint256 indexed permissionId,
        uint256 indexed documentId,
        address grantee
    );
    event AccessDenied(uint256 indexed requestId, uint256 indexed documentId, address indexed requester);
    event AccessGranted(uint256 indexed permissionId, uint256 indexed documentId, address indexed grantee, uint64 expiresAt);
    event AccessRevoked(uint256 indexed permissionId, uint256 indexed documentId, address indexed grantee);
    event AccessUsed(uint256 indexed permissionId, uint256 indexed documentId, address indexed actor);
    event AgeProofCreated(uint256 indexed documentId, address indexed verifier, uint16 threshold, bytes32 proofHandle);
    event AuditLogged(
        uint256 indexed auditId,
        uint256 indexed documentId,
        uint256 indexed permissionId,
        address actor,
        AuditAction action
    );

    error EmptyField();
    error PayloadTooLarge();
    error DocumentMissing();
    error PermissionMissing();
    error RequestMissing();
    error NotDocumentOwner();
    error NotRequester();
    error NotAuthorized();
    error InvalidAddress();
    error InvalidExpiry();
    error InvalidPayloadSize();
    error RequestAlreadyClosed();
    error PermissionInactive();
    error DocumentArchivedError();

    modifier documentExists(uint256 documentId) {
        if (_documents[documentId].owner == address(0)) revert DocumentMissing();
        _;
    }

    modifier onlyDocumentOwner(uint256 documentId) {
        if (_documents[documentId].owner != msg.sender) revert NotDocumentOwner();
        _;
    }

    function createVault() external {
        if (!hasVault[msg.sender]) {
            hasVault[msg.sender] = true;
            _log(0, 0, msg.sender, AuditAction.VaultCreated, "Vault created");
            emit VaultCreated(msg.sender, block.timestamp);
        }
    }

    function createDocument(DocumentInput calldata input) external returns (uint256 documentId) {
        _validateDocumentInput(input);

        if (!hasVault[msg.sender]) {
            hasVault[msg.sender] = true;
            _log(0, 0, msg.sender, AuditAction.VaultCreated, "Vault created automatically");
            emit VaultCreated(msg.sender, block.timestamp);
        }

        documentId = _nextDocumentId++;
        _documents[documentId] = DocumentRecord({
            id: documentId,
            owner: msg.sender,
            title: input.title,
            category: input.category,
            fileName: input.fileName,
            mimeType: input.mimeType,
            storageMode: input.storageMode,
            encryptedPayload: input.encryptedPayload,
            storageUri: input.storageUri,
            iv: input.iv,
            payloadHash: input.payloadHash,
            ownerKeyEnvelope: input.ownerKeyEnvelope,
            size: _documentSize(input),
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            archived: false
        });

        _ownerDocuments[msg.sender].push(documentId);
        _log(documentId, 0, msg.sender, AuditAction.DocumentCreated, "Encrypted document sealed on chain");
        emit DocumentCreated(documentId, msg.sender, input.title, input.payloadHash);
    }

    function updateDocumentPayload(uint256 documentId, DocumentInput calldata input)
        external
        documentExists(documentId)
        onlyDocumentOwner(documentId)
    {
        if (_documents[documentId].archived) revert DocumentArchivedError();
        _validateDocumentInput(input);

        DocumentRecord storage record = _documents[documentId];
        record.title = input.title;
        record.category = input.category;
        record.fileName = input.fileName;
        record.mimeType = input.mimeType;
        record.storageMode = input.storageMode;
        record.encryptedPayload = input.encryptedPayload;
        record.storageUri = input.storageUri;
        record.iv = input.iv;
        record.payloadHash = input.payloadHash;
        record.ownerKeyEnvelope = input.ownerKeyEnvelope;
        record.size = _documentSize(input);
        record.updatedAt = block.timestamp;

        _log(documentId, 0, msg.sender, AuditAction.DocumentUpdated, "Encrypted payload rotated");
        emit DocumentUpdated(documentId, msg.sender, input.payloadHash);
    }

    function archiveDocument(uint256 documentId)
        external
        documentExists(documentId)
        onlyDocumentOwner(documentId)
    {
        _documents[documentId].archived = true;
        _documents[documentId].updatedAt = block.timestamp;
        _log(documentId, 0, msg.sender, AuditAction.DocumentArchived, "Document archived");
        emit DocumentArchived(documentId, msg.sender);
    }

    function requestAccess(uint256 documentId, Scope scope, string calldata reason, string calldata requesterPublicKey)
        external
        documentExists(documentId)
        returns (uint256 requestId)
    {
        DocumentRecord storage record = _documents[documentId];
        if (record.archived) revert DocumentArchivedError();
        if (record.owner == msg.sender) revert NotAuthorized();
        _requireText(reason);
        _requireText(requesterPublicKey);

        requestId = _nextRequestId++;
        _requests[requestId] = AccessRequest({
            id: requestId,
            documentId: documentId,
            owner: record.owner,
            requester: msg.sender,
            scope: scope,
            reason: reason,
            requesterPublicKey: requesterPublicKey,
            status: RequestStatus.Pending,
            createdAt: block.timestamp,
            respondedAt: 0,
            permissionId: 0
        });

        _requestIdsByOwner[record.owner].push(requestId);
        _requestIdsByRequester[msg.sender].push(requestId);
        _documentRequestIds[documentId].push(requestId);
        _log(documentId, 0, msg.sender, AuditAction.AccessRequested, reason);
        emit AccessRequested(requestId, documentId, msg.sender, scope);
    }

    function approveRequest(
        uint256 requestId,
        uint64 expiresAt,
        bool canDownload,
        string calldata keyEnvelope
    ) external returns (uint256 permissionId) {
        AccessRequest storage accessRequest = _requests[requestId];
        if (accessRequest.owner == address(0)) revert RequestMissing();
        if (accessRequest.owner != msg.sender) revert NotDocumentOwner();
        if (accessRequest.status != RequestStatus.Pending) revert RequestAlreadyClosed();

        permissionId = _grantAccess(
            accessRequest.documentId,
            accessRequest.requester,
            accessRequest.scope,
            canDownload,
            expiresAt,
            keyEnvelope
        );

        accessRequest.status = RequestStatus.Approved;
        accessRequest.respondedAt = block.timestamp;
        accessRequest.permissionId = permissionId;

        _log(accessRequest.documentId, permissionId, msg.sender, AuditAction.AccessApproved, "Request approved");
        emit AccessApproved(requestId, permissionId, accessRequest.documentId, accessRequest.requester);
    }

    function denyRequest(uint256 requestId, string calldata note) external {
        AccessRequest storage accessRequest = _requests[requestId];
        if (accessRequest.owner == address(0)) revert RequestMissing();
        if (accessRequest.owner != msg.sender) revert NotDocumentOwner();
        if (accessRequest.status != RequestStatus.Pending) revert RequestAlreadyClosed();

        accessRequest.status = RequestStatus.Denied;
        accessRequest.respondedAt = block.timestamp;
        _log(accessRequest.documentId, 0, msg.sender, AuditAction.AccessDenied, note);
        emit AccessDenied(requestId, accessRequest.documentId, accessRequest.requester);
    }

    function cancelRequest(uint256 requestId) external {
        AccessRequest storage accessRequest = _requests[requestId];
        if (accessRequest.owner == address(0)) revert RequestMissing();
        if (accessRequest.requester != msg.sender) revert NotRequester();
        if (accessRequest.status != RequestStatus.Pending) revert RequestAlreadyClosed();

        accessRequest.status = RequestStatus.Cancelled;
        accessRequest.respondedAt = block.timestamp;
        _log(accessRequest.documentId, 0, msg.sender, AuditAction.AccessDenied, "Requester cancelled");
    }

    function grantAccess(
        uint256 documentId,
        address grantee,
        Scope scope,
        bool canDownload,
        uint64 expiresAt,
        string calldata keyEnvelope
    ) external documentExists(documentId) onlyDocumentOwner(documentId) returns (uint256 permissionId) {
        permissionId = _grantAccess(documentId, grantee, scope, canDownload, expiresAt, keyEnvelope);
        _log(documentId, permissionId, msg.sender, AuditAction.AccessApproved, "Direct access grant");
    }

    function revokeAccess(uint256 permissionId) external {
        Permission storage permission = _permissions[permissionId];
        if (permission.owner == address(0)) revert PermissionMissing();
        if (permission.owner != msg.sender) revert NotDocumentOwner();
        if (permission.revoked) revert PermissionInactive();

        permission.revoked = true;
        permission.revokedAt = block.timestamp;
        permission.keyEnvelope = "";
        _log(permission.documentId, permissionId, msg.sender, AuditAction.AccessRevoked, "Permission revoked");
        emit AccessRevoked(permissionId, permission.documentId, permission.grantee);
    }

    function recordAccess(uint256 permissionId, string calldata note) external {
        Permission storage permission = _permissions[permissionId];
        if (!_isPermissionUsable(permission, msg.sender)) revert PermissionInactive();

        _log(permission.documentId, permissionId, msg.sender, AuditAction.AccessUsed, note);
        emit AccessUsed(permissionId, permission.documentId, msg.sender);
    }

    function createAgeProof(
        uint256 documentId,
        InEuint16 calldata encryptedAge,
        uint16 threshold,
        address verifier
    ) external documentExists(documentId) onlyDocumentOwner(documentId) returns (bytes32 proofHandle) {
        if (verifier == address(0)) revert InvalidAddress();
        if (_documents[documentId].archived) revert DocumentArchivedError();

        euint16 age = FHE.asEuint16(encryptedAge);
        euint16 encryptedThreshold = FHE.asEuint16(uint256(threshold));
        ebool proof = FHE.gte(age, encryptedThreshold);

        FHE.allowThis(age);
        FHE.allowThis(proof);
        FHE.allow(age, msg.sender);
        FHE.allow(proof, msg.sender);
        FHE.allow(proof, verifier);

        _encryptedAges[documentId] = age;
        _ageProofs[documentId] = proof;
        _proofs[documentId] = ProofRecord({
            exists: true,
            threshold: threshold,
            verifier: verifier,
            updatedAt: block.timestamp
        });

        proofHandle = ebool.unwrap(proof);
        _log(documentId, 0, msg.sender, AuditAction.ProofCreated, "Encrypted selective disclosure proof created");
        emit AgeProofCreated(documentId, verifier, threshold, proofHandle);
    }

    function grantProofViewer(uint256 documentId, address verifier)
        external
        documentExists(documentId)
        onlyDocumentOwner(documentId)
    {
        if (verifier == address(0)) revert InvalidAddress();
        if (!_proofs[documentId].exists) revert NotAuthorized();

        FHE.allow(_ageProofs[documentId], verifier);
        _proofs[documentId].verifier = verifier;
        _proofs[documentId].updatedAt = block.timestamp;
        _log(documentId, 0, msg.sender, AuditAction.ProofViewed, "Proof viewer updated");
    }

    function recordProofView(uint256 documentId) external documentExists(documentId) {
        ProofRecord memory proof = _proofs[documentId];
        if (!proof.exists || (msg.sender != proof.verifier && msg.sender != _documents[documentId].owner)) {
            revert NotAuthorized();
        }
        _log(documentId, 0, msg.sender, AuditAction.ProofViewed, "Selective disclosure proof viewed");
    }

    function getDocument(uint256 documentId)
        external
        view
        documentExists(documentId)
        onlyDocumentOwnerView(documentId)
        returns (DocumentRecord memory)
    {
        return _documents[documentId];
    }

    function getSharedDocument(uint256 permissionId) external view returns (SharedDocument memory) {
        Permission storage permission = _permissions[permissionId];
        if (permission.owner == address(0)) revert PermissionMissing();
        if (!_isPermissionUsable(permission, msg.sender)) revert PermissionInactive();

        DocumentRecord storage record = _documents[permission.documentId];
        return SharedDocument({
            id: record.id,
            owner: record.owner,
            title: record.title,
            category: record.category,
            fileName: record.fileName,
            mimeType: record.mimeType,
            storageMode: record.storageMode,
            encryptedPayload: record.encryptedPayload,
            storageUri: record.storageUri,
            iv: record.iv,
            payloadHash: record.payloadHash,
            keyEnvelope: permission.keyEnvelope,
            size: record.size,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
            archived: record.archived,
            permissionId: permission.id,
            scope: permission.scope,
            canDownload: permission.canDownload,
            expiresAt: permission.expiresAt
        });
    }

    function getDocumentPublic(uint256 documentId)
        external
        view
        documentExists(documentId)
        returns (
            uint256 id,
            address owner,
            string memory title,
            string memory category,
            string memory fileName,
            string memory mimeType,
            StorageMode storageMode,
            string memory storageUri,
            bytes32 payloadHash,
            uint256 size,
            uint256 createdAt,
            uint256 updatedAt,
            bool archived
        )
    {
        DocumentRecord storage record = _documents[documentId];
        if (record.owner != msg.sender && !hasActiveAccess(documentId, msg.sender)) revert NotAuthorized();
        return (
            record.id,
            record.owner,
            record.title,
            record.category,
            record.fileName,
            record.mimeType,
            record.storageMode,
            record.storageUri,
            record.payloadHash,
            record.size,
            record.createdAt,
            record.updatedAt,
            record.archived
        );
    }

    function getPermission(uint256 permissionId) external view returns (Permission memory) {
        Permission storage storedPermission = _permissions[permissionId];
        if (storedPermission.owner == address(0)) revert PermissionMissing();

        Permission memory permission = storedPermission;
        if (msg.sender != permission.owner && msg.sender != permission.grantee) revert NotAuthorized();
        if (msg.sender == permission.grantee && !_isPermissionUsable(storedPermission, msg.sender)) {
            permission.keyEnvelope = "";
        }
        return permission;
    }

    function getRequest(uint256 requestId) external view returns (AccessRequest memory) {
        AccessRequest memory accessRequest = _requests[requestId];
        if (accessRequest.owner == address(0)) revert RequestMissing();
        if (msg.sender != accessRequest.owner && msg.sender != accessRequest.requester) revert NotAuthorized();
        return accessRequest;
    }

    function getAgeProof(uint256 documentId)
        external
        view
        documentExists(documentId)
        returns (bytes32 proofHandle, uint16 threshold, address verifier, bool exists, uint256 updatedAt)
    {
        ProofRecord memory proof = _proofs[documentId];
        if (msg.sender != _documents[documentId].owner && msg.sender != proof.verifier) revert NotAuthorized();
        return (ebool.unwrap(_ageProofs[documentId]), proof.threshold, proof.verifier, proof.exists, proof.updatedAt);
    }

    function getOwnedDocuments(address owner) external view returns (uint256[] memory) {
        if (owner != msg.sender) revert NotAuthorized();
        return _ownerDocuments[owner];
    }

    function getSharedPermissions(address grantee) external view returns (uint256[] memory) {
        if (grantee != msg.sender) revert NotAuthorized();
        return _sharedPermissionIds[grantee];
    }

    function getDocumentPermissions(uint256 documentId)
        external
        view
        documentExists(documentId)
        onlyDocumentOwnerView(documentId)
        returns (uint256[] memory)
    {
        return _documentPermissionIds[documentId];
    }

    function getOwnerRequests(address owner) external view returns (uint256[] memory) {
        if (owner != msg.sender) revert NotAuthorized();
        return _requestIdsByOwner[owner];
    }

    function getRequesterRequests(address requester) external view returns (uint256[] memory) {
        if (requester != msg.sender) revert NotAuthorized();
        return _requestIdsByRequester[requester];
    }

    function getDocumentRequests(uint256 documentId)
        external
        view
        documentExists(documentId)
        onlyDocumentOwnerView(documentId)
        returns (uint256[] memory)
    {
        return _documentRequestIds[documentId];
    }

    function getAuditLog(uint256 documentId)
        external
        view
        documentExists(documentId)
        onlyDocumentOwnerView(documentId)
        returns (AuditEntry[] memory entries)
    {
        uint256[] storage ids = _documentAuditIds[documentId];
        entries = new AuditEntry[](ids.length);
        for (uint256 i = 0; i < ids.length; i++) {
            entries[i] = _auditEntries[ids[i]];
        }
    }

    function hasActiveAccess(uint256 documentId, address viewer)
        public
        view
        documentExists(documentId)
        returns (bool)
    {
        if (_documents[documentId].owner == viewer) return true;

        uint256[] storage ids = _documentPermissionIds[documentId];
        for (uint256 i = 0; i < ids.length; i++) {
            if (_isPermissionUsable(_permissions[ids[i]], viewer)) return true;
        }
        return false;
    }

    function isPermissionActive(uint256 permissionId) external view returns (bool) {
        Permission storage permission = _permissions[permissionId];
        if (permission.owner == address(0)) revert PermissionMissing();
        return _isPermissionUsable(permission, permission.grantee);
    }

    modifier onlyDocumentOwnerView(uint256 documentId) {
        if (_documents[documentId].owner != msg.sender) revert NotDocumentOwner();
        _;
    }

    function _grantAccess(
        uint256 documentId,
        address grantee,
        Scope scope,
        bool canDownload,
        uint64 expiresAt,
        string calldata keyEnvelope
    ) private returns (uint256 permissionId) {
        DocumentRecord storage record = _documents[documentId];
        if (record.owner == address(0)) revert DocumentMissing();
        if (record.archived) revert DocumentArchivedError();
        if (grantee == address(0) || grantee == record.owner) revert InvalidAddress();
        if (expiresAt <= block.timestamp) revert InvalidExpiry();
        _requireText(keyEnvelope);

        permissionId = _nextPermissionId++;
        _permissions[permissionId] = Permission({
            id: permissionId,
            documentId: documentId,
            owner: record.owner,
            grantee: grantee,
            scope: scope,
            canDownload: canDownload,
            expiresAt: expiresAt,
            revoked: false,
            keyEnvelope: keyEnvelope,
            createdAt: block.timestamp,
            revokedAt: 0
        });

        _documentPermissionIds[documentId].push(permissionId);
        _sharedPermissionIds[grantee].push(permissionId);
        emit AccessGranted(permissionId, documentId, grantee, expiresAt);
    }

    function _isPermissionUsable(Permission storage permission, address viewer) private view returns (bool) {
        return permission.owner != address(0) && permission.grantee == viewer && !permission.revoked
            && permission.expiresAt > block.timestamp && !_documents[permission.documentId].archived;
    }

    function _log(
        uint256 documentId,
        uint256 permissionId,
        address actor,
        AuditAction action,
        string memory note
    ) private {
        uint256 auditId = _nextAuditId++;
        _auditEntries[auditId] = AuditEntry({
            id: auditId,
            documentId: documentId,
            permissionId: permissionId,
            actor: actor,
            action: action,
            note: note,
            timestamp: block.timestamp
        });

        if (documentId != 0) {
            _documentAuditIds[documentId].push(auditId);
        }
        emit AuditLogged(auditId, documentId, permissionId, actor, action);
    }

    function _requireText(string calldata value) private pure {
        if (bytes(value).length == 0) revert EmptyField();
    }

    function _validateDocumentInput(DocumentInput calldata input) private pure {
        _requireText(input.title);
        _requireText(input.category);
        _requireText(input.fileName);
        _requireText(input.mimeType);
        _requireText(input.ownerKeyEnvelope);
        if (input.storageMode == StorageMode.OnChain) {
            if (input.encryptedPayload.length == 0) revert EmptyField();
            if (input.encryptedPayload.length > MAX_PAYLOAD_BYTES) revert PayloadTooLarge();
            if (input.size != 0 && input.size != input.encryptedPayload.length) revert InvalidPayloadSize();
        } else {
            _requireText(input.storageUri);
            if (input.encryptedPayload.length != 0) revert InvalidPayloadSize();
            if (input.size == 0) revert InvalidPayloadSize();
        }
    }

    function _documentSize(DocumentInput calldata input) private pure returns (uint256) {
        if (input.storageMode == StorageMode.OnChain) {
            return input.encryptedPayload.length;
        }
        return input.size;
    }
}
