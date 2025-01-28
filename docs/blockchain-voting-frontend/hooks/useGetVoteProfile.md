# useGetVoterProfile Hook Documentation

## Overview

The `useGetVoterProfile` hook is designed to fetch the profile of a specific voter in a given election. It retrieves whether the voter is registered, whether they have voted, and the candidate they voted for. The hook also manages the loading state, handles errors, and provides a function to refetch the voter's profile.

---

## Exports

### `useGetVoterProfile`

#### Purpose

This hook allows users to:
- Fetch the profile of a specific voter in an election.
- Track the loading state while fetching the data.
- Handle error states and provide a method for refetching the voter's profile.

---

## Usage

```typescript
import { useGetVoterProfile } from '@/hooks/useGetVoterProfile';

const { profile, loading, error, refetch } = useGetVoterProfile({
    electionId: electionId,
    voter: voterAddress,
});
```

---

## Hook Features

### **State Variables**
- **`profile`**
  - **Type**: `VoterProfile`
  - **Description**: Contains the voter's registration and voting status:
    - `isRegistered`: Whether the voter is registered.
    - `hasVoted`: Whether the voter has voted.
    - `votedCandidate`: The ID of the candidate the voter voted for.

- **`loading`**
  - **Type**: `boolean`
  - **Description**: Indicates whether the voter's profile is currently being fetched.

- **`error`**
  - **Type**: `string`
  - **Description**: Stores any error message that occurs while fetching the voter's profile.

### **Functions**

#### `fetchProfile`
- **Type**: `() => void`
- **Description**: Fetches the voter's profile for the specified `electionId` and `voter` address from the contract and updates the state with the profile.

#### `refetch`
- **Type**: `() => void`
- **Description**: A method to refetch the voter's profile with the same `electionId` and `voter` address.

---

## Example

```typescript
import { useGetVoterProfile } from '@/hooks/useGetVoterProfile';

function VoterProfile({ electionId, voterAddress }: { electionId: number; voterAddress: string }) {
    const { profile, loading, error, refetch } = useGetVoterProfile({
        electionId,
        voter: voterAddress,
    });

    if (loading) return <div>Loading voter profile...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Voter Profile</h2>
            <p>Registered: {profile.isRegistered ? 'Yes' : 'No'}</p>
            <p>Has voted: {profile.hasVoted ? 'Yes' : 'No'}</p>
            {profile.hasVoted && <p>Voted for candidate: {profile.votedCandidate}</p>}
            <button onClick={refetch}>Refetch Profile</button>
        </div>
    );
}
```

---

## Notes

- **Global State Access**: The hook uses `UserStore` to access the initialized contract.
- **Error Handling**: If the contract is not initialized, the hook prompts the user to connect their wallet.
- **Voter Address**: The hook only fetches the profile if a valid voter address is provided (i.e., not `0x0000000000000000000000000000000000000000`).

---

## Dependencies

- **Libraries**:
  - `valtio`: For managing the global state and accessing contract data.
  - `ethers`: For interacting with the Ethereum blockchain.

---

## Example Response

The hook returns the following structure for a voter's profile:

```typescript
const profile = {
    isRegistered: true,        // Whether the voter is registered
    hasVoted: true,            // Whether the voter has voted
    votedCandidate: 2          // The ID of the candidate they voted for
};
```

This structure represents the voter's registration status, whether they have voted, and the ID of the candidate they voted for.
