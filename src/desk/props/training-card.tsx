import { CM } from '~/desk/layout';
import Prop from '~/desk/props/prop';

const WIDTH = 13 * CM;
const HEIGHT = 8 * CM;
const LINE = 46;

const SETS = [
    { lift: 'Bench', sets: '5 × 5', done: 5 },
    { lift: 'Incline DB', sets: '3 × 10', done: 3 },
    { lift: 'Dips', sets: '3 × max', done: 2 },
];

interface Props {
    x: number;
    y: number;
    rotate: number;
}

/** An index card with today's push session, sets ticked off */
const TrainingCard = ({ x, y, rotate }: Props) => (
    <Prop
        label={`Index card, handwritten training log. Push day: ${SETS.map(set => `${set.lift} ${set.sets}`).join(', ')}. Next week plus 2.5 kilo.`}
        x={x}
        y={y}
        width={WIDTH}
        height={HEIGHT}
        rotate={rotate}
        nudge={-2}
        className="paper shadow-object rounded-[4px]">
        <div
            aria-hidden
            className="absolute inset-0"
            style={{
                backgroundImage: `linear-gradient(to bottom, transparent 70px, rgb(214 70 70 / 0.55) 70px 72px, transparent 72px), repeating-linear-gradient(to bottom, transparent 0 ${LINE - 1.5}px, rgb(70 130 200 / 0.35) ${LINE - 1.5}px ${LINE}px)`,
                backgroundPosition: `0 0, 0 ${72 + 2}px`,
                backgroundSize: `100% 100%, 100% calc(100% - 74px)`,
                backgroundRepeat: 'no-repeat',
            }}
        />
        <div aria-hidden className="absolute inset-x-[34px] top-[16px] font-hand text-[#24324f]">
            <p className="text-[50px] leading-none -rotate-1">push day</p>
            <ul className="mt-[16px] text-[38px] leading-[46px]">
                {SETS.map(set => (
                    <li key={set.lift} className="flex items-baseline gap-4">
                        <span className="w-[170px]">{set.lift}</span>
                        <span className="w-[110px]">{set.sets}</span>
                        <span className="tracking-[0.12em] text-[#24324f]/80">
                            {'/'.repeat(set.done)}
                        </span>
                    </li>
                ))}
            </ul>
            <p className="absolute top-[200px] right-0 rotate-[-6deg] text-[36px] text-[#c0392b]">
                next week +2.5 kg
            </p>
        </div>
    </Prop>
);

export default TrainingCard;
