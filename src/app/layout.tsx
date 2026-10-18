import type { PropsWithChildren } from 'react';

import type { Metadata, Viewport } from 'next';

import { Caveat, Inter } from 'next/font/google';

import Analytics from '~/app/analytics';
import { openGraph } from '~/app/share';
import { env } from '~/env';
import '~/styles/global.css';
import cn from '~/utils/cn';
import { Tencil } from 'tencil/react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' });

const RootLayout = ({ children }: PropsWithChildren) => (
    <html lang="en" className={cn(inter.variable, caveat.variable, 'antialiased')}>
        <body className="font-sans text-white">
            <Analytics siteId={env.NEXT_PUBLIC_EYES_SITE_ID} isVercel={Boolean(process.env.VERCEL)}>
                {children}
            </Analytics>
            {/* Dev only; TENCIL_PORT points at a daemon other than the default 4747 */}
            <Tencil port={process.env.TENCIL_PORT ? Number(process.env.TENCIL_PORT) : undefined} />
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
    openGraph: { ...openGraph, title: 'Willem-Jaap · Desk', description },
    // Title, description and image fall back to Open Graph's, per page
    twitter: { card: 'summary_large_image' },
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
