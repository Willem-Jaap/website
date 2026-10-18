import { CM } from '~/desk/layout';
import Prop from '~/desk/props/prop';

const SIZE = 13 * CM;
const HOLE = 5 * CM;
const R = SIZE / 2;

interface Props {
    x: number;
    y: number;
    rotate: number;
}

/** A cast-iron 1.25 kg change plate, the smallest one in the gym */
const WeightPlate = ({ x, y, rotate }: Props) => (
    <Prop
        label="A cast iron 1.25 kilo weight plate"
        x={x}
        y={y}
        width={SIZE}
        height={SIZE}
        rotate={rotate}
        nudge={25}
        className="rounded-full shadow-object">
        <div
            className="absolute inset-0 rounded-full"
            style={{
                backgroundImage:
                    'url(/assets/images/noise.png), radial-gradient(circle at 35% 30%, #4a4e54, #2b2e32 55%, #1d1f22)',
                mask: `radial-gradient(circle, transparent 0 ${HOLE / 2}px, #000 ${HOLE / 2 + 1}px)`,
            }}>
            {/* Raised outer lip */}
            <div className="absolute inset-0 rounded-full border-[26px] border-[#33363b] shadow-[inset_0_0_0_2px_rgb(255_255_255/0.08),inset_0_6px_10px_rgb(0_0_0/0.45)]" />
            {/* Raised hub */}
            <div
                className="absolute rounded-full bg-[radial-gradient(circle_at_40%_35%,#55595f,#2d3034)] shadow-[0_4px_8px_rgb(0_0_0/0.5),inset_0_2px_0_rgb(255_255_255/0.12)]"
                style={{ inset: R - HOLE / 2 - 44 }}
            />
            <svg
                aria-hidden
                className="absolute inset-0"
                width={SIZE}
                height={SIZE}
                viewBox={`0 0 ${SIZE} ${SIZE}`}>
                <defs>
                    <path
                        id="plate-text"
                        d={`M${R} ${R} m-${R - 74} 0 a${R - 74} ${R - 74} 0 1 1 ${(R - 74) * 2} 0 a${R - 74} ${R - 74} 0 1 1 -${(R - 74) * 2} 0`}
                    />
                </defs>
                <text
                    fontSize={46}
                    fontWeight={800}
                    letterSpacing={6}
                    fill="#575c63"
                    stroke="#16181a"
                    strokeWidth={1}
                    fontFamily="var(--font-inter)">
                    <textPath href="#plate-text" startOffset="8%">
                        1.25 KG
                    </textPath>
                    <textPath href="#plate-text" startOffset="58%">
                        2.75 LB
                    </textPath>
                </text>
            </svg>
            {/* Worn paint on the lip, where hands grab it */}
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_200deg,transparent_0deg,rgb(160_160_160/0.18)_20deg,transparent_45deg)]" />
        </div>
    </Prop>
);

export default WeightPlate;
