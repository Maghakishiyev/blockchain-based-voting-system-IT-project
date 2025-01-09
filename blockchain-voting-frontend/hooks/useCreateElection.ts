// hooks/useCreateElection.ts
'use client';

import { useState } from 'react';
import { getContract } from '@/lib/contract';

interface CreateElectionParams {
    name: string;
    startTime: number;
    endTime: number;
    candidates: string[];
}

export function useCreateElection() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const createElection = async (params: CreateElectionParams) => {
        try {
            setLoading(true);
            const contract = await getContract();
            const tx = await contract.createElection(
                params.name,
                params.startTime,
                params.endTime,
                params.candidates
            );
            await tx.wait();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { createElection, loading, error };
}
