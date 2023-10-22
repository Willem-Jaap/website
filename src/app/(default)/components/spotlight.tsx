'use client';

import { useEffect, useRef } from 'react';

import { gsap } from 'gsap';

const Spotlight = () => {
    const gradientRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const animateTo = (x: number, y: number) => {
            gsap.to(gradientRef.current, {
                duration: 0.5,
                x: (x - window.innerWidth / 2) / 6,
                y: (y - window.innerHeight / 2) / 6,
                ease: 'power3.out',
            });
        };

        const handleMouseMove = (event: MouseEvent) => {
            animateTo(event.clientX, event.clientY);
        };

        const handleTouchMove = (event: TouchEvent) => {
            animateTo(event.touches[0].clientX, event.touches[0].clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);

        gradientRef.current?.classList.remove('invisible');

        const context = gsap.context(() => {
            gsap.from(gradientRef.current, {
                duration: 2,
                opacity: 0,
                scale: 0.4,
                ease: 'power3.out',
            });
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            context.revert();
        };
    }, []);

    return (
        <>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div
                    className="absolute top-[-50vh] left-[-50vw] w-[200vw] h-[200vh] invisible"
                    ref={gradientRef}
                    style={{
                        background: `radial-gradient(circle, transparent 0%, transparent 5%, rgba(2, 2, 3, 50%) 20%, rgba(2, 2, 3, 50%) 100%)`,
                    }}
                />
            </div>
        </>
    );
};

export default Spotlight;
