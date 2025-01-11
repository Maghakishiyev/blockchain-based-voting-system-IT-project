// app/not-authorized/page.tsx
'use client';

import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function NotAuthorizedPage() {
    const router = useRouter();

    const handleGoBack = () => {
        router.push('/'); // Redirect to home or a relevant page
    };

    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
            <Box
                className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center'
                display='flex'
                flexDirection='column'
                alignItems='center'
            >
                <Typography variant='h4' color='error' gutterBottom>
                    Not Authorized
                </Typography>
                <Typography
                    variant='body1'
                    color='textSecondary'
                    className='mb-6'
                >
                    You do not have the required permissions to access this
                    page.
                </Typography>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleGoBack}
                >
                    Go Back to Home
                </Button>
            </Box>
        </div>
    );
}
