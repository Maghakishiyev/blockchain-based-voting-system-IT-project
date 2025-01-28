### Documentation: `app/create-election/page.tsx`

---

#### **Overview**
This file implements the "Create Election" page for the **Blockchain Voting Frontend**. It provides a user interface for administrators to create a new election, including setting the election name, start and end times, and candidates. The page is secured with admin authentication.

---

#### **Key Features**
1. **Admin Authentication**: Secures the page so only authorized administrators can access it.
2. **Election Form**: Allows the admin to input:
   - Election name.
   - Start and end times (with validation).
   - List of candidates.
3. **Candidate Management**:
   - Add candidates individually or as a comma-separated list.
   - Remove candidates with a simple delete action.
4. **Transaction Feedback**:
   - Displays alerts for success, errors, and ongoing transactions.
5. **Validation**:
   - Ensures valid start and end times.
   - Requires at least one candidate.

---

#### **Component Breakdown**

1. **State Management**:
   - **`name`**: Stores the election name.
   - **`startTime`** & **`endTime`**: Manage start and end times for the election.
   - **`candidates`**: List of candidate names.
   - **`candidateInput`**: Stores the current input for candidate names.
   - **`alert`**: Displays transaction feedback (success, error, info).
   - **`loading`**: Tracks the transaction state.

2. **Hooks**:
   - **`useCreateElection`**: Custom hook for creating an election on the blockchain.

3. **Form Components**:
   - **`TextField`**: For election name and candidate input.
   - **`DateTimePicker`**: For selecting start and end times.
   - **`Chip`**: Displays candidate names with a delete option.
   - **`Alert`**: Shows transaction feedback.
   - **`Button`**: Submits the form.

4. **Validation**:
   - Ensures start time is earlier than end time.
   - Requires at least one candidate to proceed.
   - Checks for duplicate candidates and trims unnecessary spaces.

---

#### **Key Functions**

1. **`handleSubmit`**:
   - Handles form submission.
   - Validates input data (name, times, candidates).
   - Converts start and end times to Unix timestamps.
   - Calls the `createElection` function to interact with the blockchain.
   - Displays feedback messages (success or error).

2. **`handleAddCandidate`**:
   - Adds candidates to the list.
   - Supports both comma-separated inputs and pressing Enter.

3. **`handleRemoveCandidate`**:
   - Removes a candidate from the list by filtering it out.

---

#### **Page Flow**

1. **Render the Form**:
   - Users input election details (name, times, candidates).
   - Form components are styled with Material UI.

2. **Submit the Form**:
   - Validates the inputs.
   - Displays progress feedback (e.g., transaction in progress).
   - Calls the `createElection` hook to execute the blockchain transaction.

3. **Display Alerts**:
   - Success: Election created successfully.
   - Error: Invalid input or blockchain transaction failure.

4. **Reset Form**:
   - Clears all inputs upon successful submission.

---

#### **Dependencies**
- **`@mui/material`**:
  - Components like `TextField`, `Button`, `Alert`, `Stack`, `Chip`.
- **`@mui/x-date-pickers`**:
  - For date and time pickers (`DateTimePicker`).
- **`date-fns`**:
  - For localization (`AdapterDateFns`).
- **`@mui/icons-material`**:
  - Icon for removing candidates (`CloseIcon`).
- **Custom Hooks**:
  - `useCreateElection` for blockchain interaction.
- **Authentication**:
  - `withAdminAuth` HOC for securing the page.

---

#### **Usage**

1. **Access Control**:
   - Only administrators can access this page due to `withAdminAuth`.

2. **Creating an Election**:
   - Fill in the election name, select start and end times, and add candidates.
   - Click "Create Election" to initiate the blockchain transaction.

3. **Feedback**:
   - Success: Displays a success message and resets the form.
   - Error: Shows appropriate error messages for validation or blockchain issues.

---

#### **Example**
```tsx
<ElectionName: "Presidential 2025">
<StartTime: "2025-01-01 10:00 AM">
<EndTime: "2025-01-01 06:00 PM">
<Candidates: ["Alice", "Bob", "Charlie"]>
```

- **Submit Result**:
  - "Election created successfully!" (or an error message, if applicable).

---
