// app/login/page.tsx
'use client';

import React from 'react';
import { useConnectWallet } from '@/hooks/useConnectWallet';
import { useSnapshot } from 'valtio';
import UserStore from '@/store/userStore';
import { Button, Alert, Typography, Box } from '@mui/material';

export default function LoginPage() {
    const { address, isConnected } = useSnapshot(UserStore.state);
    const { connectWallet, error } = useConnectWallet();

    return (
        <main className='min-h-screen bg-gray-100 flex items-center justify-center'>
            <Box
                className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center'
                display='flex'
                flexDirection='column'
                alignItems='center'
            >
                <Typography variant='h4' gutterBottom color='primary'>
                    Wallet Login
                </Typography>
                {!isConnected ? (
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={connectWallet}
                        size='large'
                        className='mt-6'
                    >
                        Connect Wallet
                    </Button>
                ) : (
                    <Typography
                        variant='body1'
                        color='textSecondary'
                        className='mt-4'
                    >
                        <strong>Wallet Connected:</strong> {address}
                    </Typography>
                )}
                {error && (
                    <Alert severity='error' className='mt-4'>
                        {error}
                    </Alert>
                )}
            </Box>
        </main>
    );
}
