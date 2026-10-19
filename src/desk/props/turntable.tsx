'use client';

import { type MouseEvent, useEffect, useRef } from 'react';

import { CM } from '~/desk/layout';
import { type Album, labelOf } from '~/desk/props/albums';
import {
    CUE_TIME,
    INNER_GROOVE,
    OUTER_GROOVE,
    player,
    trackStarts,
    usePlayer,
} from '~/desk/props/player';
import cn from '~/utils/cn';

const WIDTH = 46 * CM;
const HEIGHT = 36 * CM;
/** Centre of the platter, from the plinth's top left */
const CENTER = { x: 18 * CM, y: 18 * CM };
const PLATTER = 31 * CM;
/** A 12" LP */
const DISC = 30 * CM;
const LABEL = 10 * CM;
/** One turn at 33⅓ rpm, in ms */
const SPIN_TIME = 1800;
/** Where the tonearm turns, and how far from there the stylus is */
const PIVOT = { x: 39 * CM, y: 8.5 * CM };
const ARM_LENGTH = 21 * CM;
/** The arm lying on its rest, in radians (just short of straight down) */
const REST_ANGLE = 1.36;

/**
 * The arm's angle that puts the stylus `radius` cm from the spindle. The stylus swings on a
 * circle around the pivot and gets closer to the spindle the further the arm turns, so bisect.
 */
const angleFor = (radius: number) => {
    let low = 1.6;
    let high = 3.1;
    for (let i = 0; i < 30; i++) {
        const angle = (low + high) / 2;
        const distance = Math.hypot(
            PIVOT.x + Math.cos(angle) * ARM_LENGTH - CENTER.x,
            PIVOT.y + Math.sin(angle) * ARM_LENGTH - CENTER.y,
        );
        if (distance > radius * CM) low = angle;
        else high = angle;
    }
    return Math.round(((low + high) / 2) * 1e4) / 1e4;
};

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
    /** The records that can go on it, from the crate */
    albums: Album[];
}

/**
 * A walnut direct-drive turntable seen from above with Alchemy on the platter. Click the arm or
 * start/stop to play side one, or click into the grooves to drop the needle there: it plays
 * Apple's previews with a bit of surface noise, and moves on to the next track like a record.
 */
