'use client';

import { CM } from '~/desk/layout';
import { useIsRegionFocused } from '~/desk/region';
import cn from '~/utils/cn';

const WIDTH = 46 * CM;
const HEIGHT = 36 * CM;
/** Centre of the platter, from the plinth's top left */
const CENTER = { x: 18 * CM, y: 18 * CM };
const PLATTER = 31 * CM;
/** A 12" LP */
const DISC = 30 * CM;
const LABEL = 10 * CM;
/** Where the tonearm turns, and where its stylus sits in the outer grooves */
const PIVOT = { x: 39 * CM, y: 8.5 * CM };
const STYLUS = { x: 28.2 * CM, y: 26.4 * CM };

// Rounded, as trigonometry can differ in the last digits between server and browser
const ARM_ANGLE = Math.round(Math.atan2(STYLUS.y - PIVOT.y, STYLUS.x - PIVOT.x) * 1e4) / 1e4;
const ARM_LENGTH = Math.round(Math.hypot(STYLUS.x - PIVOT.x, STYLUS.y - PIVOT.y));

const ALUMINIUM =
    'linear-gradient(135deg, #f4f5f6 0%, #bfc3c8 35%, #eef0f2 52%, #9da2a8 78%, #d9dce0 100%)';

const circle = (size: number) => ({
    left: CENTER.x - size / 2,
    top: CENTER.y - size / 2,
    width: size,
    height: size,
});

interface Props {
    x: number;
    y: number;
    rotate?: number;
}

/**
 * A walnut direct-drive turntable seen from above, an LP on the platter and the arm in the
 * groove. The record turns when you hover it or zoom in on the corner.
 */
