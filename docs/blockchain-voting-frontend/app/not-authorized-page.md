### Documentation: `app/not-authorized/page.tsx`

---

#### **Overview**
The `NotAuthorizedPage` component serves as a user-friendly page displayed when a user attempts to access a restricted area without the required permissions. It informs the user of the issue and provides a button to redirect them to the home page.

---

#### **Key Features**
1. **Unauthorized Access Message**:
   - Clearly informs the user that they are not authorized to view the page.

2. **User Feedback**:
   - Displays an error alert and provides contextual information about the issue.

3. **Redirection**:
   - Includes a button to redirect users to the home page with a brief delay for better user experience.

4. **Friendly Messaging**:
   - Encourages users to contact an administrator if they believe the restriction is a mistake.

---

#### **Component Breakdown**

1. **State Management**:
   - **`alert`**:
     - Tracks the type and message of alerts (`error` for access denial, `info` for redirection).

2. **Router**:
   - **`useRouter`**:
     - Handles navigation to the home page (`/`).

3. **Key Functions**:
   - **`handleGoBack`**:
     - Sets an informational alert message.
     - Redirects the user to the home page after a short delay.

4. **Render Components**:
   - **Alert**:
     - Displays error or informational messages based on the user’s actions.
   - **Typography**:
     - Provides additional context about the access denial.
   - **Button**:
     - Allows the user to initiate redirection to the home page.

---

#### **Page Flow**

1. **Initial State**:
   - Displays an error alert: "You are not authorized to access this page."

2. **User Action**:
   - Clicking the "Go Back to Home" button triggers the redirection process.
   - Sets an informational alert: "Redirecting to the home page..."

3. **Redirection**:
   - After a brief delay, the user is redirected to the home page (`/`).

---

#### **Render Details**

1. **Main Section**:
   - **Typography**:
     - Title: "Access Denied".
     - Message: "Unfortunately, you do not have the required permissions to view this page."
   - **Paper**:
     - Styled container for the error message and action button.

2. **Conditional Rendering**:
   - Displays the appropriate alert (error or informational) based on the user’s interaction.

---

#### **Dependencies**
- **`@mui/material`**:
  - Components for UI elements like `Button`, `Typography`, `Alert`, and `Paper`.
- **Routing**:
  - `useRouter`: Manages redirection to the home page.

---

#### **Example Usage**

1. **Access Denial**:
   - User attempts to access a restricted page.
   - Displays the "Access Denied" message with an error alert.

2. **Redirection**:
   - User clicks "Go Back to Home".
   - Informational alert is shown, followed by automatic redirection.

---
