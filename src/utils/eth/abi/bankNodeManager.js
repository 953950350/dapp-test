const BANK_NODE_MANAGER = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    inputs: [],
    name: "CONFIGURE_NODE_MANAGER_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "tokenContract", type: "address" },
          { internalType: "address", name: "swapMarket", type: "address" },
          { internalType: "uint24", name: "swapMarketPoolFee", type: "uint24" },
          { internalType: "uint8", name: "decimals", type: "uint8" },
          { internalType: "uint256", name: "valueMultiplier", type: "uint256" },
          {
            internalType: "uint16",
            name: "unusedFundsLendingMode",
            type: "uint16",
          },
          {
            internalType: "address",
            name: "unusedFundsLendingContract",
            type: "address",
          },
          {
            internalType: "address",
            name: "unusedFundsLendingToken",
            type: "address",
          },
          { internalType: "string", name: "symbol", type: "string" },
          { internalType: "string", name: "poolSymbol", type: "string" },
        ],
        internalType: "struct IBankNodeManager.LendableToken",
        name: "_lendableToken",
        type: "tuple",
      },
      { internalType: "uint8", name: "enabled", type: "uint8" },
    ],
    name: "addLendableToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "bankNodeAddressToId",
    outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bankNodeCount",
    outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint32", name: "bankNodeId", type: "uint32" }],
    name: "bankNodeIdExists",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bankNodeLendingRewards",
    outputs: [
      {
        internalType: "contract BankNodeLendingRewards",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint32", name: "", type: "uint32" }],
    name: "bankNodes",
    outputs: [
      { internalType: "address", name: "bankNodeContract", type: "address" },
      { internalType: "address", name: "bankNodeToken", type: "address" },
      {
        internalType: "address",
        name: "bnplStakingPoolContract",
        type: "address",
      },
      {
        internalType: "address",
        name: "bnplStakingPoolToken",
        type: "address",
      },
      { internalType: "address", name: "lendableToken", type: "address" },
      { internalType: "address", name: "creator", type: "address" },
      { internalType: "uint32", name: "id", type: "uint32" },
      { internalType: "uint64", name: "createdAt", type: "uint64" },
      { internalType: "string", name: "nodeName", type: "string" },
      { internalType: "string", name: "website", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bnplToken",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "uint256", name: "tokensToBond", type: "uint256" },
      {
        internalType: "address",
        name: "lendableTokenAddress",
        type: "address",
      },
      { internalType: "string", name: "nodeName", type: "string" },
      { internalType: "string", name: "website", type: "string" },
    ],
    name: "createBondedBankNode",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "enabledLendableTokens",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint32", name: "bankNodeId", type: "uint32" }],
    name: "getBankNodeContract",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint32", name: "bankNodeId", type: "uint32" }],
    name: "getBankNodeLendableToken",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint32", name: "bankNodeId", type: "uint32" }],
    name: "getBankNodeStakingPoolContract",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint32", name: "bankNodeId", type: "uint32" }],
    name: "getBankNodeStakingPoolToken",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint32", name: "bankNodeId", type: "uint32" }],
    name: "getBankNodeToken",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "getRoleMember",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
    name: "getRoleMemberCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IBNPLProtocolConfig",
        name: "_protocolConfig",
        type: "address",
      },
      { internalType: "address", name: "_configurator", type: "address" },
      {
        internalType: "uint256",
        name: "_minimumBankNodeBondedAmount",
        type: "uint256",
      },
      {
        internalType: "contract BankNodeLendingRewards",
        name: "_bankNodeLendingRewards",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lendableTokens",
    outputs: [
      { internalType: "address", name: "tokenContract", type: "address" },
      { internalType: "address", name: "swapMarket", type: "address" },
      { internalType: "uint24", name: "swapMarketPoolFee", type: "uint24" },
      { internalType: "uint8", name: "decimals", type: "uint8" },
      { internalType: "uint256", name: "valueMultiplier", type: "uint256" },
      {
        internalType: "uint16",
        name: "unusedFundsLendingMode",
        type: "uint16",
      },
      {
        internalType: "address",
        name: "unusedFundsLendingContract",
        type: "address",
      },
      {
        internalType: "address",
        name: "unusedFundsLendingToken",
        type: "address",
      },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "string", name: "poolSymbol", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minimumBankNodeBondedAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "protocolConfig",
    outputs: [
      {
        internalType: "contract IBNPLProtocolConfig",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenContract", type: "address" },
      { internalType: "uint8", name: "enabled", type: "uint8" },
    ],
    name: "setLendableTokenStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_minimumBankNodeBondedAmount",
        type: "uint256",
      },
    ],
    name: "setMinimumBankNodeBondedAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
];

export default BANK_NODE_MANAGER;