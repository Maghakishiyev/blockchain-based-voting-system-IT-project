// app/elections/page.tsx
'use client';

import React from 'react';
import { useGetAllElections } from '@/hooks/useGetAllElections';

export default function ElectionsPage() {
    const { elections, loading, error, refetch } = useGetAllElections();

    if (loading) return <p>Loading elections...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <main>
            <h1>All Elections</h1>
            <button onClick={refetch}>Refetch</button>
            <ul>
                {elections.map((election) => (
                    <li key={election.id}>
                        <b>{election.name}</b> (ID: {election.id}) <br />
                        Start Time: {election.startTime} <br />
                        End Time: {election.endTime} <br />
                        Active: {election.isActive ? 'Yes' : 'No'}
                    </li>
                ))}
            </ul>
        </main>
    );
}
