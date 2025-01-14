'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import UserStore from '@/store/userStore';
import Link from 'next/link';
import { useGetAllElections } from '@/hooks/useGetAllElections';
import { Typography } from '@mui/material';

const Header: React.FC = () => {
    const { isConnected, isAdmin } = useSnapshot(UserStore.state);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [ongoingElections, setOngoingElections] = useState<any[]>([]);
    const [endedElections, setEndedElections] = useState<any[]>([]);

    const { elections, loading, error, refetch } = useGetAllElections();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (elections) {
            const now = Math.floor(Date.now() / 1000); // Current time in seconds

            // Separate ongoing and ended elections
            const ongoing = elections.filter(
                (election) => election.endTime >= now
            );
            const ended = elections.filter(
                (election) => election.endTime < now
            );

            setOngoingElections(ongoing);
            setEndedElections(ended);
        }
    }, [elections]);

    useEffect(() => {
        if (isConnected || isAdmin) {
            refetch();
        }
    }, [isConnected]);

    // Handle outside click
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const toggleDropdown = (dropdown: string) => {
        setActiveDropdown((current) =>
            current === dropdown ? null : dropdown
        );
    };

    return (
        <header className='bg-gray-900 text-white shadow-lg'>
            <nav className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>
                <Link href='/' className='text-2xl font-bold'>
                    Blockchain Voting
                </Link>
                <div className='flex items-center space-x-6' ref={dropdownRef}>
                    {/* Election Dropdown */}
                    <div className='relative'>
                        <button
                            className='hover:underline'
                            onClick={() => toggleDropdown('elections')}
                        >
                            Elections
                        </button>
                        {activeDropdown === 'elections' && (
                            <div className='absolute bg-white text-gray-900 mt-2 shadow-lg rounded-lg p-3 w-64 z-50 right-0'>
                                <Link
                                    key='all-elections'
                                    href='/elections'
                                    className='block px-4 py-2 hover:bg-gray-200 font-semibold'
                                >
                                    View all elections
                                </Link>
                                <h1 className='px-4 mt-2 font-bold text-gray-700 border-y py-1 border-gray-400'>
                                    Ongoing Elections
                                </h1>
                                {loading && (
                                    <p className='text-sm text-gray-600'>
                                        Loading...
                                    </p>
                                )}
                                {error && (
                                    <p className='text-sm text-red-600'>
                                        Error loading elections.
                                    </p>
                                )}
                                {ongoingElections.map((election) => (
                                    <Link
                                        key={election.id}
                                        href={`/vote/${election.id}`}
                                        className='block px-4 py-2 hover:bg-gray-200'
                                    >
                                        Vote in Election #{election.id}
                                    </Link>
                                ))}
                                <h1 className='px-4 mt-2 font-bold text-gray-700 border-y py-1 border-gray-400'>
                                    Ended Elections
                                </h1>
                                {endedElections.map((election) => (
                                    <Link
                                        key={election.id}
                                        href={`/results/${election.id}`}
                                        className='block px-4 py-2 hover:bg-gray-200'
                                    >
                                        View Results for Election #{election.id}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Voter Dropdown */}
                    <div className='relative'>
                        <button
                            className='hover:underline'
                            onClick={() => toggleDropdown('voters')}
                        >
                            Voter
                        </button>
                        {activeDropdown === 'voters' && (
                            <div className='absolute bg-white text-gray-900 mt-2 shadow-lg rounded-lg p-3 w-48 z-50 right-0'>
                                {loading && (
                                    <p className='text-sm text-gray-600'>
                                        Loading...
                                    </p>
                                )}
                                {error && (
                                    <p className='text-sm text-red-600'>
                                        Error loading voters.
                                    </p>
                                )}
                                {ongoingElections.map((election) => (
                                    <Link
                                        key={election.id}
                                        href={`/voters/${election.id}`}
                                        className='block px-4 py-2 hover:bg-gray-200'
                                    >
                                        View Voters (Election #{election.id})
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Admin Dropdown */}
                    {isAdmin && (
                        <div className='relative'>
                            <button
                                className='hover:underline'
                                onClick={() => toggleDropdown('admin')}
                            >
                                Admin
                            </button>
                            {activeDropdown === 'admin' && (
                                <div className='absolute bg-white text-gray-900 mt-2 shadow-lg rounded-lg p-3 w-48 z-50 right-0'>
                                    <Link
                                        href='/create-election'
                                        className='block px-4 py-2 hover:bg-gray-200'
                                    >
                                        Create Election
                                    </Link>
                                    <Link
                                        href='/end-election'
                                        className='block px-4 py-2 hover:bg-gray-200'
                                    >
                                        End Election
                                    </Link>
                                    <Link
                                        href='/register-voter'
                                        className='block px-4 py-2 hover:bg-gray-200'
                                    >
                                        Register Voter
                                    </Link>
                                    <Link
                                        href='/register-voters'
                                        className='block px-4 py-2 hover:bg-gray-200'
                                    >
                                        Register Multiple Voters
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Login/Logout */}
                    {!isConnected ? (
                        <Link
                            href='/login'
                            className='text-white hover:underline'
                        >
                            Login
                        </Link>
                    ) : (
                        <button
                            onClick={() => UserStore.reset()}
                            className='text-white hover:underline'
                        >
                            Logout
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
