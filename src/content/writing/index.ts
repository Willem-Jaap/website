import type { MDXContent } from 'mdx/types';

export interface Post {
    slug: string;
    title: string;
    /** For search engines and link previews */
    description: string;
    /** Printed under the title */
    summary: string;
    image: { src: string; width: number; height: number };
    tags: string[];
    publishedAt: Date;
    updatedAt: Date;
}

/**
 * The posts' frontmatter. It lives here rather than in the .mdx files so the desk can
 * list the posts without shipping the articles themselves to the browser.
 */
const frontmatter: Post[] = [
    {
        slug: 'commit-style',
        title: 'Your team should pick a commit style',
        description:
            'A well written commit is a concise summary for the changes in that commit. If you commit small and commit often you can summarize your changes in a few words, staying consistent with your team is key.',
        summary:
            'A well written commit is a concise summary for the changes in that commit. If you commit small and commit often you can summarize your changes in a few words, staying consistent with your team is key.',
        image: { src: '/assets/writing/commit-style.png', width: 1405, height: 556 },
        tags: ['Git', 'Conventional Commits'],
        publishedAt: new Date('2024-06-16'),
        updatedAt: new Date('2024-06-23'),
    },
    {
        slug: 'review-your-own-pull-requests',
        title: 'Review your own pull requests',
        description:
            'Reviewing your own pull requests can help you catch bugs and improve your code quality. You are probably stupid. Help yourself catch your own mistakes early.',
        summary:
            "You are probably stupid. No, I'm kidding. But every developer working on large changes makes mistakes. You lose focus, you forget things, you make typos. Reviewing your own pull requests can help you catch bugs and improve your code quality, leaving more time for your peers to focus on the bigger picture of your changes.",
        image: { src: '/assets/writing/obama-pull-requests.jpg', width: 1015, height: 627 },
        tags: ['Git', 'Code Review', 'Pull Requests'],
        publishedAt: new Date('2024-06-23'),
        updatedAt: new Date('2024-06-23'),
    },
    {
        slug: 'package-manager',
        title: 'Add the packageManager field to your package.json',
        description:
            'If you are using a package manager like npm, yarn or pnpm you can specify the package manager you are using in your package.json file. This is useful for tools like Github Actions and for your team to know which package manager to use.',
        summary:
            'If you are using a package manager like npm, yarn or pnpm you can specify the package manager you are using in your package.json file. This is useful for tools like Github Actions and for your team to know which package manager to use.',
        image: { src: '/assets/writing/package-manager-pnpm-diff.png', width: 1463, height: 695 },
        tags: ['NPM', 'Package manager'],
        publishedAt: new Date('2024-09-01'),
        updatedAt: new Date('2024-09-01'),
    },
];

/** Every post, newest first */
export const posts = [...frontmatter].sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
);

export const getPost = (slug: string) => posts.find(post => post.slug === slug);

/** The articles, loaded only where they're read */
const content: Record<string, () => Promise<{ default: MDXContent }>> = {
    'commit-style': () => import('~/content/writing/commit-style.mdx'),
    'package-manager': () => import('~/content/writing/package-manager.mdx'),
    'review-your-own-pull-requests': () =>
        import('~/content/writing/review-your-own-pull-requests.mdx'),
};

export const getPostContent = async (slug: string) => (await content[slug]?.())?.default;

/** e.g. "16 June 2024" */
export const formatDate = (date: Date) =>
    date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    });
