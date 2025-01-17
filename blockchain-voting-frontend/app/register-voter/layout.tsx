import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'RegisterSingle',
    description: 'Blockchain Voting System',
};

export default function RegisterSingleLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
