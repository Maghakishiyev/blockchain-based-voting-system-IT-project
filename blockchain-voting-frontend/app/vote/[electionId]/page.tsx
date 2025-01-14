// app/vote/[electionId]/page.tsx
'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useGetCandidates } from '@/hooks/useGetCandidates';
import { useVote } from '@/hooks/useVote';
import { withUserAuth } from '@/context/withUserAuth';
import {
    Typography,
    Box,
    Button,
    Alert,
    CircularProgress,
    TextField,
} from '@mui/material';

const VotePage: React.FC = () => {
    const params = useParams();
    const electionId = Number(params.electionId);

    const {
        candidates,
        loading: candidatesLoading,
        error: candidatesError,
    } = useGetCandidates(electionId);
    const { castVote, loading: voteLoading, error: voteError } = useVote();

    const [candidateId, setCandidateId] = useState<number>(0);

    const handleVote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (candidateId < 0 || candidateId >= candidates.length) {
            alert('Please select a valid candidate ID.');
            return;
        }
        await castVote({ electionId, candidateId });
    };

    return (
        <main className='min-h-screen bg-gray-100 flex flex-col gap-6 items-center py-10'>
            <Box
                className='bg-white p-8 rounded-lg shadow-lg max-w-lg w-full'
                display='flex'
                flexDirection='column'
                alignItems='center'
            >
                <Typography variant='h4' color='primary' gutterBottom>
                    Vote in Election {electionId}
                </Typography>

                {candidatesLoading && (
                    <CircularProgress color='primary' className='mb-4' />
                )}
                {candidatesError && (
                    <Alert severity='error' className='mb-4'>
                        {candidatesError}
                    </Alert>
                )}

                <Box className='w-full space-y-4 mb-6'>
                    {candidates.map((cand, index) => (
                        <Box
                            key={index}
                            className='p-4 border rounded-md shadow-sm bg-gray-50'
                        >
                            <Typography variant='body1' color='textPrimary'>
                                Candidate ID: {index} | Name: {cand}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                <form onSubmit={handleVote} className='w-full space-y-4'>
                    <TextField
                        fullWidth
                        label='Candidate ID'
                        type='number'
                        value={candidateId}
                        onChange={(e) => setCandidateId(Number(e.target.value))}
                        variant='outlined'
                    />
                    {voteError && (
                        <Alert severity='error' className='mb-4'>
                            {voteError}
                        </Alert>
                    )}
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        disabled={voteLoading}
                    >
                        {voteLoading ? 'Submitting Vote...' : 'Vote'}
                    </Button>
                </form>
            </Box>
        </main>
    );
};

export default withUserAuth(VotePage);
