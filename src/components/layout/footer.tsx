'use client';

import { type MouseEvent, useEffect, useRef } from 'react';

import { ArrowOutwardOutlined, ChevronRightOutlined, SettingsOutlined } from '@mui/icons-material';
import gsap from 'gsap';
import Link from 'next/link';

import Logo from '~components/misc/logo';

const Footer = () => {
    const footerRef = useRef<HTMLElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const handleScroll = () => {
        if (!footerRef.current) return;

        const { height, top } = footerRef.current.getBoundingClientRect();

        if (top < window.innerHeight && top + height > 0 && !(window.scrollY < height)) {
            const pixelsInView = window.innerHeight - top;

            gsap.to('#header', {
                y: -pixelsInView / 2,
            });
            return;
        }

        gsap.to('#header', {
            y: 0,
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const onMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!arrowRef.current || !textRef.current) return;

        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;

        gsap.to(arrowRef.current, {
            duration: 1,
            x: x / 10,
            y: y / 10,
            ease: 'elastic.out(1, 0.3)',
        });

        gsap.to(textRef.current, {
            duration: 1,
            x: x / 20,
            y: y / 20,
            ease: 'elastic.out(1, 0.3)',
        });
    };

    const onMouseLeave = () => {
        if (!arrowRef.current || !textRef.current) return;

        gsap.to(arrowRef.current, {
            duration: 1,
            rotate: 0,
            x: 0,
            y: 0,
            ease: 'elastic.out(1, 0.3)',
        });

        gsap.to(textRef.current, {
            duration: 1,
            x: 0,
            y: 0,
            ease: 'elastic.out(1, 0.3)',
        });
    };

    return (
        <footer id="footer" className="border-t border-t-charade-700" ref={footerRef}>
            <div className="flex gap-8 justify-between mx-8 mt-24 sm:mt-36 mb-12">
                <div className="flex items-center gap-6">
                    <Logo />
                    <div className="max-sm:hidden">Willem-Jaap</div>
                </div>
                <div className="flex gap-4">
                    <Link
                        className="grid place-items-center p-2 border border-charade-700 hover:border-charade-600 focus:border-charade-500 text-charade-400 hover:text-charade-300 rounded-full group"
                        href="/settings">
                        <SettingsOutlined className="group-hover:animate-[spin_800ms_ease-in-out]" />
                    </Link>
                    <button
                        className="inline-block w-fit py-2 px-5 rounded-full border border-charade-700 hover:border-charade-600 focus:border-charade-500 group whitespace-nowrap"
                        onClick={() => {
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth',
                            });
                        }}>
                        Back to top
                        <ChevronRightOutlined className="text-neutral-200 ml-2 -rotate-90" />
                    </button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-x-8 justify-between mx-8 py-8  border-y border-y-charade-700">
                <Link
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    href="https://pixelperfect.agency"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex flex-col md:flex-row gap-6 md:gap-12 pb-12 md:py-24 items-start md:items-center justify-center">
                    <div
                        className="grid place-items-center aspect-square h-16 w-16 md:h-16 md:w-16 lg:h-32 lg:w-32 rounded-full border border-charade-700"
                        ref={arrowRef}>
                        <ArrowOutwardOutlined className="rotate-90 text-5xl" />
                    </div>
                    <div className="text-2xl lg:text-6xl uppercase" ref={textRef}>
                        Visit pixelperfect.agency
                    </div>
                </Link>
                <div className="min-w-[16rem] grid grid-cols-2 gap-x-6">
                    <div>
                        <div className="text-charade-300 mb-8">Socials</div>
                        <ul className="flex flex-col gap-4">
                            <li>
                                <a
                                    href="https://github.com/willem-jaap/"
                                    target="_blank"
                                    rel="noreferrer">
                                    Github
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://linkedin.com/in/willem-jaap/"
                                    target="_blank"
                                    rel="noreferrer">
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://twitter.com/willemjaap_"
                                    target="_blank"
                                    rel="noreferrer">
                                    Twitter
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div className="text-charade-300 mb-8">Sitemap</div>
                        <ul className="flex flex-col gap-4">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/about">About</Link>
                            </li>
                            <li>
                                <Link href="/insights">Insight</Link>
                            </li>
                            <li>
                                <Link href="/projects">Projects</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="block sm:grid sm:grid-cols-2 md:grid-cols-4 gap-4 mx-8 mt-8 mb-12 text-sm">
                <div className="flex gap-8 max-sm:grid max-sm:grid-cols-4 lg:gap-16 whitespace-nowrap">
                    <span className="text-charade-500">Built by </span>
                    <span className="text-charade-400">Me</span>
                </div>
                <div className="flex gap-8 max-sm:grid max-sm:grid-cols-4 lg:gap-16 whitespace-nowrap">
                    <span className="text-charade-500">Design by </span>
                    <span className="text-charade-400">Joan Verhulst</span>
                </div>

                <div className="col-span-2 flex justify-between flex-wrap md:justify-end gap-x-12 gap-y-4 mt-4 sm:mt-0 text-charade-400 text-right">
                    <span>&copy; {new Date().getFullYear()} Willem-Jaap</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
