import { ethers } from 'ethers';
import type { Contract } from 'ethers';
// If you have a generated type from TypeChain, you can import it here, e.g.:
// import type { VotingContract } from '@/lib/types';
import contractJson from '@/contracts/BlockchainVoting.json'; // path to your compiled ABI

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';

export function getProvider() {
    if (typeof window === 'undefined') {
        throw new Error(
            'No window object. Make sure you are in the browser context.'
        );
    }

    // MetaMask injection
    const { ethereum } = window as any;
    if (!ethereum) {
        throw new Error('No MetaMask found. Please install it!');
    }

    return new ethers.BrowserProvider(ethereum);
}

export async function getContract(): Promise<Contract> {
    const provider = getProvider();
    const signer = await provider.getSigner();

    // If you have a type from TypeChain:
    // return new ethers.Contract(CONTRACT_ADDRESS, votingAbi, signer) as VotingContract;
    return new ethers.Contract(CONTRACT_ADDRESS, contractJson.abi, signer);
}
