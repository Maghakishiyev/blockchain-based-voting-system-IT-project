'use client';

import React from 'react';
import { Typography, Box, Button } from '@mui/material';

const HomePageClient: React.FC = () => {
    return (
        <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10'>
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
                    Blockchain Based Voting System
                </Typography>
                <Typography
                    variant='body1'
                    color='textSecondary'
                    className='text-center leading-relaxed'
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Excepturi aspernatur ipsum perferendis consequuntur iure non
                    nihil assumenda, repudiandae saepe! At accusamus excepturi
                    sit? Repellat, voluptates. Aut error saepe officiis
                    voluptatibus culpa vero ex quod nesciunt ipsum sequi,
                    inventore esse, deserunt, obcaecati eum voluptate velit
                    accusantium illum voluptas recusandae vitae quam?
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quibusdam cupiditate odio a culpa dolor earum repellat eos
                    fugiat in incidunt.
                </Typography>
            </Box>

            <Typography
                variant='body1'
                color='textSecondary'
                className='text-center mt-6'
            >
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum
                ullam omnis soluta quas sint alias!
            </Typography>

            <Button
                variant='contained'
                color='primary'
                href='/voting'
                className='mt-8'
            >
                Go to Voting Page
            </Button>
        </div>
    );
};

export default HomePageClient;
