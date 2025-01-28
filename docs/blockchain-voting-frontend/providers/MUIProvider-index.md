# `MUIProvider` Documentation

## Overview

The `MUIProvider` component is a wrapper for the Material-UI (MUI) `ThemeProvider` in the `BlockchainVoting` frontend application. It provides a consistent theme and baseline styling to all child components.

---

## Features

- Applies the custom MUI theme defined in the `theme.ts` file to all child components.
- Includes Material-UI's `CssBaseline` to normalize and standardize styles across browsers.

---

## Implementation

### File Location
`providers/MUIProvider/index.tsx`

### Component Definition

#### **`MUIProvider`**
- **Type**: `React.FC<{ children: React.ReactNode }>`
- **Description**: A functional component that wraps its children with the `ThemeProvider` and applies global baseline styles using `CssBaseline`.

#### Props
- **`children`**: React elements or components to be wrapped by the `MUIProvider`.

---

## Usage

### Wrapping the Application

To apply the theme and global styles to the entire application, wrap the root component with `MUIProvider`.

```tsx
// app/layout.tsx or similar entry point
import React from 'react';
import MUIProvider from '@/providers/MUIProvider';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <MUIProvider>
            {children}
        </MUIProvider>
    );
};

export default AppLayout;
```

### Example

```tsx
import React from 'react';
import Button from '@mui/material/Button';

function ExamplePage() {
    return (
        <Button color="primary">
            This button uses the primary theme color
        </Button>
    );
}

export default function App() {
    return (
        <MUIProvider>
            <ExamplePage />
        </MUIProvider>
    );
}
```

---

## Notes

1. **Theme Extension**: To modify the application's theme, edit the `theme.ts` file.
2. **Material-UI Baseline**: The `CssBaseline` component provides consistent styling, including removing browser defaults and applying sensible global styles.

---

## References

- [Material-UI ThemeProvider](https://mui.com/customization/theming/)
- [Material-UI CssBaseline](https://mui.com/components/css-baseline/)
