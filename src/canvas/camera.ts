import { useSyncExternalStore } from 'react';

/**
 * The camera maps world coordinates to screen pixels:
 * screen = world * z + (x, y)
 */
export interface CameraState {
    x: number;
    y: number;
    z: number;
}

export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export const MIN_ZOOM = 0.08;
export const MAX_ZOOM = 4;

type Listener = () => void;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const createCamera = () => {
    let state: CameraState = { x: 0, y: 0, z: 1 };
    let viewport = { width: 1, height: 1 };
    let bounds: Rect | null = null;
    let animation: number | null = null;
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

    /** Breathing room around a framed rect, tighter on small screens */
    const defaultPadding = () => Math.min(48, Math.min(viewport.width, viewport.height) * 0.04);

    const stop = () => {
        if (animation !== null) cancelAnimationFrame(animation);
        animation = null;
    };

    /** Camera that fits `rect` in the viewport with some padding */
    const fit = (rect: Rect, padding = defaultPadding()): CameraState => {
        const z = clamp(
            Math.min(
                (viewport.width - padding * 2) / rect.width,
                (viewport.height - padding * 2) / rect.height,
            ),
            MIN_ZOOM,
            MAX_ZOOM,
        );
        return {
            z,
            x: viewport.width / 2 - (rect.x + rect.width / 2) * z,
            y: viewport.height / 2 - (rect.y + rect.height / 2) * z,
        };
    };

    return {
        get: () => state,
        getViewport: () => viewport,
        subscribe: (listener: Listener) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
        setViewport: (width: number, height: number) => {
            // Keep whatever is in the middle of the screen there (e.g. rotating a phone)
            const dx = (width - viewport.width) / 2;
            const dy = (height - viewport.height) / 2;
            viewport = { width, height };
            set({ ...state, x: state.x + dx, y: state.y + dy });
        },
        setBounds: (rect: Rect) => {
            bounds = rect;
        },
        stop,
        set: (next: CameraState) => {
            stop();
            set(next);
        },
        panBy: (dx: number, dy: number) => {
            stop();
            set({ ...state, x: state.x + dx, y: state.y + dy });
        },
        /** Zoom by `factor` keeping the screen point (px, py) fixed */
        zoomAt: (factor: number, px = viewport.width / 2, py = viewport.height / 2) => {
            stop();
            const z = clamp(state.z * factor, MIN_ZOOM, MAX_ZOOM);
            const ratio = z / state.z;
            set({ z, x: px - (px - state.x) * ratio, y: py - (py - state.y) * ratio });
        },
        fit,
        /** Smoothly animate to the camera that frames `rect` */
        flyTo: (rect: Rect, { padding = defaultPadding(), duration = 700 } = {}) => {
            stop();
            const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const from = state;
            const to = fit(rect, padding);
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
