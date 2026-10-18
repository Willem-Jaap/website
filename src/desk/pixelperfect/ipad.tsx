'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

import { CM } from '~/desk/layout';
import { useIsRegionFocused } from '~/desk/region';
import cn from '~/utils/cn';

/** An iPad Pro in landscape, a little larger than life so its screens read from the desk */
export const IPAD = { width: 41 * CM, height: 31.4 * CM };
const BEZEL = 0.9 * CM;
/** The display, in world units: screens are laid out at this size */
export const SCREEN = { width: IPAD.width - BEZEL * 2, height: IPAD.height - BEZEL * 2 };

/** A swipe has to travel this far on screen (px) to turn the page */
const SWIPE = 50;

interface Screen {
    /** For the page dots and screen readers */
    label: string;
    content: ReactNode;
}

interface Props {
    x: number;
    y: number;
    rotate?: number;
    screens: Screen[];
}

const Chevron = ({ direction }: { direction: 'left' | 'right' }) => (
    <svg viewBox="0 0 24 24" className="size-[34px]" aria-hidden>
        <path
            d={direction === 'left' ? 'M15 5 8 12l7 7' : 'm9 5 7 7-7 7'}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

/**
 * An iPad lying on the mat with one screen per Pixel Perfect product. Swipe, use the arrows or
 * tap the dots to switch; while the corner isn't focused the desk pans instead.
 */
const Ipad = ({ x, y, rotate = 0, screens }: Props) => {
    const [page, setPage] = useState(0);
    const isFocused = useIsRegionFocused('pixelperfect');
    const displayRef = useRef<HTMLDivElement>(null);

    const go = (next: number) => setPage(Math.min(Math.max(next, 0), screens.length - 1));

    // Swipe between screens (data-no-pan keeps the desk from panning along)
    useEffect(() => {
        const display = displayRef.current;
        if (!display || !isFocused) return;
        let start: { x: number; y: number } | null = null;
        const onDown = (event: PointerEvent) => {
            start = { x: event.clientX, y: event.clientY };
        };
        const onUp = (event: PointerEvent) => {
            if (!start) return;
            const dx = event.clientX - start.x;
            const dy = event.clientY - start.y;
            start = null;
            if (Math.abs(dx) < SWIPE || Math.abs(dx) < Math.abs(dy)) return;
            setPage(current =>
                Math.min(Math.max(current + (dx < 0 ? 1 : -1), 0), screens.length - 1),
            );
        };
        display.addEventListener('pointerdown', onDown);
        window.addEventListener('pointerup', onUp);
        return () => {
            display.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointerup', onUp);
        };
    }, [isFocused, screens.length]);

    return (
        <div
            role="group"
            aria-roledescription="carousel"
            aria-label="An iPad showing Pixel Perfect and its products"
            className="absolute"
            style={{ left: x, top: y, ...IPAD, rotate: `${rotate}deg` }}>
            {/* Aluminium body, its edge catching the light, resting on the mat */}
            <div
                className="absolute inset-0 rounded-[92px]"
                style={{
                    background:
                        'linear-gradient(145deg, #5b5e63, #2a2c30 30%, #1c1d20 70%, #4a4d52)',
                    boxShadow: [
                        '0 2px 2px rgb(0 0 0 / 0.35)',
                        '0 30px 50px -12px rgb(0 0 0 / 0.55)',
                        '0 70px 120px -30px rgb(0 0 0 / 0.45)',
                    ].join(','),
                }}
            />
            {/* Black glass front */}
            <div className="absolute inset-[5px] rounded-[88px] bg-[#0b0b0c] shadow-[inset_0_0_0_2px_rgb(255_255_255/0.06)]" />
            {/* Front camera, in the bezel on the long top edge */}
            <div className="absolute top-[14px] left-1/2 size-[14px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#2c3a52,#0a0d14_60%)]" />

            {/* Display */}
            <div
                ref={displayRef}
                data-no-pan={isFocused || undefined}
                className="absolute overflow-hidden rounded-[56px] bg-black"
                style={{ left: BEZEL, top: BEZEL, ...SCREEN }}>
                <div
                    className="flex h-full motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                    style={{
                        width: SCREEN.width * screens.length,
                        transform: `translateX(${-page * SCREEN.width}px)`,
                    }}>
                    {screens.map((screen, index) => (
                        <section
                            key={screen.label}
                            aria-label={screen.label}
                            aria-hidden={index !== page}
                            inert={index !== page}
                            className="relative h-full shrink-0 overflow-hidden"
                            style={{ width: SCREEN.width }}>
                            {screen.content}
                        </section>
                    ))}
                </div>

                {/* Status bar */}
                <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-[44px] pt-[18px] text-[24px] font-semibold text-white mix-blend-difference">
                    <span>9:41</span>
                    <span className="flex items-center gap-[12px]">
                        <svg viewBox="0 0 24 18" className="h-[20px]" aria-hidden>
                            <path
                                d="M12 17.5 15.6 13a5.8 5.8 0 0 0-7.2 0Zm-6-7.4 2 2.4a7.6 7.6 0 0 1 8 0l2-2.4a10.8 10.8 0 0 0-12 0ZM2 5.3l2 2.4a13.9 13.9 0 0 1 16 0l2-2.4A17 17 0 0 0 2 5.3Z"
                                fill="currentColor"
                            />
                        </svg>
                        <span className="text-[22px]">84%</span>
                        <span className="relative h-[22px] w-[44px] rounded-[7px] border-2 border-current p-[2px]">
                            <span className="block h-full w-[80%] rounded-[3px] bg-current" />
                        </span>
                    </span>
                </div>

                {/* Arrows, page dots and the home indicator */}
                {page > 0 && (
                    <button
                        type="button"
                        aria-label={`Previous: ${screens[page - 1]?.label}`}
                        className="absolute top-1/2 left-[16px] grid size-[64px] -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-black/55"
                        onClick={() => go(page - 1)}>
                        <Chevron direction="left" />
                    </button>
                )}
                {page < screens.length - 1 && (
                    <button
                        type="button"
                        aria-label={`Next: ${screens[page + 1]?.label}`}
                        className="absolute top-1/2 right-[16px] grid size-[64px] -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-black/55"
                        onClick={() => go(page + 1)}>
                        <Chevron direction="right" />
                    </button>
                )}
                <div className="absolute bottom-[46px] left-1/2 flex -translate-x-1/2 gap-[16px] rounded-full bg-black/35 px-[22px] py-[14px] backdrop-blur-md">
                    {screens.map((screen, index) => (
                        <button
                            key={screen.label}
                            type="button"
                            aria-label={`Show ${screen.label}`}
                            aria-current={index === page}
                            className={cn(
                                'size-[18px] cursor-pointer rounded-full transition-colors',
                                index === page ? 'bg-white' : 'bg-white/40 hover:bg-white/70',
                            )}
                            onClick={() => go(index)}
                        />
                    ))}
                </div>
                <div className="pointer-events-none absolute bottom-[14px] left-1/2 h-[10px] w-[300px] -translate-x-1/2 rounded-full bg-white/70 mix-blend-difference" />

                {/* Glass: a soft reflection from the window */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgb(255_255_255/0.07),transparent_30%,transparent_75%,rgb(255_255_255/0.04))]" />
            </div>
        </div>
    );
};

export default Ipad;
