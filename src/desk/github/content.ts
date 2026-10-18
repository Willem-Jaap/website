import snapshot from '~/desk/github/snapshot.json';

export const PROFILE_URL = 'https://github.com/Willem-Jaap';

export interface Repo {
    fullName: string;
    name: string;
    description: string | null;
    language: string | null;
    stars: number;
    url: string;
}

export interface CalendarDay {
    date: string;
    /** 0 (none) to 4 (most), as GitHub buckets them */
    level: number;
}

export interface GithubData {
    repos: Repo[];
    /** Merged pull requests to public projects outside my own accounts */
    upstream: { total: number };
    calendar: { total: number; days: CalendarDay[] };
}

/** Last known data, committed so the desk renders when GitHub can't be reached */
export const SNAPSHOT: GithubData = snapshot;

/** The repos on the mat, with a one-liner that fits on an index card */
export const REPOS: { fullName: string; blurb: string }[] = [
    { fullName: 'Willem-Jaap/cssclamp', blurb: 'Fluid clamp() sizes for CSS & Tailwind' },
    { fullName: 'Willem-Jaap/tallyhawk', blurb: 'A sharp-eyed line counter, like cloc' },
    { fullName: 'Willem-Jaap/artisan-act', blurb: 'Interactive mode for the Artisan CLI' },
    { fullName: 'Willem-Jaap/typesafe-request', blurb: 'Typesafe request endpoints' },
    { fullName: 'Willem-Jaap/key-debugger', blurb: 'Key codes for any key you press' },
    {
        fullName: 'pixel-perfect-agency/eslint-config-pixel',
        blurb: 'Strict ESLint config for Next.js',
    },
    {
        fullName: 'Willem-Jaap/principles',
        blurb: 'How I write code, run projects and work with others',
    },
];

export interface Contribution {
    repo: string;
    number: number;
    title: string;
    url: string;
}

/** Merged pull requests to other projects, newest first. Merged PRs don't change, so these are static */
export const CONTRIBUTIONS: Contribution[] = [
    { repo: 'QuiiBz/sherif', number: 159, title: 'Ignore empty directories' },
    { repo: 'pestphp/pest', number: 1598, title: 'only() for a whole file' },
    { repo: 't3-oss/t3-env', number: 383, title: 'Standard Schema docs' },
    { repo: 'laravel/echo', number: 465, title: 'Infer the broadcaster type' },
    { repo: 'vercel/next.js', number: 70180, title: 'Docs: tsc and build errors' },
    { repo: 'QuiiBz/sherif', number: 71, title: 'Install after autofixing' },
    { repo: 'vercel/next.js', number: 68007, title: 'Types for next commands' },
    { repo: 'laravel/breeze-next', number: 49, title: 'Rework linting config' },
    { repo: 'vercel/next.js', number: 48708, title: 'All options in the CLI help' },
].map(pr => ({ ...pr, url: `https://github.com/${pr.repo}/pull/${pr.number}` }));

/** GitHub's own colours, so a language reads at a glance */
export const LANGUAGE_COLORS: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    PHP: '#4f5d95',
    Rust: '#dea584',
    Markdown: '#083fa1',
};
