import { CM } from '~/desk/layout';

/** One centimetre at the zoom the backdrop is drawn at */
const UNIT = CM * 0.75;

/**
 * The desk, out of focus behind a sheet that's been picked up: dark wood
 * with a slice of the blue cutting mat, without mounting the interactive canvas.
 */
const Backdrop = () => (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
            className="absolute -left-[10vw] top-[8vh] h-[140vh] w-[70vw] min-w-[560px] rotate-[8deg] rounded-[28px] bg-mat blur-[6px]"
            style={{
                backgroundImage: [
                    `linear-gradient(to right, rgb(255 255 255 / 0.5) 2px, transparent 2px)`,
                    `linear-gradient(to bottom, rgb(255 255 255 / 0.5) 2px, transparent 2px)`,
                    `linear-gradient(to right, rgb(255 255 255 / 0.22) 1px, transparent 1px)`,
                    `linear-gradient(to bottom, rgb(255 255 255 / 0.22) 1px, transparent 1px)`,
                ].join(','),
                backgroundSize: `${UNIT * 5}px ${UNIT * 5}px, ${UNIT * 5}px ${UNIT * 5}px, ${UNIT}px ${UNIT}px, ${UNIT}px ${UNIT}px`,
            }}
        />
        <div className="absolute inset-0 bg-desk/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(0_0_0/0.45))]" />
    </div>
);

export default Backdrop;
