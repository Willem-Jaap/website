import type { PropsWithChildren } from 'react';

import Link from 'next/link';

import Backdrop from '~/desk/writing/backdrop';
import serif from '~/desk/writing/serif';

/** A sheet picked up off the desk */
const WritingLayout = ({ children }: PropsWithChildren) => (
    <div className="relative min-h-full px-3 pb-16 pt-5 sm:px-6 sm:pb-28 sm:pt-8">
        <Backdrop />
        <nav className="relative mx-auto mb-5 max-w-[820px] sm:mb-8">
            <Link
                href="/#writing"
                className="font-hand text-[26px] text-white/85 transition-colors hover:text-white sm:text-[30px]">
                ← back to the desk
            </Link>
        </nav>
        <main className={`relative mx-auto max-w-[820px] ${serif.className}`}>{children}</main>
    </div>
);

export default WritingLayout;
