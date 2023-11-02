import type { PropsWithChildren } from 'react';

import type { Metadata, Viewport } from 'next';

import { Inter } from 'next/font/google';

import { env } from '~/env';
import Footer from '~components/layout/footer';
import Header from '~components/layout/header';
import '~styles/global.scss';
import cn from '~utils/cn';

const InterFont = Inter({
    subsets: ['latin'],
});

const RootLayout = ({ children }: PropsWithChildren) => {
    return (
        <html className={cn(InterFont.className, 'scroll-smooth antialiased')}>
            <body className="relative max-w-[100vw] min-h-screen bg-charade-950 text-charade-50 overflow-x-hidden">
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
};

export const metadata: Metadata = {
    metadataBase: new URL(env.NEXT_PUBLIC_URL!),
    title: {
        default: 'Willem-Jaap - Portfolio, blog and more',
        template: '%s | Willem-Jaap',
    },
    description:
        'Software developer, proficient in Next.js, Typescript, Tailwind, Laravel and more. Read about my latest insights and projects.',
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
        title: 'Willem-Jaap - Portfolio, blog and more',
        description:
            'Software developer, proficient in Next.js, Typescript, Tailwind, Laravel and more. Read about my latest insights and projects.',
        type: 'website',
        locale: 'en_US',
        url: new URL(env.NEXT_PUBLIC_URL!),
        siteName: 'Willem-Jaap Portfolio',
    },
};

export const viewport: Viewport = {
    colorScheme: 'dark',
    themeColor: 'black',
};

export default RootLayout;
