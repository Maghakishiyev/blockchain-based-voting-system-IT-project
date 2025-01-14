'use client';

import { useState } from 'react';
import { useSnapshot } from 'valtio';
import UserStore from '@/store/userStore';

interface RegisterMultipleVotersParams {
    electionId: number;
    voters: string[]; // Array of addresses
}

export function useRegisterMultipleVoters() {
    const { contract } = useSnapshot(UserStore.state);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const registerMultipleVoters = async ({
        electionId,
        voters,
    }: RegisterMultipleVotersParams) => {
        if (!contract) {
            setError(
                'Contract is not initialized. Please connect your wallet.'
            );
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const tx = await contract.registerMultipleVoters(
                electionId,
                voters
            );
            await tx.wait();
        } catch (err: any) {
            console.error('Error registering multiple voters:', err);
            setError(err.message || 'Failed to register multiple voters');
        } finally {
            setLoading(false);
        }
    };

    return { registerMultipleVoters, loading, error };
}
