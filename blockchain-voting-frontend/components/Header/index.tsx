'use client';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import BlockchainVotingContract from '@/contracts/BlockchainVoting.json';

const Header: React.FC = () => {
    const [userAddress, setUserAddress] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const initContractAndCheckOwner = async () => {
            if (typeof window !== 'undefined' && (window as any).ethereum) {
                try {
                    const provider = new ethers.BrowserProvider(
                        (window as any).ethereum
                    );
                    const signer = await provider.getSigner();
                    const userAddr = await signer.getAddress();
                    setUserAddress(userAddr);

                    const votingContract = new ethers.Contract(
                        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '',
                        BlockchainVotingContract.abi,
                        signer
                    );

                    const admin = await votingContract.admin();
                    if (userAddr.toLowerCase() === admin.toLowerCase()) {
                        setIsAdmin(true);
                    }
                } catch (error) {
                    console.error(
                        'Error initializing contract or checking owner:',
                        error
                    );
                }
            } else {
                console.log('Ethereum provider not found');
            }
        };

        initContractAndCheckOwner();
    }, []);

    return (
        <header>
            <nav className='bg-grey-30 bg-transparent'>
                <ul>
                    <li>
                        <a href='/'>Home</a>
                    </li>
                    {/* Example links for your new pages */}
                    <li>
                        <a href='/elections'>Elections</a>
                    </li>
                    <li>
                        <a href='/register-voter'>Register Voter</a>
                    </li>
                    {/* Dynamic route examples (with a dummy electionId = 1) */}
                    <li>
                        <a href='/voters/1'>View Voters (Election #1)</a>
                    </li>
                    <li>
                        <a href='/vote/1'>Vote (Election #1)</a>
                    </li>
                    {isAdmin && (
                        <li>
                            <a href='/create-election'>Admin</a>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
