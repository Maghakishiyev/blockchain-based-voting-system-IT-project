### Documentation: `app/end-election/page.tsx`

---

#### **Overview**
The `EndElectionPage` component provides a user interface for administrators to end active elections. Administrators can select an election from a list of active elections, initiate the ending process, and view success or error messages based on the transaction outcome.

---

#### **Key Features**
1. **Admin Authentication**:
   - Secures the page with `withAdminAuth`, allowing only authorized administrators to access it.

2. **Election Management**:
   - Lists active elections with pagination.
   - Allows administrators to select and end a specific election.

3. **Feedback and Validation**:
   - Displays alerts for errors, progress, and success.
   - Ensures an election is selected before submission.

4. **Dynamic Data Handling**:
   - Fetches active elections using pagination.
   - Updates the list of active elections after an election is ended.

---

#### **Component Breakdown**

1. **State Management**:
   - **`selectedElection`**: Tracks the ID of the selected election to end.
   - **`alert`**: Displays feedback messages (success, error, or info).
   - **`currentPage`**: Tracks the current page for paginated elections.
   - **`itemsPerPage`**: Defines the number of elections displayed per page.

2. **Hooks**:
   - **`useEndElection`**:
     - Handles the blockchain transaction to end an election.
   - **`useGetPaginatedElections`**:
     - Fetches active elections with pagination.

3. **Utility Functions**:
   - **`handleEndElection`**:
     - Validates the selected election.
     - Calls `endElection` to end the selected election.
     - Refetches the list of active elections after successful completion.

---

#### **Page Flow**

1. **Initial Load**:
   - Fetches the first page of active elections using `fetchElections`.

2. **Select an Election**:
   - Displays a dropdown menu of active elections.
   - Allows the admin to select an election to end.

3. **End the Election**:
   - Validates the selection.
   - Executes the `endElection` function to end the election on the blockchain.
   - Displays feedback (e.g., transaction in progress, success, or error).

4. **Update the List**:
   - Refetches the active elections list after an election is ended.
   - Handles empty states (e.g., no active elections).

---

#### **Render Components**

1. **Alerts**:
   - Displays success, error, or informational messages based on the operation.

2. **Dropdown Menu**:
   - Lists active elections for selection.
   - Shows a placeholder message if no active elections are available.

3. **Button**:
   - Submits the form to end the selected election.
   - Disabled if no election is selected or a transaction is in progress.

4. **Pagination**:
   - Allows navigation through multiple pages of active elections.

---

#### **Dependencies**
- **`@mui/material`**:
  - Components for UI elements like `Button`, `Card`, `Alert`, `Pagination`, `Select`, and `CircularProgress`.
- **Custom Hooks**:
  - `useEndElection` for interacting with the blockchain.
  - `useGetPaginatedElections` for fetching elections with filters and pagination.
- **Authentication**:
  - `withAdminAuth` HOC to restrict access to administrators.

---

#### **Example Usage**

1. **Ending an Election**:
   - Select an active election from the dropdown.
   - Click "End Election" to initiate the process.
   - If successful, a message like `Election #5 has been successfully ended.` is displayed.

2. **Pagination**:
   - Navigate through pages of active elections if there are more than 10 elections.

---

