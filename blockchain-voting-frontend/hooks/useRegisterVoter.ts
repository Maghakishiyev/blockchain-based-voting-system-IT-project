// hooks/useRegisterVoter.ts
'use client';

import { useState } from 'react';
import { getContract } from '@/lib/contract';

interface RegisterVoterParams {
    electionId: number;
    voter: string;
}

export function useRegisterVoter() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const registerVoter = async ({
        electionId,
        voter,
    }: RegisterVoterParams) => {
        try {
            setLoading(true);
            const contract = await getContract();
            const tx = await contract.registerVoter(electionId, voter);
            await tx.wait();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { registerVoter, loading, error };
}
