import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { openGraph } from '~/app/share';
import { formatDate, getPost, getPostContent, posts } from '~/content/writing';
import PaperSheet from '~/desk/writing/paper-sheet';
import prose from '~/desk/writing/prose';

interface Props {
    params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export const generateStaticParams = () => posts.map(({ slug }) => ({ slug }));

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const post = getPost((await params).slug);
    if (!post) return {};

    const url = `/writing/${post.slug}`;
    return {
        title: post.title,
        description: post.description,
        alternates: { canonical: url },
        openGraph: {
            ...openGraph,
            type: 'article',
            url,
            title: post.title,
            description: post.description,
            publishedTime: post.publishedAt.toISOString(),
            modifiedTime: post.updatedAt.toISOString(),
            authors: ['Willem-Jaap Klepper'],
            tags: post.tags,
            images: [{ url: post.image.src, width: post.image.width, height: post.image.height }],
        },
        twitter: { card: 'summary_large_image', title: post.title, description: post.description },
    };
};

const PostPage = async ({ params }: Props) => {
    const { slug } = await params;
    const post = getPost(slug);
    const Content = await getPostContent(slug);
    if (!post || !Content) notFound();

    const isUpdated = post.updatedAt.getTime() !== post.publishedAt.getTime();
    const others = posts.filter(other => other.slug !== post.slug);

    return (
        <PaperSheet>
            <article className="mx-auto max-w-[640px] text-[19px] leading-[1.7] text-ink/85 sm:text-[20px]">
                <header>
                    <p className="font-sans text-[12px] tracking-[0.04em] text-ink/50">
                        <time dateTime={post.publishedAt.toISOString()}>
                            {formatDate(post.publishedAt)}
                        </time>
                        {isUpdated && (
                            <>
                                {' · updated '}
                                <time dateTime={post.updatedAt.toISOString()}>
                                    {formatDate(post.updatedAt)}
                                </time>
                            </>
                        )}
                    </p>
                    <h1 className="mt-4 text-[38px] font-medium leading-[1.08] tracking-[-0.015em] text-ink text-balance sm:text-[52px]">
                        {post.title}
                    </h1>
                    <p className="mt-6 text-[21px] italic leading-[1.55] text-ink/70 sm:text-[23px]">
                        {post.summary}
                    </p>
                </header>
                <Image
                    src={post.image.src}
                    alt=""
                    width={post.image.width}
                    height={post.image.height}
                    sizes="(min-width: 768px) 640px, 100vw"
                    priority
                    className="my-10 h-auto w-full mix-blend-multiply"
                />
                <Content components={prose} />
                <footer className="mt-16 border-t border-ink/15 pt-8">
                    <p className="font-sans text-[12px] tracking-[0.04em] text-ink/50">
                        Also on the desk
                    </p>
                    <ul className="mt-4 space-y-3">
                        {others.map(other => (
                            <li key={other.slug}>
                                <Link
                                    href={`/writing/${other.slug}`}
                                    className="text-[21px] leading-snug text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:decoration-mat">
                                    {other.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </footer>
            </article>
        </PaperSheet>
    );
};

export default PostPage;
