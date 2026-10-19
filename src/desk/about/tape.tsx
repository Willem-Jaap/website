import type { CSSProperties } from 'react';

import cn from '~/utils/cn';

interface Props {
    className?: string;
    style?: CSSProperties;
}

/** Torn ends: a little zigzag on both short sides */
const TORN =
    'polygon(0% 6%, 2% 0%, 98% 4%, 100% 14%, 98.5% 30%, 100% 48%, 98% 66%, 100% 84%, 98% 100%, 2% 96%, 0% 82%, 1.5% 64%, 0% 46%, 2% 28%)';

/** A strip of semi-transparent washi tape */
const Tape = ({ className, style }: Props) => (
    <div
        aria-hidden
        className={cn(
            'pointer-events-none absolute h-[64px] w-[220px] bg-[#f3ead2]/55 mix-blend-normal',
            'shadow-[0_1px_2px_rgb(0_0_0/0.12)]',
            className,
        )}
        style={{
            clipPath: TORN,
            backgroundImage:
                'repeating-linear-gradient(90deg, rgb(255 255 255 / 0.18) 0 2px, transparent 2px 9px), url(/assets/images/noise.png)',
            ...style,
        }}
    />
);

export default Tape;
