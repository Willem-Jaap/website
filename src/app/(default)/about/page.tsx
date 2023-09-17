import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
    const birthday = new Date(2003, 6, 16);
    const age =
        new Date().getMonth() >= birthday.getMonth() && new Date().getDate() >= birthday.getDate()
            ? new Date().getFullYear() - birthday.getFullYear()
            : new Date().getFullYear() - birthday.getFullYear() - 1;

    return (
        <>
            <div className="relative flex flex-col justify-center px-column-1 min-h-screen bg-charade-700 overflow-hidden">
                <p className="relative flex flex-col text-4xl uppercase leading-tight z-10">
                    <span className="text-charade-400">
                        Crafting the most <span className="text-charade-50">efficient</span>
                    </span>

                    <span className="text-charade-400">
                        and <span className="text-charade-50">beautiful </span> user
                    </span>

                    <span className="text-charade-400"> experiences</span>
                </p>
                <Image
                    fill
                    src="/assets/images/about-work.png"
                    alt="About me"
                    className="object-contain object-bottom select-none w-full h-full max-h-[80vh] mt-auto"
                />
                <div className="absolute inset-0 bg-charade-950/70" />
                <div className="absolute bottom-0 left-0 w-full h-52 z-0 bg-gradient-to-b from-transparent to-[#0D0D0F]" />
                <div className="absolute -top-40 -left-40 w-[calc(100%+20rem)] h-[calc(100%+20rem)] z-0 opacity-80">
                    <div className="absolute top-0 left-0 w-full h-full bg-noise bg-center animate-noise" />
                </div>
            </div>
            <section className="px-column-1 py-6 bg-charade-900 text-charade-300 max-w-4xl">
                <h2 className="leading-tight mt-8 mb-16 pb-6 border-b text-charade-50 border-b-charade-800">
                    About me
                </h2>
                <p className="mb-4">
                    Hi, I&apos;m Willem-Jaap, a frontend engineer from the Netherlands. I&apos;m a
                    creative and critical thinker, always looking for the most efficient and
                    beautiful solutions.
                </p>
                <p className="mb-4">
                    I was born in 2003 (which makes me {age} years old) in the Netherlands.
                    I&apos;ve always been interested in technology and the way anything works. I
                    started programming at the age of 15 using self-taught HTML and CSS and
                    Javascript. It was a logical step for me to study Application- and Media
                    Development at Hoornbeeck College in Rotterdam. During my study I&apos;ve
                    learned a lot about programming and also did a lot of self study. I
                    overengineered a lot of projects and learned a lot from that.
                </p>
                <p>During my years of programming I&apos;ve have mostly with the following tech:</p>
                <ul className="list-disc list-inside">
                    <li>Next.js</li>
                    <li>Typescript</li>
                    <li>Tailwind</li>
                    <li>Laravel</li>
                    <li>React</li>
                </ul>
                <p className="mt-4">
                    I am the founder and CEO of{' '}
                    <Link
                        href="https://pixelperfect.agency"
                        className="underline hover:text-charade-200"
                        target="_blank"
                        rel="noreferrer">
                        Pixel Perfect Agency
                    </Link>
                    , a softwaredevelopment agency based in the Netherlands that focuses on creating
                    beautiful and efficient websites for small businesses.
                </p>
                <p className="mt-4">
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
            </section>
        </>
    );
};

export default Page;
