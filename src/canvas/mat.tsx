import { CM, MAT } from '~/desk/layout';

const MARGIN = 2 * CM;
const GRID = {
    x: MARGIN,
    y: MARGIN,
    width: MAT.width - MARGIN * 2,
    height: MAT.height - MARGIN * 2,
};
const COLS = GRID.width / CM;
const ROWS = GRID.height / CM;
const ORIGIN = { x: GRID.x, y: GRID.y + GRID.height };

/** A hairline that is at least one screen pixel wide, but never thinner than the printed line */
const hairline = (world: number, screen = 1) => `max(${world}px, calc(var(--px, 1) * ${screen}px))`;

const range = (count: number) => Array.from({ length: count }, (_, index) => index);

/** A single path with a line every `step` world units, counted from the grid's bottom-left corner */
const gridLines = (step: number) => {
    const commands: string[] = [];
    for (let x = GRID.x; x <= GRID.x + GRID.width + 0.01; x += step) {
        commands.push(`M${+x.toFixed(2)} ${GRID.y}V${GRID.y + GRID.height}`);
    }
    for (let y = GRID.y + GRID.height; y >= GRID.y - 0.01; y -= step) {
        commands.push(`M${GRID.x} ${+y.toFixed(2)}H${GRID.x + GRID.width}`);
    }
    return commands.join('');
};

const HALF_CM_LINES = gridLines(CM / 2);
const CM_LINES = gridLines(CM);
const FIVE_CM_LINES = gridLines(CM * 5);

const polar = (degrees: number, radius: number) => {
    const radians = (degrees * Math.PI) / 180;
    // Rounded, as trigonometry can differ in the last digits between server and browser
    return {
        x: Math.round((ORIGIN.x + Math.cos(radians) * radius) * 100) / 100,
        y: Math.round((ORIGIN.y - Math.sin(radians) * radius) * 100) / 100,
    };
};

/**
 * The self-healing cutting mat, drawn as vectors so it stays crisp at every zoom level.
 * Half-centimetre lines fade in as you zoom closer (driven by --zoom on the world element).
 */
