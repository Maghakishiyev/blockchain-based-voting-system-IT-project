'use client'

import { useState } from 'react';
import { getContract, getSigner } from '@/utils/ehters';

export default function AdminPortal() {
    const [electionName, setElectionName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [candidates, setCandidates] = useState<string>('');
    const [loading, setLoading] = useState(false);

    // Create a new election
    const createElection = async () => {
        try {
            setLoading(true);
            const contract = getContract();
            const signer = await getSigner();
            const signedContract: any = contract.connect(signer);
            console.log(signer.address)
            const tx = await signedContract.createElection(
                electionName,
                Math.floor(new Date(startTime).getTime() / 1000), // Convert to Unix timestamp
                Math.floor(new Date(endTime).getTime() / 1000), // Convert to Unix timestamp
                candidates.split(',').map((c) => c.trim()) // Split and trim candidate names
            );

            await tx.wait();
            alert('Election created successfully!');
        } catch (error) {
            console.error('Error creating election:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Admin Portal</h1>
            {loading && <p>Loading...</p>}
            <div>
                <input
                    type='text'
                    placeholder='Election Name'
                    onChange={(e) => setElectionName(e.target.value)}
                />
                <input
                    type='datetime-local'
                    onChange={(e) => setStartTime(e.target.value)}
                />
                <input
                    type='datetime-local'
                    onChange={(e) => setEndTime(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Candidates (comma-separated)'
                    onChange={(e) => setCandidates(e.target.value)}
                />
                <button onClick={createElection}>Create Election</button>
            </div>
        </div>
    );
}
