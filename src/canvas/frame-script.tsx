import { DOCK_SPACE, fitRect, type InitialView, pickInitialView } from '~/canvas/fit';

const frame = (
    fit: typeof fitRect,
    pick: typeof pickInitialView,
    initial: InitialView,
    dockSpace: number,
) => {
    const world = document.currentScript?.parentElement;
    if (!world) return;
    const viewport = { width: window.innerWidth, height: window.innerHeight };
    const rect = pick(initial, viewport.width, location.hash.slice(1));
    const { x, y, z } = fit(rect, viewport, dockSpace);
    world.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${z})`;
    world.style.setProperty('--px', String(1 / z));
    world.style.setProperty('--zoom', String(z));
    world.dataset.camera = `${x},${y},${z}`;
};

/**
 * Frames the world as soon as it's parsed, so the first paint already shows the right part of
 * the desk instead of waiting for hydration (seconds on a slow phone, which holds back LCP).
 * Render it last inside the Viewport. A server component, so its script is never re-rendered.
 */
const FrameScript = ({ initial }: { initial: InitialView }) => (
    <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
            __html: `(${frame.toString()})(${fitRect.toString()},${pickInitialView.toString()},${JSON.stringify(initial)},${DOCK_SPACE})`,
        }}
    />
);

export default FrameScript;