const Mat = () => {
    const protractor = 30 * CM;

    return (
        <svg
            aria-hidden
            className="absolute top-0 left-0 rounded-[24px] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7),0_2px_0_rgba(255,255,255,0.15)_inset]"
            width={MAT.width}
            height={MAT.height}
            viewBox={`0 0 ${MAT.width} ${MAT.height}`}>
            <defs>
                <clipPath id="mat-grid">
                    <rect {...GRID} />
                </clipPath>
                <radialGradient id="mat-sheen" cx="30%" cy="20%" r="90%">
                    <stop offset="0%" stopColor="#fff" stopOpacity={0.1} />
                    <stop offset="100%" stopColor="#000" stopOpacity={0.12} />
                </radialGradient>
            </defs>

            <rect width={MAT.width} height={MAT.height} rx={24} fill="#2f8be0" />

            <g clipPath="url(#mat-grid)">
                <path
                    d={HALF_CM_LINES}
                    stroke="#fff"
                    strokeWidth={0.6}
                    className="transition-opacity duration-300"
                    style={{ opacity: 'clamp(0, calc((var(--zoom, 0) - 0.8) * 0.3), 0.25)' }}
                />
                <path
                    d={CM_LINES}
                    stroke="#fff"
                    opacity={0.4}
                    style={{ strokeWidth: hairline(1) }}
                />
                <path
                    d={FIVE_CM_LINES}
                    stroke="#fff"
                    opacity={0.85}
                    style={{ strokeWidth: hairline(2.5, 1.5) }}
                />

                {/* Angle guides from the bottom-left corner */}
                <g stroke="#fff" opacity={0.75} style={{ strokeWidth: hairline(2, 1.25) }}>
                    {[30, 45, 60].map(angle => {
                        const end = polar(angle, MAT.width * 2);
                        return (
                            <line key={angle} x1={ORIGIN.x} y1={ORIGIN.y} x2={end.x} y2={end.y} />
                        );
                    })}
                    <line
                        x1={GRID.x + 26 * CM}
                        y1={GRID.y}
                        x2={GRID.x + 26 * CM + GRID.height}
                        y2={GRID.y + GRID.height}
                    />
                </g>

                {/* Protractor */}
                <g
                    stroke="#fff"
                    fill="none"
                    opacity={0.85}
                    style={{ strokeWidth: hairline(2, 1.25) }}>
                    <path
                        d={`M ${ORIGIN.x} ${ORIGIN.y - protractor} A ${protractor} ${protractor} 0 0 1 ${ORIGIN.x + protractor} ${ORIGIN.y}`}
                    />
                    <path
                        d={range(91)
                            .map(degrees => {
                                const length =
                                    degrees % 10 === 0
                                        ? 1.2 * CM
                                        : degrees % 5 === 0
                                          ? 0.8 * CM
                                          : 0.4 * CM;
                                const outer = polar(degrees, protractor);
                                const inner = polar(degrees, protractor - length);
                                return `M${outer.x} ${outer.y}L${inner.x} ${inner.y}`;
                            })
                            .join('')}
                    />
                </g>
                <g
                    fill="#fff"
                    fontSize={CM * 0.55}
                    textAnchor="middle"
                    opacity={0.85}
                    fontFamily="var(--font-sans)">
                    {range(10).map(index => {
                        const degrees = index * 10;
                        const point = polar(degrees, protractor - 2 * CM);
                        return (
                            <text key={degrees} x={point.x} y={point.y} dominantBaseline="middle">
                                {degrees}°
                            </text>
                        );
                    })}
                </g>

                {/* Circle templates */}
                <g stroke="#fff" fill="none" opacity={0.7} style={{ strokeWidth: hairline(1.5) }}>
                    {range(5).map(index => (
                        <circle
                            key={index}
                            cx={GRID.x + 92 * CM}
                            cy={GRID.y + 40 * CM}
                            r={(index + 1) * 1.5 * CM}
                        />
                    ))}
                    {range(10).map(index => (
                        <circle
                            key={index}
                            cx={GRID.x + GRID.width - 1.5 * CM}
                            cy={GRID.y + 6 * CM + index * 6 * CM}
                            r={0.3 * CM + index * 0.08 * CM}
                        />
                    ))}
                </g>
            </g>

            {/* Rulers */}
            <g fill="#fff" fontSize={CM * 0.38} fontFamily="var(--font-sans)" opacity={0.85}>
                {/* Flat, without a group per number: the mat is the biggest part of the DOM */}
                <g textAnchor="middle">
                    {range(COLS + 1).map(index => (
                        <text key={index} x={GRID.x + index * CM} y={GRID.y - CM * 0.45}>
                            {index}
                        </text>
                    ))}
                    {range(COLS + 1).map(index => (
                        <text
                            key={index}
                            x={GRID.x + index * CM}
                            y={GRID.y + GRID.height + CM * 0.85}>
                            {index}
                        </text>
                    ))}
                </g>
                <g dominantBaseline="middle" textAnchor="end">
                    {range(ROWS + 1).map(index => (
                        <text
                            key={index}
                            x={GRID.x - CM * 0.35}
                            y={GRID.y + GRID.height - index * CM}>
                            {index}
                        </text>
                    ))}
                </g>
                <g dominantBaseline="middle">
                    {range(ROWS + 1).map(index => (
                        <text
                            key={index}
                            x={GRID.x + GRID.width + CM * 0.35}
                            y={GRID.y + GRID.height - index * CM}>
                            {index}
                        </text>
                    ))}
                </g>
            </g>

            <text
                x={GRID.x + GRID.width}
                y={GRID.y + GRID.height + CM * 1.6}
                textAnchor="end"
                fill="#fff"
                opacity={0.7}
                fontSize={CM * 0.4}
                letterSpacing={CM * 0.08}
                fontFamily="var(--font-sans)">
                SELF-HEALING CUTTING MAT · 120 × 80 CM · WILLEMJAAP.COM
            </text>

            <rect width={MAT.width} height={MAT.height} rx={24} fill="url(#mat-sheen)" />
        </svg>
    );
};

export default Mat;
