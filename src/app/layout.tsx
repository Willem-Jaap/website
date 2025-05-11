import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { PropsWithChildren } from 'react';

import { Header } from '~components/header';
import cn from '~utils/cn';
import '~styles/global.css';

import { env } from '~/env';

const InterFont = Inter({
    subsets: ['latin'],
});

const RootLayout = ({ children }: PropsWithChildren) => {
    return (
        <html className={cn(InterFont.className, 'scroll-smooth antialiased')} lang="en">
            <body className="relative min-h-screen max-w-screen overflow-x-hidden bg-neutral-50 text-base text-neutral-950">
                <Header />
                {children}
                {/* <Analytics /> */}
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

export default RootLayout;
