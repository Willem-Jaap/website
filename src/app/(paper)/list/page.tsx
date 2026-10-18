import type { PropsWithChildren } from 'react';

import type { Metadata } from 'next';
import Link from 'next/link';

import BackLink from '~/app/(paper)/back-link';
import { deskImage, openGraph } from '~/app/share';
import { formatDate, posts } from '~/content/writing';
import { BIO, CONTACT, EDUCATION, EXPERIENCE } from '~/desk/about/content';
import { CONTRIBUTIONS, PROFILE_URL, REPOS } from '~/desk/github/content';
import { getGithubData } from '~/desk/github/data';
import PaperSheet from '~/desk/writing/paper-sheet';

// GitHub data refreshes daily, like on the desk
export const revalidate = 86400;

const description =
    'Everything on the desk of Willem-Jaap Klepper as a plain list: about me, Pixel Perfect, open source and writing.';

export const metadata: Metadata = {
    title: 'The desk as a list',
    description,
    alternates: { canonical: '/list' },
    openGraph: {
        ...openGraph,
        title: 'The desk as a list',
        description,
        url: '/list',
        images: [deskImage],
    },
};

const PRODUCTS = [
    {
        name: 'Pixel Perfect',
        url: 'https://pixelperfect.agency',
        text: 'My company. We design, build and run software products: our own, and together with the teams we work with.',
    },
    {
        name: 'Eyes',
        url: 'https://eyes.dev',
        text: 'Agentic analytics for everyone. Track behaviour, monitor performance, analyse funnels and ask questions in plain English.',
    },
    {
        name: 'Tencil',
        url: 'https://tencil.dev',
        text: 'Point at your UI, prompt your agent. Open source: click an element, type a change, and your coding agent makes it.',
    },
];

const linkClass =
    'text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-mat';

const Section = ({ title, children }: PropsWithChildren<{ title: string }>) => (
    <section className="mt-14">
        <h2 className="font-hand text-[40px] leading-none text-ink sm:text-[48px]">{title}</h2>
        <div className="mt-5 space-y-4">{children}</div>
    </section>
);

const Label = ({ children }: PropsWithChildren) => (
    <h3 className="pt-2 font-sans text-[14px] font-medium text-ink/55">{children}</h3>
);

/** Everything on the desk on one sheet, for screen readers, search engines and no JavaScript */
const ListPage = async () => {
    const github = await getGithubData();

    return (
        <>
            <BackLink href="/">← back to the desk</BackLink>
            <main className="relative mx-auto max-w-[820px]">
                <PaperSheet>
                    <div className="mx-auto max-w-[640px] text-[19px] leading-[1.65] text-ink/85">
                        <h1 className="font-hand text-[56px] leading-none text-ink sm:text-[72px]">
                            Willem-Jaap Klepper
                        </h1>
                        <p className="mt-4 text-[21px] italic text-ink/70">
                            Founder of Pixel Perfect and software developer from the Netherlands.
                            This is my desk as a list; the{' '}
                            <Link href="/" className={linkClass}>
                                desk itself
                            </Link>{' '}
                            is more fun.
                        </p>

                        <Section title="About me">
                            {BIO.map(paragraph => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                            <Label>Experience</Label>
                            <ul>
                                {EXPERIENCE.map(item => (
                                    <li key={item.company}>
                                        {item.url ? (
                                            <a href={item.url} className={linkClass}>
                                                {item.company}
                                            </a>
                                        ) : (
                                            item.company
                                        )}
                                        , {item.role.toLowerCase()} ({item.period})
                                    </li>
                                ))}
                            </ul>
                            <Label>Education</Label>
                            <p>
                                {EDUCATION.study}, {EDUCATION.school}
                            </p>
                            <Label>Contact</Label>
                            <ul>
                                {CONTACT.map(item => (
                                    <li key={item.href}>
                                        <a href={item.href} className={linkClass}>
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </Section>

                        <Section title="Pixel Perfect">
                            <ul className="space-y-4">
                                {PRODUCTS.map(product => (
                                    <li key={product.name}>
                                        <a
                                            href={product.url}
                                            className={`${linkClass} font-medium`}>
                                            {product.name}
                                        </a>
                                        : {product.text}
                                    </li>
                                ))}
                            </ul>
                        </Section>

                        <Section title="Open source">
                            <ul className="space-y-2">
                                {REPOS.map(({ fullName, blurb }) => {
                                    const repo = github.repos.find(r => r.fullName === fullName);
                                    return (
                                        <li key={fullName}>
                                            <a
                                                href={repo?.url ?? `https://github.com/${fullName}`}
                                                className={`${linkClass} font-medium`}>
                                                {repo?.name ?? fullName}
                                            </a>
                                            : {blurb}
                                        </li>
                                    );
                                })}
                            </ul>
                            <Label>
                                {`${github.upstream.total} pull requests merged into other projects, including`}
                            </Label>
                            <ul className="space-y-1">
                                {CONTRIBUTIONS.map(pr => (
                                    <li key={pr.url}>
                                        <a href={pr.url} className={linkClass}>
                                            {pr.repo}#{pr.number}
                                        </a>
                                        : {pr.title}
                                    </li>
                                ))}
                            </ul>
                            <p>
                                {github.calendar.total} contributions in the last year, and
                                everything else at{' '}
                                <a href={PROFILE_URL} className={linkClass}>
                                    github.com/Willem-Jaap
                                </a>
                                .
                            </p>
                        </Section>

                        <Section title="Writing">
                            <ul className="space-y-3">
                                {posts.map(post => (
                                    <li key={post.slug}>
                                        <Link
                                            href={`/writing/${post.slug}`}
                                            className={`${linkClass} font-medium`}>
                                            {post.title}
                                        </Link>{' '}
                                        <span className="text-ink/55">
                                            ({formatDate(post.publishedAt)})
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </Section>

                        <Section title="Also on the desk">
                            <p>
                                A 7&rdquo; single of distorted hardstyle kicks at 150 bpm, my third
                                coffee, a training card for push day and the tools of the cutting
                                mat.
                            </p>
                        </Section>
                    </div>
                </PaperSheet>
            </main>
        </>
    );
};

export default ListPage;
