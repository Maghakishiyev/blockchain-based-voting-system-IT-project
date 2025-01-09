// app/create-election/page.tsx
'use client';

import { useState } from 'react';
import { useCreateElection } from '@/hooks/useCreateElection';

export default function CreateElectionPage() {
    const { createElection, loading, error } = useCreateElection();
    const [name, setName] = useState('');
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [candidates, setCandidates] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createElection({
            name,
            startTime,
            endTime,
            candidates: candidates.split(',').map((c) => c.trim()),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Election</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>Election Name:</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='e.g. Presidential 2025'
                />
            </div>
            <div>
                <label>Start Timestamp:</label>
                <input
                    type='number'
                    value={startTime}
                    onChange={(e) => setStartTime(Number(e.target.value))}
                    placeholder='e.g. 1700000000'
                />
            </div>
            <div>
                <label>End Timestamp:</label>
                <input
                    type='number'
                    value={endTime}
                    onChange={(e) => setEndTime(Number(e.target.value))}
                    placeholder='e.g. 1700003600'
                />
            </div>
            <div>
                <label>Candidates (comma separated):</label>
                <input
                    value={candidates}
                    onChange={(e) => setCandidates(e.target.value)}
                    placeholder='Alice, Bob, Carol'
                />
            </div>
            <button type='submit' disabled={loading}>
                {loading ? 'Creating...' : 'Create Election'}
            </button>
        </form>
    );
}
