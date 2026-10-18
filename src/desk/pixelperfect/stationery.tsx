import type { CSSProperties, PropsWithChildren } from 'react';

import { CM } from '~/desk/layout';
import cn from '~/utils/cn';

import styles from '~/desk/pixelperfect/pixelperfect.module.css';

interface PlacedProps extends PropsWithChildren {
    /** Position and size in centimetres, relative to the region */
    x: number;
    y: number;
    width: number;
    height?: number;
    rotate?: number;
    className?: string;
    style?: CSSProperties;
}

/** Something lying on the mat at (x, y) cm, turned by `rotate` degrees */
export const Placed = ({
    x,
    y,
    width,
    height,
    rotate = 0,
    className,
    style,
    children,
}: PlacedProps) => (
    <div
        className={cn('absolute', className)}
        style={{
            left: x * CM,
            top: y * CM,
            width: width * CM,
            height: height === undefined ? undefined : height * CM,
            transform: `rotate(${rotate}deg)`,
            ...style,
        }}>
        {children}
    </div>
);

/** A strip of semi-transparent washi tape, centred on its own position */
export const Tape = ({
    className,
    style,
    tone = 'cream',
}: {
    className?: string;
    style?: CSSProperties;
    tone?: 'cream' | 'blue';
}) => (
    <div
        aria-hidden
        className={cn(styles.tape, tone === 'blue' && styles.tapeBlue, 'absolute', className)}
        style={style}
    />
);

/** A steel Gem paper clip, drawn upright; rotate it with the wrapper */
export const PaperClip = ({ className, style }: { className?: string; style?: CSSProperties }) => {
    const path = 'M9 24V80a6 6 0 0 0 12 0V12a9 9 0 0 0-18 0V70';
    return (
        <svg
            aria-hidden
            viewBox="-2 0 28 94"
            className={cn('absolute overflow-visible', className)}
            style={{ width: 1.5 * CM, height: 5 * CM, ...style }}>
            <defs>
                <linearGradient id="pp-clip-steel" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#f4f6f8" />
                    <stop offset="0.45" stopColor="#a9b0b8" />
                    <stop offset="0.6" stopColor="#e9ecef" />
                    <stop offset="1" stopColor="#7d858e" />
                </linearGradient>
            </defs>
            <path
                d={path}
                fill="none"
                stroke="rgb(0 0 0 / 0.28)"
                strokeWidth="2.6"
                strokeLinecap="round"
                transform="translate(1.6 2.4)"
                style={{ filter: 'blur(0.8px)' }}
            />
            <path
                d={path}
                fill="none"
                stroke="url(#pp-clip-steel)"
                strokeWidth="2.2"
                strokeLinecap="round"
            />
            <path
                d={path}
                fill="none"
                stroke="rgb(255 255 255 / 0.7)"
                strokeWidth="0.6"
                strokeLinecap="round"
                transform="translate(-0.4 -0.4)"
            />
        </svg>
    );
};
