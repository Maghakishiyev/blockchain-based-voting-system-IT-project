import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MUIProvider from '@/providers/MUIProvider';

export const metadata: Metadata = {
    title: 'Voting',
    description: 'Blockchain Voting System',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body>
                <MUIProvider>
                    <Header />
                    {children}
                    <Footer />
                </MUIProvider>
            </body>
        </html>
    );
}
