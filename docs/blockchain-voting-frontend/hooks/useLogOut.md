
# useLogOut Hook Documentation

## Overview

The `useLogOut` hook provides a method for logging out users by resetting their state, optionally disconnecting their wallet, and redirecting them to a specified page. It integrates with the `UserStore` for managing global user state and supports optional redirection after logout.

---

## Exports

### `useLogOut`

#### Purpose

This hook is used to:
- Reset the global user state upon logout.
- Disconnect the user's wallet if supported by the provider.
- Optionally redirect the user to a different page.

---

## Usage

```typescript
import { useLogOut } from '@/hooks/useLogOut';

const { handleLogout } = useLogOut(shouldRedirect);

handleLogout(); // Logs out the user and resets the state
```

---

## Hook Features

### Parameters

- **`shouldRedirect`** (optional)
  - **Type**: `boolean`
  - **Default**: `undefined`
  - **Description**: Determines if the user should be redirected after logout. If `true`, the user is redirected to the homepage (`'/'`).

---

### Functions

#### `handleLogout`
- **Type**: `() => void`
- **Description**: Logs out the user by performing the following:
  1. Resets the `UserStore` state.
  2. Disconnects the Ethereum wallet if the wallet provider supports it.
  3. Optionally redirects the user to the homepage or another specified page.

---

## Example

```typescript
import React from 'react';
import { useLogOut } from '@/hooks/useLogOut';

export default function LogoutButton() {
    const { handleLogout } = useLogOut(true);

    return <button onClick={handleLogout}>Log Out</button>;
}
```

---

## Implementation Details

### **Global State Reset**
- The hook resets the global `UserStore` state using its `reset` method.

### **Wallet Disconnect**
- If the user's Ethereum wallet provider supports a `disconnect` method, the hook attempts to call it. This is primarily for ensuring the wallet is fully disconnected from the session.

### **Redirection**
- If `shouldRedirect` is `true`, the user is redirected to `'/'` using Next.js's `useRouter` hook.

---

## Notes

- **Error Handling**: Any errors during the wallet disconnection process are logged to the console and rethrown for further handling.
- **Browser Environment**: The wallet disconnection feature only works if executed in a browser environment (`typeof window !== 'undefined'`).

---

## Dependencies

- **Libraries**:
  - `valtio`: For managing global state via `UserStore`.
  - `next/navigation`: For redirection using the `useRouter` hook.

---

## Example Log Output

When `handleLogout` is called:
1. Resets the user state.
2. Disconnects the wallet (if supported).
3. Redirects the user to the homepage if `shouldRedirect` is `true`.

Console output:
```
Wallet disconnected
User logged out and state reset
```
