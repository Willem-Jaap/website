/*
 * Pure camera maths, without React, so server components can use it too (see FrameScript).
 */

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

export interface Size {
    width: number;
    height: number;
}

/**
 * The camera that fits `rect` in the viewport with some padding (tighter on small screens).
 *
 * Self-contained, as it's also inlined into the page to frame the desk before hydration
 * (see FrameScript): no references outside the function, MIN_ZOOM and MAX_ZOOM written out.
 */
export const fitRect = (
    rect: Rect,
    viewport: Size,
    padding = Math.min(48, Math.min(viewport.width, viewport.height) * 0.04),
): CameraState => {
    const height = viewport.height - padding * 2;
    const fill = Math.min((viewport.width - padding * 2) / rect.width, height / rect.height);
    const z = Math.min(Math.max(fill, 0.08), 4);
    return {
        z,
        x: viewport.width / 2 - (rect.x + rect.width / 2) * z,
        y: padding + height / 2 - (rect.y + rect.height / 2) * z,
    };
};

/** Where the camera starts: a linked rect, or depending on the screen width */
export interface InitialView {
    links: Record<string, Rect>;
    /** Below this width, start on `narrow` */
    narrowBelow: number;
    narrow: Rect;
    wide: Rect;
}

/** Self-contained like fitRect */
export const pickInitialView = (initial: InitialView, width: number, hash: string): Rect =>
    (Object.prototype.hasOwnProperty.call(initial.links, hash) ? initial.links[hash] : null) ??
    (width < initial.narrowBelow ? initial.narrow : initial.wide);
