import type { PropsWithChildren } from 'react';

import type { Metadata, Viewport } from 'next';

import { Inter } from 'next/font/google';

import { env } from '~/env';
import Footer from '~components/layout/footer';
import Header from '~components/layout/header';
import '~styles/global.css';
import '~styles/typography/prose.css';
import cn from '~utils/cn';
import { Analytics } from '@vercel/analytics/react';

const InterFont = Inter({
    subsets: ['latin'],
});

const RootLayout = ({ children }: PropsWithChildren) => {
    return (
        <html className={cn(InterFont.className, 'scroll-smooth antialiased')} lang="en">
            <body className="relative max-w-[100vw] min-h-screen bg-charade-950 text-base text-charade-50 overflow-x-hidden">
                <Header />
                {children}
                <Footer />
                <Analytics />
            </body>
        </html>
    );
};

export const metadata: Metadata = {
    metadataBase: new URL(env.NEXT_PUBLIC_URL as string),
    title: {
        default: 'Willem-Jaap - Portfolio, insights and more',
        template: '%s | Willem-Jaap',
    },
    description:
        'Software developer, proficient in Next.js, Typescript, Tailwind, Laravel and more. Read about my latest insights and projects.',
    keywords: [
        'willem-jaap',
        'developer',
        'software',
        'portfolio',
        'insights',
        'projects',
        'next',
        'next.js',
        'typescript',
        'tailwind',
        'laravel',
        'react',
    ],
    openGraph: {
        title: 'Willem-Jaap - Portfolio, insight and more',
        description:
            'Software developer, proficient in Next.js, Typescript, Tailwind, Laravel and more. Read about my latest insights and projects.',
        type: 'website',
        locale: 'en_US',
        url: new URL(env.NEXT_PUBLIC_URL as string),
        siteName: 'Willem-Jaap Portfolio',
    },
};

export const viewport: Viewport = {
    colorScheme: 'dark',
    themeColor: 'black',
};

export default RootLayout;
