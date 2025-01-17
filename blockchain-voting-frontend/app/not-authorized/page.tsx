'use client';

import React, { useState } from 'react';
import { Button, Typography, Box, Alert, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function NotAuthorizedPage() {
    const router = useRouter();
    const [alert, setAlert] = useState<{
        type: 'info' | 'error' | 'success' | null;
        message: string;
    }>({
        type: 'error',
        message: 'You are not authorized to access this page.',
    });

    const handleGoBack = () => {
        setAlert({
            type: 'info',
            message: 'Redirecting to the home page...',
        });
        setTimeout(() => {
            router.push('/');
        }, 1000);
    };

    return (
        <main className='min-h-full h-full flex-grow flex flex-col items-center justify-center bg-gray-100 py-10'>
            <Paper className='max-w-md w-full p-8 rounded-lg shadow-lg flex flex-col gap-4'>
                <Typography
                    variant='h4'
                    color='error'
                    className='text-center mb-4'
                >
                    Access Denied
                </Typography>

                {/* Alert Section */}
                {alert.type && (
                    <Alert
                        severity={alert.type}
                        className='mb-4'
                        onClose={() => setAlert({ type: null, message: '' })}
                    >
                        {alert.message}
                    </Alert>
                )}

                {/* Message */}
                <Typography
                    variant='body1'
                    color='textSecondary'
                    className='text-center mb-6'
                >
                    Unfortunately, you do not have the required permissions to
                    view this page. Please contact an administrator if you
                    believe this is an error.
                </Typography>

                {/* Action Button */}
                <Box className='text-center'>
                    <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        onClick={handleGoBack}
                    >
                        Go Back to Home
                    </Button>
                </Box>
            </Paper>
        </main>
    );
}
