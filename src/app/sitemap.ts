import type { MetadataRoute } from 'next';

import { allInsights, allProjects } from 'contentlayer/generated';

import { env } from '~/env';

const getSitemapItem = (
    path: string,
    priority: number = 0.5,
    changefreq: string = 'monthly',
    lastModified = new Date().toISOString(),
) => {
    return {
        url: (env.NEXT_PUBLIC_URL as string) + path,
        changefreq,
        priority,
        lastModified,
    };
};

const sitemap = (): MetadataRoute.Sitemap => {
    return [
        getSitemapItem('/', 1),
        getSitemapItem('/about', 0.8),
        getSitemapItem('/insights', 0.6, 'daily'),
        ...allInsights.map(insight => getSitemapItem(insight.url, 0.5, 'daily', insight.updatedAt)),
        getSitemapItem('/projects', 0.6),
        ...allProjects.map(project => getSitemapItem(project.url, 0.5, 'daily')),
        getSitemapItem('/settings', 0.2),
    ];
};

export default sitemap;
