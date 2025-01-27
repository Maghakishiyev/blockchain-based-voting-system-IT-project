# User Store Documentation

## Overview
The [userStore.ts] file defines a state management store for user-related data in the Blockchain-Based Voting System.

## Purpose
This file manages the user state using the `valtio` library, providing a reactive state store for user-related information.

## Key Features
- **UserState Interface**: Defines the structure of the user state, including:
  - `address`: The user's public address.
  - `isAdmin`: Indicates if the user is an admin.
  - `isConnected`: Indicates if the user is connected to the wallet.
  - `provider`: The Ethereum provider instance.
  - `signer`: The Ethereum signer instance.
  - `contract`: The instance of the `BlockchainVoting` contract.

- **Reactive State Management**: Uses `proxy` from `valtio` to create a reactive state object.

- **State Update Methods**: Provides methods to update the user state:
  - [setAddress](blockchain-based-voting-system-IT-project/blockchain-voting-frontend/store/userStore.ts:25:4-27:5): Sets the user's address.
  - [setIsAdmin](blockchain-based-voting-system-IT-project/blockchain-voting-frontend/store/userStore.ts:29:4-31:5): Sets the user's admin status.
  - [setIsConnected](blockchain-based-voting-system-IT-project/blockchain-voting-frontend/store/userStore.ts:33:4-35:5): Sets the user's connection status.
  - [setProvider](blockchain-based-voting-system-IT-project/blockchain-voting-frontend/store/userStore.ts:37:4-39:5): Sets the Ethereum provider.
  - [setSigner](blockchain-based-voting-system-IT-project/blockchain-voting-frontend/store/userStore.ts:41:4-43:5): Sets the Ethereum signer.
  - [setContract](blockchain-based-voting-system-IT-project/blockchain-voting-frontend/store/userStore.ts:45:4-47:5): Sets the contract instance.
  - [reset](blockchain-based-voting-system-IT-project/blockchain-voting-frontend/store/userStore.ts:49:4-56:5): Clears the user state.

## Usage
To use the user store, import it into your component or hook:

```javascript
import UserStore from '@/store/userStore';

// Example usage
UserStore.setAddress('0x123...');
``` 