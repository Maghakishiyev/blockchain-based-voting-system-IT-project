# `useRegisterVoter` Hook Documentation

## Overview

The `useRegisterVoter` hook provides functionality to register a single voter for a specific election in a blockchain-based voting system. It interacts with the contract to perform the registration and manages states like loading and errors during the transaction.

---

## Exports

### `useRegisterVoter`

#### Purpose

This hook allows admins or authorized users to:
- Register a single voter for a specific election.
- Manage loading and error states during the process.

---

## Usage

```typescript
import { useRegisterVoter } from '@/hooks/useRegisterVoter';

const { registerVoter, loading, error } = useRegisterVoter();

const handleRegister = async () => {
    try {
        await registerVoter({
            electionId: 1,
            voter: '0x123...456', // Voter's Ethereum address
        });
        console.log('Voter registered successfully');
    } catch (err) {
        console.error('Registration failed', err);
    }
};
```

---

## Hook Features

### Parameters

#### `RegisterVoterParams`
- **Type**:
  ```typescript
  interface RegisterVoterParams {
      electionId: number;
      voter: string;
  }
  ```
- **Properties**:
  - `electionId`: The ID of the election for which the voter needs to be registered.
  - `voter`: The Ethereum address of the voter to be registered.

---

### Functions

#### `registerVoter`
- **Type**: `(params: RegisterVoterParams) => Promise<void>`
- **Description**: Registers a single voter for the specified election.

---

### Return Values

- **`registerVoter`**
  - A function to trigger the registration process for the provided voter address.
- **`loading`**
  - **Type**: `boolean`
  - **Description**: Indicates if the registration process is in progress.
- **`error`**
  - **Type**: `string`
  - **Description**: Holds any error message encountered during the registration process.

---

## Example

```typescript
import React, { useState } from 'react';
import { useRegisterVoter } from '@/hooks/useRegisterVoter';

function RegisterVoterForm() {
    const { registerVoter, loading, error } = useRegisterVoter();
    const [electionId, setElectionId] = useState<number>(1);
    const [voterAddress, setVoterAddress] = useState<string>('');

    const handleSubmit = async () => {
        try {
            await registerVoter({ electionId, voter: voterAddress });
            alert('Voter registered successfully!');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <input
                type="number"
                placeholder="Election ID"
                value={electionId}
                onChange={(e) => setElectionId(Number(e.target.value))}
            />
            <input
                type="text"
                placeholder="Voter Address"
                value={voterAddress}
                onChange={(e) => setVoterAddress(e.target.value)}
            />
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Registering...' : 'Register Voter'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
```

---

## Implementation Details

### **Contract Interaction**
- The hook retrieves the `contract` instance from the `UserStore`.
- It uses the `registerVoter` method of the contract to perform the operation.

### **Error Handling**
- If the contract instance is not available, an error message is set, prompting the user to connect their wallet.
- Any errors encountered during the transaction are caught and logged, and the `error` state is updated.

### **State Management**
- `loading`: Tracks the progress of the transaction.
- `error`: Stores any error message for display or debugging purposes.

---

## Dependencies

- **valtio**: For accessing the global state via `UserStore`.
- **React**: For managing component states and rendering UI.

---


