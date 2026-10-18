// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withEyes } = require('eyes-next/config');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const createMDX = require('@next/mdx');

/** @type {import('next').NextConfig} */
const nextConfig = {};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const withMDX = createMDX();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
module.exports = withEyes(withMDX(nextConfig));
