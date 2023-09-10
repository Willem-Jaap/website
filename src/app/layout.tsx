import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import '~styles/global.scss';
import cn from '~utils/cn';

interface Props {
    children: React.ReactNode;
}

const InterFont = Inter({
    subsets: ['latin'],
});

const RootLayout = ({ children }: Props) => {
    return (
        <html className={cn(InterFont.className, 'scroll-smooth')}>
            <body className="min-h-screen bg-charade-900 text-charade-50">{children}</body>
        </html>
    );
};

export const metadata: Metadata = {
    title: {
        default: 'Willem-Jaap - Portfolio, blog and more',
        template: '%s | Willem-Jaap',
    },
};

export default RootLayout;
