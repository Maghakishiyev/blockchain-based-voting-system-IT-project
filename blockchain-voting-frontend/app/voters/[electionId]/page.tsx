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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

const VotersPage: React.FC = () => {
    const params = useParams();
    const electionId = Number(params.electionId);

    const { voters, loading, error, refetch } = useGetVoters(electionId);

    return (
        <main className="min-h-full h-full flex-grow bg-gray-100 flex flex-col items-center py-10 gap-6">
            <Box className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
                <Typography variant="h4" gutterBottom color="primary" align="center">
                    Voters for Election #{electionId}
                </Typography>

                {/* Alerts */}
                {loading && (
                    <Alert severity="info" className="mb-4">
                        Fetching voters data...
                    </Alert>
                )}
                {error && (
                    <Alert severity="error" className="mb-4">
                        {error}
                    </Alert>
                )}

                {/* Refetch Button */}
                <Box display="flex" justifyContent="center" className="mb-4">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={refetch}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Refetch Voters'}
                    </Button>
                </Box>

                {/* Voters Table */}
                {voters.length > 0 ? (
                    <TableContainer component={Paper} className="mt-4">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">#</TableCell>
                                    <TableCell align="left">Voter Address</TableCell>
                                    <TableCell align="center">Registered</TableCell>
                                    <TableCell align="center">Voted</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {voters.map((voter, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell align="left">{voter.address}</TableCell>
                                        <TableCell align="center">
                                            {voter.isRegistered ? 'Yes' : 'No'}
                                        </TableCell>
                                        <TableCell align="center">
                                            {voter.hasVoted ? 'Yes' : 'No'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    !loading && (
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            align="center"
                            className="mt-4"
                        >
                            No voters found for this election.
                        </Typography>
                    )
                )}
            </Box>
        </main>
    );
};

export default withAdminAuth(VotersPage);
