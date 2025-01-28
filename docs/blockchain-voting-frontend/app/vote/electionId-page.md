### Documentation: `app/vote/electionId/page.tsx`

---

#### **Overview**
The `VotePage` component allows authenticated users to cast their votes in a specific election. It displays election details, a list of candidates, and provides a form for selecting and submitting a vote.

---

#### **Key Features**
1. **Election Details**:
   - Displays the name, start time, end time, and status (active or inactive) of the election.

2. **Candidate Selection**:
   - Lists all candidates for the election.
   - Allows users to select one candidate to cast their vote.

3. **Vote Submission**:
   - Provides a button to submit the vote.
   - Includes feedback for success, errors, and progress during the voting process.

4. **Navigation**:
   - Includes a button to view the voters for the election.

5. **User Authentication**:
   - Secured with `withUserAuth`, ensuring only authenticated users can access the page.

---

#### **Component Breakdown**

1. **State Management**:
   - **`selectedCandidateId`**:
     - Tracks the ID of the selected candidate.
   - **`alert`**:
     - Displays feedback messages (success, error, or info).
   - **`electionDetails`**:
     - Stores details of the current election.

2. **Hooks**:
   - **`useGetCandidates`**:
     - Fetches the list of candidates for the election.
   - **`useVote`**:
     - Handles the blockchain transaction for casting a vote.
   - **`useGetAllElections`**:
     - Retrieves details for all elections.
   - **`useParams`**:
     - Extracts the election ID from the URL.
   - **`useRouter`**:
     - Handles navigation to other pages (e.g., voters page).

3. **Utility Functions**:
   - **`formatTimestamp`**:
     - Formats Unix timestamps into a human-readable date and time.
   - **`handleVote`**:
     - Validates the selected candidate and submits the vote.

---

#### **Page Flow**

1. **Initial Load**:
   - Fetches election details and candidates using the election ID from the URL.

2. **Election Details**:
   - Displays the election name, start time, end time, and status.

3. **Candidate Selection**:
   - Lists all candidates.
   - Highlights the selected candidate.

4. **Vote Submission**:
   - Validates the candidate selection and submits the vote.
   - Displays feedback for success or errors.

5. **Navigation**:
   - Provides a button to view voters for the election.

---

#### **Render Components**

1. **Alerts**:
   - Displays feedback for success, errors, or progress.

2. **Election Details**:
   - Shows metadata for the election, including its status (active or inactive).

3. **Candidate List**:
   - Displays candidates with selectable cards for each.

4. **Submit Button**:
   - Submits the vote for the selected candidate.

5. **Navigation Button**:
   - Redirects the user to the voters' page for the election.

---

#### **Dependencies**
- **`@mui/material`**:
  - Components for UI elements like `Typography`, `Alert`, `Button`, `Chip`, `Box`, and `CircularProgress`.
- **`react-chartjs-2`**:
  - Used for visualization if needed in future extensions.
- **Custom Hooks**:
  - `useGetCandidates` for fetching candidate data.
  - `useVote` for submitting votes.
  - `useGetAllElections` for fetching election details.
- **Routing**:
  - `useParams` for URL parameters.
  - `useRouter` for navigation.
- **Authentication**:
  - `withUserAuth` HOC for securing the page.

---

#### **Example Usage**

1. **Casting a Vote**:
   - User selects a candidate from the list.
   - Clicks "Submit Vote" to cast their vote.
   - Success Message: "Vote submitted successfully!"

2. **View Voters**:
   - User clicks "View Voters for This Election" to navigate to the voters' page.

---
