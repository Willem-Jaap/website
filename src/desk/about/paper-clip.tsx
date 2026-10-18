import type { CSSProperties } from 'react';

import cn from '~/utils/cn';

/** A steel paper clip, seen from above */
const PaperClip = ({ className, style }: { className?: string; style?: CSSProperties }) => (
    <svg
        aria-hidden
        viewBox="0 0 40 120"
        className={cn(
            'pointer-events-none absolute w-[46px] drop-shadow-[2px_4px_3px_rgb(0_0_0/0.35)]',
            className,
        )}
        style={style}>
        <defs>
            <linearGradient id="about-clip-steel" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#8d949c" />
                <stop offset="0.45" stopColor="#eef1f4" />
                <stop offset="1" stopColor="#7b828a" />
            </linearGradient>
        </defs>
        <path
            d="M27 30 V96 a8 8 0 0 1 -16 0 V18 a12 12 0 0 1 24 0 V100 a15 15 0 0 1 -30 0 V36"
            fill="none"
            stroke="url(#about-clip-steel)"
            strokeWidth="3.6"
            strokeLinecap="round"
        />
    </svg>
);

export default PaperClip;
