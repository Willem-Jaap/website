// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withContentlayer } = require('next-contentlayer2');

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {},
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    rewrites() {
        return [
            {
                source: '/sitemap.xml',
                destination: '/sitemap',
            },
        ];
    },
};

module.exports = withContentlayer(nextConfig);
