'use client';

import { useSyncExternalStore } from 'react';

import type { SideTrack } from '~/desk/props/alchemy';

export type Status = 'idle' | 'cueing' | 'playing';

export interface PlayerState {
    status: Status;
    /** Index into the side's tracks */
    track: number | null;
    /** Where the needle is, as a radius on the record in cm (null: on its rest) */
    radius: number | null;
}

/** How long the arm takes to swing over and lower into the groove */
export const CUE_TIME = 1100;
const FADE_TIME = 1200;
const VOLUME = 0.85;

/**
 * The turntable's player: the needle, a preview playing through an <audio> element, and
 * surface noise made with Web Audio for the crackle of vinyl.
 */
const createPlayer = () => {
    let state: PlayerState = { status: 'idle', track: null, radius: null };
    let tracks: SideTrack[] = [];
    let audio: HTMLAudioElement | null = null;
    let context: AudioContext | null = null;
    let noise: GainNode | null = null;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let fade: ReturnType<typeof setInterval> | undefined;
    const listeners = new Set<() => void>();

    const set = (next: Partial<PlayerState>) => {
        state = { ...state, ...next };
        listeners.forEach(listener => listener());
    };

    const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /** Fade the music to `to`, then call `done` */
    const fadeTo = (to: number, done?: () => void) => {
        clearInterval(fade);
        if (!audio) return done?.();
        const from = audio.volume;
        const start = performance.now();
        fade = setInterval(() => {
            const t = Math.min((performance.now() - start) / FADE_TIME, 1);
            if (audio) audio.volume = from + (to - from) * t;
            if (t < 1) return;
            clearInterval(fade);
            done?.();
        }, 30);
    };

    /** Looping surface noise: a soft hiss with random pops and clicks */
    const startNoise = () => {
        const AudioContextClass = window.AudioContext;
        if (!AudioContextClass) return;
        context ??= new AudioContextClass();
        void context.resume();
        if (noise) return;
        const seconds = 4;
        const buffer = context.createBuffer(1, context.sampleRate * seconds, context.sampleRate);
        const data = buffer.getChannelData(0);
        let last = 0;
        for (let i = 0; i < data.length; i++) {
            // Brownish hiss
            last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
            data[i] = last * 0.6;
            // A pop every now and then, decaying over a few samples
            if (Math.random() < 0.00018) {
                const size = 0.3 + Math.random() * 0.7;
                for (let j = 0; j < 60 && i + j < data.length; j++) {
                    data[i + j] = (data[i + j] ?? 0) + size * Math.exp(-j / 8) * (j % 2 ? -1 : 1);
                }
            }
        }
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        const filter = context.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 2400;
        filter.Q.value = 0.6;
        noise = context.createGain();
        noise.gain.value = 0;
        source.connect(filter).connect(noise).connect(context.destination);
        source.start();
    };

    const setNoise = (level: number, seconds = 0.4) => {
        if (!context || !noise) return;
        noise.gain.cancelScheduledValues(context.currentTime);
        noise.gain.setTargetAtTime(level, context.currentTime, seconds / 3);
    };

    const play = (index: number) => {
        const track = tracks[index];
        if (!track) return stop();
        audio ??= new Audio();
        audio.onended = () => cue(index + 1);
        audio.src = track.preview;
        audio.volume = 0;
        void audio.play().catch(() => stop());
        fadeTo(VOLUME);
        set({ status: 'playing' });
    };

    /** Swing the arm to `radius` (the start of `index` when left out) and drop the needle */
    const cue = (index: number, radius?: number) => {
        clearTimeout(timer);
        if (!tracks[index]) return stop();
        set({ status: 'cueing', track: index, radius: radius ?? trackStart(index) });
        try {
            startNoise();
            setNoise(0);
        } catch {
            // No Web Audio: the music plays without surface noise
        }
        if (audio && !audio.paused) fadeTo(0, () => audio?.pause());
        timer = setTimeout(
            () => {
                // Needle down: a thump of crackle, settling into the groove
                setNoise(0.9, 0.05);
                setTimeout(() => setNoise(0.18, 0.8), 160);
                play(index);
            },
            reducedMotion() ? 0 : CUE_TIME,
        );
    };

    const stop = () => {
        clearTimeout(timer);
        setNoise(0, 0.2);
        fadeTo(0, () => audio?.pause());
        set({ status: 'idle', track: null, radius: null });
    };

    return {
        get: () => state,
        subscribe: (listener: () => void) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
        setTracks: (next: SideTrack[]) => {
            tracks = next;
        },
        getTracks: () => tracks,
        cue,
        stop,
        /** Drop the needle at `radius` cm on the record: the track whose grooves are there */
        cueAt: (radius: number) => {
            const clamped = Math.min(Math.max(radius, INNER_GROOVE), OUTER_GROOVE);
            cue(trackAt(clamped), clamped);
        },
        toggle: () => (state.status === 'idle' ? cue(0) : stop()),
    };
};

/** The part of the record with music on it, as radii in cm */
export const OUTER_GROOVE = 14.2;
export const INNER_GROOVE = 6.4;

/** Where each track starts (radii in cm), sharing the grooves by running time */
export const trackStarts = (tracks: SideTrack[]) => {
    const total = tracks.reduce((sum, track) => sum + track.length, 0) || 1;
    let radius = OUTER_GROOVE;
    return tracks.map(track => {
        const start = radius;
        radius -= ((OUTER_GROOVE - INNER_GROOVE) * track.length) / total;
        return start;
    });
};

const starts = () => trackStarts(player.getTracks());

const trackStart = (index: number) => starts()[index] ?? OUTER_GROOVE;

const trackAt = (radius: number) => {
    const list = starts();
    let index = 0;
    list.forEach((start, i) => {
        if (radius <= start) index = i;
    });
    return index;
};

export const player = createPlayer();

export const usePlayer = () => useSyncExternalStore(player.subscribe, player.get, player.get);
