// components/hoc/withUserAuth.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserStore } from '@/store/userStore';
import { getProvider } from '@/lib/contract';
import { useSnapshot } from 'valtio';
import { useConnectWallet } from '@/hooks/useConnectWallet';
import { Box, CircularProgress, Typography } from '@mui/material';

export function withUserAuth<T extends {}>(
    WrappedComponent: React.ComponentType<T>
) {
    const AuthenticatedComponent = (props: T) => {
        const { isConnected, address } = useSnapshot(UserStore.state);
        const [checkingAuth, setCheckingAuth] = useState(true);
        const router = useRouter();
        const { connectWallet } = useConnectWallet();

        useEffect(() => {
            const checkAuth = async () => {
                if (!isConnected) {
                    setCheckingAuth(true);
                    connectWallet()
                        .then(() => setCheckingAuth(false))
                        .catch(() => router.push('/login'));
                } else {
                    setCheckingAuth(false);
                }
            };

            checkAuth();
        }, [isConnected, address, router]);

        if (checkingAuth) {
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
                            Checking Authentication...
                        </Typography>
                    </Box>
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    };

    return AuthenticatedComponent;
}
