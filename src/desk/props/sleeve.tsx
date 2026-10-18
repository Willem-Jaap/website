'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { CM } from '~/desk/layout';
import type { Track } from '~/desk/props/now-playing';
import { coverOf } from '~/desk/props/albums';
import { player, usePlayer } from '~/desk/props/player';
import Prop from '~/desk/props/prop';

/** A 12-inch LP jacket */
const SIZE = 31.4 * CM;

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

/** The album jacket of the record on the turntable, with a note of what's on repeat stuck to it */
const Sleeve = ({ x, y, rotate }: Props) => {
    const track = useNowPlaying();
    const turntable = usePlayer();
    const album = player.getAlbums().find(candidate => candidate.id === turntable.album);
    const spinning = turntable.track === null ? null : album?.tracks[turntable.track];
    // What the turntable plays wins, then Last.fm, then the favourite
    const note = spinning
        ? spinning.name
        : track
          ? `${track.name} - ${track.artist}`
          : 'Once Upon a Time in the West';
    const heading = spinning
        ? 'playing right now'
        : track
          ? track.live
              ? 'playing right now'
              : 'last played'
          : 'on repeat';

    return (
        <Prop
            label={`The album cover of ${album?.title ?? 'Alchemy'}, with a note: ${heading}: ${note}`}
            x={x}
            y={y}
            width={SIZE}
            height={SIZE}
            rotate={rotate}
            nudge={3}
            className="shadow-object rounded-[4px] bg-[#f3f0ea]">
            {/* The jacket of whatever is on the turntable */}
            <Image
                src={coverOf(album ?? { id: 'alchemy' })}
                alt=""
                width={500}
                height={500}
                unoptimized
                draggable={false}
                className="absolute inset-0 size-full rounded-[inherit] object-cover"
            />
            {/* Card stock: a soft sheen and worn, slightly lighter edges */}
            <div className="absolute inset-0 rounded-[inherit] bg-[linear-gradient(125deg,rgb(255_255_255/0.18),transparent_35%,transparent_70%,rgb(0_0_0/0.12))] shadow-[inset_0_0_0_6px_rgb(255_255_255/0.12),inset_0_0_30px_rgb(0_0_0/0.18)]" />

            {/* A note stuck on, with what's on repeat */}
            <div className="paper absolute right-[60px] bottom-[60px] h-[330px] w-[400px] rotate-[-5deg] p-[34px] font-hand text-ink/85 shadow-[0_2px_2px_rgb(0_0_0/0.2),0_14px_24px_-6px_rgb(0_0_0/0.4)]">
                <div className="absolute -top-[22px] left-[120px] h-[50px] w-[160px] rotate-[3deg] bg-[#f6e7a8]/80 shadow-[0_1px_2px_rgb(0_0_0/0.15)]" />
                <p className="text-[48px] leading-none text-ink/55">{heading}:</p>
                <p className="mt-3 text-[64px] leading-[0.95] -rotate-1 line-clamp-3">{note}</p>
            </div>
        </Prop>
    );
};

export default Sleeve;
