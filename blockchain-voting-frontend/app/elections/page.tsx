'use client';

import React from 'react';
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
} from '@mui/material';

const ElectionsPage: React.FC = () => {
    const { elections, loading, error, refetch } = useGetAllElections();
    const router = useRouter();
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    if (loading) {
        return (
            <main className='min-h-screen bg-gray-100 flex items-center justify-center'>
                <CircularProgress />
            </main>
        );
    }

    if (error) {
        return (
            <main className='min-h-screen bg-gray-100 flex items-center justify-center'>
                <Alert severity='error'>{error}</Alert>
            </main>
        );
    }

    return (
        <main className='min-h-screen bg-gray-100 flex flex-col items-center py-10 gap-6'>
            <h1 className='text-3xl font-semibold text-gray-800 mb-6'>
                All Elections
            </h1>
            <Button
                variant='contained'
                color='primary'
                onClick={refetch}
                className='mb-6'
            >
                Refetch
            </Button>
            <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl'>
                {elections.map((election) => {
                    const isEnded = election.endTime < currentTime;
                    const isActive = election.isActive && !isEnded;

                    return (
                        <Card
                            key={election.id}
                            className={`shadow-lg transition-shadow duration-200 ${
                                isEnded
                                    ? 'cursor-pointer hover:shadow-xl'
                                    : 'cursor-pointer hover:shadow-xl'
                            }`}
                            onClick={() => {
                                if (isEnded) {
                                    router.push(`/results/${election.id}`);
                                } else {
                                    router.push(`/vote/${election.id}`);
                                }
                            }}
                        >
                            <CardContent>
                                <Typography variant='h6' color='primary'>
                                    {election.name}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='textSecondary'
                                >
                                    ID: {election.id}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='textSecondary'
                                >
                                    Start Time: {election.startTime}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='textSecondary'
                                >
                                    End Time: {election.endTime}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color={
                                        isActive ? 'success.main' : 'warning.main'
                                    }
                                    className='font-semibold mt-2'
                                >
                                    {isEnded
                                        ? 'Election Ended'
                                        : isActive
                                        ? 'Currently Active'
                                        : 'Not Active'}
                                </Typography>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </main>
    );
};

export default withUserAuth(ElectionsPage);
