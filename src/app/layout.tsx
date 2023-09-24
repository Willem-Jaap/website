import type { PropsWithChildren } from 'react';

import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import Logo from '~components/misc/Logo';
import '~styles/global.scss';
import cn from '~utils/cn';

const InterFont = Inter({
    subsets: ['latin'],
});

const RootLayout = ({ children }: PropsWithChildren) => {
    return (
        <html className={cn(InterFont.className, 'scroll-smooth')}>
            <body className="relative min-h-screen bg-charade-900 text-charade-50">
                <div className="absolute top-0 z-10 mx-8 py-10 border-b border-charade-700 w-full">
                    <div className="flex items-center gap-6">
                        <Logo />
                    </div>
                </div>
                {children}
            </body>
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
