import { CM } from '~/desk/layout';
import Prop from '~/desk/props/prop';

const MM = CM / 10;
const LENGTH = 31 * CM;
const WIDTH = 3 * CM;
/** Where 0 sits along the edge */
const ZERO = 0.5 * CM;

const range = (count: number) => Array.from({ length: count }, (_, index) => index);

const TICKS = range(301)
    .map(mm => {
        const height = mm % 10 === 0 ? 0.8 * CM : mm % 5 === 0 ? 0.55 * CM : 0.32 * CM;
        return `M${ZERO + mm * MM} 0v${height}`;
    })
    .join('');

interface Props {
    x: number;
    y: number;
    rotate: number;
}

/** A 30 cm stainless steel ruler with etched millimetres */
const Ruler = ({ x, y, rotate }: Props) => (
    <Prop
        label="A 30 centimetre steel ruler"
        x={x}
        y={y}
        width={LENGTH}
        height={WIDTH}
        rotate={rotate}>
        <div
            className="absolute inset-0 rounded-[6px] shadow-[0_1px_1px_rgb(0_0_0/0.3),0_10px_18px_-6px_rgb(0_0_0/0.45)]"
            style={{
                backgroundImage: [
                    'url(/assets/images/noise.png)',
                    'linear-gradient(to bottom, #eef0f2 0%, #c4c9cf 18%, #dde0e3 45%, #f4f5f6 52%, #b9bfc6 80%, #9aa1a9 100%)',
                ].join(','),
            }}
        />
        <svg
            aria-hidden
            className="absolute inset-0"
            width={LENGTH}
            height={WIDTH}
            viewBox={`0 0 ${LENGTH} ${WIDTH}`}>
            <path d={TICKS} stroke="#2b2f33" strokeWidth={1.4} />
            {range(31).map(cm => (
                <text
                    key={cm}
                    x={ZERO + cm * CM}
                    y={1.45 * CM}
                    fill="#2b2f33"
                    fontSize={18}
                    textAnchor="middle"
                    fontFamily="var(--font-inter)">
                    {cm}
                </text>
            ))}
            <text
                x={LENGTH - 1.2 * CM}
                y={WIDTH - 0.5 * CM}
                fill="#2b2f33"
                fillOpacity={0.6}
                fontSize={13}
                letterSpacing={3}
                textAnchor="end"
                fontFamily="var(--font-inter)">
                stainless · cm
            </text>
        </svg>
        {/* Hanging hole */}
        <div className="absolute top-1/2 right-[18px] size-[22px] -translate-y-1/2 rounded-full bg-[#2f8be0] shadow-[inset_0_2px_3px_rgb(0_0_0/0.5)]" />
    </Prop>
);

export default Ruler;
