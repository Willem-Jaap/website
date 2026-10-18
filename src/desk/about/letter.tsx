import type { CSSProperties } from 'react';

import { BIO } from '~/desk/about/content';
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
        {BIO.map(paragraph => (
            <p key={paragraph} className="mt-[1em]">
                {paragraph}
            </p>
        ))}
        <p className="font-hand mt-[0.6em] text-[54px] leading-none text-[#1f3a7a] [text-shadow:none] -rotate-2">
            Willem-Jaap
        </p>
    </article>
);

export default Letter;
