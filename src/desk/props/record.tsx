'use client';

import { useEffect, useState } from 'react';

import { useZoomLevel } from '~/canvas/camera';
import { CM } from '~/desk/layout';
import Prop from '~/desk/props/prop';
import type { Track } from '~/desk/props/now-playing';
import cn from '~/utils/cn';

/** Close enough to read the label: the record starts turning */
const SPIN_ZOOM = 0.45;

const SLEEVE = 18 * CM;
/** A 7" single */
const DISC = 17.5 * CM;
const LABEL = 8.4 * CM;

/** Fetched from /api/now-playing (Last.fm). Stays null when it isn't set up. */
const useNowPlaying = () => {
    const [track, setTrack] = useState<Track | null>(null);
    useEffect(() => {
        const controller = new AbortController();
        fetch('/api/now-playing', { signal: controller.signal })
            .then(response => (response.ok ? (response.json() as Promise<Track | null>) : null))
            .then(setTrack)
            .catch(() => {});
        return () => controller.abort();
    }, []);
    return track;
};

interface Props {
    x: number;
    y: number;
}

/** A 7" record half out of its paper sleeve, with what's on repeat written on the sleeve */
const Record = ({ x, y }: Props) => {
    const track = useNowPlaying();
    const isClose = useZoomLevel([SPIN_ZOOM]) === 1;

    const note = track ? `${track.name} - ${track.artist}` : 'distorted kicks, 150 bpm';
    const heading = track ? (track.live ? 'playing right now' : 'last played') : 'on repeat';

    return (
        <>
            <Prop
                label={`Paper record sleeve, handwritten: ${heading}: ${note}`}
                x={x}
                y={y}
                width={SLEEVE}
                height={SLEEVE}
                rotate={-6}
                className="paper shadow-object rounded-[6px]">
                {/* Thumb cut-out at the opening */}
                <div className="absolute top-0 right-0 h-full w-[14px] bg-black/5" />
                <div className="absolute top-[64px] left-[52px] w-[300px] font-hand text-ink/85">
                    <p className="text-[46px] leading-none text-ink/55">{heading}:</p>
                    <p className="mt-3 text-[64px] leading-[0.95] -rotate-2 line-clamp-4">{note}</p>
                </div>
                <p className="absolute bottom-[40px] left-[52px] text-[22px] tracking-[0.3em] uppercase text-ink/35">
                    45 rpm · side a
                </p>
            </Prop>

            <div
                role="img"
                aria-label="A black 7 inch vinyl single with a cream label: Hardstyle Kicks, 150 BPM"
                className="group absolute rounded-full shadow-object"
                style={{ left: x + SLEEVE * 0.52, top: y + 10, width: DISC, height: DISC }}>
                {/* Turns: grooves (with a few imperfections so you can see it turn) and the label */}
                <div
                    className={cn(
                        'absolute inset-0 rounded-full motion-safe:animate-[spin_1.8s_linear_infinite] [animation-play-state:paused] group-hover:[animation-play-state:running]',
                        isClose && '[animation-play-state:running]',
                    )}
                    style={{
                        background: [
                            'radial-gradient(circle, transparent 0 13px, transparent 14px)',
                            'repeating-radial-gradient(circle, #141414 0 2px, #1b1b1b 2px 3.5px)',
                        ].join(','),
                        mask: 'radial-gradient(circle, transparent 0 13px, #000 14px)',
                    }}>
                    {/* Run-out groove and lead-in */}
                    <div
                        className="absolute rounded-full border-[18px] border-[#0d0d0d]"
                        style={{ inset: (DISC - LABEL) / 2 - 40 }}
                    />
                    <div className="absolute inset-[6px] rounded-full border-[10px] border-[#101010]" />
                    {/* Dust and a scuff, so the spin shows */}
                    <div className="absolute top-[22%] left-[70%] h-[3px] w-[60px] rotate-[35deg] rounded-full bg-white/15" />
                    <div className="absolute top-[78%] left-[24%] size-[4px] rounded-full bg-white/30" />
                    <div className="absolute top-[30%] left-[18%] size-[3px] rounded-full bg-white/25" />
                    <div
                        className="absolute grid place-items-center rounded-full bg-[#efe6d2] text-center text-[#2a2420]"
                        style={{
                            inset: (DISC - LABEL) / 2,
                            backgroundImage:
                                'radial-gradient(circle, transparent 0 34px, #e04a2a 35px 39px, transparent 40px), url(/assets/images/noise.png)',
                        }}>
                        <p className="absolute top-[34px] text-[24px] font-semibold tracking-[0.25em] uppercase">
                            W-J Records
                        </p>
                        <p className="absolute top-[86px] font-hand text-[44px] leading-none text-[#e04a2a] -rotate-3">
                            Hardstyle Kicks
                        </p>
                        <p className="absolute bottom-[78px] text-[18px] tracking-[0.2em] uppercase">
                            tanh(10x) · 150 bpm
                        </p>
                        <p className="absolute bottom-[42px] text-[16px] tracking-[0.3em] uppercase text-[#2a2420]/60">
                            Side A · 45
                        </p>
                    </div>
                </div>
                {/* Light from the window stays put while the record turns */}
                <div
                    className="pointer-events-none absolute inset-0 rounded-full mix-blend-screen"
                    style={{
                        background:
                            'conic-gradient(from 20deg, transparent 0deg, rgb(255 255 255 / 0.16) 28deg, transparent 60deg, transparent 180deg, rgb(255 255 255 / 0.12) 208deg, transparent 240deg)',
                        mask: `radial-gradient(circle, transparent 0 ${LABEL / 2}px, #000 ${LABEL / 2 + 1}px)`,
                    }}
                />
            </div>
        </>
    );
};

export default Record;
