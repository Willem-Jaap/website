'use client';

import { type MouseEvent as ReactMouseEvent, useRef } from 'react';

import gsap from 'gsap';
import Link from 'next/link';
import cn from '~utils/cn';

interface Props {
    noDrag?: boolean;
    href?: string;
}

const Logo = ({ noDrag = false, href }: Props) => {
    const firstBallRef = useRef<HTMLDivElement>(null);
    const secondBallRef = useRef<HTMLDivElement>(null);
    const thirdBallRef = useRef<HTMLDivElement>(null);

    const onDrag = (e: MouseEvent) => {
        if (noDrag) return;
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

    const Component = href ? Link : 'div';
    const componentProps = href ? { href } : {};

    return (
        // @ts-expect-error Either Link or div
        <Component
            className={cn('z-40 flex items-center justify-center', {
                'cursor-pointer': href,
            })}
            onClick={onClick}
            {...componentProps}
        >
            <div ref={firstBallRef} className="z-[40] h-6 w-6 rounded-full bg-blue-300" />
            <div ref={secondBallRef} className="-ml-3 z-[41] h-6 w-6 rounded-full bg-blue-400" />
            <div
                ref={thirdBallRef}
                className={cn('-ml-3 z-[42] h-6 w-6 rounded-full bg-blue-500', {
                    'cursor-grab': !noDrag,
                })}
                onMouseDown={onMouseDown}
            />
        </Component>
    );
};

export { Logo };
