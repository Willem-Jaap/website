import { CM } from '~/desk/layout';

/** Handwritten on the mat, between the About and Pixel Perfect corners */
const Title = () => (
    <div
        className="absolute flex flex-col items-center justify-center text-center text-white"
        style={{ left: 48 * CM, top: 8 * CM, width: 20 * CM, height: 24 * CM }}>
        <h1 className="font-hand text-[180px] leading-none whitespace-nowrap -rotate-3 drop-shadow-[0_4px_0_rgba(0,0,0,0.12)]">
            Willem-Jaap
        </h1>
        <p className="mt-12 font-hand text-[80px] whitespace-nowrap text-white/75 rotate-1">
            founder &amp; developer, NL
        </p>
    </div>
);

export default Title;
