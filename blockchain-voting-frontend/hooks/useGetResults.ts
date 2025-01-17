'use client';

import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import UserStore from '@/store/userStore';

export function useGetResults(electionId: number) {
    const { contract } = useSnapshot(UserStore.state);
    const [results, setResults] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchResults = async () => {
        if (!contract) {
            setError(
                'Contract is not initialized. Please connect your wallet.'
            );
            return;
        }

        try {
            setLoading(true);
            const data = await contract.getResults(electionId);
            // Convert BigNumber array to numbers
            const numericData = data.map((bn: any) => Number(bn));
            console.log('Data', data);
            setResults(numericData);
        } catch (err: any) {
            console.error('Error fetching results:', err);
            setError(err.message || 'An unexpected error occurred.');
            throw err
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResults();
    }, [electionId]);

    return { results, loading, error, refetch: fetchResults };
}
