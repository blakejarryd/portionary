import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Portionary',
    description: 'Simplified stock ownership',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="h-full" data-oid="82q32np">
            <head data-oid="fb41236" />
            <body className={`${inter.className} h-full`} data-oid="2-ne3q1">
                {children}
            </body>
        </html>
    );
}
