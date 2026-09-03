// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
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

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
module.exports = withEyes(withContentlayer(nextConfig));
