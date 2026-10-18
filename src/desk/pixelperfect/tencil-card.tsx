import Image from 'next/image';

import { TencilMark } from '~/desk/pixelperfect/logos';
import { Placed, Tape } from '~/desk/pixelperfect/stationery';
import cn from '~/utils/cn';

import { albertSans, clashGrotesk } from '~/desk/pixelperfect/fonts';
import styles from '~/desk/pixelperfect/pixelperfect.module.css';

/** A product card for Tencil on black stock, taped to the folder */
const TencilCard = () => (
    <Placed x={21.8} y={15.8} width={25} height={12.6} rotate={-2.2}>
        <article
            className={cn(
                styles.darkCard,
                albertSans.className,
                'shadow-object absolute inset-0 flex flex-col rounded-[6px] p-[48px]',
            )}>
            <header className="flex items-center gap-[16px]">
                <TencilMark cursor="#0a0e12" className="size-[44px] text-[#3b8dff]" />
                <h3
                    className={cn(
                        clashGrotesk.className,
                        'text-[44px] leading-none font-semibold tracking-[-0.01em]',
                    )}>
                    Tencil
                </h3>
                <span className="ml-auto text-[20px] tracking-[0.14em] text-white/50 uppercase">
                    Open source · Apache-2.0
                </span>
            </header>

            <div className="mt-[36px] flex flex-1 gap-[40px]">
                <Image
                    src="/assets/pixelperfect/tencil-og.webp"
                    alt="Tencil: point at your UI, prompt your agent. Install with npx tencil."
                    width={1200}
                    height={630}
                    unoptimized
                    className="h-auto w-[580px] shrink-0 self-start rounded-[6px] border-2 border-white/10"
                />

                <div className="flex flex-col">
                    <p
                        className={cn(
                            clashGrotesk.className,
                            'text-[38px] leading-[1.08] font-medium tracking-[-0.01em]',
                        )}>
                        Point at your UI. Prompt your agent.
                    </p>
                    <p className="mt-[18px] text-[24px] leading-[1.45] text-white/70">
                        Press{' '}
                        <kbd className="rounded-[6px] border-2 border-white/25 px-[8px] font-sans text-[20px]">
                            C
                        </kbd>
                        , click an element, type a change, and your coding agent makes it.
                    </p>
                    <div className="mt-auto flex flex-wrap gap-x-[22px] gap-y-[8px] text-[24px] font-medium">
                        <a
                            href="https://tencil.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#3b8dff] hover:text-white">
                            tencil.dev ↗
                        </a>
                        <a
                            href="https://github.com/tencildev/tencil"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#7cd93a] hover:text-white">
                            GitHub ↗
                        </a>
                    </div>
                </div>
            </div>
        </article>
        <Tape className="-bottom-[4px] -left-[70px] rotate-[40deg]" />
        <Tape tone="blue" className="-right-[70px] -bottom-[4px] -rotate-[42deg]" />
    </Placed>
);

export default TencilCard;
