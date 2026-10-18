import AboutRegion from '~/desk/about';
import Desk from '~/desk/desk';
import LiveGithubRegion from '~/desk/github/live';
import PixelPerfectRegion from '~/desk/pixelperfect';
import PropsRegion from '~/desk/props';
import WritingRegion from '~/desk/writing';

import type { Metadata } from 'next';

export const metadata: Metadata = { alternates: { canonical: '/' } };

// GitHub data on the desk refreshes daily
export const revalidate = 86400;

const Page = () => (
    <>
        <noscript>
            <p className="fixed inset-x-0 top-0 z-20 bg-black/80 p-3 text-center text-sm">
                The desk needs JavaScript to zoom around.{' '}
                <a href="/list" className="underline underline-offset-4">
                    Read everything as a list
                </a>
                .
            </p>
        </noscript>
        <Desk>
            <AboutRegion />
            <PixelPerfectRegion />
            <LiveGithubRegion />
            <WritingRegion />
            <PropsRegion />
        </Desk>
    </>
);

export default Page;
