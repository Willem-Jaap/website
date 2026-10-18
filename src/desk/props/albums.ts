import snapshot from '~/desk/props/albums.json';

/** A track with Apple's 30 second preview of it */
export interface Track {
    name: string;
    /** Running time in seconds, which decides how much of the record's grooves it takes */
    length: number;
    preview: string;
    /** Where to listen to all of it */
    url: string;
}

export interface Album {
    id: string;
    title: string;
    artist: string;
    year: string;
    collectionId: number;
    url: string;
    /** The first side: a few tracks from the start of the record */
    tracks: Track[];
}

/** Last known albums and previews (from the iTunes Search API), for when it can't be reached */
export const ALBUMS: Album[] = snapshot;

/** The album on the turntable when you arrive */
export const FIRST_ALBUM = 'alchemy';

export const coverOf = (album: Pick<Album, 'id'>) => `/assets/props/albums/${album.id}.jpg`;

/** Only Alchemy has a photo of its real label; the others get their cover printed on it */
export const labelOf = (album: Pick<Album, 'id'>) =>
    album.id === 'alchemy' ? '/assets/props/alchemy-label.jpg' : coverOf(album);

interface ItunesTrack {
    wrapperType: string;
    collectionId: number;
    trackName?: string;
    previewUrl?: string;
}

/** Fresh preview links (they move now and then), looked up once a day */
export const getAlbums = async (): Promise<Album[]> => {
    try {
        const ids = ALBUMS.map(album => album.collectionId).join(',');
        const results = (
            await Promise.all(
                ['nl', 'us'].map(async country => {
                    const response = await fetch(
                        `https://itunes.apple.com/lookup?entity=song&limit=200&country=${country}&id=${ids}`,
                        { next: { revalidate: 60 * 60 * 24 }, signal: AbortSignal.timeout(8000) },
                    );
                    if (!response.ok) throw new Error(`iTunes responded ${response.status}`);
                    return ((await response.json()) as { results: ItunesTrack[] }).results;
                }),
            )
        ).flat();
        return ALBUMS.map(album => ({
            ...album,
            tracks: album.tracks.map(track => {
                const found = results.find(
                    result =>
                        result.wrapperType === 'track' &&
                        result.collectionId === album.collectionId &&
                        result.trackName === track.name &&
                        result.previewUrl,
                );
                return found?.previewUrl ? { ...track, preview: found.previewUrl } : track;
            }),
        }));
    } catch (error) {
        console.warn('[albums] Using the saved previews:', (error as Error).message);
        return ALBUMS;
    }
};
