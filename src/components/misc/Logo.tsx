'use client';

import { type MouseEvent as ReactMouseEvent, useRef } from 'react';

import gsap from 'gsap';
import Link from 'next/link';

const Logo = () => {
    const firstBallRef = useRef<HTMLDivElement>(null);
    const secondBallRef = useRef<HTMLDivElement>(null);
    const thirdBallRef = useRef<HTMLDivElement>(null);

    const onDrag = (e: MouseEvent) => {
        e.preventDefault();
        const firstBall = firstBallRef.current;
        const secondBall = secondBallRef.current;
        const thirdBall = thirdBallRef.current;

        // Translate balls in direction of mouse, first ball moves the most, third ball moves the least
        gsap.to(firstBall, { x: e.clientX / 30, y: e.clientY / 30 });
        gsap.to(secondBall, { x: e.clientX / 20, y: e.clientY / 20 });
        gsap.to(thirdBall, { x: e.clientX / 10, y: e.clientY / 10 });
    };

    const onMouseDown = (e: ReactMouseEvent) => {
        e.preventDefault();
        window.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', onMouseUp);
    };

    const onMouseUp = (e: MouseEvent) => {
        e.preventDefault();
        window.removeEventListener('mousemove', onDrag);

        // Reset balls to original position
        const firstBall = firstBallRef.current;
        const secondBall = secondBallRef.current;
        const thirdBall = thirdBallRef.current;

        gsap.to(firstBall, { x: 0, y: 0, ease: 'elastic.out(1, 0.3)', duration: 1 });
        gsap.to(secondBall, { x: 0, y: 0, ease: 'elastic.out(1, 0.3)', duration: 1 });
        gsap.to(thirdBall, { x: 0, y: 0, ease: 'elastic.out(1, 0.3)', duration: 1 });
    };

    const onClick = () => {
        // Translate balls up and down to simulate a click
        const firstBall = firstBallRef.current;
        const secondBall = secondBallRef.current;
        const thirdBall = thirdBallRef.current;

        gsap.to(firstBall, { y: -10 });
        gsap.to(secondBall, { y: -10, delay: 0.1 });
        gsap.to(thirdBall, { y: -10, delay: 0.2 });
        gsap.to(firstBall, { y: 0, ease: 'elastic.out(1, 0.3)', duration: 0.8, delay: 0.1 });
        gsap.to(secondBall, { y: 0, ease: 'elastic.out(1, 0.3)', duration: 0.8, delay: 0.2 });
        gsap.to(thirdBall, { y: 0, ease: 'elastic.out(1, 0.3)', duration: 0.8, delay: 0.3 });
    };

    return (
        <Link
            href="/"
            className="flex items-center justify-center z-40 cursor-pointer"
            onClick={onClick}>
            <div ref={firstBallRef} className="w-6 h-6 bg-gray-400 rounded-full" />
            <div ref={secondBallRef} className="w-6 h-6 -ml-3 bg-gray-300 rounded-full" />
            <div
                ref={thirdBallRef}
                className="w-6 h-6 -ml-3 bg-gray-200 rounded-full cursor-grab"
                onMouseDown={onMouseDown}
            />
        </Link>
    );
};

export default Logo;
