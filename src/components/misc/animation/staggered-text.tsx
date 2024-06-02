'use client';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';

interface Props {
    text: string;
}
const StaggeredText = ({ text }: Props) => {
    const staggeredTextRef = useRef<HTMLDivElement>(null);
    const letters = text.split('').map((letter, index) => {
        return (
            <div className="relative inline-block" key={index}>
                {letter}
            </div>
        );
    });

    useEffect(() => {
        if (!staggeredTextRef.current) return;

        staggeredTextRef.current.classList.remove('invisible');

        const context = gsap.context(() => {
            if (!staggeredTextRef.current) return;

            // Animate staggered text in from right
            gsap.from(staggeredTextRef.current, {
                duration: 1.5,
                x: '80%',
                ease: 'power3.out',
            });

            gsap.from(staggeredTextRef.current.children, {
                duration: 0.8,
                y: 100,
                opacity: 0,
                stagger: 0.1,
                ease: 'power3.inOut',
            });
        });

        return () => {
            context.revert();
        };
    }, []);

    return (
        <div className="invisible" ref={staggeredTextRef}>
            {letters}
        </div>
    );
};

export default StaggeredText;
