import GithubRegion from '~/desk/github';
import { getGithubData } from '~/desk/github/data';

/**
 * The Open source region with live data from GitHub, fetched on the server and
 * revalidated daily. Must be rendered from a server component (e.g. src/app/page.tsx).
 */
const LiveGithubRegion = async () => <GithubRegion data={await getGithubData()} />;

export default LiveGithubRegion;
