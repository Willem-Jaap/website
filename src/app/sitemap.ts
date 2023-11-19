import type { MetadataRoute } from 'next';

import { allBlogs, allProjects } from 'contentlayer/generated';

import { env } from '~/env';

const getSitemapItem = (
    path: string,
    priority: number = 0.5,
    changefreq: string = 'monthly',
    lastModified = new Date().toISOString(),
) => {
    return {
        url: env.NEXT_PUBLIC_URL! + path,
        changefreq,
        priority,
        lastModified,
    };
};

const sitemap = (): MetadataRoute.Sitemap => {
    return [
        getSitemapItem('/', 1),
        getSitemapItem('/about', 0.8),
        getSitemapItem('/blog', 0.6, 'daily'),
        ...allBlogs.map(blog => getSitemapItem(blog.url, 0.5, 'daily', blog.updatedAt)),
        getSitemapItem('/projects', 0.6),
        ...allProjects.map(project => getSitemapItem(project.url, 0.5, 'daily')),
        getSitemapItem('/settings', 0.2),
    ];
};

export default sitemap;