const Turntable = ({ x, y, rotate = 0, albums }: Props) => {
    const { status, track, radius, album: albumId, dragging } = usePlayer();
    const album = albums.find(candidate => candidate.id === albumId) ?? albums[0];
    const tracks = album?.tracks ?? [];
    const isSpinning = status !== 'idle';
    const angle = radius === null ? REST_ANGLE : angleFor(radius);
    const playing = track === null ? null : tracks[track];

    useEffect(() => {
        player.setAlbums(albums);
        return () => player.stop();
    }, [albums]);

    // Spin while it plays, and stop where it is. Only animated while playing: a running (or
    // paused) animation keeps the record a GPU layer of its own, which costs phones their memory
    const vinyl = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const element = vinyl.current;
        if (!element || !isSpinning) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const from = parseFloat(element.style.rotate) || 0;
        const spin = element.animate([{ rotate: `${from}deg` }, { rotate: `${from + 360}deg` }], {
            duration: SPIN_TIME,
            iterations: Infinity,
        });
        return () => {
            const turned = ((Number(spin.currentTime) || 0) / SPIN_TIME) * 360;
            element.style.rotate = `${(from + turned) % 360}deg`;
            spin.cancel();
        };
    }, [isSpinning]);

    // A new record is lowered onto the platter: it comes down from above and settles
    const disc = useRef<HTMLButtonElement>(null);
    const previous = useRef(albumId);
    useEffect(() => {
        if (previous.current === albumId) return;
        previous.current = albumId;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        disc.current?.animate(
            [
                {
                    transform: 'translateY(-60px) scale(1.06)',
                    opacity: 0,
                    filter: 'drop-shadow(0 60px 40px rgb(0 0 0 / 0.5))',
                },
                { transform: 'translateY(-20px) scale(1.03)', opacity: 1, offset: 0.6 },
                { transform: 'none', opacity: 1, filter: 'none' },
            ],
            { duration: 550, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' },
        );
    }, [albumId]);

    /** Drop the needle where the record was clicked */
    const onRecordClick = (event: MouseEvent<HTMLButtonElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const scale = rect.width / DISC;
        const distance = Math.hypot(
            event.clientX - (rect.left + rect.width / 2),
            event.clientY - (rect.top + rect.height / 2),
        );
        const cm = distance / scale / CM;
        if (cm < INNER_GROOVE - 0.6) return player.toggle();
        player.cueAt(cm);
    };

    return (
        <div
            role="group"
            aria-label={`A walnut turntable with ${album?.title ?? 'a record'} by ${album?.artist ?? 'Dire Straits'} on it`}
            className="absolute"
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

            {/* The record: click into the grooves to play from there */}
            <button
                ref={disc}
                type="button"
                aria-label={
                    isSpinning
                        ? 'Lift the needle'
                        : `Drop the needle: play ${album?.title} (30 second previews)`
                }
                data-turntable-drop
                className={cn(
                    'absolute cursor-pointer rounded-full shadow-[0_4px_10px_rgb(0_0_0/0.5)] transition-shadow duration-300',
                    // A record from the crate is on its way: the platter lights up to take it
                    dragging &&
                        'shadow-[0_0_0_14px_rgb(255_176_143/0.55),0_0_80px_30px_rgb(255_120_80/0.35)]',
                )}
                style={circle(DISC)}
                onClick={onRecordClick}>
                <div
                    ref={vinyl}
                    className="absolute inset-0 rounded-full"
                    style={{
                        background:
                            'repeating-radial-gradient(circle, #121212 0 2px, #1c1c1c 2px 3.5px)',
                    }}>
                    {/* Lead-in, the gaps between the tracks and the run-out, then a few specks */}
                    {[OUTER_GROOVE + 0.3, ...trackStarts(tracks).slice(1), INNER_GROOVE].map(
                        start => (
                            <div
                                key={start}
                                className="absolute rounded-full border-[5px] border-[#0b0b0b]"
                                style={{ inset: DISC / 2 - start * CM }}
                            />
                        ),
                    )}
                    <div className="absolute top-[20%] left-[72%] h-[4px] w-[90px] rotate-[35deg] rounded-full bg-white/15" />
                    <div className="absolute top-[80%] left-[30%] size-[5px] rounded-full bg-white/30" />
                    {/* The label: Alchemy's real one, the others with their cover printed on it */}
                    <div
                        className="absolute overflow-hidden rounded-full bg-[#ece8df] shadow-[inset_0_0_0_3px_rgb(0_0_0/0.25)]"
                        style={{
                            inset: (DISC - LABEL) / 2,
                            backgroundImage: album ? `url(${labelOf(album)})` : undefined,
                            // The photo of Alchemy's label shows a little vinyl around it; crop it off
                            backgroundSize: album?.id === 'alchemy' ? '106%' : 'cover',
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
            </button>

            {/* Arm rest */}
            <div
                className="absolute size-[70px] -translate-1/2 rounded-full bg-[radial-gradient(circle,#222_40%,#555_42%,#2a2a2a_70%)] shadow-[0_6px_10px_rgb(0_0_0/0.5)]"
                style={{
                    left: PIVOT.x + Math.round(Math.cos(REST_ANGLE) * ARM_LENGTH * 0.78),
                    top: PIVOT.y + Math.round(Math.sin(REST_ANGLE) * ARM_LENGTH * 0.78),
                }}
            />

            {/* Tonearm: counterweight, tube and headshell. Lifted (bigger shadow) while it swings */}
            <button
                type="button"
                aria-label={isSpinning ? 'Lift the needle' : `Play ${album?.title}`}
                aria-pressed={isSpinning}
                className={cn(
                    'group/arm absolute h-0 origin-left cursor-pointer motion-safe:transition-[rotate] motion-safe:ease-in-out',
                    status === 'cueing' &&
                        '[&>div]:translate-y-[-6px] [&>div]:shadow-[0_34px_26px_rgb(0_0_0/0.35)]',
                )}
                style={{
                    left: PIVOT.x,
                    top: PIVOT.y,
                    width: ARM_LENGTH,
                    rotate: `${angle}rad`,
                    transitionDuration: `${CUE_TIME}ms`,
                }}
                onClick={() => player.toggle()}>
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
                {/* A bigger target than the thin arm itself */}
                <span className="absolute top-[-60px] left-0 h-[120px] w-full" />
            </button>
            <div
                className="absolute size-[150px] -translate-1/2 rounded-full shadow-[0_10px_20px_rgb(0_0_0/0.55)]"
                style={{
                    left: PIVOT.x,
                    top: PIVOT.y,
                    background: `radial-gradient(circle, #1a1a1a 0 26%, transparent 27%), ${ALUMINIUM}`,
                }}
            />

            {/* Controls: start/stop, speed and the pitch slider */}
            <button
                type="button"
                aria-label={isSpinning ? 'Stop' : `Start: play ${album?.title}`}
                className="absolute flex h-[86px] w-[190px] cursor-pointer items-center justify-center rounded-[8px] text-[22px] font-semibold text-[#2b2b2b] shadow-[0_4px_8px_rgb(0_0_0/0.45)] active:translate-y-[2px] active:shadow-[0_2px_4px_rgb(0_0_0/0.45)]"
                style={{ left: 1.6 * CM, top: 31.6 * CM, background: ALUMINIUM }}
                onClick={() => player.toggle()}>
                start · stop
            </button>
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
                    isSpinning && 'bg-[#ff6a3d] shadow-[0_0_30px_10px_rgb(255_106_61/0.45)]',
                )}
                style={{ left: 1.8 * CM, top: 2 * CM }}
            />
            <p
                className="absolute font-semibold tracking-[0.2em] text-[#f1d9bd]/55 text-[22px]"
                style={{ left: 38 * CM, top: 33.4 * CM }}>
                direct drive
            </p>
            {/* What's playing, printed small on the plinth like a display, for screen readers too */}
            <p
                aria-live="polite"
                className={cn(
                    'absolute max-w-[18cm] truncate text-[24px] font-medium tracking-[0.04em] text-[#ffb08f] transition-opacity duration-500',
                    status === 'playing' ? 'opacity-90' : 'opacity-0',
                )}
                style={{ left: 13 * CM, top: 34.2 * CM, maxWidth: 22 * CM }}>
                {playing ? (
                    <>
                        ▶ {playing.name} ·{' '}
                        <a
                            href={playing.url}
                            target="_blank"
                            rel="noreferrer"
                            className="underline underline-offset-4">
                            full song on apple music
                        </a>
                    </>
                ) : null}
            </p>
        </div>
    );
};

export default Turntable;
