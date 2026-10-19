import type { MetadataRoute } from 'next';

import { env } from '~/env';

const robots = (): MetadataRoute.Robots => ({
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${env.NEXT_PUBLIC_URL as string}/sitemap.xml`,
});

export default robots;
