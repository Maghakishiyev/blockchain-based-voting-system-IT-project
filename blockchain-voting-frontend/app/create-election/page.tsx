// app/create-election/page.tsx
'use client';

import { useState } from 'react';
import { useCreateElection } from '@/hooks/useCreateElection';
import { withAdminAuth } from '@/context/withAdminAuth';
import { TextField, Button, Alert } from '@mui/material';

const CreateElectionPage: React.FC = () => {
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
        <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
            <div className='bg-white p-8 rounded-lg shadow-lg max-w-lg w-full'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
                    Create New Election
                </h2>
                {error && (
                    <Alert severity='error' className='mb-4'>
                        {error}
                    </Alert>
                )}
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <TextField
                        fullWidth
                        label='Election Name'
                        placeholder='e.g. Presidential 2025'
                        variant='outlined'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label='Start Timestamp'
                        type='number'
                        placeholder='e.g. 1700000000'
                        variant='outlined'
                        value={startTime}
                        onChange={(e) => setStartTime(Number(e.target.value))}
                    />
                    <TextField
                        fullWidth
                        label='End Timestamp'
                        type='number'
                        placeholder='e.g. 1700003600'
                        variant='outlined'
                        value={endTime}
                        onChange={(e) => setEndTime(Number(e.target.value))}
                    />
                    <TextField
                        fullWidth
                        label='Candidates (comma separated)'
                        placeholder='Alice, Bob, Carol'
                        variant='outlined'
                        value={candidates}
                        onChange={(e) => setCandidates(e.target.value)}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Election'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default withAdminAuth(CreateElectionPage);
