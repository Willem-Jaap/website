import { CM } from '~/desk/layout';
import Prop from '~/desk/props/prop';

const LENGTH = 16 * CM;
const WIDTH = 0.75 * CM;

interface Props {
    x: number;
    y: number;
    rotate: number;
}

/** A yellow HB pencil, a little worn down */
const Pencil = ({ x, y, rotate }: Props) => (
    <Prop
        label="A yellow HB pencil"
        x={x}
        y={y}
        width={LENGTH}
        height={WIDTH}
        rotate={rotate}
        nudge={4}
        className="drop-shadow-[0_8px_6px_rgb(0_0_0/0.35)]">
        <svg
            aria-hidden
            width={LENGTH}
            height={WIDTH}
            viewBox={`0 0 ${LENGTH} ${WIDTH}`}
            className="overflow-visible">
            <defs>
                {/* Three visible faces of the hexagon */}
                <linearGradient id="pencil-body" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#c98f12" />
                    <stop offset="0.3" stopColor="#e8b21e" />
                    <stop offset="0.3" stopColor="#fbd34a" />
                    <stop offset="0.7" stopColor="#f5c535" />
                    <stop offset="0.7" stopColor="#d99d16" />
                    <stop offset="1" stopColor="#b47c0c" />
                </linearGradient>
                <linearGradient id="pencil-metal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#8d9196" />
                    <stop offset="0.45" stopColor="#eef0f2" />
                    <stop offset="1" stopColor="#7c8186" />
                </linearGradient>
                <linearGradient id="pencil-round" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#000" stopOpacity={0.25} />
                    <stop offset="0.45" stopColor="#fff" stopOpacity={0.2} />
                    <stop offset="1" stopColor="#000" stopOpacity={0.3} />
                </linearGradient>
            </defs>
            {/* Eraser */}
            <rect x={0} y={1} width={44} height={WIDTH - 2} rx={8} fill="#e98a8a" />
            <rect x={0} y={1} width={44} height={WIDTH - 2} rx={8} fill="url(#pencil-round)" />
            {/* Ferrule */}
            <rect x={36} y={0} width={44} height={WIDTH} fill="url(#pencil-metal)" />
            <path d="M46 0v30M52 0v30M64 0v30M70 0v30" stroke="#6f7378" strokeWidth={1.5} />
            {/* Body */}
            <rect x={80} y={0} width={LENGTH - 180} height={WIDTH} fill="url(#pencil-body)" />
            <text
                x={200}
                y={20}
                fontSize={13}
                fill="#2a2208"
                fillOpacity={0.75}
                letterSpacing={2}
                fontFamily="var(--font-inter)">
                W-J · DESK PENCIL · HB
            </text>
            {/* Sharpened wood, scalloped where the paint ends */}
            <path
                d={`M${LENGTH - 104} 0 L${LENGTH - 34} 10.5 L${LENGTH - 34} 19.5 L${LENGTH - 104} 30 q10 -7.5 0 -15 q10 -7.5 0 -15 Z`}
                fill="#e9c999"
            />
            <path
                d={`M${LENGTH - 104} 15 q10 7.5 0 15 L${LENGTH - 34} 19.5 L${LENGTH - 34} 15 Z`}
                fill="#7a4a1a"
                fillOpacity={0.18}
            />
            {/* Graphite */}
            <path d={`M${LENGTH - 36} 10.2 L${LENGTH} 15 L${LENGTH - 36} 19.8 Z`} fill="#3b3d40" />
            <path
                d={`M${LENGTH - 36} 12 L${LENGTH - 4} 14.6 L${LENGTH - 36} 14 Z`}
                fill="#9a9ea3"
            />
        </svg>
    </Prop>
);

export default Pencil;
