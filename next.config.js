// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withContentlayer } = require('next-contentlayer2');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withEyes } = require('eyes-next/config');

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

module.exports = withEyes(withContentlayer(nextConfig));
