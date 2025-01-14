'use client';

import { useState } from 'react';
import { useSnapshot } from 'valtio';
import UserStore from '@/store/userStore';

interface RegisterVoterParams {
    electionId: number;
    voter: string;
}

export function useRegisterVoter() {
    const { contract } = useSnapshot(UserStore.state);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const registerVoter = async ({
        electionId,
        voter,
    }: RegisterVoterParams) => {
        if (!contract) {
            setError(
                'Contract is not initialized. Please connect your wallet.'
            );
            return;
        }

        try {
            setLoading(true);
            const tx = await contract.registerVoter(electionId, voter);
            await tx.wait();
        } catch (err: any) {
            console.error('Error registering voter:', err);
            setError(err.message || 'Failed to register voter.');
        } finally {
            setLoading(false);
        }
    };

    return { registerVoter, loading, error };
}
