'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetCandidates } from '@/hooks/useGetCandidates';
import { useVote } from '@/hooks/useVote';
import { useGetAllElections } from '@/hooks/useGetAllElections';
import { withUserAuth } from '@/context/withUserAuth';
import {
    Typography,
    Box,
    Button,
    Alert,
    CircularProgress,
    FormControl,
    Chip,
    Grid2,
} from '@mui/material';
import { format } from 'date-fns';

const VotePage: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const electionId = Number(params.electionId);

    const {
        candidates,
        loading: candidatesLoading,
        error: candidatesError,
    } = useGetCandidates(electionId);
    const { castVote, loading: voteLoading, error: voteError } = useVote();
    const {
        elections,
        loading: electionsLoading,
        error: electionsError,
    } = useGetAllElections();

    const [alert, setAlert] = useState<{
        type: 'success' | 'error' | 'info' | null;
        message: string;
    }>({ type: null, message: '' });

    const [selectedCandidateId, setSelectedCandidateId] = useState<
        number | null
    >(null);
    const [electionDetails, setElectionDetails] = useState<any>(null);

    useEffect(() => {
        if (elections) {
            const election = elections.find((e: any) => e.id === electionId);
            setElectionDetails(election);
        }
    }, [elections, electionId]);

    const formatTimestamp = (timestamp: number) => {
        return format(new Date(timestamp * 1000), 'dd/MM/yyyy HH:mm'); // 24-hour format
    };

    const handleVote = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedCandidateId === null) {
            setAlert({ type: 'error', message: 'Please select a candidate.' });
            return;
        }

        try {
            setAlert({ type: 'info', message: 'Submitting your vote...' });
            await castVote({ electionId, candidateId: selectedCandidateId });
            setAlert({
                type: 'success',
                message: 'Vote submitted successfully!',
            });
        } catch (error: any) {
            setAlert({
                type: 'error',
                message:
                    error.message ||
                    voteError ||
                    'An unexpected error occurred.',
            });
        }
    };

    return (
        <main className='min-h-full h-full flex-grow bg-gray-100 flex flex-col gap-6 items-center py-10'>
            <Box className='bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full flex flex-col gap-6'>
                <Typography variant='h4' color='primary' gutterBottom>
                    Vote in Election #{electionId} {electionDetails?.name}
                </Typography>

                {/* Display Alerts */}
                {alert?.type && (
                    <Alert
                        severity={alert?.type}
                        className='mb-4 w-full'
                        onClose={() => setAlert({ type: null, message: '' })}
                    >
                        {alert?.message}
                    </Alert>
                )}

                {/* Display election details */}
                {electionsLoading ? (
                    <CircularProgress color='primary' className='mb-4' />
                ) : electionsError ? (
                    <Alert severity='error' className='mb-4'>
                        {electionsError}
                    </Alert>
                ) : electionDetails ? (
                    <Box className='mb-6'>
                        <Typography variant='h6' color='textPrimary'>
                            <strong>Election Name:</strong>{' '}
                            {electionDetails?.name}
                        </Typography>
                        <Typography variant='body1' color='textSecondary'>
                            <strong>Start Time:</strong>{' '}
                            {formatTimestamp(electionDetails?.startTime)}
                        </Typography>
                        <Typography variant='body1' color='textSecondary'>
                            <strong>End Time:</strong>{' '}
                            {formatTimestamp(electionDetails?.endTime)}
                        </Typography>
                        <Chip
                            label={
                                electionDetails?.isActive
                                    ? 'Active'
                                    : 'Ended or Not Active'
                            }
                            color={
                                electionDetails?.isActive
                                    ? 'success'
                                    : 'default'
                            }
                            className='mt-2'
                        />
                    </Box>
                ) : (
                    <Alert severity='error' className='mb-4'>
                        Election details not found.
                    </Alert>
                )}

                {/* Candidates List */}
                {candidatesLoading ? (
                    <CircularProgress color='primary' className='mb-4' />
                ) : candidatesError ? (
                    <Alert severity='error' className='mb-4'>
                        {candidatesError}
                    </Alert>
                ) : (
                    <FormControl className='w-full mb-6'>
                        <Typography variant='h6' className='mb-2'>
                            Select a Candidate
                        </Typography>
                        <Grid2
                            container
                            spacing={2}
                            sx={{ flexWrap: 'wrap', gap: 2 }}
                        >
                            {candidates.map((cand, index) => (
                                <Grid2
                                    key={index}
                                    component='div'
                                    sx={{ flexBasis: 'calc(50% - 16px)' }}
                                >
                                    <Box
                                        className={`p-4 rounded-md border cursor-pointer ${
                                            selectedCandidateId === index
                                                ? 'bg-blue-100 border-blue-500'
                                                : 'bg-gray-50 hover:bg-gray-100'
                                        }`}
                                        onClick={() =>
                                            setSelectedCandidateId(index)
                                        }
                                    >
                                        <Typography
                                            variant='h6'
                                            color='primary'
                                            className='mb-1'
                                        >
                                            {cand}
                                        </Typography>
                                        <Typography
                                            variant='body2'
                                            color='textSecondary'
                                        >
                                            Candidate #{index + 1}
                                        </Typography>
                                    </Box>
                                </Grid2>
                            ))}
                        </Grid2>
                    </FormControl>
                )}

                {/* Submit Vote */}
                <form onSubmit={handleVote} className='w-full mt-6'>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        disabled={voteLoading || selectedCandidateId === null}
                    >
                        {voteLoading ? 'Submitting Vote...' : 'Submit Vote'}
                    </Button>
                </form>

                {/* Redirect to Voters Page */}
                <Button
                    variant='outlined'
                    color='primary'
                    className='mt-4'
                    fullWidth
                    onClick={() => router.push(`/voters/${electionId}`)}
                >
                    View Voters for This Election
                </Button>
            </Box>
        </main>
    );
};

export default withUserAuth(VotePage);
