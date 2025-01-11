// app/register-voters/page.tsx
'use client';

import React, { useState } from 'react';
import { useRegisterMultipleVoters } from '@/hooks/useRegisterMultipleVoters';
import { withAdminAuth } from '@/context/withAdminAuth';
import { TextField, Button, Alert, Typography, Box } from '@mui/material';

const RegisterMultipleVotersPage: React.FC = () => {
    const [electionId, setElectionId] = useState<number>(0);
    const [voters, setVoters] = useState<string>(''); // Comma-separated list of addresses
    const { registerMultipleVoters, loading, error } =
        useRegisterMultipleVoters();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const voterAddresses = voters.split(',').map((v) => v.trim());
        await registerMultipleVoters({ electionId, voters: voterAddresses });
    };

    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
            <Box
                className='bg-white p-8 rounded-lg shadow-lg max-w-lg w-full'
                display='flex'
                flexDirection='column'
                alignItems='center'
            >
                <Typography variant='h4' gutterBottom color='primary'>
                    Register Multiple Voters
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
                        label='Voter Addresses (comma-separated)'
                        multiline
                        rows={4}
                        value={voters}
                        onChange={(e) => setVoters(e.target.value)}
                        placeholder='0x123..., 0x456..., 0x789...'
                        variant='outlined'
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register Voters'}
                    </Button>
                </form>
            </Box>
        </div>
    );
};

export default withAdminAuth(RegisterMultipleVotersPage);
