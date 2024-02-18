'use client';

import { useContext, useEffect, useRef } from 'react';

import { ChevronRight } from '@mui/icons-material';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import ProjectsGrid from '~app/(default)/projects/components/projects-grid';
import Spotlight from '~components/misc/animation/spotlight';
import StaggeredText from '~components/misc/animation/staggered-text';
import BlogList from '~components/misc/blog-list';
import ImageWithContentOverlay from '~components/misc/image-with-content-overlay';
import Button from '~components/utils/button';
import SettingsContext from '~contexts/settings-context';
import cn from '~utils/cn';
import isMobile from '~utils/is-mobile';

const PaddedWithRandomized = dynamic(() => import('~components/misc/padded-with-randomized'), {
    ssr: false,
});

const RandomizedTextGradient = dynamic(() => import('~components/misc/randomized-text-gradient'), {
    ssr: false,
});

const Page = () => {
    const characteristicsRef = useRef<HTMLParagraphElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const backgroundTextRef = useRef<HTMLDivElement>(null);
    const settings = useContext(SettingsContext);

    useEffect(() => {
        const context = gsap.context(() => {
            if (!characteristicsRef.current || !imageRef.current) return;
            [...characteristicsRef.current.children].forEach((child, index) => {
                if (!child.children[0]) return;
                gsap.to(child.children[0], {
                    duration: 0.3,
                    y: 0,
                    delay: index * 0.1,
                });
            });

            gsap.to(imageRef.current, {
                duration: 2,
                x: 0,
                y: 0,
                scale: 1,
                ease: 'power3.out',
            });
        });

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            context.revert();
        };
    }, []);

    const handleScroll = () => {
        if (!backgroundTextRef.current) return;

        const scroll = window.scrollY;

        gsap.to(characteristicsRef.current, {
            y: scroll / 10,
            ease: 'power3.out',
            duration: 0,
        });

        gsap.to(imageRef.current, {
            y: scroll / 6,
            ease: 'power3.out',
            duration: 0,
        });

        if (isMobile()) {
            // Scroll the text horizontally on mobile
            gsap.to(backgroundTextRef.current, {
                x: -scroll,
                y: scroll / 3,
                ease: 'power3.out',
                duration: 0,
            });
            return;
        }
        gsap.to(backgroundTextRef.current, {
            y: scroll / 3,
            ease: 'power3.out',
            duration: 0,
        });
    };

    return (
        <>
            <div className="relative px-column-1 pt-48 min-h-screen bg-charade-700 max-w-[100vw] overflow-hidden">
                <p className="relative flex flex-col leading-tight z-10" ref={characteristicsRef}>
                    <span className="overflow-hidden">
                        <span className="block uppercase text-4xl translate-y-20">User first</span>
                    </span>
                    <span className="overflow-hidden">
                        <span className="block uppercase text-4xl text-charade-400 translate-y-20">
                            Frontend Engineer
                        </span>
                    </span>
                    <span className="overflow-hidden">
                        <span className="block uppercase text-4xl text-charade-400 translate-y-20">
                            Innovative & creative
                        </span>
                    </span>
                </p>
                <h1
                    className="uppercase text-[14rem] max-sm:text-[10rem] text-charade-600 whitespace-nowrap select-none"
                    ref={backgroundTextRef}>
                    <StaggeredText text="Willem-Jaap" />
                </h1>
                <Spotlight />
                <span className="absolute top-0 left-0 max-sm:top-40 max-sm:w-[200%] max-sm:-left-1/2 w-full min-h-screen">
                    <Image
                        fill
                        priority
                        ref={imageRef}
                        src="/assets/images/portfolio-hero.png"
                        alt="Portfolio hero image of Willem-Jaap"
                        className="object-contain object-center mt-12"
                        // Initial animation position.
                        style={{ transform: 'translate(50px, 50px) scale(1.1)' }}
                    />
                </span>
                <p className="relative max-sm:invisible z-10 mt-24 text-right leading-tight text-charade-400">
                    Proficient in Next.js, Typescript, Tailwind, Laravel and more. <br /> I like to
                    work in small, efficient teams where I contribute <br /> to technical innovation
                    and creative solutions.
                </p>
                <div className="absolute bottom-0 left-0 w-full h-52 z-0 bg-gradient-to-b from-transparent to-[#0D0D0F]" />
                <div className="absolute -top-40 -left-40 w-[calc(100%+20rem)] h-[calc(100%+20rem)] z-0 opacity-80">
                    <div
                        className={cn('absolute top-0 left-0 w-full h-full  bg-center opacity-80', {
                            'bg-noise animate-noise': settings.get('noise'),
                        })}
                    />
                </div>
            </div>
            <section className="px-column-1 pb-24 border-t border-t-charade-800 bg-charade-900">
                <div className="pt-24 pb-16 border-b border-b-charade-800">
                    <PaddedWithRandomized text="Blog" />
                </div>
                <div className="flex flex-col gap-4 mt-16 md:mt-32">
                    <div className="flex flex-col md:flex-row justify-between gap-24 md:gap-32 py-4">
                        <p className="text-charade-400 leading-tight text-lg">
                            Read more about my insights as <br /> a webdeveloper, latest trends{' '}
                            <br /> and general development
                        </p>
                        <div className="max-w-7xl flex-1">
                            <BlogList />
                            <Button href="/blog" className="my-10 md:mb-20 group">
                                View all blogs
                                <ChevronRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="px-column-1 border-t border-t-charade-800">
                <div className="pt-24 pb-16 border-b border-b-charade-800">
                    <PaddedWithRandomized text="About me" />
                </div>
                <div className="flex flex-col gap-4 py-24 max-w-5xl mx-auto">
                    <span className="uppercase text-charade-500 font-semibold">Introduction</span>
                    <p className="text-charade-100 text-lg mb-8">
                        I&apos;m Willem-Jaap, a 20-year-old software developer with a deep passion
                        for technology and a constant drive for improving my skills. I&apos;ve spent
                        several years in the software development field and recently founded Pixel
                        Perfect Agency. Our focus is creating fast, beautiful, and efficient
                        software solutions to streamline processes and boost efficiency. In my free
                        time, when I&apos;m not coding, you can often find me in the kitchen or
                        hitting weights in the gym.
                    </p>
                    <Button href="/about" className="mb-20 group">
                        More about me
                        <ChevronRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                    <RandomizedTextGradient />
                    <ImageWithContentOverlay
                        src="/assets/images/portrait-willem-jaap.png"
                        alt="Portrait of Willem-Jaap">
                        <div className="flex flex-col gap-4 text-center max-w-xl">
                            <h3 className="text-3xl uppercase">Founder & Software Developer</h3>
                            <p className="leading-tight text-charade-400 text-lg">
                                I&apos;m the founder of Pixel Perfect Agency where we create
                                beautiful and efficient software solutions using the latest
                                technologies.
                            </p>
                        </div>
                    </ImageWithContentOverlay>
                </div>
            </section>
            <section className="px-column-1 pb-24 border-t border-t-charade-800 bg-charade-900">
                <div className="pt-24 pb-16 border-b border-b-charade-800">
                    <PaddedWithRandomized text="Projects" />
                </div>
                <div className="flex flex-col gap-4 mt-16 md:mt-32">
                    <div className="max-w-7xl flex-1">
                        <ProjectsGrid />
                        <Button href="/projects" className="mt-10 mb-20 groep">
                            View all projects
                            <ChevronRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Page;
