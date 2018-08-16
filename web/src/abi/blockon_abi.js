const abi = [
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'publicAddress',
        type: 'address'
      },
      {
        name: 'email',
        type: 'string'
      }
    ],
    name: 'createAccount',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'agentID',
        type: 'address'
      },
      {
        name: 'sellerID',
        type: 'address'
      },
      {
        name: 'buyerID',
        type: 'address'
      },
      {
        name: 'contractType',
        type: 'uint8'
      }
    ],
    name: 'createContract',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

export default abi;
