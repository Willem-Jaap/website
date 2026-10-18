import type { CSSProperties } from 'react';

import Image from 'next/image';

import Age from '~/desk/about/age';
import { EDUCATION, EXPERIENCE } from '~/desk/about/content';
import PaperClip from '~/desk/about/paper-clip';
import cn from '~/utils/cn';

const ROW = 40;

const linkClass =
    'underline decoration-ink/25 decoration-2 underline-offset-[6px] transition-colors hover:decoration-[#c8372d]';

const Label = ({ children }: { children: string }) => (
    <h3 className="text-[17px] font-semibold uppercase tracking-[0.22em] text-ink/50">
        {children}
    </h3>
);

/** A ruled index card with the CV on it and a passport photo clipped to the corner */
const CvCard = ({ className, style }: { className?: string; style?: CSSProperties }) => (
    <article
        aria-label="CV"
        className={cn('paper shadow-object absolute rounded-[4px]', className)}
        style={{ width: 880, height: 540, ...style }}>
        <header className="h-[150px] border-b-[3px] border-[#d9534f]/70 px-[44px] pt-[34px]">
            <h2 className="text-[50px] font-bold leading-none tracking-[-0.02em]">
                Willem-Jaap Klepper
            </h2>
            <p className="mt-[14px] text-[25px] leading-tight text-ink/75">
                Founder &amp; software developer at Pixel Perfect
            </p>
        </header>

        <div
            className="px-[44px] text-[23px]"
            style={{
                lineHeight: `${ROW}px`,
                backgroundImage: `repeating-linear-gradient(to bottom, transparent 0 ${ROW - 2}px, rgb(110 150 200 / 0.38) ${ROW - 2}px ${ROW}px)`,
            }}>
            <p>
                Born 2003 (<Age />) &middot; the Netherlands
            </p>
            <div style={{ height: ROW }} className="flex items-end">
                <Label>Experience</Label>
            </div>
            <ul>
                {EXPERIENCE.map(item => (
                    <li key={item.company} className="grid grid-cols-[1fr_1.15fr_auto] gap-6">
                        <span className="font-semibold">
                            {item.url ? (
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={linkClass}>
                                    {item.company}
                                </a>
                            ) : (
                                item.company
                            )}
                        </span>
                        <span className="text-ink/80">{item.role}</span>
                        <span className="tabular-nums text-ink/60">{item.period}</span>
                    </li>
                ))}
            </ul>
            <div style={{ height: ROW }} className="flex items-end">
                <Label>Education</Label>
            </div>
            <p className="grid grid-cols-[1fr_auto] gap-6">
                <span>
                    <span className="font-semibold">{EDUCATION.study}</span>
                </span>
                <span className="text-ink/60">{EDUCATION.school}</span>
            </p>
            <p
                className="font-hand -rotate-1 pl-[6px] pt-[8px] text-[40px] text-[#1f3a7a]"
                style={{ height: ROW * 2 }}>
                now building Pixel Perfect, Eyes &amp; Tencil &rarr;
            </p>
        </div>

        {/* Passport photo, clipped on */}
        <div
            className="absolute right-[40px] top-[-26px] rotate-[3deg] bg-white p-[7px] shadow-[0_2px_3px_rgb(0_0_0/0.25),0_8px_14px_-6px_rgb(0_0_0/0.3)]"
            style={{ width: 150 }}>
            <Image
                src="/assets/about/avatar.webp"
                alt="Passport photo of Willem-Jaap"
                width={256}
                height={256}
                unoptimized
                draggable={false}
                className="aspect-[4/5] w-full object-cover grayscale"
            />
        </div>
        <PaperClip className="right-[128px] top-[-46px] rotate-[4deg]" />
    </article>
);

export default CvCard;
