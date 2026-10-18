import {
    type CalendarDay,
    type GithubData,
    type Repo,
    REPOS,
    SNAPSHOT,
} from '~/desk/github/content';

const USER = 'Willem-Jaap';
const DAY = 60 * 60 * 24;
const TIMEOUT = 8000;

/** Refetched at most once a day (ISR) */
const request = (url: string, headers: Record<string, string> = {}) =>
    fetch(url, {
        headers,
        next: { revalidate: DAY },
        signal: AbortSignal.timeout(TIMEOUT),
    }).then(response => {
        if (!response.ok) throw new Error(`${url} responded ${response.status}`);
        return response;
    });

/** The REST API works without a token; one only raises the rate limit. Never sent to the client */
const api = <T>(path: string) => {
    const token = process.env.GITHUB_TOKEN;
    return request(`https://api.github.com${path}`, {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }).then(response => response.json() as Promise<T>);
};

interface ApiRepo {
    full_name: string;
    name: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    html_url: string;
}

const getRepo = async (fullName: string): Promise<Repo> => {
    const repo = await api<ApiRepo>(`/repos/${fullName}`);
    return {
        fullName: repo.full_name,
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        url: repo.html_url,
    };
};

/** The public contribution graph from the profile page; the REST API has no equivalent */
const getCalendar = async () => {
    const html = await request(`https://github.com/users/${USER}/contributions`).then(response =>
        response.text(),
    );
    const days: CalendarDay[] = Array.from(
        html.matchAll(/data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g),
        ([, date, level]) => ({ date: date ?? '', level: Number(level) }),
    ).sort((a, b) => a.date.localeCompare(b.date));
    const total = /js-contribution-activity-description[^>]*>\s*([\d,]+)/.exec(html)?.[1];
    if (days.length < 300 || !total) throw new Error('Unexpected contribution graph markup');
    return { total: Number(total.replaceAll(',', '')), days };
};

/** Each piece falls back to the committed snapshot on its own, so a failing request never breaks the build */
const fallback = async <T>(promise: Promise<T>, snapshot: T, label: string) => {
    try {
        return await promise;
    } catch (error) {
        console.warn(`[github] Using snapshot for ${label}:`, (error as Error).message);
        return snapshot;
    }
};

export const getGithubData = async (): Promise<GithubData> => {
    const [repos, calendar] = await Promise.all([
        Promise.all(
            REPOS.map(({ fullName }) =>
                fallback<Repo | undefined>(
                    getRepo(fullName),
                    SNAPSHOT.repos.find(repo => repo.fullName === fullName),
                    fullName,
                ),
            ),
        ).then(repos => repos.filter(repo => repo !== undefined)),
        fallback(getCalendar(), SNAPSHOT.calendar, 'contribution graph'),
    ]);
    return { repos, calendar };
};
