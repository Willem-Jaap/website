import { type GithubData, PROFILE_URL } from '~/desk/github/content';
import { Pin, place } from '~/desk/github/objects';

interface Props {
    calendar: GithubData['calendar'];
    x: number;
    y: number;
    rotate: number;
}

const CELL = 15;
const GAP = 3.5;
const STEP = CELL + GAP;
const DAY_LABELS = 46;
const MONTH_LABELS = 28;

/** Printed greens, a little duller than on screen */
const INK = ['#e6e3da', '#b7d9a8', '#78b86f', '#3f8f45', '#21612b'];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const RADIUS = 3;

/** A day's square with rounded corners, as path commands */
const roundedSquare = (x: number, y: number) => {
    const side = CELL - RADIUS * 2;
    const corner = (dx: number, dy: number) => `a${RADIUS} ${RADIUS} 0 0 1 ${dx} ${dy}`;
    return `M${x + RADIUS} ${y}h${side}${corner(RADIUS, RADIUS)}v${side}${corner(-RADIUS, RADIUS)}h${-side}${corner(-RADIUS, -RADIUS)}v${-side}${corner(RADIUS, -RADIUS)}z`;
};

/** Lay the days out in week columns, starting on Sunday like GitHub does */
const layout = (days: GithubData['calendar']['days']) => {
    const first = days[0];
    if (!first) return { cells: [], months: [], weeks: 0 };
    const offset = new Date(`${first.date}T00:00:00Z`).getUTCDay();
    const cells = days.map((day, i) => ({
        ...day,
        week: Math.floor((i + offset) / 7),
        weekday: (i + offset) % 7,
    }));
    const months = cells
        .filter(cell => cell.date.endsWith('-01'))
        .map(cell => ({ week: cell.week, label: MONTHS[Number(cell.date.slice(5, 7)) - 1] ?? '' }));
    return { cells, months, weeks: Math.ceil((days.length + offset) / 7) };
};

/** A year of contributions, printed on a sheet and pinned to the mat */
const Calendar = ({ calendar, x, y, rotate }: Props) => {
    const { cells, months, weeks } = layout(calendar.days);
    const width = DAY_LABELS + weeks * STEP;
    const height = MONTH_LABELS + 7 * STEP;

    return (
        <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            draggable={false}
            className="paper shadow-object group absolute block rounded-[2px] px-9 pt-8 pb-7 transition-[translate] duration-200 hover:-translate-y-1"
            style={place({ x, y, rotate })}>
            <p className="flex items-baseline justify-between font-sans text-ink">
                <span className="text-[28px] font-semibold tracking-tight">
                    {calendar.total.toLocaleString('en-US')} contributions in the last year
                </span>
                <span className="text-[22px] text-ink/45 transition-colors group-hover:text-ink/80">
                    github.com/Willem-Jaap ↗
                </span>
            </p>
            <svg
                aria-hidden
                className="mt-5 block font-sans"
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}>
                {months.map(({ week, label }) => (
                    <text
                        key={`${label}-${week}`}
                        x={DAY_LABELS + week * STEP}
                        y={18}
                        fontSize={18}
                        fill="#1d1d1f99">
                        {label}
                    </text>
                ))}
                {['Mon', 'Wed', 'Fri'].map((label, i) => (
                    <text
                        key={label}
                        x={0}
                        y={MONTH_LABELS + (i * 2 + 1) * STEP + CELL - 2}
                        fontSize={16}
                        fill="#1d1d1f80">
                        {label}
                    </text>
                ))}
                {/* One path per shade rather than a rect per day: 5 elements instead of 365 */}
                {INK.map((fill, level) => (
                    <path
                        key={fill}
                        fill={fill}
                        d={cells
                            .filter(cell => (INK[cell.level] ? cell.level : 0) === level)
                            .map(cell =>
                                roundedSquare(
                                    DAY_LABELS + cell.week * STEP,
                                    MONTH_LABELS + cell.weekday * STEP,
                                ),
                            )
                            .join('')}
                    />
                ))}
            </svg>
            <Pin x={70} y={22} color="green" />
            <Pin x={width + 2} y={24} color="yellow" />
        </a>
    );
};

export default Calendar;
