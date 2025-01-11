// components/hoc/withAdminAuth.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserStore } from '@/store/userStore';
import { getProvider, getContract } from '@/lib/contract';
import { useSnapshot } from 'valtio';

export function withAdminAuth<T extends {}>(
    WrappedComponent: React.ComponentType<T>
) {
    const AdminAuthenticatedComponent = (props: T) => {
        const { isConnected, address } = useSnapshot(UserStore.state);
        const [checkingAuth, setCheckingAuth] = useState(true);
        const [isAdmin, setIsAdmin] = useState(false);
        const router = useRouter();

        useEffect(() => {
            const checkAdminAuth = async () => {
                try {
                    if (!isConnected) {
                        // Attempt to connect wallet if not already connected
                        const provider = getProvider();
                        await provider.send('eth_requestAccounts', []);
                        const signer = await provider.getSigner();
                        const userAddress = await signer.getAddress();

                        // Store user info in userStore
                        UserStore.setAddress(userAddress);
                        UserStore.setIsConnected(true);
                    }

                    // Once connected, check if the user is admin
                    const contract = await getContract();
                    const adminAddress = await contract.admin();

                    if (
                        UserStore.state.address?.toLowerCase() ===
                        adminAddress.toLowerCase()
                    ) {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                        router.push('/not-authorized');
                    }
                } catch (err) {
                    console.error('Admin check failed:', err);
                    router.push('/login'); // Redirect if user refuses to connect
                } finally {
                    setCheckingAuth(false); // Stop checking auth state
                }
            };

            checkAdminAuth();
        }, [isConnected, router]);

        if (checkingAuth) {
            return <p>Checking authentication...</p>; // Render a loading state
        }

        if (!isAdmin) {
            return null; // Render nothing if the user isn't admin (they are redirected)
        }

        return <WrappedComponent {...props} />;
    };

    return AdminAuthenticatedComponent;
}
