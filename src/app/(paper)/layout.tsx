import type { PropsWithChildren } from 'react';

import Backdrop from '~/desk/writing/backdrop';
import serif from '~/desk/writing/serif';

/** A sheet picked up off the desk: /writing, the posts and the list view */
const PaperLayout = ({ children }: PropsWithChildren) => (
    <div
        className={`relative min-h-full px-3 pb-16 pt-5 sm:px-6 sm:pb-28 sm:pt-8 ${serif.className}`}>
        <Backdrop />
        {children}
    </div>
);

export default PaperLayout;
