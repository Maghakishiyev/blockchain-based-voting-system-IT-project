/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type {
  BlockchainVoting,
  BlockchainVotingInterface,
} from "../BlockchainVoting";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
    ],
    name: "ElectionCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "results",
        type: "uint256[]",
      },
    ],
    name: "ElectionEnded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "voter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "candidateId",
        type: "uint256",
      },
    ],
    name: "VoteCast",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "VoterRegistered",
    type: "event",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        internalType: "string[]",
        name: "candidates",
        type: "string[]",
      },
    ],
    name: "createElection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "electionCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "elections",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
    ],
    name: "endElection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
    ],
    name: "getCandidates",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
    ],
    name: "getElectionDetails",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        internalType: "string[]",
        name: "candidates",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "results",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
    ],
    name: "getResults",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "getVoterProfile",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
    ],
    name: "getVoters",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "voters",
        type: "address[]",
      },
    ],
    name: "registerMultipleVoters",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "registerVoter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "candidateId",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550612e88806100606000396000f3fe6080604052600436106100c65760003560e01c80639430e2581161007f578063b384abef11610059578063b384abef146102e8578063bc27904714610311578063f60499241461033a578063f851a4401461037c57610106565b80639430e2581461025757806394c790bb146102965780639c98bcbb146102bf57610106565b806317517e051461010b5780633e39a7a5146101345780635e6fef011461017157806361e37417146101b257806381a60c0d146101dd57806386b646f21461021a57610106565b36610106576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100fd906127ff565b60405180910390fd5b600080fd5b34801561011757600080fd5b50610132600480360381019061012d9190611f2b565b6103a7565b005b34801561014057600080fd5b5061015b60048036038101906101569190611ec6565b6106ac565b60405161016891906126ce565b60405180910390f35b34801561017d57600080fd5b5061019860048036038101906101939190611ec6565b610803565b6040516101a9959493929190612a96565b60405180910390f35b3480156101be57600080fd5b506101c76108ce565b6040516101d4919061299f565b60405180910390f35b3480156101e957600080fd5b5061020460048036038101906101ff9190611ec6565b6108d4565b60405161021191906126f0565b60405180910390f35b34801561022657600080fd5b50610241600480360381019061023c9190611ec6565b610aac565b60405161024e91906126ac565b60405180910390f35b34801561026357600080fd5b5061027e60048036038101906102799190611eef565b610bb8565b60405161028d93929190612712565b60405180910390f35b3480156102a257600080fd5b506102bd60048036038101906102b89190611eef565b610d28565b005b3480156102cb57600080fd5b506102e660048036038101906102e19190611ec6565b610fc7565b005b3480156102f457600080fd5b5061030f600480360381019061030a9190611f7f565b6112c1565b005b34801561031d57600080fd5b5061033860048036038101906103339190611e33565b6115e3565b005b34801561034657600080fd5b50610361600480360381019061035c9190611ec6565b6117da565b60405161037396959493929190612749565b60405180910390f35b34801561038857600080fd5b50610391611af9565b60405161039e9190612691565b60405180910390f35b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610435576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161042c9061295f565b60405180910390fd5b81600154811115801561045d5750806002600083815260200190815260200160002060000154145b61049c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104939061287f565b60405180910390fd5b600060026000858152602001908152602001600020905060005b83518110156106a55760008482815181106104fa577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015190508260050160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff1615610596576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161058d906128df565b60405180910390fd5b60018360050160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160006101000a81548160ff02191690831515021790555082600601819080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507ff45b8429c36d478f9a6d081c4811a819b98aa5b608588bed9d406405cf28247386826040516106899291906129ba565b60405180910390a150808061069d90612d3d565b9150506104b6565b5050505050565b60608160015481111580156106d65750806002600083815260200190815260200160002060000154145b610715576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161070c9061287f565b60405180910390fd5b60026000848152602001908152602001600020600401805480602002602001604051908101604052809291908181526020016000905b828210156107f757838290600052602060002001805461076a90612d0b565b80601f016020809104026020016040519081016040528092919081815260200182805461079690612d0b565b80156107e35780601f106107b8576101008083540402835291602001916107e3565b820191906000526020600020905b8154815290600101906020018083116107c657829003601f168201915b50505050508152602001906001019061074b565b50505050915050919050565b600260205280600052604060002060009150905080600001549080600101805461082c90612d0b565b80601f016020809104026020016040519081016040528092919081815260200182805461085890612d0b565b80156108a55780601f1061087a576101008083540402835291602001916108a5565b820191906000526020600020905b81548152906001019060200180831161088857829003601f168201915b5050505050908060020154908060030154908060080160009054906101000a900460ff16905085565b60015481565b60608160015481111580156108fe5750806002600083815260200190815260200160002060000154145b61093d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109349061287f565b60405180910390fd5b60006002600085815260200190815260200160002090508060080160009054906101000a900460ff16156109a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161099d9061281f565b60405180910390fd5b6000816004018054905067ffffffffffffffff8111156109ef577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051908082528060200260200182016040528015610a1d5781602001602082028036833780820191505090505b50905060005b8260040180549050811015610aa05782600701600082815260200190815260200160002054828281518110610a81577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010181815250508080610a9890612d3d565b915050610a23565b50809350505050919050565b6060816001548111158015610ad65750806002600083815260200190815260200160002060000154145b610b15576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b0c9061287f565b60405180910390fd5b60026000848152602001908152602001600020600601805480602002602001604051908101604052809291908181526020018280548015610bab57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610b61575b5050505050915050919050565b6000806000846001548111158015610be55750806002600083815260200190815260200160002060000154145b610c24576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c1b9061287f565b60405180910390fd5b600060026000888152602001908152602001600020905060008160050160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060000160009054906101000a900460ff16610cd1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cc89061285f565b60405180910390fd5b8060000160009054906101000a900460ff168160000160019054906101000a900460ff168260000160019054906101000a900460ff16610d12576000610d18565b82600101545b9550955095505050509250925092565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610db6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dad9061295f565b60405180910390fd5b816001548111158015610dde5750806002600083815260200190815260200160002060000154145b610e1d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e149061287f565b60405180910390fd5b60006002600085815260200190815260200160002090508060050160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff1615610ec6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ebd906128df565b60405180910390fd5b60018160050160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160006101000a81548160ff02191690831515021790555080600601839080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507ff45b8429c36d478f9a6d081c4811a819b98aa5b608588bed9d406405cf2824738484604051610fb99291906129ba565b60405180910390a150505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611055576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161104c9061295f565b60405180910390fd5b80600154811115801561107d5750806002600083815260200190815260200160002060000154145b6110bc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110b39061287f565b60405180910390fd5b60006002600084815260200190815260200160002090508060080160009054906101000a900460ff16611124576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161111b9061283f565b60405180910390fd5b8060030154421161116a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111619061289f565b60405180910390fd5b60008160080160006101000a81548160ff0219169083151502179055506000816004018054905067ffffffffffffffff8111156111d0577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156111fe5781602001602082028036833780820191505090505b50905060005b82600401805490508110156112815782600701600082815260200190815260200160002054828281518110611262577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001018181525050808061127990612d3d565b915050611204565b507f35a1c053de6c85672294c1aaaea8617367a5f9c313f8543d4552374f783c6ff084826040516112b3929190612a1a565b60405180910390a150505050565b8160015481111580156112e95750806002600083815260200190815260200160002060000154145b611328576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161131f9061287f565b60405180910390fd5b826002600082815260200190815260200160002060080160009054906101000a900460ff1661138c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113839061291f565b60405180910390fd5b600260008281526020019081526020016000206002015442101580156113c8575060026000828152602001908152602001600020600301544211155b611407576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113fe906127df565b60405180910390fd5b600060026000868152602001908152602001600020905060008160050160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060000160009054906101000a900460ff166114b4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114ab906128ff565b60405180910390fd5b8060000160019054906101000a900460ff1615611506576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114fd9061297f565b60405180910390fd5b8160040180549050851061154f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115469061293f565b60405180910390fd5b60018160000160016101000a81548160ff021916908315150217905550848160010181905550816007016000868152602001908152602001600020600081548092919061159b90612d3d565b91905055507f2acce567deca3aabf56327adbb4524bd5318936eaefa69e3a5208ffda0cfec098633876040516115d3939291906129e3565b60405180910390a1505050505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611671576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116689061295f565b60405180910390fd5b8183106116b3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116aa906127bf565b60405180910390fd5b60008151116116f7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116ee906128bf565b60405180910390fd5b6001600081548092919061170a90612d3d565b91905055506000600260006001548152602001908152602001600020905060015481600001819055508481600101908051906020019061174b929190611b1d565b5083816002018190555082816003018190555060018160080160006101000a81548160ff02191690831515021790555081816004019080519060200190611793929190611ba3565b507fe7a0aae5d733e07e246dea86213a1ac1b0aa8554bde889bb75c12752f44e53d96001548686866040516117cb9493929190612a4a565b60405180910390a15050505050565b6060600080600060608086600154811115801561180c5750806002600083815260200190815260200160002060000154145b61184b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118429061287f565b60405180910390fd5b6000600260008a815260200190815260200160002090506000816004018054905067ffffffffffffffff8111156118ab577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156118d95781602001602082028036833780820191505090505b50905060005b826004018054905081101561195c578260070160008281526020019081526020016000205482828151811061193d577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001018181525050808061195490612d3d565b9150506118df565b5081600101826002015483600301548460080160009054906101000a900460ff16856004018585805461198e90612d0b565b80601f01602080910402602001604051908101604052809291908181526020018280546119ba90612d0b565b8015611a075780601f106119dc57610100808354040283529160200191611a07565b820191906000526020600020905b8154815290600101906020018083116119ea57829003601f168201915b5050505050955081805480602002602001604051908101604052809291908181526020016000905b82821015611adb578382906000526020600020018054611a4e90612d0b565b80601f0160208091040260200160405190810160405280929190818152602001828054611a7a90612d0b565b8015611ac75780601f10611a9c57610100808354040283529160200191611ac7565b820191906000526020600020905b815481529060010190602001808311611aaa57829003601f168201915b505050505081526020019060010190611a2f565b50505050915098509850985098509850985050505091939550919395565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b828054611b2990612d0b565b90600052602060002090601f016020900481019282611b4b5760008555611b92565b82601f10611b6457805160ff1916838001178555611b92565b82800160010185558215611b92579182015b82811115611b91578251825591602001919060010190611b76565b5b509050611b9f9190611c03565b5090565b828054828255906000526020600020908101928215611bf2579160200282015b82811115611bf1578251829080519060200190611be1929190611b1d565b5091602001919060010190611bc3565b5b509050611bff9190611c20565b5090565b5b80821115611c1c576000816000905550600101611c04565b5090565b5b80821115611c405760008181611c379190611c44565b50600101611c21565b5090565b508054611c5090612d0b565b6000825580601f10611c625750611c81565b601f016020900490600052602060002090810190611c809190611c03565b5b50565b6000611c97611c9284612b21565b612af0565b90508083825260208201905082856020860282011115611cb657600080fd5b60005b85811015611ce65781611ccc8882611d8b565b845260208401935060208301925050600181019050611cb9565b5050509392505050565b6000611d03611cfe84612b4d565b612af0565b9050808382526020820190508260005b85811015611d435781358501611d298882611df4565b845260208401935060208301925050600181019050611d13565b5050509392505050565b6000611d60611d5b84612b79565b612af0565b905082815260208101848484011115611d7857600080fd5b611d83848285612cc9565b509392505050565b600081359050611d9a81612e24565b92915050565b600082601f830112611db157600080fd5b8135611dc1848260208601611c84565b91505092915050565b600082601f830112611ddb57600080fd5b8135611deb848260208601611cf0565b91505092915050565b600082601f830112611e0557600080fd5b8135611e15848260208601611d4d565b91505092915050565b600081359050611e2d81612e3b565b92915050565b60008060008060808587031215611e4957600080fd5b600085013567ffffffffffffffff811115611e6357600080fd5b611e6f87828801611df4565b9450506020611e8087828801611e1e565b9350506040611e9187828801611e1e565b925050606085013567ffffffffffffffff811115611eae57600080fd5b611eba87828801611dca565b91505092959194509250565b600060208284031215611ed857600080fd5b6000611ee684828501611e1e565b91505092915050565b60008060408385031215611f0257600080fd5b6000611f1085828601611e1e565b9250506020611f2185828601611d8b565b9150509250929050565b60008060408385031215611f3e57600080fd5b6000611f4c85828601611e1e565b925050602083013567ffffffffffffffff811115611f6957600080fd5b611f7585828601611da0565b9150509250929050565b60008060408385031215611f9257600080fd5b6000611fa085828601611e1e565b9250506020611fb185828601611e1e565b9150509250929050565b6000611fc78383611fff565b60208301905092915050565b6000611fdf838361215d565b905092915050565b6000611ff38383612673565b60208301905092915050565b61200881612c81565b82525050565b61201781612c81565b82525050565b600061202882612bd9565b6120328185612c2c565b935061203d83612ba9565b8060005b8381101561206e5781516120558882611fbb565b975061206083612c05565b925050600181019050612041565b5085935050505092915050565b600061208682612be4565b6120908185612c3d565b9350836020820285016120a285612bb9565b8060005b858110156120de57848403895281516120bf8582611fd3565b94506120ca83612c12565b925060208a019950506001810190506120a6565b50829750879550505050505092915050565b60006120fb82612bef565b6121058185612c4e565b935061211083612bc9565b8060005b838110156121415781516121288882611fe7565b975061213383612c1f565b925050600181019050612114565b5085935050505092915050565b61215781612c93565b82525050565b600061216882612bfa565b6121728185612c5f565b9350612182818560208601612cd8565b61218b81612e13565b840191505092915050565b60006121a182612bfa565b6121ab8185612c70565b93506121bb818560208601612cd8565b6121c481612e13565b840191505092915050565b60006121dc602283612c70565b91507f53746172742074696d65206d757374206265206265666f726520656e6420746960008301527f6d650000000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000612242602c83612c70565b91507f456c656374696f6e206973206e6f742077697468696e2074686520616374697660008301527f652074696d65206672616d6500000000000000000000000000000000000000006020830152604082019050919050565b60006122a8602383612c70565b91507f5468697320636f6e747261637420646f6573206e6f742061636365707420457460008301527f68657200000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b600061230e601883612c70565b91507f456c656374696f6e206973207374696c6c2061637469766500000000000000006000830152602082019050919050565b600061234e601983612c70565b91507f456c656374696f6e20697320616c726561647920656e646564000000000000006000830152602082019050919050565b600061238e603683612c70565b91507f5468697320766f746572206973206e6f74207265676973746572656420696e2060008301527f7468652073706563696669656420656c656374696f6e000000000000000000006020830152604082019050919050565b60006123f4601783612c70565b91507f456c656374696f6e20646f6573206e6f742065786973740000000000000000006000830152602082019050919050565b6000612434601a83612c70565b91507f456c656374696f6e20686173206e6f7420656e646564207965740000000000006000830152602082019050919050565b6000612474602083612c70565b91507f4d7573742068617665206174206c65617374206f6e652063616e6469646174656000830152602082019050919050565b60006124b4601b83612c70565b91507f566f74657220697320616c7265616479207265676973746572656400000000006000830152602082019050919050565b60006124f4602f83612c70565b91507f596f7520617265206e6f74207265676973746572656420746f20766f7465206960008301527f6e207468697320656c656374696f6e00000000000000000000000000000000006020830152604082019050919050565b600061255a601683612c70565b91507f456c656374696f6e206973206e6f7420616374697665000000000000000000006000830152602082019050919050565b600061259a601483612c70565b91507f496e76616c69642063616e6469646174652049440000000000000000000000006000830152602082019050919050565b60006125da602183612c70565b91507f4f6e6c792061646d696e2063616e2063616c6c20746869732066756e6374696f60008301527f6e000000000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000612640601683612c70565b91507f596f75206861766520616c726561647920766f746564000000000000000000006000830152602082019050919050565b61267c81612cbf565b82525050565b61268b81612cbf565b82525050565b60006020820190506126a6600083018461200e565b92915050565b600060208201905081810360008301526126c6818461201d565b905092915050565b600060208201905081810360008301526126e8818461207b565b905092915050565b6000602082019050818103600083015261270a81846120f0565b905092915050565b6000606082019050612727600083018661214e565b612734602083018561214e565b6127416040830184612682565b949350505050565b600060c08201905081810360008301526127638189612196565b90506127726020830188612682565b61277f6040830187612682565b61278c606083018661214e565b818103608083015261279e818561207b565b905081810360a08301526127b281846120f0565b9050979650505050505050565b600060208201905081810360008301526127d8816121cf565b9050919050565b600060208201905081810360008301526127f881612235565b9050919050565b600060208201905081810360008301526128188161229b565b9050919050565b6000602082019050818103600083015261283881612301565b9050919050565b6000602082019050818103600083015261285881612341565b9050919050565b6000602082019050818103600083015261287881612381565b9050919050565b60006020820190508181036000830152612898816123e7565b9050919050565b600060208201905081810360008301526128b881612427565b9050919050565b600060208201905081810360008301526128d881612467565b9050919050565b600060208201905081810360008301526128f8816124a7565b9050919050565b60006020820190508181036000830152612918816124e7565b9050919050565b600060208201905081810360008301526129388161254d565b9050919050565b600060208201905081810360008301526129588161258d565b9050919050565b60006020820190508181036000830152612978816125cd565b9050919050565b6000602082019050818103600083015261299881612633565b9050919050565b60006020820190506129b46000830184612682565b92915050565b60006040820190506129cf6000830185612682565b6129dc602083018461200e565b9392505050565b60006060820190506129f86000830186612682565b612a05602083018561200e565b612a126040830184612682565b949350505050565b6000604082019050612a2f6000830185612682565b8181036020830152612a4181846120f0565b90509392505050565b6000608082019050612a5f6000830187612682565b8181036020830152612a718186612196565b9050612a806040830185612682565b612a8d6060830184612682565b95945050505050565b600060a082019050612aab6000830188612682565b8181036020830152612abd8187612196565b9050612acc6040830186612682565b612ad96060830185612682565b612ae6608083018461214e565b9695505050505050565b6000604051905081810181811067ffffffffffffffff82111715612b1757612b16612de4565b5b8060405250919050565b600067ffffffffffffffff821115612b3c57612b3b612de4565b5b602082029050602081019050919050565b600067ffffffffffffffff821115612b6857612b67612de4565b5b602082029050602081019050919050565b600067ffffffffffffffff821115612b9457612b93612de4565b5b601f19601f8301169050602081019050919050565b6000819050602082019050919050565b6000819050602082019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b6000602082019050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b6000612c8c82612c9f565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015612cf6578082015181840152602081019050612cdb565b83811115612d05576000848401525b50505050565b60006002820490506001821680612d2357607f821691505b60208210811415612d3757612d36612db5565b5b50919050565b6000612d4882612cbf565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415612d7b57612d7a612d86565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b612e2d81612c81565b8114612e3857600080fd5b50565b612e4481612cbf565b8114612e4f57600080fd5b5056fea264697066735822122098fea79313674757e1c12ed54e5d841a7c6bc9e61d82eaeb2b64101ca940691164736f6c63430008000033";

type BlockchainVotingConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BlockchainVotingConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BlockchainVoting__factory extends ContractFactory {
  constructor(...args: BlockchainVotingConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      BlockchainVoting & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): BlockchainVoting__factory {
    return super.connect(runner) as BlockchainVoting__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BlockchainVotingInterface {
    return new Interface(_abi) as BlockchainVotingInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): BlockchainVoting {
    return new Contract(address, _abi, runner) as unknown as BlockchainVoting;
  }
}
