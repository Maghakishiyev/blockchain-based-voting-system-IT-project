# useGetAllElections Hook Documentation

## Overview

The `useGetAllElections` hook is used to fetch and store all elections from the connected Ethereum smart contract. It interacts with the `BlockchainVoting` contract to retrieve election details, including the election ID, name, start time, end time, and whether the election is active. The hook provides loading and error states, and it also offers a method to refetch the election data.

---

## Exports

### `useGetAllElections`

#### Purpose

This hook allows users to:
- Fetch all elections from the blockchain.
- Get the minimal election details, including ID, name, start time, end time, and active status.
- Track the loading state during the fetching process.
- Handle error states and provide a method to refetch elections.

---

## Usage

```typescript
import { useGetAllElections } from '@/hooks/useGetAllElections';

const { elections, loading, error, refetch } = useGetAllElections();
```

---

## Hook Features

### **State Variables**
- **`elections`**
  - **Type**: `ElectionData[]`
  - **Description**: Array of election objects fetched from the blockchain. Each election contains the following properties:
    - `id`: The election ID (number).
    - `name`: The name of the election (string).
    - `startTime`: The start time of the election (number).
    - `endTime`: The end time of the election (number).
    - `isActive`: A boolean indicating whether the election is active.

- **`loading`**
  - **Type**: `boolean`
  - **Description**: Indicates whether the election data is being fetched from the blockchain.

- **`error`**
  - **Type**: `string`
  - **Description**: Stores any error messages encountered while fetching elections.

---

### **Functions**

#### `fetchAll`
- **Type**: `() => Promise<void>`
- **Parameters**: None
- **Description**: Fetches all elections from the smart contract by:
  1. Checking if the contract is initialized (i.e., the wallet is connected).
  2. Getting the total number of elections.
  3. Looping through all election IDs and retrieving details for each election.
  4. Storing the election data in the `elections` state.

#### `refetch`
- **Type**: `() => void`
- **Description**: A method to refetch the election data from the blockchain.

---

## Example

```typescript
import { useGetAllElections } from '@/hooks/useGetAllElections';

function ElectionsList() {
    const { elections, loading, error, refetch } = useGetAllElections();

    if (loading) return <div>Loading elections...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <button onClick={refetch}>Refetch Elections</button>
            <ul>
                {elections.map((election) => (
                    <li key={election.id}>
                        {election.name} (ID: {election.id})
                        {election.isActive ? ' - Active' : ' - Ended'}
                    </li>
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
- **Performance Consideration**: The hook fetches all elections by looping through the election counter, so it could be optimized further for larger data sets.

---

## Dependencies

- **Libraries**:
  - `valtio`: For managing the global state and accessing contract data.
  - `ethers`: For interacting with the Ethereum blockchain.

---

## Example Response

The hook returns the following structure for elections:

```typescript
interface ElectionData {
  id: number;
  name: string;
  startTime: number;
  endTime: number;
  isActive: boolean;
}
```

This is used to display all elections in the component and track their loading and error states.

--- 
