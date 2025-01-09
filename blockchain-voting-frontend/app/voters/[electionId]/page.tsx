// app/voters/[electionId]/page.tsx
'use client';

import { useGetVoters } from '@/hooks/useGetVoters';
import { useParams } from 'next/navigation';

export default function VotersPage() {
    const params = useParams();
    const electionId = Number(params.electionId);

    const { voters, loading, error, refetch } = useGetVoters(electionId);

    return (
        <main>
            <h1>Voters for Election {electionId}</h1>
            {loading && <p>Loading voters...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            <button onClick={() => refetch()}>Refetch Voters</button>

            <ul>
                {voters.map((voter) => (
                    <li key={voter}>{voter}</li>
                ))}
            </ul>
        </main>
    );
}
