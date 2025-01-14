'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useGetElectionDetails } from '@/hooks/useGetElectionDetails';
import { CircularProgress, Alert, Typography, Box, Paper } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { withUserAuth } from '@/context/withUserAuth';

const ResultsPage: React.FC = () => {
    const { electionId } = useParams();
    const electionIdNumber = parseInt(electionId as string, 10);

    const { details, loading, error, refetch } =
        useGetElectionDetails(electionIdNumber);

    const [chartData, setChartData] = useState<any>(null);

    useEffect(() => {
        if (details) {
            const totalVotes = details.results.reduce(
                (sum, val) => sum + val,
                0
            );

            // Prepare chart data
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

    if (!details) {
        return (
            <main className='min-h-screen bg-gray-100 flex items-center justify-center'>
                <Typography variant='h5' color='textSecondary'>
                    No election details found.
                </Typography>
            </main>
        );
    }

    return (
        <main className='min-h-screen bg-gray-100 py-10'>
            <Paper className='max-w-4xl mx-auto p-8 rounded-lg shadow-lg'>
                <Typography
                    variant='h4'
                    color='primary'
                    className='text-center mb-6'
                >
                    Election Results: {details.name}
                </Typography>
                <Box className='mb-6'>
                    <Typography variant='h6'>
                        Election ID: {electionId}
                    </Typography>
                    <Typography variant='body1'>
                        Start Time:{' '}
                        {new Date(details.startTime * 1000).toLocaleString()}
                    </Typography>
                    <Typography variant='body1'>
                        End Time:{' '}
                        {new Date(details.endTime * 1000).toLocaleString()}
                    </Typography>
                    <Typography variant='body1'>
                        Status:{' '}
                        <strong
                            style={{
                                color: details.isActive ? 'green' : 'red',
                            }}
                        >
                            {details.isActive ? 'Active' : 'Ended'}
                        </strong>
                    </Typography>
                </Box>

                <Typography
                    variant='h5'
                    color='primary'
                    className='text-center mb-4'
                >
                    Candidate Votes
                </Typography>
                {chartData ? (
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
                ) : (
                    <Typography className='text-center'>
                        No results available for this election.
                    </Typography>
                )}
            </Paper>
        </main>
    );
};

export default withUserAuth(ResultsPage);
