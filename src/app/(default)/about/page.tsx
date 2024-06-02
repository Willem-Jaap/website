import { type Metadata } from 'next';
import Link from 'next/link';

import AboutImage from '~about/components/about-image';
import ImageWithContentOverlay from '~components/misc/image-with-content-overlay';
import TechList from '~components/misc/tech-list';

const Page = () => {
    const getAge = (birthDate: string) =>
        Math.floor((Date.now() - new Date(birthDate).getTime()) / 3.15576e10);

    const age = getAge('2003-06-16');

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
            title: 'Founder, Software Developer',
            period: '2023 - Present',
            url: 'https://pixelperfect.agency',
        },
    ];

    return (
        <>
            <AboutImage />
            <section className="px-column-1 py-32 text-charade-100 border-t border-t-charade-800">
                <div className="flex flex-col gap-5 my-24 max-w-5xl mx-auto">
                    <h2 className="text-2xl font-medium mb-2">
                        I&apos;m Willem-Jaap, a software developer from the Netherlands. I&apos;m a
                        creative and critical thinker, always looking for the most efficient and
                        beautiful solutions.
                    </h2>
                    <p className="text-charade-200">
                        I was born in 2003 (which makes me {age} years old). I&apos;ve always been
                        interested in technology and the way anything works. I started programming
                        at the age of 15 using self-taught HTML and CSS and Javascript. It was a
                        logical step for me to pursue a study Application- and Media Development at
                        Hoornbeeck College in Rotterdam. During my study I&apos;ve learned a lot
                        about programming and also did a lot of self study. I overengineered a lot
                        of projects and learned a lot from that.
                    </p>
                    <p className="text-charade-200">
                        After the first year I started working at WebNL creative studios as an
                        intern. It was quite overwelming at first as I wasn&apos;t very familiar
                        with the technologies they used. I worked on various projects, learned using
                        Laravel and Vue.js and worked with a custom Wordpress framework. I learned a
                        lot about programming and handling complex issues.
                    </p>
                    <p className="text-charade-200">
                        In the second half of the year I built a PHP framework for REST API&apos;s
                        from scratch, with automatic route discovery and a custom SQL query builder.
                        In this time I also started using React and Webpack for the first time. With
                        this knowledge I created a healthcare application for a school project. This
                        project consisted of a PHP REST API, a React frontend, a Python chatservice
                        and a React Native client facing app.
                    </p>
                    <p className="text-charade-200">
                        I started working at Emerit as a parttime developer. I worked on creating a
                        landingpages application using Next.js and CakePHP. During my final
                        internship which I did at Emerit, I worked on a cash register application
                        using Laravel and Electron together with{' '}
                        <Link
                            href="https://fransslabbekoorn.com"
                            target="_blank"
                            className="underline hover:text-charade-200 text-nowrap">
                            Frans Slabbekoorn
                        </Link>{' '}
                        and{' '}
                        <Link
                            href="https://www.linkedin.com/in/diederick-verschuure-093bba194"
                            target="_blank"
                            className="underline hover:text-charade-200 text-nowrap">
                            Diederick Verschuure
                        </Link>
                        . This cash register had support for offline mode with a local database and
                        a delta sync system.
                    </p>
                    <p className="text-charade-200">
                        A special shoutout to{' '}
                        <Link
                            href="https://www.linkedin.com/in/joan-verhulst-0204091bb"
                            target="_blank"
                            className="underline hover:text-charade-200 text-nowrap">
                            Joan Verhulst
                        </Link>{' '}
                        for always helping out with designs for all the projects I worked on.
                    </p>
                    <ImageWithContentOverlay
                        src="/assets/images/laptop-design-system-hero.png"
                        alt="Design system Pixel Perfect Agency"
                        className="mt-24 mb-8"
                        title="Pixel Perfect Agency"
                        description="Pixel Perfect is a digital agency based in the Netherlands. We strive to create beautiful, fast, safe & efficient user experiences."
                    />
                    <h2 className="text-2xl font-medium mt-12">Founding Pixel Perfect Agency</h2>
                    <p className="text-charade-200">
                        In 2023 I started{' '}
                        <Link
                            href="https://pixelperfect.agency"
                            className="underline hover:text-charade-200"
                            target="_blank"
                            rel="noreferrer">
                            Pixel Perfect Agency
                        </Link>
                        , a softwaredevelopment agency based in the Netherlands that focuses on
                        creating beautiful and software solutions to help businesses grow and
                        thrive. In the company I am responsible for all business operations and
                        Frontend / UX development for the projects we work on.
                    </p>
                    {/* Github profile card */}
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
                                    <div>
                                        {item.url ? (
                                            <Link
                                                href={item.url}
                                                className="flex flex-col md:flex-row justify-between gap-4 border-b border-b-charade-700 pb-4 hover:opacity-80"
                                                target="_blank"
                                                rel="noreferrer">
                                                <Content />
                                            </Link>
                                        ) : (
                                            <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-b-charade-700 pb-4">
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
            <section className="max-w-4xl mx-auto px-8 pb-24">
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

export const metadata: Metadata = {
    title: 'About me',
    description:
        'Software developer, proficient in Next.js, Typescript, Tailwind, Laravel and more. Read about my latest insights and projects.',
    openGraph: {
        title: 'About me',
        description:
            'Software developer, proficient in Next.js, Typescript, Tailwind, Laravel and more. Read about my latest insights and projects.',
    },
};

export default Page;
