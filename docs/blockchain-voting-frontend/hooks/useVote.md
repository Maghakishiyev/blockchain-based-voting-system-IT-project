# `useVote` Hook Documentation

## Overview

The `useVote` hook provides functionality to cast a vote for a candidate in a specific election in the blockchain-based voting system. It manages the transaction, loading state, and error handling during the voting process.

---

## Exports

### `useVote`

#### Purpose

This hook allows users to:
- Cast a vote for a candidate in an election.
- Handle loading and error states during the voting process.

---

## Usage

```typescript
import { useVote } from '@/hooks/useVote';

const { castVote, loading, error } = useVote();

const handleVote = async () => {
    try {
        await castVote({
            electionId: 1, // ID of the election
            candidateId: 2, // ID of the candidate
        });
        console.log('Vote cast successfully');
    } catch (err) {
        console.error('Voting failed', err);
    }
};
```

---

## Hook Features

### Parameters

#### `VoteParams`
- **Type**:
  ```typescript
  interface VoteParams {
      electionId: number;
      candidateId: number;
  }
  ```
- **Properties**:
  - `electionId`: The ID of the election in which the vote is being cast.
  - `candidateId`: The ID of the candidate being voted for.

---

### Functions

#### `castVote`
- **Type**: `(params: VoteParams) => Promise<void>`
- **Description**: Casts a vote for the specified candidate in the given election.

---

### Return Values

- **`castVote`**
  - A function to initiate the voting process.
- **`loading`**
  - **Type**: `boolean`
  - **Description**: Indicates if the voting process is in progress.
- **`error`**
  - **Type**: `string`
  - **Description**: Holds any error message encountered during the voting process.

---

## Example

```typescript
import React, { useState } from 'react';
import { useVote } from '@/hooks/useVote';

function VotingComponent() {
    const { castVote, loading, error } = useVote();
    const [electionId, setElectionId] = useState<number>(1);
    const [candidateId, setCandidateId] = useState<number>(0);

    const handleSubmit = async () => {
        try {
            await castVote({ electionId, candidateId });
            alert('Vote cast successfully!');
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
                type="number"
                placeholder="Candidate ID"
                value={candidateId}
                onChange={(e) => setCandidateId(Number(e.target.value))}
            />
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Voting...' : 'Cast Vote'}
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
- It uses the `vote` method of the contract to perform the voting operation.

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
