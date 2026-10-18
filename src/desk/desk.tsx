'use client';

import { useEffect } from 'react';

import { camera } from '~/canvas/camera';
import Mat from '~/canvas/mat';
import Viewport from '~/canvas/viewport';
import AboutRegion from '~/desk/about';
import Dock from '~/desk/dock';
import GithubRegion from '~/desk/github';
import { isRegionId, MAT, REGIONS } from '~/desk/layout';
import PixelPerfectRegion from '~/desk/pixelperfect';
import PropsRegion from '~/desk/props';
import Title from '~/desk/title';
import WritingRegion from '~/desk/writing';

const MOBILE_WIDTH = 768;

/** Start on a linked region, zoomed in on "About" on phones, or with the whole desk in view */
const initialView = (width: number) => {
    const hash = window.location.hash.slice(1);
    if (isRegionId(hash)) return REGIONS[hash];
    return width < MOBILE_WIDTH ? REGIONS.about : MAT;
};

const Desk = () => {
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
                <AboutRegion />
                <PixelPerfectRegion />
                <GithubRegion />
                <WritingRegion />
                <PropsRegion />
            </Viewport>
            <Dock />
        </>
    );
};

export default Desk;
