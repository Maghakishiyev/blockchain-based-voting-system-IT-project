import { proxy } from 'valtio';

interface UserState {
    address: string | null; // e.g. the user's public address
    isAdmin: boolean;
    isConnected: boolean;
}

export const userStore = proxy<UserState>({
    address: null,
    isAdmin: false,
    isConnected: false,
});
