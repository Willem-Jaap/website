import { CM } from '~/desk/layout';

const LENGTH = 16.6 * CM;
const WIDTH = 0.9 * CM;

interface Props {
    x: number;
    y: number;
    rotate?: number;
}

/** An Apple Pencil next to the iPad: matte white, flat on one side, a grey tip */
const Pencil = ({ x, y, rotate = 0 }: Props) => (
    <div
        role="img"
        aria-label="An Apple Pencil"
        className="absolute"
        style={{ left: x, top: y, width: LENGTH, height: WIDTH, rotate: `${rotate}deg` }}>
        <div
            className="absolute inset-0 rounded-l-[4px] rounded-r-[18px] shadow-[0_14px_14px_-4px_rgb(0_0_0/0.45)]"
            style={{
                clipPath: `polygon(0 0, calc(100% - ${1.8 * CM}px) 0, 100% 46%, 100% 54%, calc(100% - ${1.8 * CM}px) 100%, 0 100%)`,
                background: 'linear-gradient(#ffffff, #eceef0 45%, #d3d6da 80%, #bfc3c8)',
            }}
        />
        {/* The flat side catching the light, and the tip */}
        <div className="absolute top-[4px] left-[10px] h-[6px] w-[78%] rounded-full bg-white/90" />
        <div
            className="absolute top-1/2 h-[14px] w-[40px] -translate-y-1/2 rounded-r-full bg-[#9aa0a6]"
            style={{ left: LENGTH - 40 }}
        />
    </div>
);

export default Pencil;
