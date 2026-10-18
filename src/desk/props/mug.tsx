import { CM } from '~/desk/layout';
import Prop from '~/desk/props/prop';

const SIZE = 9 * CM;

interface Props {
    x: number;
    y: number;
}

/** A cream mug of black coffee seen from above, handle and all */
const Mug = ({ x, y }: Props) => (
    <Prop
        label="A mug of black coffee"
        x={x}
        y={y}
        width={SIZE}
        height={SIZE}
        rotate={-30}
        nudge={-8}>
        {/* Handle, under the body */}
        <div className="absolute top-1/2 left-[calc(100%-40px)] h-[64px] w-[130px] -translate-y-1/2 rounded-r-[40px] bg-[linear-gradient(to_bottom,#f1ece2,#d8d0c2_60%,#bfb5a5)] shadow-[0_18px_24px_-8px_rgb(0_0_0/0.45)]" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_40%_35%,#fbf8f2,#e7e0d3_60%,#cfc6b6)] shadow-object" />
        {/* Rim */}
        <div className="absolute inset-[18px] rounded-full bg-[radial-gradient(circle,#d9d1c3_70%,#f6f2ea_96%)]" />
        {/* Coffee */}
        <div className="absolute inset-[34px] rounded-full bg-[radial-gradient(circle_at_50%_55%,#2a160c,#3a1f10_70%,#6b4325_92%,#8a6040)] shadow-[inset_0_10px_16px_rgb(0_0_0/0.45)]" />
        {/* Window reflection on the coffee */}
        <div className="absolute top-[96px] left-[100px] h-[30px] w-[80px] -rotate-[25deg] rounded-full bg-white/25 blur-[6px]" />
        <div className="absolute top-[70px] left-[230px] size-[10px] rounded-full bg-[#b58a5c]/50" />
    </Prop>
);

/** Where the mug stood earlier */
export const CoffeeRing = ({ x, y }: Props) => (
    <div
        aria-hidden
        className="absolute rounded-full mix-blend-multiply"
        style={{
            left: x,
            top: y,
            width: SIZE * 0.9,
            height: SIZE * 0.9,
            background:
                'radial-gradient(circle, transparent 0 60%, rgb(120 72 30 / 0.25) 62%, rgb(140 80 30 / 0.2) 65%, rgb(100 56 20 / 0.5) 67.5%, transparent 69.5%)',
            mask: 'conic-gradient(from 40deg, #000 0deg, #000 230deg, transparent 270deg, rgb(0 0 0 / 0.4) 330deg, #000 360deg)',
        }}
    />
);

export default Mug;
