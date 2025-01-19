'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetPaginatedElections } from '@/hooks/useGetPaginatedElections';
import {
    CircularProgress,
    Alert,
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
    Tabs,
    Tab,
    TextField,
    Pagination,
} from '@mui/material';
import { format } from 'date-fns';
import { withUserAuth } from '@/context/withUserAuth';

const electionsPerPage = 12;

const ElectionsPage: React.FC = () => {
    const router = useRouter();
    const { elections, totalElections, loading, error, fetchElections } =
        useGetPaginatedElections();

    const [filterState, setFilterState] = useState(0); // 0 = All, 1 = Active, 2 = Finished
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const offset = (currentPage - 1) * electionsPerPage;
        fetchElections(offset, electionsPerPage, filterState);
    }, [currentPage, filterState]);

    const formatTimestamp = (timestamp: number) => {
        return format(new Date(timestamp * 1000), 'dd/MM/yyyy HH:mm'); // 24-hour format
    };

    const handleSearch = () => {
        const filtered = elections.filter(
            (election) =>
                election.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                String(election.id).includes(searchTerm)
        );
        return filtered;
    };

    const paginatedElections = handleSearch();

    return (
        <main className='min-h-full h-full flex-grow bg-gray-100 flex flex-col items-center py-10 gap-6'>
            <Box className='w-full max-w-5xl flex flex-col items-center gap-6'>
                {/* Page Title */}
                <Typography variant='h4' className='text-center mb-4'>
                    Elections
                </Typography>

                {/* Tabs and Search Bar */}
                <Box className='w-full flex justify-between items-center mb-4'>
                    <Tabs
                        value={filterState}
                        onChange={(e, newValue) => {
                            setCurrentPage(1);
                            setFilterState(newValue);
                        }}
                    >
                        <Tab label='All' />
                        <Tab label='Active' />
                        <Tab label='Finished' />
                    </Tabs>
                    <TextField
                        label='Search by Name or ID'
                        variant='outlined'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='w-64'
                    />
                </Box>

                {/* Alerts */}
                {error && (
                    <Alert severity='error' className='w-full'>
                        {error}
                    </Alert>
                )}

                {/* Loading Indicator */}
                {loading ? (
                    <Box className='w-full flex flex-col items-center gap-4'>
                        <Typography>Loading elections...</Typography>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {paginatedElections.map((election) => {
                            const isEnded =
                                election.endTime < Date.now() / 1000;
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
                                        className='shadow-lg hover:shadow-xl transition-shadow duration-200'
                                        onClick={() =>
                                            router.push(
                                                isEnded
                                                    ? `/results/${election.id}`
                                                    : `/vote/${election.id}`
                                            )
                                        }
                                    >
                                        <CardContent>
                                            <Typography
                                                variant='h6'
                                                color='primary'
                                                className='mb-2'
                                            >
                                                {election.name}
                                            </Typography>
                                            <Typography variant='body2'>
                                                <strong>ID:</strong>{' '}
                                                {election.id}
                                            </Typography>
                                            <Typography variant='body2'>
                                                <strong>Start:</strong>{' '}
                                                {formatTimestamp(
                                                    election.startTime
                                                )}
                                            </Typography>
                                            <Typography variant='body2'>
                                                <strong>End:</strong>{' '}
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
                                                {isEnded
                                                    ? 'Ended'
                                                    : isActive
                                                    ? 'Active'
                                                    : 'Not Started'}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                )}

                {/* Pagination */}
                {totalElections > 0 && (
                    <Pagination
                        count={Math.ceil(totalElections / electionsPerPage)}
                        page={currentPage}
                        onChange={(e, value) => setCurrentPage(value)}
                        className='mt-4'
                    />
                )}
            </Box>
        </main>
    );
};

export default withUserAuth(ElectionsPage);
