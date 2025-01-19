'use client';

import React, { useState } from 'react';
import { useCreateElection } from '@/hooks/useCreateElection';
import { withAdminAuth } from '@/context/withAdminAuth';
import { TextField, Button, Alert, Stack, Chip, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enGB } from 'date-fns/locale';
import { Close as CloseIcon } from '@mui/icons-material';

const CreateElectionPage: React.FC = () => {
    const { createElection, error: createError } = useCreateElection();
    const [name, setName] = useState('');
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [candidates, setCandidates] = useState<string[]>([]);
    const [candidateInput, setCandidateInput] = useState<string>('');
    const [alert, setAlert] = useState<{
        type: 'success' | 'error' | 'info' | null;
        message: string;
    }>({ type: null, message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!startTime || !endTime) {
            setAlert({
                type: 'error',
                message: 'Please select both start and end times.',
            });
            return;
        }

        const startTimestamp = Math.floor(startTime.getTime() / 1000);
        const endTimestamp = Math.floor(endTime.getTime() / 1000);

        if (startTimestamp >= endTimestamp) {
            setAlert({
                type: 'error',
                message: 'Start time must be earlier than end time.',
            });
            return;
        }

        if (candidates.length === 0) {
            setAlert({
                type: 'error',
                message: 'Please add at least one candidate.',
            });
            return;
        }

        try {
            setLoading(true);
            setAlert({
                type: 'info',
                message: 'Transaction is in progress...',
            });

            await createElection({
                name,
                startTime: startTimestamp,
                endTime: endTimestamp,
                candidates,
            });

            setAlert({
                type: 'success',
                message: 'Election created successfully!',
            });

            // Reset form
            setName('');
            setStartTime(null);
            setEndTime(null);
            setCandidates([]);
        } catch (err: unknown) {
            setAlert({
                type: 'error',
                message:
                    err instanceof Error
                        ? err.message || createError
                        : 'An unexpected error occurred.',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAddCandidate = () => {
        const trimmedCandidates = candidateInput
            .split(',')
            .map((candidate) => candidate.trim())
            .filter(
                (candidate) =>
                    candidate !== '' && !candidates.includes(candidate)
            );

        setCandidates([...candidates, ...trimmedCandidates]);
        setCandidateInput('');
    };

    const handleRemoveCandidate = (candidate: string) => {
        setCandidates(candidates.filter((c) => c !== candidate));
    };

    return (
        <main className='min-h-full h-full flex-grow bg-gray-100 flex items-center justify-center'>
            <div className='bg-white p-8 rounded-lg shadow-lg max-w-lg w-full'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
                    Create New Election
                </h2>

                {alert.type && (
                    <Alert
                        severity={alert.type}
                        className='mb-4'
                        onClose={() => setAlert({ type: null, message: '' })}
                    >
                        {alert.message}
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
                    <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        adapterLocale={enGB}
                    >
                        <Stack spacing={3}>
                            <DateTimePicker
                                label='Start Time'
                                value={startTime}
                                onChange={(newValue: Date | null) =>
                                    setStartTime(newValue)
                                }
                                slots={{ textField: TextField }}
                                slotProps={{
                                    textField: { fullWidth: true },
                                }}
                            />
                            <DateTimePicker
                                label='End Time'
                                value={endTime}
                                onChange={(newValue: Date | null) =>
                                    setEndTime(newValue)
                                }
                                slots={{ textField: TextField }}
                                slotProps={{
                                    textField: { fullWidth: true },
                                }}
                            />
                        </Stack>
                    </LocalizationProvider>

                    {/* Candidate Input */}
                    <Box>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label='Candidate Names'
                            placeholder='Enter candidate names (comma-separated or press Enter for each name)'
                            variant='outlined'
                            value={candidateInput}
                            onChange={(e) => setCandidateInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddCandidate();
                                }
                            }}
                            InputProps={{
                                style: { resize: 'vertical' }, // Allow vertical resizing
                            }}
                        />
                        <Box className='flex flex-wrap gap-2 mt-2'>
                            {candidates.map((candidate) => (
                                <Chip
                                    key={candidate}
                                    label={candidate}
                                    onDelete={() =>
                                        handleRemoveCandidate(candidate)
                                    }
                                    deleteIcon={<CloseIcon />}
                                    color='primary'
                                />
                            ))}
                        </Box>
                    </Box>

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
        </main>
    );
};

export default withAdminAuth(CreateElectionPage);
