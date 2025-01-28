
# useGetElectionDetails Hook Documentation

## Overview

The `useGetElectionDetails` hook is used to fetch and store detailed information about a specific election, including its name, start time, end time, active status, candidates, and results. It interacts with the `BlockchainVoting` contract's `getElectionDetails` function to retrieve the details for the provided `electionId`. The hook also provides loading and error states and offers a method to refetch the election details.

---

## Exports

### `useGetElectionDetails`

#### Purpose

This hook allows users to:
- Fetch the details of a specific election using the election's ID.
- Track the loading state while fetching the election details.
- Handle error states and provide a method to refetch the election details.

---

## Usage

```typescript
import { useGetElectionDetails } from '@/hooks/useGetElectionDetails';

const { details, loading, error, refetch } = useGetElectionDetails(electionId);
```

---

## Hook Features

### **State Variables**
- **`details`**
  - **Type**: `ElectionDetails | null`
  - **Description**: Contains detailed information about the election. The structure includes:
    - `name`: Name of the election.
    - `startTime`: Start time of the election.
    - `endTime`: End time of the election.
    - `isActive`: Boolean indicating if the election is active.
    - `candidates`: Array of candidate addresses.
    - `results`: Array of results corresponding to the candidates.
    
- **`loading`**
  - **Type**: `boolean`
  - **Description**: Indicates whether the election details are being fetched from the blockchain.

- **`error`**
  - **Type**: `string`
  - **Description**: Stores any error messages encountered while fetching the election details.

---

### **Functions**

#### `fetchDetails`
- **Type**: `() => Promise<void>`
- **Parameters**: None
- **Description**: Fetches the details of the election for the specified `electionId` from the smart contract. If the contract is not initialized, it will set an error state. Otherwise, it retrieves the details and stores them in the `details` state.

#### `refetch`
- **Type**: `() => void`
- **Description**: A method to refetch the details of the election.

---

## Example

```typescript
import { useGetElectionDetails } from '@/hooks/useGetElectionDetails';

function ElectionDetailsComponent({ electionId }: { electionId: number }) {
    const { details, loading, error, refetch } = useGetElectionDetails(electionId);

    if (loading) return <div>Loading election details...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <button onClick={refetch}>Refetch Election Details</button>
            {details && (
                <div>
                    <h2>{details.name}</h2>
                    <p>Status: {details.isActive ? "Active" : "Ended"}</p>
                    <p>Start Time: {new Date(details.startTime * 1000).toLocaleString()}</p>
                    <p>End Time: {new Date(details.endTime * 1000).toLocaleString()}</p>
                    <h3>Candidates:</h3>
                    <ul>
                        {details.candidates.map((candidate, index) => (
                            <li key={index}>{candidate}</li>
                        ))}
                    </ul>
                    <h3>Results:</h3>
                    <ul>
                        {details.results.map((result, index) => (
                            <li key={index}>Candidate {index + 1}: {result} votes</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
```

---

## Notes

- **Global State Access**: The hook uses `UserStore` to access the initialized contract.
- **Error Handling**: If the contract is not initialized, an error message will prompt the user to connect their wallet.
- **Performance Consideration**: The hook fetches election details when the `electionId` changes, making it suitable for dynamic election data.

---

## Dependencies

- **Libraries**:
  - `valtio`: For managing the global state and accessing contract data.
  - `ethers`: For interacting with the Ethereum blockchain.

---

## Example Response

The hook returns the following structure for election details:

```typescript
interface ElectionDetails {
  name: string;
  startTime: number;
  endTime: number;
  isActive: boolean;
  candidates: string[];
  results: number[];
}
```

This structure includes the election name, start and end times, active status, a list of candidate addresses, and the results for each candidate.

---
