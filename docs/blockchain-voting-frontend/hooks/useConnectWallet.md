# useConnectWallet Hook Documentation

## Overview

The `useConnectWallet` hook provides functionality to connect a user's Ethereum wallet to a blockchain application. It supports integration with MetaMask and manages user authentication, contract initialization, and state updates.

---

## Exports

### `useConnectWallet`

#### Purpose

This hook allows users to:
- Connect their Ethereum wallet (MetaMask).
- Interact with the `BlockchainVoting` smart contract.
- Update the application's global state with wallet and user information.

---

## Usage

```typescript
import { useConnectWallet } from '@/hooks/useConnectWallet';

const { connectWallet, error, loading } = useConnectWallet();
```

---

## Hook Features

### **State Variables**
- **`loading`**
  - **Type**: `boolean`
  - **Description**: Indicates whether the wallet connection process is in progress.

- **`error`**
  - **Type**: `string`
  - **Description**: Stores error messages if the connection process fails.

---

### **Functions**

#### `connectWallet`
- **Type**: `() => Promise<void>`
- **Description**: Connects the user's Ethereum wallet, retrieves user details, and sets up the blockchain connection.
- **Process**:
  1. Checks for the presence of an Ethereum wallet (e.g., MetaMask).
  2. Requests account access from the wallet.
  3. Initializes the provider, signer, and contract instances.
  4. Fetches the `admin` address from the `BlockchainVoting` smart contract.
  5. Updates the global state (`UserStore`) with:
     - User address.
     - Contract instance.
     - Connection status.
     - Admin privileges.
- **Error Handling**: Captures and logs errors during the connection process, storing them in the `error` state variable.

---

## Dependencies

- **Libraries**:
  - `ethers`: For interacting with the Ethereum blockchain.
  - `@/store/userStore`: For managing global user state.
  - `@/contracts/Abi/BlockchainVoting.json`: For smart contract ABI.
- **Environment Variables**:
  - `NEXT_PUBLIC_CONTRACT_ADDRESS`: The address of the deployed `BlockchainVoting` smart contract.

---

## Notes

- **Global State Updates**:
  - Sets admin privileges using `UserStore.setIsAdmin`.
  - Stores user and contract details in `UserStore`.

- **Error Scenarios**:
  - If no Ethereum wallet is detected, an error message is displayed prompting the user to install MetaMask.
  - If the connection process fails, an appropriate error message is shown.

- **MetaMask Dependency**:
  - This hook relies on MetaMask or other compatible Ethereum wallets being available in the user's browser.

---

