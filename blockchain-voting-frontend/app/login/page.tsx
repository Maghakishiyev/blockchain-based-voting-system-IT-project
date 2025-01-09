// app/login/page.tsx
'use client';

import React from 'react';
import { useConnectWallet } from '@/hooks/useConnectWallet';
import { useSnapshot } from 'valtio';
import { userStore } from '@/store/userStore';

export default function LoginPage() {
    const { address, isConnected } = useSnapshot(userStore);

    const { connectWallet, error } = useConnectWallet();

    return (
        <main style={{ padding: '1rem' }}>
            <h1>Wallet Login</h1>
            {!isConnected && (
                <button
                    onClick={connectWallet}
                    style={{ marginBottom: '1rem' }}
                >
                    Connect Wallet
                </button>
            )}
            {isConnected && (
                <p>
                    <strong>Wallet Connected:</strong> {address}
                </p>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </main>
    );
}
