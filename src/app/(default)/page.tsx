import Spotlight from '~app/(default)/components/spotlight';

const Page = () => {
    return (
        <>
            <div className="relative px-column-1 pt-48 min-h-screen bg-charade-800 overflow-hidden">
                <p className="relative flex flex-col text-4xl uppercase leading-tight z-10">
                    <span>User first</span>
                    <span className="text-charade-400">Frontend Engineer</span>
                    <span className="text-charade-400">Innovative & creative</span>
                </p>
                <h1 className="uppercase text-[14rem] text-charade-700 whitespace-nowrap select-none">
                    Willem-Jaap
                </h1>
                <Spotlight />
            </div>
        </>
    );
};

export default Page;
