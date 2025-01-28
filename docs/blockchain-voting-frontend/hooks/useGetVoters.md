# useGetVoters Hook Documentation

## Overview

The `useGetVoters` hook is designed to fetch the details of all voters in a specific election. It retrieves the list of voter addresses, whether they are registered, if they have voted, and the candidate they voted for. The hook also manages the loading state, handles errors, and provides a function to refetch the voter data.

---

## Exports

### `useGetVoters`

#### Purpose

This hook allows users to:
- Fetch the list of voters for a specific election.
- Track the loading state while fetching the data.
- Handle error states and provide a method to refetch the voter data.

---

## Usage

```typescript
import { useGetVoters } from '@/hooks/useGetVoters';

const { voters, loading, error, refetch } = useGetVoters(electionId);
```

---

## Hook Features

### **State Variables**
- **`voters`**
  - **Type**: `Array<{ address: string; isRegistered: boolean; hasVoted: boolean; vote: number }>`
  - **Description**: Contains an array of voter data, where each item includes:
    - `address`: The address of the voter.
    - `isRegistered`: Whether the voter is registered.
    - `hasVoted`: Whether the voter has voted.
    - `vote`: The ID of the candidate the voter voted for (if any).

- **`loading`**
  - **Type**: `boolean`
  - **Description**: Indicates whether the voter data is currently being fetched.

- **`error`**
  - **Type**: `string`
  - **Description**: Stores any error message that occurs while fetching the voter data.

### **Functions**

#### `fetchVoters`
- **Type**: `() => void`
- **Description**: Fetches the voter details for the specified `electionId` from the contract and updates the state with the voter data.

#### `refetch`
- **Type**: `() => void`
- **Description**: A method to refetch the voter data with the same `electionId`.

---

## Example

```typescript
import { useGetVoters } from '@/hooks/useGetVoters';

function VoterList({ electionId }: { electionId: number }) {
    const { voters, loading, error, refetch } = useGetVoters(electionId);

    if (loading) return <div>Loading voters...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Voter List</h2>
            <ul>
                {voters.map((voter) => (
                    <li key={voter.address}>
                        {voter.address} - Registered: {voter.isRegistered ? 'Yes' : 'No'}, Voted: {voter.hasVoted ? 'Yes' : 'No'}, Vote: {voter.vote}
                    </li>
                ))}
            </ul>
            <button onClick={refetch}>Refetch Voters</button>
        </div>
    );
}
```

---

## Notes

- **Global State Access**: The hook uses `UserStore` to access the initialized contract.
- **Error Handling**: If the contract is not initialized, the hook prompts the user to connect their wallet.
- **Voter Data Structure**: Each voter is represented with their address, registration status, voting status, and voted candidate (if applicable).

---

## Dependencies

- **Libraries**:
  - `valtio`: For managing the global state and accessing contract data.
  - `ethers`: For interacting with the Ethereum blockchain.

---

## Example Response

The hook returns the following structure for the list of voters:

```typescript
const voters = [
    {
        address: '0x1234567890abcdef',
        isRegistered: true,
        hasVoted: true,
        vote: 1
    },
    {
        address: '0xabcdef1234567890',
        isRegistered: false,
        hasVoted: false,
        vote: 0
    },
];
```

This structure represents each voter with:
- `address`: The address of the voter.
- `isRegistered`: Whether the voter is registered.
- `hasVoted`: Whether the voter has voted.
- `vote`: The ID of the candidate they voted for (if applicable).
