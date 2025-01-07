import { ethers } from 'ethers';
import abi from '@/contracts/BlockchainVoting.json';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
const alchemyApiUrl = process.env.NEXT_PUBLIC_ALCHEMY_API_URL;

export const getContract = () => {
    console.log("alchemyApiUrl", alchemyApiUrl)
    const provider = new ethers.JsonRpcProvider(alchemyApiUrl);
    const contract = new ethers.Contract(contractAddress, abi.abi, provider);
    return contract;
};

export const getSigner = async () => {
    if (!window?.ethereum) {
        throw new Error('MetaMask is not installed');
    }
    if (window.ethereum.isMetaMask) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        return signer;
    } else {
        throw new Error(
            'MetaMask is not the selected wallet provider. Please switch to MetaMask.'
        );
    }
};
