'use client';

import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import UserStore from '@/store/userStore';

export interface ElectionData {
    id: number;
    name: string;
    startTime: number;
    endTime: number;
    isActive: boolean;
}

export function useGetPaginatedElections() {
    const { contract } = useSnapshot(UserStore.state);
    const [elections, setElections] = useState<ElectionData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [totalElections, setTotalElections] = useState(0);

    const fetchElections = async (
        offset: number,
        limit: number,
        filterState: number
    ) => {
        if (!contract) {
            setError(
                'Contract is not initialized. Please connect your wallet.'
            );
            return;
        }

        try {
            setLoading(true);
            const totalElectionsCount = await contract.electionCounter();
            setTotalElections(Number(totalElectionsCount));

            const result = await contract.getPaginatedElections(
                offset,
                limit,
                filterState
            );


            // Extract the returned arrays
            const ids = result[0];
            const names = result[1];
            const startTimes = result[2];
            const endTimes = result[3];
            const states = result[4];

            const electionsData: ElectionData[] = ids.map(
                (id: any, index: number) => ({
                    id: Number(id),
                    name: names[index],
                    startTime: Number(startTimes[index]),
                    endTime: Number(endTimes[index]),
                    isActive: states[index],
                })
            );

            setElections(electionsData);
        } catch (err: any) {
            console.error('Error fetching elections:', err);
            setError(err.message || 'An unexpected error occurred.');
            throw err
        } finally {
            setLoading(false);
        }
    };

    return { elections, totalElections, loading, error, fetchElections };
}
