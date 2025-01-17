'use client';

import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import UserStore from '@/store/userStore';

export function useGetVoters(electionId: number) {
    const { contract } = useSnapshot(UserStore.state);
    const [voters, setVoters] = useState<
        {
            address: string;
            isRegistered: boolean;
            hasVoted: boolean;
            vote: number;
        }[]
    >([]);
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
            const [addresses, isRegisteredArray, hasVotedArray, votesArray] =
                await contract?.getVotersWithDetails(electionId);

            const voterData = addresses.map(
                (address: string, index: number) => ({
                    address,
                    isRegistered: isRegisteredArray[index],
                    hasVoted: hasVotedArray[index],
                    vote: Number(votesArray[index]),
                })
            );

            setVoters(voterData);
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
