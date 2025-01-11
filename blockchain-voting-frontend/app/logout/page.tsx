// app/logout/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLogOut } from '@/hooks/useLogOut';
import { CircularProgress, Typography, Box } from '@mui/material';

export default function LogoutPage() {
    const { handleLogout } = useLogOut();
    const router = useRouter();

    useEffect(() => {
        handleLogout();
        router.push('/login');
    }, [handleLogout, router]);

    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
            <Box
                className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center'
                display='flex'
                flexDirection='column'
                alignItems='center'
            >
                <CircularProgress color='primary' className='mb-4' />
                <Typography variant='h5' color='primary'>
                    Logging Out...
                </Typography>
            </Box>
        </div>
    );
}
