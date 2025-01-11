// components/MUIProvider.tsx
'use client';

import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@/lib/theme';

const MUIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default MUIProvider;
