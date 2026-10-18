import type { MetadataRoute } from 'next';

import { posts } from '~/content/writing';
import { env } from '~/env';

const sitemap = (): MetadataRoute.Sitemap => {
    const url = env.NEXT_PUBLIC_URL as string;
    return [
        { url, changeFrequency: 'weekly', priority: 1 },
        { url: `${url}/writing`, changeFrequency: 'weekly', priority: 0.8 },
        ...posts.map(post => ({
            url: `${url}/writing/${post.slug}`,
            lastModified: post.updatedAt,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        })),
    ];
};

export default sitemap;
