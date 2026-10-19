import { CM } from '~/desk/layout';
import Prop from '~/desk/props/prop';

const SIZE = 9 * CM;

interface Props {
    x: number;
    y: number;
    rotate: number;
}

/** A sticky note with the next race */
const RaceNote = ({ x, y, rotate }: Props) => (
    <Prop
        label="Sticky note, handwritten: next up: 11 Strandentocht, 25k run"
        x={x}
        y={y}
        width={SIZE}
        height={SIZE}
        rotate={rotate}
        nudge={3}
        className="rounded-[3px] bg-[#fde88a] shadow-[0_2px_2px_rgb(0_0_0/0.18),0_14px_22px_-8px_rgb(0_0_0/0.4)]">
        {/* The sticky strip along the top is a shade darker */}
        <div className="absolute inset-x-0 top-0 h-[60px] bg-black/[0.04]" />
        <div aria-hidden className="absolute inset-[30px] font-hand text-[#24324f]">
            <p className="text-[40px] leading-none text-[#24324f]/60">next up:</p>
            <p className="mt-[14px] text-[56px] leading-[0.95] -rotate-2">11 Strandentocht</p>
            <p className="mt-[18px] text-[52px] leading-none text-[#c0392b] -rotate-1">25k run</p>
        </div>
    </Prop>
);

export default RaceNote;
