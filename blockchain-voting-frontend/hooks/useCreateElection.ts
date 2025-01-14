'use client';

import { useState } from 'react';
import { useSnapshot } from 'valtio';
import UserStore from '@/store/userStore';

interface CreateElectionParams {
    name: string;
    startTime: number;
    endTime: number;
    candidates: string[];
}

export function useCreateElection() {
    const { contract } = useSnapshot(UserStore.state);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const createElection = async (params: CreateElectionParams) => {
        if (!contract) {
            setError(
                'Contract is not initialized. Please connect your wallet.'
            );
            return;
        }

        try {
            setLoading(true);
            const tx = await contract.createElection(
                params.name,
                params.startTime,
                params.endTime,
                params.candidates
            );
            await tx.wait();
        } catch (err: any) {
            console.error('Error creating election:', err);
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return { createElection, loading, error };
}
