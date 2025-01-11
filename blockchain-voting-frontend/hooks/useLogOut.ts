// hooks/useLogOut.ts
'use client';

import { useCallback } from 'react';
import UserStore from '@/store/userStore';
import { useRouter } from 'next/navigation';

export function useLogOut(shouldRedirect?: boolean) {
    const router = useRouter();

    const handleLogout = useCallback(() => {
        // Reset the UserStore state
        UserStore.reset();

        // Disconnect wallet (this depends on how the wallet provider handles disconnection)
        if (typeof window !== 'undefined' && (window as any).ethereum) {
            try {
                (window as any).ethereum.disconnect?.(); // Some providers offer a disconnect method
                console.log('Wallet disconnected');
            } catch (err) {
                console.error('Error disconnecting wallet:', err);
            }
        }

        if (shouldRedirect) {
            router.replace('/');
        }
        console.log('User logged out and state reset');
    }, [router]);

    return { handleLogout };
}
