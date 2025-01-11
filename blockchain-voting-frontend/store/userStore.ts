import { proxy } from 'valtio';

interface UserState {
    address: string | null; // e.g. the user's public address
    isAdmin: boolean;
    isConnected: boolean;
}

export const state = proxy<UserState>({
    address: null,
    isAdmin: false,
    isConnected: false,
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

    reset() {
        state.address = null;
        state.isAdmin = false;
        state.isConnected = false;
    },
};

export default UserStore;
