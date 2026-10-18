import type { CSSProperties } from 'react';

import { CONTACT } from '~/desk/about/content';
import cn from '~/utils/cn';

/** A thick, slightly glossy business card with the ways to reach me */
const BusinessCard = ({ className, style }: { className?: string; style?: CSSProperties }) => (
    <address
        className={cn(
            'paper shadow-object absolute flex flex-col justify-between rounded-[8px] px-[38px] py-[34px] not-italic',
            'outline outline-[3px] -outline-offset-[3px] outline-black/5',
            className,
        )}
        style={{ width: 480, height: 280, ...style }}>
        <div>
            <p className="text-[30px] font-bold leading-none tracking-[-0.01em]">
                Willem-Jaap Klepper
            </p>
            <p className="mt-[10px] text-[19px] uppercase tracking-[0.2em] text-ink/55">
                Pixel Perfect
            </p>
        </div>
        <ul className="space-y-[4px] text-[23px] leading-[1.35]">
            {CONTACT.map(item => (
                <li key={item.href}>
                    <a
                        href={item.href}
                        target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                        rel="noreferrer"
                        className="underline decoration-transparent decoration-2 underline-offset-[5px] transition-colors hover:decoration-[#2f8be0]">
                        {item.label}
                    </a>
                </li>
            ))}
        </ul>
    </address>
);

export default BusinessCard;
