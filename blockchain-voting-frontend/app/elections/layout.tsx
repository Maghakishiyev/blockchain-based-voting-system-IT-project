import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Elections',
    description: 'Blockchain Voting System',
};

export default function ElectionsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
