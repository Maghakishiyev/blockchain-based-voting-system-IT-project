
# useEndElection Hook Documentation

## Overview

The `useEndElection` hook provides functionality for ending an election on the blockchain using the connected Ethereum wallet. It interacts with the `BlockchainVoting` smart contract to end an election by specifying the election ID.

---

## Exports

### `useEndElection`

#### Purpose

This hook allows users to:
- End an ongoing election on the blockchain by calling the smart contract's `endElection` function.
- Handle loading and error states during the election-ending process.
- Interact with the `BlockchainVoting` contract to submit the election ID and finalize the election.

---

## Usage

```typescript
import { useEndElection } from '@/hooks/useEndElection';

const { endElection, loading, error } = useEndElection();
```

---

## Hook Features

### **State Variables**
- **`loading`**
  - **Type**: `boolean`
  - **Description**: Represents whether the election ending process is in progress.

- **`error`**
  - **Type**: `string`
  - **Description**: Stores error messages in case the election-ending process fails.

---

### **Functions**

#### `endElection`
- **Type**: `(electionId: number) => Promise<void>`
- **Parameters**:
  - **`electionId`**: `number` – The ID of the election to be ended.

- **Description**: Submits a transaction to end an election on the blockchain.
  - **Process**:
    1. Checks if the contract is initialized (i.e., wallet is connected).
    2. Calls the `endElection` function from the `BlockchainVoting` smart contract with the given election ID.
    3. Waits for the transaction to be mined before completing the process.
  
- **Error Handling**: If the contract is not initialized or if an error occurs during the election-ending process, it sets an error message in the `error` state.

---

## Dependencies

- **Libraries**:
  - `valtio`: For global state management and accessing the contract instance.
  
- **Environment Variables**:
  - Relies on the `UserStore` state for contract details.


---

## Notes

- **Global State Access**: The hook uses `UserStore` to access the initialized contract.
- **Error Scenarios**: If the contract is not initialized, users are prompted to connect their wallet.
- **Transaction Wait**: After submitting the transaction, the hook waits for it to be confirmed (using `tx.wait()`).

--- 
