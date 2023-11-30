'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import Image from 'next/image';

import cn from '~utils/cn';

interface Props {
    children: ReactNode;
    src: string;
    alt: string;
    className?: string;
}

const ImageWithContentOverlay = ({ children, src, alt, className }: Props) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (active) {
            gsap.to(overlayRef.current, {
                duration: 0.5,
                opacity: 1,
                ease: 'power3.out',
            });

            // Animate the children of the overlay staggered
            if (!overlayRef.current?.children || !overlayRef.current.children[0]) return;
            const children =
                overlayRef.current.children.length > 1
                    ? overlayRef.current.children
                    : overlayRef.current.children[0].children;

            gsap.from(children, {
                duration: 0.3,
                y: 20,
                opacity: 0,
                stagger: 0.1,
                ease: 'power4.out',
            });
            return;
        }
        gsap.to(overlayRef.current, {
            duration: 0.5,
            opacity: 0,
            ease: 'power3.out',
        });
    }, [active]);

    return (
        <div
            className={cn(
                'relative overflow-hidden rounded-2xl h-[40vh] md:h-[60vh] min-h-[20rem] border border-charade-800',
                className,
            )}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            onTouchStart={() => setActive(!active)}>
            <Image src={src} alt={alt} fill className="object-cover" />
            <div
                className="absolute inset-0 p-4 grid place-items-center items-center bg-charade-900/75 opacity-0"
                ref={overlayRef}>
                {children}
            </div>
        </div>
    );
};

export default ImageWithContentOverlay;
