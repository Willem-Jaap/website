import Link from 'next/link';

import AboutImage from '~about/components/about-image';
import ImageWithContentOverlay from '~components/misc/image-with-content-overlay';

const Page = () => {
    const birthDate = new Date(2003, 6, 16);
    const age = new Date().getUTCFullYear() - birthDate.getUTCFullYear();

    const experience = [
        {
            company: 'WebNL creative studios',
            title: 'Intern, Developer',
            period: '2020 - 2021',
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
        },
    ];

    return (
        <>
            <AboutImage />
            <section className="px-column-1 py-6 text-lg text-charade-100 border-t border-t-charade-800">
                <div className="flex flex-col gap-4 py-24 max-w-5xl mx-auto">
                    <h2 className="text-2xl font-medium">
                        Hi, I&apos;m Willem-Jaap, a frontend engineer from the Netherlands. I&apos;m
                        a creative and critical thinker, always looking for the most efficient and
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
                        className="my-8">
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
                        </Link>
                        .
                    </p>
                </div>
            </section>
            <section className="px-column-1 py-24 border-t border-t-charade-800 bg-charade-900">
                <p className="mb-24">
                    Before founding Pixel Perfect Agency, I developed my skills and gained valuable
                    experience through various roles in other companies.
                </p>
                <ul>
                    {experience.map((item, index) => (
                        <li key={index} className="mb-8">
                            <div className="flex justify-between gap-4 border-b border-b-charade-700 pb-4">
                                <span className="text-lg text-charade-200">{item.company}</span>
                                <span className="text-charade-400">
                                    {item.title}, {item.period}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
};

export default Page;