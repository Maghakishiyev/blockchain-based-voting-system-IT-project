'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetElectionDetails } from '@/hooks/useGetElectionDetails';
import {
    CircularProgress,
    Alert,
    Typography,
    Box,
    Paper,
    Button,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { withUserAuth } from '@/context/withUserAuth';

const ResultsPage: React.FC = () => {
    const { electionId } = useParams();
    const router = useRouter();
    const electionIdNumber = parseInt(electionId as string, 10);

    const { details, loading, error, refetch } =
        useGetElectionDetails(electionIdNumber);

    const [chartData, setChartData] = useState<any>(null);
    const [alert, setAlert] = useState<{
        type: 'success' | 'error' | 'info' | null;
        message: string;
    }>({ type: null, message: '' });

    useEffect(() => {
        if (details) {
            const totalVotes = details.results.reduce(
                (sum, val) => sum + val,
                0
            );

            setChartData({
                labels: details.candidates,
                datasets: [
                    {
                        label: 'Votes',
                        data: details.results,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
                percentageData: details.results.map((votes) =>
                    totalVotes ? ((votes / totalVotes) * 100).toFixed(2) : 0
                ),
            });
        }
    }, [details]);

    const formatDateTime = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // 24-hour format
        });
    };

    const handleRefetch = async () => {
        try {
            setAlert({ type: 'info', message: 'Refreshing data...' });
            await refetch();
            setAlert({
                type: 'success',
                message: 'Data refreshed successfully!',
            });
        } catch {
            setAlert({ type: 'error', message: 'Failed to refresh data.' });
        }
    };

    return (
        <main className='min-h-screen bg-gray-100 py-10 flex flex-col items-center'>
            <Box className='w-full max-w-5xl px-4'>
                {/* Page Title */}
                <Typography
                    variant='h4'
                    color='primary'
                    className='text-center mb-6'
                >
                    Election Results
                </Typography>

                {/* Display Alerts */}
                {alert.type && (
                    <Alert
                        severity={alert.type}
                        className='mb-4 w-full'
                        onClose={() => setAlert({ type: null, message: '' })}
                    >
                        {alert.message}
                    </Alert>
                )}

                {/* Loading State */}
                {loading && (
                    <Box className='flex justify-center'>
                        <CircularProgress color='primary' />
                    </Box>
                )}

                {/* Error State */}
                {error && (
                    <Alert severity='error' className='mb-4'>
                        {error}
                    </Alert>
                )}

                {/* Election Details */}
                {!loading && !error && details && (
                    <Paper className='p-6 rounded-lg shadow-lg mb-6'>
                        <Typography
                            variant='h5'
                            className='mb-4'
                            color='textPrimary'
                        >
                            Election: {details.name}
                        </Typography>
                        <Typography variant='body1' color='textSecondary'>
                            <strong>Election ID:</strong> {electionId}
                        </Typography>
                        <Typography variant='body1' color='textSecondary'>
                            <strong>Start Time:</strong>{' '}
                            {formatDateTime(details.startTime)}
                        </Typography>
                        <Typography variant='body1' color='textSecondary'>
                            <strong>End Time:</strong>{' '}
                            {formatDateTime(details.endTime)}
                        </Typography>
                        <Typography
                            variant='body1'
                            color={details.isActive ? 'success.main' : 'error'}
                        >
                            <strong>Status:</strong>{' '}
                            {details.isActive ? 'Active' : 'Ended'}
                        </Typography>
                    </Paper>
                )}

                {/* Chart Section */}
                {chartData ? (
                    <Box className='p-6 rounded-lg shadow-lg bg-white mb-6'>
                        <Typography
                            variant='h5'
                            color='primary'
                            className='text-center mb-4'
                        >
                            Candidate Votes
                        </Typography>
                        <Bar
                            data={chartData}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        display: true,
                                        position: 'top',
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: (tooltipItem) => {
                                                const voteCount =
                                                    tooltipItem.raw as number;
                                                const percentage =
                                                    chartData.percentageData[
                                                        tooltipItem.dataIndex
                                                    ];
                                                return `${voteCount} votes (${percentage}%)`;
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                    </Box>
                ) : (
                    !loading && (
                        <Typography
                            variant='body1'
                            color='textSecondary'
                            className='text-center'
                        >
                            No results available for this election.
                        </Typography>
                    )
                )}

                {/* Voters Page Button */}
                {!loading && !error && (
                    <Box className='flex justify-center mt-6 gap-6'>
                        <Button
                            variant='outlined'
                            color='secondary'
                            onClick={() => router.push(`/voters/${electionId}`)}
                            className='mr-4'
                        >
                            View Voters
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={handleRefetch}
                        >
                            Refresh Data
                        </Button>
                    </Box>
                )}
            </Box>
        </main>
    );
};

export default withUserAuth(ResultsPage);
