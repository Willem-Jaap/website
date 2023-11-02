'use client';

import { useEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { usePathname } from 'next/navigation';

import Menu from '~components/layout/menu';
import Logo from '~components/misc/logo';

const Header = () => {
    const headerRef = useRef<HTMLDivElement>(null);
    const borderRightHalfRef = useRef<HTMLDivElement>(null);
    const borderLeftHalfRef = useRef<HTMLDivElement>(null);
    const [shouldRenderLines, setShouldRenderLines] = useState(true);
    const pathname = usePathname();

    const handleScroll = () => {
        if (!shouldRenderLines) return;
        const scrollTop = window.scrollY;

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
        if (!shouldRenderLines) return;

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [shouldRenderLines]);

    // Pathnames that should not have lines for the menu
    const noLines = ['/about'];

    useEffect(() => {
        // If pathname is in noLines, don't render lines
        if (noLines.includes(pathname) && shouldRenderLines) {
            setShouldRenderLines(false);
        }

        // If pathname is not in noLines, render lines
        if (!noLines.includes(pathname) && !shouldRenderLines) {
            setShouldRenderLines(true);
        }
    }, [pathname]);

    return (
        <header id="header" className="fixed top-0 left-0 w-full z-20">
            <div className="flex gap-4 justify-between mx-8 pt-10 pb-7" ref={headerRef}>
                <div className="flex items-center gap-6">
                    <Logo />
                </div>
                <Menu />
            </div>
            {shouldRenderLines && (
                <>
                    <div
                        className="absolute bottom-0 left-8 w-[50%] h-[1px] bg-charade-700"
                        ref={borderLeftHalfRef}
                    />
                    <div
                        className="absolute bottom-0 right-8 w-[50%] h-[1px] bg-charade-700"
                        ref={borderRightHalfRef}
                    />
                </>
            )}
        </header>
    );
};

export default Header;
