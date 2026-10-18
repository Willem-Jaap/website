import cn from '~/utils/cn';

interface Props {
    children: string;
    x: number;
    y: number;
    rotate?: number;
    className?: string;
}

/** Pencilled on the mat next to an object. Decorative: the object itself carries the label. */
const Caption = ({ children, x, y, rotate = 0, className }: Props) => (
    <p
        aria-hidden
        className={cn(
            'absolute font-hand text-[56px] leading-none whitespace-nowrap text-white/80',
            className,
        )}
        style={{ left: x, top: y, rotate: `${rotate}deg` }}>
        {children}
    </p>
);

export default Caption;
