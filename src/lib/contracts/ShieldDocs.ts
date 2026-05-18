export const shieldDocsAbi = [
  {
    "inputs": [],
    "name": "DocumentArchivedError",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "DocumentMissing",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "EmptyField",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidAddress",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "got",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "expected",
        "type": "uint8"
      }
    ],
    "name": "InvalidEncryptedInput",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidExpiry",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidPayloadSize",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotAuthorized",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotDocumentOwner",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotRequester",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "PayloadTooLarge",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "PermissionInactive",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "PermissionMissing",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "RequestAlreadyClosed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "RequestMissing",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "int32",
        "name": "value",
        "type": "int32"
      }
    ],
    "name": "SecurityZoneOutOfBounds",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "permissionId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "grantee",
        "type": "address"
      }
    ],
    "name": "AccessApproved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "requester",
        "type": "address"
      }
    ],
    "name": "AccessDenied",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "permissionId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "grantee",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "expiresAt",
        "type": "uint64"
      }
    ],
    "name": "AccessGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "requester",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "enum ShieldDocs.Scope",
        "name": "scope",
        "type": "uint8"
      }
    ],
    "name": "AccessRequested",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "permissionId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "grantee",
        "type": "address"
      }
    ],
    "name": "AccessRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "permissionId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "actor",
        "type": "address"
      }
    ],
    "name": "AccessUsed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "verifier",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint16",
        "name": "threshold",
        "type": "uint16"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "proofHandle",
        "type": "bytes32"
      }
    ],
    "name": "AgeProofCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "auditId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "permissionId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "actor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "enum ShieldDocs.AuditAction",
        "name": "action",
        "type": "uint8"
      }
    ],
    "name": "AuditLogged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "DocumentArchived",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "payloadHash",
        "type": "bytes32"
      }
    ],
    "name": "DocumentCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "payloadHash",
        "type": "bytes32"
      }
    ],
    "name": "DocumentUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "VaultCreated",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MAX_PAYLOAD_BYTES",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      },
      {
        "internalType": "uint64",
        "name": "expiresAt",
        "type": "uint64"
      },
      {
        "internalType": "bool",
        "name": "canDownload",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "keyEnvelope",
        "type": "string"
      }
    ],
    "name": "approveRequest",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "permissionId",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      }
    ],
    "name": "archiveDocument",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      }
    ],
    "name": "cancelRequest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "ctHash",
            "type": "uint256"
          },
          {
            "internalType": "uint8",
            "name": "securityZone",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "utype",
            "type": "uint8"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct InEuint16",
        "name": "encryptedAge",
        "type": "tuple"
      },
      {
        "internalType": "uint16",
        "name": "threshold",
        "type": "uint16"
      },
      {
        "internalType": "address",
        "name": "verifier",
        "type": "address"
      }
    ],
    "name": "createAgeProof",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "proofHandle",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "category",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fileName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "mimeType",
            "type": "string"
          },
          {
            "internalType": "enum ShieldDocs.StorageMode",
            "name": "storageMode",
            "type": "uint8"
          },
          {
            "internalType": "bytes",
            "name": "encryptedPayload",
            "type": "bytes"
          },
          {
            "internalType": "string",
            "name": "storageUri",
            "type": "string"
          },
          {
            "internalType": "bytes12",
            "name": "iv",
            "type": "bytes12"
          },
          {
            "internalType": "bytes32",
            "name": "payloadHash",
            "type": "bytes32"
          },
          {
            "internalType": "string",
            "name": "ownerKeyEnvelope",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "size",
            "type": "uint256"
          }
        ],
        "internalType": "struct ShieldDocs.DocumentInput",
        "name": "input",
        "type": "tuple"
      }
    ],
    "name": "createDocument",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "createVault",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "note",
        "type": "string"
      }
    ],
    "name": "denyRequest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      }
    ],
    "name": "getAgeProof",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "proofHandle",
        "type": "bytes32"
      },
      {
        "internalType": "uint16",
        "name": "threshold",
        "type": "uint16"
      },
      {
        "internalType": "address",
        "name": "verifier",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "exists",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "updatedAt",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      }
    ],
    "name": "getAuditLog",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "documentId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "permissionId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "actor",
            "type": "address"
          },
          {
            "internalType": "enum ShieldDocs.AuditAction",
            "name": "action",
            "type": "uint8"
          },
          {
            "internalType": "string",
            "name": "note",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct ShieldDocs.AuditEntry[]",
        "name": "entries",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      }
    ],
    "name": "getDocument",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "category",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fileName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "mimeType",
            "type": "string"
          },
          {
            "internalType": "enum ShieldDocs.StorageMode",
            "name": "storageMode",
            "type": "uint8"
          },
          {
            "internalType": "bytes",
            "name": "encryptedPayload",
            "type": "bytes"
          },
          {
            "internalType": "string",
            "name": "storageUri",
            "type": "string"
          },
          {
            "internalType": "bytes12",
            "name": "iv",
            "type": "bytes12"
          },
          {
            "internalType": "bytes32",
            "name": "payloadHash",
            "type": "bytes32"
          },
          {
            "internalType": "string",
            "name": "ownerKeyEnvelope",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "size",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "updatedAt",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "archived",
            "type": "bool"
          }
        ],
        "internalType": "struct ShieldDocs.DocumentRecord",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      }
    ],
    "name": "getDocumentPermissions",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      }
    ],
    "name": "getDocumentPublic",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "category",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "fileName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "mimeType",
        "type": "string"
      },
      {
        "internalType": "enum ShieldDocs.StorageMode",
        "name": "storageMode",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "storageUri",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "payloadHash",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "size",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "createdAt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "updatedAt",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "archived",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      }
    ],
    "name": "getDocumentRequests",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "getOwnedDocuments",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "getOwnerRequests",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "permissionId",
        "type": "uint256"
      }
    ],
    "name": "getPermission",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "documentId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "grantee",
            "type": "address"
          },
          {
            "internalType": "enum ShieldDocs.Scope",
            "name": "scope",
            "type": "uint8"
          },
          {
            "internalType": "bool",
            "name": "canDownload",
            "type": "bool"
          },
          {
            "internalType": "uint64",
            "name": "expiresAt",
            "type": "uint64"
          },
          {
            "internalType": "bool",
            "name": "revoked",
            "type": "bool"
          },
          {
            "internalType": "string",
            "name": "keyEnvelope",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "revokedAt",
            "type": "uint256"
          }
        ],
        "internalType": "struct ShieldDocs.Permission",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      }
    ],
    "name": "getRequest",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "documentId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "requester",
            "type": "address"
          },
          {
            "internalType": "enum ShieldDocs.Scope",
            "name": "scope",
            "type": "uint8"
          },
          {
            "internalType": "string",
            "name": "reason",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "requesterPublicKey",
            "type": "string"
          },
          {
            "internalType": "enum ShieldDocs.RequestStatus",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "respondedAt",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "permissionId",
            "type": "uint256"
          }
        ],
        "internalType": "struct ShieldDocs.AccessRequest",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "requester",
        "type": "address"
      }
    ],
    "name": "getRequesterRequests",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "permissionId",
        "type": "uint256"
      }
    ],
    "name": "getSharedDocument",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "category",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fileName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "mimeType",
            "type": "string"
          },
          {
            "internalType": "enum ShieldDocs.StorageMode",
            "name": "storageMode",
            "type": "uint8"
          },
          {
            "internalType": "bytes",
            "name": "encryptedPayload",
            "type": "bytes"
          },
          {
            "internalType": "string",
            "name": "storageUri",
            "type": "string"
          },
          {
            "internalType": "bytes12",
            "name": "iv",
            "type": "bytes12"
          },
          {
            "internalType": "bytes32",
            "name": "payloadHash",
            "type": "bytes32"
          },
          {
            "internalType": "string",
            "name": "keyEnvelope",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "size",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "updatedAt",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "archived",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "permissionId",
            "type": "uint256"
          },
          {
            "internalType": "enum ShieldDocs.Scope",
            "name": "scope",
            "type": "uint8"
          },
          {
            "internalType": "bool",
            "name": "canDownload",
            "type": "bool"
          },
          {
            "internalType": "uint64",
            "name": "expiresAt",
            "type": "uint64"
          }
        ],
        "internalType": "struct ShieldDocs.SharedDocument",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "grantee",
        "type": "address"
      }
    ],
    "name": "getSharedPermissions",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "grantee",
        "type": "address"
      },
      {
        "internalType": "enum ShieldDocs.Scope",
        "name": "scope",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "canDownload",
        "type": "bool"
      },
      {
        "internalType": "uint64",
        "name": "expiresAt",
        "type": "uint64"
      },
      {
        "internalType": "string",
        "name": "keyEnvelope",
        "type": "string"
      }
    ],
    "name": "grantAccess",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "permissionId",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "verifier",
        "type": "address"
      }
    ],
    "name": "grantProofViewer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "viewer",
        "type": "address"
      }
    ],
    "name": "hasActiveAccess",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "hasVault",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "permissionId",
        "type": "uint256"
      }
    ],
    "name": "isPermissionActive",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "permissionId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "note",
        "type": "string"
      }
    ],
    "name": "recordAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      }
    ],
    "name": "recordProofView",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      },
      {
        "internalType": "enum ShieldDocs.Scope",
        "name": "scope",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "reason",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "requesterPublicKey",
        "type": "string"
      }
    ],
    "name": "requestAccess",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "permissionId",
        "type": "uint256"
      }
    ],
    "name": "revokeAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "documentId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "category",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fileName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "mimeType",
            "type": "string"
          },
          {
            "internalType": "enum ShieldDocs.StorageMode",
            "name": "storageMode",
            "type": "uint8"
          },
          {
            "internalType": "bytes",
            "name": "encryptedPayload",
            "type": "bytes"
          },
          {
            "internalType": "string",
            "name": "storageUri",
            "type": "string"
          },
          {
            "internalType": "bytes12",
            "name": "iv",
            "type": "bytes12"
          },
          {
            "internalType": "bytes32",
            "name": "payloadHash",
            "type": "bytes32"
          },
          {
            "internalType": "string",
            "name": "ownerKeyEnvelope",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "size",
            "type": "uint256"
          }
        ],
        "internalType": "struct ShieldDocs.DocumentInput",
        "name": "input",
        "type": "tuple"
      }
    ],
    "name": "updateDocumentPayload",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export const shieldDocsBytecode = "0x6080806040523460275760015f556001805560016002556001600355615e9e908161002c8239f35b5f80fdfe610100806040526004361015610013575f80fd5b5f3560e01c9081630d453efb146150565750806324a4293914614c125780632ed7150014614b5c5780633015394c14614a9d5780633f9b250a1461474c57806345c3c0ab1461452657806356f079f414614483578063579422f5146141ba5780635d12928b14613f905780635f603c7114613c7757806369ea9247146139e85780636b0aac3f14612cb75780638b8c3819146129e95780639f3bc1ce14612970578063abf439e6146128cd578063c3d84c5814612300578063c58343ef146120ce578063cb3ec96614612055578063d05a00cd14611fdc578063d31ecaa714611fbf578063d39f66e314611df5578063da60a41414611da6578063e1b97d6914611ad9578063e64e8a1114611a48578063e7fabe91146111c0578063e887319a14610f7c578063ecf7f7a9146107ff578063ef8239d214610513578063f499924b146104e3578063f783f5cd146103d65763ffb5e27614610172575f80fd5b346103d25760203660031901126103d2575f610140604051610193816151ec565b8281528260208201528260408201528260608201528260808201528260a08201528260c08201528260e082015260606101008201528261012082015201526004355f52600d60205260405f2060018060a01b0360028201541680156103c357604051916101ff836151ec565b805483526001810154916020840192835260408401908152600382015490606085019460018060a01b0383168652608081019261024260ff8260a01c1685615309565b60a082019160ff8260a81c161515835260c081016001600160401b038360b01c16815260ff60e083019360f01c161515835260405193610290856102898160048c0161527c565b0386615223565b61010083019485526005880154976101208401988952600681015497610140850198895260018060a01b03885116331415806103af575b6103a05760409b610363986001600160401b03966103369460018060a01b038451163314908161038d575b50610376575b8e519e8f9e8f92602084525160208401525191015260018060a01b0390511660608d015260018060a01b0390511660808c01525160a08b01906150ec565b51151560c0890152511660e0870152511515610100860152516101606101208601526101808501906150bb565b9151610140840152516101608301520390f35b8e51610383602082615223565b5f81528a526102f8565b610399915033906155e0565b155f6102f2565b63ea8e4eb560e01b5f5260045ffd5b508b516001600160a01b03163314156102c7565b631ab35caf60e21b5f5260045ffd5b5f80fd5b346103d25760203660031901126103d2576004355f818152600c60205260409020600101546001600160a01b0316156104d457805f52601060205260405f20604051610421816151d1565b81549060ff8216151581526001602082019361ffff8460081c1685526040830193828060a01b039060181c16845201549060608101918252845f52600c60205260018060a01b03600160405f20015416331415806104c0575b6103a05760a0945f52601260205261ffff60405f205494511692600180871b03905116905115159151926040519485526020850152604084015260608301526080820152f35b5082516001600160a01b031633141561047a565b63c037433960e01b5f5260045ffd5b346103d25760403660031901126103d25760206105096105016150a5565b60043561552e565b6040519015158152f35b346103d25760c03660031901126103d25760043561052f6150a5565b60443560058110156103d2576064359081151582036103d2576084356001600160401b03811681036103d25760a4356001600160401b0381116103d25761057a9036906004016150f9565b5f878152600c602052604090206001015490949193906001600160a01b0316156104d4575f878152600c60205260409020600101546001600160a01b031633036107f0576105c895876158b6565b60408051926105d78285615223565b6013845272111a5c9958dd081858d8d95cdcc819dc985b9d606a1b6020850152600354936106048561535a565b60035582519061061382615208565b8582526020820183815284830186815233606085019081529192919060808501906004825260a086019384524260c087019081525f8b8152600f602052899020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b81101561073d57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b0382116107dc576106d5826106cf8554615244565b856153d9565b602090601f83116001146107755791806107099260059695945f9261076a575b50508160011b915f199060031b1c19161790565b90555b5191015580610751575b8151338152906020945f80516020615e49833981519152848460048989970152a451908152f35b634e487b7160e01b5f52602160045260245ffd5b805f52600b60205261076584835f2061545f565b610716565b015190508b806106f5565b90601f19831691845f52815f20925f5b8181106107c45750916001939185600598979694106107ac575b505050811b01905561070c565b01515f1960f88460031b161c191690558a808061079f565b92936020600181928786015181550195019301610785565b634e487b7160e01b5f52604160045260245ffd5b63c5e0ae3f60e01b5f5260045ffd5b346103d25760803660031901126103d2576024356004356001600160401b0382116103d257608060031983360301126103d2576044359061ffff82168092036103d2576064356001600160a01b03811691908281036103d2575f828152600c60205260409020600101546001600160a01b0316156104d4575f828152600c60205260409020600101546001600160a01b031633036107f0578215610f6d57815f52600c60205260ff600f60405f20015416610f5e576040516108c0816151d1565b856004013581526108d360248701615520565b90602081019182526108e760448801615520565b96604082019788526064810135906001600160401b0382116103d25701366023820112156103d25761092560ff913690602460048201359101615315565b9760608301988952511660038103610f475750956020916109cd60ff809899606080604051610953816151d1565b5f81525f898201525f6040820152015251925116925160405192610976846151d1565b8352848301938452886040840160038152606085019283526040519a8b9687966313fce3b160e11b885260406004890152516044880152511660648601525116608484015251608060a484015260c48301906150bb565b33602483015203815f73ea30c4b8b44078bbf8a6ef5b9f1ec1626c7848d95af1938415610eb7575f94610f11575b50610a72939460209586604051610a128282615223565b5f81525f36813760405190610a28608083615223565b600382526060368484013784610a3d836154d3565b526003610a49836154e0565b525f610a54836154f0565b52604051631888debd60e01b81529889928392600360048501615d4a565b03815f73ea30c4b8b44078bbf8a6ef5b9f1ec1626c7848d95af1958615610eb7575f96610ee2575b50859281968215610ed2575b15610ec2575b60609360405197610abd868a615223565b60028952601f198601368b8b0137610ad4896154d3565b52610ade886154e0565b5287610b2c60405198610af1838b615223565b5f8a525f368137610b3e6040519a8b938493631888debd60e01b85526003600486015260126024860152608060448601526084850190615159565b83810360031901606485015290615159565b03815f73ea30c4b8b44078bbf8a6ef5b9f1ec1626c7848d95af1968715610eb7575f97610e86575b50610b9790610b7483615d08565b610b7d88615d08565b610b87338461583d565b610b91338961583d565b8761583d565b835f526011875260405f2055825f52601286528460405f2055604051610bbc816151d1565b600181526001878201838152610c3b6040840188815286850192428452885f5260108c52610bfd60405f2096511515879060ff801983541691151516179055565b5185549151610100600160b81b031990921660089190911b62ffff00161760a085901b8590039190911660181b6301000000600160b81b0316178455565b51910155604051610c4c8382615223565b602c81527f456e637279707465642073656c65637469766520646973636c6f737572652070878201526b1c9bdbd98818dc99585d195960a21b604082015260035492610c978461535a565b60035560405191610ca783615208565b8483528883018681525f604085019081523393850193845290929060808501906008825260a086019384524260c087019081525f898152600f8e5260409020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b81101561073d57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b0382116107dc57610d62826106cf8554615244565b8a90601f8311600114610e1c579180610d949260059695945f92610e115750508160011b915f199060031b1c19161790565b90555b5191015582610df8575b604051338152905f847fe6244565e1c70e23267b5a67b04e5e9d2082073a9d3df73445a1aa8a1b19c952945f80516020615e4983398151915260408660088d83990152a481519081528587820152a3604051908152f35b825f52600b8652610e0c8260405f2061545f565b610da1565b015190508d806106f5565b5f8481528c8120929190601f198516908e5b828210610e6e57505091600193918560059897969410610e56575b505050811b019055610d97565b01515f1960f88460031b161c191690558c8080610e49565b80600186978294978701518155019601940190610e2e565b9096508781813d8311610eb0575b610e9e8183615223565b810103126103d2575195610b97610b66565b503d610e94565b6040513d5f823e3d90fd5b9250610ecc615d7f565b92610aac565b9650610edc615d7f565b96610aa6565b9095508681813d8311610f0a575b610efa8183615223565b810103126103d257519487610a9a565b503d610ef0565b93506020843d602011610f3f575b81610f2c60209383615223565b810103126103d257610a729351936109fb565b3d9150610f1f565b6367cf307160e01b5f52600452600360245260445ffd5b636cbc149960e01b5f5260045ffd5b63e6c4247b60e01b5f5260045ffd5b346103d25760203660031901126103d2576004355f818152600c60205260409020600101546001600160a01b0316156104d4575f818152600c60205260409020600101546001600160a01b031633036107f0575f52600b60205260405f208054610fe5816154bc565b91610ff36040519384615223565b818352601f19611002836154bc565b015f5b81811061117e5750505f5b8281106110d257836040518091602082016020835281518091526040830190602060408260051b8601019301915f905b82821061104f57505050500390f35b919360019193955060208091603f1989820301855287519081518152828201518382015260408201516040820152848060a01b0360608301511660608201526110a06080830151608083019061518c565b60c0806110bc60a085015160e060a086015260e08501906150bb565b9301519101529601920192018594939192611040565b806110df60019284615436565b90549060031b1c5f52600f60205260405f2060056040519161110083615208565b805483528481015460208401526002810154604084015261113b60ff6003830154878060a01b038116606087015260a01c1660808501615514565b6040516111568161114f816004860161527c565b0382615223565b60a0840152015460c082015261116c8287615500565b526111778186615500565b5001611010565b60209060405161118d81615208565b5f81525f838201525f60408201525f60608201525f6080820152606060a08201525f60c082015282828801015201611005565b346103d25760403660031901126103d2576024356004356001600160401b0382116103d2578160040161016060031984360301126103d2575f828152600c60205260409020600101546001600160a01b0316156104d4575f828152600c60205260409020600101546001600160a01b031633036107f057815f52600c60205260ff600f60405f20015416610f5e5761125781615bb9565b815f52600c60205260405f209061126e818061537c565b60028401916001600160401b0382116107dc5761128f826106cf8554615244565b5f90601f83116001146119e4576112bc92915f91836117e55750508160011b915f199060031b1c19161790565b90555b6112cc602485018261537c565b60038401916001600160401b0382116107dc576112ed826106cf8554615244565b5f90601f83116001146119805761131a92915f91836117e55750508160011b915f199060031b1c19161790565b90555b61132a604485018261537c565b60048401916001600160401b0382116107dc5761134b826106cf8554615244565b5f90601f831160011461191c5761137892915f91836117e55750508160011b915f199060031b1c19161790565b90555b611388606485018261537c565b60058401916001600160401b0382116107dc576113a9826106cf8554615244565b5f90601f83116001146118b8576113d692915f91836117e55750508160011b915f199060031b1c19161790565b90555b608484013560028110156103d2576113f4906006840161541e565b61140160a485018261537c565b60078401916001600160401b0382116107dc57611422826106cf8554615244565b5f90601f83116001146118545761144f92915f91836117e55750508160011b915f199060031b1c19161790565b90555b61145f60c485018261537c565b60088401916001600160401b0382116107dc57611480826106cf8554615244565b5f90601f83116001146117f0576114ad92915f91836117e55750508160011b915f199060031b1c19161790565b90555b6114bc60e485016153ae565b600983019060a01c6001600160601b03198254161790556114ed6101246101048601359586600a860155018261537c565b600b8401916001600160401b0382116107dc5761150e826106cf8554615244565b5f90601f831160011461177c579180611541926115489695945f926117715750508160011b915f199060031b1c19161790565b9055615cda565b600c820155600e42910155604080516115618282615223565b601981527f456e63727970746564207061796c6f616420726f7461746564000000000000006020820152600354906115988261535a565b6003558251906115a782615208565b828252602082018581525f8584019081523360608501908152919291906080850190600280835260a087019485524260c088019081525f898152600f6020528a9020975188559551600188015590519086015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b81101561073d57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b0382116107dc57611665826106cf8554615244565b602090601f831160011461170a5791806116989260059695945f9261076a5750508160011b915f199060031b1c19161790565b90555b51910155826116f1575b81513381525f915f80516020615e4983398151915284836002602089960152a4519182527f3d879bdaecd18b757dd404fc9ec7f2a1f9e2077da1948181f1d38e2995bf150460203393a3005b825f52600b60205261170581835f2061545f565b6116a5565b90601f19831691845f52815f20925f5b818110611759575091600193918560059897969410611741575b505050811b01905561169b565b01515f1960f88460031b161c191690558a8080611734565b9293602060018192878601518155019501930161171a565b0135905089806106f5565b601f19831691845f5260205f20925f5b8181106117cd575091600193918561154898979694106117b4575b505050811b019055615cda565b01355f19600384901b60f8161c191690558880806117a7565b9193602060018192878701358155019501920161178c565b0135905088806106f5565b601f19831691845f5260205f20925f5b81811061183c5750908460019594939210611823575b505050811b0190556114b0565b01355f19600384901b60f8161c19169055878080611816565b91936020600181928787013581550195019201611800565b601f19831691845f5260205f20925f5b8181106118a05750908460019594939210611887575b505050811b019055611452565b01355f19600384901b60f8161c1916905587808061187a565b91936020600181928787013581550195019201611864565b601f19831691845f5260205f20925f5b81811061190457509084600195949392106118eb575b505050811b0190556113d9565b01355f19600384901b60f8161c191690558780806118de565b919360206001819287870135815501950192016118c8565b601f19831691845f5260205f20925f5b818110611968575090846001959493921061194f575b505050811b01905561137b565b01355f19600384901b60f8161c19169055878080611942565b9193602060018192878701358155019501920161192c565b601f19831691845f5260205f20925f5b8181106119cc57509084600195949392106119b3575b505050811b01905561131d565b01355f19600384901b60f8161c191690558780806119a6565b91936020600181928787013581550195019201611990565b601f19831691845f5260205f20925f5b818110611a305750908460019594939210611a17575b505050811b0190556112bf565b01355f19600384901b60f8161c19169055878080611a0a565b919360206001819287870135815501950192016119f4565b346103d25760203660031901126103d2576001600160a01b03611a6961508f565b163381036103a0575f52600860205260405f206040519081602082549182815201915f5260205f20905f5b818110611ac357611abf85611aab81870382615223565b604051918291602083526020830190615159565b0390f35b8254845260209093019260019283019201611a94565b346103d25760203660031901126103d2576004355f818152600d6020526040902060028101546001600160a01b031680156103c35733036107f057600381019081549060ff8260f01c16611d975760ff60f01b19909116600160f01b178255426006820155600481018054600192915f91611b5390615244565b601f8111611d78575b50550180546040908151611b708382615223565b601281527114195c9b5a5cdcda5bdb881c995d9bdad95960721b602082015260035490611b9c8261535a565b600355835190611bab82615208565b8282526020820184815285830189815233606085019081529192919060808501906006825260a086019384524260c087019081525f888152600f6020528a9020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b81101561073d57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b0382116107dc57611c67826106cf8554615244565b602090601f8311600114611d11579180611c9a9260059695945f92610e115750508160011b915f199060031b1c19161790565b90555b5191015581611cf8575b8251338152869381600660205f80516020615e49833981519152940152a45490546001600160a01b0316917fd2ba3a3435b2cf3d7fc56557f43627b4c46c251aae1e05868586ebcb52a511f15f80a4005b815f52600b602052611d0c81845f2061545f565b611ca7565b90601f19831691845f52815f20925f5b818110611d60575091600193918560059897969410611d48575b505050811b019055611c9d565b01515f1960f88460031b161c191690558c8080611d3b565b92936020600181928786015181550195019301611d21565b81835260208320611d9191601f0160051c8101906153c3565b86611b5c565b631769960560e31b5f5260045ffd5b346103d25760203660031901126103d2576004355f908152600d6020526040902060028101546001600160a01b0316156103c3576003810154602091610509916001600160a01b0316906155e0565b346103d25760203660031901126103d2576004355f818152600c60205260409020600101546001600160a01b0316156104d4575f818152600c6020526040902060018101546001600160a01b031691338314159081611fac575b506103a057805490600681015460ff16600a82015491600c810154600d82015490600e83015492600f81015460ff169460405180806002850190611e929161527c565b03611e9d9082615223565b60405180611eae816003870161527c565b03611eb99082615223565b6040519081611ecb816004880161527c565b03611ed69083615223565b6040519283611ee8816005890161527c565b03611ef39085615223565b60405180600881980190611f069161527c565b03611f119087615223565b6040519c8d9c8d5260208d015260408c016101a090526101a08c01611f35916150bb565b8b810360608d0152611f46916150bb565b8a810360808c0152611f57916150bb565b89810360a08b0152611f68916150bb565b9060c08901611f76916150df565b87810360e0890152611f87916150bb565b9461010087015261012086015261014085015261016084015215156101808301520390f35b611fb89150339061552e565b1583611e4f565b346103d2575f3660031901126103d2576020604051620180008152f35b346103d25760203660031901126103d2576001600160a01b03611ffd61508f565b163381036103a0575f52600660205260405f206040519081602082549182815201915f5260205f20905f5b81811061203f57611abf85611aab81870382615223565b8254845260209093019260019283019201612028565b346103d25760203660031901126103d2576001600160a01b0361207661508f565b163381036103a0575f52600760205260405f206040519081602082549182815201915f5260205f20905f5b8181106120b857611abf85611aab81870382615223565b82548452602090930192600192830192016120a1565b346103d25760203660031901126103d2575f6101406040516120ef816151ec565b828152826020820152826040820152826060820152826080820152606060a0820152606060c08201528260e0820152826101008201528261012082015201526004355f52600e60205260405f20604051612148816151ec565b8154815260018201546020820190815260028301546001600160a01b03908116604084019081526003850154918216606085019081529294909260808501926121979060a01c60ff1684615309565b604051936121ac85610289816004870161527c565b60a08601948552604051906121cf826121c8816005880161527c565b0383615223565b60c0870191825260ff6006850154169560e0880196600481101561073d578752600785015497610100810198895260096008870154966101208301978852015496610140820197885260018060a01b03845116156122f15783516001600160a01b0316331415806122dd575b6103a0576122b09561229d9461228993604080519e8f92602084525160208401525191015260018060a01b0390511660608d015260018060a01b0390511660808c01525160a08b01906150ec565b5161016060c08a01526101808901906150bb565b9051878203601f190160e08901526150bb565b925193600485101561073d5785946101008601525161012085015251610140840152516101608301520390f35b5085516001600160a01b031633141561223b565b631a4b4c0360e11b5f5260045ffd5b346103d25760803660031901126103d25760043560243560058110156103d2576044356001600160401b0381116103d25761233f9036906004016150f9565b6064929192356001600160401b0381116103d2576123619036906004016150f9565b5f868152600c602052604090206001015490949192906001600160a01b0316156104d457855f52600c60205260405f2060ff600f82015416610f5e5760010180546001600160a01b031633146103a05781156128be5785156128be57600254956123ca8761535a565b60025560018060a01b0382541687604051926123e5846151ec565b81845260208401908b825260408501938452606085019033825261242b608087019a6124118d8d615309565b61241c368b8d615315565b9260a089019384523691615315565b60c087019081525f60e08801818152426101008a019081526101208a018381526101408b01848152988452600e602052604090932099518a55955160018a015596516002890180546001600160a01b03199081166001600160a01b0393841617909155945160038a01805490961691161784559a51959a9395909290600581101561073d576124b991615498565b51805160048701916001600160401b0382116107dc576124dd826106cf8554615244565b602090601f831160011461285b5761250b92915f91836128505750508160011b915f199060031b1c19161790565b90555b51805160058601916001600160401b0382116107dc57612532826106cf8554615244565b602090601f83116001146127ed5761256092915f91836127e25750508160011b915f199060031b1c19161790565b90555b60068401975192600484101561073d576125e59860099460ff801983541691161790555160078501555160088401555191015560018060a01b039054165f5260076020526125b48560405f2061545f565b335f5260086020526125c98560405f2061545f565b855f52600a6020526125de8560405f2061545f565b3691615315565b92600354936125f38561535a565b6003556040519061260382615208565b858252602082018381525f604084019081523360608501908152919291906080850190600380835260a087019485524260c088019081525f8c8152600f60205260409020975188559551600188015590516002870155915191850180546001600160a01b0319166001600160a01b039390931692909217825551600b81101561073d57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b0382116107dc576126c2826106cf8554615244565b602090601f831160011461277b5791806126f59260059695945f9261076a5750508160011b915f199060031b1c19161790565b90555b5191015580612761575b60405133815293815f915f80516020615e4983398151915260408860036020809b0152a461273360405180936150ec565b827f225bf23b3e478c1cfc6d15096209305708f3b44320bf5680ab861f6d66dc5d36853394a4604051908152f35b805f52600b6020526127768460405f2061545f565b612702565b90601f19831691845f52815f20925f5b8181106127ca5750916001939185600598979694106127b2575b505050811b0190556126f8565b01515f1960f88460031b161c191690558a80806127a5565b9293602060018192878601518155019501930161278b565b015190508f806106f5565b90601f19831691845f52815f20925f5b8181106128385750908460019594939210612820575b505050811b019055612563565b01515f1960f88460031b161c191690558e8080612813565b929360206001819287860151815501950193016127fd565b015190505f806106f5565b90601f19831691845f52815f20925f5b8181106128a6575090846001959493921061288e575b505050811b01905561250e565b01515f1960f88460031b161c191690558f8080612881565b9293602060018192878601518155019501930161286b565b630103b55560e71b5f5260045ffd5b346103d25760203660031901126103d2576004355f818152600c60205260409020600101546001600160a01b0316156104d4575f818152600c60205260409020600101546001600160a01b031633036107f0575f52600960205260405f206040519081602082549182815201915f5260205f20905f5b81811061295a57611abf85611aab81870382615223565b8254845260209093019260019283019201612943565b346103d25760203660031901126103d2576001600160a01b0361299161508f565b163381036103a0575f52600560205260405f206040519081602082549182815201915f5260205f20905f5b8181106129d357611abf85611aab81870382615223565b82548452602090930192600192830192016129bc565b346103d25760203660031901126103d2576004355f818152600c60205260409020600101546001600160a01b0316156104d457805f52601060205260405f2060405190612a35826151d1565b80549160ff831615906060600183159586845261ffff8160081c166020850152818060a01b039060181c1694856040850152015491015291612c85575b506103a05760405190612a86606083615223565b602182527f53656c65637469766520646973636c6f737572652070726f6f662076696577656020830152601960fa1b604083015260035491612ac78361535a565b60035560405190612ad782615208565b838252602082018381525f6040840190815233606085019081529192919060808501906009825260a086019384524260c087019081525f898152600f60205260409020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b81101561073d57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b0382116107dc57612b96826106cf8554615244565b602090601f8311600114612c1e579180612bc99260059695945f92612c135750508160011b915f199060031b1c19161790565b90555b5191015580612bf9575b604051338152915f80516020615e49833981519152604084600960205f970152a4005b805f52600b602052612c0e8260405f2061545f565b612bd6565b0151905089806106f5565b90601f19831691845f52815f20925f5b818110612c6d575091600193918560059897969410612c55575b505050811b019055612bcc565b01515f1960f88460031b161c19169055888080612c48565b92936020600181928786015181550195019301612c2e565b905033141580612c96575b82612a72565b50805f52600c60205260018060a01b03600160405f20015416331415612c90565b346103d25760203660031901126103d2576001600160401b03600435116103d257610160600435360360031901126103d257612cf7600435600401615bb9565b335f52600460205260ff60405f205416156137d2575b5f5460c052612d1d60c05161535a565b5f55612d2d60048035018061537c565b60e052612d4460246004350160043560040161537c565b90612d5960446004350160043560040161537c565b90612d6e60646004350160043560040161537c565b9060026084600435013510156103d257612d906004803560a48101910161537c565b91909260043560c40160043560040190612da99161537c565b95909660043560e401612dbb906153ae565b98612dcf600480356101248101910161537c565b9b909c600435600401612de190615cda565b60805260405160a05260a051612df6906151b5565b60c05160a051523360a051602001523660e051612e1292615315565b60a051604001523690612e2492615315565b60a051606001523690612e3692615315565b60a051608001523690612e4892615315565b60a05160a001526004356084013560a05160c00190612e66916152fd565b3690612e7192615315565b60a05160e001523690612e8392615315565b60a05161010001526001600160601b0360a01b1660a0516101200152600435610104013560a05161014001523690612eba92615315565b60a051610160015260805160a05161018001524260a0516101a001524260a0516101c0015260a0516101e0015f905260c0515f52600c60205260405f2060a051518155600160a01b6001900360a05160200151166001820190600160a01b60019003166001600160601b0360a01b82541617905560a051604001518051906001600160401b0382116107dc57612f6082612f576002860154615244565b600286016153d9565b602090601f831160011461376557612f8e92915f918361375a5750508160011b915f199060031b1c19161790565b60028201555b6003810190606060a05101519182516001600160401b0381116107dc57612fc581612fbf8454615244565b846153d9565b6020601f82116001146136f9578190612ff49394955f9261356a5750508160011b915f199060031b1c19161790565b90555b6004810190608060a05101519182516001600160401b0381116107dc5761302281612fbf8454615244565b6020601f82116001146136985781906130519394955f9261356a5750508160011b915f199060031b1c19161790565b90555b600581019060a0805101519182516001600160401b0381116107dc5761307e81612fbf8454615244565b6020601f82116001146136375781906130ad9394955f9261356a5750508160011b915f199060031b1c19161790565b90555b60c060a0510151600281101561073d576130cd906006830161541e565b600781019060e060a05101519182516001600160401b0381116107dc576130f881612fbf8454615244565b6020601f82116001146135d65781906131279394955f9261356a5750508160011b915f199060031b1c19161790565b90555b600881019061010060a05101519182516001600160401b0381116107dc5761315681612fbf8454615244565b6020601f82116001146135755781906131859394955f9261356a5750508160011b915f199060031b1c19161790565b90555b60a080516101208101516009840180546bffffffffffffffffffffffff19169190931c17909155610140810151600a830155610160015180519190600b8201906001600160401b0384116107dc576131e484612fbf8454615244565b602090601f85116001146135045793806132169261325f965f926134f95750508160011b915f199060031b1c19161790565b90555b61018060a0510151600c8201556101a060a0510151600d8201556101c060a0510151600e820155600f6101e060a0510151151591019060ff801983541691151516179055565b335f52600560205261327660c05160405f2061545f565b60606040516132858282615223565b602281527f456e6372797074656420646f63756d656e74207365616c6564206f6e2063686160208201526134b760f11b6040820152600354906132c78261535a565b600355604051906132d782615208565b82825260c051602083019081525f6040840190815233868501908152919291906080850190600180835260a087019485524260c088019081525f898152600f602052604090209751885595519087015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b81101561073d57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b0382116107dc57613398826106cf8554615244565b602090601f83116001146134925791806133cb9260059695945f92612c135750508160011b915f199060031b1c19161790565b90555b5191015560c051613476575b6040513381525f91600160208301525f80516020615e49833981519152604060c05193a47f659ae396beda17ddacec30e2b6a7c4505beef74802bd3c1801eeaa541521b49961342d60048035018061537c565b9190826040519160408352816040840152858301375f8484830101526101046004350135602082015233938160c05194601f80199101168101030190a3602060405160c0518152f35b60c0515f52600b60205261348d8160405f2061545f565b6133da565b90601f19831691845f52815f20925f5b8181106134e15750916001939185600598979694106134c9575b505050811b0190556133ce565b01515f1960f88460031b161c191690558880806134bc565b929360206001819287860151815501950193016134a2565b0151905086806106f5565b90601f19851691835f52815f20925f5b818110613552575091600193918761325f98941061353a575b505050811b019055613219565b01515f1960f88460031b161c1916905585808061352d565b92936020600181928786015181550195019301613514565b0151905085806106f5565b601f19821690835f52805f20915f5b8181106135be575095836001959697106135a6575b505050811b019055613188565b01515f1960f88460031b161c19169055848080613599565b9192602060018192868b015181550194019201613584565b601f19821690835f52805f20915f5b81811061361f57509583600195969710613607575b505050811b01905561312a565b01515f1960f88460031b161c191690558480806135fa565b9192602060018192868b0151815501940192016135e5565b601f19821690835f52805f20915f5b81811061368057509583600195969710613668575b505050811b0190556130b0565b01515f1960f88460031b161c1916905584808061365b565b9192602060018192868b015181550194019201613646565b601f19821690835f52805f20915f5b8181106136e1575095836001959697106136c9575b505050811b019055613054565b01515f1960f88460031b161c191690558480806136bc565b9192602060018192868b0151815501940192016136a7565b601f19821690835f52805f20915f5b8181106137425750958360019596971061372a575b505050811b019055612ff7565b01515f1960f88460031b161c1916905584808061371d565b9192602060018192868b015181550194019201613708565b0151905084806106f5565b9190600284015f52805f20905f935b601f19841685106137b7576001945083601f1981161061379f575b505050811b016002820155612f94565b01515f1960f88460031b161c1916905583808061378f565b81810151835560209485019460019093019290910190613774565b335f52600460205260405f20600160ff19825416179055604080516137f78282615223565b601b81527f5661756c742063726561746564206175746f6d61746963616c6c79000000000060208201526003549061382e8261535a565b60035582519061383d82615208565b8282525f60208301818152858401918252336060850190815290929160808501905f80835260a087019485524260c08801908152888252600f60205290899020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b81101561073d57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b0382116107dc576138f9826106cf8554615244565b602090601f831160011461398157918061392c9260059695945f92612c135750508160011b915f199060031b1c19161790565b90555b5191015581513381525f915f80516020615e49833981519152848385602081960152a4514281527fa510df27d6e51efd91d3f55722bad1f26bf924a63e5dcee07c2ab4c3d4992dcc60203392a2612d0d565b90601f19831691845f52815f20925f5b8181106139d05750916001939185600598979694106139b8575b505050811b01905561392f565b01515f1960f88460031b161c191690558880806139ab565b92936020600181928786015181550195019301613991565b346103d25760203660031901126103d2576004355f818152600c60205260409020600101546001600160a01b0316156104d4575f818152600c60205260409020600101546001600160a01b031633036107f0575f818152600c602052604090819020600f8101805460ff1916600117905542600e90910155805190613a6d8183615223565b6011825270111bd8dd5b595b9d08185c98da1a5d9959607a1b602083015260035491613a988361535a565b600355815190613aa782615208565b838252602082018581525f8484019081523360608501908152919291906080850190600a825260a086019384524260c087019081525f898152600f602052889020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b81101561073d57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b0382116107dc57613b64826106cf8554615244565b602090601f8311600114613c10579180613b979260059695945f92613c055750508160011b915f199060031b1c19161790565b90555b5191015582613bec575b8051338152915f80516020615e49833981519152849284600a60205f970152a433907fc7a48851f43b41aef9785f0be9f7abfc1dd97ed30261a5991f1dc74003474bc85f80a3005b825f52600b602052613c0082825f2061545f565b613ba4565b015190508a806106f5565b90601f19831691845f52815f20925f5b818110613c5f575091600193918560059897969410613c47575b505050811b019055613b9a565b01515f1960f88460031b161c19169055898080613c3a565b92936020600181928786015181550195019301613c20565b346103d25760803660031901126103d2576024356004356001600160401b03821682036103d2576044359081151582036103d2576064356001600160401b0381116103d257613cca9036906004016150f9565b5f838152600e60205260409020600281015490949291906001600160a01b031680156122f15733036107f057600685019160ff835416600481101561073d57613f8157600991613d3a91600188019889549660038a019788549060ff8260a01c169160018060a01b0316906158b6565b948592600160ff1982541617905542600882015501558354604092835191613d628584615223565b601083526f14995c5d595cdd08185c1c1c9bdd995960821b602084015260035492613d8c8461535a565b600355855190613d9b82615208565b8482526020820183815287830189815233606085019081529192919060808501906004825260a086019384524260c087019081525f8a8152600f6020528c9020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b81101561073d57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b0382116107dc57613e57826106cf8554615244565b602090601f8311600114613f1a579180613e8a9260059695945f92613f0f5750508160011b915f199060031b1c19161790565b90555b5191015580613ef6575b845133815292602097877f34246d6a687ed0f105bff790faf1870be323147cef0ae03c617295a4e0a8c005938a935f80516020615e498339815191528a89600488879c0152a454945486516001600160a01b039091168152a451908152f35b805f52600b602052613f0a83865f2061545f565b613e97565b015190508e806106f5565b90601f19831691845f52815f20925f5b818110613f69575091600193918560059897969410613f51575b505050811b019055613e8d565b01515f1960f88460031b161c191690558d8080613f44565b92936020600181928786015181550195019301613f2a565b637f899aa760e11b5f5260045ffd5b346103d2575f3660031901126103d257335f52600460205260ff60405f20541615613fb757005b335f52600460205260405f20600160ff1982541617905560408051613fdc8282615223565b600d81526c15985d5b1d0818dc99585d1959609a1b6020820152600354906140038261535a565b60035582519061401282615208565b8282525f60208301818152858401918252336060850190815290929160808501905f80835260a087019485524260c08801908152888252600f60205290899020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b81101561073d57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b0382116107dc576140ce826106cf8554615244565b602090601f83116001146141535791806141019260059695945f92612c135750508160011b915f199060031b1c19161790565b90555b5191015581513381525f915f80516020615e49833981519152848385602081960152a4514281527fa510df27d6e51efd91d3f55722bad1f26bf924a63e5dcee07c2ab4c3d4992dcc60203392a2005b90601f19831691845f52815f20925f5b8181106141a257509160019391856005989796941061418a575b505050811b019055614104565b01515f1960f88460031b161c1916905588808061417d565b92936020600181928786015181550195019301614163565b346103d25760403660031901126103d2576004356141d66150a5565b5f828152600c60205260409020600101546001600160a01b0316156104d4575f828152600c60205260409020600101546001600160a01b031633036107f0576001600160a01b03811615610f6d57815f52601060205260ff60405f205416156103a05761428990825f5260126020526142538160405f205461583d565b5f83815260106020526040902080546301000000600160b81b03191660189290921b6301000000600160b81b0316919091179055565b805f52601060205242600160405f20015560409081516142a98382615223565b6014815273141c9bdbd9881d9a595dd95c881d5c19185d195960621b6020820152600354906142d78261535a565b6003558351906142e682615208565b828252602082018481525f86840190815233606085019081529192919060808501906009825260a086019384524260c087019081525f888152600f6020528a9020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b81101561073d57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b0382116107dc576143a3826106cf8554615244565b602090601f831160011461441c5791806143d69260059695945f92613c055750508160011b915f199060031b1c19161790565b90555b5191015581614403575b82513381525f9381600960205f80516020615e49833981519152940152a4005b815f52600b60205261441781845f2061545f565b6143e3565b90601f19831691845f52815f20925f5b81811061446b575091600193918560059897969410614453575b505050811b0190556143d9565b01515f1960f88460031b161c19169055898080614446565b9293602060018192878601518155019501930161442c565b346103d25760203660031901126103d2576004355f818152600c60205260409020600101546001600160a01b0316156104d4575f818152600c60205260409020600101546001600160a01b031633036107f0575f52600a60205260405f206040519081602082549182815201915f5260205f20905f5b81811061451057611abf85611aab81870382615223565b82548452602090930192600192830192016144f9565b346103d25761453436615126565b825f93929352600d60205260405f2061454d33826155e0565b15611d975760016145649101938454923691615315565b90600354916145728361535a565b6003556040519061458282615208565b838252602082018381526040830186815233606085019081529192919060808501906007825260a086019384524260c087019081525f898152600f60205260409020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b81101561073d57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b0382116107dc57614640826106cf8554615244565b602090601f83116001146146e55791806146739260059695945f9261076a5750508160011b915f199060031b1c19161790565b90555b51910155806146cb575b604051338152915f80516020615e498339815191526040846007602088970152a4339154907f9d71a02fe53bc9c4008286802e8888c5db06988a8ed24174c377e0e5b9dc1e935f80a4005b805f52600b6020526146e08260405f2061545f565b614680565b90601f19831691845f52815f20925f5b81811061473457509160019391856005989796941061471c575b505050811b019055614676565b01515f1960f88460031b161c191690558a808061470f565b929360206001819287860151815501950193016146f5565b346103d25760203660031901126103d2576004355f6101e0604051614770816151b5565b8281528260208201526060604082015260608082015260606080820152606060a08201528260c0820152606060e082015260606101008201528261012082015282610140820152606061016082015282610180820152826101a0820152826101c08201520152805f52600c60205260018060a01b03600160405f20015416156104d4575f818152600c60205260409020600101546001600160a01b031633036107f0575f52600c60205260405f2060ff600f6040519261482f846151b5565b8054845260018101546001600160a01b0316602085015260405161485a8161114f816002860161527c565b60408501526040516148738161114f816003860161527c565b606085015260405161488c8161114f816004860161527c565b60808501526040516148a58161114f816005860161527c565b60a08501526148bd8360068301541660c086016152fd565b6040516148d18161114f816007860161527c565b60e08501526040516148ea8161114f816008860161527c565b610100850152600981015460a01b6001600160601b0360a01b16610120850152600a8101546101408501526040516149298161114f81600b860161527c565b610160850152600c810154610180850152600d8101546101a0850152600e8101546101c085015201541615156101e08201526040518091602082528051602083015260018060a01b0360208201511660408301526101e0614a6c614a30614a186149ef6149d96149c36149ad604089015161020060608c01526102208b01906150bb565b60608901518a8203601f190160808c01526150bb565b6080880151898203601f190160a08b01526150bb565b60a0870151888203601f190160c08a01526150bb565b614a0160c087015160e08901906150df565b60e0860151878203601f19016101008901526150bb565b610100850151868203601f19016101208801526150bb565b6001600160601b0360a01b61012085015116610140860152610140840151610160860152610160840151601f19868303016101808701526150bb565b916101808101516101a08501526101a08101516101c08501526101c081015182850152015115156102008301520390f35b346103d25760203660031901126103d2576004355f908152600e6020526040902060028101546001600160a01b0316156122f15760038101546001600160a01b03163303614b4d576006810160ff815416600481101561073d57613f8157614b4b91600191600360ff19825416179055426008820155015460405190614b24604083615223565b601382527214995c5d595cdd195c8818d85b98d95b1b1959606a1b60208301523390615671565b005b6371ced2cf60e11b5f5260045ffd5b346103d257614b6a36615126565b5f838152600e602052604090206002810154909291906001600160a01b031680156122f15733036107f057600683019060ff825416600481101561073d57613f8157614bdb91600260ff19825416179055426008850155614bd360018501938454923691615315565b903390615671565b546003909101546001600160a01b0316917fb14ccaa663dadced73f667574cce8204a30355ab0dbcc7cb474eb1bd2d298e5d5f80a4005b346103d25760203660031901126103d2575f610260604051614c3381615199565b8281528260208201526060604082015260608082015260606080820152606060a08201528260c0820152606060e082015260606101008201528261012082015282610140820152606061016082015282610180820152826101a0820152826101c0820152826101e082015282610200820152826102208201528261024082015201526004355f52600d60205260405f2060018060a01b03600282015416156103c357614cdf33826155e0565b15611d975760018101545f52600c60205260405f20805491600160a01b6001900360018301541691600681015460ff1691600982015460a01b90600a83015490600c84015490600d85015492600e86015494600f87015460ff169683549860038501549a6040519c614d508e615199565b8d5260208d015260405180614d68816002860161527c565b03614d739082615223565b60408d015260405180806003850190614d8b9161527c565b03614d969082615223565b60608d015260405180614dac816004860161527c565b03614db79082615223565b60808d015260405180614dcd816005860161527c565b03614dd89082615223565b60a08d0152614dea9060c08d016152fd565b60405180614dfb816007850161527c565b03614e069082615223565b60e08c015260405180600881930190614e1e9161527c565b03614e299082615223565b6101008b01526001600160a01b0319166101208a0152610140890152604051908190614e5990829060040161527c565b03614e649082615223565b6101608801526101808701526101a08601526101c085015215156101e0840152610200830152614e9f60ff60a083901c166102208401615309565b8060a81c60ff16151561024083015260b01c6001600160401b031661026082015260405180916020825280516020830152600160a01b60019003602082015116604083015260408101516060830161028090526102a08301614f00916150bb565b6060820151838203601f19016080850152614f1b91906150bb565b6080820151838203601f190160a0850152614f3691906150bb565b60a0820151838203601f190160c0850152614f5191906150bb565b60c082015160e08401614f63916150df565b60e0820151838203601f1901610100850152614f7f91906150bb565b610100820151838203601f1901610120850152614f9c91906150bb565b6001600160601b0360a01b6101208301511661014084015261014082015161016084015261016082015190601f1984820301610180850152614fdd916150bb565b906101808101516101a08401526101a08101516101c08401526101c08101516101e08401526101e081015115156102008401526102008101516102208401526102208101516102408401615030916150ec565b610240810151151561026084015261026001516001600160401b03166102808301520390f35b346103d25760203660031901126103d2576020906001600160a01b0361507a61508f565b165f526004825260ff60405f20541615158152f35b600435906001600160a01b03821682036103d257565b602435906001600160a01b03821682036103d257565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b90600282101561073d5752565b90600582101561073d5752565b9181601f840112156103d2578235916001600160401b0383116103d257602083818601950101116103d257565b9060406003198301126103d25760043591602435906001600160401b0382116103d257615155916004016150f9565b9091565b90602080835192838152019201905f5b8181106151765750505090565b8251845260209384019390920191600101615169565b90600b82101561073d5752565b61028081019081106001600160401b038211176107dc57604052565b61020081019081106001600160401b038211176107dc57604052565b608081019081106001600160401b038211176107dc57604052565b61016081019081106001600160401b038211176107dc57604052565b60e081019081106001600160401b038211176107dc57604052565b90601f801991011681019081106001600160401b038211176107dc57604052565b90600182811c92168015615272575b602083101461525e57565b634e487b7160e01b5f52602260045260245ffd5b91607f1691615253565b5f929181549161528b83615244565b80835292600181169081156152e057506001146152a757505050565b5f9081526020812093945091925b8383106152c6575060209250010190565b6001816020929493945483858701015201910191906152b5565b915050602093945060ff929192191683830152151560051b010190565b600282101561073d5752565b600582101561073d5752565b9291926001600160401b0382116107dc576040519161533e601f8201601f191660200184615223565b8294818452818301116103d2578281602093845f960137010152565b5f1981146153685760010190565b634e487b7160e01b5f52601160045260245ffd5b903590601e19813603018212156103d257018035906001600160401b0382116103d2576020019181360383136103d257565b356001600160a01b0319811681036103d25790565b8181106153ce575050565b5f81556001016153c3565b9190601f81116153e857505050565b615412925f5260205f20906020601f840160051c83019310615414575b601f0160051c01906153c3565b565b9091508190615405565b90600281101561073d5760ff80198354169116179055565b805482101561544b575f5260205f2001905f90565b634e487b7160e01b5f52603260045260245ffd5b8054680100000000000000008110156107dc5761548191600182018155615436565b819291549060031b91821b915f19901b1916179055565b90600581101561073d57815460ff60a01b191660a09190911b60ff60a01b16179055565b6001600160401b0381116107dc5760051b60200190565b80511561544b5760200190565b80516001101561544b5760400190565b80516002101561544b5760600190565b805182101561544b5760209160051b010190565b600b82101561073d5752565b359060ff821682036103d257565b5f818152600c60205260409020600101549091906001600160a01b0316156104d4576155599161555c565b90565b5f818152600c60205260409020600101546001600160a01b038381169116146155d9575f52600960205260405f205f918154925b83811061559f57505050505f90565b6155a98184615436565b90549060031b1c5f52600d6020526155c48260405f206155e0565b6155d057600101615590565b50505050600190565b5050600190565b60028101546001600160a01b031615159182615656575b5081615643575b81615629575b8161560d575090565b6001915001545f52600c60205260ff600f60405f200154161590565b600381015460b01c6001600160401b031642109150615604565b600381015460f01c60ff161591506155fe565b60038201546001600160a01b0391821691161491505f6155f7565b9091600354906156808261535a565b6003556040519061569082615208565b828252602082018481525f604084019081526001600160a01b0390961660608401818152909691929160808501906005825260a086019384524260c087019081525f888152600f60205260409020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b81101561073d57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b0382116107dc5761575a826106cf8554615244565b602090601f83116001146157d657918061578d9260059695945f926128505750508160011b915f199060031b1c19161790565b90555b51910155816157bc575b6040519283525f80516020615e49833981519152604084600560205f970152a4565b815f52600b6020526157d18160405f2061545f565b61579a565b90601f19831691845f52815f20925f5b81811061582557509160019391856005989796941061580d575b505050811b019055615790565b01515f1960f88460031b161c191690555f8080615800565b929360206001819287860151815501950193016157e6565b73ea30c4b8b44078bbf8a6ef5b9f1ec1626c7848d93b156103d257604051631974142760e21b815260048101919091526001600160a01b0390911660248201525f8180604481015b03818373ea30c4b8b44078bbf8a6ef5b9f1ec1626c7848d95af18015610eb7576158ac5750565b5f61541291615223565b939496959096929192845f52600c60205260405f2095600187019860018060a01b038a54169788156104d457600f015460ff16610f5e576001600160a01b0316968715908115615baf575b50610f6d576001600160401b03169242841115615ba15782156128be576001549461592b8661535a565b600155859960018060a01b039054169160405194615948866151ec565b87865260208601948986526040870194855260608701928b8452615970608089019586615309565b60a08801901515815261599360c08901928a845260e08a01945f86523691615315565b6101008901908152426101208a019081525f6101408b018181528d8252600d60205260409091209a518b55985160018b0155965160028a0180546001600160a01b03199081166001600160a01b0393841617909155955160038b01805490971691161785559451600581101561073d57615a0d9085615498565b5183549151925169ffffffffffffffffffff60a81b1990921690151560a81b60ff60a81b161760b09290921b67ffffffffffffffff60b01b169190911790151560f01b60ff60f01b1617905551805160048501916001600160401b0382116107dc57615a7d826106cf8554615244565b602090601f8311600114615b145792615ad6837f3d496924eaca2c40f67d1643057731c58b5f24a0f38f7808fea610bcabd4297199979460209997946006975f926128505750508160011b915f199060031b1c19161790565b90555b51600584015551910155845f5260098252615af78460405f2061545f565b855f5260068252615b0b8460405f2061545f565b604051908152a4565b90601f19831691845f52815f20925f5b818110615b89575093602098969360069693600193837f3d496924eaca2c40f67d1643057731c58b5f24a0f38f7808fea610bcabd429719d9b9810615b71575b505050811b019055615ad9565b01515f1960f88460031b161c191690555f8080615b64565b92936020600181928786015181550195019301615b24565b62d36c8560e81b5f5260045ffd5b905087145f615901565b615bc3818061537c565b9050156128be57615bd7602082018261537c565b9050156128be57615beb604082018261537c565b9050156128be57615bff606082018261537c565b9050156128be57615c1461012082018261537c565b9050156128be57608081013560028110156103d257615ca75760a08101615c3b818361537c565b9050156128be5762018000615c50828461537c565b905011615c9857610140820135908115159283615c80575b505050615c7157565b633ef7de5560e21b5f5260045ffd5b615c8b92935061537c565b91905014155f8080615c68565b63492f620d60e01b5f5260045ffd5b615cb460c082018261537c565b9050156128be57615cc860a082018261537c565b9050615c7157610140013515615c7157565b608081013560028110156103d25715615cf557610140013590565b8060a0615d0392019061537c565b905090565b73ea30c4b8b44078bbf8a6ef5b9f1ec1626c7848d93b156103d257604051631974142760e21b815260048101919091523060248201525f818060448101615885565b91615d719060ff6155599593168452601a6020850152608060408501526080840190615159565b916060818403910152615159565b6020615df281604051615d928282615223565b5f81525f36813760405190615da8608083615223565b60038252606036848401375f615dbd836154d3565b526003615dc9836154e0565b525f615dd4836154f0565b52604051631888debd60e01b81529384928392600360048501615d4a565b03815f73ea30c4b8b44078bbf8a6ef5b9f1ec1626c7848d95af1918215610eb7575f92615e1e57505090565b90809250813d8311615e41575b615e358183615223565b810103126103d2575190565b503d615e2b56fe29f0115e94a047807998c437133d5afe9862520aada511bac03259cecb04522ca2646970667358221220f23f126a46691415d789e84d907d7a33996de01ab3857384b5ffe51ab72ba07664736f6c634300081a0033" as const;
