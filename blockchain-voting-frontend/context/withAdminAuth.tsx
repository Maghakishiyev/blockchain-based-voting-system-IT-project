'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSnapshot } from 'valtio';
import { UserStore } from '@/store/userStore';
import { useConnectWallet } from '@/hooks/useConnectWallet';
import { Box, CircularProgress, Typography } from '@mui/material';

export function withAdminAuth<T extends {}>(
    WrappedComponent: React.ComponentType<T>
) {
    const AdminAuthenticatedComponent: React.FC<T> = (props) => {
        const { isConnected, isAdmin } = useSnapshot(UserStore.state);
        const [authStatus, setAuthStatus] = useState<
            'checking' | 'authorized' | 'unauthorized'
        >('checking');
        const router = useRouter();
        const { connectWallet } = useConnectWallet();

        useEffect(() => {
            let isMounted = true; // Prevent state updates if component unmounts

            const verifyAdmin = async () => {
                try {
                    // Connect wallet if not already connected
                    if (!isConnected) {
                        console.log('Connecting wallet...');
                        await connectWallet();
                    }

                    // Check admin status after wallet is connected
                    if (UserStore.state.isAdmin && isMounted) {
                        setAuthStatus('authorized'); // Allow rendering for admins
                    } else if (isMounted) {
                        setAuthStatus('unauthorized');
                        router.push('/not-authorized');
                    }
                } catch (err) {
                    console.error('Error verifying admin access:', err);
                    if (isMounted) router.push('/login');
                }
            };

            verifyAdmin();

            return () => {
                isMounted = false; // Cleanup to prevent state updates
            };
        }, []);

        if (authStatus === 'checking') {
            // Show loading spinner while verifying admin access
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
                            Verifying Admin Access...
                        </Typography>
                    </Box>
                </div>
            );
        }

        return authStatus === 'authorized' ? (
            <WrappedComponent {...props} />
        ) : null;
    };

    return AdminAuthenticatedComponent;
}
