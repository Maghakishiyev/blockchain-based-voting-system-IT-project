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
    } = useGetAllElections();

    const [filteredElections, setFilteredElections] = useState<any[]>([]);
    const [selectedElection, setSelectedElection] = useState<number | null>(
        null
    );
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
            setSuccessMessage(null);
            return;
        }

        try {
            await endElection(selectedElection);
            setSuccessMessage(
                `Election #${selectedElection} has been successfully ended.`
            );
            setSelectedElection(null); // Clear selection
        } catch {
            setSuccessMessage(null); // Clear success message on failure
        }
    };

    return (
        <main className='min-h-screen bg-gray-100 flex flex-col items-center py-10 gap-6'>
            <Card className='shadow-lg max-w-xl w-full'>
                <CardContent>
                    <Typography
                        variant='h5'
                        color='primary'
                        className='text-center mb-6'
                    >
                        End an Election
                    </Typography>
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
                                >
                                    {filteredElections.map((election) => (
                                        <MenuItem
                                            key={election.id}
                                            value={election.id}
                                        >
                                            {election.name} (ID: {election.id})
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {filteredElections.length === 0 && (
                                <Typography
                                    variant='body2'
                                    color='textSecondary'
                                    className='text-center'
                                >
                                    No past elections available to end.
                                </Typography>
                            )}
                            {endingError && (
                                <Alert severity='error'>{endingError}</Alert>
                            )}
                            {successMessage && (
                                <Alert severity='success'>
                                    {successMessage}
                                </Alert>
                            )}
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                disabled={endingLoading || !selectedElection}
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
