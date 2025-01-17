import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'CreateElection',
    description: 'Blockchain Voting System',
};

export default function CreateElectionLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
