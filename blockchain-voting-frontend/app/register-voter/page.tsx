// app/register-voter/page.tsx
'use client';

import React, { useState } from 'react';
import { useRegisterVoter } from '@/hooks/useRegisterVoter';

export default function RegisterVoterPage() {
    const [electionId, setElectionId] = useState<number>(0);
    const [voterAddress, setVoterAddress] = useState('');

    const { registerVoter, loading, error } = useRegisterVoter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!electionId || !voterAddress) return;
        await registerVoter({ electionId, voter: voterAddress });
    };

    return (
        <main>
            <h1>Register Voter (Admin)</h1>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Election ID:</label>
                    <input
                        type='number'
                        value={electionId}
                        onChange={(e) => setElectionId(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label>Voter Address:</label>
                    <input
                        type='text'
                        value={voterAddress}
                        onChange={(e) => setVoterAddress(e.target.value)}
                        placeholder='0x0000...'
                    />
                </div>
                <button type='submit' disabled={loading}>
                    {loading ? 'Registering...' : 'Register Voter'}
                </button>
            </form>
        </main>
    );
}
