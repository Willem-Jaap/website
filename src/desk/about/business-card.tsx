import type { CSSProperties, ReactNode } from 'react';

import { CONTACT, type ContactKind } from '~/desk/about/content';
import { CM } from '~/desk/layout';
import cn from '~/utils/cn';

const PP_BLUE = 'hsl(214 67% 51%)';

/** Small line icons, printed in the card's blue */
const ICONS: Record<ContactKind, ReactNode> = {
    mail: (
        <>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m4 7 8 6 8-6" />
        </>
    ),
    web: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
        </>
    ),
    github: (
        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    ),
    linkedin: (
        <>
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M8 10.5V17M8 7.5v.01M12 17v-6.5M12 13.5c0-1.7 1-3 2.5-3s2.5 1.1 2.5 3V17" />
        </>
    ),
};

/** A thick business card: name and role up top, the ways to reach me printed below */
const BusinessCard = ({ className, style }: { className?: string; style?: CSSProperties }) => (
    <address
        className={cn(
            'paper shadow-object absolute flex flex-col overflow-hidden rounded-[8px] not-italic',
            'outline outline-[3px] -outline-offset-[3px] outline-black/5',
            className,
        )}
        style={{ ...style, width: 13 * CM, height: 8 * CM }}>
        {/* Printed colour edge along the top */}
        <div className="h-[10px] shrink-0" style={{ backgroundColor: PP_BLUE }} />
        <div className="flex flex-1 flex-col justify-between px-[40px] pt-[32px] pb-[34px]">
            <div>
                <p className="text-[40px] font-bold leading-none tracking-[-0.01em]">
                    Willem-Jaap Klepper
                </p>
                <p className="mt-[12px] text-[23px] text-ink/60">
                    Founder &amp; developer ·{' '}
                    <span className="font-semibold" style={{ color: PP_BLUE }}>
                        Pixel Perfect
                    </span>
                </p>
            </div>
            <ul className="space-y-[12px] text-[23px] leading-none">
                {CONTACT.map(item => (
                    <li key={item.href}>
                        <a
                            href={item.href}
                            target={item.kind === 'mail' ? undefined : '_blank'}
                            rel="noreferrer"
                            className="group/contact flex items-center gap-[14px]">
                            <svg
                                aria-hidden
                                viewBox="0 0 24 24"
                                className="size-[28px] shrink-0"
                                fill="none"
                                stroke={PP_BLUE}
                                strokeWidth={1.8}
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                {ICONS[item.kind]}
                            </svg>
                            <span className="underline decoration-transparent decoration-2 underline-offset-[5px] transition-colors group-hover/contact:decoration-[#2f8be0]">
                                {item.label}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </address>
);

export default BusinessCard;
