import type { Metadata } from 'next';
import '../style/globals.css';
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
                    <div className='h-full min-h-screen flex-1 flex flex-col relative overflow-y-auto focus:outline-none'>
                        <Header />
                        {children}
                        <Footer />
                    </div>
                </MUIProvider>
            </body>
        </html>
    );
}
