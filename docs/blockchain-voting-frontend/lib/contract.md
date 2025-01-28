# `contract.ts` Documentation

## Overview

The `contract.ts` module provides utility functions to interact with the Ethereum blockchain. It is specifically tailored for the `BlockchainVoting` smart contract, facilitating the initialization of providers, signers, and contract instances.

---

## Exports

### Functions

1. **`getProvider`**
2. **`getContract`**

---

## Functions

### 1. `getProvider`

#### Description
Initializes and returns an Ethereum provider using MetaMask. This function ensures that the user is operating within a browser context and that MetaMask is installed.

#### Usage

```typescript
import { getProvider } from '@/lib/contract';

const provider = getProvider();
```

#### Returns
- **`ethers.BrowserProvider`**: An instance of the browser provider connected to MetaMask.

#### Errors
- Throws an error if:
  - Called outside of the browser context.
  - MetaMask is not installed in the browser.

---

### 2. `getContract`

#### Description
Creates and returns an instance of the `BlockchainVoting` smart contract. It uses the provider and signer initialized by `getProvider`.

#### Usage

```typescript
import { getContract } from '@/lib/contract';

(async () => {
    const contract = await getContract();
    console.log('Contract address:', contract.address);
})();
```

#### Returns
- **`Promise<BlockchainVoting>`**: A promise that resolves to a typed contract instance of the `BlockchainVoting` smart contract.

#### Errors
- Throws an error if:
  - Called outside of the browser context.
  - MetaMask is not installed.

---

## Constants

### `CONTRACT_ADDRESS`
- **Type**: `string`
- **Source**: Environment variable `NEXT_PUBLIC_CONTRACT_ADDRESS`.
- **Description**: Specifies the deployed address of the `BlockchainVoting` smart contract.
- **Default**: An empty string (`''`).

---

## Dependencies

- **`ethers`**: For interacting with Ethereum providers, signers, and contracts.
- **MetaMask**: The default Ethereum provider for browser-based interactions.
- **ABI**: The compiled ABI of the `BlockchainVoting` contract, imported from `/contracts/Abi/BlockchainVoting.json`.

---

## Example Usage

### Get Provider and Contract

```typescript
import { getProvider, getContract } from '@/lib/contract';

(async () => {
    try {
        const provider = getProvider();
        console.log('Connected to provider:', provider);

        const contract = await getContract();
        console.log('Contract initialized:', contract.address);
    } catch (err) {
        console.error('Error initializing contract:', err.message);
    }
})();
```

### Call a Smart Contract Function

```typescript
import { getContract } from '@/lib/contract';

(async () => {
    try {
        const contract = await getContract();
        const adminAddress = await contract.admin();
        console.log('Admin Address:', adminAddress);
    } catch (err) {
        console.error('Error fetching admin address:', err.message);
    }
})();
```

---

## Notes

1. **Environment Variables**: Ensure that `NEXT_PUBLIC_CONTRACT_ADDRESS` is set to the correct contract address in your `.env` file.
2. **MetaMask**: This module assumes that MetaMask is installed and the user is connected to the correct Ethereum network.
3. **Browser Context**: These functions require a browser environment as they depend on the `window` object.

--- 

## Related Files

- **ABI**: `BlockchainVoting.json` - The contract's compiled ABI file located in `/contracts/Abi/`.

