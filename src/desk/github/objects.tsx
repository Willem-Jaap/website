import type { CSSProperties } from 'react';

import cn from '~/utils/cn';

interface Placed {
    x: number;
    y: number;
    rotate?: number;
    className?: string;
}

/** Position an object relative to the region, in world units */
export const place = ({ x, y, rotate = 0 }: Placed): CSSProperties => ({
    left: x,
    top: y,
    transform: `rotate(${rotate}deg)`,
});

const TAPE_COLORS = {
    cream: 'rgb(244 232 196 / 0.72)',
    mint: 'rgb(190 228 212 / 0.66)',
    pink: 'rgb(246 200 208 / 0.66)',
};

/** Ragged, torn-off ends for a strip of tape */
const tornEdge = (steps: number) => {
    const left = Array.from(
        { length: steps + 1 },
        (_, i) => `${i % 2 ? 3 : 0}% ${(i / steps) * 100}%`,
    );
    const right = Array.from(
        { length: steps + 1 },
        (_, i) => `${i % 2 ? 97 : 100}% ${100 - (i / steps) * 100}%`,
    );
    return `polygon(${[...left, ...right].join(', ')})`;
};

const TORN = tornEdge(8);

/** A strip of semi-transparent washi tape */
export const Tape = ({
    x,
    y,
    rotate = 0,
    width = 150,
    color = 'cream',
    className,
}: Placed & { width?: number; color?: keyof typeof TAPE_COLORS }) => (
    <span
        aria-hidden
        className={cn('pointer-events-none absolute h-[46px]', className)}
        style={{
            ...place({ x, y, rotate }),
            width,
            clipPath: TORN,
            backgroundColor: TAPE_COLORS[color],
            backgroundImage: `url('/assets/images/noise.png'), linear-gradient(rgb(255 255 255 / 0.25), transparent 30%, transparent 70%, rgb(0 0 0 / 0.04))`,
            boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / 0.2)',
        }}
    />
);

const PIN_COLORS = {
    red: ['#ff7a6b', '#d63a2b', '#8f1d13'],
    yellow: ['#ffe27a', '#f0b92b', '#9a6d0b'],
    green: ['#8fe0a6', '#2fa65a', '#145c2f'],
    blue: ['#8cc4ff', '#2f7fe0', '#163f7a'],
};

/** A push pin seen from above, with its shadow falling down-right */
export const Pin = ({
    x,
    y,
    color = 'red',
    className,
}: Omit<Placed, 'rotate'> & { color?: keyof typeof PIN_COLORS }) => {
    const [light, base, dark] = PIN_COLORS[color];
    return (
        <span
            aria-hidden
            className={cn('pointer-events-none absolute size-[38px]', className)}
            style={{ left: x - 19, top: y - 19 }}>
            <span
                className="absolute inset-0 rounded-full bg-black/35 blur-[5px]"
                style={{ transform: 'translate(9px, 12px) scale(1.05, 0.9)' }}
            />
            <span
                className="absolute inset-0 rounded-full"
                style={{
                    background: `radial-gradient(circle at 34% 30%, ${light} 0 12%, ${base} 45%, ${dark} 100%)`,
                    boxShadow: `inset -2px -3px 4px rgb(0 0 0 / 0.25), 0 1px 1px rgb(0 0 0 / 0.3)`,
                }}
            />
        </span>
    );
};

export const Star = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 16 16" aria-hidden className={className} fill="currentColor">
        <path d="M8 .9l2.2 4.6 5 .7-3.6 3.5.9 5L8 12.3l-4.5 2.4.9-5L.8 6.2l5-.7L8 .9z" />
    </svg>
);
