import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Voter',
    description: 'Page for Voter',
};

export default function VoterLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
