import { CM } from '~/desk/layout';
import Prop from '~/desk/props/prop';

const LENGTH = 16.5 * CM;
const WIDTH = 1.2 * CM;

const range = (count: number) => Array.from({ length: count }, (_, index) => index);

interface Props {
    x: number;
    y: number;
    rotate: number;
}

/** A steel scalpel handle with a curved No. 10 blade */
const Scalpel = ({ x, y, rotate }: Props) => (
    <Prop
        label="A scalpel with a curved blade"
        x={x}
        y={y}
        width={LENGTH}
        height={WIDTH}
        rotate={rotate}
        nudge={-3}
        className="drop-shadow-[0_6px_5px_rgb(0_0_0/0.4)]">
        <svg
            aria-hidden
            width={LENGTH}
            height={WIDTH}
            viewBox={`0 0 ${LENGTH} ${WIDTH}`}
            className="overflow-visible">
            <defs>
                <linearGradient id="scalpel-steel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#f2f4f6" />
                    <stop offset="0.35" stopColor="#b4bbc2" />
                    <stop offset="0.6" stopColor="#d8dde1" />
                    <stop offset="1" stopColor="#7f878f" />
                </linearGradient>
                <linearGradient id="scalpel-blade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#9aa3ab" />
                    <stop offset="0.55" stopColor="#e9edf0" />
                    <stop offset="0.75" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#c3cad0" />
                </linearGradient>
            </defs>
            {/* Blade */}
            <path
                d="M500 16 L620 14 Q656 14 664 23 Q636 37 560 35 L500 32 Z"
                fill="url(#scalpel-blade)"
            />
            <path d="M560 38 Q636 41 666 24 Q630 33 560 32 Z" fill="#fff" fillOpacity={0.85} />
            <circle cx={536} cy={24} r={4} fill="#2f8be0" fillOpacity={0.6} />
            {/* Handle */}
            <path
                d="M14 12 L470 15 L512 17 L512 31 L470 33 L14 36 Q0 36 0 24 Q0 12 14 12 Z"
                fill="url(#scalpel-steel)"
            />
            <circle cx={22} cy={24} r={5} fill="#2f8be0" stroke="#6b737b" strokeWidth={1} />
            <path
                d={range(18)
                    .map(index => `M${240 + index * 9} 14v20`)
                    .join('')}
                stroke="#5d656d"
                strokeWidth={2}
                strokeOpacity={0.7}
            />
            <text
                x={80}
                y={28}
                fontSize={9}
                letterSpacing={2}
                fill="#3d454c"
                fillOpacity={0.7}
                fontFamily="var(--font-inter)">
                No. 3 · STAINLESS
            </text>
        </svg>
    </Prop>
);

export default Scalpel;
