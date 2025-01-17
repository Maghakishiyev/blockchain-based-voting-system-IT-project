import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Register',
    description: 'Blockchain Voting System',
};

export default function RegisterLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
