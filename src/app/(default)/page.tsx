import Image from 'next/image';

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
            <section className="mx-8 pt-6">
                <h2 className="text-2xl leading-tight my-8 pb-6 border-b border-b-charade-800">
                    Blog
                </h2>
                <div className="flex justify-between gap-32 py-12">
                    <p className="text-charade-400 leading-tight">
                        Read more about my insights as <br /> a webdeveloper, latest trends <br />{' '}
                        and general development
                    </p>
                    <div className="flex-1">
                        <BlogList />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Page;
