### Documentation: `app/register-voter/page.tsx`

---

#### **Overview**
The `RegisterVoterPage` component provides a user interface for administrators to register voters for active elections. This page includes functionality to select an election, input a voter's address, and submit the registration.

---

#### **Key Features**
1. **Admin Authentication**:
   - Secures the page using `withAdminAuth`, ensuring only administrators can access it.

2. **Election Management**:
   - Lists active elections for voter registration.
   - Supports pagination for managing large lists of elections.

3. **Voter Registration**:
   - Allows administrators to input a voter's Ethereum address and register them for a specific election.

4. **Feedback and Validation**:
   - Displays alerts for success, errors, and progress during registration.
   - Validates required fields before submission.

5. **Dynamic Data Handling**:
   - Fetches active elections using pagination.
   - Updates the UI dynamically based on the election list and registration status.

---

#### **Component Breakdown**

1. **State Management**:
   - **`voterAddress`**:
     - Stores the Ethereum address of the voter being registered.
   - **`selectedElectionId`**:
     - Tracks the ID of the selected election.
   - **`alert`**:
     - Displays feedback messages (success, error, or info).
   - **`currentPage`**:
     - Tracks the current page for paginated election results.

2. **Hooks**:
   - **`useRegisterVoter`**:
     - Handles the logic for registering voters on the blockchain.
   - **`useGetPaginatedElections`**:
     - Fetches active elections with filters and pagination.

3. **Utility Functions**:
   - **`handleSubmit`**:
     - Validates the form input.
     - Calls `registerVoter` to register the voter on the blockchain.
     - Displays feedback messages based on the operation's outcome.

---

#### **Page Flow**

1. **Initial Load**:
   - Fetches the first page of active elections using `fetchElections`.

2. **Form Interaction**:
   - Dropdown menu allows the admin to select an active election.
   - Text field for entering the voter's Ethereum address.

3. **Voter Registration**:
   - Submits the form to register the voter for the selected election.
   - Displays feedback (e.g., success, error, or progress).

4. **Pagination**:
   - Navigates between pages of active elections when there are multiple results.

---

#### **Render Components**

1. **Alerts**:
   - Displays feedback for errors, progress, or success.

2. **Dropdown Menu**:
   - Lists active elections.
   - Shows a loading indicator or a "No active elections" message when appropriate.

3. **Text Field**:
   - Input for the voter's Ethereum address.

4. **Button**:
   - Triggers the voter registration process.
   - Shows a spinner during the registration process.

5. **Pagination**:
   - Enables navigation through multiple pages of active elections.

---

#### **Dependencies**
- **`@mui/material`**:
  - Components for UI elements like `TextField`, `Button`, `Alert`, `Pagination`, and `CircularProgress`.
- **Custom Hooks**:
  - `useRegisterVoter` for registering voters.
  - `useGetPaginatedElections` for fetching election data.
- **Authentication**:
  - `withAdminAuth` HOC to restrict access to administrators.

---

#### **Example Usage**

1. **Register a Voter**:
   - Select an active election from the dropdown.
   - Enter the voter's Ethereum address.
   - Submit the form to register the voter.

2. **Feedback**:
   - Success: "Voter [address] successfully registered for election ID [electionId]."
   - Error: "An unexpected error occurred."

3. **Pagination**:
   - Navigate through multiple pages of elections.

---
