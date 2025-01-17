import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Not Authorized',
    description: 'Blockchain Voting System',
};

export default function NotAuthorizedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
