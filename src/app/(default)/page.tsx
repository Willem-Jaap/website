'use client';

import { useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import ProjectsGrid from '~app/(default)/projects/components/projects-grid';
import Spotlight from '~components/misc/animation/spotlight';
import StaggeredText from '~components/misc/animation/staggered-text';
import BlogList from '~components/misc/blog-list';
import ImageWithContentOverlay from '~components/misc/image-with-content-overlay';
import Button from '~components/utils/button';

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

    useEffect(() => {
        if (!characteristicsRef.current || !imageRef.current) return;

        characteristicsRef.current.classList.remove('invisible');
        imageRef.current.classList.remove('invisible');

        const context = gsap.context(() => {
            if (!characteristicsRef.current || !imageRef.current) return;

            gsap.from(characteristicsRef.current.children, {
                duration: 0.5,
                y: 40,
                opacity: 0,
                stagger: 0.2,
                ease: 'power4.inOut',
            });

            gsap.from(imageRef.current, {
                duration: 2,
                x: 50,
                y: 50,
                scale: 1.1,
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

        gsap.to(backgroundTextRef.current, {
            y: scroll / 3,
            ease: 'power3.out',
            duration: 0,
        });

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
    };

    return (
        <>
            <div className="relative px-column-1 pt-48 min-h-screen bg-charade-700 max-w-[100vw] overflow-hidden">
                <p
                    className="relative invisible flex flex-col text-4xl uppercase leading-tight z-10"
                    ref={characteristicsRef}>
                    <span>User first</span>
                    <span className="text-charade-400">Frontend Engineer</span>
                    <span className="text-charade-400">Innovative & creative</span>
                </p>
                <h1
                    className="uppercase text-[14rem] text-charade-600 whitespace-nowrap select-none"
                    ref={backgroundTextRef}>
                    <StaggeredText text="Willem-Jaap" />
                </h1>
                <Spotlight />
                <Image
                    fill
                    priority
                    ref={imageRef}
                    src="/assets/images/portfolio-hero.png"
                    alt="Portfolio hero image of Willem-Jaap"
                    className="invisible object-contain object-center w-full h-full mt-12"
                />
                <p className="relative z-10 mt-24 text-right leading-tight text-charade-400">
                    Proficient in Next.js, Typescript, Tailwind, Laravel and more. <br /> I like to
                    work in small, efficient teams where I contribute <br /> to technical innovation
                    and creative solutions.
                </p>
                <div className="absolute bottom-0 left-0 w-full h-52 z-0 bg-gradient-to-b from-transparent to-[#0D0D0F]" />
                <div className="absolute -top-40 -left-40 w-[calc(100%+20rem)] h-[calc(100%+20rem)] z-0 opacity-80">
                    <div className="absolute top-0 left-0 w-full h-full bg-noise bg-center animate-noise opacity-80" />
                </div>
            </div>
            <section className="px-column-1 pb-24 border-t border-t-charade-800 bg-charade-900">
                <div className="pt-24 pb-16 border-b border-b-charade-800">
                    <PaddedWithRandomized text="Blog" />
                </div>
                <div className="flex flex-col gap-4 mt-32">
                    <div className="flex flex-col md:flex-row justify-between gap-32 py-4">
                        <p className="text-charade-400 leading-tight text-lg">
                            Read more about my insights as <br /> a webdeveloper, latest trends{' '}
                            <br /> and general development
                        </p>
                        <div className="max-w-7xl flex-1">
                            <BlogList />
                            <Button href="/blog" className="mt-10 mb-20">
                                View all blogs
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
                        for technology and a constant drive for self-improvement. I&apos;ve spent
                        several years in the software development field and recently founded Pixel
                        Perfect Agency. Our focus is creating fast, beautiful, and efficient
                        software solutions to streamline processes and boost efficiency. In my free
                        time, when I&apos;m not coding, you can often find me in the kitchen or
                        hitting weights in the gym.
                    </p>
                    <Button href="/about" className="mb-20">
                        Read more
                    </Button>
                    <RandomizedTextGradient />
                    <ImageWithContentOverlay
                        src="/assets/images/portrait-willem-jaap.png"
                        alt="Portrait of Willem-Jaap">
                        <div className="flex flex-col gap-4 text-center max-w-xl">
                            <h3 className="text-3xl uppercase">Founder & CEO</h3>
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
                <div className="flex flex-col gap-4 mt-32">
                    <div className="max-w-7xl flex-1">
                        <ProjectsGrid />
                        <Button href="/projects" className="mt-10 mb-20">
                            View all projects
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Page;
