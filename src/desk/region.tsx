'use client';

import type { PropsWithChildren } from 'react';

import { camera, useIsFramed } from '~/canvas/camera';
import { REGIONS, type RegionId } from '~/desk/layout';
import cn from '~/utils/cn';

export const focusRegion = (id: RegionId) => {
    camera.flyTo(REGIONS[id]);
    history.replaceState(null, '', `#${id}`);
};

/**
 * Whether a region fills the screen. Until it does, clicking it flies the camera there
 * instead of following links.
 */
export const useIsRegionFocused = (id: RegionId) => useIsFramed(REGIONS[id]);

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
                if (!isFar) return;
                event.preventDefault();
                event.stopPropagation();
                focusRegion(id);
            }}>
            {children}
        </section>
    );
};

export default Region;
