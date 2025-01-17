'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetAllElections } from '@/hooks/useGetAllElections';
import { withUserAuth } from '@/context/withUserAuth';
import {
    Button,
    CircularProgress,
    Alert,
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
} from '@mui/material';
import { format } from 'date-fns';

const ElectionsPage: React.FC = () => {
    const { elections, loading, error, refetch } = useGetAllElections();
    const router = useRouter();
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const [alert, setAlert] = useState<{
        type: 'success' | 'error' | 'info' | null;
        message: string;
    }>({ type: null, message: '' });

    const formatTimestamp = (timestamp: number) => {
        // Use 24-hour time format
        return format(new Date(timestamp * 1000), 'dd/MM/yyyy HH:mm');
    };

    const handleRefetch = async () => {
        try {
            setAlert({ type: 'info', message: 'Refreshing data...' });
            await refetch();
            setAlert({
                type: 'success',
                message: 'Data refreshed successfully!',
            });
        } catch (err: any) {
            setAlert({
                type: 'error',
                message: err.message || error || 'Failed to refresh data.',
            });
        }
    };

    return (
        <main className='min-h-full h-full flex-grow bg-gray-100 flex flex-col items-center py-10 gap-6'>
            <h1 className='text-3xl font-semibold text-gray-800 mb-6'>
                All Elections
            </h1>

            {/* Display Alerts */}
            {alert.type && (
                <Alert
                    severity={alert.type}
                    className='mb-4 w-full max-w-4xl'
                    onClose={() => setAlert({ type: null, message: '' })}
                >
                    {alert.message}
                </Alert>
            )}

            {/* Loading State */}
            {loading && (
                <Box className='w-full max-w-4xl flex flex-col items-center justify-center gap-4'>
                    <Typography
                        variant='body1'
                        className='text-gray-600 text-center'
                    >
                        Loading elections...
                    </Typography>
                    <CircularProgress className='mx-auto block' />
                </Box>
            )}

            {/* Error State */}
            {error && (
                <Alert severity='error' className='w-full max-w-4xl'>
                    {error}
                </Alert>
            )}

            {/* Elections List */}
            {!loading && !error && (
                <>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleRefetch}
                        className='mb-6'
                    >
                        Refresh Elections
                    </Button>
                    <Grid container spacing={3} className='max-w-5xl'>
                        {elections.map((election) => {
                            const isEnded = election.endTime < currentTime;
                            const isActive = election.isActive && !isEnded;

                            return (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={election.id}
                                >
                                    <Card
                                        className={`shadow-lg transition-shadow duration-200 ${
                                            isEnded
                                                ? 'cursor-pointer hover:shadow-xl'
                                                : 'cursor-pointer hover:shadow-xl'
                                        }`}
                                        onClick={() => {
                                            if (isEnded) {
                                                router.push(
                                                    `/results/${election.id}`
                                                );
                                            } else {
                                                router.push(
                                                    `/vote/${election.id}`
                                                );
                                            }
                                        }}
                                    >
                                        <CardContent>
                                            <Typography
                                                variant='h6'
                                                color='primary'
                                                className='mb-2'
                                            >
                                                {election.name}
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                color='textSecondary'
                                            >
                                                <strong>Election ID:</strong>{' '}
                                                {election.id}
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                color='textSecondary'
                                            >
                                                <strong>Start Time:</strong>{' '}
                                                {formatTimestamp(
                                                    election.startTime
                                                )}
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                color='textSecondary'
                                            >
                                                <strong>End Time:</strong>{' '}
                                                {formatTimestamp(
                                                    election.endTime
                                                )}
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                color={
                                                    isActive
                                                        ? 'success.main'
                                                        : 'warning.main'
                                                }
                                                className='font-semibold mt-2'
                                            >
                                                <strong>
                                                    {isEnded
                                                        ? 'Election Ended'
                                                        : isActive
                                                        ? 'Currently Active'
                                                        : 'Not Active Yet'}
                                                </strong>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </>
            )}
        </main>
    );
};

export default withUserAuth(ElectionsPage);
