import { BlockchainVoting } from '@/contracts/server';
import { ethers } from 'ethers';
import { proxy, ref } from 'valtio';

interface UserState {
    address: string | null; // e.g. the user's public address
    isAdmin: boolean;
    isConnected: boolean;
    provider: ethers.BrowserProvider | null; // Provider instance
    signer: ethers.JsonRpcSigner | null; // Signer instance
    contract: BlockchainVoting | null; // Contract instance
}

export const state = proxy<UserState>({
    address: null,
    isAdmin: false,
    isConnected: false,
    provider: null,
    signer: null,
    contract: null,
});

export const UserStore = {
    state,

    setAddress(address: string | null) {
        state.address = address;
    },

    setIsAdmin(isAdmin: boolean) {
        state.isAdmin = isAdmin;
    },

    setIsConnected(isConnected: boolean) {
        state.isConnected = isConnected;
    },

    setProvider(provider: ethers.BrowserProvider | null) {
        state.provider = provider ? ref(provider) : null;
    },

    setSigner(signer: ethers.JsonRpcSigner | null) {
        state.signer = signer ? ref(signer) : null;
    },

    setContract(contract: BlockchainVoting | null) {
        state.contract = contract ? ref(contract) : null;
    },

    reset() {
        state.address = null;
        state.isAdmin = false;
        state.isConnected = false;
        state.provider = null;
        state.signer = null;
        state.contract = null;
    },
};

export default UserStore;
