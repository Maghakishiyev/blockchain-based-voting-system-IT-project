'use client'

import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

export default function Home() {
    const router = useRouter();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Blockchain Voting System</h1>
            <Button
                variant='contained'
                color='primary'
                onClick={() => router.push('/voter')}
            >
                Voter Portal
            </Button>
            <Button
                variant='contained'
                color='secondary'
                style={{ marginLeft: '20px' }}
                onClick={() => router.push('/admin')}
            >
                Admin Portal
            </Button>
        </div>
    );
}
