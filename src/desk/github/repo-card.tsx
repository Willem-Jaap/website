import type { PropsWithChildren } from 'react';

import { LANGUAGE_COLORS, type Repo } from '~/desk/github/content';
import { place, Star } from '~/desk/github/objects';
import cn from '~/utils/cn';

interface Props {
    repo: Repo;
    blurb: string;
    x: number;
    y: number;
    rotate: number;
}

const CARD = { width: 380, height: 260 };
/** Spacing of the blue rules on the card, the handwriting sits on them */
const RULE = 42;
const HEADER = 84;

const Link = ({
    url,
    label,
    className,
    style,
    children,
}: PropsWithChildren<{
    url: string;
    label: string;
    className?: string;
    style?: React.CSSProperties;
}>) => (
    <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        draggable={false}
        className={cn(
            'group absolute block transition-[translate,box-shadow] duration-200 hover:-translate-y-1.5 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white',
            className,
        )}
        style={style}>
        {children}
    </a>
);

const Meta = ({ repo, className }: { repo: Repo; className?: string }) => (
    <p className={cn('flex items-center gap-6 font-sans text-[22px] text-ink/70', className)}>
        {repo.language && (
            <span className="flex items-center gap-2.5">
                <span
                    className="size-4 rounded-full ring-1 ring-black/10"
                    style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? '#8b8b8b' }}
                />
                {repo.language}
            </span>
        )}
        {repo.stars > 0 && (
            <span className="flex items-center gap-2">
                <Star className="size-[20px] text-ink/55" />
                {repo.stars}
            </span>
        )}
        <span className="ml-auto text-ink/40 transition-colors group-hover:text-ink/80">
            github ↗
        </span>
    </p>
);

/** A ruled index card with a repo typed on the header line and a note written below */
export const IndexCard = ({ repo, blurb, x, y, rotate }: Props) => (
    <Link
        url={repo.url}
        label={`${repo.name} on GitHub: ${blurb}`}
        className="paper shadow-object rounded-[3px]"
        style={{
            ...place({ x, y, rotate }),
            ...CARD,
            backgroundImage: `linear-gradient(to bottom, transparent ${HEADER - 3}px, rgb(226 92 92 / 0.55) ${HEADER - 3}px, rgb(226 92 92 / 0.55) ${HEADER - 1}px, transparent ${HEADER - 1}px), repeating-linear-gradient(to bottom, transparent 0 ${RULE - 2}px, rgb(110 160 220 / 0.35) ${RULE - 2}px ${RULE}px), url('/assets/images/noise.png')`,
            backgroundPosition: `0 0, 0 ${HEADER}px, 0 0`,
            backgroundRepeat: 'no-repeat, repeat-y, repeat',
            backgroundSize: `100% 100%, 100% calc(100% - ${HEADER}px), auto`,
        }}>
        <h3 className="absolute top-[26px] left-7 font-sans text-[32px] leading-none font-semibold tracking-tight text-ink">
            {repo.name}
        </h3>
        <p
            className="absolute inset-x-7 font-hand text-[38px] text-[#24315e]"
            style={{ top: HEADER + 2, lineHeight: `${RULE}px` }}>
            {blurb}
        </p>
        <Meta repo={repo} className="absolute inset-x-7 bottom-5" />
    </Link>
);

const STICKY_COLORS = {
    yellow: '#fde88a',
    pink: '#f9c5d1',
};

/** A square sticky note, slightly curled up at the bottom */
export const StickyNote = ({
    url,
    label,
    x,
    y,
    rotate,
    color = 'yellow',
    size = 300,
    children,
}: PropsWithChildren<{
    url: string;
    label: string;
    x: number;
    y: number;
    rotate: number;
    color?: keyof typeof STICKY_COLORS;
    size?: number;
}>) => (
    <Link
        url={url}
        label={label}
        className="text-ink"
        style={{ ...place({ x, y, rotate }), width: size, height: size }}>
        {/* The curl lifts the bottom corners off the mat, so the shadow is deeper there */}
        <span
            aria-hidden
            className="absolute inset-x-3 top-6 bottom-0 bg-black/40 blur-[14px]"
            style={{ transform: 'perspective(400px) rotateX(8deg) translateY(10px)' }}
        />
        <span
            className="absolute inset-0 flex flex-col p-7"
            style={{
                backgroundColor: STICKY_COLORS[color],
                backgroundImage: `linear-gradient(to bottom, rgb(0 0 0 / 0.05), transparent 14%, transparent 78%, rgb(0 0 0 / 0.07)), url('/assets/images/noise.png')`,
                boxShadow: '0 1px 1px rgb(0 0 0 / 0.15)',
            }}>
            {children}
        </span>
    </Link>
);

export const RepoSticky = ({ repo, blurb, ...position }: Props) => (
    <StickyNote
        url={repo.url}
        label={`${repo.name} on GitHub: ${blurb}`}
        color="pink"
        {...position}>
        <span className="font-hand text-[52px] leading-none font-bold">{repo.name}</span>
        <span className="mt-3 font-hand text-[36px] leading-[1.1] text-ink/85">{blurb}</span>
        <Meta repo={repo} className="mt-auto" />
    </StickyNote>
);
