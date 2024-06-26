'use client';

import { useEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import cn from '~utils/cn';

const Menu = () => {
    const [menuActive, setMenuActive] = useState<boolean | null>(null);
    const menuRef = useRef<HTMLElement>(null);
    const menuControlsRef = useRef<HTMLDivElement>(null);
    const menuCloseTextRef = useRef<HTMLSpanElement>(null);
    const menuOpenTextRef = useRef<HTMLSpanElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        if (!menuRef.current) return;
        if (menuActive === null) return;

        if (menuActive) {
            menuRef.current.classList.remove('hidden');
            gsap.set(menuRef.current, {
                x: 10,
                y: -50,
                opacity: 0,
                scale: 0.8,
            });
            gsap.to(menuRef.current, {
                duration: 0.5,
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                ease: 'power3.out',
            });

            gsap.set(menuOpenTextRef.current, {
                transform: 'translateY(2rem)',
                scale: 1,
            });
            gsap.to(menuOpenTextRef.current, {
                duration: 0.3,
                transform: 'translateY(-2rem)',
                ease: 'power3.out',
                scale: 0.8,
            });

            gsap.set(menuCloseTextRef.current, {
                transform: 'translateY(2rem)',
                scale: 0.8,
            });
            gsap.to(menuCloseTextRef.current, {
                duration: 0.3,
                transform: 'translateY(0)',
                ease: 'power3.out',
            });
            return;
        }

        gsap.set(menuRef.current, {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
        });
        gsap.to(menuRef.current, {
            duration: 0.5,
            x: 10,
            y: -50,
            opacity: 0,
            scale: 0.8,
            ease: 'power3.out',
            onComplete: () => menuRef.current?.classList.add('hidden'),
        });

        gsap.set(menuOpenTextRef.current, {
            transform: 'translateY(-2rem)',
            scale: 0.8,
        });
        gsap.to(menuOpenTextRef.current, {
            duration: 0.5,
            transform: 'translateY(0)',
            ease: 'power3.out',
        });

        gsap.set(menuCloseTextRef.current, {
            transform: 'translateY(0)',
            scale: 1,
        });
        gsap.to(menuCloseTextRef.current, {
            duration: 0.5,
            transform: 'translateY(2rem)',
            ease: 'power3.out',
            scale: 0.8,
        });
    }, [menuActive]);

    useEffect(() => {
        // If pathname changes and menu is active, close it
        if (menuActive) setMenuActive(false);
    }, [pathname]);

    useEffect(() => {
        // Close menu when escape is pressed
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMenuActive(false);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('click', handlePageClick);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('click', handlePageClick);
        };
    }, []);

    const handlePageClick = (e: MouseEvent) => {
        if (menuControlsRef.current?.contains(e.target as Node)) return;
        setMenuActive(false);
    };

    const handleButtonMouseDown = () => {
        gsap.to(menuRef.current, {
            duration: 0.1,
            scale: 0.95,
            ease: 'power3.out',
        });
    };

    const links = [
        {
            href: '/',
            text: 'Home',
        },
        {
            href: '/about',
            text: 'About',
        },
        {
            href: '/insights',
            text: 'Insights',
            matchActive: /^\/insights/,
        },
        {
            href: '/projects',
            text: 'Projects',
            matchActive: /^\/projects/,
        },
    ];

    return (
        <div className="relative" ref={menuControlsRef}>
            <button
                className="relative w-20 h-10 bg-charade-900 text-charade-50 border border-charade-700 rounded-full z-10 overflow-hidden"
                onClick={() => setMenuActive(!menuActive)}>
                <span ref={menuOpenTextRef} className="absolute inset-0 grid place-items-center">
                    Menu
                </span>
                <span
                    ref={menuCloseTextRef}
                    className="absolute inset-0 grid place-items-center translate-y-8">
                    Close
                </span>
            </button>
            <nav
                className="absolute top-12 right-0 p-6 rounded-md w-48 min-h-[10rem] bg-charade-700 hidden"
                ref={menuRef}>
                <span className="block pb-4 text-sm text-charade-400">Menu</span>
                <ul className="list-none">
                    {links.map(({ href, text, matchActive }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                className={cn('block text-lg py-1 relative text-charade-400', {
                                    'text-charade-50':
                                        pathname === href || matchActive?.test(pathname || ''),
                                })}
                                onMouseDown={handleButtonMouseDown}>
                                {text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Menu;
