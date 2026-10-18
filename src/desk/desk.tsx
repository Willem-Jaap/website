'use client';

import { type PropsWithChildren, useEffect } from 'react';

import { camera } from '~/canvas/camera';
import Mat from '~/canvas/mat';
import Viewport from '~/canvas/viewport';
import Dock from '~/desk/dock';
import { isRegionId, MAT, REGIONS } from '~/desk/layout';
import Title from '~/desk/title';

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
        const onHashChange = () => {
            const hash = window.location.hash.slice(1);
            camera.flyTo(isRegionId(hash) ? REGIONS[hash] : MAT);
        };
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    return (
        <>
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
