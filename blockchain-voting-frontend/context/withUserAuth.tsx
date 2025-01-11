// components/hoc/withUserAuth.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserStore } from '@/store/userStore';
import { getProvider } from '@/lib/contract';
import { useSnapshot } from 'valtio';

export function withUserAuth<T extends {}>(
    WrappedComponent: React.ComponentType<T>
) {
    const AuthenticatedComponent = (props: T) => {
        const { isConnected, address } = useSnapshot(UserStore.state);
        const [checkingAuth, setCheckingAuth] = useState(true);
        const router = useRouter();

        useEffect(() => {
            const checkAuth = async () => {
                if (isConnected && address) {
                    setCheckingAuth(false);
                    return;
                }

                // Attempt to connect wallet
                try {
                    const provider = getProvider();
                    await provider.send('eth_requestAccounts', []);
                    const signer = await provider.getSigner();
                    const userAddress = await signer.getAddress();

                    // Store user info in userStore
                    UserStore.setAddress(userAddress);
                    UserStore.setIsConnected(true);

                    setCheckingAuth(false);
                } catch (err) {
                    console.error('Wallet connection failed:', err);
                    // Redirect to login page
                    router.push('/login');
                }
            };

            checkAuth();
        }, [isConnected, address, router]);

        if (checkingAuth) {
            return <p>Checking authentication...</p>;
        }

        return <WrappedComponent {...props} />;
    };

    return AuthenticatedComponent;
}
