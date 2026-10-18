import type { Rect } from '~/canvas/camera';

/** Size of one centimetre on the cutting mat, in world units */
export const CM = 40;

/** The cutting mat: 120 × 80 cm */
export const MAT: Rect = { x: 0, y: 0, width: 120 * CM, height: 80 * CM };

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
        x: 40 * CM,
        y: 44 * CM,
        width: 40 * CM,
        height: 32 * CM,
    },
    props: { id: 'props', label: 'Desk', x: 84 * CM, y: 42 * CM, width: 32 * CM, height: 34 * CM },
};

/** Regions in the order they appear in navigation */
export const REGION_ORDER: RegionId[] = ['about', 'pixelperfect', 'github', 'writing', 'props'];

export const isRegionId = (value: string): value is RegionId => value in REGIONS;
