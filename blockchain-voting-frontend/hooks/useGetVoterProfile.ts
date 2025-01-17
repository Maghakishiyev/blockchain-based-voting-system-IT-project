'use client';

import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import UserStore from '@/store/userStore';

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
    const { contract } = useSnapshot(UserStore.state);
    const [profile, setProfile] = useState<VoterProfile>({
        isRegistered: false,
        hasVoted: false,
        votedCandidate: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchProfile = async () => {
        if (!contract) {
            setError(
                'Contract is not initialized. Please connect your wallet.'
            );
            return;
        }

        try {
            setLoading(true);
            const [isRegistered, hasVoted, vote] =
                await contract.getVoterProfile(electionId, voter);

            setProfile({
                isRegistered,
                hasVoted,
                votedCandidate: Number(vote),
            });
        } catch (err: any) {
            console.error('Error fetching voter profile:', err);
            setError(err.message || 'An unexpected error occurred.');
            throw err
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Only attempt fetching if we have a valid voter address
        if (voter && voter !== '0x0000000000000000000000000000000000000000') {
            fetchProfile();
        }
    }, [electionId, voter]);

    return { profile, loading, error, refetch: fetchProfile };
}
