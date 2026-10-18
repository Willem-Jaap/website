'use client';

import type { CSSProperties } from 'react';

import { useIsRegionFocused } from '~/desk/region';
import cn from '~/utils/cn';

/**
 * Pencilled on the mat. From across the desk it names the corner; once you're close
 * it fades back so it doesn't compete with the objects.
 */
const MatNote = ({ className, style }: { className?: string; style?: CSSProperties }) => {
    const isFar = !useIsRegionFocused('about');

    return (
        <div
            aria-hidden
            className={cn(
                'font-hand pointer-events-none absolute flex items-end gap-[16px] text-white transition-opacity duration-500',
                isFar ? 'opacity-90' : 'opacity-60',
                className,
            )}
            style={style}>
            <svg viewBox="0 0 120 90" className="mb-[34px] w-[110px] overflow-visible">
                <path
                    d="M112 80 C 80 78, 40 60, 14 14 M14 14 l 4 26 M14 14 l 24 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <p className="-rotate-3 text-[120px] leading-none">about me</p>
        </div>
    );
};

export default MatNote;
