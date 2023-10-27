import PaddedWithRandomized from '~components/misc/padded-with-randomized';

const Page = () => {
    return (
        <>
            <section className="flex flex-col gap-4 mt-16 px-column-1 py-6 min-h-screen text-lg  text-charade-100">
                <div className="pt-20 pb-16 border-b border-b-charade-800">
                    <PaddedWithRandomized text="Settings" />
                </div>
                <div className="flex flex-col gap-4 py-24 max-w-5xl mx-auto">
                    <p>
                        Tweak the settings of this website to your liking. Maybe some of the
                        animations are too much for you. The settings are saved in local storage. If
                        you clear your local storage, the settings will be reset.
                    </p>
                </div>
            </section>
        </>
    );
};

export default Page;
