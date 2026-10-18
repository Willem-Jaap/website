import AboutRegion from '~/desk/about';
import Desk from '~/desk/desk';
import LiveGithubRegion from '~/desk/github/live';
import PixelPerfectRegion from '~/desk/pixelperfect';
import PropsRegion from '~/desk/props';
import WritingRegion from '~/desk/writing';

// GitHub data on the desk refreshes daily
export const revalidate = 86400;

const Page = () => (
    <Desk>
        <AboutRegion />
        <PixelPerfectRegion />
        <LiveGithubRegion />
        <WritingRegion />
        <PropsRegion />
    </Desk>
);

export default Page;
