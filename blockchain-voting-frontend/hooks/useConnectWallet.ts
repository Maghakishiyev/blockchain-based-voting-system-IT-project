// hooks/useConnectWallet.ts
'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import { UserStore } from '@/store/userStore';
import { BlockchainVoting } from '@/contracts/server';
import BlockchainVotingContract from '@/contracts/Abi/BlockchainVoting.json';

export function useConnectWallet() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const connectWallet = async () => {
        if (typeof window === 'undefined' || !(window as any).ethereum) {
            setError('No Ethereum wallet found. Please install MetaMask.');
            return;
        }

        try {
            setLoading(true);
            // Request account access from MetaMask
            await (window as any).ethereum.request({
                method: 'eth_requestAccounts',
            });

            const provider = new ethers.BrowserProvider(
                (window as any).ethereum
            );
            const signer = await provider.getSigner();
            const userAddr = await signer.getAddress();

            const contract = new ethers.Contract(
                process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '',
                BlockchainVotingContract.abi,
                signer
            ) as any as BlockchainVoting;

            const admin = await contract.admin();

            // Store in global state
            UserStore.setIsAdmin(
                userAddr.toLowerCase() === admin.toLowerCase()
            );
            UserStore.setProvider(provider);
            UserStore.setSigner(signer);
            UserStore.setContract(contract);
            UserStore.setAddress(userAddr);
            UserStore.setIsConnected(true);

            // Check if user is admin
        } catch (err: any) {
            console.error('Error connecting wallet:', err);
            setError(err.message || 'Failed to connect wallet.');
            throw err;
        } finally {
            setLoading(true);
        }
    };

    return {
        connectWallet,
        error,
        loading,
    };
}
