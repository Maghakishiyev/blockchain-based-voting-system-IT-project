'use client';

import { useState } from 'react';
import { useSnapshot } from 'valtio';
import UserStore from '@/store/userStore';

export function useEndElection() {
    const { contract } = useSnapshot(UserStore.state);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const endElection = async (electionId: number) => {
        if (!contract) {
            setError(
                'Contract is not initialized. Please connect your wallet.'
            );
            return;
        }

        try {
            setLoading(true);
            const tx = await contract.endElection(electionId);
            await tx.wait();
        } catch (err: any) {
            console.error('Error ending election:', err);
            setError(err.message || 'An unexpected error occurred.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { endElection, loading, error };
}
