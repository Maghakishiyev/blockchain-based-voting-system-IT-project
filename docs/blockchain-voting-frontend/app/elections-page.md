### Documentation: `app/elections/page.tsx`

---

#### **Overview**
The `ElectionsPage` component is a user-facing page in the **Blockchain Voting Frontend** that lists all elections. Users can browse, search, filter, and view individual elections based on their state (e.g., active, finished). The page includes pagination and redirects users to detailed pages for voting or viewing results.

---

#### **Key Features**
1. **Election Listing**:
   - Displays elections in a paginated grid view.
   - Includes details like ID, name, start and end times, and status (active, ended, or not started).

2. **Filters and Search**:
   - Filter elections by state (all, active, finished).
   - Search by name or ID.

3. **Pagination**:
   - Allows navigation through elections with a customizable page size.

4. **Dynamic Navigation**:
   - Redirects users to:
     - The voting page for active elections.
     - The results page for finished elections.

5. **Error Handling**:
   - Displays an alert in case of errors during data fetching.

6. **Authentication**:
   - Secured with `withUserAuth` to restrict access to authenticated users only.

---

#### **Component Breakdown**

1. **State Management**:
   - **`filterState`**: Tracks the selected filter tab (`0 = All`, `1 = Active`, `2 = Finished`).
   - **`searchTerm`**: Stores the user's search input.
   - **`currentPage`**: Tracks the current pagination page.

2. **Hooks**:
   - **`useGetPaginatedElections`**:
     - Fetches elections data from the backend with pagination and filtering.

3. **Utility Functions**:
   - **`formatTimestamp`**:
     - Formats Unix timestamps into a human-readable format (`dd/MM/yyyy HH:mm`).
   - **`handleSearch`**:
     - Filters elections based on the search term (name or ID).

4. **Render Components**:
   - **Tabs**:
     - Filters elections by state.
   - **Search Bar**:
     - Text input to search elections by name or ID.
   - **Grid**:
     - Displays elections as individual cards with details.
   - **Pagination**:
     - Allows navigation between pages of elections.

---

#### **Page Flow**

1. **Initial Load**:
   - Fetches elections from the backend using `useGetPaginatedElections`.
   - Displays a loading indicator while fetching data.

2. **Filtering and Searching**:
   - Filters elections by state using tabs.
   - Searches elections by name or ID with the search bar.

3. **Render Elections**:
   - Displays elections as cards in a grid view.
   - Each card shows:
     - Name
     - ID
     - Start and end times
     - Status (active, ended, or not started)

4. **Navigation**:
   - Clicking on a card redirects the user to:
     - Voting page (`/vote/[electionId]`) for active elections.
     - Results page (`/results/[electionId]`) for ended elections.

---

#### **Dependencies**
- **`@mui/material`**:
  - Components like `Tabs`, `Tab`, `TextField`, `Card`, `Alert`, `Pagination`.
- **`date-fns`**:
  - Utility for formatting timestamps.
- **Custom Hooks**:
  - `useGetPaginatedElections` for fetching paginated election data.
- **Authentication**:
  - `withUserAuth` HOC for user authentication.

---

#### **Example Usage**

1. **Display Elections**:
   - Filters: Show all, active, or finished elections.
   - Example search term: `Presidential 2025`.

2. **Redirect Users**:
   - Redirect to `/vote/[electionId]` for active elections.
   - Redirect to `/results/[electionId]` for finished elections.

---
