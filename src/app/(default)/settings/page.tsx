import PaddedWithRandomized from '~components/misc/padded-with-randomized';
import Label from '~components/ui/label';
import Switch from '~components/ui/switch';

const Page = () => {
    return (
        <>
            <section className="flex flex-col gap-4 mt-16 px-column-1 py-6 min-h-screen text-lg text-charade-100">
                <div className="pt-20 pb-16 border-b border-b-charade-800">
                    <PaddedWithRandomized text="Settings" />
                </div>
                <div className="flex flex-col gap-4 py-8 max-w-2xl">
                    <p>
                        Tweak the settings of this website to your liking. Maybe some of the
                        animations are too much for you. The settings are saved in local storage. If
                        you clear your local storage, the settings will be reset.
                    </p>
                </div>
                <div>
                    <div className="grid gap-4">
                        <div className="flex items-center space-x-2">
                            <Switch id="disable-noise" />
                            <Label htmlFor="disable-noise">Disable Noise</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="disable-text-randomization" />
                            <Label htmlFor="disable-text-randomization">
                                Disable text randomization on scroll
                            </Label>
                        </div>
                    </div>
                    <div className="mt-8">
                        <button
                            className="inline-block w-fit py-2 px-5 mb-20 rounded-full border border-charade-700"
                            type="submit">
                            Save Changes
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Page;
