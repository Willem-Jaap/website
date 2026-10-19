import type { PropsWithChildren } from 'react';

import BackLink from '~/app/(paper)/back-link';

const WritingLayout = ({ children }: PropsWithChildren) => (
    <>
        <BackLink href="/#writing">← back to the desk</BackLink>
        <main className="relative mx-auto max-w-[820px]">{children}</main>
    </>
);

export default WritingLayout;
