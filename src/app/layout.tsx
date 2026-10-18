import type { PropsWithChildren } from 'react';

import type { Metadata, Viewport } from 'next';

import { Caveat, Inter } from 'next/font/google';

import Analytics from '~/app/analytics';
import { env } from '~/env';
import '~/styles/global.css';
import cn from '~/utils/cn';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' });

const RootLayout = ({ children }: PropsWithChildren) => (
    <html lang="en" className={cn(inter.variable, caveat.variable, 'antialiased')}>
        <body className="font-sans text-white">
            <Analytics siteId={env.NEXT_PUBLIC_EYES_SITE_ID} isVercel={Boolean(process.env.VERCEL)}>
                {children}
            </Analytics>
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
    twitter: { card: 'summary_large_image', title: 'Willem-Jaap · Desk', description },
};

export const viewport: Viewport = {
    colorScheme: 'dark',
    themeColor: '#1c1f24',
    width: 'device-width',
    initialScale: 1,
    // Draw under the notch and home indicator; the dock keeps to the safe area
    viewportFit: 'cover',
    // The page stays zoomable for accessibility: the desk cancels pinches itself (see viewport.tsx)
};

export default RootLayout;
