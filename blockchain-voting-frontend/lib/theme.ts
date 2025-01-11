// lib/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4f46e5', // Indigo
        },
        secondary: {
            main: '#10b981', // Emerald
        },
        background: {
            default: '#f3f4f6', // Light gray
        },
    },
});

export default theme;
