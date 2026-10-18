'use client';

import { camera } from '~/canvas/camera';
import { MAT, REGION_ORDER, REGIONS } from '~/desk/layout';
import { focusRegion } from '~/desk/region';

const buttonClass =
    'shrink-0 rounded-full px-3.5 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white';

/** Jump between regions and zoom without gestures */
const Dock = () => (
    <nav
        aria-label="Desk"
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-10 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-black/60 p-1.5 shadow-2xl backdrop-blur-md [scrollbar-width:none]">
        {REGION_ORDER.map(id => (
            <button key={id} type="button" className={buttonClass} onClick={() => focusRegion(id)}>
                {REGIONS[id].label}
            </button>
        ))}
        <span className="mx-1 h-5 w-px shrink-0 bg-white/15" />
        <button
            type="button"
            aria-label="Zoom out"
            className={buttonClass}
            onClick={() => camera.zoomAt(0.7)}>
            −
        </button>
        <button
            type="button"
            aria-label="Zoom in"
            className={buttonClass}
            onClick={() => camera.zoomAt(1.4)}>
            +
        </button>
        <button
            type="button"
            className={buttonClass}
            onClick={() => {
                camera.flyTo(MAT);
                history.replaceState(null, '', window.location.pathname);
            }}>
            Whole desk
        </button>
    </nav>
);

export default Dock;
