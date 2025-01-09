// hooks/useGetCandidates.ts
'use client';

import { useEffect, useState } from 'react';
import { getContract } from '@/lib/contract';

export function useGetCandidates(electionId: number) {
    const [candidates, setCandidates] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchCandidates = async () => {
        try {
            setLoading(true);
            const contract = await getContract();
            const data = await contract.getCandidates(electionId);
            setCandidates(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [electionId]);

    return { candidates, loading, error, refetch: fetchCandidates };
}
