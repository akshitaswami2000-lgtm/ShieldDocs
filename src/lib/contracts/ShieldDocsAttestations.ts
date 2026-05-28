export const shieldDocsAttestationsAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "shieldDocsAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "AttestationExpired",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidSignature",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotAdmin",
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
    "name": "UntrustedIssuer",
    "type": "error"
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
        "indexed": true,
        "internalType": "address",
        "name": "issuer",
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
        "internalType": "bool",
        "name": "result",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "attestationHash",
        "type": "bytes32"
      }
    ],
    "name": "AttestedAgeProofCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "issuer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "trusted",
        "type": "bool"
      }
    ],
    "name": "TrustedIssuerUpdated",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "admin",
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
      },
      {
        "internalType": "address",
        "name": "subject",
        "type": "address"
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
        "internalType": "address",
        "name": "issuer",
        "type": "address"
      },
      {
        "internalType": "uint64",
        "name": "issuedAt",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "expiresAt",
        "type": "uint64"
      },
      {
        "internalType": "bool",
        "name": "result",
        "type": "bool"
      }
    ],
    "name": "ageAttestationMessageHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
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
        "internalType": "address",
        "name": "issuer",
        "type": "address"
      },
      {
        "internalType": "uint64",
        "name": "issuedAt",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "expiresAt",
        "type": "uint64"
      },
      {
        "internalType": "bool",
        "name": "result",
        "type": "bool"
      },
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      }
    ],
    "name": "createAttestedAgeProof",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "attestationHash",
        "type": "bytes32"
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
    "name": "getAttestedAgeProof",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "exists",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "documentId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "subject",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "verifier",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "issuer",
            "type": "address"
          },
          {
            "internalType": "uint16",
            "name": "threshold",
            "type": "uint16"
          },
          {
            "internalType": "bool",
            "name": "result",
            "type": "bool"
          },
          {
            "internalType": "bytes32",
            "name": "attestationHash",
            "type": "bytes32"
          },
          {
            "internalType": "uint64",
            "name": "issuedAt",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "expiresAt",
            "type": "uint64"
          },
          {
            "internalType": "uint256",
            "name": "updatedAt",
            "type": "uint256"
          }
        ],
        "internalType": "struct ShieldDocsAttestations.AttestedAgeProof",
        "name": "proof",
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
        "name": "issuer",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "trusted",
        "type": "bool"
      }
    ],
    "name": "setTrustedIssuer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "shieldDocs",
    "outputs": [
      {
        "internalType": "contract IShieldDocsOwnerLookup",
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
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "trustedIssuers",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const shieldDocsAttestationsBytecode = "0x60c0346100e457601f610bc238819003918201601f19168301916001600160401b038311848410176100e8578084926020946040528339810103126100e457516001600160a01b038116908190036100e45780156100d5573360805260a052335f525f60205260405f20600160ff19825416179055604051600181527f462419a2b504f99d423732b4f90bc923eedcb86c43bae1bf81bedc326bd9d1d060203392a2604051610ac590816100fd8239608051818181607e015261052d015260a05181818160c6015281816101c201526109340152f35b63e6c4247b60e01b5f5260045ffd5b5f80fd5b634e487b7160e01b5f52604160045260245ffdfe6080806040526004361015610012575f80fd5b5f3560e01c9081632a42fe6b14610655575080632d2a03a8146105c65780638b0e62881461050357806392c54daf146104c7578063a1060131146100f5578063e415ec50146100b15763f851a44014610069575f80fd5b346100ad575f3660031901126100ad576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b5f80fd5b346100ad575f3660031901126100ad576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b346100ad576101003660031901126100ad576004356024359061ffff8216918281036100ad57604435916001600160a01b038316908184036100ad57610139610851565b94608435936001600160401b038516918286036100ad5761015861087d565b9160c4359788151591828a036100ad5760e435996001600160401b038b116100ad573660238c0112156100ad5760048b0135996001600160401b038b116100ad57368b8d01602401116100ad57604051636353c5a360e01b8152600481018a9052906020826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa9182156104bc575f92610478575b506001600160a01b0382169d338f9003610469578b158015610458575b6104495760018060a01b0381169c8d5f525f60205260ff60405f2054161561043a57428b118015610427575b61041857604103610409578c9561025c958a948d6108e6565b986001600160a01b0390610273906024018b6109c7565b1603610409576020986007867fb4697c470198bba1a8735af0a1de9b44211e97be600ed1613770d922ee252971966060968c8c8c604051976102b489610893565b60018952602089019187835260408a019182528c8a0190815260808a0193845260a08a01918c835260c08b01938c855260e08c019687526101008c019889526101208c019760018060401b031688526101408c0199428b525f5260206001905261033160405f209c5115158d9060ff801983541691151516179055565b5160018c01555160028b0180546001600160a01b03199081166001600160a01b0393841617909155915160038c01805490931690821617909155925160048a018054925193516001600160b81b0319909316919094161760a09290921b61ffff60a01b169190911790151560b01b60ff60b01b16179055516005860155905160068501805492516001600160801b03199093166001600160401b039290921691909117604092831b600160401b600160801b0316179055905191909201558051928352898301919091528101879052a4604051908152f35b638baa579f60e01b5f5260045ffd5b63716dcc3960e01b5f5260045ffd5b50426001600160401b038b161115610243565b633eb89d5f60e11b5f5260045ffd5b63e6c4247b60e01b5f5260045ffd5b506001600160a01b03811615610217565b63c5e0ae3f60e01b5f5260045ffd5b9091506020813d6020116104b4575b81610494602093836108c3565b810103126100ad57516001600160a01b03811681036100ad57908e6101fa565b3d9150610487565b6040513d5f823e3d90fd5b346100ad5760203660031901126100ad576001600160a01b036104e8610867565b165f525f602052602060ff60405f2054166040519015158152f35b346100ad5760403660031901126100ad5761051c610867565b60243590811515908183036100ad577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031633036105b7576001600160a01b0316918215610449577f462419a2b504f99d423732b4f90bc923eedcb86c43bae1bf81bedc326bd9d1d0916105ae602092855f525f845260405f209060ff801983541691151516179055565b604051908152a2005b637bfa4b9f60e01b5f5260045ffd5b346100ad576101003660031901126100ad576024356001600160a01b03811681036100ad576044359061ffff821682036100ad57610602610851565b6084356001600160a01b03811681036100ad5761061d61087d565b60c435916001600160401b03831683036100ad5760e4359384151585036100ad5760209661064d966004356108e6565b604051908152f35b346100ad5760203660031901126100ad5761066f81610893565b5f8152602081015f9052604081015f9052606081015f9052608081015f905260a081015f905260c081015f905260e081015f905261010081015f905261012081015f9052610140015f90526004355f52600160205260405f206040516106d481610893565b80825460ff161580159384835260018101549460208401958652600160a01b60019003600283015416906040850196828852600160a01b6001900360038501541660608701928184526004860154936080890191600160a01b600190038616835260a08a01938660a01c61ffff16855260c08b019660b01c60ff161515875260058901549760e08c0198895260068a01549a6101008d019a8d8d600160401b60019003168d52610120019c600160401b600190039060401c168d52600701549c610140019c8d5292610833575b505061082457604080519a5115158b52935160208b015299516001600160a01b03908116938a01939093529851821660608901529751166080870152955161ffff1660a08601529451151560c0850152935160e084015292516001600160401b039081166101008401529251909216610120820152905161014082015261016090f35b63ea8e4eb560e01b5f5260045ffd5b331415915081610846575b508c806107a1565b90503314158c61083e565b606435906001600160a01b03821682036100ad57565b600435906001600160a01b03821682036100ad57565b60a435906001600160401b03821682036100ad57565b61016081019081106001600160401b038211176108af57604052565b634e487b7160e01b5f52604160045260245ffd5b601f909101601f19168101906001600160401b038211908210176108af57604052565b604080516101806020820181815260186101a08401527729b434b2b6322237b1b9a0b3b2a0ba3a32b9ba30ba34b7b760411b6101c08085019190915230948401949094526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000008116606085015246608085015260a084019590955294841660c083015261ffff9590951660e082015294821661010086015294166101208401526001600160401b0394851661014084015294909316610160820152931515918401919091528252906109c16101e0826108c3565b51902090565b60408201355f1a601b8110610a6f575b60ff1691601b83141580610a64575b610a5d57602092836080925f94604051838101917b0ca2ba3432b932bab69029b4b3b732b21026b2b9b9b0b3b29d05199960211b8352603c820152603c8152610a30605c826108c3565b5190209260405193845282840152803560408401520135606082015282805260015afa156104bc575f5190565b5050505f90565b50601c8314156109e6565b601b0160ff8111156109d757634e487b7160e01b5f52601160045260245ffdfea264697066735822122079050eb07b822b96526efb49bd220c3026a9038f1780c7d74cf6d6505668e7c464736f6c634300081a0033" as const;
