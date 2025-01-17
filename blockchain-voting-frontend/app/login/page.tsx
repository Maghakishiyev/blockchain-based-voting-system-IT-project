'use client';

import React, { useState } from 'react';
import { useConnectWallet } from '@/hooks/useConnectWallet';
import { useSnapshot } from 'valtio';
import UserStore from '@/store/userStore';
import {
    Button,
    Alert,
    Typography,
    Box,
    CircularProgress,
    Paper,
} from '@mui/material';

export default function LoginPage() {
    const { address, isConnected } = useSnapshot(UserStore.state);
    const { connectWallet, error, loading } = useConnectWallet(); // Add loading from the hook
    const [alert, setAlert] = useState<{
        type: 'success' | 'error' | 'info' | null;
        message: string;
    }>({ type: null, message: '' });

    const handleConnect = async () => {
        try {
            setAlert({ type: 'info', message: 'Connecting to wallet...' });
            await connectWallet();
            setAlert({
                type: 'success',
                message: 'Wallet connected successfully!',
            });
        } catch (err) {
            setAlert({
                type: 'error',
                message: error || 'Failed to connect wallet.',
            });
        }
    };

    return (
        <main className='min-h-full h-full flex-grow bg-gray-100 flex flex-col items-center justify-center py-10'>
            <Paper className='max-w-md w-full flex flex-col gap-6 p-8 rounded-lg shadow-lg'>
                <Typography
                    variant='h4'
                    color='primary'
                    className='text-center mb-6'
                >
                    Wallet Login
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

                {/* Wallet Connection Section */}
                <Box className='text-center'>
                    {!isConnected ? (
                        <>
                            {loading ? (
                                <CircularProgress
                                    color='primary'
                                    className='my-4'
                                />
                            ) : (
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={handleConnect}
                                    size='large'
                                    className='mt-4'
                                >
                                    Connect Wallet
                                </Button>
                            )}
                        </>
                    ) : (
                        <Alert severity='success' className='mb-4'>
                            Wallet Connected: {address}
                        </Alert>
                    )}
                </Box>

                {/* Display Error from Hook */}
                {error && (
                    <Alert severity='error' className='mt-4'>
                        {error}
                    </Alert>
                )}

                <Typography
                    variant='body2'
                    color='textSecondary'
                    className='text-center mt-6'
                >
                    Please ensure your wallet is connected to the correct
                    network.
                </Typography>
            </Paper>
        </main>
    );
}
