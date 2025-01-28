### Documentation: `context/withUserAuth.tsx`

---

#### **Overview**
The `withUserAuth` higher-order component (HOC) is designed to enforce user authentication. It ensures that only authenticated users can access specific pages or components by verifying their wallet connection and redirecting unauthenticated users to the login page.

---

#### **Key Features**
1. **User Authentication**:
   - Checks if the user is connected and authenticated.
   - Connects the wallet automatically if not already connected.

2. **Access Control**:
   - Redirects unauthenticated users to the `/login` page.

3. **Loading Indicator**:
   - Displays a spinner and a message while verifying the user's authentication status.

4. **Reusable Component**:
   - Can be used to wrap any component or page, enforcing authentication requirements.

---

#### **Component Breakdown**

1. **Custom Hook**:
   - **`useConnectWallet`**:
     - Handles the wallet connection logic.
   - **`useSnapshot`**:
     - Observes the state of `UserStore` for `isConnected` and `address`.

2. **State Management**:
   - **`checkingAuth`**:
     - Tracks whether the user's authentication status is being verified.

3. **Authentication Logic**:
   - Verifies if the wallet is connected.
   - If not connected, attempts to connect the wallet automatically.
   - Redirects to `/login` on authentication failure.

4. **Conditional Rendering**:
   - Displays a loading spinner while checking authentication.
   - Renders the wrapped component if the user is authenticated.

---

#### **Page Flow**

1. **Initial State**:
   - Sets `checkingAuth` to `true` to indicate authentication is being verified.

2. **Authentication Check**:
   - If not connected:
     - Attempts to connect the wallet using `useConnectWallet`.
   - If connected:
     - Proceeds to render the wrapped component.
   - On failure:
     - Redirects the user to the `/login` page.

3. **Conditional Rendering**:
   - **While Checking**:
     - Displays a loading spinner with the message "Checking Authentication..."
   - **If Authenticated**:
     - Renders the wrapped component.

---

#### **Render Components**

1. **Loading Indicator**:
   - A spinner and a message to indicate that authentication is being checked.

2. **Wrapped Component**:
   - Dynamically renders the component if the user is authenticated.

---

#### **Dependencies**
- **`valtio`**:
  - Used for state management (`UserStore`).
- **`useRouter`**:
  - Handles navigation and redirection to the `/login` page.
- **Custom Hooks**:
  - `useConnectWallet` for wallet connection logic.
- **Material-UI**:
  - Components like `Box`, `CircularProgress`, and `Typography` for the loading state.

---

#### **Usage**

1. **Wrap User Pages**:
   - Use `withUserAuth` to restrict access to pages or components.
   ```tsx
   import { withUserAuth } from '@/context/withUserAuth';

   const UserPage = () => {
       return <div>User Content</div>;
   };

   export default withUserAuth(UserPage);
   ```

2. **Authentication Workflow**:
   - Automatically connects the wallet if not already connected.
   - Redirects unauthenticated users to `/login`.

---
