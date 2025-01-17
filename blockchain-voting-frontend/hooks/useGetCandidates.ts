'use client';

import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import UserStore from '@/store/userStore';

export function useGetCandidates(electionId: number) {
    const { contract } = useSnapshot(UserStore.state);
    const [candidates, setCandidates] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchCandidates = async () => {
        if (!contract) {
            setError(
                'Contract is not initialized. Please connect your wallet.'
            );
            return;
        }

        try {
            setLoading(true);
            const data = await contract.getCandidates(electionId);
            setCandidates(data);
        } catch (err: any) {
            console.error('Error fetching candidates:', err);
            setError(err.message || 'An unexpected error occurred.');
            throw err
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, [electionId]);

    return { candidates, loading, error, refetch: fetchCandidates };
}
