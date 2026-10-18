'use client';

import type { PropsWithChildren } from 'react';

import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { EyesNextProvider } from 'eyes-next';

const LOCAL_HOSTS = ['localhost', '127.0.0.1', '[::1]'];

/**
 * Eyes only accepts events from the site's own domain and answers anything else with a 400,
 * which fills the console (and the Next.js dev overlay) while running locally.
 */
const isLocal = () => LOCAL_HOSTS.includes(window.location.hostname);

const Analytics = ({ siteId, children }: PropsWithChildren<{ siteId: string }>) => (
    <EyesNextProvider siteId={siteId} beforeSend={event => (isLocal() ? null : event)}>
        {children}
        <VercelAnalytics />
    </EyesNextProvider>
);

export default Analytics;
