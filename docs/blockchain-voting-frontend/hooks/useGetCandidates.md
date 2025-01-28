# useGetCandidates Hook Documentation

## Overview

The `useGetCandidates` hook is used to fetch and store the list of candidates for a specific election from the connected Ethereum smart contract. It interacts with the `BlockchainVoting` contract's `getCandidates` function to retrieve the candidates' addresses for the provided `electionId`. The hook provides loading and error states and offers a method to refetch the candidates.

---

## Exports

### `useGetCandidates`

#### Purpose

This hook allows users to:
- Fetch the list of candidates for a specific election.
- Track the loading state while fetching the candidates.
- Handle error states and provide a method to refetch the candidates.

---

## Usage

```typescript
import { useGetCandidates } from '@/hooks/useGetCandidates';

const { candidates, loading, error, refetch } = useGetCandidates(electionId);
```

---

## Hook Features

### **State Variables**
- **`candidates`**
  - **Type**: `string[]`
  - **Description**: Array of candidate addresses for the specified election. Each candidate is represented by their Ethereum address.

- **`loading`**
  - **Type**: `boolean`
  - **Description**: Indicates whether the candidates are being fetched from the blockchain.

- **`error`**
  - **Type**: `string`
  - **Description**: Stores any error messages encountered while fetching the candidates.

---

### **Functions**

#### `fetchCandidates`
- **Type**: `() => Promise<void>`
- **Parameters**: None
- **Description**: Fetches the candidates for the specified `electionId` from the smart contract. If the contract is not initialized, it will set an error state. Otherwise, it retrieves the candidates and stores them in the `candidates` state.

#### `refetch`
- **Type**: `() => void`
- **Description**: A method to refetch the list of candidates for the election.

---

## Example

```typescript
import { useGetCandidates } from '@/hooks/useGetCandidates';

function CandidatesList({ electionId }: { electionId: number }) {
    const { candidates, loading, error, refetch } = useGetCandidates(electionId);

    if (loading) return <div>Loading candidates...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <button onClick={refetch}>Refetch Candidates</button>
            <ul>
                {candidates.map((candidate, index) => (
                    <li key={index}>{candidate}</li>
                ))}
            </ul>
        </div>
    );
}
```

---

## Notes

- **Global State Access**: The hook uses `UserStore` to access the initialized contract.
- **Error Handling**: If the contract is not initialized, an error message will prompt the user to connect their wallet.
- **Performance Consideration**: The hook fetches candidates when the `electionId` changes, making it suitable for dynamic election data.

---

## Dependencies

- **Libraries**:
  - `valtio`: For managing the global state and accessing contract data.
  - `ethers`: For interacting with the Ethereum blockchain.

---

## Example Response

The hook returns the following structure for candidates:

```typescript
interface CandidateData {
  address: string;
}
```

This is used to display the candidates' addresses in the component and track their loading and error states.

--- 
