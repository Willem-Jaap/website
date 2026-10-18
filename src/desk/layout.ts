import type { InitialView, Rect } from '~/canvas/fit';

/** Size of one centimetre on the cutting mat, in world units */
export const CM = 40;

/** The cutting mat: 120 × 80 cm */
export const MAT: Rect = { x: 0, y: 0, width: 120 * CM, height: 80 * CM };

/** The wooden desk the mat lies on, with room for the things that aren't work */
export const DESK: Rect = { x: -66 * CM, y: -16 * CM, width: 236 * CM, height: 114 * CM };

export type RegionId = 'about' | 'pixelperfect' | 'github' | 'writing' | 'props';

export interface Region extends Rect {
    id: RegionId;
    label: string;
}

/**
 * Where everything lives on the desk, in world units (see CM).
 * Each region is owned by its folder in src/desk/<id>, which renders inside this rect.
 */
export const REGIONS: Record<RegionId, Region> = {
    about: {
        id: 'about',
        label: 'About me',
        x: 4 * CM,
        y: 4 * CM,
        width: 44 * CM,
        height: 32 * CM,
    },
    pixelperfect: {
        id: 'pixelperfect',
        label: 'Pixel Perfect',
        x: 68 * CM,
        y: 4 * CM,
        width: 48 * CM,
        height: 32 * CM,
    },
    writing: {
        id: 'writing',
        label: 'Writing',
        x: 4 * CM,
        y: 42 * CM,
        width: 32 * CM,
        height: 34 * CM,
    },
    github: {
        id: 'github',
        label: 'Open source',
        // In the bottom right corner of the mat
        x: 76 * CM,
        y: 48 * CM,
        width: 40 * CM,
        height: 28 * CM,
    },
    // Off the mat, on the bare desk to the left
    props: {
        id: 'props',
        label: 'After hours',
        x: -62 * CM,
        y: -12 * CM,
        width: 56 * CM,
        height: 104 * CM,
    },
};

export const isRegionId = (value: string): value is RegionId => value in REGIONS;

/** Start on a linked region, zoomed in on "About" on phones, or with the whole desk in view */
export const INITIAL_VIEW: InitialView = {
    links: REGIONS,
    narrowBelow: 768,
    narrow: REGIONS.about,
    wide: DESK,
};
