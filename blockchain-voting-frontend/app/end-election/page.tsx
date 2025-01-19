'use client';

import React, { useEffect, useState } from 'react';
import { withAdminAuth } from '@/context/withAdminAuth';
import { useEndElection } from '@/hooks/useEndElection';
import { useGetPaginatedElections } from '@/hooks/useGetPaginatedElections';
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
    Box,
    Pagination,
} from '@mui/material';

const EndElectionPage: React.FC = () => {
    const {
        endElection,
        loading: endingLoading,
        error: endingError,
    } = useEndElection();
    const {
        elections,
        totalElections,
        loading: electionsLoading,
        error: electionsError,
        fetchElections,
    } = useGetPaginatedElections();

    const [selectedElection, setSelectedElection] = useState<number | null>(
        null
    );
    const [alert, setAlert] = useState<{
        type: 'success' | 'error' | 'info' | null;
        message: string;
    }>({ type: null, message: '' });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        // Fetch active elections with pagination
        fetchElections((currentPage - 1) * itemsPerPage, itemsPerPage, 1); // FilterState: 1 for active elections
    }, [currentPage]);

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
            fetchElections((currentPage - 1) * itemsPerPage, itemsPerPage, 1); // Refetch active elections
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

                    {/* Display Alerts */}
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

                    {/* Loading State */}
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
                                    disabled={elections.length === 0}
                                >
                                    {elections.length > 0 ? (
                                        elections.map((election) => (
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

                            {elections.length === 0 && (
                                <Alert severity='info'>
                                    No active elections are available to end at
                                    the moment.
                                </Alert>
                            )}

                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                fullWidth
                                disabled={
                                    endingLoading ||
                                    elections.length === 0 ||
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

                    {/* Pagination */}
                    {totalElections > itemsPerPage && (
                        <Box className='flex justify-center mt-4'>
                            <Pagination
                                count={Math.ceil(totalElections / itemsPerPage)}
                                page={currentPage}
                                onChange={(_, page) => setCurrentPage(page)}
                                color='primary'
                            />
                        </Box>
                    )}
                </CardContent>
            </Card>
        </main>
    );
};

export default withAdminAuth(EndElectionPage);
