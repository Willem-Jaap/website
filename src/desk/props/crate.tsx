'use client';

import { type PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { camera } from '~/canvas/camera';
import { CM, REGIONS } from '~/desk/layout';
import { type Album, coverOf } from '~/desk/props/albums';
import { player, usePlayer } from '~/desk/props/player';
import { useIsRegionFocused } from '~/desk/region';
import cn from '~/utils/cn';

const WIDTH = 30 * CM;
const HEIGHT = 34 * CM;
const WALL = 1.8 * CM;
const INNER = { width: WIDTH - WALL * 2, height: HEIGHT - WALL * 2 };
/** Records are a little smaller than the crate is wide */
const RECORD = INNER.width - 0.6 * CM;
/** Where the first (backmost) record stands, and the room between records */
const FIRST = 9 * CM;
const GAP = 3.6 * CM;
/** A full sleeve, as it comes out of the crate */
const SLEEVE = 31.4 * CM;
/** Pointer travel (px) before a press becomes a drag */
const DRAG_START = 6;

interface Drag {
    album: Album;
    /** Centre of the sleeve, in the region's world units */
    x: number;
    y: number;
    phase: 'dragging' | 'dropping' | 'returning';
}

interface Props {
    x: number;
    y: number;
    rotate?: number;
    albums: Album[];
}

/** The pointer position in the props region's world units */
const toRegion = (clientX: number, clientY: number) => {
    const world = camera.toWorld(clientX, clientY);
    return { x: world.x - REGIONS.props.x, y: world.y - REGIONS.props.y };
};

/**
 * A wooden crate of records, leaning in perspective so you can see their covers. Pull one out
 * and drop it on the turntable to play it, or just click it.
 */
const Crate = ({ x, y, rotate = 0, albums }: Props) => {
    const { album: onPlatter } = usePlayer();
    const isFocused = useIsRegionFocused('props');
    const [drag, setDrag] = useState<Drag | null>(null);
    const press = useRef<{ album: Album; x: number; y: number; moved: boolean } | null>(null);

    const inCrate = albums.filter(album => album.id !== onPlatter);
    const home = (index: number) => ({
        x: x + WIDTH / 2,
        y: y + WALL + FIRST + index * GAP - RECORD / 3,
    });

    useEffect(() => {
        if (!drag || drag.phase === 'dragging') return;
        // Let the sleeve glide to the turntable or back to the crate, then put it away
        const done = setTimeout(() => setDrag(null), 450);
        return () => clearTimeout(done);
    }, [drag]);

    useEffect(() => {
        const onMove = (event: PointerEvent) => {
            const current = press.current;
            if (!current) return;
            if (!current.moved) {
                if (Math.hypot(event.clientX - current.x, event.clientY - current.y) < DRAG_START)
                    return;
                current.moved = true;
                player.setDragging(current.album.id);
            }
            setDrag({
                album: current.album,
                ...toRegion(event.clientX, event.clientY),
                phase: 'dragging',
            });
        };
        const onUp = (event: PointerEvent) => {
            const current = press.current;
            press.current = null;
            if (!current?.moved) return;
            player.setDragging(null);
            const platter = document
                .elementsFromPoint(event.clientX, event.clientY)
                .map(element => element.closest('[data-turntable-drop]'))
                .find(element => element !== null);
            if (platter) {
                const rect = platter.getBoundingClientRect();
                const center = toRegion(rect.left + rect.width / 2, rect.top + rect.height / 2);
                setDrag({ album: current.album, ...center, phase: 'dropping' });
                player.load(current.album.id);
            } else {
                const index = Math.max(
                    inCrate.findIndex(album => album.id === current.album.id),
                    0,
                );
                setDrag({ album: current.album, ...home(index), phase: 'returning' });
            }
        };
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
        return () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
        };
    });

    const onPointerDown = (album: Album) => (event: ReactPointerEvent) => {
        if (!isFocused || event.button !== 0) return;
        press.current = { album, x: event.clientX, y: event.clientY, moved: false };
    };

    return (
        <>
            <div
                role="group"
                aria-label="A wooden crate of Dire Straits records"
                data-no-pan={isFocused || undefined}
                className="absolute rounded-[14px] shadow-[0_2px_2px_rgb(0_0_0/0.3),0_30px_50px_-10px_rgb(0_0_0/0.55),0_70px_110px_-30px_rgb(0_0_0/0.45)]"
                style={{ left: x, top: y, width: WIDTH, height: HEIGHT, rotate: `${rotate}deg` }}>
                {/* Walls: oak boards with lighter end grain */}
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

                {/* Inside: records leaning back, back to front */}
                <div
                    className="absolute rounded-[6px] bg-[#1b100a] shadow-[inset_0_14px_24px_rgb(0_0_0/0.7)]"
                    style={{ left: WALL, top: WALL, ...INNER }}>
                    {inCrate.map((album, index) => {
                        const isLifted = drag?.album.id === album.id;
                        return (
                            <button
                                key={album.id}
                                type="button"
                                aria-label={`Play ${album.title} (${album.year})`}
                                className={cn(
                                    'absolute cursor-grab overflow-hidden rounded-[6px] bg-[#111] outline-offset-8 transition-[scale,opacity] duration-300 ease-out active:cursor-grabbing',
                                    // Leaning back in the crate, foreshortened as seen from above; hover tips
                                    // one forward. Flat scales rather than 3D turns: in Safari every 3D record
                                    // is a GPU layer as big as the record, which ran phones out of memory
                                    '[scale:1_0.47] hover:[scale:1_0.8] focus-visible:[scale:1_0.8]',
                                    'shadow-[0_-30px_40px_-10px_rgb(0_0_0/0.6)]',
                                    // The pulled record leaves a gap in the crate
                                    isLifted && 'opacity-0',
                                )}
                                style={{
                                    left: (INNER.width - RECORD) / 2,
                                    top: FIRST + index * GAP - RECORD,
                                    width: RECORD,
                                    height: RECORD,
                                    transformOrigin: '50% 100%',
                                }}
                                onPointerDown={onPointerDown(album)}
                                onClick={event => {
                                    // A drag ends in a click too; only a plain click plays it
                                    if (event.detail > 0 && drag) return;
                                    player.load(album.id);
                                }}>
                                <Image
                                    src={coverOf(album)}
                                    alt=""
                                    width={600}
                                    height={600}
                                    unoptimized
                                    draggable={false}
                                    className="pointer-events-none size-full object-cover"
                                />
                                {/* Lighter at the top edge, darker down in the crate */}
                                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgb(255_255_255/0.12),transparent_25%,rgb(0_0_0/0.45))]" />
                            </button>
                        );
                    })}
                </div>

                {/* Masking tape on the front, labelled by hand */}
                <div className="absolute -bottom-[26px] left-1/2 flex h-[64px] w-[300px] -translate-x-1/2 -rotate-2 items-center justify-center bg-[#efe3bf]/90 font-hand text-[44px] text-ink/75 shadow-[0_2px_3px_rgb(0_0_0/0.25)]">
                    dire straits
                </div>
            </div>

            {/* The record being pulled out, lifted off the desk */}
            {drag && (
                <div
                    aria-hidden
                    className={cn(
                        'pointer-events-none absolute z-10 rounded-[6px] bg-[#111]',
                        drag.phase === 'dragging'
                            ? 'shadow-[0_60px_80px_-10px_rgb(0_0_0/0.55),0_120px_160px_-40px_rgb(0_0_0/0.45)]'
                            : 'transition-[left,top,scale,opacity] duration-[420ms] ease-out',
                        drag.phase === 'dropping' && 'scale-[0.95] opacity-0',
                        drag.phase === 'returning' && 'scale-[0.84] opacity-0',
                    )}
                    style={{
                        left: drag.x - SLEEVE / 2,
                        top: drag.y - SLEEVE / 2,
                        width: SLEEVE,
                        height: SLEEVE,
                        rotate: drag.phase === 'dragging' ? '-4deg' : '0deg',
                    }}>
                    <Image
                        src={coverOf(drag.album)}
                        alt=""
                        width={600}
                        height={600}
                        unoptimized
                        draggable={false}
                        className="size-full rounded-[inherit] object-cover"
                    />
                    <span className="absolute inset-0 rounded-[inherit] bg-[linear-gradient(125deg,rgb(255_255_255/0.2),transparent_35%)]" />
                </div>
            )}
        </>
    );
};

export default Crate;
