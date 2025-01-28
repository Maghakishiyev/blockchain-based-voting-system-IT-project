
# useCreateElection Hook Documentation

## Overview

The `useCreateElection` hook provides functionality for creating a new election on the blockchain using the connected Ethereum wallet. It interacts with the `BlockchainVoting` smart contract to initiate an election by passing the necessary parameters, including the election name, start time, end time, and candidate list.

---

## Exports

### `useCreateElection`

#### Purpose

This hook allows users to:
- Create a new election on the blockchain.
- Handle loading and error states during the election creation process.
- Interact with the `BlockchainVoting` contract to submit election data.

---

## Usage

```typescript
import { useCreateElection } from '@/hooks/useCreateElection';

const { createElection, loading, error } = useCreateElection();
```

---

## Hook Features

### **State Variables**
- **`loading`**
  - **Type**: `boolean`
  - **Description**: Represents whether the election creation process is in progress.

- **`error`**
  - **Type**: `string`
  - **Description**: Stores error messages in case election creation fails.

---

### **Functions**

#### `createElection`
- **Type**: `(params: CreateElectionParams) => Promise<void>`
- **Parameters**:
  - **`params`**: `CreateElectionParams`
    - **`name`**: `string` – The name of the election.
    - **`startTime`**: `number` – The start time of the election (UNIX timestamp).
    - **`endTime`**: `number` – The end time of the election (UNIX timestamp).
    - **`candidates`**: `string[]` – A list of candidate addresses for the election.
  
- **Description**: Submits a transaction to create a new election on the blockchain.
  - **Process**:
    1. Checks if the contract is initialized (i.e., wallet is connected).
    2. Calls the `createElection` function from the `BlockchainVoting` smart contract.
    3. Waits for the transaction to be mined before completing the process.
  
- **Error Handling**: If the contract is not initialized or if an error occurs during the election creation, it sets an error message in the `error` state.

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
