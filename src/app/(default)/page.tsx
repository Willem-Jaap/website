import Image from 'next/image';
import Link from 'next/link';

import Spotlight from '~app/(default)/components/spotlight';
import BlogList from '~components/misc/BlogList';

const Page = () => {
    return (
        <>
            <div className="relative px-column-1 pt-32 min-h-screen bg-charade-700 overflow-hidden">
                <p className="relative flex flex-col text-4xl uppercase leading-tight z-10">
                    <span>User first</span>
                    <span className="text-charade-400">Frontend Engineer</span>
                    <span className="text-charade-400">Innovative & creative</span>
                </p>
                <h1 className="uppercase text-[14rem] text-charade-600 whitespace-nowrap select-none">
                    Willem-Jaap
                </h1>
                <Spotlight />
                <Image
                    fill
                    src="/assets/images/portfolio-hero.png"
                    alt="Portfolio hero image of Willem-Jaap"
                    className="object-contain object-center w-full h-full mt-12"
                />
                <p className="relative z-10 mt-24 text-right leading-tight text-charade-400">
                    Proficient in Next.js, Typescript, Tailwind, Laravel and more. <br /> I like to
                    work in small, efficient teams where I contribute <br /> to techinical
                    innovation and creative solutions.
                </p>
                <div className="absolute bottom-0 left-0 w-full h-52 z-0 bg-gradient-to-b from-transparent to-[#0D0D0F]" />
                <div className="absolute -top-40 -left-40 w-[calc(100%+20rem)] h-[calc(100%+20rem)] z-0 opacity-80">
                    <div className="absolute top-0 left-0 w-full h-full bg-noise bg-center animate-noise" />
                </div>
            </div>
            <section className="px-8 pt-6">
                <h2 className="leading-tight mt-8 mb-16 pb-6 border-b border-b-charade-800">
                    Blog
                </h2>
                <div className="flex flex-col md:flex-row justify-between gap-32 py-4">
                    <p className="text-charade-400 leading-tight">
                        Read more about my insights as <br /> a webdeveloper, latest trends <br />{' '}
                        and general development
                    </p>
                    <div className="max-w-7xl flex-1">
                        <BlogList />
                        <Link
                            className="inline-block mt-12 mb-20 text-sm border border-charade-700 px-4 py-2 rounded-lg"
                            href="/search">
                            View all blogs
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="inline-block w-4 h-4 ml-2"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Page;
