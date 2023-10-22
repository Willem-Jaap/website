import type { PropsWithChildren } from 'react';

import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import Header from '~components/layout/header';
import '~styles/global.scss';
import cn from '~utils/cn';

const InterFont = Inter({
    subsets: ['latin'],
});

const RootLayout = ({ children }: PropsWithChildren) => {
    return (
        <html className={cn(InterFont.className, 'scroll-smooth')}>
            <body className="relative max-w-[100vw] min-h-screen bg-charade-900 text-charade-50 overflow-x-hidden">
                <Header />
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
    description:
        'Software developer, proficient in Next.js, Typescript, Tailwind, Laravel and more. Read about my latest insights and projects.',
    colorScheme: 'dark',
    themeColor: 'black',
    keywords: [
        'willem-jaap',
        'developer',
        'software',
        'portfolio',
        'blog',
        'projects',
        'next',
        'next.js',
        'typescript',
        'tailwind',
        'laravel',
        'react',
    ],
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://willemjaap.nl',
        siteName: 'Willem-Jaap Portfolio',
    },
};

export default RootLayout;
