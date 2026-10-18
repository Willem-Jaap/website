import { type Contribution, PROFILE_URL } from '~/desk/github/content';
import { place } from '~/desk/github/objects';

interface Props {
    contributions: Contribution[];
    total: number;
    x: number;
    y: number;
    rotate: number;
}

const WIDTH = 380;

/** Zigzag where the receipt was torn off the roll, top and bottom */
const torn = (() => {
    const teeth = 19;
    const depth = 10;
    const top = Array.from(
        { length: teeth * 2 + 1 },
        (_, i) => `${(i / (teeth * 2)) * 100}% ${i % 2 ? depth : 0}px`,
    );
    const bottom = Array.from(
        { length: teeth * 2 + 1 },
        (_, i) => `${100 - (i / (teeth * 2)) * 100}% calc(100% - ${i % 2 ? depth : 0}px)`,
    );
    return `polygon(${[...top, ...bottom].join(', ')})`;
})();

/** Deterministic bar widths, so server and client render the same barcode */
const BARS = Array.from({ length: 46 }, (_, i) => 1 + ((i * 7 + 3) % 5 === 0 ? 3 : (i * 13) % 3));

const Rule = () => <div aria-hidden className="my-4 border-t-[3px] border-dashed border-ink/45" />;

/** A thermal till receipt listing pull requests merged into other people's projects */
const Receipt = ({ contributions, total, x, y, rotate }: Props) => (
    <div
        className="absolute"
        style={{
            ...place({ x, y, rotate }),
            width: WIDTH,
            filter: 'drop-shadow(0 2px 1px rgb(0 0 0 / 0.18)) drop-shadow(0 18px 18px rgb(0 0 0 / 0.3))',
        }}>
        <div
            className="relative bg-[#f7f6f2] px-8 pt-10 pb-[130px] font-mono text-[21px] leading-[1.35] text-[#2b2b2e]"
            style={{
                clipPath: torn,
                backgroundImage: `url('/assets/images/noise.png'), linear-gradient(to right, rgb(0 0 0 / 0.035), transparent 12%, transparent 88%, rgb(0 0 0 / 0.035))`,
            }}>
            <div className="text-center">
                <p className="text-[30px] font-bold tracking-[0.12em]">UPSTREAM</p>
                <p className="tracking-[0.2em]">MERGE RECEIPT</p>
            </div>
            <Rule />
            <ul className="flex flex-col gap-3">
                {contributions.map(pr => (
                    <li key={pr.url}>
                        <a
                            href={pr.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            draggable={false}
                            className="block decoration-2 underline-offset-4 hover:underline">
                            <span className="flex justify-between gap-3 font-bold">
                                <span className="truncate">{pr.repo}</span>
                                <span>#{pr.number}</span>
                            </span>
                            <span className="block text-[19px] text-ink/70">{pr.title}</span>
                        </a>
                    </li>
                ))}
            </ul>
            <Rule />
            <p className="flex justify-between text-[26px] font-bold">
                <span>TOTAL MERGED</span>
                <span>{total}</span>
            </p>
            <Rule />
            <p className="text-center tracking-[0.15em]">THANK YOU, MAINTAINERS</p>
            <a
                href={`https://github.com/pulls?q=${encodeURIComponent('is:pr is:merged author:Willem-Jaap')}`}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                aria-label="All my merged pull requests on GitHub"
                className="mt-6 flex h-[64px] items-stretch justify-center gap-[3px]">
                {BARS.map((width, i) => (
                    <span key={i} className="bg-[#2b2b2e]" style={{ width: width * 2 }} />
                ))}
            </a>
            <p className="mt-2 text-center text-[16px] tracking-[0.12em] text-ink/60">
                {PROFILE_URL.replace('https://', '').toUpperCase()}
            </p>
        </div>
        {/* Rubber stamp, pressed on slightly crooked */}
        <p
            aria-hidden
            className="pointer-events-none absolute right-12 bottom-[34px] rounded-[8px] border-[5px] border-[#8250df] px-4 py-0.5 font-sans text-[42px] leading-tight font-black tracking-[0.14em] text-[#8250df] opacity-80 mix-blend-multiply"
            style={{ transform: 'rotate(-9deg)', filter: 'blur(0.4px)' }}>
            MERGED
        </p>
    </div>
);

export default Receipt;
