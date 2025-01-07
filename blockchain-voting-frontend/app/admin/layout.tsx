import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin',
    description: 'Page for Admin',
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
