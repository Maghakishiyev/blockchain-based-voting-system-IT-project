'use client';

import React, { useState, useEffect } from 'react';
import { useRegisterMultipleVoters } from '@/hooks/useRegisterMultipleVoters';
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
    Chip,
    CircularProgress,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const RegisterMultipleVotersPage: React.FC = () => {
    const {
        registerMultipleVoters,
        loading: registering,
        error: registerError,
    } = useRegisterMultipleVoters();
    const {
        elections,
        loading: loadingElections,
        error: electionsError,
        refetch: refetchElections,
    } = useGetAllElections();

    const [activeElections, setActiveElections] = useState<any[]>([]);
    const [selectedElectionId, setSelectedElectionId] = useState<number | ''>(
        ''
    );
    const [voterAddresses, setVoterAddresses] = useState<string[]>([]);
    const [voterInput, setVoterInput] = useState<string>('');
    const [alert, setAlert] = useState<{
        type: 'success' | 'error' | 'info' | null;
        message: string;
    }>({ type: null, message: '' });

    useEffect(() => {
        if (elections) {
            const now = Math.floor(Date.now() / 1000); // Current time in seconds
            const active = elections.filter(
                (election) => election.isActive && election.endTime > now
            );
            setActiveElections(active);
        }
    }, [elections]);

    const handleAddVoter = () => {
        const trimmedAddresses = voterInput
            .split(',')
            .map((address) => address.trim())
            .filter(
                (address) => address !== '' && !voterAddresses.includes(address)
            );

        setVoterAddresses([...voterAddresses, ...trimmedAddresses]);
        setVoterInput('');
    };

    const handleRemoveVoter = (address: string) => {
        setVoterAddresses(voterAddresses.filter((voter) => voter !== address));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedElectionId || voterAddresses.length === 0) {
            setAlert({
                type: 'error',
                message:
                    'Please select an election and add at least one voter address.',
            });
            return;
        }

        try {
            setAlert({ type: 'info', message: 'Transaction in progress...' });
            await registerMultipleVoters({
                electionId: Number(selectedElectionId),
                voters: voterAddresses,
            });
            setAlert({
                type: 'success',
                message: `Successfully registered ${voterAddresses.length} voters for election ID ${selectedElectionId}.`,
            });
            setSelectedElectionId('');
            setVoterAddresses([]);
        } catch (error: any) {
            setAlert({
                type: 'error',
                message:
                    error.message ||
                    registerError ||
                    'An unexpected error occurred.',
            });
        } finally {
            refetchElections();
        }
    };

    return (
        <main className='min-h-full h-full flex-grow bg-gray-100 flex items-center gap-6 justify-center'>
            <Box
                className='bg-white p-8 rounded-lg shadow-lg max-w-lg w-full'
                display='flex'
                flexDirection='column'
                alignItems='center'
            >
                <Typography variant='h4' gutterBottom color='primary'>
                    Register Multiple Voters
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

                    {/* Voter Addresses Input */}
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label='Voter Addresses'
                        placeholder='Enter voter addresses (comma-separated or press Enter for each address)'
                        variant='outlined'
                        value={voterInput}
                        onChange={(e) => setVoterInput(e.target.value)}
                        style={{ resize: 'vertical' }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddVoter();
                            }
                        }}
                        InputProps={{
                            style: { resize: 'vertical' }, // Allow vertical resizing
                        }}
                    />
                    <Box className='flex flex-wrap gap-2'>
                        {voterAddresses.map((address) => (
                            <Chip
                                key={address}
                                label={address}
                                onDelete={() => handleRemoveVoter(address)}
                                deleteIcon={<CloseIcon />}
                                color='primary'
                            />
                        ))}
                    </Box>

                    {/* Submit Button */}
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        disabled={
                            registering ||
                            !selectedElectionId ||
                            voterAddresses.length === 0
                        }
                    >
                        {registering ? (
                            <CircularProgress size={24} color='inherit' />
                        ) : (
                            'Register Voters'
                        )}
                    </Button>
                </form>
            </Box>
        </main>
    );
};

export default withAdminAuth(RegisterMultipleVotersPage);
