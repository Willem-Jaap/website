export interface Track {
    name: string;
    artist: string;
    /** Playing right now, rather than the last thing played */
    live: boolean;
}

/** Refresh the track at most every five minutes (ISR) */
export const NOW_PLAYING_REVALIDATE = 300;

interface RecentTracks {
    recenttracks?: {
        track?: {
            'name': string;
            'artist': { '#text': string };
            '@attr'?: { nowplaying?: string };
        }[];
    };
}

/**
 * What Willem-Jaap is listening to, from Last.fm. Server only: needs LASTFM_API_KEY and
 * LASTFM_USER. Returns null without them or when Last.fm fails, so the record falls back
 * to its printed label.
 */
export const getNowPlaying = async (): Promise<Track | null> => {
    const key = process.env.LASTFM_API_KEY;
    const user = process.env.LASTFM_USER;
    if (!key || !user) return null;

    const url = new URL('https://ws.audioscrobbler.com/2.0/');
    url.search = new URLSearchParams({
        method: 'user.getrecenttracks',
        user,
        api_key: key,
        format: 'json',
        limit: '1',
    }).toString();

    try {
        const response = await fetch(url, { next: { revalidate: NOW_PLAYING_REVALIDATE } });
        if (!response.ok) return null;
        const data = (await response.json()) as RecentTracks;
        const track = data.recenttracks?.track?.[0];
        if (!track) return null;
        return {
            name: track.name,
            artist: track.artist['#text'],
            live: track['@attr']?.nowplaying === 'true',
        };
    } catch {
        return null;
    }
};

/**
 * Route handler for /api/now-playing. Mounted from src/app/api/now-playing/route.ts:
 * export { GET } from '~/desk/props/now-playing';
 * export const revalidate = 300;
 */
export const GET = async () => Response.json(await getNowPlaying());
