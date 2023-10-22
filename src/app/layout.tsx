import type { PropsWithChildren } from 'react';

import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import Menu from '~components/layout/menu';
import Logo from '~components/misc/Logo';
import '~styles/global.scss';
import cn from '~utils/cn';

const InterFont = Inter({
    subsets: ['latin'],
});

const RootLayout = ({ children }: PropsWithChildren) => {
    return (
        <html className={cn(InterFont.className, 'scroll-smooth')}>
            <body className="relative max-w-[100vw] min-h-screen bg-charade-900 text-charade-50 overflow-x-hidden">
                <div className="absolute top-0 left-0 w-full z-20">
                    <div className="flex gap-4 justify-between mx-8 py-10 border-b border-charade-700">
                        <div className="flex items-center gap-6">
                            <Logo />
                        </div>
                        <Menu />
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
