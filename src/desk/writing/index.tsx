import Region from '~/desk/region';
import Stack from '~/desk/writing/stack';

/** "things I wrote", in white marker on the mat, with an arrow to the pile */
const Label = () => (
    <div
        aria-hidden
        className="pointer-events-none absolute left-[950px] top-[150px] w-[320px] text-white">
        <p className="font-hand text-[112px] leading-[0.85] -rotate-6">
            things
            <br />I wrote
        </p>
        <svg
            viewBox="0 0 200 220"
            className="ml-4 mt-4 h-[220px] w-[200px] opacity-90"
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M120 10 C 150 70, 130 140, 30 190" />
            <path d="M28 150 L 26 192 L 68 196" />
        </svg>
    </div>
);

const WritingRegion = () => (
    <Region id="writing">
        <Label />
        <Stack />
    </Region>
);

export default WritingRegion;
