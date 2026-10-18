'use client';

import { useEffect, useRef } from 'react';

import { camera } from '~/canvas/camera';
import Hint from '~/desk/hint';
import { MAT, REGION_ORDER, REGIONS } from '~/desk/layout';
import { focusRegion, useCurrentRegion } from '~/desk/region';
import cn from '~/utils/cn';

const buttonClass =
    'shrink-0 rounded-full px-3.5 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white';

/** Jump between regions and zoom without gestures */
const Dock = () => {
    const ref = useRef<HTMLElement>(null);
    const current = useCurrentRegion();

    // Keep framed regions clear of the dock, wherever safe areas put it
    useEffect(() => {
        const dock = ref.current;
        if (!dock) return;
        const measure = () =>
            camera.setDockSpace(Math.ceil(window.innerHeight - dock.getBoundingClientRect().top));
        const observer = new ResizeObserver(measure);
        observer.observe(dock);
        window.addEventListener('resize', measure);
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, []);

    return (
        <div className="fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-10 flex flex-col items-center gap-3 px-[max(1rem,env(safe-area-inset-left),env(safe-area-inset-right))] pointer-events-none">
            <Hint />
            <nav
                ref={ref}
                aria-label="Desk"
                className="pointer-events-auto flex max-w-full touch-pan-x items-center gap-1 overflow-x-auto overscroll-x-contain rounded-full border border-white/10 bg-black/60 p-1.5 shadow-2xl backdrop-blur-md [scrollbar-width:none]">
                {REGION_ORDER.map(id => (
                    <button
                        key={id}
                        type="button"
                        aria-current={current === id ? 'true' : undefined}
                        className={cn(buttonClass, current === id && 'bg-white/15 text-white')}
                        onClick={() => focusRegion(id, 'dock')}>
                        {REGIONS[id].label}
                    </button>
                ))}
                <span className="mx-1 h-5 w-px shrink-0 bg-white/15" />
                <button
                    type="button"
                    aria-label="Zoom out"
                    className={buttonClass}
                    onClick={() => camera.zoomTowards(0.7)}>
                    −
                </button>
                <button
                    type="button"
                    aria-label="Zoom in"
                    className={buttonClass}
                    onClick={() => camera.zoomTowards(1.4)}>
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
        </div>
    );
};

export default Dock;
