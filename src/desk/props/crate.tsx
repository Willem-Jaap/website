import { CM } from '~/desk/layout';
import Prop from '~/desk/props/prop';

const WIDTH = 30 * CM;
const HEIGHT = 34 * CM;
const WALL = 1.8 * CM;

/** Record sleeves standing in the crate, front to back: their top edges seen from above */
const SLEEVES = [
    '#f2ede4',
    '#111111',
    '#e8572e',
    '#1f3b5c',
    '#d9b64a',
    '#f6f3ee',
    '#2a2a2a',
    '#7b2d26',
    '#3f6f5b',
    '#ece4d4',
    '#151515',
    '#c9c3b8',
    '#a23b72',
    '#e2a03f',
    '#203040',
    '#f4efe6',
    '#1a1a1a',
    '#5b7fa6',
    '#d14b3a',
    '#efe9df',
    '#2d2a26',
    '#8a8f5a',
    '#f0d8b0',
    '#131313',
];
const SLEEVE = (HEIGHT - WALL * 2 - 2 * CM) / SLEEVES.length;

/** Divider tabs sticking up between the sleeves, with a handwritten range */
const TABS = [
    { at: 5, label: 'a–g', left: 0.12 },
    { at: 13, label: 'h–q', left: 0.48 },
    { at: 19, label: 'r–z', left: 0.74 },
];

interface Props {
    x: number;
    y: number;
    rotate?: number;
}

/** A wooden crate full of LPs, seen from above */
const Crate = ({ x, y, rotate }: Props) => (
    <Prop
        label="A wooden crate full of records"
        x={x}
        y={y}
        width={WIDTH}
        height={HEIGHT}
        rotate={rotate}
        className="rounded-[14px] shadow-[0_2px_2px_rgb(0_0_0/0.3),0_30px_50px_-10px_rgb(0_0_0/0.55),0_70px_110px_-30px_rgb(0_0_0/0.45)]">
        {/* Walls: lighter end grain on top of the boards */}
        <div
            className="absolute inset-0 rounded-[14px]"
            style={{
                backgroundColor: '#a7774a',
                backgroundImage:
                    'linear-gradient(150deg, rgb(255 230 200 / 0.25), transparent 50%, rgb(0 0 0 / 0.2)), url(/assets/desk/oak.jpg)',
                backgroundSize: `auto, ${30 * CM}px`,
                boxShadow: 'inset 0 2px 0 rgb(255 235 205 / 0.4)',
            }}
        />
        {/* Hand holes in the end walls */}
        {[0, 1].map(side => (
            <div
                key={side}
                className="absolute top-1/2 h-[220px] w-[34px] -translate-y-1/2 rounded-full bg-[#2a170b] shadow-[inset_0_4px_8px_rgb(0_0_0/0.7)]"
                style={{ [side === 0 ? 'left' : 'right']: WALL / 2 - 17 }}
            />
        ))}
        {/* Inside, in shadow */}
        <div
            className="absolute overflow-hidden rounded-[6px] bg-[#1b100a] shadow-[inset_0_14px_24px_rgb(0_0_0/0.7)]"
            style={{ inset: WALL }}>
            {SLEEVES.map((color, index) => (
                <div
                    key={index}
                    className="absolute rounded-[2px] shadow-[0_6px_6px_rgb(0_0_0/0.55)]"
                    style={{
                        top: CM + index * SLEEVE,
                        height: SLEEVE - 6,
                        // Some lean a little, some stick out further than others
                        left: 14 + (index % 3) * 6,
                        right: 14 + ((index + 1) % 4) * 5,
                        backgroundColor: color,
                        backgroundImage:
                            'linear-gradient(to bottom, rgb(255 255 255 / 0.25), transparent 40%, rgb(0 0 0 / 0.25))',
                    }}
                />
            ))}
            {TABS.map(tab => (
                <div
                    key={tab.label}
                    className="paper absolute flex h-[86px] w-[140px] items-start justify-center rounded-t-[14px] pt-1 font-hand text-[40px] leading-none text-ink/80 shadow-[0_6px_8px_rgb(0_0_0/0.45)]"
                    style={{ top: CM + tab.at * SLEEVE - 64, left: `${tab.left * 100}%` }}>
                    {tab.label}
                </div>
            ))}
        </div>
    </Prop>
);

export default Crate;
