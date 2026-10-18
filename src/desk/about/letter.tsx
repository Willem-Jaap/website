import type { CSSProperties } from 'react';

import { typewriter } from '~/desk/about/fonts';
import cn from '~/utils/cn';

/** A short bio, typed out on a sheet of paper and signed by hand */
const Letter = ({ className, style }: { className?: string; style?: CSSProperties }) => (
    <article
        aria-label="About me"
        className={cn(
            'paper shadow-object absolute rounded-[2px] px-[56px] pt-[52px] pb-[44px] text-[21px] leading-[1.48] text-[#26262a]',
            '[text-shadow:0_0_0.6px_rgb(38_38_42/0.55)]',
            typewriter.className,
            className,
        )}
        style={style}>
        <p>Hi,</p>
        <p className="mt-[1em]">
            I&apos;m Willem-Jaap, a software developer from the Netherlands. A creative and critical
            thinker, always looking for the most efficient and beautiful solution.
        </p>
        <p className="mt-[1em]">
            I taught myself HTML, CSS and JavaScript at 15, then studied Application- and Media
            Development in Rotterdam. I overengineered a lot of projects and learned a lot from
            that.
        </p>
        <p className="mt-[1em]">
            At WebNL and Emerit I grew into Laravel, Vue and React, and built a local-first cash
            register. In 2023 I founded Pixel Perfect, where I run the business and do the frontend
            and UX on everything we make.
        </p>
        <p className="font-hand mt-[0.6em] text-[54px] leading-none text-[#1f3a7a] [text-shadow:none] -rotate-2">
            Willem-Jaap
        </p>
    </article>
);

export default Letter;
