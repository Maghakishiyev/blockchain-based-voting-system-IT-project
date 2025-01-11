import { ethers } from 'ethers';
import { BlockchainVoting } from '@/contracts/types/BlockchainVoting';
import contractJson from '@/contracts/Abi/BlockchainVoting.json'; // path to your compiled ABI

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

export async function getContract(): Promise<BlockchainVoting> {
    const provider = getProvider();
    const signer = await provider.getSigner();

    return new ethers.Contract(CONTRACT_ADDRESS, contractJson.abi, signer) as any as BlockchainVoting;
}
