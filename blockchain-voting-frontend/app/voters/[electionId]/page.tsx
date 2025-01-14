// app/voters/[electionId]/page.tsx
'use client';

import React from 'react';
import { withAdminAuth } from '@/context/withAdminAuth';
import { useGetVoters } from '@/hooks/useGetVoters';
import { useParams } from 'next/navigation';
import {
    Typography,
    Button,
    Box,
    CircularProgress,
    Alert,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';

const VotersPage: React.FC = () => {
    const params = useParams();
    const electionId = Number(params.electionId);

    const { voters, loading, error, refetch } = useGetVoters(electionId);

    return (
        <main className='min-h-screen bg-gray-100 flex flex-col items-center py-10'>
            <Box
                className='bg-white p-8 rounded-lg shadow-lg max-w-lg w-full'
                display='flex'
                flexDirection='column'
                alignItems='center'
            >
                <Typography variant='h4' gutterBottom color='primary'>
                    Voters for Election {electionId}
                </Typography>

                {loading && (
                    <CircularProgress color='primary' className='mb-4' />
                )}
                {error && (
                    <Alert severity='error' className='mb-4'>
                        {error}
                    </Alert>
                )}

                <Button
                    variant='contained'
                    color='primary'
                    onClick={refetch}
                    className='mb-4'
                >
                    Refetch Voters
                </Button>

                {voters.length > 0 ? (
                    <List className='w-full'>
                        {voters.map((voter, index) => (
                            <ListItem key={index} className='border-b'>
                                <ListItemText primary={voter} />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    !loading && (
                        <Typography variant='body1' color='textSecondary'>
                            No voters found for this election.
                        </Typography>
                    )
                )}
            </Box>
        </main>
    );
};

export default withAdminAuth(VotersPage);
