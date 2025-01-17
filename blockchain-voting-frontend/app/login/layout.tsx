import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login',
    description: 'Blockchain Voting System',
};

export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
