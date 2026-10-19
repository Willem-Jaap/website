import type { PropsWithChildren } from 'react';

/** A full sheet of printed paper, held down with a strip of washi tape */
const PaperSheet = ({ children }: PropsWithChildren) => (
    <div className="paper shadow-object relative px-6 pb-16 pt-12 sm:px-16 sm:pb-24 sm:pt-20 md:px-24">
        <div
            aria-hidden
            className="absolute -top-4 left-1/2 h-9 w-36 -translate-x-1/2 -rotate-2 bg-[#f3e3a8]/70 shadow-[0_1px_2px_rgb(0_0_0/0.15)] sm:w-44"
            style={{ clipPath: 'polygon(2% 0, 98% 4%, 100% 50%, 97% 100%, 1% 96%, 0 45%)' }}
        />
        {children}
    </div>
);

export default PaperSheet;
