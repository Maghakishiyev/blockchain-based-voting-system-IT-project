// components/Footer.tsx
'use client';

import React from 'react';
import { Typography, Box, Link, Divider } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <footer className='bg-gray-900 text-gray-300 py-8'>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                className='max-w-6xl mx-auto px-4 text-center'
            >
                {/* Branding */}
                <Typography variant='h5' className='text-primary' gutterBottom>
                    Blockchain Voting System
                </Typography>
                <Typography
                    variant='body2'
                    className='max-w-2xl mb-4 text-textSecondary'
                >
                    Empowering transparent, secure, and tamper-proof elections
                    using cutting-edge blockchain technology. Your vote, your
                    voice.
                </Typography>

                {/* Links */}
                <Box className='flex justify-center gap-8 mb-4'>
                    <Link href='/' color='inherit' underline='hover'>
                        Home
                    </Link>
                    <Link href='/about' color='inherit' underline='hover'>
                        About
                    </Link>
                    <Link href='/elections' color='inherit' underline='hover'>
                        Elections
                    </Link>
                    <Link href='/contact' color='inherit' underline='hover'>
                        Contact
                    </Link>
                </Box>

                <Divider className='w-full max-w-4xl my-4' />

                {/* Social Media & Contact */}
                <Box className='flex flex-col items-center gap-2'>
                    <Typography variant='body2' className='text-textSecondary'>
                        Follow us on:
                    </Typography>
                    <Box className='flex gap-4'>
                        <Link href='#' color='inherit' aria-label='Twitter'>
                            <i className='fab fa-twitter text-xl'></i>
                        </Link>
                        <Link href='#' color='inherit' aria-label='Facebook'>
                            <i className='fab fa-facebook text-xl'></i>
                        </Link>
                        <Link href='#' color='inherit' aria-label='LinkedIn'>
                            <i className='fab fa-linkedin text-xl'></i>
                        </Link>
                        <Link href='#' color='inherit' aria-label='GitHub'>
                            <i className='fab fa-github text-xl'></i>
                        </Link>
                    </Box>
                </Box>

                {/* Contact Info */}
                <Typography variant='body2' className='mt-4 text-textSecondary'>
                    For inquiries:{' '}
                    <Link href='mailto:support@blockvoting.com' color='inherit'>
                        support@blockvoting.com
                    </Link>
                </Typography>

                {/* Copyright */}
                <Typography variant='body2' className='mt-4 text-textSecondary'>
                    &copy; {new Date().getFullYear()} Blockchain Voting System.
                    All rights reserved.
                </Typography>
            </Box>
        </footer>
    );
};

export default Footer;
