'use client';

import React, { useState, useEffect } from 'react';
import { useRegisterVoter } from '@/hooks/useRegisterVoter';
import { withAdminAuth } from '@/context/withAdminAuth';
import { useGetAllElections } from '@/hooks/useGetAllElections';
import {
    TextField,
    Button,
    Alert,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
} from '@mui/material';

const RegisterVoterPage: React.FC = () => {
    const [voterAddress, setVoterAddress] = useState('');
    const [selectedElectionId, setSelectedElectionId] = useState<number | ''>(
        ''
    );
    const [alert, setAlert] = useState<{
        type: 'success' | 'error' | 'info' | null;
        message: string;
    }>({ type: null, message: '' });

    const {
        registerVoter,
        loading: registering,
        error: registerError,
    } = useRegisterVoter();
    const {
        elections,
        loading: loadingElections,
        error: electionsError,
    } = useGetAllElections();

    const [activeElections, setActiveElections] = useState<any[]>([]);

    // Filter active elections
    useEffect(() => {
        if (elections) {
            const now = Math.floor(Date.now() / 1000); // Current time in seconds
            const active = elections.filter(
                (election) => election.isActive && election.endTime > now
            );
            setActiveElections(active);
        }
    }, [elections]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedElectionId || !voterAddress.trim()) {
            setAlert({
                type: 'error',
                message: 'Please fill in all required fields.',
            });
            return;
        }

        try {
            setAlert({ type: 'info', message: 'Transaction in progress...' });
            await registerVoter({
                electionId: Number(selectedElectionId),
                voter: voterAddress,
            });
            setAlert({
                type: 'success',
                message: `Voter ${voterAddress} successfully registered for election ID ${selectedElectionId}.`,
            });
            setVoterAddress('');
            setSelectedElectionId('');
        } catch (error: any) {
            setAlert({
                type: 'error',
                message:
                    error.message ||
                    registerError ||
                    'An unexpected error occurred.',
            });
        }
    };

    return (
        <main className='min-h-full h-full flex-grow bg-gray-100 flex items-center gap-6 justify-center'>
            <Box
                className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'
                display='flex'
                flexDirection='column'
                alignItems='center'
            >
                <Typography variant='h4' gutterBottom color='primary'>
                    Register Voter (Admin)
                </Typography>

                {/* Display alerts */}
                {alert.type && (
                    <Alert
                        severity={alert.type}
                        className='mb-4'
                        onClose={() => setAlert({ type: null, message: '' })}
                    >
                        {alert.message}
                    </Alert>
                )}

                {electionsError && (
                    <Alert severity='error' className='mb-4'>
                        {electionsError}
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className='w-full space-y-4'>
                    {/* Select Election Dropdown */}
                    <FormControl fullWidth>
                        <InputLabel id='select-election-label'>
                            Select Election
                        </InputLabel>
                        <Select
                            labelId='select-election-label'
                            value={selectedElectionId}
                            onChange={(e) =>
                                setSelectedElectionId(
                                    Number(e.target.value) || ''
                                )
                            }
                            disabled={
                                loadingElections || activeElections.length === 0
                            }
                        >
                            {loadingElections ? (
                                <MenuItem disabled>
                                    <CircularProgress size={24} />
                                </MenuItem>
                            ) : activeElections.length > 0 ? (
                                activeElections.map((election) => (
                                    <MenuItem
                                        key={election.id}
                                        value={election.id}
                                    >
                                        {election.name} (ID: {election.id})
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>
                                    No active elections available
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    {/* Voter Address Input */}
                    <TextField
                        fullWidth
                        label='Voter Address'
                        type='text'
                        placeholder='0x0000...'
                        value={voterAddress}
                        onChange={(e) => setVoterAddress(e.target.value)}
                        variant='outlined'
                    />

                    {/* Submit Button */}
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        disabled={
                            registering ||
                            !selectedElectionId ||
                            !voterAddress.trim()
                        }
                    >
                        {registering ? (
                            <CircularProgress size={24} color='inherit' />
                        ) : (
                            'Register Voter'
                        )}
                    </Button>
                </form>
            </Box>
        </main>
    );
};

export default withAdminAuth(RegisterVoterPage);
