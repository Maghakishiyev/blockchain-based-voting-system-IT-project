import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Voters',
    description: 'Blockchain Voting System',
};

export default function VotersLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
