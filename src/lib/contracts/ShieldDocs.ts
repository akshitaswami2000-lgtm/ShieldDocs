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
    "name": "InvalidPublicMetadata",
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
    "name": "documentOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
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

export const shieldDocsBytecode = "0x6080806040523460275760015f556001805560016002556001600355615e3a908161002c8239f35b5f80fdfe610100806040526004361015610013575f80fd5b5f3560e01c9081630d453efb14614bba5750806324a429391461475c5780632ed715001461469d5780633015394c146145de5780633f9b250a1461429257806345c3c0ab1461407057806356f079f414613fcd578063579422f514613d365780635d12928b14613b2c5780635f603c71146139ce5780636353c5a31461397a57806369ea9247146136f85780636b0aac3f14612a535780638b8c3819146127925780639f3bc1ce14612719578063abf439e614612676578063c3d84c58146120af578063c58343ef14611e7d578063cb3ec96614611e04578063d05a00cd14611d8b578063d31ecaa714611d6e578063d39f66e314611ba4578063da60a41414611b55578063e1b97d6914611895578063e64e8a1114611804578063e7fabe9114610fde578063e887319a14610d9a578063ecf7f7a914610629578063ef8239d214610520578063f499924b146104f0578063f783f5cd146103e35763ffb5e2761461017d575f80fd5b346103df5760203660031901126103df575f61014060405161019e81614d50565b8281528260208201528260408201528260608201528260808201528260a08201528260c08201528260e082015260606101008201528261012082015201526004355f52600d60205260405f2060018060a01b036002820154169081156103d0576040519061020b82614d50565b805482526001810154602083019081526040830193845260038201546001600160a01b03811660608501908152608085019390929161025160a082901c60ff1686614e6f565b60a0860160ff8260a81c161515815260c087019060018060401b038360b01c16825260ff60e089019360f01c16151583526040519361029e856102978160048501614de2565b0386614d87565b61010089019485526005810154976101208a019889526006820154976101408b0198895260018060a01b038c5116331415806103bc575b6103ad5760209b6103709861033b9460018060a01b038451163314908161039a575b50610383575b6040518e819f9e829f8352519101525160408d015260018060a01b0390511660608c015260018060a01b0390511660808b01525160a08a0190614c50565b51151560c0880152516001600160401b031660e087015251151561010086015251610160610120860152610180850190614c1f565b9151610140840152516101608301520390f35b6040516103908f82614d87565b5f815289526102fd565b6103a69150339061517c565b155f6102f7565b63ea8e4eb560e01b5f5260045ffd5b5080516001600160a01b03163314156102d5565b631ab35caf60e21b5f5260045ffd5b5f80fd5b346103df5760203660031901126103df576004355f818152600c60205260409020600101546001600160a01b0316156104e157805f52601060205260405f2060405161042e81614d35565b81549060ff8216151581526001602082019361ffff8460081c1685526040830193828060a01b039060181c16845201549060608101918252845f52600c60205260018060a01b03600160405f20015416331415806104cd575b6103ad5760a0945f52601260205261ffff60405f205494511692600180871b03905116905115159151926040519485526020850152604084015260608301526080820152f35b5082516001600160a01b0316331415610487565b63c037433960e01b5f5260045ffd5b346103df5760403660031901126103df57602061051661050e614c09565b6004356150ca565b6040519015158152f35b346103df5760c03660031901126103df5760043561053c614c09565b9060443560058110156103df576064359283151584036103df576084356001600160401b03811681036103df5760a4356001600160401b0381116103df57610588903690600401614c5d565b5f868152600c60205260409020600101549092906001600160a01b0316156104e1575f868152600c60205260409020600101546001600160a01b0316330361061a57602096610612956105db958861561f565b91604051906105eb604083614d87565b6013825272111a5c9958dd081858d8d95cdcc819dc985b9d606a1b858301528333916153e7565b604051908152f35b63c5e0ae3f60e01b5f5260045ffd5b346103df5760803660031901126103df576024356004356001600160401b0382116103df57608060031983360301126103df576044359061ffff82168092036103df576064356001600160a01b03811691908281036103df575f828152600c60205260409020600101546001600160a01b0316156104e1575f828152600c60205260409020600101546001600160a01b0316330361061a578215610d8b57815f52600c60205260ff600f60405f20015416610d7c576040516106ea81614d35565b856004013581526106fd602487016150bc565b9060208101918252610711604488016150bc565b60408201908152966064810135906001600160401b0382116103df5701366023820112156103df5761074f60ff913690602460048201359101614e7b565b9760608301988952511660038103610d655750956020916107f760ff80989960608060405161077d81614d35565b5f81525f898201525f60408201520152519251169251604051926107a084614d35565b8352848301938452886040840160038152606085019283526040519a8b9687966313fce3b160e11b885260406004890152516044880152511660648601525116608484015251608060a484015260c4830190614c1f565b33602483015203815f5f80516020615d858339815191525af1938415610cd5575f94610d2f575b506108959394602095866040516108358282614d87565b5f81525f3681376040519061084b608083614d87565b6003825260603684840137846108608361506f565b52600361086c8361507c565b525f6108778361508c565b52604051631888debd60e01b81529889928392600360048501615c8d565b03815f5f80516020615d858339815191525af1958615610cd5575f96610d00575b50859281968215610cf0575b15610ce0575b606093604051976108d9868a614d87565b60028952601f198601368b8b01376108f08961506f565b526108fa8861507c565b52876109486040519861090d838b614d87565b5f8a525f36813761095a6040519a8b938493631888debd60e01b85526003600486015260126024860152608060448601526084850190614cbd565b83810360031901606485015290614cbd565b03815f5f80516020615d858339815191525af1968715610cd5575f97610ca4575b506109ac9061098983615c58565b61099288615c58565b61099c33846155bf565b6109a633896155bf565b876155bf565b835f526011875260405f2055825f52601286528460405f20556040516109d181614d35565b600181526001878201838152610a376040840188815286850192428452885f5260108c52610a1260405f2096511515879060ff801983541691151516179055565b5162ffff0086549160081b169062ffff001916178555838060a01b0390511684614ec0565b51910155604051610a488382614d87565b602c81527f456e637279707465642073656c65637469766520646973636c6f737572652070878201526b1c9bdbd98818dc99585d195960a21b604082015260035492610a9384614ee9565b60035560405191610aa383614d6c565b8483528883018681525f604085019081523393850193845290929060808501906008825260a086019384524260c087019081525f898152600f8e5260409020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b811015610bee57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c9057610b6482610b5e8554614daa565b85614f68565b8a90601f8311600114610c26579180610b8a9260059695945f92610c1b575b5050614fad565b90555b5191015582610c02575b604051338152905f847fe6244565e1c70e23267b5a67b04e5e9d2082073a9d3df73445a1aa8a1b19c952945f80516020615dc583398151915260408660088d83990152a481519081528587820152a3604051908152f35b634e487b7160e01b5f52602160045260245ffd5b825f52600b8652610c168260405f20615000565b610b97565b015190508d80610b83565b5f8481528c8120929190601f198516908e5b828210610c7857505091600193918560059897969410610c60575b505050811b019055610b8d565b01515f1960f88460031b161c191690558c8080610c53565b80600186978294978701518155019601940190610c38565b634e487b7160e01b5f52604160045260245ffd5b9096508781813d8311610cce575b610cbc8183614d87565b810103126103df5751956109ac61097b565b503d610cb2565b6040513d5f823e3d90fd5b9250610cea615cc2565b926108c8565b9650610cfa615cc2565b966108c2565b9095508681813d8311610d28575b610d188183614d87565b810103126103df575194876108b6565b503d610d0e565b93506020843d602011610d5d575b81610d4a60209383614d87565b810103126103df5761089593519361081e565b3d9150610d3d565b6367cf307160e01b5f52600452600360245260445ffd5b636cbc149960e01b5f5260045ffd5b63e6c4247b60e01b5f5260045ffd5b346103df5760203660031901126103df576004355f818152600c60205260409020600101546001600160a01b0316156104e1575f818152600c60205260409020600101546001600160a01b0316330361061a575f52600b60205260405f208054610e0381615058565b91610e116040519384614d87565b818352601f19610e2083615058565b015f5b818110610f9c5750505f5b828110610ef057836040518091602082016020835281518091526040830190602060408260051b8601019301915f905b828210610e6d57505050500390f35b919360019193955060208091603f1989820301855287519081518152828201518382015260408201516040820152848060a01b036060830151166060820152610ebe60808301516080830190614cf0565b60c080610eda60a085015160e060a086015260e0850190614c1f565b9301519101529601920192018594939192610e5e565b80610efd60019284614fd7565b90549060031b1c5f52600f60205260405f20600560405191610f1e83614d6c565b8054835284810154602084015260028101546040840152610f5960ff6003830154878060a01b038116606087015260a01c16608085016150b0565b604051610f7481610f6d8160048601614de2565b0382614d87565b60a0840152015460c0820152610f8a828761509c565b52610f95818661509c565b5001610e2e565b602090604051610fab81614d6c565b5f81525f838201525f60408201525f60608201525f6080820152606060a08201525f60c082015282828801015201610e23565b346103df5760403660031901126103df576024356004356001600160401b0382116103df578160040161016060031984360301126103df575f828152600c60205260409020600101546001600160a01b0316156104e1575f828152600c60205260409020600101546001600160a01b0316330361061a57815f52600c60205260ff600f60405f20015416610d7c5761107581615939565b815f52600c60205260405f209061108c8180614f0b565b60028401916001600160401b038211610c90576110ad82610b5e8554614daa565b5f90601f83116001146117a0576110cd92915f91836115a1575050614fad565b90555b6110dd6024850182614f0b565b60038401916001600160401b038211610c90576110fe82610b5e8554614daa565b5f90601f831160011461173c5761111e92915f91836115a1575050614fad565b90555b61112e6044850182614f0b565b60048401916001600160401b038211610c905761114f82610b5e8554614daa565b5f90601f83116001146116d85761116f92915f91836115a1575050614fad565b90555b61117f6064850182614f0b565b60058401916001600160401b038211610c90576111a082610b5e8554614daa565b5f90601f8311600114611674576111c092915f91836115a1575050614fad565b90555b608484013560028110156103df576111de9060068401614fbf565b6111eb60a4850182614f0b565b60078401916001600160401b038211610c905761120c82610b5e8554614daa565b5f90601f83116001146116105761122c92915f91836115a1575050614fad565b90555b61123c60c4850182614f0b565b60088401916001600160401b038211610c905761125d82610b5e8554614daa565b5f90601f83116001146115ac5761127d92915f91836115a1575050614fad565b90555b61128c60e48501614f3d565b600983019060a01c60018060601b03198254161790556112bc6101246101048601359586600a8601550182614f0b565b600b8401916001600160401b038211610c90576112dd82610b5e8554614daa565b5f90601f83116001146115385791806113039261130a9695945f9261152d575050614fad565b9055615c2a565b600c820155600e42910155604080516113238282614d87565b6019815278115b98dc9e5c1d1959081c185e5b1bd859081c9bdd185d1959603a1b60208201526003549061135682614ee9565b60035582519061136582614d6c565b828252602082018581525f8584019081523360608501908152919291906080850190600280835260a087019485524260c088019081525f898152600f6020528a9020975188559551600188015590519086015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b811015610bee57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c905761142382610b5e8554614daa565b602090601f83116001146114c65791806114499260059695945f926114bb575050614fad565b90555b51910155826114a2575b81513381525f915f80516020615dc583398151915284836002602089960152a4519182527f3d879bdaecd18b757dd404fc9ec7f2a1f9e2077da1948181f1d38e2995bf150460203393a3005b825f52600b6020526114b681835f20615000565b611456565b015190508b80610b83565b90601f19831691845f52815f20925f5b8181106115155750916001939185600598979694106114fd575b505050811b01905561144c565b01515f1960f88460031b161c191690558a80806114f0565b929360206001819287860151815501950193016114d6565b013590508980610b83565b601f19831691845f5260205f20925f5b818110611589575091600193918561130a9897969410611570575b505050811b019055615c2a565b01355f19600384901b60f8161c19169055888080611563565b91936020600181928787013581550195019201611548565b013590508880610b83565b601f19831691845f5260205f20925f5b8181106115f857509084600195949392106115df575b505050811b019055611280565b01355f19600384901b60f8161c191690558780806115d2565b919360206001819287870135815501950192016115bc565b601f19831691845f5260205f20925f5b81811061165c5750908460019594939210611643575b505050811b01905561122f565b01355f19600384901b60f8161c19169055878080611636565b91936020600181928787013581550195019201611620565b601f19831691845f5260205f20925f5b8181106116c057509084600195949392106116a7575b505050811b0190556111c3565b01355f19600384901b60f8161c1916905587808061169a565b91936020600181928787013581550195019201611684565b601f19831691845f5260205f20925f5b818110611724575090846001959493921061170b575b505050811b019055611172565b01355f19600384901b60f8161c191690558780806116fe565b919360206001819287870135815501950192016116e8565b601f19831691845f5260205f20925f5b818110611788575090846001959493921061176f575b505050811b019055611121565b01355f19600384901b60f8161c19169055878080611762565b9193602060018192878701358155019501920161174c565b601f19831691845f5260205f20925f5b8181106117ec57509084600195949392106117d3575b505050811b0190556110d0565b01355f19600384901b60f8161c191690558780806117c6565b919360206001819287870135815501950192016117b0565b346103df5760203660031901126103df576001600160a01b03611825614bf3565b163381036103ad575f52600860205260405f206040519081602082549182815201915f5260205f20905f5b81811061187f5761187b8561186781870382614d87565b604051918291602083526020830190614cbd565b0390f35b8254845260209093019260019283019201611850565b346103df5760203660031901126103df576004355f818152600d6020526040902060028101546001600160a01b031680156103d057330361061a57600381019081549060ff8260f01c16611b465760ff60f01b19909116600160f01b178255426006820155600481018054600192915f9161190f90614daa565b601f8111611b27575b5055018054604090815161192c8382614d87565b601281527114195c9b5a5cdcda5bdb881c995d9bdad95960721b60208201526003549061195882614ee9565b60035583519061196782614d6c565b8282526020820184815285830189815233606085019081529192919060808501906006825260a086019384524260c087019081525f888152600f6020528a9020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b811015610bee57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c9057611a2382610b5e8554614daa565b602090601f8311600114611ac0579180611a499260059695945f92610c1b575050614fad565b90555b5191015581611aa7575b8251338152869381600660205f80516020615dc5833981519152940152a45490546001600160a01b0316917fd2ba3a3435b2cf3d7fc56557f43627b4c46c251aae1e05868586ebcb52a511f15f80a4005b815f52600b602052611abb81845f20615000565b611a56565b90601f19831691845f52815f20925f5b818110611b0f575091600193918560059897969410611af7575b505050811b019055611a4c565b01515f1960f88460031b161c191690558c8080611aea565b92936020600181928786015181550195019301611ad0565b81835260208320611b4091601f0160051c810190614f52565b86611918565b631769960560e31b5f5260045ffd5b346103df5760203660031901126103df576004355f908152600d6020526040902060028101546001600160a01b0316156103d0576003810154602091610516916001600160a01b03169061517c565b346103df5760203660031901126103df576004355f818152600c60205260409020600101546001600160a01b0316156104e1575f818152600c6020526040902060018101546001600160a01b031691338314159081611d5b575b506103ad57805490600681015460ff16600a82015491600c810154600d82015490600e83015492600f81015460ff169460405180806002850190611c4191614de2565b03611c4c9082614d87565b60405180611c5d8160038701614de2565b03611c689082614d87565b6040519081611c7a8160048801614de2565b03611c859083614d87565b6040519283611c978160058901614de2565b03611ca29085614d87565b60405180600881980190611cb591614de2565b03611cc09087614d87565b6040519c8d9c8d5260208d015260408c016101a090526101a08c01611ce491614c1f565b8b810360608d0152611cf591614c1f565b8a810360808c0152611d0691614c1f565b89810360a08b0152611d1791614c1f565b9060c08901611d2591614c43565b87810360e0890152611d3691614c1f565b9461010087015261012086015261014085015261016084015215156101808301520390f35b611d67915033906150ca565b1583611bfe565b346103df575f3660031901126103df576020604051620180008152f35b346103df5760203660031901126103df576001600160a01b03611dac614bf3565b163381036103ad575f52600660205260405f206040519081602082549182815201915f5260205f20905f5b818110611dee5761187b8561186781870382614d87565b8254845260209093019260019283019201611dd7565b346103df5760203660031901126103df576001600160a01b03611e25614bf3565b163381036103ad575f52600760205260405f206040519081602082549182815201915f5260205f20905f5b818110611e675761187b8561186781870382614d87565b8254845260209093019260019283019201611e50565b346103df5760203660031901126103df575f610140604051611e9e81614d50565b828152826020820152826040820152826060820152826080820152606060a0820152606060c08201528260e0820152826101008201528261012082015201526004355f52600e60205260405f20604051611ef781614d50565b8154815260018201546020820190815260028301546001600160a01b0390811660408401908152600385015491821660608501908152929490926080850192611f469060a01c60ff1684614e6f565b60405193611f5b856102978160048701614de2565b60a0860194855260405190611f7e82611f778160058801614de2565b0383614d87565b60c0870191825260ff6006850154169560e08801966004811015610bee578752600785015497610100810198895260096008870154966101208301978852015496610140820197885260018060a01b03845116156120a05783516001600160a01b03163314158061208c575b6103ad5761205f9561204c9461203893604080519e8f92602084525160208401525191015260018060a01b0390511660608d015260018060a01b0390511660808c01525160a08b0190614c50565b5161016060c08a0152610180890190614c1f565b9051878203601f190160e0890152614c1f565b9251936004851015610bee5785946101008601525161012085015251610140840152516101608301520390f35b5085516001600160a01b0316331415611fea565b631a4b4c0360e11b5f5260045ffd5b346103df5760803660031901126103df5760043560243560058110156103df576044356001600160401b0381116103df576120ee903690600401614c5d565b9091906064356001600160401b0381116103df57612110903690600401614c5d565b5f868152600c602052604090206001015490949192906001600160a01b0316156104e157855f52600c60205260405f2060ff600f82015416610d7c5760010180546001600160a01b031633146103ad578115612667576102008211612658578515612667576110008611612658576002549561218b87614ee9565b60025560018060a01b0382541687604051926121a684614d50565b81845260208401908b82526040850193845260608501903382526121ec608087019a6121d28d8d614e6f565b6121dd368b8d614e7b565b9260a089019384523691614e7b565b60c087019081525f60e08801818152426101008a019081526101208a018381526101408b01848152988452600e602052604090932099518a55955160018a015596516002890180546001600160a01b03199081166001600160a01b0393841617909155945160038a01805490961691161784559a51959a93959092906005811015610bee5761227a91615034565b51805160048701916001600160401b038211610c905761229e82610b5e8554614daa565b602090601f83116001146125f5576122bf92915f91836125ea575050614fad565b90555b51805160058601916001600160401b038211610c90576122e682610b5e8554614daa565b602090601f83116001146125875761230792915f918361257c575050614fad565b90555b600684019751926004841015610bee5761238c9860099460ff801983541691161790555160078501555160088401555191015560018060a01b039054165f52600760205261235b8560405f20615000565b335f5260086020526123708560405f20615000565b855f52600a6020526123858560405f20615000565b3691614e7b565b926003549361239a85614ee9565b600355604051906123aa82614d6c565b858252602082018381525f604084019081523360608501908152919291906080850190600380835260a087019485524260c088019081525f8c8152600f60205260409020975188559551600188015590516002870155915191850180546001600160a01b0319166001600160a01b039390931692909217825551600b811015610bee57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c905761246982610b5e8554614daa565b602090601f831160011461251557918061248f9260059695945f926114bb575050614fad565b90555b51910155806124fb575b60405133815293815f915f80516020615dc583398151915260408860036020809b0152a46124cd6040518093614c50565b827f225bf23b3e478c1cfc6d15096209305708f3b44320bf5680ab861f6d66dc5d36853394a4604051908152f35b805f52600b6020526125108460405f20615000565b61249c565b90601f19831691845f52815f20925f5b81811061256457509160019391856005989796941061254c575b505050811b019055612492565b01515f1960f88460031b161c191690558a808061253f565b92936020600181928786015181550195019301612525565b015190508f80610b83565b90601f19831691845f52815f20925f5b8181106125d257509084600195949392106125ba575b505050811b01905561230a565b01515f1960f88460031b161c191690558e80806125ad565b92936020600181928786015181550195019301612597565b015190505f80610b83565b90601f19831691845f52815f20925f5b8181106126405750908460019594939210612628575b505050811b0190556122c2565b01515f1960f88460031b161c191690558f808061261b565b92936020600181928786015181550195019301612605565b63d649753960e01b5f5260045ffd5b630103b55560e71b5f5260045ffd5b346103df5760203660031901126103df576004355f818152600c60205260409020600101546001600160a01b0316156104e1575f818152600c60205260409020600101546001600160a01b0316330361061a575f52600960205260405f206040519081602082549182815201915f5260205f20905f5b8181106127035761187b8561186781870382614d87565b82548452602090930192600192830192016126ec565b346103df5760203660031901126103df576001600160a01b0361273a614bf3565b163381036103ad575f52600560205260405f206040519081602082549182815201915f5260205f20905f5b81811061277c5761187b8561186781870382614d87565b8254845260209093019260019283019201612765565b346103df5760203660031901126103df576004355f818152600c60205260409020600101546001600160a01b0316156104e157805f52601060205260405f20604051906127de82614d35565b80549160ff831615906060600183159586845261ffff8160081c166020850152818060a01b039060181c1694856040850152015491015291612a21575b506103ad576040519061282f606083614d87565b602182527f53656c65637469766520646973636c6f737572652070726f6f662076696577656020830152601960fa1b60408301526003549161287083614ee9565b6003556040519061288082614d6c565b838252602082018381525f6040840190815233606085019081529192919060808501906009825260a086019384524260c087019081525f898152600f60205260409020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b811015610bee57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c905761293f82610b5e8554614daa565b602090601f83116001146129ba5791806129659260059695945f926129af575050614fad565b90555b5191015580612995575b604051338152915f80516020615dc5833981519152604084600960205f970152a4005b805f52600b6020526129aa8260405f20615000565b612972565b015190508980610b83565b90601f19831691845f52815f20925f5b818110612a095750916001939185600598979694106129f1575b505050811b019055612968565b01515f1960f88460031b161c191690558880806129e4565b929360206001819287860151815501950193016129ca565b905033141580612a32575b8261281b565b50805f52600c60205260018060a01b03600160405f20015416331415612a2c565b346103df5760203660031901126103df576001600160401b03600435116103df57610160600435360360031901126103df57612a93600435600401615939565b335f52600460205260ff60405f20541615613504575b5f5460c052612ab960c051614ee9565b5f55612ac9600480350180614f0b565b60e052612ae0602460043501600435600401614f0b565b90612af5604460043501600435600401614f0b565b90612b0a606460043501600435600401614f0b565b9060026084600435013510156103df57612b2c6004803560a481019101614f0b565b91909260043560c40160043560040190612b4591614f0b565b95909660043560e401612b5790614f3d565b98612b6b6004803561012481019101614f0b565b9b909c600435600401612b7d90615c2a565b60805260405160a05260a051612b9290614d19565b60c05160a051523360a051602001523660e051612bae92614e7b565b60a051604001523690612bc092614e7b565b60a051606001523690612bd292614e7b565b60a051608001523690612be492614e7b565b60a05160a001526004356084013560a05160c00190612c0291614e63565b3690612c0d92614e7b565b60a05160e001523690612c1f92614e7b565b60a0516101000152600160a01b60019003191660a0516101200152600435610104013560a05161014001523690612c5592614e7b565b60a080516101600191909152608051815161018001528051426101a090910181905281516101c0015280515f6101e090910181905260c0518152600c6020908152604091829020925180518455908101516001840180546001600160a01b0319166001600160a01b039290921691909117905501518051906001600160401b038211610c9057612cf582612cec6002860154614daa565b60028601614f68565b602090601f831160011461349757612d1692915f918361348c575050614fad565b60028201555b60a05160600151805190919060038201906001600160401b038111610c9057612d4f81612d498454614daa565b84614f68565b6020601f821160011461342b578190612d719394955f9261329c575050614fad565b90555b60a05160800151805190919060048201906001600160401b038111610c9057612da181612d498454614daa565b6020601f82116001146133ca578190612dc39394955f9261329c575050614fad565b90555b60a080510151805190919060058201906001600160401b038111610c9057612df281612d498454614daa565b6020601f8211600114613369578190612e149394955f9261329c575050614fad565b90555b60c060a05101516002811015610bee57612e349060068301614fbf565b60a05160e00151805190919060078201906001600160401b038111610c9057612e6181612d498454614daa565b6020601f8211600114613308578190612e839394955f9261329c575050614fad565b90555b60a0516101000151805190919060088201906001600160401b038111610c9057612eb481612d498454614daa565b6020601f82116001146132a7578190612ed69394955f9261329c575050614fad565b90555b60a080516101208101516009840180546001600160601b0319169190931c17909155610140810151600a830155610160015180519190600b8201906001600160401b038411610c9057612f3084612d498454614daa565b602090601f8511600114613236579380612f5592612f9e965f9261322b575050614fad565b90555b61018060a0510151600c8201556101a060a0510151600d8201556101c060a0510151600e820155600f6101e060a0510151151591019060ff801983541691151516179055565b335f526005602052612fb560c05160405f20615000565b6060604051612fc48282614d87565b602281527f456e6372797074656420646f63756d656e74207365616c6564206f6e2063686160208201526134b760f11b60408201526003549061300682614ee9565b6003556040519061301682614d6c565b82825260c051602083019081525f6040840190815233868501908152919291906080850190600180835260a087019485524260c088019081525f898152600f602052604090209751885595519087015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b811015610bee57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c90576130d782610b5e8554614daa565b602090601f83116001146131c45791806130fd9260059695945f926129af575050614fad565b90555b5191015560c0516131a8575b6040513381525f91600160208301525f80516020615dc5833981519152604060c05193a47f659ae396beda17ddacec30e2b6a7c4505beef74802bd3c1801eeaa541521b49961315f600480350180614f0b565b9190826040519160408352816040840152858301375f8484830101526101046004350135602082015233938160c05194601f80199101168101030190a3602060405160c0518152f35b60c0515f52600b6020526131bf8160405f20615000565b61310c565b90601f19831691845f52815f20925f5b8181106132135750916001939185600598979694106131fb575b505050811b019055613100565b01515f1960f88460031b161c191690558880806131ee565b929360206001819287860151815501950193016131d4565b015190508680610b83565b90601f19851691835f52815f20925f5b8181106132845750916001939187612f9e98941061326c575b505050811b019055612f58565b01515f1960f88460031b161c1916905585808061325f565b92936020600181928786015181550195019301613246565b015190508580610b83565b601f19821690835f52805f20915f5b8181106132f0575095836001959697106132d8575b505050811b019055612ed9565b01515f1960f88460031b161c191690558480806132cb565b9192602060018192868b0151815501940192016132b6565b601f19821690835f52805f20915f5b81811061335157509583600195969710613339575b505050811b019055612e86565b01515f1960f88460031b161c1916905584808061332c565b9192602060018192868b015181550194019201613317565b601f19821690835f52805f20915f5b8181106133b25750958360019596971061339a575b505050811b019055612e17565b01515f1960f88460031b161c1916905584808061338d565b9192602060018192868b015181550194019201613378565b601f19821690835f52805f20915f5b818110613413575095836001959697106133fb575b505050811b019055612dc6565b01515f1960f88460031b161c191690558480806133ee565b9192602060018192868b0151815501940192016133d9565b601f19821690835f52805f20915f5b8181106134745750958360019596971061345c575b505050811b019055612d74565b01515f1960f88460031b161c1916905584808061344f565b9192602060018192868b01518155019401920161343a565b015190508480610b83565b9190600284015f52805f20905f935b601f19841685106134e9576001945083601f198116106134d1575b505050811b016002820155612d1c565b01515f1960f88460031b161c191690558380806134c1565b818101518355602094850194600190930192909101906134a6565b335f52600460205260405f20600160ff19825416179055604080516135298282614d87565b601b81527a5661756c742063726561746564206175746f6d61746963616c6c7960281b60208201526003549061355e82614ee9565b60035582519061356d82614d6c565b8282525f60208301818152858401918252336060850190815290929160808501905f80835260a087019485524260c08801908152888252600f60205290899020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b811015610bee57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c905761362982610b5e8554614daa565b602090601f831160011461369157918061364f9260059695945f926129af575050614fad565b90555b5191015581513381525f915f80516020615dc5833981519152848385602081960152a4514281525f80516020615da583398151915260203392a2612aa9565b90601f19831691845f52815f20925f5b8181106136e05750916001939185600598979694106136c8575b505050811b019055613652565b01515f1960f88460031b161c191690558880806136bb565b929360206001819287860151815501950193016136a1565b346103df5760203660031901126103df576004355f818152600c60205260409020600101546001600160a01b0316156104e1575f818152600c60205260409020600101546001600160a01b0316330361061a575f818152600c602052604090819020600f8101805460ff1916600117905542600e9091015580519061377d8183614d87565b6011825270111bd8dd5b595b9d08185c98da1a5d9959607a1b6020830152600354916137a883614ee9565b6003558151906137b782614d6c565b838252602082018581525f8484019081523360608501908152919291906080850190600a825260a086019384524260c087019081525f898152600f602052889020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b811015610bee57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c905761387482610b5e8554614daa565b602090601f831160011461391357918061389a9260059695945f92613908575050614fad565b90555b51910155826138ef575b8051338152915f80516020615dc5833981519152849284600a60205f970152a433907fc7a48851f43b41aef9785f0be9f7abfc1dd97ed30261a5991f1dc74003474bc85f80a3005b825f52600b60205261390382825f20615000565b6138a7565b015190508a80610b83565b90601f19831691845f52815f20925f5b81811061396257509160019391856005989796941061394a575b505050811b01905561389d565b01515f1960f88460031b161c1916905589808061393d565b92936020600181928786015181550195019301613923565b346103df5760203660031901126103df576004355f818152600c60205260409020600101546001600160a01b0316156104e1575f52600c602052602060018060a01b03600160405f20015416604051908152f35b346103df5760803660031901126103df576024356004356001600160401b03821682036103df5760443580151581036103df576064356001600160401b0381116103df57613a20903690600401614c5d565b92805f52600e60205260405f209160018060a01b0360028401541680156120a057330361061a57600683019460ff8654166004811015610bee57613b1d57602096600996613ab189937f34246d6a687ed0f105bff790faf1870be323147cef0ae03c617295a4e0a8c00595600189019485549a60038b019b8c549060ff8260a01c169160018060a01b03169061561f565b9788968792600160ff198254161790554260088201550155613b01815460405190613add604083614d87565b601082526f14995c5d595cdd08185c1c1c9bdd995960821b858301528733916153e7565b5494546040516001600160a01b039091168152a4604051908152f35b637f899aa760e11b5f5260045ffd5b346103df575f3660031901126103df57335f52600460205260ff60405f20541615613b5357005b335f52600460205260405f20600160ff1982541617905560408051613b788282614d87565b600d81526c15985d5b1d0818dc99585d1959609a1b602082015260035490613b9f82614ee9565b600355825190613bae82614d6c565b8282525f60208301818152858401918252336060850190815290929160808501905f80835260a087019485524260c08801908152888252600f60205290899020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b811015610bee57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c9057613c6a82610b5e8554614daa565b602090601f8311600114613ccf579180613c909260059695945f926129af575050614fad565b90555b5191015581513381525f915f80516020615dc5833981519152848385602081960152a4514281525f80516020615da583398151915260203392a2005b90601f19831691845f52815f20925f5b818110613d1e575091600193918560059897969410613d06575b505050811b019055613c93565b01515f1960f88460031b161c19169055888080613cf9565b92936020600181928786015181550195019301613cdf565b346103df5760403660031901126103df57600435613d52614c09565b5f828152600c60205260409020600101546001600160a01b0316156104e1575f828152600c60205260409020600101546001600160a01b0316330361061a576001600160a01b03811615610d8b57815f52601060205260ff60405f205416156103ad57613de090825f526012602052613dcf8160405f20546155bf565b825f52601060205260405f20614ec0565b805f52601060205242600160405f2001556040908151613e008382614d87565b6014815273141c9bdbd9881d9a595dd95c881d5c19185d195960621b602082015260035490613e2e82614ee9565b600355835190613e3d82614d6c565b828252602082018481525f86840190815233606085019081529192919060808501906009825260a086019384524260c087019081525f888152600f6020528a9020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b811015610bee57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c9057613efa82610b5e8554614daa565b602090601f8311600114613f66579180613f209260059695945f92613908575050614fad565b90555b5191015581613f4d575b82513381525f9381600960205f80516020615dc5833981519152940152a4005b815f52600b602052613f6181845f20615000565b613f2d565b90601f19831691845f52815f20925f5b818110613fb5575091600193918560059897969410613f9d575b505050811b019055613f23565b01515f1960f88460031b161c19169055898080613f90565b92936020600181928786015181550195019301613f76565b346103df5760203660031901126103df576004355f818152600c60205260409020600101546001600160a01b0316156104e1575f818152600c60205260409020600101546001600160a01b0316330361061a575f52600a60205260405f206040519081602082549182815201915f5260205f20905f5b81811061405a5761187b8561186781870382614d87565b8254845260209093019260019283019201614043565b346103df5761407e36614c8a565b825f93929352600d60205260405f20614097338261517c565b15611b465761010082116126585760016140b79101938454923691614e7b565b90600354916140c583614ee9565b600355604051906140d582614d6c565b838252602082018381526040830186815233606085019081529192919060808501906007825260a086019384524260c087019081525f898152600f60205260409020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b811015610bee57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c905761419382610b5e8554614daa565b602090601f831160011461422b5791806141b99260059695945f926114bb575050614fad565b90555b5191015580614211575b604051338152915f80516020615dc58339815191526040846007602088970152a4339154907f9d71a02fe53bc9c4008286802e8888c5db06988a8ed24174c377e0e5b9dc1e935f80a4005b805f52600b6020526142268260405f20615000565b6141c6565b90601f19831691845f52815f20925f5b81811061427a575091600193918560059897969410614262575b505050811b0190556141bc565b01515f1960f88460031b161c191690558a8080614255565b9293602060018192878601518155019501930161423b565b346103df5760203660031901126103df576004355f6101e06040516142b681614d19565b8281528260208201526060604082015260608082015260606080820152606060a08201528260c0820152606060e082015260606101008201528261012082015282610140820152606061016082015282610180820152826101a0820152826101c08201520152805f52600c60205260018060a01b03600160405f20015416156104e1575f818152600c60205260409020600101546001600160a01b0316330361061a575f52600c60205260405f2060ff600f6040519261437584614d19565b8054845260018101546001600160a01b031660208501526040516143a081610f6d8160028601614de2565b60408501526040516143b981610f6d8160038601614de2565b60608501526040516143d281610f6d8160048601614de2565b60808501526040516143eb81610f6d8160058601614de2565b60a08501526144038360068301541660c08601614e63565b60405161441781610f6d8160078601614de2565b60e085015260405161443081610f6d8160088601614de2565b610100850152600981015460a01b6001600160a01b031916610120850152600a81015461014085015260405161446d81610f6d81600b8601614de2565b610160850152600c810154610180850152600d8101546101a0850152600e8101546101c085015201541615156101e08201526040518091602082528051602083015260018060a01b0360208201511660408301526101e06145ad61457461455c61453361451d6145076144f1604089015161020060608c01526102208b0190614c1f565b60608901518a8203601f190160808c0152614c1f565b6080880151898203601f190160a08b0152614c1f565b60a0870151888203601f190160c08a0152614c1f565b61454560c087015160e0890190614c43565b60e0860151878203601f1901610100890152614c1f565b610100850151868203601f1901610120880152614c1f565b60018060a01b031961012085015116610140860152610140840151610160860152610160840151601f1986830301610180870152614c1f565b916101808101516101a08501526101a08101516101c08501526101c081015182850152015115156102008301520390f35b346103df5760203660031901126103df576004355f908152600e6020526040902060028101546001600160a01b0316156120a05760038101546001600160a01b0316330361468e576006810160ff8154166004811015610bee57613b1d5761468c91600191600360ff19825416179055426008820155015460405190614665604083614d87565b601382527214995c5d595cdd195c8818d85b98d95b1b1959606a1b60208301523390615228565b005b6371ced2cf60e11b5f5260045ffd5b346103df576146ab36614c8a565b5f838152600e602052604090206002810154909291906001600160a01b031680156120a057330361061a57600683019060ff8254166004811015610bee57613b1d5761010081116126585761472591600260ff1982541617905542600885015561471d60018501938454923691614e7b565b903390615228565b546003909101546001600160a01b0316917fb14ccaa663dadced73f667574cce8204a30355ab0dbcc7cb474eb1bd2d298e5d5f80a4005b346103df5760203660031901126103df575f61026060405161477d81614cfd565b8281528260208201526060604082015260608082015260606080820152606060a08201528260c0820152606060e082015260606101008201528261012082015282610140820152606061016082015282610180820152826101a0820152826101c0820152826101e082015282610200820152826102208201528261024082015201526004355f52600d60205260405f2060018060a01b03600282015416156103d057614829338261517c565b15611b4657600381015461484960ff8260a81c1660ff8360a01c1661520d565b156103ad5760018201545f52600c60205260405f20805492600160a01b6001900360018301541691600681015460ff1691600982015460a01b90600a83015490600c84015491600d85015493600e86015495600f81015460ff16978454996040519c6148b48e614cfd565b8d5260208d0152604051806148cc8160028601614de2565b036148d79082614d87565b60408d0152604051808060038501906148ef91614de2565b036148fa9082614d87565b60608d0152604051806149108160048601614de2565b0361491b9082614d87565b60808d0152604051806149318160058601614de2565b0361493c9082614d87565b60a08d015261494e9060c08d01614e63565b6040518061495f8160078501614de2565b0361496a9082614d87565b60e08c01526040518060088193019061498291614de2565b0361498d9082614d87565b6101008b01526001600160a01b0319166101208a01526101408901526040519081906149bd908290600401614de2565b036149c89082614d87565b6101608801526101808701526101a08601526101c085015215156101e0840152610200830152614a0360ff60a083901c166102208401614e6f565b60ff60a882901c16151561024083015260b01c6001600160401b03166102608201526040805160208082528351818301528301516001600160a01b03168183015290820151610280606083015290918291614a63906102a0840190614c1f565b6060820151838203601f19016080850152614a7e9190614c1f565b6080820151838203601f190160a0850152614a999190614c1f565b60a0820151838203601f190160c0850152614ab49190614c1f565b60c082015160e08401614ac691614c43565b60e0820151838203601f1901610100850152614ae29190614c1f565b610100820151838203601f1901610120850152614aff9190614c1f565b6101208201516001600160a01b0319166101408481019190915282015161016080850191909152820151838203601f1901610180850152614b409190614c1f565b906101808101516101a08401526101a08101516101c08401526101c08101516101e08401526101e081015115156102008401526102008101516102208401526102208101516102408401614b9391614c50565b61024081015115156102608481019190915201516001600160401b03166102808301520390f35b346103df5760203660031901126103df576020906001600160a01b03614bde614bf3565b165f526004825260ff60405f20541615158152f35b600435906001600160a01b03821682036103df57565b602435906001600160a01b03821682036103df57565b805180835260209291819084018484015e5f828201840152601f01601f1916010190565b906002821015610bee5752565b906005821015610bee5752565b9181601f840112156103df578235916001600160401b0383116103df57602083818601950101116103df57565b9060406003198301126103df5760043591602435906001600160401b0382116103df57614cb991600401614c5d565b9091565b90602080835192838152019201905f5b818110614cda5750505090565b8251845260209384019390920191600101614ccd565b90600b821015610bee5752565b61028081019081106001600160401b03821117610c9057604052565b61020081019081106001600160401b03821117610c9057604052565b608081019081106001600160401b03821117610c9057604052565b61016081019081106001600160401b03821117610c9057604052565b60e081019081106001600160401b03821117610c9057604052565b601f909101601f19168101906001600160401b03821190821017610c9057604052565b90600182811c92168015614dd8575b6020831014614dc457565b634e487b7160e01b5f52602260045260245ffd5b91607f1691614db9565b5f9291815491614df183614daa565b8083529260018116908115614e465750600114614e0d57505050565b5f9081526020812093945091925b838310614e2c575060209250010190565b600181602092949394548385870101520191019190614e1b565b915050602093945060ff929192191683830152151560051b010190565b6002821015610bee5752565b6005821015610bee5752565b9192916001600160401b038211610c905760405191614ea4601f8201601f191660200184614d87565b8294818452818301116103df578281602093845f960137010152565b80546301000000600160b81b03191660189290921b6301000000600160b81b0316919091179055565b5f198114614ef75760010190565b634e487b7160e01b5f52601160045260245ffd5b903590601e19813603018212156103df57018035906001600160401b0382116103df576020019181360383136103df57565b356001600160a01b0319811681036103df5790565b818110614f5d575050565b5f8155600101614f52565b9190601f8111614f7757505050565b614fa1925f5260205f20906020601f840160051c83019310614fa3575b601f0160051c0190614f52565b565b9091508190614f94565b8160011b915f199060031b1c19161790565b906002811015610bee5760ff80198354169116179055565b8054821015614fec575f5260205f2001905f90565b634e487b7160e01b5f52603260045260245ffd5b8054600160401b811015610c905761501d91600182018155614fd7565b819291549060031b91821b915f19901b1916179055565b906005811015610bee57815460ff60a01b191660a09190911b60ff60a01b16179055565b6001600160401b038111610c905760051b60200190565b805115614fec5760200190565b805160011015614fec5760400190565b805160021015614fec5760600190565b8051821015614fec5760209160051b010190565b600b821015610bee5752565b359060ff821682036103df57565b5f818152600c60205260409020600101549091906001600160a01b0316156104e1576150f5916150f8565b90565b5f818152600c60205260409020600101546001600160a01b03838116911614615175575f52600960205260405f205f918154925b83811061513b57505050505f90565b6151458184614fd7565b90549060031b1c5f52600d6020526151608260405f2061517c565b61516c5760010161512c565b50505050600190565b5050600190565b60028101546001600160a01b0316151591826151f2575b50816151df575b816151c5575b816151a9575090565b6001915001545f52600c60205260ff600f60405f200154161590565b600381015460b01c6001600160401b0316421091506151a0565b600381015460f01c60ff1615915061519a565b60038201546001600160a01b0391821691161491505f615193565b8115615217575090565b90506005811015610bee5760011490565b90916003549061523782614ee9565b6003556040519061524782614d6c565b828252602082018481525f604084019081526001600160a01b0390961660608401818152909691929160808501906005825260a086019384524260c087019081525f888152600f60205260409020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b811015610bee57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c905761531182610b5e8554614daa565b602090601f83116001146153805791806153379260059695945f926125ea575050614fad565b90555b5191015581615366575b6040519283525f80516020615dc5833981519152604084600560205f970152a4565b815f52600b60205261537b8160405f20615000565b615344565b90601f19831691845f52815f20925f5b8181106153cf5750916001939185600598979694106153b7575b505050811b01905561533a565b01515f1960f88460031b161c191690555f80806153aa565b92936020600181928786015181550195019301615390565b91929092600354916153f883614ee9565b6003556040519061540882614d6c565b83825260208201858152604083018781526001600160a01b0390941660608401818152909491929160808501906004825260a086019384524260c087019081525f898152600f60205260409020965187559451600187015551600286015590516003850180546001600160a01b0319166001600160a01b03929092169190911781559051600b811015610bee57815460ff60a01b191660a09190911b60ff60a01b1617905551805160048401916001600160401b038211610c90576154d182610b5e8554614daa565b602090601f831160011461553f5791806154f79260059695945f926125ea575050614fad565b90555b5191015582615525575b604051908152604081600460205f80516020615dc5833981519152940152a4565b825f52600b60205261553a8260405f20615000565b615504565b90601f19831691845f52815f20925f5b81811061558e575091600193918560059897969410615576575b505050811b0190556154fa565b01515f1960f88460031b161c191690555f8080615569565b9293602060018192878601518155019501930161554f565b9081526001600160a01b03909116602082015260400190565b5f80516020615d858339815191523b156103df57604051631974142760e21b8152915f91839182916155f59190600484016155a6565b0381835f80516020615d858339815191525af18015610cd5576156155750565b5f614fa191614d87565b93949290969591845f52600c60205260405f2095600187019860018060a01b038a54169788156104e157600f015460ff16610d7c576001600160a01b031696871590811561592f575b50610d8b576001600160401b0316924284111561592157615689838361520d565b9081615902575b6001549561569d87614ee9565b600155995495998a966001600160a01b031692156158ea576156c0913691614e7b565b604051936156cd85614d50565b86855260208501938885526040860193845260608601918a83526156f5608088019283614e6f565b151560a0870190815260c087018881525f60e089018181526101008a01968752426101208b019081526101408b018381528d8452600d60205260409093209a518b55985160018b0155965160028a0180546001600160a01b03199081166001600160a01b0393841617909155955160038b01805490971691161785559251929695929091906005811015610bee5761578d9085615034565b51835491519251600160a81b600160f81b031990921690151560a81b60ff60a81b161760b09290921b600160b01b600160f01b03169190911790151560f01b60ff60f01b1617905551805160048501916001600160401b038211610c90576157f982610b5e8554614daa565b602090601f83116001146158705792615832835f80516020615de583398151915299979460209997946006975f926125ea575050614fad565b90555b51600584015551910155845f52600982526158538460405f20615000565b855f52600682526158678460405f20615000565b604051908152a4565b90601f19831691845f52815f20925f5b8181106158d2575093602098969360069693600193835f80516020615de58339815191529d9b98106158ba575b505050811b019055615835565b01515f1960f88460031b161c191690555f80806158ad565b92936020600181928786015181550195019301615880565b50506040516158fa602082614d87565b5f81526156c0565b8015612667576110008111156156905763d649753960e01b5f5260045ffd5b62d36c8560e81b5f5260045ffd5b905087145f615668565b6159438180614f0b565b809150156126675760601061265857602081016159608183614f0b565b8091501561266757603010612658576040820161597d8184614f0b565b809150156126675760a010612658576060830161599a8185614f0b565b8091501561266757605010612658576159b7610120850185614f0b565b809150156126675761100010612658576159d46123858580614f0b565b60208151910120916040926010602085516159ef8782614d87565b828152016f141c9a5d985d1948191bd8dd5b595b9d60821b8152201493841594615be8575b508315615b97575b508215615b44575b5050615b355761010081013515615b26576001600160a01b0319615a4a60e08301614f3d565b1615615b1757608081013560028110156103df57615adc5760a08101615a708183614f0b565b9050156126675762018000615a858284614f0b565b905011615acd57610140820135908115159283615ab5575b505050615aa657565b633ef7de5560e21b5f5260045ffd5b615ac0929350614f0b565b91905014155f8080615a9d565b63492f620d60e01b5f5260045ffd5b615ae960c0820182614f0b565b809150156126675760a01061265857615b0560a0820182614f0b565b9050615aa657610140013515615aa657565b6311fcbd5d60e31b5f5260045ffd5b63a84ab60d60e01b5f5260045ffd5b6348c8ae6b60e11b5f5260045ffd5b6018919250615b5861238560209286614f0b565b81815191012092615b6b81519182614d87565b82815201776170706c69636174696f6e2f6f637465742d73747265616d60401b81522014155f80615a24565b615ba79193506123859085614f0b565b60208151910120601660208351615bbe8582614d87565b828152017539b434b2b6323237b1b996b83934bb30ba32973134b760511b8152201415915f615a1c565b615bf89194506123859086614f0b565b60208151910120600760208451615c0f8682614d87565b82815201665072697661746560c81b8152201415925f615a14565b608081013560028110156103df5715615c4557610140013590565b8060a0615c53920190614f0b565b905090565b5f80516020615d858339815191523b156103df575f6155f59160405180938192631974142760e21b83523090600484016155a6565b91615cb49060ff6150f59593168452601a6020850152608060408501526080840190614cbd565b916060818403910152614cbd565b6020615d3581604051615cd58282614d87565b5f81525f36813760405190615ceb608083614d87565b60038252606036848401375f615d008361506f565b526003615d0c8361507c565b525f615d178361508c565b52604051631888debd60e01b81529384928392600360048501615c8d565b03815f5f80516020615d858339815191525af1918215610cd5575f92615d5a57505090565b90809250813d8311615d7d575b615d718183614d87565b810103126103df575190565b503d615d6756fe000000000000000000000000ea30c4b8b44078bbf8a6ef5b9f1ec1626c7848d9a510df27d6e51efd91d3f55722bad1f26bf924a63e5dcee07c2ab4c3d4992dcc29f0115e94a047807998c437133d5afe9862520aada511bac03259cecb04522c3d496924eaca2c40f67d1643057731c58b5f24a0f38f7808fea610bcabd42971a2646970667358221220b1e7207f390618f714311e418e97b50212bc78afa2c4a532cf0a10019ecbbde364736f6c634300081a0033" as const;