const Turntable = ({ x, y, rotate = 0 }: Props) => {
    const isPlaying = useIsRegionFocused('props');

    return (
        <div
            role="img"
            aria-label="A walnut turntable playing side one of Alchemy, the 1984 live album by Dire Straits"
            className="group absolute"
            style={{ left: x, top: y, width: WIDTH, height: HEIGHT, rotate: `${rotate}deg` }}>
            {/* Plinth */}
            <div
                className="absolute inset-0 rounded-[34px]"
                style={{
                    backgroundColor: '#4a2a17',
                    backgroundImage:
                        'linear-gradient(160deg, rgb(255 220 180 / 0.12), transparent 40%, rgb(0 0 0 / 0.25)), url(/assets/desk/walnut.jpg)',
                    backgroundSize: `auto, ${24 * CM}px`,
                    boxShadow: [
                        'inset 0 3px 0 rgb(255 225 190 / 0.25)',
                        'inset 0 -10px 18px rgb(0 0 0 / 0.35)',
                        '0 2px 2px rgb(0 0 0 / 0.3)',
                        '0 30px 50px -10px rgb(0 0 0 / 0.55)',
                        '0 70px 120px -30px rgb(0 0 0 / 0.45)',
                    ].join(','),
                }}
            />
            {/* Dust cover hinges */}
            {[9, 33].map(left => (
                <div
                    key={left}
                    className="absolute top-[-14px] h-[34px] w-[150px] rounded-[6px] bg-[linear-gradient(#2b2b2b,#111)] shadow-[0_4px_8px_rgb(0_0_0/0.4)]"
                    style={{ left: left * CM }}
                />
            ))}

            {/* Platter, with the strobe dots on its rim */}
            <div
                className="absolute rounded-full shadow-[0_10px_24px_rgb(0_0_0/0.55)]"
                style={{
                    ...circle(PLATTER),
                    background: `repeating-conic-gradient(from 0deg, #3a3d42 0deg 1.2deg, #c9ccd1 1.2deg 2.4deg), ${ALUMINIUM}`,
                }}
            />
            <div
                className="absolute rounded-full"
                style={{ ...circle(PLATTER - 34), background: ALUMINIUM }}
            />

            {/* The record */}
            <div
                className="absolute rounded-full shadow-[0_4px_10px_rgb(0_0_0/0.5)]"
                style={circle(DISC)}>
                <div
                    className={cn(
                        'absolute inset-0 rounded-full motion-safe:animate-[spin_1.8s_linear_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running]',
                        isPlaying && '[animation-play-state:running]',
                    )}
                    style={{
                        background:
                            'repeating-radial-gradient(circle, #121212 0 2px, #1c1c1c 2px 3.5px)',
                    }}>
                    {/* Gaps between the tracks, and a few specks so you can see it turn */}
                    {[0.62, 0.74, 0.86].map(ratio => (
                        <div
                            key={ratio}
                            className="absolute rounded-full border-[5px] border-[#0b0b0b]"
                            style={{ inset: (DISC * (1 - ratio)) / 2 }}
                        />
                    ))}
                    <div className="absolute top-[20%] left-[72%] h-[4px] w-[90px] rotate-[35deg] rounded-full bg-white/15" />
                    <div className="absolute top-[80%] left-[30%] size-[5px] rounded-full bg-white/30" />
                    {/* The real side one label (US pressing, via the Cover Art Archive) */}
                    <div
                        className="absolute overflow-hidden rounded-full bg-[#ece8df]"
                        style={{
                            inset: (DISC - LABEL) / 2,
                            backgroundImage: 'url(/assets/props/alchemy-label.jpg)',
                            // The photo shows a little vinyl around the label; crop it off
                            backgroundSize: '106%',
                            backgroundPosition: 'center',
                        }}
                    />
                </div>
                {/* Light from the window stays put while the record turns */}
                <div
                    className="pointer-events-none absolute inset-0 rounded-full mix-blend-screen"
                    style={{
                        background:
                            'conic-gradient(from 20deg, transparent 0deg, rgb(255 255 255 / 0.14) 26deg, transparent 58deg, transparent 180deg, rgb(255 255 255 / 0.1) 206deg, transparent 238deg)',
                        mask: `radial-gradient(circle, transparent 0 ${LABEL / 2}px, #000 ${LABEL / 2 + 1}px)`,
                    }}
                />
                {/* Spindle */}
                <div
                    className="absolute size-[30px] -translate-1/2 rounded-full shadow-[0_2px_4px_rgb(0_0_0/0.6)]"
                    style={{ left: DISC / 2, top: DISC / 2, background: ALUMINIUM }}
                />
            </div>

            {/* Arm rest */}
            <div
                className="absolute size-[70px] rounded-full bg-[radial-gradient(circle,#222_40%,#555_42%,#2a2a2a_70%)] shadow-[0_6px_10px_rgb(0_0_0/0.5)]"
                style={{ left: 41.5 * CM, top: 24 * CM }}
            />

            {/* Tonearm: counterweight, pivot, tube and headshell */}
            <div
                className="absolute origin-left"
                style={{
                    left: PIVOT.x,
                    top: PIVOT.y,
                    width: ARM_LENGTH,
                    rotate: `${ARM_ANGLE}rad`,
                }}>
                <div
                    className="absolute top-[-34px] left-[-190px] h-[68px] w-[120px] rounded-[10px] shadow-[0_10px_14px_rgb(0_0_0/0.5)]"
                    style={{ background: 'linear-gradient(#e2e4e7, #8c9096 55%, #c8cbcf)' }}
                />
                <div
                    className="absolute top-[-9px] left-[-80px] h-[18px] rounded-full shadow-[0_14px_16px_rgb(0_0_0/0.45)]"
                    style={{
                        width: ARM_LENGTH + 40,
                        background: 'linear-gradient(#fafbfc, #a8adb3 55%, #dfe2e5)',
                    }}
                />
                <div
                    className="absolute top-[-34px] h-[68px] w-[120px] rounded-[8px] bg-[linear-gradient(#2e2e2e,#0d0d0d)] shadow-[0_12px_14px_rgb(0_0_0/0.5)]"
                    style={{ left: ARM_LENGTH - 50 }}
                />
                {/* Finger lift */}
                <div
                    className="absolute top-[30px] h-[12px] w-[50px] rounded-full bg-[#c9ccd1]"
                    style={{ left: ARM_LENGTH - 10 }}
                />
            </div>
            <div
                className="absolute size-[150px] -translate-1/2 rounded-full shadow-[0_10px_20px_rgb(0_0_0/0.55)]"
                style={{
                    left: PIVOT.x,
                    top: PIVOT.y,
                    background: `radial-gradient(circle, #1a1a1a 0 26%, transparent 27%), ${ALUMINIUM}`,
                }}
            />

            {/* Controls: start/stop, speed and the pitch slider */}
            <div
                className="absolute flex h-[86px] w-[190px] items-center justify-center rounded-[8px] text-[22px] font-semibold text-[#2b2b2b] shadow-[0_4px_8px_rgb(0_0_0/0.45)]"
                style={{ left: 1.6 * CM, top: 31.6 * CM, background: ALUMINIUM }}>
                start · stop
            </div>
            {['33', '45'].map((speed, index) => (
                <div
                    key={speed}
                    className={cn(
                        'absolute flex h-[60px] w-[86px] items-center justify-center rounded-[6px] text-[22px] font-semibold shadow-[0_3px_6px_rgb(0_0_0/0.45)]',
                        index === 0 ? 'bg-[#e8572e] text-white' : 'text-[#2b2b2b]',
                    )}
                    style={{
                        left: (7.2 + index * 2.6) * CM,
                        top: 32.2 * CM,
                        background: index === 0 ? undefined : ALUMINIUM,
                    }}>
                    {speed}
                </div>
            ))}
            <div
                className="absolute w-[34px] rounded-full bg-[#120a05] shadow-[inset_0_3px_6px_rgb(0_0_0/0.8)]"
                style={{ left: 43.4 * CM, top: 27.5 * CM, height: 7 * CM }}
            />
            <div
                className="absolute h-[54px] w-[86px] -translate-x-1/2 rounded-[6px] shadow-[0_6px_10px_rgb(0_0_0/0.5)]"
                style={{ left: 43.4 * CM + 17, top: 30.4 * CM, background: ALUMINIUM }}
            />
            {/* Strobe light, lit while it plays */}
            <div
                className={cn(
                    'absolute size-[44px] rounded-full bg-[#5a1a0e] shadow-[inset_0_2px_4px_rgb(0_0_0/0.6)] transition-colors duration-500',
                    isPlaying && 'bg-[#ff6a3d] shadow-[0_0_30px_10px_rgb(255_106_61/0.45)]',
                )}
                style={{ left: 1.8 * CM, top: 2 * CM }}
            />
            <p
                className="absolute font-semibold tracking-[0.2em] text-[#f1d9bd]/55 text-[22px]"
                style={{ left: 38 * CM, top: 33.4 * CM }}>
                direct drive
            </p>
        </div>
    );
};

export default Turntable;
