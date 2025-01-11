'use client';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import BlockchainVotingContract from '@/contracts/Abi/BlockchainVoting.json';
import { BlockchainVoting } from '@/contracts/types';
import { useSnapshot } from 'valtio';
import UserStore from '@/store/userStore';
import Link from 'next/link';

const Header: React.FC = () => {
    const { address, isConnected, isAdmin } = useSnapshot(UserStore.state);
    const [showAdminDropdown, setShowAdminDropdown] = useState(false);
    const [showElectionDropdown, setShowElectionDropdown] = useState(false);
    const [showVoterDropdown, setShowVoterDropdown] = useState(false);

    useEffect(() => {
        const initContractAndCheckOwner = async () => {
            if (typeof window !== 'undefined' && (window as any).ethereum) {
                try {
                    const provider = new ethers.BrowserProvider(
                        (window as any).ethereum
                    );
                    const signer = await provider.getSigner();
                    const userAddr = await signer.getAddress();
                    UserStore.setAddress(userAddr);
                    UserStore.setIsConnected(true);

                    const votingContract = new ethers.Contract(
                        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '',
                        BlockchainVotingContract.abi,
                        signer
                    ) as any as BlockchainVoting;

                    const admin = await votingContract.admin();
                    if (userAddr.toLowerCase() === admin.toLowerCase()) {
                        UserStore.setIsAdmin(true);
                    }
                } catch (error) {
                    console.error(
                        'Error initializing contract or checking owner:',
                        error
                    );
                }
            }
        };

        initContractAndCheckOwner();
    }, []);

    return (
        <header className='bg-gray-900 text-white shadow-lg'>
            <nav className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>
                <Link href='/' className='text-2xl font-bold'>
                    Blockchain Voting
                </Link>
                <div className='flex items-center space-x-6'>
                    {/* Election Dropdown */}
                    <div className='relative'>
                        <button
                            className='hover:underline'
                            onClick={() =>
                                setShowElectionDropdown(!showElectionDropdown)
                            }
                        >
                            Elections
                        </button>
                        {showElectionDropdown && (
                            <div className='absolute bg-white text-gray-900 mt-2 shadow-lg rounded-lg p-3'>
                                <Link
                                    href='/elections'
                                    className='block px-4 py-2 hover:bg-gray-200'
                                >
                                    View All Elections
                                </Link>
                                <Link
                                    href='/vote/1'
                                    className='block px-4 py-2 hover:bg-gray-200'
                                >
                                    Vote in Election #1
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Voter Dropdown */}
                    <div className='relative'>
                        <button
                            className='hover:underline'
                            onClick={() =>
                                setShowVoterDropdown(!showVoterDropdown)
                            }
                        >
                            Voter
                        </button>
                        {showVoterDropdown && (
                            <div className='absolute bg-white text-gray-900 mt-2 shadow-lg rounded-lg p-3'>
                                <Link
                                    href='/voters/1'
                                    className='block px-4 py-2 hover:bg-gray-200'
                                >
                                    View Voters (Election #1)
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Admin Dropdown */}
                    {isAdmin && (
                        <div className='relative'>
                            <button
                                className='hover:underline'
                                onClick={() =>
                                    setShowAdminDropdown(!showAdminDropdown)
                                }
                            >
                                Admin
                            </button>
                            {showAdminDropdown && (
                                <div className='absolute bg-white text-gray-900 mt-2 shadow-lg rounded-lg p-3'>
                                    <Link
                                        href='/create-election'
                                        className='block px-4 py-2 hover:bg-gray-200'
                                    >
                                        Create Election
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
