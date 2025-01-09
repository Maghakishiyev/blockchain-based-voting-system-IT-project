// hooks/useGetAllElections.ts
'use client';

import { useEffect, useState } from 'react';
import { getContract } from '@/lib/contract';

// Minimal structure for an Election
export interface ElectionData {
    id: number;
    name: string;
    startTime: number;
    endTime: number;
    isActive: boolean;
}

export function useGetAllElections() {
    const [elections, setElections] = useState<ElectionData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchAll = async () => {
        try {
            setLoading(true);
            const contract = await getContract();

            // 1) Get the number of elections
            const countBN = await contract.electionCounter();
            const count = Number(countBN);

            const allElections: ElectionData[] = [];

            // 2) Loop through all election IDs
            for (let i = 1; i <= count; i++) {
                // Because elections is a public mapping, we can read partial struct data by calling contract.elections(i)
                // This typically returns an array or object with [id, name, startTime, endTime, ???].
                // The actual shape depends on how your tooling interprets the struct's public fields.
                const electionStruct = await contract.elections(i);
                // For example, electionStruct might look like:
                // [ '1', 'My Election', BigNumber { ... }, BigNumber { ... }, false, ... ]
                // You may need to adapt based on how ethers returns public structs.

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
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { elections, loading, error, refetch: fetchAll };
}
