import type { Metadata } from 'next';
import Link from 'next/link';

import { deskImage, openGraph } from '~/app/share';
import { formatDate, posts } from '~/content/writing';
import PaperSheet from '~/desk/writing/paper-sheet';

const description =
    'Things Willem-Jaap wrote about Git, pull requests and the tools developers use every day.';

export const metadata: Metadata = {
    title: 'Writing',
    description,
    alternates: { canonical: '/writing' },
    openGraph: {
        ...openGraph,
        title: 'Writing',
        description,
        url: '/writing',
        images: [deskImage],
    },
};

const WritingPage = () => (
    <PaperSheet>
        <div className="mx-auto max-w-[640px]">
            <h1 className="font-hand text-[56px] leading-none text-ink sm:text-[72px]">
                things I wrote
            </h1>
            <ol className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
                {posts.map(post => (
                    <li key={post.slug}>
                        <Link href={`/writing/${post.slug}`} className="group block py-8">
                            <time
                                dateTime={post.publishedAt.toISOString()}
                                className="font-sans text-[12px] uppercase tracking-[0.18em] text-ink/50">
                                {formatDate(post.publishedAt)}
                            </time>
                            <h2 className="mt-2 text-[28px] font-medium leading-tight tracking-[-0.01em] text-ink underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-mat sm:text-[32px]">
                                {post.title}
                            </h2>
                            <p className="mt-3 text-[18px] leading-[1.6] text-ink/70">
                                {post.summary}
                            </p>
                        </Link>
                    </li>
                ))}
            </ol>
        </div>
    </PaperSheet>
);

export default WritingPage;
