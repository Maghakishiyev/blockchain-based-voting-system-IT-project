# withUserAuth Higher-Order Component Documentation

## Overview
The [withUserAuth.tsx] is a higher-order component (HOC) that manages user authentication for the Blockchain-Based Voting System.

## Purpose
This HOC wraps a component to provide authentication checks and manage user connections to the wallet.

## Key Features
- **User State Management**: Utilizes the `UserStore` to access user state and connection status.
- **Authentication Check**: Verifies if the user is connected to the wallet; if not, it attempts to connect.
- **Loading State**: Displays a loading spinner while checking the authentication status.
- **Redirection**: Redirects to the login page if authentication fails.

## Usage
To use the [withUserAuth] HOC, wrap your component as follows:

```javascript
import { withUserAuth } from '@/context/withUserAuth';

const MyComponent = () => {
    // Component logic
};

export default withUserAuth(MyComponent);