'use client';

import { useEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import Image from 'next/image';

import cn from '~utils/cn';

const AboutImage = () => {
    const frontLayerRef = useRef<HTMLImageElement>(null);
    const backLayerRef = useRef<HTMLImageElement>(null);
    const bannerRef = useRef<HTMLDivElement>(null);

    const [bannerInFront, setBannerInFront] = useState(false);

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

        backLayerRef.current.classList.remove('invisible');
        frontLayerRef.current.classList.remove('invisible');

        const context = gsap.context(() => {
            gsap.from(frontLayerRef.current, {
                duration: 2,
                x: 50,
                y: 50,
                scale: 1.1,
                ease: 'power3.out',
            });

            gsap.from(backLayerRef.current, {
                duration: 2.4,
                x: 64,
                y: 64,
                scale: 1.3,
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

    const onTouchStart = () => {
        setBannerInFront(!bannerInFront);
    };

    return (
        <div
            className="relative h-[60vh] sm:h-[80vh] md:h-screen overflow-hidden"
            onTouchStart={onTouchStart}>
            <div
                className="relative h-[60vh] sm:h-[80vh] md:h-screen invisible"
                ref={backLayerRef}
                onTouchStart={onTouchStart}>
                <Image
                    fill
                    src="/assets/images/layer-back-about-composition.png"
                    alt="About me"
                    className="object-cover object-center select-none w-full h-full"
                />
                <div
                    className={cn('absolute bottom-24 -rotate-[0.5deg]', {
                        'z-10': bannerInFront,
                    })}
                    onTouchStart={onTouchStart}>
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
                src="/assets/images/layer-front-about-composition.png"
                alt="About me"
                className="object-cover object-center select-none w-full h-full invisible"
                ref={frontLayerRef}
            />
        </div>
    );
};

export default AboutImage;
