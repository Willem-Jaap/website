'use client';

import { type PropsWithChildren, useEffect, useRef } from 'react';

import { camera, type Rect } from '~/canvas/camera';
import { useGesture } from '@use-gesture/react';

interface Props extends PropsWithChildren {
    /** The world's extent, the camera can't wander off it */
    bounds: Rect;
    /** Where the camera starts, given the viewport size */
    initial: (width: number, height: number) => Rect;
}

const SETTLE_DELAY = 160;

/**
 * Pan & zoom surface. Children are positioned in world units; the camera transform
 * is written straight to the DOM so moving around never re-renders React.
 */
const Viewport = ({ bounds, initial, children }: Props) => {
    const viewportRef = useRef<HTMLDivElement>(null);
    const worldRef = useRef<HTMLDivElement>(null);
    const dragged = useRef(false);
    const inertia = useRef<number | null>(null);

    // Camera → DOM
    useEffect(() => {
        const world = worldRef.current;
        if (!world) return;
        let settle: ReturnType<typeof setTimeout> | undefined;

        const apply = () => {
            const { x, y, z } = camera.get();
            world.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${z})`;
            // Rasterise as a layer while moving, re-render crisp vectors once settled
            world.style.willChange = 'transform';
            clearTimeout(settle);
            settle = setTimeout(() => {
                world.style.willChange = '';
                // One screen pixel in world units, for hairlines that stay visible at any zoom
                world.style.setProperty('--px', String(1 / camera.get().z));
                world.style.setProperty('--zoom', String(camera.get().z));
            }, SETTLE_DELAY);
        };

        apply();
        const unsubscribe = camera.subscribe(apply);
        return () => {
            unsubscribe();
            clearTimeout(settle);
        };
    }, []);

    // Viewport size & initial position
    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;
        camera.setBounds(bounds);
        camera.setViewport(viewport.clientWidth, viewport.clientHeight);
        camera.frame(initial(viewport.clientWidth, viewport.clientHeight));

        const observer = new ResizeObserver(() =>
            camera.setViewport(viewport.clientWidth, viewport.clientHeight),
        );
        observer.observe(viewport);
        return () => observer.disconnect();
    }, [bounds, initial]);

    // Keyboard navigation
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement | null;
            if (target?.closest('input, textarea, [contenteditable="true"]')) return;
            if (event.metaKey || event.ctrlKey || event.altKey) return;
            const step = 80;
            const actions: Record<string, () => void> = {
                'ArrowLeft': () => camera.panBy(step, 0),
                'ArrowRight': () => camera.panBy(-step, 0),
                'ArrowUp': () => camera.panBy(0, step),
                'ArrowDown': () => camera.panBy(0, -step),
                '+': () => camera.zoomAt(1.25),
                '=': () => camera.zoomAt(1.25),
                '-': () => camera.zoomAt(0.8),
                '0': () => camera.flyTo(bounds),
            };
            const action = actions[event.key];
            if (!action) return;
            event.preventDefault();
            action();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [bounds]);

    const stopInertia = () => {
        if (inertia.current !== null) cancelAnimationFrame(inertia.current);
        inertia.current = null;
    };

    const glide = (vx: number, vy: number) => {
        // Velocity in px/ms, decays exponentially
        let last = performance.now();
        const step = (now: number) => {
            const dt = now - last;
            last = now;
            camera.panBy(vx * dt, vy * dt);
            const decay = Math.pow(0.995, dt);
            vx *= decay;
            vy *= decay;
            inertia.current = Math.hypot(vx, vy) > 0.02 ? requestAnimationFrame(step) : null;
        };
        inertia.current = requestAnimationFrame(step);
    };

    useGesture(
        {
            onDragStart: () => {
                stopInertia();
                dragged.current = false;
            },
            onDrag: ({ delta: [dx, dy], movement: [mx, my], pinching, cancel }) => {
                if (pinching) return cancel();
                if (Math.hypot(mx, my) > 4) dragged.current = true;
                camera.panBy(dx, dy);
            },
            onDragEnd: ({ velocity: [vx, vy], direction: [dirX, dirY], pinching }) => {
                if (pinching || !dragged.current) return;
                if (Math.hypot(vx, vy) > 0.2) glide(vx * dirX, vy * dirY);
            },
            onPinchStart: stopInertia,
            onPinch: ({ origin: [ox, oy], offset: [scale], memo }) => {
                const previous = (memo as number | undefined) ?? scale;
                const rect = viewportRef.current?.getBoundingClientRect();
                camera.zoomAt(scale / previous, ox - (rect?.left ?? 0), oy - (rect?.top ?? 0));
                return scale;
            },
            onWheel: ({ event, delta: [dx, dy] }) => {
                event.preventDefault();
                // Trackpad pinch arrives as ctrl+wheel and is handled by onPinch
                if (event.ctrlKey) return;
                // The gesture's end event has no delta; moving the camera would cancel a flyTo
                if (dx === 0 && dy === 0) return;
                stopInertia();
                const rect = viewportRef.current?.getBoundingClientRect();
                const px = event.clientX - (rect?.left ?? 0);
                const py = event.clientY - (rect?.top ?? 0);
                // A mouse wheel zooms (like a map), a trackpad two-finger scroll pans
                const isMouseWheel =
                    event.deltaMode !== 0 ||
                    (dx === 0 && Math.abs(dy) >= 40 && Number.isInteger(event.deltaY));
                if (isMouseWheel || event.metaKey) {
                    camera.zoomAt(Math.exp(-dy * 0.0015), px, py);
                } else {
                    camera.panBy(-dx, -dy);
                }
            },
        },
        {
            target: viewportRef,
            eventOptions: { passive: false },
            drag: { filterTaps: true, pointer: { capture: false } },
            pinch: { scaleBounds: { min: 0.001, max: 1000 }, rubberband: false },
        },
    );

    return (
        <div
            ref={viewportRef}
            className="fixed inset-0 overflow-hidden touch-none select-none cursor-grab active:cursor-grabbing"
            onScroll={event => {
                // Focus or find-in-page can scroll this container; the camera owns the position
                event.currentTarget.scrollTo(0, 0);
            }}
            onClickCapture={event => {
                // Don't treat the end of a drag as a click on whatever is under the cursor
                if (!dragged.current) return;
                event.preventDefault();
                event.stopPropagation();
                dragged.current = false;
            }}>
            <div ref={worldRef} className="absolute top-0 left-0 origin-top-left">
                {children}
            </div>
        </div>
    );
};

export default Viewport;
