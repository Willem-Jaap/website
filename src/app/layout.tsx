import type { PropsWithChildren } from 'react';

import type { Metadata, Viewport } from 'next';

import { Caveat, Inter } from 'next/font/google';

import { env } from '~/env';
import '~/styles/global.css';
import cn from '~/utils/cn';
import { Analytics } from '@vercel/analytics/react';
import { EyesNextProvider } from 'eyes-next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' });

const RootLayout = ({ children }: PropsWithChildren) => (
    <html lang="en" className={cn(inter.variable, caveat.variable, 'antialiased')}>
        <body className="font-sans text-white">
            <EyesNextProvider siteId={env.NEXT_PUBLIC_EYES_SITE_ID}>
                {children}
                <Analytics />
            </EyesNextProvider>
        </body>
    </html>
);

const description =
    'Willem-Jaap Klepper: founder of Pixel Perfect and software developer from the Netherlands. Zoom around my desk to find my work, writing and open source projects.';

export const metadata: Metadata = {
    metadataBase: new URL(env.NEXT_PUBLIC_URL as string),
    title: {
        default: 'Willem-Jaap · Desk',
        template: '%s | Willem-Jaap',
    },
    description,
    openGraph: {
        title: 'Willem-Jaap · Desk',
        description,
        type: 'website',
        locale: 'en_US',
        siteName: 'Willem-Jaap',
    },
};

export const viewport: Viewport = {
    colorScheme: 'dark',
    themeColor: '#1c1f24',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default RootLayout;
