// components/LogoutButton.tsx
'use client';

import React from 'react';
import { useLogOut } from '@/hooks/useLogOut';
import { Button } from '@mui/material';

const LogoutButton: React.FC = () => {
    const { handleLogout } = useLogOut();

    return (
        <Button color='inherit' onClick={handleLogout}>
            Log Out
        </Button>
    );
};

export default LogoutButton;
