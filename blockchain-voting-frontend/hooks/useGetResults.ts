// hooks/useGetResults.ts
'use client';

import { useEffect, useState } from 'react';
import { getContract } from '@/lib/contract';

export function useGetResults(electionId: number) {
    const [results, setResults] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchResults = async () => {
        try {
            setLoading(true);
            const contract = await getContract();
            const data = await contract.getResults(electionId);
            // data will be an array of BigNumber, so parse them if needed
            const numericData = data.map((bn: any) => bn.toNumber());
            setResults(numericData);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResults();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [electionId]);

    return { results, loading, error, refetch: fetchResults };
}
