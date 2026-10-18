'use client';

import { useEffect, useState } from 'react';

import { CM } from '~/desk/layout';
import type { Track } from '~/desk/props/now-playing';
import Prop from '~/desk/props/prop';

const SIZE = 30 * CM;

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
    rotate?: number;
}

/** The empty paper sleeve of the record on the turntable, with what's on repeat written on it */
const Sleeve = ({ x, y, rotate }: Props) => {
    const track = useNowPlaying();
    const note = track ? `${track.name} - ${track.artist}` : 'distorted kicks, 150 bpm';
    const heading = track ? (track.live ? 'playing right now' : 'last played') : 'on repeat';

    return (
        <Prop
            label={`Paper record sleeve, handwritten: ${heading}: ${note}`}
            x={x}
            y={y}
            width={SIZE}
            height={SIZE}
            rotate={rotate}
            nudge={3}
            className="paper shadow-object rounded-[6px]">
            {/* The round window that shows the label */}
            <div
                className="absolute rounded-full bg-black/[0.06] shadow-[inset_0_2px_6px_rgb(0_0_0/0.15)]"
                style={{
                    left: SIZE / 2 - 2 * CM,
                    top: SIZE / 2 - 2 * CM,
                    width: 4 * CM,
                    height: 4 * CM,
                }}
            />
            <div className="absolute top-[90px] left-[80px] w-[560px] font-hand text-ink/85">
                <p className="text-[64px] leading-none text-ink/55">{heading}:</p>
                <p className="mt-4 text-[92px] leading-[0.95] -rotate-2 line-clamp-3">{note}</p>
            </div>
            <p className="absolute bottom-[70px] left-[80px] text-[30px] tracking-[0.12em] text-ink/40">
                w-j records · side a
            </p>
        </Prop>
    );
};

export default Sleeve;
