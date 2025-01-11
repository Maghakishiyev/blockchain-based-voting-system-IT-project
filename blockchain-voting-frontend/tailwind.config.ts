import type { Config } from 'tailwindcss';

export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './providers/**/*.{js,ts,jsx,tsx,mdx}',
        './widgets/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#4f46e5', // Indigo
                accent: '#10b981', // Emerald
                neutral: '#f3f4f6', // Light gray
                textSecondary: '#6b7280', // Muted gray for secondary text
            },
        },
    },
    plugins: [],
} satisfies Config;
