import { CM } from '~/desk/layout';
import Prop from '~/desk/props/prop';

const WIDTH = 20 * CM;
const HEIGHT = 22 * CM;

interface Props {
    x: number;
    y: number;
    rotate?: number;
}

/** Closed-back headphones lying flat, the cable trailing off */
const Headphones = ({ x, y, rotate }: Props) => (
    <Prop
        label="A pair of black headphones"
        x={x}
        y={y}
        width={WIDTH}
        height={HEIGHT}
        rotate={rotate}
        nudge={-6}
        className="drop-shadow-[0_24px_22px_rgb(0_0_0/0.5)]">
        <svg viewBox="0 0 200 220" className="absolute inset-0 size-full overflow-visible">
            <defs>
                <linearGradient id="hp-band" x1="0" x2="1">
                    <stop offset="0" stopColor="#1a1a1a" />
                    <stop offset="0.5" stopColor="#3a3a3a" />
                    <stop offset="1" stopColor="#141414" />
                </linearGradient>
                <radialGradient id="hp-cup" cx="0.4" cy="0.35" r="0.75">
                    <stop offset="0" stopColor="#3b3b3b" />
                    <stop offset="0.7" stopColor="#1a1a1a" />
                    <stop offset="1" stopColor="#0c0c0c" />
                </radialGradient>
                <radialGradient id="hp-pad" cx="0.5" cy="0.45" r="0.6">
                    <stop offset="0.55" stopColor="#0d0d0d" />
                    <stop offset="0.8" stopColor="#2b2b2b" />
                    <stop offset="1" stopColor="#151515" />
                </radialGradient>
            </defs>
            {/* Cable */}
            <path
                d="M100 188 C 96 214, 140 226, 168 208 S 214 160, 236 196"
                fill="none"
                stroke="#111"
                strokeWidth="3.4"
                strokeLinecap="round"
            />
            {/* Headband with a stitched leather pad */}
            <path
                d="M28 112 C 22 30, 178 30, 172 112"
                fill="none"
                stroke="url(#hp-band)"
                strokeWidth="13"
                strokeLinecap="round"
            />
            <path
                d="M52 60 C 82 34, 118 34, 148 60"
                fill="none"
                stroke="#5a3a24"
                strokeWidth="15"
                strokeLinecap="round"
            />
            <path
                d="M56 58 C 84 38, 116 38, 144 58"
                fill="none"
                stroke="#c9a27a"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.6"
            />
            {/* Ear cups, tilted outwards */}
            {[
                { cx: 34, rotate: -12 },
                { cx: 166, rotate: 12 },
            ].map(cup => (
                <g key={cup.cx} transform={`rotate(${cup.rotate} ${cup.cx} 140)`}>
                    <ellipse cx={cup.cx} cy="140" rx="34" ry="46" fill="url(#hp-cup)" />
                    <ellipse cx={cup.cx} cy="140" rx="26" ry="37" fill="url(#hp-pad)" />
                    <ellipse cx={cup.cx - 8} cy="118" rx="10" ry="5" fill="#fff" opacity="0.12" />
                    <rect x={cup.cx - 4} y="86" width="8" height="16" rx="3" fill="#8f949a" />
                </g>
            ))}
        </svg>
    </Prop>
);

export default Headphones;
