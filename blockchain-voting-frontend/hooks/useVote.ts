'use client';

import { useState } from 'react';
import { useSnapshot } from 'valtio';
import UserStore from '@/store/userStore';

interface VoteParams {
    electionId: number;
    candidateId: number;
}

export function useVote() {
    const { contract } = useSnapshot(UserStore.state);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const castVote = async ({ electionId, candidateId }: VoteParams) => {
        if (!contract) {
            setError(
                'Contract is not initialized. Please connect your wallet.'
            );
            return;
        }

        try {
            setLoading(true);
            const tx = await contract.vote(electionId, candidateId);
            await tx.wait();
        } catch (err: any) {
            console.error('Error casting vote:', err);
            setError(err.message || 'Failed to cast vote.');
        } finally {
            setLoading(false);
        }
    };

    return { castVote, loading, error };
}
