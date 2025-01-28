# `UserStore` Documentation

## Overview

`UserStore` is a global state management utility built with `valtio` to manage the user-related state in the Blockchain Voting frontend application. It tracks and updates the user's wallet connection status, contract instance, and related properties.

---

## Features

- **Reactive State Management**: Uses `valtio` to enable automatic reactivity for state changes.
- **Wallet Management**: Handles the Ethereum wallet's provider, signer, and user's address.
- **Contract Instance Management**: Stores and manages the `BlockchainVoting` contract instance.
- **Admin Role Tracking**: Keeps track of whether the connected user is an admin.
- **Global State Reset**: Provides a method to reset all user-related state.

---

## Implementation

### File Location
`store/userStore.ts`

### State Structure

#### `UserState` Interface
- **`address`**: `string | null`  
  The connected user's Ethereum wallet address.
  
- **`isAdmin`**: `boolean`  
  Indicates whether the connected user is an admin.

- **`isConnected`**: `boolean`  
  Tracks whether the user is connected to a wallet.

- **`provider`**: `ethers.BrowserProvider | null`  
  The Ethereum provider instance for interacting with the blockchain.

- **`signer`**: `ethers.JsonRpcSigner | null`  
  The Ethereum signer instance for signing transactions.

- **`contract`**: `BlockchainVoting | null`  
  The initialized contract instance of the `BlockchainVoting` smart contract.

---

## Methods

### `setAddress(address: string | null)`
- **Description**: Updates the `address` field in the state.
- **Parameters**:  
  - `address`: The new address to set or `null` to clear it.

### `setIsAdmin(isAdmin: boolean)`
- **Description**: Updates the `isAdmin` field.
- **Parameters**:  
  - `isAdmin`: A boolean indicating admin status.

### `setIsConnected(isConnected: boolean)`
- **Description**: Updates the `isConnected` field.
- **Parameters**:  
  - `isConnected`: A boolean indicating whether the user is connected.

### `setProvider(provider: ethers.BrowserProvider | null)`
- **Description**: Updates the `provider` field with a reference to the provider instance.
- **Parameters**:  
  - `provider`: An instance of `ethers.BrowserProvider` or `null` to clear it.

### `setSigner(signer: ethers.JsonRpcSigner | null)`
- **Description**: Updates the `signer` field with a reference to the signer instance.
- **Parameters**:  
  - `signer`: An instance of `ethers.JsonRpcSigner` or `null` to clear it.

### `setContract(contract: BlockchainVoting | null)`
- **Description**: Updates the `contract` field with a reference to the smart contract instance.
- **Parameters**:  
  - `contract`: An instance of `BlockchainVoting` or `null` to clear it.

### `reset()`
- **Description**: Resets all fields in the `UserStore` state to their initial values.

---

## Example Usage

### Updating User State
```typescript
import UserStore from '@/store/userStore';

// Set the user's address
UserStore.setAddress('0x1234...');

// Mark the user as admin
UserStore.setIsAdmin(true);

// Set the provider instance
UserStore.setProvider(providerInstance);
```

### Resetting User State
```typescript
import UserStore from '@/store/userStore';

// Reset all state fields
UserStore.reset();
```

---

## Notes

1. **Reactive Updates**: Since `valtio` is used, any changes to the state will automatically update all components consuming the state.
2. **Ref Wrapping**: The `provider`, `signer`, and `contract` are wrapped in `ref` for efficient reactivity in `valtio`.

---

## References

- [valtio Documentation](https://valtio.pmnd.rs/)
- [ethers.js Documentation](https://docs.ethers.io/)
