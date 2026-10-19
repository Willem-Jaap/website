import { useSyncExternalStore } from 'react';

import { type CameraState, fitRect, type Rect, type Size } from '~/canvas/fit';

export type { CameraState, InitialView, Rect } from '~/canvas/fit';
export { fitRect, pickInitialView } from '~/canvas/fit';

export const MIN_ZOOM = 0.08;
export const MAX_ZOOM = 4;

type Listener = () => void;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * Whether `rect` fills most of the screen in either direction: close enough to read and
 * interact with, whatever the screen size (a fitted region is zoom ~0.6 on a laptop, ~0.2 on a phone).
 */
export const isFramed = (
    rect: Rect,
    { z }: CameraState,
    viewport: { width: number; height: number },
    share = 0.6,
) => rect.width * z > viewport.width * share || rect.height * z > viewport.height * share;

const createCamera = () => {
    let state: CameraState = { x: 0, y: 0, z: 1 };
    let viewport: Size = { width: 1, height: 1 };
    let bounds: Rect | null = null;
    let animation: number | null = null;
    /** The rect the camera was last framed on, until the user moves it themselves */
    let anchor: Rect | null = null;
    const listeners = new Set<Listener>();

    const emit = () => listeners.forEach(listener => listener());

    /** Keep at least part of the world on screen so you can't get lost in the void */
    const constrain = (next: CameraState): CameraState => {
        if (!bounds) return next;
        const margin = 0.5;
        const minX = viewport.width * margin - (bounds.x + bounds.width) * next.z;
        const maxX = viewport.width * (1 - margin) - bounds.x * next.z;
        const minY = viewport.height * margin - (bounds.y + bounds.height) * next.z;
        const maxY = viewport.height * (1 - margin) - bounds.y * next.z;
        return { z: next.z, x: clamp(next.x, minX, maxX), y: clamp(next.y, minY, maxY) };
    };

    const set = (next: CameraState) => {
        state = constrain({ ...next, z: clamp(next.z, MIN_ZOOM, MAX_ZOOM) });
        emit();
    };

    const stop = () => {
        if (animation !== null) cancelAnimationFrame(animation);
        animation = null;
    };

    const animate = (to: CameraState, duration: number) => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const from = state;
        if (reducedMotion || duration === 0) {
            set(to);
            return;
        }
        const start = performance.now();
        const ease = (t: number) => 1 - Math.pow(1 - t, 3);
        const tick = (now: number) => {
            const t = ease(Math.min((now - start) / duration, 1));
            // Interpolate zoom logarithmically so zooming feels even
            const z = from.z * Math.pow(to.z / from.z, t);
            set({ z, x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t });
            animation = t < 1 ? requestAnimationFrame(tick) : null;
        };
        animation = requestAnimationFrame(tick);
    };

    /** Camera that fits `rect` in the viewport with some padding */
    const fit = (rect: Rect, padding?: number) => fitRect(rect, viewport, padding);

    return {
        get: () => state,
        getViewport: () => viewport,
        subscribe: (listener: Listener) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
        setViewport: (width: number, height: number) => {
            // ResizeObserver reports the initial size too
            if (width === viewport.width && height === viewport.height) return;
            const dx = (width - viewport.width) / 2;
            const dy = (height - viewport.height) / 2;
            viewport = { width, height };
            // Still framed on something: frame it again (late layout, rotating a phone)
            if (anchor) {
                stop();
                set(fit(anchor));
                return;
            }
            // Otherwise keep whatever is in the middle of the screen there
            set({ ...state, x: state.x + dx, y: state.y + dy });
        },
        setBounds: (rect: Rect) => {
            bounds = rect;
        },
        stop,
        set: (next: CameraState) => {
            stop();
            anchor = null;
            set(next);
        },
        /** Frame `rect` immediately, and keep it framed when the viewport resizes */
        frame: (rect: Rect) => {
            stop();
            anchor = rect;
            set(fit(rect));
        },
        panBy: (dx: number, dy: number) => {
            stop();
            anchor = null;
            set({ ...state, x: state.x + dx, y: state.y + dy });
        },
        /** Zoom by `factor` keeping the screen point (px, py) fixed */
        zoomAt: (factor: number, px = viewport.width / 2, py = viewport.height / 2) => {
            stop();
            anchor = null;
            const z = clamp(state.z * factor, MIN_ZOOM, MAX_ZOOM);
            const ratio = z / state.z;
            set({ z, x: px - (px - state.x) * ratio, y: py - (py - state.y) * ratio });
        },
        /** Animate zooming by `factor` towards the screen point (px, py), like double-tapping a map */
        zoomTowards: (factor: number, px = viewport.width / 2, py = viewport.height / 2) => {
            stop();
            anchor = null;
            const z = clamp(state.z * factor, MIN_ZOOM, MAX_ZOOM);
            const ratio = z / state.z;
            animate({ z, x: px - (px - state.x) * ratio, y: py - (py - state.y) * ratio }, 300);
        },
        isAnimating: () => animation !== null,
        fit,
        /** Smoothly animate to the camera that frames `rect` */
        flyTo: (
            rect: Rect,
            { padding, duration = 700 }: { padding?: number; duration?: number } = {},
        ) => {
            stop();
            anchor = rect;
            animate(fit(rect, padding), duration);
        },
        toWorld: (px: number, py: number) => ({
            x: (px - state.x) / state.z,
            y: (py - state.y) / state.z,
        }),
    };
};

export const camera = createCamera();

/**
 * Subscribe to a derived value of the camera. The selector should return a primitive
 * (e.g. a quantised zoom level) so components only re-render when it actually changes.
 */
export const useCamera = <T>(selector: (state: CameraState) => T): T =>
    useSyncExternalStore(
        camera.subscribe,
        () => selector(camera.get()),
        () => selector({ x: 0, y: 0, z: 1 }),
    );

/**
 * Semantic zoom: returns how many of the given zoom `thresholds` have been passed.
 * e.g. `useZoomLevel([0.5, 1.5])` → 0 when far away, 1 in between, 2 when close up.
 */
export const useZoomLevel = (thresholds: number[]) =>
    useCamera(({ z }) => thresholds.filter(threshold => z >= threshold).length);

/** Whether `rect` fills most of the screen, see isFramed */
export const useIsFramed = (rect: Rect, share = 0.6) =>
    useCamera(state => isFramed(rect, state, camera.getViewport(), share));
