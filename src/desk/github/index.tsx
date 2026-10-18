import Calendar from '~/desk/github/calendar';
import {
    CONTRIBUTIONS,
    type GithubData,
    PROFILE_URL,
    REPOS,
    SNAPSHOT,
} from '~/desk/github/content';
import { Pin, Tape } from '~/desk/github/objects';
import Receipt from '~/desk/github/receipt';
import { IndexCard, RepoSticky, StickyNote } from '~/desk/github/repo-card';
import Region from '~/desk/region';

/** Where each repo lies, in order of REPOS, with how it's stuck to the mat */
const SPOTS = [
    { x: 20, y: 140, rotate: -3, fix: 'pin' },
    { x: 425, y: 125, rotate: 2, fix: 'tape' },
    { x: 815, y: 155, rotate: -1.5, fix: 'pin' },
    { x: 35, y: 425, rotate: 1.5, fix: 'tape' },
    { x: 440, y: 410, rotate: -2.5, fix: 'pin' },
    { x: 830, y: 440, rotate: 2.5, fix: 'tape' },
    { x: 60, y: 700, rotate: -4, fix: 'sticky' },
] as const;

const PIN_COLORS = ['red', 'blue', 'yellow'] as const;
const TAPE_COLORS = ['cream', 'mint', 'pink'] as const;

interface Props {
    /** Live data from GitHub (see live.tsx); the committed snapshot otherwise */
    data?: GithubData;
}

const GithubRegion = ({ data = SNAPSHOT }: Props) => (
    <Region id="github">
        <h2 className="pointer-events-none absolute top-0 left-6 font-hand text-[120px] leading-none text-white/90 -rotate-2">
            Open source
        </h2>

        {REPOS.map(({ fullName, blurb }, i) => {
            const repo = data.repos.find(r => r.fullName === fullName);
            const spot = SPOTS[i];
            if (!repo || !spot) return null;
            const { fix, ...position } = spot;
            if (fix === 'sticky')
                return <RepoSticky key={fullName} repo={repo} blurb={blurb} {...position} />;
            return (
                <div key={fullName} className="contents">
                    <IndexCard repo={repo} blurb={blurb} {...position} />
                    {fix === 'pin' ? (
                        <Pin x={position.x + 335} y={position.y + 30} color={PIN_COLORS[i % 3]} />
                    ) : (
                        <Tape
                            x={position.x + 115}
                            y={position.y - 22}
                            rotate={position.rotate * -1.5}
                            color={TAPE_COLORS[i % 3]}
                        />
                    )}
                </div>
            );
        })}

        <StickyNote url={PROFILE_URL} x={450} y={715} rotate={3} size={260}>
            <span className="font-hand text-[44px] leading-[1.05]">More at</span>
            <span className="mt-2 font-hand text-[46px] leading-none font-bold underline decoration-2 underline-offset-8">
                github.com/
                <br />
                Willem-Jaap
            </span>
            <span className="mt-auto self-end font-hand text-[56px] leading-none transition-transform group-hover:translate-x-2">
                &rarr;
            </span>
        </StickyNote>

        <p className="pointer-events-none absolute top-[760px] left-[810px] w-[330px] font-hand text-[54px] leading-[1.05] text-white/85 rotate-[-4deg]">
            {data.upstream.total} PRs merged into other people&rsquo;s projects &rarr;
        </p>

        <Calendar calendar={data.calendar} x={30} y={975} rotate={-0.8} />

        <Receipt
            contributions={CONTRIBUTIONS}
            total={data.upstream.total}
            x={1210}
            y={70}
            rotate={2}
        />
        <Tape x={1325} y={52} rotate={-4} width={160} color="mint" />
    </Region>
);

export default GithubRegion;
