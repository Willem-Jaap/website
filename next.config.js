// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withEyes } = require('eyes-next/config');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const createMDX = require('@next/mdx');

/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects() {
        // v3 called writing "insights" and had separate pages that now live on the desk
        return [
            { source: '/insights', destination: '/writing', permanent: true },
            { source: '/insights/:slug', destination: '/writing/:slug', permanent: true },
            { source: '/about', destination: '/#about', permanent: true },
            { source: '/projects', destination: '/#github', permanent: true },
            { source: '/projects/:slug', destination: '/#github', permanent: true },
        ];
    },
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const withMDX = createMDX();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
module.exports = withEyes(withMDX(nextConfig));
