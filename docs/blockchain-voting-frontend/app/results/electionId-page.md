### Documentation: `app/results/electionId/page.tsx`

---

#### **Overview**
The `ResultsPage` component displays the results of a specific election. It provides details such as the election name, start and end times, and the number of votes received by each candidate. It also visualizes the results using a bar chart and includes options for refreshing data and viewing voter details.

---

#### **Key Features**
1. **Election Results Visualization**:
   - Displays the number of votes for each candidate using a bar chart.
   - Shows percentage data for better understanding.

2. **Election Details**:
   - Displays election metadata including:
     - Name
     - ID
     - Start and end times
     - Current status (active or ended)

3. **Data Refresh**:
   - Allows users to refresh the election results with the latest data.

4. **Navigation**:
   - Provides a button to navigate to the voters' page for the election.

5. **User Authentication**:
   - Secured with `withUserAuth`, ensuring only authenticated users can access the page.

---

#### **Component Breakdown**

1. **State Management**:
   - **`chartData`**:
     - Stores the data for the bar chart.
   - **`alert`**:
     - Tracks and displays feedback messages (success, error, or info).

2. **Hooks**:
   - **`useGetElectionDetails`**:
     - Fetches election details including candidates and vote counts.
     - Supports data refetching for updates.
   - **`useParams`**:
     - Retrieves the election ID from the URL.
   - **`useRouter`**:
     - Handles navigation to other pages (e.g., voters page).

3. **Utility Functions**:
   - **`formatDateTime`**:
     - Formats Unix timestamps into a human-readable date and time string.
   - **`handleRefetch`**:
     - Refreshes election data and updates the UI.

---

#### **Page Flow**

1. **Initial Load**:
   - Fetches election details using `useGetElectionDetails`.
   - Displays a loading spinner until the data is retrieved.

2. **Render Election Details**:
   - Displays the election name, ID, start and end times, and status (active or ended).

3. **Visualize Results**:
   - Shows vote counts and percentages in a bar chart.
   - Displays a message if no results are available.

4. **User Actions**:
   - **Refresh Data**:
     - Updates the election results with the latest data.
   - **View Voters**:
     - Redirects to the voters' page for the election.

---

#### **Render Components**

1. **Alerts**:
   - Displays feedback messages for data loading, errors, and refresh operations.

2. **Election Details**:
   - Renders metadata such as the election name, ID, and times.

3. **Bar Chart**:
   - Visualizes vote counts and percentages for each candidate.

4. **Buttons**:
   - **View Voters**:
     - Navigates to the voters' page.
   - **Refresh Data**:
     - Triggers a data refetch for the election results.

---

#### **Dependencies**
- **`@mui/material`**:
  - Components for UI elements like `Typography`, `Alert`, `Button`, `Box`, `Paper`, and `CircularProgress`.
- **`react-chartjs-2`**:
  - Used for rendering the bar chart.
- **Custom Hooks**:
  - `useGetElectionDetails` for fetching election details.
- **Routing**:
  - `useParams` for URL parameters.
  - `useRouter` for navigation.
- **Authentication**:
  - `withUserAuth` HOC for securing the page.

---

#### **Example Usage**

1. **View Election Results**:
   - Displays the number of votes each candidate received with percentage data.

2. **Refresh Results**:
   - Updates the election results with the latest data from the blockchain.

3. **View Voters**:
   - Redirects to `/voters/[electionId]` to display voter details for the election.

---
