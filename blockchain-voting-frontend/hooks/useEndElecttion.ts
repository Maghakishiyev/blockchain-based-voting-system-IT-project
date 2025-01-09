// hooks/useEndElection.ts
'use client';

import { useState } from 'react';
import { getContract } from '@/lib/contract';

export function useEndElection() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const endElection = async (electionId: number) => {
        try {
            setLoading(true);
            const contract = await getContract();
            const tx = await contract.endElection(electionId);
            await tx.wait();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { endElection, loading, error };
}
