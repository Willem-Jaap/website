import Image from 'next/image';

import { EyesMark } from '~/desk/pixelperfect/logos';
import { PaperClip, Placed } from '~/desk/pixelperfect/stationery';
import cn from '~/utils/cn';

import { albertSans } from '~/desk/pixelperfect/fonts';
import styles from '~/desk/pixelperfect/pixelperfect.module.css';

/** A printed product sheet for Eyes, clipped to the Pixel Perfect folder */
const EyesCard = () => (
    <Placed x={20.2} y={0.8} width={25.6} height={15.4} rotate={2}>
        <article
            className={cn(
                albertSans.className,
                'paper shadow-object absolute inset-0 flex flex-col p-[48px] text-[#0d1f19]',
            )}>
            <header className="flex items-center gap-[18px]">
                <EyesMark className="h-[34px] w-auto text-[#005740]" />
                <h3 className="text-[44px] leading-none font-semibold tracking-[-0.02em]">Eyes</h3>
                <span className="ml-auto text-[20px] tracking-[0.14em] text-[#1A896B] uppercase">
                    A Pixel Perfect product
                </span>
            </header>

            <div className="mt-[36px] flex flex-1 gap-[44px]">
                <div className="relative w-[560px] shrink-0 self-start border-2 border-[#E1EDE9] bg-[#F7F8F7]">
                    <Image
                        src="/assets/pixelperfect/eyes-overview-ask.webp"
                        alt="The Eyes overview: visitors, sessions, bounce rate and conversion, with Ask Eyes open"
                        width={1600}
                        height={1000}
                        unoptimized
                        className={cn(styles.print, 'block h-auto w-full')}
                    />
                </div>

                <div className="flex flex-col">
                    <p className="text-[36px] leading-[1.12] font-medium tracking-[-0.015em] text-[#005740]">
                        Agentic analytics for everyone.
                    </p>
                    <p className="mt-[20px] text-[24px] leading-[1.45] text-[#0d1f19]/75">
                        Eyes interprets your product data for you. Track behaviour, monitor
                        performance, analyse funnels and ask questions in plain English.
                    </p>
                    <a
                        href="https://eyes.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto self-start rounded-full bg-[#005740] px-[26px] py-[10px] text-[24px] font-medium text-white hover:bg-[#1A896B]">
                        eyes.dev ↗
                    </a>
                </div>
            </div>
        </article>
        <PaperClip className="top-[56px] -left-[34px] rotate-[-90deg]" />
    </Placed>
);

export default EyesCard;
