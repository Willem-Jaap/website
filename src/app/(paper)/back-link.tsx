import type { PropsWithChildren } from 'react';

import Link from 'next/link';

/** Handwritten above the sheet, back to where it was picked up */
const BackLink = ({ href, children }: PropsWithChildren<{ href: string }>) => (
    <nav className="relative mx-auto mb-5 max-w-[820px] sm:mb-8">
        <Link
            href={href}
            className="font-hand text-[26px] text-white/85 transition-colors hover:text-white sm:text-[30px]">
            {children}
        </Link>
    </nav>
);

export default BackLink;
