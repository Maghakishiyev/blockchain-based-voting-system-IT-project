// hooks/useGetVoterProfile.ts
'use client';

import { useEffect, useState } from 'react';
import { getContract } from '@/lib/contract';

// Types for clarity
interface VoterProfile {
    isRegistered: boolean;
    hasVoted: boolean;
    votedCandidate: number;
}

interface UseGetVoterProfileParams {
    electionId: number;
    voter: string;
}

export function useGetVoterProfile({
    electionId,
    voter,
}: UseGetVoterProfileParams) {
    const [profile, setProfile] = useState<VoterProfile>({
        isRegistered: false,
        hasVoted: false,
        votedCandidate: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const contract = await getContract();
            const [isRegistered, hasVoted, vote] =
                await contract.getVoterProfile(electionId, voter);

            setProfile({
                isRegistered,
                hasVoted,
                votedCandidate: vote,
            });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Only attempt fetching if we have a valid voter address
        if (voter && voter !== '0x0000000000000000000000000000000000000000') {
            fetchProfile();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [electionId, voter]);

    return { profile, loading, error, refetch: fetchProfile };
}
