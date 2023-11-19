'use client';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';
import Image from 'next/image';

const AboutImage = () => {
    const frontLayerRef = useRef<HTMLImageElement>(null);
    const backLayerRef = useRef<HTMLImageElement>(null);
    const bannerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        const scroll = window.scrollY;

        gsap.to(frontLayerRef.current, {
            y: scroll / 2.5,
            duration: 0,
            ease: 'power2.out',
        });

        gsap.to(backLayerRef.current, {
            y: scroll / 2,
            duration: 0,
            ease: 'power2.out',
        });
    };

    useEffect(() => {
        if (!backLayerRef.current || !frontLayerRef.current) return;

        const context = gsap.context(() => {
            gsap.to(frontLayerRef.current, {
                duration: 2,
                x: 0,
                y: 0,
                scale: 1,
                ease: 'power3.out',
            });

            gsap.to(backLayerRef.current, {
                duration: 2.4,
                x: 0,
                y: 0,
                scale: 1,
                ease: 'power3.out',
            });

            gsap.to(bannerRef.current, {
                x: '-50%',
                duration: 4,
                ease: 'power4.out',
                onComplete: () => {
                    gsap.set(bannerRef.current, {
                        x: '0%',
                    });
                    gsap.to(bannerRef.current, {
                        x: '-50%',
                        duration: 120,
                        ease: 'none',
                        repeat: -1,
                    });
                },
            });
        });

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            context.revert();
        };
    }, []);

    return (
        <div className="relative h-[60vh] sm:h-[80vh] md:h-screen overflow-hidden">
            <div
                className="relative h-[60vh] sm:h-[80vh] md:h-screen"
                ref={backLayerRef}
                // Initial animation position.
                style={{ transform: 'translateY(50px) translateX(50px) scale(1.1)' }}>
                <Image
                    fill
                    src="/assets/images/layer-back-about-composition.png"
                    alt="About me"
                    className="object-cover object-center select-none w-full h-full"
                />
                <div className={'absolute bottom-24 -rotate-[0.5deg]'}>
                    <div
                        className="text-charade-900 bg-charade-50 p-4 whitespace-nowrap select-none"
                        ref={bannerRef}>
                        <span className="uppercase text-6xl">
                            Hi there, nice to meet you! I&apos;m Willem-Jaap, a frontend engineer
                            from the Netherlands.{' '}
                        </span>
                        <span className="uppercase text-6xl">
                            Hi there, nice to meet you! I&apos;m Willem-Jaap, a frontend engineer
                            from the Netherlands.
                        </span>
                    </div>
                </div>
            </div>
            <Image
                fill
                alt="About me"
                src="/assets/images/layer-front-about-composition.png"
                className="object-cover object-center select-none w-full h-full"
                // Initial animation position.
                style={{ transform: 'translateY(50px) translateX(50px) scale(1.1)' }}
                ref={frontLayerRef}
            />
        </div>
    );
};

export default AboutImage;
