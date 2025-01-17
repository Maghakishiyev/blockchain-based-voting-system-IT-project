'use client';

import { useCallback } from 'react';
import UserStore from '@/store/userStore';
import { useRouter } from 'next/navigation';

export function useLogOut(shouldRedirect?: boolean) {
    const router = useRouter();

    const handleLogout = useCallback(() => {
        // Reset the global UserStore state
        UserStore.reset();

        // Disconnect wallet (if supported by the provider)
        if (typeof window !== 'undefined' && (window as any).ethereum) {
            try {
                if ((window as any).ethereum.disconnect) {
                    (window as any).ethereum.disconnect(); // Some wallet providers offer a `disconnect` method
                    console.log('Wallet disconnected');
                }
            } catch (err) {
                console.error('Error disconnecting wallet:', err);
                throw err
            }
        }

        // Optionally redirect to the homepage or login page
        if (shouldRedirect) {
            router.replace('/');
        }

        console.log('User logged out and state reset');
    }, [router, shouldRedirect]);

    return { handleLogout };
}
