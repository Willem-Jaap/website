/** A track on side one of the record, with Apple's 30 second preview of it */
export interface SideTrack {
    name: string;
    /** Running time in seconds, which decides how much of the side's grooves it takes */
    length: number;
    preview: string;
    /** Where to listen to all of it */
    url: string;
}

const ALBUM_URL = 'https://music.apple.com/album/alchemy-dire-straits-live-remastered/1440897893';

/** Side one, as printed on the label. Last known previews, for when the iTunes API can't be reached */
const SIDE_ONE: SideTrack[] = [
    {
        name: 'Once Upon a Time in the West',
        length: 13 * 60 + 1,
        preview:
            'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/a1/3c/4d/a13c4d0f-de0b-f8fd-b999-bea5bfff8a49/mzaf_10527232695938854906.plus.aac.p.m4a',
        url: ALBUM_URL,
    },
    {
        name: 'Romeo and Juliet',
        length: 8 * 60 + 24,
        preview:
            'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/73/a2/07/73a2076f-1ea5-7e74-6241-9e658c8b17ab/mzaf_14348524606142058056.plus.aac.p.m4a',
        url: ALBUM_URL,
    },
];

interface ItunesTrack {
    trackName: string;
    collectionName: string;
    previewUrl?: string;
    trackViewUrl?: string;
}

/** Fresh preview links from the iTunes Search API (they move now and then), refreshed daily */
export const getSideOne = async (): Promise<SideTrack[]> => {
    try {
        const response = await fetch(
            'https://itunes.apple.com/search?term=dire+straits+alchemy+live&entity=song&limit=50',
            { next: { revalidate: 60 * 60 * 24 }, signal: AbortSignal.timeout(8000) },
        );
        if (!response.ok) throw new Error(`iTunes responded ${response.status}`);
        const { results } = (await response.json()) as { results: ItunesTrack[] };
        return SIDE_ONE.map(track => {
            const found = results.find(
                result =>
                    result.collectionName.startsWith('Alchemy') &&
                    result.trackName === track.name &&
                    result.previewUrl,
            );
            return found
                ? {
                      ...track,
                      preview: found.previewUrl ?? track.preview,
                      url: found.trackViewUrl ?? track.url,
                  }
                : track;
        });
    } catch (error) {
        console.warn('[alchemy] Using the saved previews:', (error as Error).message);
        return SIDE_ONE;
    }
};
