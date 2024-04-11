'use client';

import { useEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import Image from 'next/image';

import cn from '~utils/cn';

interface Props {
    title: string;
    description: string;
    src: string;
    alt: string;
    className?: string;
}

const ImageWithContentOverlay = ({ title, description, src, alt, className }: Props) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState<boolean | null>(null);

    useEffect(() => {
        console.log('active', active);
        if (active === null) {
            return;
        }

        if (active) {
            gsap.to(overlayRef.current, {
                duration: 0.5,
                opacity: 1,
                ease: 'power3.out',
            });

            gsap.to(titleRef.current, {
                duration: 0.3,
                yPercent: -100,
                ease: 'power4.out',
            });
            gsap.to(descriptionRef.current, {
                duration: 0.3,
                yPercent: -100,
                ease: 'power4.out',
                delay: 0.1,
            });
            return;
        }
        gsap.to(overlayRef.current, {
            duration: 0.5,
            opacity: 0,
            ease: 'power3.out',
        });

        gsap.to(titleRef.current, {
            duration: 0.3,
            yPercent: 0,
            ease: 'power4.out',
            delay: 0.1,
        });
        gsap.to(descriptionRef.current, {
            duration: 0.3,
            yPercent: 0,
            ease: 'power4.out',
        });
    }, [active]);

    return (
        <div
            className={cn(
                'relative overflow-hidden rounded-2xl h-[40vh] md:h-[50vh] min-h-[20rem] border border-charade-800',
                className,
            )}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            onTouchStart={() => setActive(!active)}>
            <Image src={src} alt={alt} quality={100} fill className="object-cover" />
            <div className="absolute inset-0  bg-charade-900/75 opacity-0" ref={overlayRef} />
            <div className="absolute inset-0 p-4 grid place-items-center items-center">
                <div className="flex flex-col gap-4 text-center max-w-xl">
                    <div className="overflow-hidden">
                        <h3 className="text-3xl uppercase translate-y-full" ref={titleRef}>
                            {title}
                        </h3>
                    </div>
                    <div className="overflow-hidden">
                        <p
                            className="leading-tight text-charade-200 text-lg translate-y-full"
                            ref={descriptionRef}>
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageWithContentOverlay;
