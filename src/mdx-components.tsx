import type { MDXComponents } from 'mdx/types';

/** Required by @next/mdx. Posts pass their own components, see src/desk/writing/prose.tsx */
export const useMDXComponents = (components: MDXComponents): MDXComponents => components;
