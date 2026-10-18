'use client';

import type { PropsWithChildren } from 'react';

import { camera, type Rect, useIsFramed } from '~/canvas/camera';
import { REGIONS, type RegionId } from '~/desk/layout';
import cn from '~/utils/cn';
import { trackRegionFocus } from '~/utils/eyes';

type Via = 'click' | 'link' | 'keyboard';

export const focusRegion = (id: RegionId, via: Via) => {
    camera.flyTo(REGIONS[id]);
    history.replaceState(null, '', `#${id}`);
    trackRegionFocus({ region: id, via });
};

/**
 * Whether a region fills the screen. Until it does, clicking it flies the camera there
 * instead of following links.
 */
export const useIsRegionFocused = (id: RegionId) => useIsFramed(REGIONS[id]);

/**
 * Below this zoom body text is too small to read (under ~10px on screen), which is where a
 * fitted region ends up on phones. Tapping an object there flies to it before following links.
 */
const READABLE_ZOOM = 0.45;

/** An object must take up less than this share of its region, so the region itself never counts */
const OBJECT_SHARE = 0.9;

/** The outermost element under `target` that is an object lying in `region`, in world units */
const findObject = (target: Element, region: HTMLElement): Rect | null => {
    const bounds = region.getBoundingClientRect();
    let found: DOMRect | null = null;
    for (let element: Element | null = target; element && element !== region; ) {
        const rect = element.getBoundingClientRect();
        const isObject =
            rect.width > 0 &&
            rect.height > 0 &&
            rect.width < bounds.width * OBJECT_SHARE &&
            rect.height < bounds.height * OBJECT_SHARE;
        if (isObject) found = rect;
        element = element.parentElement;
    }
    if (!found) return null;
    const { x, y } = camera.toWorld(found.left, found.top);
    const { z } = camera.get();
    return { x, y, width: found.width / z, height: found.height / z };
};

/** Where body text is comfortable to read (~12px and up), the zoom tapping an object aims for */
const COMFORTABLE_ZOOM = 0.55;

/**
 * Fly to the object under a tap when it's too small to read; whether the camera moves.
 * Objects wider than the screen at a comfortable zoom are framed around the tap instead.
 */
const flyToObject = (target: Element, region: HTMLElement, tapX: number) => {
    const { z } = camera.get();
    if (z >= READABLE_ZOOM) return false;
    const object = findObject(target, region);
    if (!object) return false;

    let rect = object;
    const viewport = camera.getViewport();
    const width = (viewport.width * 0.92) / COMFORTABLE_ZOOM;
    if (camera.fit(object).z < COMFORTABLE_ZOOM && width < object.width) {
        // Keep the tapped spot where it was across the object: tap the left edge, see the left edge
        const share = (camera.toWorld(tapX, 0).x - object.x) / object.width;
        const x = object.x + Math.min(Math.max(share, 0), 1) * (object.width - width);
        rect = { ...object, x, width };
    }
    // Only when it gets meaningfully closer, so a second tap follows the link
    if (camera.fit(rect).z < z * 1.25) return false;
    camera.flyTo(rect);
    return true;
};

interface Props extends PropsWithChildren {
    id: RegionId;
    className?: string;
}

/**
 * A region of the desk. Children are positioned relative to the region's top-left
 * corner in world units (see CM in layout.ts).
 */
const Region = ({ id, className, children }: Props) => {
    const region = REGIONS[id];
    const isFar = !useIsRegionFocused(id);

    return (
        <section
            data-region={id}
            aria-label={region.label}
            className={cn('absolute', isFar && 'cursor-zoom-in', className)}
            style={{ left: region.x, top: region.y, width: region.width, height: region.height }}
            onClickCapture={event => {
                // Keyboard "clicks" (Enter on a link) always go through
                if (event.detail === 0) return;
                if (isFar) {
                    focusRegion(id, 'click');
                } else if (
                    !flyToObject(event.target as Element, event.currentTarget, event.clientX)
                ) {
                    return;
                }
                event.preventDefault();
                event.stopPropagation();
            }}
            onFocus={event => {
                // Tabbing to a link: bring it on screen, the viewport itself never scrolls
                if (!event.target.matches(':focus-visible')) return;
                if (isFar) return focusRegion(id, 'keyboard');
                const rect = event.target.getBoundingClientRect();
                const isVisible =
                    rect.left >= 0 &&
                    rect.top >= 0 &&
                    rect.right <= window.innerWidth &&
                    rect.bottom <= window.innerHeight;
                if (!isVisible) camera.flyTo(region);
            }}>
            {children}
        </section>
    );
};

export default Region;
