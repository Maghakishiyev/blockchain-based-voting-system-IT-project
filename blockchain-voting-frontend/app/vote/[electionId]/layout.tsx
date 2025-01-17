import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Vote',
    description: 'Blockchain Voting System',
};

export default function VoteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
