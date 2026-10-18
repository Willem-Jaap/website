import { CM } from '~/desk/layout';
import Prop from '~/desk/props/prop';

const LENGTH = 5 * CM;
const WIDTH = 2 * CM;

/** Rolled-up rubber left behind, relative to the eraser */
const CRUMBS = [
    { x: -60, y: 30, w: 26, h: 10, r: 20 },
    { x: -40, y: 70, w: 18, h: 8, r: -30 },
    { x: -96, y: 52, w: 14, h: 7, r: 70 },
    { x: -20, y: 100, w: 22, h: 9, r: 10 },
    { x: -120, y: 92, w: 11, h: 6, r: -50 },
    { x: -70, y: 120, w: 16, h: 7, r: 40 },
    { x: 30, y: 112, w: 10, h: 5, r: 0 },
];

interface Props {
    x: number;
    y: number;
    rotate: number;
}

/** A white plastic eraser in a kraft sleeve, with crumbs */
const Eraser = ({ x, y, rotate }: Props) => (
    <>
        {CRUMBS.map((crumb, index) => (
            <div
                key={index}
                aria-hidden
                className="absolute rounded-full bg-[radial-gradient(circle_at_35%_30%,#fafafa,#cfd2d4)] shadow-[0_2px_2px_rgb(0_0_0/0.3)]"
                style={{
                    left: x + crumb.x,
                    top: y + crumb.y,
                    width: crumb.w,
                    height: crumb.h,
                    rotate: `${crumb.r}deg`,
                }}
            />
        ))}
        <Prop
            label="A white eraser, with crumbs next to it"
            x={x}
            y={y}
            width={LENGTH}
            height={WIDTH}
            rotate={rotate}
            nudge={10}>
            <div className="absolute inset-0 rounded-[10px] bg-[linear-gradient(to_bottom,#ffffff,#eceeef_70%,#d6d9db)] shadow-object" />
            {/* Worn corner */}
            <div className="absolute top-0 left-0 h-full w-[46px] rounded-l-[22px] bg-[linear-gradient(to_right,#d3d6d8,transparent)] opacity-60" />
            <div
                className="absolute inset-y-[-2px] right-[14px] w-[120px] rounded-[3px] shadow-[-2px_0_3px_rgb(0_0_0/0.15)]"
                style={{
                    backgroundImage:
                        'url(/assets/images/noise.png), linear-gradient(to bottom, #c9a273, #b88d5c 60%, #a37a4b)',
                }}>
                <p className="mt-[24px] text-center text-[15px] font-semibold tracking-[0.25em] text-[#3a2a17]/80 uppercase">
                    Eraser
                </p>
            </div>
        </Prop>
    </>
);

export default Eraser;
