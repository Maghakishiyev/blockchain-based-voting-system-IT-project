// hooks/useGetVoters.ts
'use client';

import { useEffect, useState } from 'react';
import { getContract } from '@/lib/contract';

export function useGetVoters(electionId: number) {
    const [voters, setVoters] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchVoters = async () => {
        try {
            setLoading(true);
            const contract = await getContract();
            const result = await contract.getVoters(electionId);
            setVoters(result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Automatically fetch on mount.
    // Or remove this effect if you prefer a manual fetch approach.
    useEffect(() => {
        fetchVoters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [electionId]);

    return { voters, loading, error, refetch: fetchVoters };
}
