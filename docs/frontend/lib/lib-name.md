# Contract Library Documentation

## Overview
The [contract.ts] file provides utility functions for connecting to the Ethereum blockchain and interacting with the `BlockchainVoting` smart contract.

## Key Functions

### getProvider
- **Purpose**: Retrieves the Ethereum provider (e.g., MetaMask).
- **Returns**: An instance of `ethers.BrowserProvider`.
- **Throws**: An error if no window object is found or if MetaMask is not installed.

### getContract
- **Purpose**: Creates and returns an instance of the `BlockchainVoting` contract.
- **Returns**: An instance of the `BlockchainVoting` contract.
- **Usage**: This function requires the contract address and ABI to be set in the environment variables.

## Usage
To use the functions in this library, import them into your component or hook:

```javascript
import { getProvider, getContract } from '@/lib/contract';

const MyComponent = async () => {
    const provider = getProvider();
    const contract = await getContract();
    // Interact with the contract
};