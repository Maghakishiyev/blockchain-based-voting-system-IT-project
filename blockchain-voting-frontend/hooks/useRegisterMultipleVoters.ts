// hooks/useRegisterMultipleVoters.ts
'use client';

import { useState } from 'react';
import { getContract } from '@/lib/contract';

interface RegisterMultipleVotersParams {
    electionId: number;
    voters: string[]; // Array of addresses
}

export function useRegisterMultipleVoters() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const registerMultipleVoters = async ({
        electionId,
        voters,
    }: RegisterMultipleVotersParams) => {
        try {
            setLoading(true);
            setError(null);

            const contract = await getContract();
            const tx = await contract.registerMultipleVoters(
                electionId,
                voters
            );
            await tx.wait();
        } catch (err: any) {
            setError(err.message || 'Failed to register multiple voters');
        } finally {
            setLoading(false);
        }
    };

    return { registerMultipleVoters, loading, error };
}
