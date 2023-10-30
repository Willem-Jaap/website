'use client';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';
import Link from 'next/link';

import Logo from '~components/misc/logo';

const Footer = () => {
    const footerRef = useRef<HTMLElement>(null);
    const handleScroll = () => {
        if (!footerRef.current) return;

        const { height, top } = footerRef.current.getBoundingClientRect();

        if (top < window.innerHeight && top + height > 0) {
            // The amount of pixels the footer is in view
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

    return (
        <footer id="footer" className="border-t border-t-charade-700" ref={footerRef}>
            <div className="flex gap-4 justify-between mx-8 mt-36 mb-12">
                <div className="flex items-center gap-6">
                    <Logo />
                    Willem-Jaap
                </div>
                <button
                    className="inline-block py-2 px-5 rounded-full border border-charade-700"
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        });
                    }}>
                    Back to top
                </button>
            </div>
            <div className="flex gap-4 justify-between mx-8 py-8  border-y border-y-charade-700">
                <div className="flex-1 flex gap-12 my-24 items-center justify-center">
                    <div className="h-32 w-32 rounded-full border border-charade-700">
                        {/* Arrow pointing left down */}
                    </div>
                    <div className="text-6xl uppercase">Visit pixelperfect.agency</div>
                </div>
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
                                <Link href="/blog">Blog</Link>
                            </li>
                            <li>
                                <Link href="/projects">Projects</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 mx-8 mt-8 mb-12 text-sm">
                <div className="flex gap-16">
                    <span className="text-charade-500">Built by </span>
                    <span className="text-charade-400">Me</span>
                </div>
                <div className="flex gap-16">
                    <span className="text-charade-500">Design by </span>
                    <span className="text-charade-400">Joan Verhulst</span>
                </div>

                <div className="col-span-2 flex justify-end gap-12 text-charade-400 text-right">
                    <Link href="/privacy">Privacy Policy</Link>
                    &copy; {new Date().getFullYear()} Willem-Jaap
                </div>
            </div>
        </footer>
    );
};

export default Footer;
