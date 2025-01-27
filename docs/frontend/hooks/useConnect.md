# useConnectWallet Hook Documentation

## Overview
The [useConnectWallet.ts] file defines a custom hook for connecting a user's Ethereum wallet in the Blockchain-Based Voting System.

## Purpose
This hook manages the connection process for the user's Ethereum wallet (e.g., MetaMask).

## Key Features
- **Ethereum Wallet Check**: Verifies if an Ethereum wallet is present in the user's browser.
- **Account Access Request**: Requests access to the user's wallet accounts.
- **Blockchain Connection**: Initializes the connection to the blockchain using ethers.js.
- **Global State Management**: Stores the user's wallet address and other relevant information in the global state (UserStore).
- **Loading and Error Handling**: Manages loading and error states during the connection process.

## Usage
To use the [useConnectWallet] hook, import it into your component and call the [connectWallet] function:

```javascript
import { useConnectWallet } from '@/hooks/useConnectWallet';

const MyComponent = () => {
    const { connectWallet, error, loading } = useConnectWallet();

    const handleConnect = async () => {
        await connectWallet();
    };

    return (
        <button onClick={handleConnect} disabled={loading}>
            Connect Wallet
        </button>
    );
};