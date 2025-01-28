# `useRegisterMultipleVoters` Hook Documentation

## Overview

The `useRegisterMultipleVoters` hook is designed to register multiple voters for a specific election in a blockchain-based voting system. It interacts with the contract to execute the registration process, managing states like loading and errors during the transaction.

---

## Exports

### `useRegisterMultipleVoters`

#### Purpose

This hook allows admins or authorized users to:
- Register a batch of voters for an election.
- Manage loading and error states during the process.

---

## Usage

```typescript
import { useRegisterMultipleVoters } from '@/hooks/useRegisterMultipleVoters';

const { registerMultipleVoters, loading, error } = useRegisterMultipleVoters();

const handleRegister = async () => {
    try {
        await registerMultipleVoters({
            electionId: 1,
            voters: ['0x123...', '0x456...', '0x789...'], // Voter addresses
        });
        console.log('Voters registered successfully');
    } catch (err) {
        console.error('Registration failed', err);
    }
};
```

---

## Hook Features

### Parameters

#### `RegisterMultipleVotersParams`
- **Type**: 
  ```typescript
  interface RegisterMultipleVotersParams {
      electionId: number;
      voters: string[];
  }
  ```
- **Properties**:
  - `electionId`: The ID of the election for which voters need to be registered.
  - `voters`: An array of Ethereum addresses representing the voters.

---

### Functions

#### `registerMultipleVoters`
- **Type**: `(params: RegisterMultipleVotersParams) => Promise<void>`
- **Description**: Registers multiple voters for the specified election.

---

### Return Values

- **`registerMultipleVoters`**
  - A function that triggers the registration process for the provided voter addresses.
- **`loading`**
  - **Type**: `boolean`
  - **Description**: Indicates if the registration process is in progress.
- **`error`**
  - **Type**: `string | null`
  - **Description**: Holds any error messages encountered during the registration process.

---

## Example

```typescript
import React, { useState } from 'react';
import { useRegisterMultipleVoters } from '@/hooks/useRegisterMultipleVoters';

function RegisterVotersForm() {
    const { registerMultipleVoters, loading, error } = useRegisterMultipleVoters();
    const [voterAddresses, setVoterAddresses] = useState<string[]>([]);
    const [electionId, setElectionId] = useState<number>(1);

    const handleSubmit = async () => {
        try {
            await registerMultipleVoters({ electionId, voters: voterAddresses });
            alert('Voters registered successfully!');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Election ID"
                value={electionId}
                onChange={(e) => setElectionId(Number(e.target.value))}
            />
            <textarea
                placeholder="Enter voter addresses (comma-separated)"
                onChange={(e) =>
                    setVoterAddresses(e.target.value.split(',').map((s) => s.trim()))
                }
            />
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Registering...' : 'Register Voters'}
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
- It uses the `registerMultipleVoters` method of the contract to perform the operation.

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

## Notes

- Ensure the wallet is connected before calling `registerMultipleVoters`.
- This hook assumes that the contract instance (`UserStore.state.contract`) is correctly initialized.

