# Scripts Documentation

## deploy.js

### Overview
The [deploy.js](cci:7://file:///c:/Users/USER/Desktop/blockchain-based-voting-system-IT-project/blockchain-voting/scripts/deploy.js:0:0-0:0) script is responsible for deploying the `BlockchainVoting` smart contract to the blockchain.

### Dependencies
- **Hardhat**: A development environment for Ethereum software.
- **fs**: Node.js file system module for file operations.

### Functionality
1. **Check Deployment**: 
   - The script checks if the contract is already deployed by reading the `DEPLOYED_CONTRACT_ADDRESS` environment variable.
   - If the address exists, it logs the message and exits.

2. **Deploy Contract**:
   - If not deployed, it compiles the contract and deploys it using Hardhat's `getContractFactory` method.
   - After deployment, it logs the contract address and saves it to `contract-address.txt`.

### Error Handling
The script includes error handling to catch and log any issues during execution.