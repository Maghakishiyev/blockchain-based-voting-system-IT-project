'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogOut } from '@/hooks/useLogOut';
import { CircularProgress, Typography, Box, Alert, Paper } from '@mui/material';

export default function LogoutPage() {
    const { handleLogout } = useLogOut();
    const router = useRouter();
    const [alert, setAlert] = useState<{
        type: 'info' | 'error' | 'success' | null;
        message: string;
    }>({
        type: 'info',
        message: 'Logging you out, please wait...',
    });

    useEffect(() => {
        const performLogout = async () => {
            try {
                await handleLogout();
                setAlert({
                    type: 'success',
                    message: 'Logged out successfully. Redirecting...',
                });
                setTimeout(() => {
                    router.push('/login');
                }, 1500);
            } catch (err) {
                setAlert({
                    type: 'error',
                    message:
                        'An error occurred during logout. Please try again later.',
                });
            }
        };

        performLogout();
    }, [handleLogout, router]);

    return (
        <main className='min-h-full h-full flex-grow flex items-center justify-center bg-gray-100 py-10'>
            <Paper className='max-w-md w-full p-8 rounded-lg shadow-lg text-center'>
                <Typography
                    variant='h4'
                    color='primary'
                    className='mb-4 text-center'
                >
                    Logout
                </Typography>

                {/* Display Alerts */}
                {alert.type && (
                    <Alert
                        severity={alert.type}
                        className='mb-4'
                        onClose={() => setAlert({ type: null, message: '' })}
                    >
                        {alert.message}
                    </Alert>
                )}

                {/* Loading Indicator */}
                {alert.type === 'info' && (
                    <CircularProgress color='primary' className='mb-4' />
                )}

                {/* Additional Message */}
                <Typography variant='body1' color='textSecondary'>
                    Thank you for using our service. We hope to see you again
                    soon!
                </Typography>
            </Paper>
        </main>
    );
}
