import Link from 'next/link';

import AboutImage from '~about/components/about-image';
import ImageWithContentOverlay from '~components/misc/image-with-content-overlay';
import TechList from '~components/misc/tech-list';

const Page = () => {
    const birthDate = new Date(2003, 6, 16);
    const age = new Date().getUTCFullYear() - birthDate.getUTCFullYear();

    const experiences = [
        {
            company: 'WebNL creative studios',
            title: 'Intern, Developer',
            period: '2020 - 2021',
            url: 'https://webnl.nl',
        },
        {
            company: 'Emerit',
            title: 'Developer (fullstack)',
            period: '2021 - 2023',
        },
        {
            company: 'Pixel Perfect Agency',
            title: 'CEO, Software Developer',
            period: '2023 - Present',
            url: 'https://pixelperfect.agency',
        },
    ];

    return (
        <>
            <AboutImage />
            <section className="px-column-1 py-32 text-charade-100 border-t border-t-charade-800">
                <div className="flex flex-col gap-4 my-24 max-w-5xl mx-auto">
                    <h2 className="text-2xl font-medium mb-2">
                        I&apos;m Willem-Jaap, a software developer from the Netherlands. I&apos;m a
                        creative and critical thinker, always looking for the most efficient and
                        beautiful solutions.
                    </h2>
                    <p className="text-charade-200">
                        I was born in 2003 (which makes me {age} years old). I&apos;ve always been
                        interested in technology and the way anything works. I started programming
                        at the age of 15 using self-taught HTML and CSS and Javascript. It was a
                        logical step for me to study Application- and Media Development at
                        Hoornbeeck College in Rotterdam. During my study I&apos;ve learned a lot
                        about programming and also did a lot of self study. I overengineered a lot
                        of projects and learned a lot from that.
                    </p>
                    <ImageWithContentOverlay
                        src="/assets/images/laptop-design-system-hero.png"
                        alt="Design system Pixel Perfect Agency"
                        className="mt-24 mb-8">
                        <div className="flex flex-col gap-4 text-center max-w-xl">
                            <h3 className="text-3xl uppercase">Pixel Perfect Agency</h3>
                            <p className="leading-tight text-charade-200 text-lg">
                                Pixel Perfect is a digital agency based in the Netherlands. We
                                strive to create beautiful, fast, safe & efficient user experiences.
                            </p>
                        </div>
                    </ImageWithContentOverlay>
                    <p className="text-charade-200">
                        I am the founder and CEO of{' '}
                        <Link
                            href="https://pixelperfect.agency"
                            className="underline hover:text-charade-200"
                            target="_blank"
                            rel="noreferrer">
                            Pixel Perfect Agency
                        </Link>
                        , a softwaredevelopment agency based in the Netherlands that focuses on
                        creating beautiful and software solutions using the latest technologies.
                    </p>
                    <p className="text-charade-200">
                        I also like to work on side projects and am becoming more active in the open
                        source community. You can check me out on{' '}
                        <Link
                            href="https://github.com/Willem-Jaap"
                            className="underline hover:text-charade-200"
                            target="_blank"
                            rel="noreferrer">
                            Github
                        </Link>{' '}
                        or view my{' '}
                        <Link href="/projects" className="underline hover:text-charade-200">
                            projects
                        </Link>
                        .
                    </p>
                </div>
            </section>
            <section className="px-column-1 py-24 border-y border-y-charade-800 bg-charade-900">
                <div className="max-w-5xl mx-auto">
                    <p className="text-lg mb-24">
                        Before founding Pixel Perfect Agency, I developed my skills and gained
                        valuable experience through various roles with diverse technologies in other
                        companies.
                    </p>
                    <ul>
                        {experiences.map((item, index) => {
                            const Content = () => (
                                <>
                                    <span className="text-lg text-charade-200">{item.company}</span>
                                    <span className="text-charade-400 font-medium">
                                        {item.title}, {item.period}
                                    </span>
                                </>
                            );

                            return (
                                <li key={index} className="mb-8">
                                    <div className="">
                                        {item.url ? (
                                            <Link
                                                href={item.url}
                                                className="flex justify-between gap-4 border-b border-b-charade-700 pb-4 hover:opacity-80"
                                                target="_blank"
                                                rel="noreferrer">
                                                <Content />
                                            </Link>
                                        ) : (
                                            <div className="flex justify-between gap-4 border-b border-b-charade-700 pb-4">
                                                <Content />
                                            </div>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>
            <section className="max-w-4xl mx-auto pb-24">
                <p className="my-24">
                    While working with these companies, I&apos;ve delved into diverse tech stacks
                    and programming languages. Today, I&apos;m well-versed in Next, React, Laravel,
                    Tailwind, and (S)CSS. However, my experience extends to a wide range of other
                    tech stacks that I have used previously as well.
                </p>
                <TechList />
            </section>
        </>
    );
};

export default Page;
