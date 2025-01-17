'use client';

import React, { useEffect, useState } from 'react';
import { withAdminAuth } from '@/context/withAdminAuth';
import { useEndElection } from '@/hooks/useEndElection';
import { useGetAllElections } from '@/hooks/useGetAllElections';
import {
    Button,
    CircularProgress,
    Alert,
    Typography,
    Card,
    CardContent,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';

const EndElectionPage: React.FC = () => {
    const {
        endElection,
        loading: endingLoading,
        error: endingError,
    } = useEndElection();
    const {
        elections,
        loading: electionsLoading,
        error: electionsError,
        refetch,
    } = useGetAllElections();

    const [filteredElections, setFilteredElections] = useState<any[]>([]);
    const [selectedElection, setSelectedElection] = useState<number | null>(
        null
    );
    const [alert, setAlert] = useState<{
        type: 'success' | 'error' | 'info' | null;
        message: string;
    }>({ type: null, message: '' });

    // Filter elections with a past end date
    useEffect(() => {
        if (elections) {
            const now = Math.floor(Date.now() / 1000); // Current time in seconds
            const pastElections = elections.filter(
                (election) => election.endTime < now && election.isActive
            );
            setFilteredElections(pastElections);
        }
    }, [elections]);

    const handleEndElection = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedElection) {
            setAlert({
                type: 'error',
                message: 'Please select an election to end.',
            });
            return;
        }

        try {
            setAlert({ type: 'info', message: 'Transaction in progress...' });
            await endElection(selectedElection);
            setAlert({
                type: 'success',
                message: `Election #${selectedElection} has been successfully ended.`,
            });
            setSelectedElection(null); // Clear selection
            refetch();
        } catch (error: any) {
            setAlert({
                type: 'error',
                message:
                    error.message ||
                    endingError ||
                    'An unexpected error occurred.',
            });
        }
    };

    return (
        <main className='min-h-full h-full flex-grow bg-gray-100 flex flex-col items-center py-10 gap-6'>
            <Card className='shadow-lg max-w-xl w-full'>
                <CardContent>
                    <Typography
                        variant='h5'
                        color='primary'
                        className='text-center mb-6'
                    >
                        End an Election
                    </Typography>

                    {alert.type && (
                        <Alert
                            severity={alert.type}
                            className='mb-4'
                            onClose={() =>
                                setAlert({ type: null, message: '' })
                            }
                        >
                            {alert.message}
                        </Alert>
                    )}

                    {electionsLoading ? (
                        <div className='flex justify-center'>
                            <CircularProgress />
                        </div>
                    ) : electionsError ? (
                        <Alert severity='error'>{electionsError}</Alert>
                    ) : (
                        <form
                            onSubmit={handleEndElection}
                            className='flex flex-col gap-4'
                        >
                            <FormControl fullWidth>
                                <InputLabel id='select-election-label'>
                                    Select Election
                                </InputLabel>
                                <Select
                                    labelId='select-election-label'
                                    value={selectedElection || ''}
                                    onChange={(e) =>
                                        setSelectedElection(
                                            Number(e.target.value)
                                        )
                                    }
                                    disabled={filteredElections.length === 0}
                                >
                                    {filteredElections.length > 0 ? (
                                        filteredElections.map((election) => (
                                            <MenuItem
                                                key={election.id}
                                                value={election.id}
                                            >
                                                {election.name} (ID:{' '}
                                                {election.id})
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>
                                            No elections available to end.
                                        </MenuItem>
                                    )}
                                </Select>
                            </FormControl>

                            {filteredElections.length === 0 && (
                                <Alert severity='info'>
                                    No elections are available to end at the
                                    moment.
                                </Alert>
                            )}

                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                fullWidth
                                disabled={
                                    endingLoading ||
                                    filteredElections.length === 0 ||
                                    !selectedElection
                                }
                            >
                                {endingLoading ? (
                                    <CircularProgress
                                        size={24}
                                        color='inherit'
                                    />
                                ) : (
                                    'End Election'
                                )}
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </main>
    );
};

export default withAdminAuth(EndElectionPage);
