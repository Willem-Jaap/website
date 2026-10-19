import type { CSSProperties, PropsWithChildren, Ref } from 'react';

import cn from '~/utils/cn';

interface Props extends PropsWithChildren {
    /** What it is, for screen readers */
    label: string;
    x: number;
    y: number;
    width: number;
    height: number;
    /** Resting angle in degrees */
    rotate?: number;
    /** Extra turn in degrees when hovered, as if nudged */
    nudge?: number;
    className?: string;
    ref?: Ref<HTMLDivElement>;
}

/** An object lying on the mat, positioned in world units relative to the region */
const Prop = ({
    label,
    x,
    y,
    width,
    height,
    rotate = 0,
    nudge = 0,
    className,
    children,
    ref,
}: Props) => (
    <div
        ref={ref}
        role="img"
        aria-label={label}
        className={cn(
            'absolute rotate-(--r)',
            nudge !== 0 &&
                'transition-[rotate] duration-700 ease-out hover:rotate-(--r-hover) motion-reduce:transition-none',
            className,
        )}
        style={
            {
                'left': x,
                'top': y,
                width,
                height,
                '--r': `${rotate}deg`,
                '--r-hover': `${rotate + nudge}deg`,
            } as CSSProperties
        }>
        {children}
    </div>
);

export default Prop;
