// app/register-voter/page.tsx
'use client';

import React, { useState } from 'react';
import { useRegisterVoter } from '@/hooks/useRegisterVoter';
import { withAdminAuth } from '@/context/withAdminAuth';
import { TextField, Button, Alert, Typography, Box } from '@mui/material';

const RegisterVoterPage: React.FC = () => {
    const [electionId, setElectionId] = useState<number>(0);
    const [voterAddress, setVoterAddress] = useState('');

    const { registerVoter, loading, error } = useRegisterVoter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!electionId || !voterAddress) return;
        await registerVoter({ electionId, voter: voterAddress });
    };

    return (
        <main className='min-h-screen bg-gray-100 flex items-center gap-6 justify-center'>
            <Box
                className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'
                display='flex'
                flexDirection='column'
                alignItems='center'
            >
                <Typography variant='h4' gutterBottom color='primary'>
                    Register Voter (Admin)
                </Typography>
                {error && (
                    <Alert severity='error' className='mb-4'>
                        {error}
                    </Alert>
                )}
                <form onSubmit={handleSubmit} className='w-full space-y-4'>
                    <TextField
                        fullWidth
                        label='Election ID'
                        type='number'
                        value={electionId}
                        onChange={(e) => setElectionId(Number(e.target.value))}
                        variant='outlined'
                    />
                    <TextField
                        fullWidth
                        label='Voter Address'
                        type='text'
                        placeholder='0x0000...'
                        value={voterAddress}
                        onChange={(e) => setVoterAddress(e.target.value)}
                        variant='outlined'
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register Voter'}
                    </Button>
                </form>
            </Box>
        </main>
    );
};

export default withAdminAuth(RegisterVoterPage);
