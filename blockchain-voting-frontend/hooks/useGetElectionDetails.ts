'use client';

import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import UserStore from '@/store/userStore';

interface ElectionDetails {
    name: string;
    startTime: number;
    endTime: number;
    isActive: boolean;
    candidates: string[];
    results: number[];
}

export function useGetElectionDetails(electionId: number) {
    const { contract } = useSnapshot(UserStore.state);
    const [details, setDetails] = useState<ElectionDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchDetails = async () => {
        if (!contract) {
            setError(
                'Contract is not initialized. Please connect your wallet.'
            );
            return;
        }

        try {
            setLoading(true);
            const data = await contract.getElectionDetails(electionId);
            setDetails({
                name: data[0],
                startTime: Number(data[1]),
                endTime: Number(data[2]),
                isActive: data[3],
                candidates: data[4],
                results: data[5].map((bn: any) => Number(bn)),
            });
        } catch (err: any) {
            console.error('Error fetching election details:', err);
            setError(err.message || 'An unexpected error occurred.');
            throw err
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [electionId]);

    return { details, loading, error, refetch: fetchDetails };
}
