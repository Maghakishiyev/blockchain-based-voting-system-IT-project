// hooks/useVote.ts
'use client';

import { useState } from 'react';
import { getContract } from '@/lib/contract';

interface VoteParams {
    electionId: number;
    candidateId: number;
}

export function useVote() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const castVote = async ({ electionId, candidateId }: VoteParams) => {
        try {
            setLoading(true);
            const contract = await getContract();
            const tx = await contract.vote(electionId, candidateId);
            await tx.wait();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { castVote, loading, error };
}
