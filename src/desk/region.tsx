'use client';

import type { PropsWithChildren } from 'react';

import { camera, useZoomLevel } from '~/canvas/camera';
import { REGIONS, type RegionId } from '~/desk/layout';
import cn from '~/utils/cn';

/** Below this zoom a region is "far away": clicking it flies the camera there */
export const FOCUS_ZOOM = 0.45;

export const focusRegion = (id: RegionId) => {
    camera.flyTo(REGIONS[id]);
    history.replaceState(null, '', `#${id}`);
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
    const isFar = useZoomLevel([FOCUS_ZOOM]) === 0;

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
