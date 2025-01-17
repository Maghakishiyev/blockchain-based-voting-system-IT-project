import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'EndElection',
    description: 'Blockchain Voting System',
};

export default function EndElectionLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
