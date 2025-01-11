// app/elections/page.tsx
'use client';

import React from 'react';
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

    if (loading) {
        return (
            <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
                <Alert severity='error'>{error}</Alert>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gray-100 flex flex-col items-center py-10'>
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
                {elections.map((election) => (
                    <Card key={election.id} className='shadow-lg'>
                        <CardContent>
                            <Typography variant='h6' color='primary'>
                                {election.name}
                            </Typography>
                            <Typography variant='body2' color='textSecondary'>
                                ID: {election.id}
                            </Typography>
                            <Typography variant='body2' color='textSecondary'>
                                Start Time: {election.startTime}
                            </Typography>
                            <Typography variant='body2' color='textSecondary'>
                                End Time: {election.endTime}
                            </Typography>
                            <Typography variant='body2' color='textSecondary'>
                                Active: {election.isActive ? 'Yes' : 'No'}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default withUserAuth(ElectionsPage);
