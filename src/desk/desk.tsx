'use client';

import { type PropsWithChildren, useEffect } from 'react';

import { camera } from '~/canvas/camera';
import Mat from '~/canvas/mat';
import Viewport from '~/canvas/viewport';
import Dock from '~/desk/dock';
import { isRegionId, MAT, REGIONS } from '~/desk/layout';
import { focusRegion } from '~/desk/region';
import Title from '~/desk/title';
import { trackRegionFocus } from '~/utils/eyes';

const MOBILE_WIDTH = 768;

/** Start on a linked region, zoomed in on "About" on phones, or with the whole desk in view */
const initialView = (width: number) => {
    const hash = window.location.hash.slice(1);
    if (isRegionId(hash)) return REGIONS[hash];
    return width < MOBILE_WIDTH ? REGIONS.about : MAT;
};

/** The interactive desk; regions are passed in so they can stay server components */
const Desk = ({ children }: PropsWithChildren) => {
    useEffect(() => {
        // Opened on a deep link: the viewport already starts there
        const initial = window.location.hash.slice(1);
        if (isRegionId(initial)) trackRegionFocus({ region: initial, via: 'link' });

        const onHashChange = () => {
            const hash = window.location.hash.slice(1);
            if (isRegionId(hash)) focusRegion(hash, 'link');
            else camera.flyTo(MAT);
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
            <Viewport bounds={MAT} initial={initialView}>
                <Mat />
                <Title />
                {children}
            </Viewport>
            <Dock />
        </>
    );
};

export default Desk;
