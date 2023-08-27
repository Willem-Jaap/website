import Image from 'next/image';

import Spotlight from '~app/(default)/components/spotlight';

const Page = () => {
    return (
        <>
            <div className="relative px-column-1 pt-32 min-h-screen bg-charade-700 overflow-hidden">
                <p className="relative flex flex-col text-4xl uppercase leading-tight z-10">
                    <span>User first</span>
                    <span className="text-charade-400">Frontend Engineer</span>
                    <span className="text-charade-400">Innovative & creative</span>
                </p>
                <h1 className="uppercase text-[14rem] text-charade-600 whitespace-nowrap select-none">
                    Willem-Jaap
                </h1>
                <Spotlight />
                <Image
                    layout="fill"
                    src="/assets/images/portfolio-hero.png"
                    alt="Portfolio hero image of Willem-Jaap"
                    className="object-contain object-center w-full h-full mt-12"
                />
                <div className="absolute bottom-0 left-0 w-full h-52 z-0 bg-gradient-to-b from-transparent to-[#0D0D0F]" />
                <div className="absolute -top-40 -left-40 w-[calc(100%+20rem)] h-[calc(100%+20rem)] z-0 opacity-80">
                    <div className="absolute top-0 left-0 w-full h-full bg-noise bg-center animate-noise" />
                </div>
            </div>
        </>
    );
};

export default Page;
