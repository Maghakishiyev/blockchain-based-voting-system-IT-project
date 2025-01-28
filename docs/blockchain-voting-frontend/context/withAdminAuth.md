### Documentation: `context/withAdminAuth.tsx`

---

#### **Overview**
The `withAdminAuth` higher-order component (HOC) is a wrapper that ensures only authenticated administrators can access specific pages or components. It verifies the user's connection status, checks if they are an admin, and handles redirects for unauthorized users.

---

#### **Key Features**
1. **Admin Authentication**:
   - Verifies if the user is connected and has admin privileges.

2. **Automatic Wallet Connection**:
   - Attempts to connect the user's wallet if they are not already connected.

3. **Access Control**:
   - Redirects unauthorized users to the `/not-authorized` page.
   - Redirects users with connection issues to the `/login` page.

4. **Loading Indicator**:
   - Displays a spinner and message while verifying the admin's access.

5. **Reusable Component**:
   - Can wrap any component or page to restrict access to administrators.

---

#### **Component Breakdown**

1. **State Management**:
   - **`authStatus`**:
     - Tracks the user's authentication status (`checking`, `authorized`, `unauthorized`).

2. **Hooks**:
   - **`useSnapshot`**:
     - Observes the state of `UserStore` for `isConnected` and `isAdmin` values.
   - **`useRouter`**:
     - Handles redirection for unauthorized users.
   - **`useConnectWallet`**:
     - Provides the functionality to connect the user's wallet.

3. **Authentication Logic**:
   - **Wallet Connection**:
     - Attempts to connect the wallet if not already connected.
   - **Admin Verification**:
     - Checks if the user has admin privileges (`isAdmin`).
   - **Redirects**:
     - Unauthorized users are redirected to `/not-authorized`.
     - Users with connection errors are redirected to `/login`.

---

#### **Page Flow**

1. **Initial State**:
   - Sets the `authStatus` to `checking` and begins verifying the user's admin access.

2. **Authentication Check**:
   - Connects the wallet if necessary.
   - Verifies admin status using the `isAdmin` flag in `UserStore`.

3. **Conditional Rendering**:
   - **While Checking**:
     - Displays a loading spinner with the message "Verifying Admin Access..."
   - **If Authorized**:
     - Renders the wrapped component.
   - **If Unauthorized**:
     - Redirects the user to `/not-authorized`.

---

#### **Render Components**

1. **Loading Indicator**:
   - Displays a spinner and message while verifying access.

2. **Wrapped Component**:
   - Renders the component if the user is authorized.

---

#### **Dependencies**
- **`valtio`**:
  - Used for state management (`UserStore`).
- **`useRouter`**:
  - Handles navigation and redirects.
- **Custom Hooks**:
  - `useConnectWallet` for wallet connection.
- **Material-UI**:
  - Components like `Box`, `CircularProgress`, and `Typography` for the loading state.

---

#### **Usage**

1. **Wrap Admin Pages**:
   - Use `withAdminAuth` to restrict access to pages or components.
   ```tsx
   import { withAdminAuth } from '@/context/withAdminAuth';

   const AdminPage = () => {
       return <div>Admin Content</div>;
   };

   export default withAdminAuth(AdminPage);
   ```

2. **Authorization Workflow**:
   - Ensures only admin users can access the wrapped component.
   - Redirects unauthorized users.

---
