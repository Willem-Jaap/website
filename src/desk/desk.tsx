'use client';

import { type PropsWithChildren, useEffect } from 'react';

import { camera } from '~/canvas/camera';
import Mat from '~/canvas/mat';
import Viewport from '~/canvas/viewport';
import Hint from '~/desk/hint';
import { DESK, INITIAL_VIEW, isRegionId } from '~/desk/layout';
import { focusRegion } from '~/desk/region';
import Surface from '~/desk/surface';
import Title from '~/desk/title';
import { trackRegionFocus } from '~/utils/eyes';

/** The interactive desk; regions are passed in so they can stay server components */
const Desk = ({ children }: PropsWithChildren) => {
    useEffect(() => {
        // Opened on a deep link: the viewport already starts there
        const initial = window.location.hash.slice(1);
        if (isRegionId(initial)) trackRegionFocus({ region: initial, via: 'link' });

        const onHashChange = () => {
            const hash = window.location.hash.slice(1);
            if (isRegionId(hash)) focusRegion(hash, 'link');
            else camera.flyTo(DESK);
        };
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    return (
        <>
            <a
                href="/list"
                className="fixed top-4 left-4 z-20 -translate-y-[200%] rounded-full bg-black/80 px-4 py-2 text-sm font-medium text-white shadow-xl backdrop-blur-md focus:translate-y-0">
                Skip to the list view
            </a>
            <Viewport bounds={DESK} initial={INITIAL_VIEW}>
                <Surface />
                <Mat />
                <Title />
                {children}
            </Viewport>
            <div className="pointer-events-none fixed inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-10 flex justify-center px-4">
                <Hint />
            </div>
        </>
    );
};

export default Desk;
