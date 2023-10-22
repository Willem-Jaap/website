'use client';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';

import Menu from '~components/layout/menu';
import Logo from '~components/misc/Logo';

const Header = () => {
    const headerRef = useRef<HTMLDivElement>(null);
    const borderRightHalfRef = useRef<HTMLDivElement>(null);
    const borderLeftHalfRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        // Decrease header padding top when scrolling down
        const scrollTop = window.scrollY;

        gsap.to(headerRef.current, {
            paddingTop: 40 - (scrollTop / 20 > 16 ? 16 : scrollTop / 20),
            paddingBottom: 40 - (scrollTop / 20 > 16 ? 16 : scrollTop / 20),
            duration: 0.5,
            ease: 'power2.out',
        });

        // Animate border to width 0 when scrolling down
        const borderRightHalfWidth = 50 - (scrollTop / 1.1 > 50 ? 50 : scrollTop / 1.1);
        const borderLeftHalfWidth = 50 - (scrollTop / 1.1 > 50 ? 50 : scrollTop / 1.1);

        gsap.to(borderRightHalfRef.current, {
            width: `${borderRightHalfWidth}%`,
            duration: 0.5,
            ease: 'power2.out',
        });
        gsap.to(borderLeftHalfRef.current, {
            width: `${borderLeftHalfWidth}%`,
            duration: 0.5,
            ease: 'power2.out',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full z-20">
            <div className="flex gap-4 justify-between mx-8 py-10" ref={headerRef}>
                <div className="flex items-center gap-6">
                    <Logo />
                </div>
                <Menu />
            </div>
            <div
                className="absolute bottom-0 left-8 w-[50%] h-[1px] bg-charade-700"
                ref={borderLeftHalfRef}
            />
            <div
                className="absolute bottom-0 right-8 w-[50%] h-[1px] bg-charade-700"
                ref={borderRightHalfRef}
            />
        </div>
    );
};

export default Header;
