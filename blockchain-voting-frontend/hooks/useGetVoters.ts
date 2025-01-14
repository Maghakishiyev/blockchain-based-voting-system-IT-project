'use client';

import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import UserStore from '@/store/userStore';

export function useGetVoters(electionId: number) {
    const { contract } = useSnapshot(UserStore.state);
    const [voters, setVoters] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchVoters = async () => {
        if (!contract) {
            setError(
                'Contract is not initialized. Please connect your wallet.'
            );
            return;
        }

        try {
            setLoading(true);
            const result = await contract.getVoters(electionId);
            setVoters(result);
        } catch (err: any) {
            console.error('Error fetching voters:', err);
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVoters();
    }, [electionId]);

    return { voters, loading, error, refetch: fetchVoters };
}
