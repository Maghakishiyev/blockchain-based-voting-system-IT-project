# useGetPaginatedElections Hook Documentation

## Overview

The `useGetPaginatedElections` hook is designed to fetch and store a paginated list of elections from the blockchain. It provides election details such as the election ID, name, start and end times, and active status. The hook also calculates the total number of elections and provides the ability to paginate through the list of elections.

---

## Exports

### `useGetPaginatedElections`

#### Purpose

This hook allows users to:
- Fetch a paginated list of elections.
- Track the loading state while fetching the data.
- Handle error states and provide a method for fetching elections based on pagination parameters.

---

## Usage

```typescript
import { useGetPaginatedElections } from '@/hooks/useGetPaginatedElections';

const { elections, totalElections, loading, error, fetchElections } = useGetPaginatedElections();
```

---

## Hook Features

### **State Variables**
- **`elections`**
  - **Type**: `ElectionData[]`
  - **Description**: An array of election objects, where each object contains:
    - `id`: The ID of the election.
    - `name`: The name of the election.
    - `startTime`: The start time of the election.
    - `endTime`: The end time of the election.
    - `isActive`: A boolean indicating if the election is active.

- **`totalElections`**
  - **Type**: `number`
  - **Description**: The total number of elections available on the blockchain.

- **`loading`**
  - **Type**: `boolean`
  - **Description**: Indicates whether the elections are currently being fetched.

- **`error`**
  - **Type**: `string`
  - **Description**: Stores any error message that occurs while fetching the elections.

### **Functions**

#### `fetchElections`
- **Type**: `(offset: number, limit: number, filterState: number) => void`
- **Parameters**: 
  - `offset` (number): The starting point (page number) for the paginated elections.
  - `limit` (number): The number of elections to fetch per page.
  - `filterState` (number): The filter criteria for election states (e.g., active or ended).
- **Description**: Fetches the elections from the contract based on the pagination parameters. It also updates the total elections count.

#### `refetch`
- **Type**: `() => void`
- **Description**: A method to refetch the elections with the same parameters.

---

## Example

```typescript
import { useGetPaginatedElections } from '@/hooks/useGetPaginatedElections';

function PaginatedElectionList() {
    const { elections, totalElections, loading, error, fetchElections } = useGetPaginatedElections();
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10; // Set the number of elections to fetch per page
    const filterState = 1; // 1 for active elections, 0 for ended elections

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchElections((page - 1) * limit, limit, filterState);
    };

    useEffect(() => {
        fetchElections(0, limit, filterState); // Load first page on mount
    }, []);

    if (loading) return <div>Loading elections...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Paginated Elections</h2>
            <div>Total Elections: {totalElections}</div>
            <ul>
                {elections.map((election) => (
                    <li key={election.id}>
                        <strong>{election.name}</strong> - {new Date(election.startTime * 1000).toLocaleString()}
                    </li>
                ))}
            </ul>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </button>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage * limit >= totalElections}>
                Next
            </button>
        </div>
    );
}
```

---

## Notes

- **Global State Access**: The hook uses `UserStore` to access the initialized contract.
- **Pagination**: The hook allows pagination of election data, making it efficient for large datasets.
- **Error Handling**: If the contract is not initialized, the hook will prompt the user to connect their wallet.
- **Dynamic Fetching**: The hook refetches elections based on the offset, limit, and filter criteria.

---

## Dependencies

- **Libraries**:
  - `valtio`: For managing the global state and accessing contract data.
  - `ethers`: For interacting with the Ethereum blockchain.

---

## Example Response

The hook returns the following structure for each election:

```typescript
interface ElectionData {
  id: number;
  name: string;
  startTime: number;
  endTime: number;
  isActive: boolean;
}
```

This structure includes the election ID, name, start and end times, and active status.

---
