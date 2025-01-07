'use client'

import { useState, useEffect } from 'react';
import { getContract, getSigner } from '@/utils/ehters';

export default function VoterPortal() {
    const [elections, setElections] = useState<string[]>([]);
    const [selectedElection, setSelectedElection] = useState<number | null>(
        null
    );
    const [loading, setLoading] = useState(false);

    // Fetch the list of elections
    const fetchElections = async () => {
        try {
            setLoading(true);
            console.log("1")
            const contract = getContract();
            console.log("2", contract)

            const electionCount = await contract.electionCounter(); // Assumes `electionCounter` exists in your contract
            console.log(3, electionCount)
            const fetchedElections: string[] = [];
            for (let i = 1; i <= electionCount; i++) {
                const election = await contract.elections(i);
                fetchedElections.push(election.name);
            }

            setElections(fetchedElections);
        } catch (error) {
            console.error('Error fetching elections:', error);
        } finally {
            setLoading(false);
        }
    };

    // Cast a vote
    const vote = async (candidateId: number) => {
        if (selectedElection === null) {
            alert('Please select an election first.');
            return;
        }

        try {
            setLoading(true);
            const contract = getContract();
            const signer = await getSigner();
            const signedContract: any = contract.connect(signer);

            const tx = await signedContract?.vote(
                selectedElection,
                candidateId
            );
            await tx.wait();

            alert('Vote cast successfully!');
        } catch (error) {
            console.error('Error casting vote:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchElections();
    }, []);

    return (
        <div>
            <h1>Voter Portal</h1>
            {loading && <p>Loading...</p>}
            <ul>
                {elections.map((election, index) => (
                    <li key={index}>
                        <span>{election}</span>
                        <button onClick={() => setSelectedElection(index + 1)}>
                            Select Election
                        </button>
                    </li>
                ))}
            </ul>
            <div>
                {selectedElection !== null && (
                    <div>
                        <h3>
                            Selected Election: {elections[selectedElection - 1]}
                        </h3>
                        <button onClick={() => vote(0)}>
                            Vote for Candidate 0
                        </button>
                        <button onClick={() => vote(1)}>
                            Vote for Candidate 1
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
