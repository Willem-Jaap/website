import type { MetadataRoute } from 'next';

import { env } from '~/env';

const robots = (): MetadataRoute.Robots => {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/settings', '/privacy-policy', '/api', '/api/*', '/_next/*', '/_error'],
        },
        sitemap: `${env.NEXT_PUBLIC_URL!}/sitemap.xml`,
        host: env.NEXT_PUBLIC_URL,
    };
};

export default robots;
