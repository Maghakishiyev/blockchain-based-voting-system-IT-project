// hooks/useConnectWallet.ts
'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import { userStore } from '@/store/userStore';

export function useConnectWallet() {
    const [connected, setConnected] = useState<boolean>(false);
    const [account, setAccount] = useState<string>('');
    const [error, setError] = useState<string>('');

    const connectWallet = async () => {
        if (typeof window === 'undefined' || !(window as any).ethereum) {
            setError('No Ethereum wallet found. Please install MetaMask.');
            return;
        }

        try {
            // Request account access from MetaMask
            await (window as any).ethereum.request({
                method: 'eth_requestAccounts',
            });

            const provider = new ethers.BrowserProvider(
                (window as any).ethereum
            );
            const signer = await provider.getSigner();
            const userAddr = await signer.getAddress();

            setAccount(userAddr);
            setConnected(true);
            setError('');

            // If you want to store it in a global store (e.g., userStore), do something like:
            userStore.address = userAddr;
            userStore.isConnected = true;
        } catch (err: any) {
            setError(err.message || 'Failed to connect wallet.');
        }
    };

    return {
        connectWallet,
        connected,
        account,
        error,
    };
}
