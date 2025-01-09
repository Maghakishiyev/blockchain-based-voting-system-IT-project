// app/vote/[electionId]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useGetCandidates } from '@/hooks/useGetCandidates';
import { useVote } from '@/hooks/useVote';

export default function VotePage() {
    const params = useParams();
    const electionId = Number(params.electionId);

    const {
        candidates,
        loading: candidatesLoading,
        error: candidatesError,
    } = useGetCandidates(electionId);
    const { castVote, loading: voteLoading, error: voteError } = useVote();

    const [candidateId, setCandidateId] = useState<number>(0);

    const handleVote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (candidateId < 0 || candidateId >= candidates.length) {
            alert('Please select a valid candidate ID.');
            return;
        }
        await castVote({ electionId, candidateId });
    };

    return (
        <main>
            <h1>Vote in Election {electionId}</h1>

            {candidatesLoading && <p>Loading candidates...</p>}
            {candidatesError && (
                <p style={{ color: 'red' }}>{candidatesError}</p>
            )}

            <ul>
                {candidates.map((cand, index) => (
                    <li key={index}>
                        Candidate ID: {index} | Name: {cand}
                    </li>
                ))}
            </ul>

            <form onSubmit={handleVote}>
                <div>
                    <label>Candidate ID:</label>
                    <input
                        type='number'
                        value={candidateId}
                        onChange={(e) => setCandidateId(Number(e.target.value))}
                    />
                </div>

                {voteError && <p style={{ color: 'red' }}>{voteError}</p>}

                <button type='submit' disabled={voteLoading}>
                    {voteLoading ? 'Submitting Vote...' : 'Vote'}
                </button>
            </form>
        </main>
    );
}
