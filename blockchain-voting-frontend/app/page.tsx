'use client';

import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { withUserAuth } from '@/context/withUserAuth';

const HomePage: React.FC = () => {
    return (
        <main className='min-h-screen bg-gray-100 flex flex-col items-center gap-8 justify-center py-10'>
            <Box
                className='bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-3xl w-full'
                display='flex'
                flexDirection='column'
                alignItems='center'
            >
                <Typography
                    variant='h3'
                    color='primary'
                    className='text-center mb-6'
                >
                    Blockchain-Based Voting System
                </Typography>

                <Typography
                    variant='body1'
                    color='textSecondary'
                    className='text-center leading-relaxed'
                >
                    Welcome to the Blockchain-Based Voting System, where we
                    redefine the way elections are conducted. By leveraging the
                    power of blockchain technology, we ensure transparency,
                    security, and immutability for every vote cast. Say goodbye
                    to outdated, error-prone methods, and embrace a new era of
                    trust and efficiency.
                </Typography>

                {/* Separate the list into its own container */}
                <Box className='mt-4'>
                    <Typography variant='body1' color='textSecondary'>
                        Our platform guarantees:
                    </Typography>
                    <ul className='list-disc list-inside text-gray-600 mt-2'>
                        <li>
                            <strong>Transparency:</strong> Every vote is
                            publicly recorded on an immutable ledger.
                        </li>
                        <li>
                            <strong>Security:</strong> Advanced cryptographic
                            techniques protect voter identities and data.
                        </li>
                        <li>
                            <strong>Accessibility:</strong> Participate in
                            elections from anywhere, anytime.
                        </li>
                        <li>
                            <strong>Trust:</strong> Eliminate fraud and ensure
                            the integrity of the electoral process.
                        </li>
                    </ul>
                </Box>

                <Typography
                    variant='body1'
                    color='textSecondary'
                    className='text-center mt-4'
                >
                    Join us as we transform democracy with cutting-edge
                    technology. Together, we build a future where every voice is
                    heard and every vote truly counts.
                </Typography>
            </Box>

            <Typography
                variant='body1'
                color='textSecondary'
                className='text-center mt-6'
            >
                Ready to make a difference? Explore ongoing elections and
                participate in shaping the future of governance.
            </Typography>

            <Button
                variant='contained'
                color='primary'
                href='/elections'
                className='mt-8'
            >
                Go to Voting Page
            </Button>
        </main>
    );
};

export default withUserAuth(HomePage);
