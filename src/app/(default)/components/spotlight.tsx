'use client';

import { useEffect, useRef, useState } from 'react';

const Spotlight = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const gradientRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({
                x: event.clientX,
                y: event.clientY,
            });
        };

        const handleTouchMove = (event: TouchEvent) => {
            setMousePosition({
                x: event.touches[0].clientX,
                y: event.touches[0].clientY,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return (
        <>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div
                    className="absolute top-[-50vh] left-[-50vw] w-[200vw] h-[200vh]"
                    ref={gradientRef}
                    style={{
                        background: `radial-gradient(circle, transparent 0%, transparent 5%, rgba(2, 2, 3, 50%) 20%, rgba(2, 2, 3, 50%) 100%)`,
                        transform: `translate(${
                            // By default the gradient is in the center, because the gradient is 200vw and 200vh, we need to divide by 4 to get the center
                            // Then we divide by 6 to get a slower movement the greater the number
                            (mousePosition.x - (gradientRef.current?.clientWidth ?? 0) / 4) / 6
                        }px, ${
                            (mousePosition.y - (gradientRef.current?.clientHeight ?? 0) / 4) / 6
                        }px)`,
                    }}
                />
                {/* Linear gradient */}
            </div>
        </>
    );
};

export default Spotlight;
