import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Results',
    description: 'Blockchain Voting System',
};

export default function ResultsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
