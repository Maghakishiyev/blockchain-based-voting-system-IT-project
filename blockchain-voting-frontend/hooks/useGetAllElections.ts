'use client';

import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import UserStore from '@/store/userStore';

// Minimal structure for an Election
export interface ElectionData {
    id: number;
    name: string;
    startTime: number;
    endTime: number;
    isActive: boolean;
}

export function useGetAllElections() {
    const { contract } = useSnapshot(UserStore.state);
    const [elections, setElections] = useState<ElectionData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchAll = async () => {
        setError('');

        if (!contract) {
            setError(
                'Contract is not initialized. Please connect your wallet.'
            );
            return;
        }

        try {
            setLoading(true);

            // Get the number of elections
            const countBN = await contract.electionCounter();
            const count = Number(countBN);

            const allElections: ElectionData[] = [];

            // Loop through all election IDs
            for (let i = 1; i <= count; i++) {
                const electionStruct = await contract.elections(i);

                const electionData: ElectionData = {
                    id: Number(electionStruct.id),
                    name: electionStruct.name,
                    startTime: Number(electionStruct.startTime),
                    endTime: Number(electionStruct.endTime),
                    isActive: electionStruct.isActive,
                };

                allElections.push(electionData);
            }

            setElections(allElections);
        } catch (err: any) {
            console.error('Error fetching elections:', err);
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    return { elections, loading, error, refetch: fetchAll };
}
