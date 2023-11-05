'use client';

import { useContext } from 'react';

import PaddedWithRandomized from '~components/misc/padded-with-randomized';
import Label from '~components/ui/label';
import Switch from '~components/ui/switch';
import SettingsContext from '~contexts/settings-context';

const Page = () => {
    const settings = useContext(SettingsContext);

    return (
        <>
            <section className="mx-column-1 py-56">
                <div className="border-b border-b-charade-800 mb-12">
                    <PaddedWithRandomized text="Settings" />
                    <p className="text-charade-400 my-8 max-w-5xl">
                        Tweak the settings of this website to your liking. Maybe some of the
                        animations are too much for you. The settings are saved in local storage. If
                        you clear your local storage, the settings will be reset.
                    </p>
                </div>
                <div>
                    <h2 className="text-charade-400 mb-4">User Settings</h2>
                    <div className="flex flex-col gap-4 max-w-2xl">
                        <div className="flex items-center gap-4 border border-charade-700 bg-charade-900 rounded-2xl p-8">
                            <Switch
                                id="disable-noise"
                                checked={
                                    settings.get('noise') !== undefined
                                        ? !settings.get('noise')
                                        : false
                                }
                                onCheckedChange={checked => settings.set('noise', !checked)}
                            />
                            <Label htmlFor="disable-noise" className="text-sm text-charade-100">
                                Disable Noise
                            </Label>
                        </div>
                        <div className="flex items-center gap-4 border border-charade-700 bg-charade-900 rounded-2xl p-8">
                            <Switch
                                id="disable-text-randomization"
                                checked={
                                    settings.get('textRandomization') !== undefined
                                        ? !settings.get('textRandomization')
                                        : false
                                }
                                onCheckedChange={checked =>
                                    settings.set('textRandomization', !checked)
                                }
                            />
                            <Label
                                htmlFor="disable-text-randomization"
                                className="text-sm text-charade-100">
                                Disable text randomization on scroll
                            </Label>
                        </div>
                    </div>
                    <h2 className="text-charade-400 mt-8 mb-4">Developer Settings</h2>
                    <div className="flex flex-col gap-4 max-w-2xl">
                        <div className="flex items-center gap-4 border border-charade-700 bg-charade-900 rounded-2xl p-8">
                            <Switch
                                id="enable-debug"
                                checked={
                                    settings.get('debug') !== undefined
                                        ? !!settings.get('debug')
                                        : false
                                }
                                onCheckedChange={checked => settings.set('debug', checked)}
                            />
                            <Label htmlFor="enable-debug" className="text-sm text-charade-100">
                                Enable debug mode
                            </Label>
                        </div>
                    </div>

                    <p className="py-8 text-sm text-charade-400">
                        Settings version:{' '}
                        <span className="font-medium">{settings.version.toFixed(1)}</span>
                    </p>
                </div>
            </section>
        </>
    );
};

export default Page;
