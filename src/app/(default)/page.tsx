'use client';

import { useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

import Spotlight from '~app/(default)/components/spotlight';
import BlogList from '~components/misc/BlogList';
import StaggeredText from '~components/misc/animation/StaggeredText';

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
            duration: 0.5,
            y: scroll / 3,
            ease: 'power3.out',
        });

        gsap.to(characteristicsRef.current, {
            duration: 0.5,
            y: scroll / 10,
            ease: 'power3.out',
        });

        gsap.to(imageRef.current, {
            duration: 0.5,
            y: scroll / 6,
            ease: 'power3.out',
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
                    work in small, efficient teams where I contribute <br /> to techinical
                    innovation and creative solutions.
                </p>
                <div className="absolute bottom-0 left-0 w-full h-52 z-0 bg-gradient-to-b from-transparent to-[#0D0D0F]" />
                <div className="absolute -top-40 -left-40 w-[calc(100%+20rem)] h-[calc(100%+20rem)] z-0 opacity-80">
                    <div className="absolute top-0 left-0 w-full h-full bg-noise bg-center animate-noise opacity-80" />
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
                            href="/blog">
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
            <div className="p-96" />
        </>
    );
};

export default Page;
