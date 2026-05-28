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
    "name": "FieldTooLong",
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
    "name": "InvalidIv",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidPayloadHash",
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

export const shieldDocsBytecode = "0x6080806040523460275760015f556001805560016002556001600355615994908161002c8239f35b5f80fdfe610100806040526004361015610013575f80fd5b5f3560e01c9081630d453efb146145135750806324a42939146140b55780632ed7150014613ff65780633015394c14613f395780633f9b250a14613bed57806345c3c0ab146139cb57806356f079f414613928578063579422f5146138305780635d12928b146137a65780635f603c711461364857806369ea9247146133c65780636b0aac3f146128965780638b8c3819146127875780639f3bc1ce1461270e578063abf439e61461266b578063c3d84c58146120a4578063c58343ef14611e72578063cb3ec96614611df9578063d05a00cd14611d80578063d31ecaa714611d63578063d39f66e314611b99578063da60a41414611b4a578063e1b97d691461188a578063e64e8a11146117f9578063e7fabe9114610fd3578063e887319a14610d8f578063ecf7f7a91461061e578063ef8239d214610515578063f499924b146104e5578063f783f5cd146103d85763ffb5e27614610172575f80fd5b346103d45760203660031901126103d4575f610140604051610193816146a9565b8281528260208201528260408201528260608201528260808201528260a08201528260c08201528260e082015260606101008201528261012082015201526004355f52600d60205260405f2060018060a01b036002820154169081156103c55760405190610200826146a9565b805482526001810154602083019081526040830193845260038201546001600160a01b03811660608501908152608085019390929161024660a082901c60ff16866147c8565b60a0860160ff8260a81c161515815260c087019060018060401b038360b01c16825260ff60e089019360f01c1615158352604051936102938561028c816004850161473b565b03866146e0565b61010089019485526005810154976101208a019889526006820154976101408b0198895260018060a01b038c5116331415806103b1575b6103a25760209b610365986103309460018060a01b038451163314908161038f575b50610378575b6040518e819f9e829f8352519101525160408d015260018060a01b0390511660608c015260018060a01b0390511660808b01525160a08a01906145a9565b51151560c0880152516001600160401b031660e087015251151561010086015251610160610120860152610180850190614578565b9151610140840152516101608301520390f35b6040516103858f826146e0565b5f815289526102f2565b61039b91503390614ad5565b155f6102ec565b63ea8e4eb560e01b5f5260045ffd5b5080516001600160a01b03163314156102ca565b631ab35caf60e21b5f5260045ffd5b5f80fd5b346103d45760203660031901126103d4576004355f818152600c60205260409020600101546001600160a01b0316156104d657805f52601060205260405f206040516104238161468e565b81549060ff8216151581526001602082019361ffff8460081c1685526040830193828060a01b039060181c16845201549060608101918252845f52600c60205260018060a01b03600160405f20015416331415806104c2575b6103a25760a0945f52601260205261ffff60405f205494511692600180871b03905116905115159151926040519485526020850152604084015260608301526080820152f35b5082516001600160a01b031633141561047c565b63c037433960e01b5f5260045ffd5b346103d45760403660031901126103d457602061050b610503614562565b600435614a23565b6040519015158152f35b346103d45760c03660031901126103d457600435610531614562565b9060443560058110156103d4576064359283151584036103d4576084356001600160401b03811681036103d45760a4356001600160401b0381116103d45761057d9036906004016145b6565b5f868152600c60205260409020600101549092906001600160a01b0316156104d6575f868152600c60205260409020600101546001600160a01b0316330361060f57602096610607956105d095886152d4565b91604051906105e06040836146e0565b6013825272111a5c9958dd081858d8d95cdcc819dc985b9d606a1b8583015283339161509c565b604051908152f35b63c5e0ae3f60e01b5f5260045ffd5b346103d45760803660031901126103d4576024356004356001600160401b0382116103d457608060031983360301126103d4576044359061ffff82168092036103d4576064356001600160a01b03811691908281036103d4575f828152600c60205260409020600101546001600160a01b0316156104d6575f828152600c60205260409020600101546001600160a01b0316330361060f578215610d8057815f52600c60205260ff600f60405f20015416610d71576040516106df8161468e565b856004013581526106f260248701614a15565b906020810191825261070660448801614a15565b60408201908152966064810135906001600160401b0382116103d45701366023820112156103d45761074460ff9136906024600482013591016147d4565b9760608301988952511660038103610d5a5750956020916107ec60ff8098996060806040516107728161468e565b5f81525f898201525f60408201520152519251169251604051926107958461468e565b8352848301938452886040840160038152606085019283526040519a8b9687966313fce3b160e11b885260406004890152516044880152511660648601525116608484015251608060a484015260c4830190614578565b33602483015203815f5f805160206158df8339815191525af1938415610cca575f94610d24575b5061088a93946020958660405161082a82826146e0565b5f81525f368137604051906108406080836146e0565b600382526060368484013784610855836149c8565b526003610861836149d5565b525f61086c836149e5565b52604051631888debd60e01b815298899283926003600485016157e7565b03815f5f805160206158df8339815191525af1958615610cca575f96610cf5575b50859281968215610ce5575b15610cd5575b606093604051976108ce868a6146e0565b60028952601f198601368b8b01376108e5896149c8565b526108ef886149d5565b528761093d60405198610902838b6146e0565b5f8a525f36813761094f6040519a8b938493631888debd60e01b85526003600486015260126024860152608060448601526084850190614616565b83810360031901606485015290614616565b03815f5f805160206158df8339815191525af1968715610cca575f97610c99575b506109a19061097e836157b2565b610987886157b2565b6109913384615274565b61099b3389615274565b87615274565b835f526011875260405f2055825f52601286528460405f20556040516109c68161468e565b600181526001878201838152610a2c6040840188815286850192428452885f5260108c52610a0760405f2096511515879060ff801983541691151516179055565b5162ffff0086549160081b169062ffff001916178555838060a01b0390511684614819565b51910155604051610a3d83826146e0565b602c81527f456e637279707465642073656c65637469766520646973636c6f737572652070878201526b1c9bdbd98818dc99585d195960a21b604082015260035492610a8884614842565b60035560405191610a98836146c5565b8483528883018681525f604085019081523393850193845290929060808501906008825260a086019384524260c087019081525f898152600f8e5260409020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b811015610be357815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c8557610b5982610b538554614703565b856148c1565b8a90601f8311600114610c1b579180610b7f9260059695945f92610c10575b5050614906565b90555b5191015582610bf7575b604051338152905f847fe6244565e1c70e23267b5a67b04e5e9d2082073a9d3df73445a1aa8a1b19c952945f8051602061591f83398151915260408660088d83990152a481519081528587820152a3604051908152f35b634e487b7160e01b5f52602160045260245ffd5b825f52600b8652610c0b8260405f20614959565b610b8c565b015190508d80610b78565b5f8481528c8120929190601f198516908e5b828210610c6d57505091600193918560059897969410610c55575b505050811b019055610b82565b01515f1960f88460031b161c191690558c8080610c48565b80600186978294978701518155019601940190610c2d565b634e487b7160e01b5f52604160045260245ffd5b9096508781813d8311610cc3575b610cb181836146e0565b810103126103d45751956109a1610970565b503d610ca7565b6040513d5f823e3d90fd5b9250610cdf61581c565b926108bd565b9650610cef61581c565b966108b7565b9095508681813d8311610d1d575b610d0d81836146e0565b810103126103d4575194876108ab565b503d610d03565b93506020843d602011610d52575b81610d3f602093836146e0565b810103126103d45761088a935193610813565b3d9150610d32565b6367cf307160e01b5f52600452600360245260445ffd5b636cbc149960e01b5f5260045ffd5b63e6c4247b60e01b5f5260045ffd5b346103d45760203660031901126103d4576004355f818152600c60205260409020600101546001600160a01b0316156104d6575f818152600c60205260409020600101546001600160a01b0316330361060f575f52600b60205260405f208054610df8816149b1565b91610e0660405193846146e0565b818352601f19610e15836149b1565b015f5b818110610f915750505f5b828110610ee557836040518091602082016020835281518091526040830190602060408260051b8601019301915f905b828210610e6257505050500390f35b919360019193955060208091603f1989820301855287519081518152828201518382015260408201516040820152848060a01b036060830151166060820152610eb360808301516080830190614649565b60c080610ecf60a085015160e060a086015260e0850190614578565b9301519101529601920192018594939192610e53565b80610ef260019284614930565b90549060031b1c5f52600f60205260405f20600560405191610f13836146c5565b8054835284810154602084015260028101546040840152610f4e60ff6003830154878060a01b038116606087015260a01c1660808501614a09565b604051610f6981610f62816004860161473b565b03826146e0565b60a0840152015460c0820152610f7f82876149f5565b52610f8a81866149f5565b5001610e23565b602090604051610fa0816146c5565b5f81525f838201525f60408201525f60608201525f6080820152606060a08201525f60c082015282828801015201610e18565b346103d45760403660031901126103d4576024356004356001600160401b0382116103d4578160040161016060031984360301126103d4575f828152600c60205260409020600101546001600160a01b0316156104d6575f828152600c60205260409020600101546001600160a01b0316330361060f57815f52600c60205260ff600f60405f20015416610d715761106a816155ee565b815f52600c60205260405f20906110818180614864565b60028401916001600160401b038211610c85576110a282610b538554614703565b5f90601f8311600114611795576110c292915f9183611596575050614906565b90555b6110d26024850182614864565b60038401916001600160401b038211610c85576110f382610b538554614703565b5f90601f83116001146117315761111392915f9183611596575050614906565b90555b6111236044850182614864565b60048401916001600160401b038211610c855761114482610b538554614703565b5f90601f83116001146116cd5761116492915f9183611596575050614906565b90555b6111746064850182614864565b60058401916001600160401b038211610c855761119582610b538554614703565b5f90601f8311600114611669576111b592915f9183611596575050614906565b90555b608484013560028110156103d4576111d39060068401614918565b6111e060a4850182614864565b60078401916001600160401b038211610c855761120182610b538554614703565b5f90601f83116001146116055761122192915f9183611596575050614906565b90555b61123160c4850182614864565b60088401916001600160401b038211610c855761125282610b538554614703565b5f90601f83116001146115a15761127292915f9183611596575050614906565b90555b61128160e48501614896565b600983019060a01c60018060601b03198254161790556112b16101246101048601359586600a8601550182614864565b600b8401916001600160401b038211610c85576112d282610b538554614703565b5f90601f831160011461152d5791806112f8926112ff9695945f92611522575050614906565b9055615784565b600c820155600e429101556040805161131882826146e0565b6019815278115b98dc9e5c1d1959081c185e5b1bd859081c9bdd185d1959603a1b60208201526003549061134b82614842565b60035582519061135a826146c5565b828252602082018581525f8584019081523360608501908152919291906080850190600280835260a087019485524260c088019081525f898152600f6020528a9020975188559551600188015590519086015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b811015610be357815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c855761141882610b538554614703565b602090601f83116001146114bb57918061143e9260059695945f926114b0575050614906565b90555b5191015582611497575b81513381525f915f8051602061591f83398151915284836002602089960152a4519182527f3d879bdaecd18b757dd404fc9ec7f2a1f9e2077da1948181f1d38e2995bf150460203393a3005b825f52600b6020526114ab81835f20614959565b61144b565b015190508b80610b78565b90601f19831691845f52815f20925f5b81811061150a5750916001939185600598979694106114f2575b505050811b019055611441565b01515f1960f88460031b161c191690558a80806114e5565b929360206001819287860151815501950193016114cb565b013590508980610b78565b601f19831691845f5260205f20925f5b81811061157e57509160019391856112ff9897969410611565575b505050811b019055615784565b01355f19600384901b60f8161c19169055888080611558565b9193602060018192878701358155019501920161153d565b013590508880610b78565b601f19831691845f5260205f20925f5b8181106115ed57509084600195949392106115d4575b505050811b019055611275565b01355f19600384901b60f8161c191690558780806115c7565b919360206001819287870135815501950192016115b1565b601f19831691845f5260205f20925f5b8181106116515750908460019594939210611638575b505050811b019055611224565b01355f19600384901b60f8161c1916905587808061162b565b91936020600181928787013581550195019201611615565b601f19831691845f5260205f20925f5b8181106116b5575090846001959493921061169c575b505050811b0190556111b8565b01355f19600384901b60f8161c1916905587808061168f565b91936020600181928787013581550195019201611679565b601f19831691845f5260205f20925f5b8181106117195750908460019594939210611700575b505050811b019055611167565b01355f19600384901b60f8161c191690558780806116f3565b919360206001819287870135815501950192016116dd565b601f19831691845f5260205f20925f5b81811061177d5750908460019594939210611764575b505050811b019055611116565b01355f19600384901b60f8161c19169055878080611757565b91936020600181928787013581550195019201611741565b601f19831691845f5260205f20925f5b8181106117e157509084600195949392106117c8575b505050811b0190556110c5565b01355f19600384901b60f8161c191690558780806117bb565b919360206001819287870135815501950192016117a5565b346103d45760203660031901126103d4576001600160a01b0361181a61454c565b163381036103a2575f52600860205260405f206040519081602082549182815201915f5260205f20905f5b818110611874576118708561185c818703826146e0565b604051918291602083526020830190614616565b0390f35b8254845260209093019260019283019201611845565b346103d45760203660031901126103d4576004355f818152600d6020526040902060028101546001600160a01b031680156103c557330361060f57600381019081549060ff8260f01c16611b3b5760ff60f01b19909116600160f01b178255426006820155600481018054600192915f9161190490614703565b601f8111611b1c575b5055018054604090815161192183826146e0565b601281527114195c9b5a5cdcda5bdb881c995d9bdad95960721b60208201526003549061194d82614842565b60035583519061195c826146c5565b8282526020820184815285830189815233606085019081529192919060808501906006825260a086019384524260c087019081525f888152600f6020528a9020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b811015610be357815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c8557611a1882610b538554614703565b602090601f8311600114611ab5579180611a3e9260059695945f92610c10575050614906565b90555b5191015581611a9c575b8251338152869381600660205f8051602061591f833981519152940152a45490546001600160a01b0316917fd2ba3a3435b2cf3d7fc56557f43627b4c46c251aae1e05868586ebcb52a511f15f80a4005b815f52600b602052611ab081845f20614959565b611a4b565b90601f19831691845f52815f20925f5b818110611b04575091600193918560059897969410611aec575b505050811b019055611a41565b01515f1960f88460031b161c191690558c8080611adf565b92936020600181928786015181550195019301611ac5565b81835260208320611b3591601f0160051c8101906148ab565b8661190d565b631769960560e31b5f5260045ffd5b346103d45760203660031901126103d4576004355f908152600d6020526040902060028101546001600160a01b0316156103c557600381015460209161050b916001600160a01b031690614ad5565b346103d45760203660031901126103d4576004355f818152600c60205260409020600101546001600160a01b0316156104d6575f818152600c6020526040902060018101546001600160a01b031691338314159081611d50575b506103a257805490600681015460ff16600a82015491600c810154600d82015490600e83015492600f81015460ff169460405180806002850190611c369161473b565b03611c4190826146e0565b60405180611c52816003870161473b565b03611c5d90826146e0565b6040519081611c6f816004880161473b565b03611c7a90836146e0565b6040519283611c8c816005890161473b565b03611c9790856146e0565b60405180600881980190611caa9161473b565b03611cb590876146e0565b6040519c8d9c8d5260208d015260408c016101a090526101a08c01611cd991614578565b8b810360608d0152611cea91614578565b8a810360808c0152611cfb91614578565b89810360a08b0152611d0c91614578565b9060c08901611d1a9161459c565b87810360e0890152611d2b91614578565b9461010087015261012086015261014085015261016084015215156101808301520390f35b611d5c91503390614a23565b1583611bf3565b346103d4575f3660031901126103d4576020604051620180008152f35b346103d45760203660031901126103d4576001600160a01b03611da161454c565b163381036103a2575f52600660205260405f206040519081602082549182815201915f5260205f20905f5b818110611de3576118708561185c818703826146e0565b8254845260209093019260019283019201611dcc565b346103d45760203660031901126103d4576001600160a01b03611e1a61454c565b163381036103a2575f52600760205260405f206040519081602082549182815201915f5260205f20905f5b818110611e5c576118708561185c818703826146e0565b8254845260209093019260019283019201611e45565b346103d45760203660031901126103d4575f610140604051611e93816146a9565b828152826020820152826040820152826060820152826080820152606060a0820152606060c08201528260e0820152826101008201528261012082015201526004355f52600e60205260405f20604051611eec816146a9565b8154815260018201546020820190815260028301546001600160a01b0390811660408401908152600385015491821660608501908152929490926080850192611f3b9060a01c60ff16846147c8565b60405193611f508561028c816004870161473b565b60a0860194855260405190611f7382611f6c816005880161473b565b03836146e0565b60c0870191825260ff6006850154169560e08801966004811015610be3578752600785015497610100810198895260096008870154966101208301978852015496610140820197885260018060a01b03845116156120955783516001600160a01b031633141580612081575b6103a257612054956120419461202d93604080519e8f92602084525160208401525191015260018060a01b0390511660608d015260018060a01b0390511660808c01525160a08b01906145a9565b5161016060c08a0152610180890190614578565b9051878203601f190160e0890152614578565b9251936004851015610be35785946101008601525161012085015251610140840152516101608301520390f35b5085516001600160a01b0316331415611fdf565b631a4b4c0360e11b5f5260045ffd5b346103d45760803660031901126103d45760043560243560058110156103d4576044356001600160401b0381116103d4576120e39036906004016145b6565b9091906064356001600160401b0381116103d4576121059036906004016145b6565b5f868152600c602052604090206001015490949192906001600160a01b0316156104d657855f52600c60205260405f2060ff600f82015416610d715760010180546001600160a01b031633146103a257811561265c57610200821161264d57851561265c57611000861161264d576002549561218087614842565b60025560018060a01b03825416876040519261219b846146a9565b81845260208401908b82526040850193845260608501903382526121e1608087019a6121c78d8d6147c8565b6121d2368b8d6147d4565b9260a0890193845236916147d4565b60c087019081525f60e08801818152426101008a019081526101208a018381526101408b01848152988452600e602052604090932099518a55955160018a015596516002890180546001600160a01b03199081166001600160a01b0393841617909155945160038a01805490961691161784559a51959a93959092906005811015610be35761226f9161498d565b51805160048701916001600160401b038211610c855761229382610b538554614703565b602090601f83116001146125ea576122b492915f91836125df575050614906565b90555b51805160058601916001600160401b038211610c85576122db82610b538554614703565b602090601f831160011461257c576122fc92915f9183612571575050614906565b90555b600684019751926004841015610be3576123819860099460ff801983541691161790555160078501555160088401555191015560018060a01b039054165f5260076020526123508560405f20614959565b335f5260086020526123658560405f20614959565b855f52600a60205261237a8560405f20614959565b36916147d4565b926003549361238f85614842565b6003556040519061239f826146c5565b858252602082018381525f604084019081523360608501908152919291906080850190600380835260a087019485524260c088019081525f8c8152600f60205260409020975188559551600188015590516002870155915191850180546001600160a01b0319166001600160a01b039390931692909217825551600b811015610be357815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c855761245e82610b538554614703565b602090601f831160011461250a5791806124849260059695945f926114b0575050614906565b90555b51910155806124f0575b60405133815293815f915f8051602061591f83398151915260408860036020809b0152a46124c260405180936145a9565b827f225bf23b3e478c1cfc6d15096209305708f3b44320bf5680ab861f6d66dc5d36853394a4604051908152f35b805f52600b6020526125058460405f20614959565b612491565b90601f19831691845f52815f20925f5b818110612559575091600193918560059897969410612541575b505050811b019055612487565b01515f1960f88460031b161c191690558a8080612534565b9293602060018192878601518155019501930161251a565b015190508f80610b78565b90601f19831691845f52815f20925f5b8181106125c757509084600195949392106125af575b505050811b0190556122ff565b01515f1960f88460031b161c191690558e80806125a2565b9293602060018192878601518155019501930161258c565b015190505f80610b78565b90601f19831691845f52815f20925f5b818110612635575090846001959493921061261d575b505050811b0190556122b7565b01515f1960f88460031b161c191690558f8080612610565b929360206001819287860151815501950193016125fa565b63d649753960e01b5f5260045ffd5b630103b55560e71b5f5260045ffd5b346103d45760203660031901126103d4576004355f818152600c60205260409020600101546001600160a01b0316156104d6575f818152600c60205260409020600101546001600160a01b0316330361060f575f52600960205260405f206040519081602082549182815201915f5260205f20905f5b8181106126f8576118708561185c818703826146e0565b82548452602090930192600192830192016126e1565b346103d45760203660031901126103d4576001600160a01b0361272f61454c565b163381036103a2575f52600560205260405f206040519081602082549182815201915f5260205f20905f5b818110612771576118708561185c818703826146e0565b825484526020909301926001928301920161275a565b346103d45760203660031901126103d4576004355f818152600c60205260409020600101546001600160a01b0316156104d657805f52601060205260405f20604051906127d38261468e565b80549160ff831615906060600183159586845261ffff8160081c166020850152818060a01b039060181c1694856040850152015491015291612864575b506103a257604051612862916128276060836146e0565b602182527f53656c65637469766520646973636c6f737572652070726f6f662076696577656020830152601960fa1b60408301523390614d40565b005b905033141580612875575b82612810565b50805f52600c60205260018060a01b03600160405f2001541633141561286f565b346103d45760203660031901126103d4576001600160401b03600435116103d457610160600435360360031901126103d4576128d66004356004016155ee565b335f52600460205260ff60405f20541615613352575b5f5460c0526128fc60c051614842565b5f5561290c600480350180614864565b60e052612923602460043501600435600401614864565b90612938604460043501600435600401614864565b9061294d606460043501600435600401614864565b9060026084600435013510156103d45761296f6004803560a481019101614864565b91909260043560c4016004356004019061298891614864565b95909660043560e40161299a90614896565b986129ae6004803561012481019101614864565b9b909c6004356004016129c090615784565b60805260405160a05260a0516129d590614672565b60c05160a051523360a051602001523660e0516129f1926147d4565b60a051604001523690612a03926147d4565b60a051606001523690612a15926147d4565b60a051608001523690612a27926147d4565b60a05160a001526004356084013560a05160c00190612a45916147bc565b3690612a50926147d4565b60a05160e001523690612a62926147d4565b60a0516101000152600160a01b60019003191660a0516101200152600435610104013560a05161014001523690612a98926147d4565b60a080516101600191909152608051815161018001528051426101a090910181905281516101c0015280515f6101e090910181905260c0518152600c6020908152604091829020925180518455908101516001840180546001600160a01b0319166001600160a01b039290921691909117905501518051906001600160401b038211610c8557612b3882612b2f6002860154614703565b600286016148c1565b602090601f83116001146132e557612b5992915f91836132da575050614906565b60028201555b60a05160600151805190919060038201906001600160401b038111610c8557612b9281612b8c8454614703565b846148c1565b6020601f8211600114613279578190612bb49394955f926130ea575050614906565b90555b60a05160800151805190919060048201906001600160401b038111610c8557612be481612b8c8454614703565b6020601f8211600114613218578190612c069394955f926130ea575050614906565b90555b60a080510151805190919060058201906001600160401b038111610c8557612c3581612b8c8454614703565b6020601f82116001146131b7578190612c579394955f926130ea575050614906565b90555b60c060a05101516002811015610be357612c779060068301614918565b60a05160e00151805190919060078201906001600160401b038111610c8557612ca481612b8c8454614703565b6020601f8211600114613156578190612cc69394955f926130ea575050614906565b90555b60a0516101000151805190919060088201906001600160401b038111610c8557612cf781612b8c8454614703565b6020601f82116001146130f5578190612d199394955f926130ea575050614906565b90555b60a080516101208101516009840180546001600160601b0319169190931c17909155610140810151600a830155610160015180519190600b8201906001600160401b038411610c8557612d7384612b8c8454614703565b602090601f8511600114613084579380612d9892612de1965f92613079575050614906565b90555b61018060a0510151600c8201556101a060a0510151600d8201556101c060a0510151600e820155600f6101e060a0510151151591019060ff801983541691151516179055565b335f526005602052612df860c05160405f20614959565b6060604051612e0782826146e0565b602281527f456e6372797074656420646f63756d656e74207365616c6564206f6e2063686160208201526134b760f11b604082015260035490612e4982614842565b60035560405190612e59826146c5565b82825260c051602083019081525f6040840190815233868501908152919291906080850190600180835260a087019485524260c088019081525f898152600f602052604090209751885595519087015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b811015610be357815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c8557612f1a82610b538554614703565b602090601f8311600114613012579180612f409260059695945f92613007575050614906565b90555b5191015560c051612feb575b6040513381525f91600160208301525f8051602061591f833981519152604060c05193a47f659ae396beda17ddacec30e2b6a7c4505beef74802bd3c1801eeaa541521b499612fa2600480350180614864565b9190826040519160408352816040840152858301375f8484830101526101046004350135602082015233938160c05194601f80199101168101030190a3602060405160c0518152f35b60c0515f52600b6020526130028160405f20614959565b612f4f565b015190508980610b78565b90601f19831691845f52815f20925f5b818110613061575091600193918560059897969410613049575b505050811b019055612f43565b01515f1960f88460031b161c1916905588808061303c565b92936020600181928786015181550195019301613022565b015190508680610b78565b90601f19851691835f52815f20925f5b8181106130d25750916001939187612de19894106130ba575b505050811b019055612d9b565b01515f1960f88460031b161c191690558580806130ad565b92936020600181928786015181550195019301613094565b015190508580610b78565b601f19821690835f52805f20915f5b81811061313e57509583600195969710613126575b505050811b019055612d1c565b01515f1960f88460031b161c19169055848080613119565b9192602060018192868b015181550194019201613104565b601f19821690835f52805f20915f5b81811061319f57509583600195969710613187575b505050811b019055612cc9565b01515f1960f88460031b161c1916905584808061317a565b9192602060018192868b015181550194019201613165565b601f19821690835f52805f20915f5b818110613200575095836001959697106131e8575b505050811b019055612c5a565b01515f1960f88460031b161c191690558480806131db565b9192602060018192868b0151815501940192016131c6565b601f19821690835f52805f20915f5b81811061326157509583600195969710613249575b505050811b019055612c09565b01515f1960f88460031b161c1916905584808061323c565b9192602060018192868b015181550194019201613227565b601f19821690835f52805f20915f5b8181106132c2575095836001959697106132aa575b505050811b019055612bb7565b01515f1960f88460031b161c1916905584808061329d565b9192602060018192868b015181550194019201613288565b015190508480610b78565b9190600284015f52805f20905f935b601f1984168510613337576001945083601f1981161061331f575b505050811b016002820155612b5f565b01515f1960f88460031b161c1916905583808061330f565b818101518355602094850194600190930192909101906132f4565b335f52600460205260405f20600160ff198254161790556133a860405161337a6040826146e0565b601b81527a5661756c742063726561746564206175746f6d61746963616c6c7960281b602082015233614eff565b6040514281525f805160206158ff83398151915260203392a26128ec565b346103d45760203660031901126103d4576004355f818152600c60205260409020600101546001600160a01b0316156104d6575f818152600c60205260409020600101546001600160a01b0316330361060f575f818152600c602052604090819020600f8101805460ff1916600117905542600e9091015580519061344b81836146e0565b6011825270111bd8dd5b595b9d08185c98da1a5d9959607a1b60208301526003549161347683614842565b600355815190613485826146c5565b838252602082018581525f8484019081523360608501908152919291906080850190600a825260a086019384524260c087019081525f898152600f602052889020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b811015610be357815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c855761354282610b538554614703565b602090601f83116001146135e15791806135689260059695945f926135d6575050614906565b90555b51910155826135bd575b8051338152915f8051602061591f833981519152849284600a60205f970152a433907fc7a48851f43b41aef9785f0be9f7abfc1dd97ed30261a5991f1dc74003474bc85f80a3005b825f52600b6020526135d182825f20614959565b613575565b015190508a80610b78565b90601f19831691845f52815f20925f5b818110613630575091600193918560059897969410613618575b505050811b01905561356b565b01515f1960f88460031b161c1916905589808061360b565b929360206001819287860151815501950193016135f1565b346103d45760803660031901126103d4576024356004356001600160401b03821682036103d45760443580151581036103d4576064356001600160401b0381116103d45761369a9036906004016145b6565b92805f52600e60205260405f209160018060a01b03600284015416801561209557330361060f57600683019460ff8654166004811015610be3576137975760209660099661372b89937f34246d6a687ed0f105bff790faf1870be323147cef0ae03c617295a4e0a8c00595600189019485549a60038b019b8c549060ff8260a01c169160018060a01b0316906152d4565b9788968792600160ff19825416179055426008820155015561377b8154604051906137576040836146e0565b601082526f14995c5d595cdd08185c1c1c9bdd995960821b8583015287339161509c565b5494546040516001600160a01b039091168152a4604051908152f35b637f899aa760e11b5f5260045ffd5b346103d4575f3660031901126103d457335f52600460205260ff60405f205416156137cd57005b335f52600460205260405f20600160ff198254161790556138156040516137f56040826146e0565b600d81526c15985d5b1d0818dc99585d1959609a1b602082015233614eff565b6040514281525f805160206158ff83398151915260203392a2005b346103d45760403660031901126103d45760043561384c614562565b5f828152600c60205260409020600101549091906001600160a01b0316156104d6575f818152600c60205260409020600101546001600160a01b0316330361060f576001600160a01b03821615610d8057805f52601060205260ff60405f205416156103a2576138e061286292825f5260126020526138cf8160405f2054615274565b825f52601060205260405f20614819565b805f52601060205242600160405f200155604051906139006040836146e0565b6014825273141c9bdbd9881d9a595dd95c881d5c19185d195960621b60208301523390614d40565b346103d45760203660031901126103d4576004355f818152600c60205260409020600101546001600160a01b0316156104d6575f818152600c60205260409020600101546001600160a01b0316330361060f575f52600a60205260405f206040519081602082549182815201915f5260205f20905f5b8181106139b5576118708561185c818703826146e0565b825484526020909301926001928301920161399e565b346103d4576139d9366145e3565b825f93929352600d60205260405f206139f23382614ad5565b15611b3b57610100821161264d576001613a1291019384549236916147d4565b9060035491613a2083614842565b60035560405190613a30826146c5565b838252602082018381526040830186815233606085019081529192919060808501906007825260a086019384524260c087019081525f898152600f60205260409020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b811015610be357815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c8557613aee82610b538554614703565b602090601f8311600114613b86579180613b149260059695945f926114b0575050614906565b90555b5191015580613b6c575b604051338152915f8051602061591f8339815191526040846007602088970152a4339154907f9d71a02fe53bc9c4008286802e8888c5db06988a8ed24174c377e0e5b9dc1e935f80a4005b805f52600b602052613b818260405f20614959565b613b21565b90601f19831691845f52815f20925f5b818110613bd5575091600193918560059897969410613bbd575b505050811b019055613b17565b01515f1960f88460031b161c191690558a8080613bb0565b92936020600181928786015181550195019301613b96565b346103d45760203660031901126103d4576004355f6101e0604051613c1181614672565b8281528260208201526060604082015260608082015260606080820152606060a08201528260c0820152606060e082015260606101008201528261012082015282610140820152606061016082015282610180820152826101a0820152826101c08201520152805f52600c60205260018060a01b03600160405f20015416156104d6575f818152600c60205260409020600101546001600160a01b0316330361060f575f52600c60205260405f2060ff600f60405192613cd084614672565b8054845260018101546001600160a01b03166020850152604051613cfb81610f62816002860161473b565b6040850152604051613d1481610f62816003860161473b565b6060850152604051613d2d81610f62816004860161473b565b6080850152604051613d4681610f62816005860161473b565b60a0850152613d5e8360068301541660c086016147bc565b604051613d7281610f62816007860161473b565b60e0850152604051613d8b81610f62816008860161473b565b610100850152600981015460a01b6001600160a01b031916610120850152600a810154610140850152604051613dc881610f6281600b860161473b565b610160850152600c810154610180850152600d8101546101a0850152600e8101546101c085015201541615156101e08201526040518091602082528051602083015260018060a01b0360208201511660408301526101e0613f08613ecf613eb7613e8e613e78613e62613e4c604089015161020060608c01526102208b0190614578565b60608901518a8203601f190160808c0152614578565b6080880151898203601f190160a08b0152614578565b60a0870151888203601f190160c08a0152614578565b613ea060c087015160e089019061459c565b60e0860151878203601f1901610100890152614578565b610100850151868203601f1901610120880152614578565b60018060a01b031961012085015116610140860152610140840151610160860152610160840151601f1986830301610180870152614578565b916101808101516101a08501526101a08101516101c08501526101c081015182850152015115156102008301520390f35b346103d45760203660031901126103d4576004355f908152600e6020526040902060028101546001600160a01b0316156120955760038101546001600160a01b03163303613fe7576006810160ff8154166004811015610be3576137975761286291600191600360ff19825416179055426008820155015460405190613fc06040836146e0565b601382527214995c5d595cdd195c8818d85b98d95b1b1959606a1b60208301523390614b81565b6371ced2cf60e11b5f5260045ffd5b346103d457614004366145e3565b5f838152600e602052604090206002810154909291906001600160a01b0316801561209557330361060f57600683019060ff8254166004811015610be35761379757610100811161264d5761407e91600260ff19825416179055426008850155614076600185019384549236916147d4565b903390614b81565b546003909101546001600160a01b0316917fb14ccaa663dadced73f667574cce8204a30355ab0dbcc7cb474eb1bd2d298e5d5f80a4005b346103d45760203660031901126103d4575f6102606040516140d681614656565b8281528260208201526060604082015260608082015260606080820152606060a08201528260c0820152606060e082015260606101008201528261012082015282610140820152606061016082015282610180820152826101a0820152826101c0820152826101e082015282610200820152826102208201528261024082015201526004355f52600d60205260405f2060018060a01b03600282015416156103c5576141823382614ad5565b15611b3b5760038101546141a260ff8260a81c1660ff8360a01c16614b66565b156103a25760018201545f52600c60205260405f20805492600160a01b6001900360018301541691600681015460ff1691600982015460a01b90600a83015490600c84015491600d85015493600e86015495600f81015460ff16978454996040519c61420d8e614656565b8d5260208d015260405180614225816002860161473b565b0361423090826146e0565b60408d0152604051808060038501906142489161473b565b0361425390826146e0565b60608d015260405180614269816004860161473b565b0361427490826146e0565b60808d01526040518061428a816005860161473b565b0361429590826146e0565b60a08d01526142a79060c08d016147bc565b604051806142b8816007850161473b565b036142c390826146e0565b60e08c0152604051806008819301906142db9161473b565b036142e690826146e0565b6101008b01526001600160a01b0319166101208a015261014089015260405190819061431690829060040161473b565b0361432190826146e0565b6101608801526101808701526101a08601526101c085015215156101e084015261020083015261435c60ff60a083901c1661022084016147c8565b60ff60a882901c16151561024083015260b01c6001600160401b03166102608201526040805160208082528351818301528301516001600160a01b031681830152908201516102806060830152909182916143bc906102a0840190614578565b6060820151838203601f190160808501526143d79190614578565b6080820151838203601f190160a08501526143f29190614578565b60a0820151838203601f190160c085015261440d9190614578565b60c082015160e0840161441f9161459c565b60e0820151838203601f190161010085015261443b9190614578565b610100820151838203601f19016101208501526144589190614578565b6101208201516001600160a01b0319166101408481019190915282015161016080850191909152820151838203601f19016101808501526144999190614578565b906101808101516101a08401526101a08101516101c08401526101c08101516101e08401526101e0810151151561020084015261020081015161022084015261022081015161024084016144ec916145a9565b61024081015115156102608481019190915201516001600160401b03166102808301520390f35b346103d45760203660031901126103d4576020906001600160a01b0361453761454c565b165f526004825260ff60405f20541615158152f35b600435906001600160a01b03821682036103d457565b602435906001600160a01b03821682036103d457565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b906002821015610be35752565b906005821015610be35752565b9181601f840112156103d4578235916001600160401b0383116103d457602083818601950101116103d457565b9060406003198301126103d45760043591602435906001600160401b0382116103d457614612916004016145b6565b9091565b90602080835192838152019201905f5b8181106146335750505090565b8251845260209384019390920191600101614626565b90600b821015610be35752565b61028081019081106001600160401b03821117610c8557604052565b61020081019081106001600160401b03821117610c8557604052565b608081019081106001600160401b03821117610c8557604052565b61016081019081106001600160401b03821117610c8557604052565b60e081019081106001600160401b03821117610c8557604052565b601f909101601f19168101906001600160401b03821190821017610c8557604052565b90600182811c92168015614731575b602083101461471d57565b634e487b7160e01b5f52602260045260245ffd5b91607f1691614712565b5f929181549161474a83614703565b808352926001811690811561479f575060011461476657505050565b5f9081526020812093945091925b838310614785575060209250010190565b600181602092949394548385870101520191019190614774565b915050602093945060ff929192191683830152151560051b010190565b6002821015610be35752565b6005821015610be35752565b9192916001600160401b038211610c8557604051916147fd601f8201601f1916602001846146e0565b8294818452818301116103d4578281602093845f960137010152565b80546301000000600160b81b03191660189290921b6301000000600160b81b0316919091179055565b5f1981146148505760010190565b634e487b7160e01b5f52601160045260245ffd5b903590601e19813603018212156103d457018035906001600160401b0382116103d4576020019181360383136103d457565b356001600160a01b0319811681036103d45790565b8181106148b6575050565b5f81556001016148ab565b9190601f81116148d057505050565b6148fa925f5260205f20906020601f840160051c830193106148fc575b601f0160051c01906148ab565b565b90915081906148ed565b8160011b915f199060031b1c19161790565b906002811015610be35760ff80198354169116179055565b8054821015614945575f5260205f2001905f90565b634e487b7160e01b5f52603260045260245ffd5b8054600160401b811015610c855761497691600182018155614930565b819291549060031b91821b915f19901b1916179055565b906005811015610be357815460ff60a01b191660a09190911b60ff60a01b16179055565b6001600160401b038111610c855760051b60200190565b8051156149455760200190565b8051600110156149455760400190565b8051600210156149455760600190565b80518210156149455760209160051b010190565b600b821015610be35752565b359060ff821682036103d457565b5f818152600c60205260409020600101549091906001600160a01b0316156104d657614a4e91614a51565b90565b5f818152600c60205260409020600101546001600160a01b03838116911614614ace575f52600960205260405f205f918154925b838110614a9457505050505f90565b614a9e8184614930565b90549060031b1c5f52600d602052614ab98260405f20614ad5565b614ac557600101614a85565b50505050600190565b5050600190565b60028101546001600160a01b031615159182614b4b575b5081614b38575b81614b1e575b81614b02575090565b6001915001545f52600c60205260ff600f60405f200154161590565b600381015460b01c6001600160401b031642109150614af9565b600381015460f01c60ff16159150614af3565b60038201546001600160a01b0391821691161491505f614aec565b8115614b70575090565b90506005811015610be35760011490565b909160035490614b9082614842565b60035560405190614ba0826146c5565b828252602082018481525f604084019081526001600160a01b0390961660608401818152909691929160808501906005825260a086019384524260c087019081525f888152600f60205260409020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b811015610be357815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c8557614c6a82610b538554614703565b602090601f8311600114614cd9579180614c909260059695945f926125df575050614906565b90555b5191015581614cbf575b6040519283525f8051602061591f833981519152604084600560205f970152a4565b815f52600b602052614cd48160405f20614959565b614c9d565b90601f19831691845f52815f20925f5b818110614d28575091600193918560059897969410614d10575b505050811b019055614c93565b01515f1960f88460031b161c191690555f8080614d03565b92936020600181928786015181550195019301614ce9565b909160035490614d4f82614842565b60035560405190614d5f826146c5565b828252602082018481525f604084019081526001600160a01b0390961660608401818152909691929160808501906009825260a086019384524260c087019081525f888152600f60205260409020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b811015610be357815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c8557614e2982610b538554614703565b602090601f8311600114614e98579180614e4f9260059695945f926125df575050614906565b90555b5191015581614e7e575b6040519283525f8051602061591f833981519152604084600960205f970152a4565b815f52600b602052614e938160405f20614959565b614e5c565b90601f19831691845f52815f20925f5b818110614ee7575091600193918560059897969410614ecf575b505050811b019055614e52565b01515f1960f88460031b161c191690555f8080614ec2565b92936020600181928786015181550195019301614ea8565b60035491614f0c83614842565b60035560405190614f1c826146c5565b8382525f60208301818152604084019182526001600160a01b03909416606084018181529094929160808501905f80835260a087019485524260c08801908152898252600f6020526040909120965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b811015610be357815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c8557614fe582610b538554614703565b602090601f831160011461503557918061500b9260059695945f926125df575050614906565b90555b519101556040519081525f915f8051602061591f83398151915260408385602081960152a4565b90601f19831691845f52815f20925f5b81811061508457509160019391856005989796941061506c575b505050811b01905561500e565b01515f1960f88460031b161c191690555f808061505f565b92936020600181928786015181550195019301615045565b91929092600354916150ad83614842565b600355604051906150bd826146c5565b83825260208201858152604083018781526001600160a01b0390941660608401818152909491929160808501906004825260a086019384524260c087019081525f898152600f60205260409020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b811015610be357815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c855761518682610b538554614703565b602090601f83116001146151f45791806151ac9260059695945f926125df575050614906565b90555b51910155826151da575b604051908152604081600460205f8051602061591f833981519152940152a4565b825f52600b6020526151ef8260405f20614959565b6151b9565b90601f19831691845f52815f20925f5b81811061524357509160019391856005989796941061522b575b505050811b0190556151af565b01515f1960f88460031b161c191690555f808061521e565b92936020600181928786015181550195019301615204565b9081526001600160a01b03909116602082015260400190565b5f805160206158df8339815191523b156103d457604051631974142760e21b8152915f91839182916152aa91906004840161525b565b0381835f805160206158df8339815191525af18015610cca576152ca5750565b5f6148fa916146e0565b93949290969591845f52600c60205260405f2095600187019860018060a01b038a54169788156104d657600f015460ff16610d71576001600160a01b03169687159081156155e4575b50610d80576001600160401b031692428411156155d65761533e8383614b66565b90816155b7575b6001549561535287614842565b600155995495998a966001600160a01b0316921561559f576153759136916147d4565b60405193615382856146a9565b86855260208501938885526040860193845260608601918a83526153aa6080880192836147c8565b151560a0870190815260c087018881525f60e089018181526101008a01968752426101208b019081526101408b018381528d8452600d60205260409093209a518b55985160018b0155965160028a0180546001600160a01b03199081166001600160a01b0393841617909155955160038b01805490971691161785559251929695929091906005811015610be357615442908561498d565b51835491519251600160a81b600160f81b031990921690151560a81b60ff60a81b161760b09290921b600160b01b600160f01b03169190911790151560f01b60ff60f01b1617905551805160048501916001600160401b038211610c85576154ae82610b538554614703565b602090601f831160011461552557926154e7835f8051602061593f83398151915299979460209997946006975f926125df575050614906565b90555b51600584015551910155845f52600982526155088460405f20614959565b855f526006825261551c8460405f20614959565b604051908152a4565b90601f19831691845f52815f20925f5b818110615587575093602098969360069693600193835f8051602061593f8339815191529d9b981061556f575b505050811b0190556154ea565b01515f1960f88460031b161c191690555f8080615562565b92936020600181928786015181550195019301615535565b50506040516155af6020826146e0565b5f8152615375565b801561265c576110008111156153455763d649753960e01b5f5260045ffd5b62d36c8560e81b5f5260045ffd5b905087145f61531d565b6155f88180614864565b8091501561265c5760601061264d576156146020820182614864565b8091501561265c5760301061264d576156306040820182614864565b8091501561265c5760a01061264d5761564c6060820182614864565b8091501561265c5760501061264d57615669610120820182614864565b8091501561265c576110001061264d5761010081013515615775576001600160a01b031961569960e08301614896565b161561576657608081013560028110156103d45761572b5760a081016156bf8183614864565b90501561265c57620180006156d48284614864565b90501161571c57610140820135908115159283615704575b5050506156f557565b633ef7de5560e21b5f5260045ffd5b61570f929350614864565b91905014155f80806156ec565b63492f620d60e01b5f5260045ffd5b61573860c0820182614864565b8091501561265c5760a01061264d5761575460a0820182614864565b90506156f5576101400135156156f557565b6311fcbd5d60e31b5f5260045ffd5b63a84ab60d60e01b5f5260045ffd5b608081013560028110156103d4571561579f57610140013590565b8060a06157ad920190614864565b905090565b5f805160206158df8339815191523b156103d4575f6152aa9160405180938192631974142760e21b835230906004840161525b565b9161580e9060ff614a4e9593168452601a6020850152608060408501526080840190614616565b916060818403910152614616565b602061588f8160405161582f82826146e0565b5f81525f368137604051906158456080836146e0565b60038252606036848401375f61585a836149c8565b526003615866836149d5565b525f615871836149e5565b52604051631888debd60e01b815293849283926003600485016157e7565b03815f5f805160206158df8339815191525af1918215610cca575f926158b457505090565b90809250813d83116158d7575b6158cb81836146e0565b810103126103d4575190565b503d6158c156fe000000000000000000000000ea30c4b8b44078bbf8a6ef5b9f1ec1626c7848d9a510df27d6e51efd91d3f55722bad1f26bf924a63e5dcee07c2ab4c3d4992dcc29f0115e94a047807998c437133d5afe9862520aada511bac03259cecb04522c3d496924eaca2c40f67d1643057731c58b5f24a0f38f7808fea610bcabd42971a2646970667358221220d8028f82634381da702ac663c6d60a473d4b1ebf901fb35f0a03feb87363cf5f64736f6c634300081a0033" as const;
